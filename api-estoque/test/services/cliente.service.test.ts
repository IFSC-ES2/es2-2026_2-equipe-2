import { describe, it, expect, vi, beforeEach } from "vitest";
import { ClienteService } from "../../src/services/index";
import { ClienteRepository } from "../../src/repositories/index";
import { ValidationError, EntityNotFound } from "../../src/errors/index";
import { Cliente, ClienteCreate } from "../../src/models/Cliente";

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

function makeMockRepository(): ClienteRepository {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as ClienteRepository;
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

const clienteCreateMock: ClienteCreate = {
  nome: "Maria Silva",
  email: "maria.silva@email.com",
  telefone: "(11) 98888-1111",
  documento: "123.456.789-00",
  endereco: "Rua das Flores, 100 - São Paulo/SP",
};

describe("ClienteService", () => {
  let repository: ClienteRepository;
  let service: ClienteService;

  beforeEach(() => {
    repository = makeMockRepository();
    service = new ClienteService(repository);
    vi.clearAllMocks();
  });

  describe("findAll", () => {
    it("deve retornar todos os clientes", async () => {
      (repository.findAll as any).mockResolvedValue([clienteMock]);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalledOnce();
      expect(result).toEqual([clienteMock]);
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findAll as any).mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(error);
    });
  });

  describe("findById", () => {
    it("deve retornar o cliente quando o id é válido", async () => {
      (repository.findById as any).mockResolvedValue(clienteMock);

      const result = await service.findById(1);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(clienteMock);
    });

    it("deve aceitar id em formato string e converter para number", async () => {
      (repository.findById as any).mockResolvedValue(clienteMock);

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

    it("deve lançar EntityNotFound quando o cliente não existe", async () => {
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
    it("deve criar um cliente com os dados informados", async () => {
      (repository.create as any).mockResolvedValue(clienteMock);

      const result = await service.create(clienteCreateMock);

      expect(repository.create).toHaveBeenCalledWith(clienteCreateMock);
      expect(result).toEqual(clienteMock);
    });

    it("deve remover espaços em branco das extremidades de nome, email, telefone, documento e endereco", async () => {
      (repository.create as any).mockResolvedValue(clienteMock);

      await service.create({
        ...clienteCreateMock,
        nome: "  Maria Silva  ",
        email: "  maria.silva@email.com  ",
        telefone: "  (11) 98888-1111  ",
        documento: "  123.456.789-00  ",
        endereco: "  Rua das Flores, 100 - São Paulo/SP  ",
      });

      expect(repository.create).toHaveBeenCalledWith(clienteCreateMock);
    });

    it.each(["", "   ", undefined as any, null as any])(
      "deve lançar ValidationError quando o nome é inválido (%s)",
      async (invalidNome) => {
        await expect(
          service.create({ ...clienteCreateMock, nome: invalidNome }),
        ).rejects.toThrow(ValidationError);
        expect(repository.create).not.toHaveBeenCalled();
      },
    );

    it.each(["", "   ", undefined as any, null as any])(
      "deve lançar ValidationError quando o email é inválido (%s)",
      async (invalidEmail) => {
        await expect(
          service.create({ ...clienteCreateMock, email: invalidEmail }),
        ).rejects.toThrow(ValidationError);
        expect(repository.create).not.toHaveBeenCalled();
      },
    );

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("unique constraint violation");
      (repository.create as any).mockRejectedValue(error);

      await expect(service.create(clienteCreateMock)).rejects.toThrow(error);
    });
  });

  describe("update", () => {
    it("deve atualizar o cliente quando ele existe", async () => {
      const atualizado = { ...clienteMock, telefone: "(11) 90000-0000" };
      (repository.findById as any).mockResolvedValue(clienteMock);
      (repository.update as any).mockResolvedValue(atualizado);

      const result = await service.update(1, {
        telefone: "(11) 90000-0000",
      });

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, {
        telefone: "(11) 90000-0000",
      });
      expect(result).toEqual(atualizado);
    });

    it("deve remover espaços em branco das extremidades de nome, email, telefone, documento e endereco ao atualizar", async () => {
      (repository.findById as any).mockResolvedValue(clienteMock);
      (repository.update as any).mockResolvedValue(clienteMock);

      await service.update(1, {
        nome: "  Novo Nome  ",
        email: "  novo@email.com  ",
        telefone: "  (11) 90000-0000  ",
        documento: "  987.654.321-00  ",
        endereco: "  Nova Rua, 200  ",
      });

      expect(repository.update).toHaveBeenCalledWith(1, {
        nome: "Novo Nome",
        email: "novo@email.com",
        telefone: "(11) 90000-0000",
        documento: "987.654.321-00",
        endereco: "Nova Rua, 200",
      });
    });

    it("deve lançar EntityNotFound quando o cliente não existe", async () => {
      (repository.findById as any).mockResolvedValue(null);

      await expect(
        service.update(999, { nome: "Novo Nome" }),
      ).rejects.toThrow(EntityNotFound);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError para id inválido", async () => {
      await expect(
        service.update(0, { nome: "Novo Nome" }),
      ).rejects.toThrow(ValidationError);
      expect(repository.findById).not.toHaveBeenCalled();
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findById as any).mockResolvedValue(clienteMock);
      (repository.update as any).mockRejectedValue(error);

      await expect(
        service.update(1, { nome: "Novo Nome" }),
      ).rejects.toThrow(error);
    });
  });

  describe("delete", () => {
    it("deve deletar o cliente e retornar true", async () => {
      (repository.findById as any).mockResolvedValue(clienteMock);
      (repository.delete as any).mockResolvedValue(undefined);

      const result = await service.delete(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it("deve lançar EntityNotFound quando o cliente não existe", async () => {
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
      (repository.findById as any).mockResolvedValue(clienteMock);
      (repository.delete as any).mockRejectedValue(error);

      await expect(service.delete(1)).rejects.toThrow(error);
    });
  });
});