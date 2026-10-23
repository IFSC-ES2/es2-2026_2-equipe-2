import type {
  Pedido,
  PedidoComRelacionamentos,
  PedidoCreate,
  PedidoUpdate,
} from '../interfaces/pedido.interface';

const PEDIDOS_API_URL = 'http://localhost:8080/api/pedidos';

export async function getPedidos(): Promise<PedidoComRelacionamentos[]> {
  const response = await fetch(PEDIDOS_API_URL);

  if (!response.ok) {
    throw new Error('Falha ao buscar pedidos.');
  }

  const result = await response.json();
  const data = result.data ?? result;

  if (!Array.isArray(data)) {
    throw new Error('Formato de dados inválido da API.');
  }

  return data;
}

export async function getPedidoById(
  id: number | string,
): Promise<PedidoComRelacionamentos> {
  const response = await fetch(`${PEDIDOS_API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Falha ao buscar pedido id ${id}.`);
  }

  const result = await response.json();
  return result.data ?? result;
}

export async function createPedido(data: PedidoCreate): Promise<Pedido> {
  const response = await fetch(PEDIDOS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.title ??
        errorBody?.message ??
        `Erro ao criar pedido (status ${response.status})`,
    );
  }

  const result = await response.json();
  return result.data ?? result;
}

export async function updatePedido(
  id: number | string,
  data: PedidoUpdate,
): Promise<Pedido> {
  const response = await fetch(`${PEDIDOS_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.title ??
        errorBody?.message ??
        `Erro ao atualizar pedido (status ${response.status})`,
    );
  }

  const result = await response.json();
  return result.data ?? result;
}

export async function deletePedido(id: number | string): Promise<boolean> {
  const response = await fetch(`${PEDIDOS_API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.title ??
        errorBody?.message ??
        `Erro ao excluir pedido (status ${response.status})`,
    );
  }

  return true;
}
