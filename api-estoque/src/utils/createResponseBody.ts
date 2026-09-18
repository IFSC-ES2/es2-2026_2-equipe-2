export interface BodyResponse {
  success: boolean;
  status: number;
  title: string;
  data: unknown;
}

function buildBodyResponse(
  success: boolean,
  status: number,
  title: string,
  data: unknown,
): BodyResponse {
  return {
    success,
    status,
    title,
    data,
  };
}

export function createSuccessBodyResponse(
  status: number,
  title: string,
  data: unknown,
): BodyResponse {
  return buildBodyResponse(true, status, title, data);
}

export function createErrorBodyResponse(
  status: number,
  title: string,
  data: unknown,
): BodyResponse {
  return buildBodyResponse(false, status, title, data);
}
