import { Request, Response } from "express";
import { ProdutoService } from "../services/index";
import logger from "../config/logger";
import { HttpStatus } from "../config/status";
import { createSuccessBodyResponse } from "../utils/createResponseBody";
import { handleError } from "../utils/handleError";
import validateId from "../utils/validateId";
import { ProdutoCreate, ProdutoUpdate } from "../models/index";

export class ProdutoController {
  private service: ProdutoService;

  constructor() {
    this.service = new ProdutoService();
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      logger.info("[ProdutoController] findAll - fetching all products");

      const produtos = await this.service.findAll();

      logger.info(
        `[ProdutoController] findAll - ${produtos?.length || "0"} products retrieved`,
      );

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(
            HttpStatus.OK,
            "Products retrieved",
            produtos,
          ),
        );
    } catch (error) {
      logger.error(
        "[ProdutoController] findAll - error fetching products",
        error,
      );
      return handleError(error, res);
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      logger.info(`[ProdutoController] findById - fetching product ${id}`);

      const produto = await this.service.findById(id);

      logger.info(`[ProdutoController] findById - product ${id} retrieved`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Product retrieved", produto),
        );
    } catch (error) {
      logger.error(
        `[ProdutoController] findById - error fetching product ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const data: ProdutoCreate = req.body;
      logger.info(`[ProdutoController] create - creating product "${data?.nome}"`);

      const created = await this.service.create(data);

      logger.info(
        `[ProdutoController] create - product created with id ${created.id}`,
      );

      return res
        .status(HttpStatus.CREATED)
        .json(
          createSuccessBodyResponse(
            HttpStatus.CREATED,
            "Product created",
            created,
          ),
        );
    } catch (error) {
      logger.error(
        "[ProdutoController] create - error creating product",
        error,
      );
      return handleError(error, res);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      const data: ProdutoUpdate = req.body;

      logger.info(`[ProdutoController] update - updating product ${id}`);

      const produto = await this.service.update(id, data);

      logger.info(`[ProdutoController] update - product ${id} updated`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Product updated", produto),
        );
    } catch (error) {
      logger.error(
        `[ProdutoController] update - error updating product ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      logger.info(`[ProdutoController] delete - deleting product ${id}`);

      const deleted = await this.service.delete(id);

      logger.info(`[ProdutoController] delete - product ${id} deleted`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Product deleted", deleted),
        );
    } catch (error) {
      logger.error(
        `[ProdutoController] delete - error deleting product ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }
}