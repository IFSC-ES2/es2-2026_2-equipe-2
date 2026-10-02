import { Request, Response } from "express";
import { FornecedorService } from "../services/Fornecedor.service";
import { HttpStatus } from "../config/status";
import { createSuccessBodyResponse } from "../utils/createResponseBody";
import { handleError } from "../utils/handleError";

export class FornecedorController {
  private service: FornecedorService;
  constructor() {
    this.service = new FornecedorService();
  }
  public async findAll(_req: Request, res: Response): Promise<Response> {
    try {
      const fornecedores = await this.service.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createSuccessBodyResponse(
            HttpStatus.OK,
            "Fornecedores retrieved",
            fornecedores,
          ),
        );
    } catch (error) {
      return handleError(error, res);
    }
  }
}
