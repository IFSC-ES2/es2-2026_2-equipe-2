import type {
  Column,
  TableDataRow,
} from '../components/organisms/GenericTable';

export interface GenericListResponse {
  columns: Column[];
  data: TableDataRow[];
}

export async function fetchGenericList(
  apiUrl: string,
): Promise<GenericListResponse> {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Falha ao buscar os dados.');
  }

  const result = await response.json();

  if (!result.columns || !result.data) {
    throw new Error(
      'Formato de dados inválido da API. Esperado { columns, data }',
    );
  }

  return {
    columns: result.columns,
    data: result.data,
  };
}
