import { AppError } from "./AppError";
import { HttpStatus } from "../config/status";

export class ForeignKeyViolationError extends AppError {
  constructor(
    message: string = "Operação não pode ser concluída devido a restrição de chave estrangeira",
  ) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
