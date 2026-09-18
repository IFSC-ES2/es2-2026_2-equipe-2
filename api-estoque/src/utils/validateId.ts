import { ValidationError } from "../errors/index";

export default function validateId(
  rawId: number | string | string[] | undefined,
): number {
  const value = Array.isArray(rawId) ? rawId[0] : rawId;

  const id = Number(value);

  if (value === undefined || value === "" || Number.isNaN(id)) {
    throw new ValidationError("ID inválido");
  }

  return id;
}
