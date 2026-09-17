import { AppError } from "../errors/AppError";
import { createErrorBodyResponse, BodyResponse } from "./createResponseBody";
import { HttpStatus } from "../config/status";
import { Response } from "express";

export function handleError(baseError: unknown, res: Response): Response {
  const error =
    baseError instanceof Error ? baseError : new Error(String(baseError));

  const baseResponse = createErrorBodyResponse(
    HttpStatus.INTERNAL_SERVER_ERROR,
    error.message,
    error,
  );

  if (error instanceof AppError) {
    const statusResponse: number = error.statusCode;
    const result: BodyResponse = {
      ...baseResponse,
      status: statusResponse,
    };
    return res.status(statusResponse).json(result);
  }

  const result: BodyResponse = {
    ...baseResponse,
    title: "Internal error",
  };
  return res.status(result.status).json(result);
}
