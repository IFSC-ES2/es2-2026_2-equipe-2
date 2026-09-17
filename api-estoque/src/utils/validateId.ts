export default function validateId(id: number): boolean {
  return !!id && !Number.isNaN(id);
}
