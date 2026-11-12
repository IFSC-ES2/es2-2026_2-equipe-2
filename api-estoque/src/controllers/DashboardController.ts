import { Request, Response } from "express";
import { DashboardService } from "../services/index";
import logger from "../config/logger";
import { HttpStatus } from "../config/status";
import { createSuccessBodyResponse } from "../utils/createResponseBody";
import { handleError } from "../utils/handleError";

export class DashboardController {
  private service: DashboardService;

  constructor() {
    this.service = new DashboardService();
  }

  public async getResumo(req: Request, res: Response): Promise<Response> {
    try {
      const periodo = req.query.periodo as string | undefined;
      logger.info(
        `[DashboardController] getResumo - fetching summary (periodo=${periodo ?? "default"})`,
      );
      const resumo = await this.service.getResumo(periodo);
      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(
            HttpStatus.OK,
            "Dashboard summary retrieved",
            resumo,
          ),
        );
    } catch (error) {
      logger.error(
        "[DashboardController] getResumo - error fetching summary",
        error,
      );
      return handleError(error, res);
    }
  }
}
