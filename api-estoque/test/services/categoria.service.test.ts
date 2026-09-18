import { describe, it, expect, vi, beforeEach } from "vitest";
import { CategoriaService } from "../../src/services/index";
import { CategoriaRepository } from "../../src/repositories/index";
import { ValidationError, EntityNotFound } from "../../src/errors/index";
import { Categoria } from "../../src/models/Categoria";

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

function makeMockRepository(): CategoriaRepository {
  return {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as CategoriaRepository;
}

const categoriaMock: Categoria = { id: 1, nome: "Alimentação" };

describe("CategoriaService", () => {
  let repository: CategoriaRepository;
  let service: CategoriaService;

  beforeEach(() => {
    repository = makeMockRepository();
    service = new CategoriaService(repository);
    vi.clearAllMocks();
  });

  describe("findAll", () => {
    it("deve retornar todas as categorias", async () => {
      (repository.findAll as any).mockResolvedValue([categoriaMock]);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalledOnce();
      expect(result).toEqual([categoriaMock]);
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findAll as any).mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow(error);
    });
  });

  describe("findById", () => {
    it("deve retornar a categoria quando o id é válido", async () => {
      (repository.findById as any).mockResolvedValue(categoriaMock);

      const result = await service.findById(1);

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(categoriaMock);
    });

    it("deve aceitar id em formato string e converter para number", async () => {
      (repository.findById as any).mockResolvedValue(categoriaMock);

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

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findById as any).mockRejectedValue(error);

      await expect(service.findById(1)).rejects.toThrow(error);
    });
  });

  describe("create", () => {
    it("deve criar uma categoria com o nome informado", async () => {
      (repository.create as any).mockResolvedValue(categoriaMock);

      const result = await service.create("Alimentação");

      expect(repository.create).toHaveBeenCalledWith({
        nome: "Alimentação",
      });
      expect(result).toEqual(categoriaMock);
    });

    it("deve remover espaços em branco das extremidades do nome", async () => {
      (repository.create as any).mockResolvedValue(categoriaMock);

      await service.create("  Alimentação  ");

      expect(repository.create).toHaveBeenCalledWith({
        nome: "Alimentação",
      });
    });

    it.each(["", "   ", undefined as any, null as any])(
      "deve lançar ValidationError quando o nome é inválido (%s)",
      async (invalidNome) => {
        await expect(service.create(invalidNome)).rejects.toThrow(
          ValidationError,
        );
        expect(repository.create).not.toHaveBeenCalled();
      },
    );

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("unique constraint violation");
      (repository.create as any).mockRejectedValue(error);

      await expect(service.create("Alimentação")).rejects.toThrow(error);
    });
  });

  describe("update", () => {
    it("deve atualizar a categoria quando ela existe", async () => {
      const atualizada = { ...categoriaMock, nome: "Transporte" };
      (repository.findById as any).mockResolvedValue(categoriaMock);
      (repository.update as any).mockResolvedValue(atualizada);

      const result = await service.update(1, "Transporte");

      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, {
        nome: "Transporte",
      });
      expect(result).toEqual(atualizada);
    });

    it("deve lançar EntityNotFound quando a categoria não existe", async () => {
      (repository.findById as any).mockResolvedValue(null);

      await expect(service.update(999, "Transporte")).rejects.toThrow(
        EntityNotFound,
      );
      expect(repository.update).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError para id inválido", async () => {
      await expect(service.update(0, "Transporte")).rejects.toThrow(
        ValidationError,
      );
      expect(repository.findById).not.toHaveBeenCalled();
    });

    it("deve lançar ValidationError para nome inválido", async () => {
      await expect(service.update(1, "   ")).rejects.toThrow(ValidationError);
      expect(repository.findById).not.toHaveBeenCalled();
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.findById as any).mockResolvedValue(categoriaMock);
      (repository.update as any).mockRejectedValue(error);

      await expect(service.update(1, "Transporte")).rejects.toThrow(error);
    });
  });

  describe("delete", () => {
    it("deve deletar a categoria e retornar true", async () => {
      (repository.delete as any).mockResolvedValue(undefined);

      const result = await service.delete(1);

      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it("deve lançar ValidationError para id inválido", async () => {
      await expect(service.delete(NaN)).rejects.toThrow(ValidationError);
      expect(repository.delete).not.toHaveBeenCalled();
    });

    it("deve propagar o erro quando o repository falhar", async () => {
      const error = new Error("database offline");
      (repository.delete as any).mockRejectedValue(error);

      await expect(service.delete(1)).rejects.toThrow(error);
    });
  });
});
