import { Request, Response } from "express";
import { ClienteService } from "../services/index";
import logger from "../config/logger";
import { HttpStatus } from "../config/status";
import { createSuccessBodyResponse } from "../utils/createResponseBody";
import { handleError } from "../utils/handleError";
import validateId from "../utils/validateId";
import { ClienteCreate, ClienteUpdate } from "../models/index";

export class ClienteController {
  private service: ClienteService;

  constructor() {
    this.service = new ClienteService();
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      logger.info("[ClienteController] findAll - fetching all clients");

      const clientes = await this.service.findAll();

      logger.info(
        `[ClienteController] findAll - ${clientes?.length || "0"} clients retrieved`,
      );

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(
            HttpStatus.OK,
            "Clients retrieved",
            clientes,
          ),
        );
    } catch (error) {
      logger.error(
        "[ClienteController] findAll - error fetching clients",
        error,
      );
      return handleError(error, res);
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      logger.info(`[ClienteController] findById - fetching client ${id}`);

      const cliente = await this.service.findById(id);

      logger.info(`[ClienteController] findById - client ${id} retrieved`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Client retrieved", cliente),
        );
    } catch (error) {
      logger.error(
        `[ClienteController] findById - error fetching client ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const data: ClienteCreate = req.body;
      logger.info(
        `[ClienteController] create - creating client "${data?.nome}"`,
      );

      const created = await this.service.create(data);

      logger.info(
        `[ClienteController] create - client created with id ${created.id}`,
      );

      return res
        .status(HttpStatus.CREATED)
        .json(
          createSuccessBodyResponse(
            HttpStatus.CREATED,
            "Client created",
            created,
          ),
        );
    } catch (error) {
      logger.error("[ClienteController] create - error creating client", error);
      return handleError(error, res);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      const data: ClienteUpdate = req.body;

      logger.info(`[ClienteController] update - updating client ${id}`);

      const cliente = await this.service.update(id, data);

      logger.info(`[ClienteController] update - client ${id} updated`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Client updated", cliente),
        );
    } catch (error) {
      logger.error(
        `[ClienteController] update - error updating client ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      logger.info(`[ClienteController] delete - deleting client ${id}`);

      const deleted = await this.service.delete(id);

      logger.info(`[ClienteController] delete - client ${id} deleted`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Client deleted", deleted),
        );
    } catch (error) {
      logger.error(
        `[ClienteController] delete - error deleting client ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }
}
