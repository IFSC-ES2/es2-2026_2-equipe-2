import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProdutoService } from "../../src/services/index";
import { ProdutoRepository } from "../../src/repositories/index";
import { ValidationError, EntityNotFound } from "../../src/errors/index";
import { Produto, ProdutoCreate } from "../../src/models/Produto";

// Silencia o winston real durante os testes e permite espionar as chamadas.
vi.mock("./../src/config/logger", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    verbose: vi.fn(),
    silly: vi.fn(),
  },
}));

function makeMockRepository(): ProdutoRepository {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as ProdutoRepository;
}

const produtoMock: Produto = {
  id: 1,
  sku: "ELE-0001",
  nome: "Smartphone XPTO 128GB",
  descricao: "Smartphone com 128GB de armazenamento e câmera tripla",
  categoria_id: 1,
  fornecedor_id: 1,
  preco: 1899.9,
  quantidade: 25,
  estoque_minimo: 5,
  criado_em: new Date("2026-01-01T00:00:00.000Z"),
  atualizado_em: new Date("2026-01-01T00:00:00.000Z"),
};

const produtoCreateMock: ProdutoCreate = {
  sku: "ELE-0001",
  nome: "Smartphone XPTO 128GB",
  descricao: "Smartphone com 128GB de armazenamento e câmera tripla",
  categoria_id: 1,
  fornecedor_id: 1,
  preco: 1899.9,
  quantidade: 25,
  estoque_minimo: 5,
};

