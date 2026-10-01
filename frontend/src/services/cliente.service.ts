import type { Column } from '../components/organisms/Table';
import {
  fetchGenericList,
  type GenericListResponse,
} from './genericList.service';

import type {
  Cliente,
  ClienteCreate,
  ClienteUpdate,
} from '../interfaces/cliente.interface';

const CLIENTES_API_URL = 'http://localhost:8080/api/clientes';

const clienteLabels: Record<string, string> = {
  id: 'ID',
  nome: 'Nome',
  email: 'E-mail',
  telefone: 'Telefone',
  documento: 'Documento',
  endereco: 'Endereço',
  criado_em: 'Criado em',
};

function mapClienteColumns(columns: Column[]): Column[] {
  return columns.map((column) => ({
    ...column,
    label: clienteLabels[column.key] ?? column.label,
  }));
}

export async function getClientes(): Promise<GenericListResponse> {
  const result = await fetchGenericList(CLIENTES_API_URL);

  return {
    columns: mapClienteColumns(result.columns),
    data: result.data,
  };
}

export async function createCliente(data: ClienteCreate): Promise<Cliente> {
  const response = await fetch(CLIENTES_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message ?? `Erro ao criar cliente (status ${response.status})`,
    );
  }

  const result = await response.json();
  return result.data;
}

export async function updateCliente(
  id: number | string,
  data: ClienteUpdate,
): Promise<Cliente> {
  const response = await fetch(`${CLIENTES_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message ??
        `Erro ao atualizar cliente (status ${response.status})`,
    );
  }

  const result = await response.json();
  return result.data;
}

export async function deleteCliente(id: number | string): Promise<void> {
  const response = await fetch(`${CLIENTES_API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message ??
        `Erro ao excluir cliente (status ${response.status})`,
    );
  }
}
