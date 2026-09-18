import { AppError } from "./AppError";
import { HttpStatus } from "..//config/status";

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }

  static invalidId(entityName: string): ValidationError {
    return new ValidationError(
      `The ${entityName} id is required and must be a valid number`,
    );
  }

  static requiredField(fieldName: string, entityName: string): ValidationError {
    return new ValidationError(`The ${entityName} ${fieldName} is required`);
  }
}
