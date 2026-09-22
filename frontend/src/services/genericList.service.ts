import type {
  Column,
  TableDataRow,
} from '../components/organisms/Table';

export interface GenericListResponse {
  columns: Column[];
  data: TableDataRow[];
}

function createColumnsFromData(data: TableDataRow[]): Column[] {
  if (data.length === 0) {
    return [];
  }

  return Object.keys(data[0]).map((key) => ({
    key,
    label: key,
  }));
}

export async function fetchGenericList(
  apiUrl: string,
): Promise<GenericListResponse> {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Falha ao buscar os dados.');
  }

  const result = await response.json();

  const data = result.data ?? result;

  if (!Array.isArray(data)) {
    throw new Error(
      'Formato de dados inválido da API. Esperado data como array.',
    );
  }

  return {
    columns: result.columns ?? createColumnsFromData(data),
    data,
  };
}
