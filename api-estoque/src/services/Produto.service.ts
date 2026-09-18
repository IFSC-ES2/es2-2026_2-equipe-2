import { ValidationError, EntityNotFound } from "../errors/index";
import { Produto, ProdutoCreate, ProdutoUpdate } from "../models/index";
import { ProdutoRepository } from "../repositories/Produto.repository";
import logger from "../config/logger";
import validateId from "../utils/validateId";

const ENTITY_NAME = "produto";

export class ProdutoService {
  private repository: ProdutoRepository;

  constructor(repository?: ProdutoRepository) {
    this.repository = repository ?? new ProdutoRepository();
  }

  public async findAll(): Promise<Produto[] | null> {
    try {
      logger.info("[Produto.service] findAll - fetching all products");

      const produtos = await this.repository.findAll();

      logger.info(
        `[Produto.service] findAll - ${produtos?.length || "0"} products retrieved`,
      );

      return produtos;
    } catch (error) {
      logger.error(
        "[Produto.service] findAll - error fetching products",
        error,
      );
      throw error;
    }
  }

  public async findById(id: number | string): Promise<Produto | null> {
    try {
      const parsedId = Number(id);
      logger.info(`[Produto.service] findById - fetching product ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const produto = await this.repository.findById(parsedId);

      if (!produto) throw new EntityNotFound(ENTITY_NAME);

      logger.info(`[Produto.service] findById - product ${parsedId} retrieved`);

      return produto;
    } catch (error) {
      logger.error(
        `[Produto.service] findById - error fetching product ${id}`,
        error,
      );
      throw error;
    }
  }

  public async create(data: ProdutoCreate): Promise<Produto> {
    try {
      const sku = data?.sku?.trim();
      const nome = data?.nome?.trim();

      logger.info(`[Produto.service] create - creating product "${nome}"`);

      if (!sku) throw ValidationError.requiredField("sku", ENTITY_NAME);
      if (!nome) throw ValidationError.requiredField("nome", ENTITY_NAME);
      if (data.preco === undefined || data.preco === null) {
        throw ValidationError.requiredField("preco", ENTITY_NAME);
      }
      if (data.preco < 0) {
        throw new ValidationError("O preco do produto não pode ser negativo");
      }
      if (data.quantidade !== undefined && data.quantidade < 0) {
        throw new ValidationError(
          "A quantidade do produto não pode ser negativa",
        );
      }

      const created = await this.repository.create({
        ...data,
        sku,
        nome,
        descricao:
          typeof data.descricao === "string" ? data.descricao.trim() : data.descricao,
      });

      logger.info(
        `[Produto.service] create - product created with id ${created.id}`,
      );

      return created;
    } catch (error) {
      logger.error(
        "[Produto.service] create - error creating product",
        error,
      );
      throw error;
    }
  }

  public async update(
    id: number | string,
    data: ProdutoUpdate,
  ): Promise<Produto | null> {
    try {
      const parsedId = Number(id);
      logger.info(`[Produto.service] update - updating product ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const produto = await this.repository.findById(parsedId);
      if (!produto) throw new EntityNotFound(ENTITY_NAME);

      if (data.preco !== undefined && data.preco < 0) {
        throw new ValidationError("O preco do produto não pode ser negativo");
      }
      if (data.quantidade !== undefined && data.quantidade < 0) {
        throw new ValidationError(
          "A quantidade do produto não pode ser negativa",
        );
      }

      const updateData: ProdutoUpdate = { ...data };
      if (data.sku !== undefined) updateData.sku = data.sku.trim();
      if (data.nome !== undefined) updateData.nome = data.nome.trim();
      if (typeof data.descricao === "string") {
        updateData.descricao = data.descricao.trim();
      }

      const updated = await this.repository.update(parsedId, updateData);

      logger.info(`[Produto.service] update - product ${parsedId} updated`);

      return updated;
    } catch (error) {
      logger.error(
        `[Produto.service] update - error updating product ${id}`,
        error,
      );
      throw error;
    }
  }

  public async delete(id: number | string): Promise<boolean> {
    try {
      const parsedId = Number(id);
      logger.info(`[Produto.service] delete - deleting product ${parsedId}`);

      if (!validateId(parsedId)) {
        throw ValidationError.invalidId(ENTITY_NAME);
      }

      const produto = await this.repository.findById(parsedId);
      if (!produto) throw new EntityNotFound(ENTITY_NAME);

      await this.repository.delete(parsedId);

      logger.info(`[Produto.service] delete - product ${parsedId} deleted`);

      return true;
    } catch (error) {
      logger.error(
        `[Produto.service] delete - error deleting product ${id}`,
        error,
      );
      throw error;
    }
  }
}