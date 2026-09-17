import { ValidationError, EntityNotFound } from "../errors/index";
import { Categoria } from "../models/index";
import { CategoriaRepository } from "../repositories/Categoria.repository";
import logger from "../config/logger";
import validateId from "../utils/validateId";

const ENTITY_NAME = "categoria";

export class CategoriaService {
  private repository: CategoriaRepository;

  constructor(repository?: CategoriaRepository) {
    this.repository = repository ?? new CategoriaRepository();
  }

  public async findAll(): Promise<Categoria[] | null> {
    try {
      logger.info("[Categoria.service] findAll - fetching all categories");

      const categorias = await this.repository.findAll();

      logger.info(
        `[Categoria.service] findAll - ${categorias?.length || "0"} categories retrieved`,
      );

      return categorias;
    } catch (error) {
      logger.error(
        "[Categoria.service] findAll - error fetching categories",
        error,
      );
      throw error;
    }
  }

  public async findById(id: number | string): Promise<Categoria | null> {
    try {
      const parsedId = Number(id);
      logger.info(
        `[Categoria.service] findById - fetching category ${parsedId}`,
      );

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const categoria = await this.repository.findById(parsedId);

      logger.info(
        `[Categoria.service] findById - category ${parsedId} retrieved`,
      );

      return categoria;
    } catch (error) {
      logger.error(
        `[Categoria.service] findById - error fetching category ${id}`,
        error,
      );
      throw error;
    }
  }

  public async create(nome: string): Promise<Categoria> {
    try {
      const trimmedNome = nome?.trim();
      logger.info(
        `[Categoria.service] create - creating category "${trimmedNome}"`,
      );

      if (!trimmedNome) {
        throw ValidationError.requiredField("nome", ENTITY_NAME);
      }

      const created = await this.repository.create({ nome: trimmedNome });

      logger.info(
        `[Categoria.service] create - category created with id ${created.id}`,
      );

      return created;
    } catch (error) {
      logger.error(
        "[Categoria.service] create - error creating category",
        error,
      );
      throw error;
    }
  }

  public async update(
    id: number | string,
    nome: string,
  ): Promise<Categoria | null> {
    try {
      const parsedId = Number(id);
      const trimmedNome = nome?.trim();
      logger.info(`[Categoria.service] update - updating category ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      if (!trimmedNome) {
        throw ValidationError.requiredField("nome", ENTITY_NAME);
      }

      const categoria = await this.repository.findById(parsedId);

      if (!categoria) throw new EntityNotFound(ENTITY_NAME);

      const updated = await this.repository.update(categoria.id, {
        nome: trimmedNome,
      });

      logger.info(`[Categoria.service] update - category ${parsedId} updated`);

      return updated;
    } catch (error) {
      logger.error(
        `[Categoria.service] update - error updating category ${id}`,
        error,
      );
      throw error;
    }
  }

  public async delete(id: number | string): Promise<boolean> {
    try {
      const parsedId = Number(id);
      logger.info(`[Categoria.service] delete - deleting category ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      await this.repository.delete(parsedId);

      logger.info(`[Categoria.service] delete - category ${parsedId} deleted`);

      return true;
    } catch (error) {
      logger.error(
        `[Categoria.service] delete - error deleting category ${id}`,
        error,
      );
      throw error;
    }
  }
}
