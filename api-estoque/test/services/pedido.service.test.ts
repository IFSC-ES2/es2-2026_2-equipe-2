import { describe, it, expect, vi, beforeEach } from "vitest";
import { PedidoService } from "../../src/services/index";
import {
  PedidoRepository,
  ClienteRepository,
  ProdutoRepository,
} from "../../src/repositories/index";
import { ValidationError, EntityNotFound } from "../../src/errors/index";
import {
  Pedido,
  PedidoCreate,
  PedidoComRelacionamentos,
  ItemPedidoComProduto,
} from "../../src/models/Pedido";
import { Cliente } from "../../src/models/Cliente";
import { Produto } from "../../src/models/Produto";

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

function makeMockPedidoRepository(): PedidoRepository {
  return {
    findAllComRelacionamentos: vi.fn(),
    findByIdComRelacionamentos: vi.fn(),
    createComItens: vi.fn(),
  } as unknown as PedidoRepository;
}

function makeMockClienteRepository(): ClienteRepository {
  return {
    findById: vi.fn(),
  } as unknown as ClienteRepository;
}

function makeMockProdutoRepository(): ProdutoRepository {
  return {
    findById: vi.fn(),
  } as unknown as ProdutoRepository;
}

const clienteMock: Cliente = {
  id: 1,
  nome: "Maria Silva",
  email: "maria.silva@email.com",
  telefone: "(11) 98888-1111",
  documento: "123.456.789-00",
  endereco: "Rua das Flores, 100 - São Paulo/SP",
  criado_em: new Date("2026-01-01T00:00:00.000Z"),
};

const produtoMock: Produto = {
  id: 1,
  sku: "ELE-0001",
  nome: "Smartphone XPTO 128GB",
  descricao: "Smartphone com 128GB de armazenamento e câmera tripla",
  categoria_id: 1,
  fornecedor_id: 1,
  preco: 1000,
  quantidade: 25,
  estoque_minimo: 5,
  criado_em: new Date("2026-01-01T00:00:00.000Z"),
  atualizado_em: new Date("2026-01-01T00:00:00.000Z"),
};

const pedidoMock: Pedido = {
  id: 1,
  cliente_id: 1,
  status: "PENDENTE",
  data_pedido: new Date("2026-01-01T00:00:00.000Z"),
  valor_total: 1800,
};

const itemPedidoComProdutoMock: ItemPedidoComProduto = {
  id: 1,
  pedido_id: 1,
  produto_id: 1,
  quantidade: 2,
  preco_unitario: 900,
  produto: produtoMock,
};

const pedidoComRelacionamentosMock: PedidoComRelacionamentos = {
  ...pedidoMock,
  cliente: clienteMock,
  itens: [itemPedidoComProdutoMock],
};

const pedidoCreateMock: PedidoCreate = {
  cliente_id: 1,
  data_pedido: new Date("2026-01-01T00:00:00.000Z"),
  itens: [{ produto_id: 1, quantidade: 2, preco_unitario: 900 }],
};