describe("ProdutoService", () => {
  let repository: ProdutoRepository;
  let service: ProdutoService;

  beforeEach(() => {
    repository = makeMockRepository();
    service = new ProdutoService(repository);
    vi.clearAllMocks();
  });

  describe("findAll", () => {
    it("deve retornar todos os produtos", async () => {
      (repository.findAll as any).mockResolvedValue([produtoMock]);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalledOnce();
      expect(result).toEqual([produtoMock]);
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findAll as any).mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(error);
    });
  });

  describe("findById", () => {
    it("deve retornar o produto quando o id é válido", async () => {
      (repository.findById as any).mockResolvedValue(produtoMock);

      const result = await service.findById(1);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(produtoMock);
    });

    it("deve aceitar id em formato string e converter para number", async () => {
      (repository.findById as any).mockResolvedValue(produtoMock);

      await service.findById("1");

      expect(repository.findById).toHaveBeenCalledWith(1);
    });

    it.each([0, NaN, "abc", undefined as any, null as any])(
      "deve lançar ValidationError para id inválido (%s)",
      async (invalidId) => {
        await expect(service.findById(invalidId)).rejects.toThrow(
          ValidationError,
        );
        expect(repository.findById).not.toHaveBeenCalled();
      },
    );

    it("deve lançar EntityNotFound quando o produto não existe", async () => {
      (repository.findById as any).mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(EntityNotFound);
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findById as any).mockRejectedValue(error);

      await expect(service.findById(1)).rejects.toThrow(error);
    });
  });

  describe("create", () => {
    it("deve criar um produto com os dados informados", async () => {
      (repository.create as any).mockResolvedValue(produtoMock);

      const result = await service.create(produtoCreateMock);

      expect(repository.create).toHaveBeenCalledWith(produtoCreateMock);
      expect(result).toEqual(produtoMock);
    });

    it("deve remover espaços em branco das extremidades de sku, nome e descricao", async () => {
      (repository.create as any).mockResolvedValue(produtoMock);

      await service.create({
        ...produtoCreateMock,
        sku: "  ELE-0001  ",
        nome: "  Smartphone XPTO 128GB  ",
        descricao: "  Smartphone com 128GB  ",
      });

      expect(repository.create).toHaveBeenCalledWith({
        ...produtoCreateMock,
        sku: "ELE-0001",
        nome: "Smartphone XPTO 128GB",
        descricao: "Smartphone com 128GB",
      });
    });

    it.each(["", "   ", undefined as any, null as any])(
      "deve lançar ValidationError quando o sku é inválido (%s)",
      async (invalidSku) => {
        await expect(
          service.create({ ...produtoCreateMock, sku: invalidSku }),
        ).rejects.toThrow(ValidationError);
        expect(repository.create).not.toHaveBeenCalled();
      },
    );

    it.each(["", "   ", undefined as any, null as any])(
      "deve lançar ValidationError quando o nome é inválido (%s)",
      async (invalidNome) => {
        await expect(
          service.create({ ...produtoCreateMock, nome: invalidNome }),
        ).rejects.toThrow(ValidationError);
        expect(repository.create).not.toHaveBeenCalled();
      },
    );

    it.each([undefined as any, null as any])(
      "deve lançar ValidationError quando o preco não é informado (%s)",
      async (invalidPreco) => {
        await expect(
          service.create({ ...produtoCreateMock, preco: invalidPreco }),
        ).rejects.toThrow(ValidationError);
        expect(repository.create).not.toHaveBeenCalled();
      },
    );

    it("deve lançar ValidationError quando o preco é negativo", async () => {
      await expect(
        service.create({ ...produtoCreateMock, preco: -10 }),
      ).rejects.toThrow(ValidationError);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError quando a quantidade é negativa", async () => {
      await expect(
        service.create({ ...produtoCreateMock, quantidade: -1 }),
      ).rejects.toThrow(ValidationError);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("unique constraint violation");
      (repository.create as any).mockRejectedValue(error);

      await expect(service.create(produtoCreateMock)).rejects.toThrow(error);
    });
  });

  describe("update", () => {
    it("deve atualizar o produto quando ele existe", async () => {
      const atualizado = { ...produtoMock, preco: 1999.9, quantidade: 30 };
      (repository.findById as any).mockResolvedValue(produtoMock);
      (repository.update as any).mockResolvedValue(atualizado);

      const result = await service.update(1, {
        preco: 1999.9,
        quantidade: 30,
      });

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, {
        preco: 1999.9,
        quantidade: 30,
      });
      expect(result).toEqual(atualizado);
    });

    it("deve remover espaços em branco das extremidades de sku, nome e descricao ao atualizar", async () => {
      (repository.findById as any).mockResolvedValue(produtoMock);
      (repository.update as any).mockResolvedValue(produtoMock);

      await service.update(1, {
        sku: "  ELE-0002  ",
        nome: "  Novo nome  ",
        descricao: "  Nova descricao  ",
      });

      expect(repository.update).toHaveBeenCalledWith(1, {
        sku: "ELE-0002",
        nome: "Novo nome",
        descricao: "Nova descricao",
      });
    });

    it("deve lançar EntityNotFound quando o produto não existe", async () => {
      (repository.findById as any).mockResolvedValue(null);

      await expect(
        service.update(999, { preco: 100 }),
      ).rejects.toThrow(EntityNotFound);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError para id inválido", async () => {
      await expect(
        service.update(0, { preco: 100 }),
      ).rejects.toThrow(ValidationError);
      expect(repository.findById).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError quando o preco é negativo", async () => {
      (repository.findById as any).mockResolvedValue(produtoMock);

      await expect(
        service.update(1, { preco: -5 }),
      ).rejects.toThrow(ValidationError);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError quando a quantidade é negativa", async () => {
      (repository.findById as any).mockResolvedValue(produtoMock);

      await expect(
        service.update(1, { quantidade: -3 }),
      ).rejects.toThrow(ValidationError);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findById as any).mockResolvedValue(produtoMock);
      (repository.update as any).mockRejectedValue(error);

      await expect(
        service.update(1, { preco: 100 }),
      ).rejects.toThrow(error);
    });
  });

  describe("delete", () => {
    it("deve deletar o produto e retornar true", async () => {
      (repository.findById as any).mockResolvedValue(produtoMock);
      (repository.delete as any).mockResolvedValue(undefined);

      const result = await service.delete(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it("deve lançar EntityNotFound quando o produto não existe", async () => {
      (repository.findById as any).mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrow(EntityNotFound);
      expect(repository.delete).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError para id inválido", async () => {
      await expect(service.delete(NaN)).rejects.toThrow(ValidationError);
      expect(repository.findById).not.toHaveBeenCalled();
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findById as any).mockResolvedValue(produtoMock);
      (repository.delete as any).mockRejectedValue(error);

      await expect(service.delete(1)).rejects.toThrow(error);
    });
  });
});