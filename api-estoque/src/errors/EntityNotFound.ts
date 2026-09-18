import { AppError } from "./AppError";
import { HttpStatus } from "../config/status";

export class EntityNotFound extends AppError {
  constructor(entityName: string = "Resource") {
    super(
      `The ${entityName} passed on the id wasn't found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
