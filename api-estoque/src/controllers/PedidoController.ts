import { Request, Response } from "express";
import { PedidoService } from "../services/index";
import logger from "../config/logger";
import { HttpStatus } from "../config/status";
import { createSuccessBodyResponse } from "../utils/createResponseBody";
import { handleError } from "../utils/handleError";
import validateId from "../utils/validateId";
import { PedidoCreate, PedidoUpdate } from "../models/index";

export class PedidoController {
  private service: PedidoService;

  constructor() {
    this.service = new PedidoService();
  }

  public async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      logger.info("[PedidoController] findAll - fetching all orders");
      const pedidos = await this.service.findAll();
      logger.info(
        `[PedidoController] findAll - ${pedidos?.length || "0"} orders retrieved`,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Orders retrieved", pedidos),
        );
    } catch (error) {
      logger.error("[PedidoController] findAll - error fetching orders", error);
      return handleError(error, res);
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      logger.info(`[PedidoController] findById - fetching order ${id}`);
      const pedido = await this.service.findById(id);
      logger.info(`[PedidoController] findById - order ${id} retrieved`);
      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Order retrieved", pedido),
        );
    } catch (error) {
      logger.error(
        `[PedidoController] findById - error fetching order ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const data: PedidoCreate = req.body;
      logger.info(
        `[PedidoController] create - creating order for client "${data?.cliente_id}"`,
      );
      const created = await this.service.create(data);
      logger.info(
        `[PedidoController] create - order created with id ${created.id}`,
      );
      return res
        .status(HttpStatus.CREATED)
        .json(
          createSuccessBodyResponse(
            HttpStatus.CREATED,
            "Order created",
            created,
          ),
        );
    } catch (error) {
      logger.error("[PedidoController] create - error creating order", error);
      return handleError(error, res);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      const data: PedidoUpdate = req.body;

      logger.info(`[PedidoController] update - updating order ${id}`);

      const pedido = await this.service.update(id, data);

      logger.info(`[PedidoController] update - order ${id} updated`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Order updated", pedido),
        );
    } catch (error) {
      logger.error(
        `[PedidoController] update - error updating order ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = validateId(req.params.id);
      logger.info(`[PedidoController] delete - deleting order ${id}`);

      const deleted = await this.service.delete(id);

      logger.info(`[PedidoController] delete - order ${id} deleted`);

      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(HttpStatus.OK, "Order deleted", deleted),
        );
    } catch (error) {
      logger.error(
        `[PedidoController] delete - error deleting order ${req.params.id}`,
        error,
      );
      return handleError(error, res);
    }
  }
}