describe("PedidoService", () => {
  let repository: PedidoRepository;
  let clienteRepository: ClienteRepository;
  let produtoRepository: ProdutoRepository;
  let service: PedidoService;

  beforeEach(() => {
    repository = makeMockPedidoRepository();
    clienteRepository = makeMockClienteRepository();
    produtoRepository = makeMockProdutoRepository();
    service = new PedidoService(
      repository,
      clienteRepository,
      produtoRepository,
    );
    vi.clearAllMocks();
  });

  describe("findAll", () => {
    it("deve retornar todos os pedidos", async () => {
      vi.mocked(repository.findAllComRelacionamentos).mockResolvedValue([
        pedidoComRelacionamentosMock,
      ]);

      const result = await service.findAll();

      expect(repository.findAllComRelacionamentos).toHaveBeenCalledOnce();
      expect(result).toEqual([pedidoComRelacionamentosMock]);
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      vi.mocked(repository.findAllComRelacionamentos).mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(error);
    });
  });

  describe("findById", () => {
    it("deve retornar o pedido quando o id é válido", async () => {
      vi.mocked(repository.findByIdComRelacionamentos).mockResolvedValue(
        pedidoComRelacionamentosMock,
      );

      const result = await service.findById(1);

      expect(repository.findByIdComRelacionamentos).toHaveBeenCalledWith(1);
      expect(result).toEqual(pedidoComRelacionamentosMock);
    });

    it("deve aceitar id em formato string e converter para number", async () => {
      vi.mocked(repository.findByIdComRelacionamentos).mockResolvedValue(
        pedidoComRelacionamentosMock,
      );

      await service.findById("1");

      expect(repository.findByIdComRelacionamentos).toHaveBeenCalledWith(1);
    });

    it.each([0, NaN, "abc", undefined as never, null as never])(
      "deve lançar ValidationError para id inválido (%s)",
      async (invalidId) => {
        await expect(service.findById(invalidId)).rejects.toThrow(
          ValidationError,
        );
        expect(repository.findByIdComRelacionamentos).not.toHaveBeenCalled();
      },
    );

    it("deve lançar EntityNotFound quando o pedido não existe", async () => {
      vi.mocked(repository.findByIdComRelacionamentos).mockResolvedValue(null);

      await expect(service.findById(999)).rejects.toThrow(EntityNotFound);
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      vi.mocked(repository.findByIdComRelacionamentos).mockRejectedValue(error);

      await expect(service.findById(1)).rejects.toThrow(error);
    });
  });

  describe("create", () => {
    it("deve criar um pedido com os dados informados", async () => {
      vi.mocked(clienteRepository.findById).mockResolvedValue(clienteMock);
      vi.mocked(produtoRepository.findById).mockResolvedValue(produtoMock);
      vi.mocked(repository.createComItens).mockResolvedValue(pedidoMock);

      const result = await service.create(pedidoCreateMock);

      expect(repository.createComItens).toHaveBeenCalledWith({
        cliente_id: 1,
        data_pedido: new Date("2026-01-01T00:00:00.000Z"),
        itens: [{ produto_id: 1, quantidade: 2, preco_unitario: 900 }],
      });
      expect(result).toEqual(pedidoMock);
    });

    it("deve lançar ValidationError quando cliente_id não é informado", async () => {
      await expect(
        service.create({ ...pedidoCreateMock, cliente_id: undefined as never }),
      ).rejects.toThrow(ValidationError);
      expect(repository.createComItens).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError quando a lista de itens está vazia", async () => {
      await expect(
        service.create({ ...pedidoCreateMock, itens: [] }),
      ).rejects.toThrow(ValidationError);
      expect(repository.createComItens).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError quando o cliente não existe", async () => {
      vi.mocked(clienteRepository.findById).mockResolvedValue(null);

      await expect(service.create(pedidoCreateMock)).rejects.toThrow(
        ValidationError,
      );
      expect(repository.createComItens).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError quando o produto não existe", async () => {
      vi.mocked(clienteRepository.findById).mockResolvedValue(clienteMock);
      vi.mocked(produtoRepository.findById).mockResolvedValue(null);

      await expect(service.create(pedidoCreateMock)).rejects.toThrow(
        ValidationError,
      );
      expect(repository.createComItens).not.toHaveBeenCalled();
    });

    it.each([0, -1, undefined as never, null as never])(
      "deve lançar ValidationError quando a quantidade do item é inválida (%s)",
      async (invalidQtd) => {
        vi.mocked(clienteRepository.findById).mockResolvedValue(clienteMock);
        vi.mocked(produtoRepository.findById).mockResolvedValue(produtoMock);

        await expect(
          service.create({
            ...pedidoCreateMock,
            itens: [
              { produto_id: 1, quantidade: invalidQtd, preco_unitario: 900 },
            ],
          }),
        ).rejects.toThrow(ValidationError);
        expect(repository.createComItens).not.toHaveBeenCalled();
      },
    );

    it("deve lançar ValidationError quando o preço unitário é maior que o preço do produto", async () => {
      vi.mocked(clienteRepository.findById).mockResolvedValue(clienteMock);
      vi.mocked(produtoRepository.findById).mockResolvedValue(produtoMock);

      await expect(
        service.create({
          ...pedidoCreateMock,
          itens: [{ produto_id: 1, quantidade: 1, preco_unitario: 1001 }],
        }),
      ).rejects.toThrow(ValidationError);
      expect(repository.createComItens).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError quando o desconto ultrapassa 15%", async () => {
      vi.mocked(clienteRepository.findById).mockResolvedValue(clienteMock);
      vi.mocked(produtoRepository.findById).mockResolvedValue(produtoMock);

      await expect(
        service.create({
          ...pedidoCreateMock,
          itens: [{ produto_id: 1, quantidade: 1, preco_unitario: 849 }],
        }),
      ).rejects.toThrow(ValidationError);
      expect(repository.createComItens).not.toHaveBeenCalled();
    });

    it("deve aceitar preço unitário no limite exato de 15% de desconto", async () => {
      vi.mocked(clienteRepository.findById).mockResolvedValue(clienteMock);
      vi.mocked(produtoRepository.findById).mockResolvedValue(produtoMock);
      vi.mocked(repository.createComItens).mockResolvedValue(pedidoMock);

      await expect(
        service.create({
          ...pedidoCreateMock,
          itens: [{ produto_id: 1, quantidade: 1, preco_unitario: 850 }],
        }),
      ).resolves.toEqual(pedidoMock);
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      vi.mocked(clienteRepository.findById).mockResolvedValue(clienteMock);
      vi.mocked(produtoRepository.findById).mockResolvedValue(produtoMock);
      vi.mocked(repository.createComItens).mockRejectedValue(error);

      await expect(service.create(pedidoCreateMock)).rejects.toThrow(error);
    });
  });
});
