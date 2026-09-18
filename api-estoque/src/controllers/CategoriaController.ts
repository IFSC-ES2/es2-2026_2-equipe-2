import { Request, Response } from "express";
import { CategoriaService } from "../services/index";
import logger from "../config/logger";
import { HttpStatus } from "../config/status";
import { createSuccessBodyResponse } from "../utils/createResponseBody";
import { handleError } from "../utils/handleError";
import validateId from "../utils/validateId";

export class CategoriaController {
  private service: CategoriaService;

  constructor() {
    this.service = new CategoriaService();
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      logger.info("[CategoriaController] findAll - fetching all categories");

      const categories = await this.service.findAll();

      logger.info(
        `[CategoriaController] findAll - ${categories?.length || "0"} categories retrieved`,
      );

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(
            HttpStatus.OK,
            "Categories retrieved",
            categories,
          ),
        );
    } catch (error) {
      logger.error(
        "[CategoriaController] findAll - error fetching categories",
        error,
      );
      return handleError(error, res);
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      logger.info(`[CategoriaController] findById - fetching category ${id}`);

      const category = await this.service.findById(id);

      logger.info(`[CategoriaController] findById - category ${id} retrieved`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(
            HttpStatus.OK,
            "Category retrieved",
            category,
          ),
        );
    } catch (error) {
      logger.error(
        `[CategoriaController] findById - error fetching category ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome }: { nome: string } = req.body;
      logger.info(`[CategoriaController] create - creating category "${nome}"`);

      const created = await this.service.create(nome);

      logger.info(
        `[CategoriaController] create - category created with id ${created.id}`,
      );

      return res
        .status(HttpStatus.CREATED)
        .json(
          createSuccessBodyResponse(
            HttpStatus.CREATED,
            "Category created",
            created,
          ),
        );
    } catch (error) {
      logger.error(
        "[CategoriaController] create - error creating category",
        error,
      );
      return handleError(error, res);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      const { nome }: { nome: string } = req.body;

      logger.info(`[CategoriaController] update - updating category ${id}`);

      const category = await this.service.update(id, nome);

      logger.info(`[CategoriaController] update - category ${id} updated`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(
            HttpStatus.OK,
            "Category updated",
            category,
          ),
        );
    } catch (error) {
      logger.error(
        `[CategoriaController] update - error updating category ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      logger.info(`[CategoriaController] delete - deleting category ${id}`);

      const deleted = await this.service.delete(id);

      logger.info(`[CategoriaController] delete - category ${id} deleted`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Category deleted", deleted),
        );
    } catch (error) {
      logger.error(
        `[CategoriaController] delete - error deleting category ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }
}
