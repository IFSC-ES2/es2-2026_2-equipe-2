import { describe, it, expect, vi, beforeEach } from "vitest";
import { DashboardService } from "../../src/services/index";
import { DashboardRepository } from "../../src/repositories/index";
import { ValidationError } from "../../src/errors/index";

vi.mock("../../src/config/logger", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    verbose: vi.fn(),
    silly: vi.fn(),
  },
}));

function makeMockRepository(): DashboardRepository {
  return {
    getResumoVendas: vi.fn().mockResolvedValue({
      ganhos_totais: 1500.5,
      total_vendas: 3,
      total_produtos_vendidos: 8,
    }),
    getProdutosMaisVendidos: vi.fn().mockResolvedValue([
      {
        id: 1,
        sku: "ELE-0001",
        nome: "Smartphone XPTO 128GB",
        unidades_vendidas: 5,
        receita: 9499.5,
      },
    ]),
    getCategoriaMaisVendida: vi.fn().mockResolvedValue({
      id: 1,
      nome: "Eletrônicos",
      unidades_vendidas: 5,
      receita: 9499.5,
    }),
    getProdutosEstoqueBaixo: vi.fn().mockResolvedValue([
      {
        id: 2,
        sku: "INF-0001",
        nome: "Notebook Ultra 15",
        quantidade: 2,
        estoque_minimo: 3,
        faltam_para_o_minimo: 1,
      },
    ]),
    getMaioresEstoques: vi.fn().mockResolvedValue([]),
    getTotalProdutos: vi.fn().mockResolvedValue(11),
  } as unknown as DashboardRepository;
}

describe("DashboardService", () => {
  let repository: DashboardRepository;
  let service: DashboardService;

  beforeEach(() => {
    repository = makeMockRepository();
    service = new DashboardService(repository);
  });

  describe("getResumo", () => {
    it("usa 30 dias quando o período não é informado", async () => {
      const resumo = await service.getResumo();

      expect(resumo.periodo).toBe(30);
      expect(repository.getResumoVendas).toHaveBeenCalledWith(30);
    });

    it("aceita o período como texto (vindo da query string)", async () => {
      const resumo = await service.getResumo("90");

      expect(resumo.periodo).toBe(90);
      expect(repository.getCategoriaMaisVendida).toHaveBeenCalledWith(90);
    });

    it("monta o resumo com vendas, ranking, categoria e estoque", async () => {
      const resumo = await service.getResumo(365);

      expect(resumo.vendas.ganhos_totais).toBe(1500.5);
      expect(resumo.vendas.total_vendas).toBe(3);
      expect(resumo.produtos_mais_vendidos).toHaveLength(1);
      expect(resumo.categoria_mais_vendida?.nome).toBe("Eletrônicos");
      expect(resumo.estoque.total_produtos).toBe(11);
      expect(resumo.estoque.produtos_estoque_baixo).toHaveLength(1);
      expect(resumo.estoque.maiores_estoques).toEqual([]);
    });

    it("devolve categoria_mais_vendida nula quando não há vendas", async () => {
      vi.mocked(repository.getCategoriaMaisVendida).mockResolvedValue(null);

      const resumo = await service.getResumo(30);

      expect(resumo.categoria_mais_vendida).toBeNull();
    });

    it.each([7, 0, -30, "abc", ""])(
      "rejeita o período inválido %s sem consultar o banco",
      async (periodo) => {
        await expect(service.getResumo(periodo)).rejects.toThrow(
          ValidationError,
        );
        expect(repository.getResumoVendas).not.toHaveBeenCalled();
      },
    );

    it("propaga o erro do repositório", async () => {
      vi.mocked(repository.getTotalProdutos).mockRejectedValue(
        new Error("falha no banco"),
      );

      await expect(service.getResumo(30)).rejects.toThrow("falha no banco");
    });
  });
});
