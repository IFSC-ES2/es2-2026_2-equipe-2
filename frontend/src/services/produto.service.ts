import type { Column, TableDataRow } from '../components/organisms/Table';
import {
  fetchGenericList,
  type GenericListResponse,
} from './genericList.service';

import {
  type Produto,
  type ProdutoUpdate,
  type ProdutoCreate,
} from '../interfaces/produto.interface';

const PRODUTOS_API_URL = 'http://localhost:5000/produtos';

const produtoLabels: Record<string, string> = {
  id: 'ID',
  sku: 'SKU',
  nome: 'Produto',
  descricao: 'Descrição',
  categoria_id: 'Categoria',
  fornecedor_id: 'Fornecedor',
  preco: 'Preço',
  quantidade: 'Quantidade',
  estoque_minimo: 'Estoque mínimo',
  criado_em: 'Criado em',
  atualizado_em: 'Atualizado em',
};

function mapProdutoColumns(columns: Column[]): Column[] {
  return columns
    .filter(
      (column) => column.key !== 'categoria' && column.key !== 'fornecedor',
    )
    .map((column) => ({
      ...column,
      label: produtoLabels[column.key] ?? column.label,
    }));
}

export async function getProdutos(): Promise<GenericListResponse> {
  const result = await fetchGenericList(PRODUTOS_API_URL);

  const formattedData: TableDataRow[] = result.data.map((item: unknown) => {
    const produto = item as Produto;
    return {
      ...produto,
      categoria_id: produto.categoria?.nome ?? produto.categoria_id,
      fornecedor_id: produto.fornecedor?.nome ?? produto.fornecedor_id,
    } as unknown as TableDataRow;
  });

  return {
    columns: mapProdutoColumns(result.columns),
    data: formattedData,
  };
}

export async function updateProdutos(
  id: string,
  data: ProdutoUpdate,
): Promise<Produto> {
  const response = await fetch(`${PRODUTOS_API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message ??
        `Erro ao atualizar produto (status ${response.status})`,
    );
  }

  const result: Produto = await response.json();
  return result;
}

export async function createProduto(data: ProdutoCreate) {
  const response = await fetch(`${PRODUTOS_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message ?? `Erro ao criar produto (status ${response.status})`,
    );
  }

  const result: Produto = await response.json();
  return result;
}

export async function deleteProduto(id: string): Promise<void> {
  const response = await fetch(`${PRODUTOS_API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const friendlyMessage = errorBody?.title?.includes('still referenced')
      ? 'Não é possível excluir porque o produto está associado a itens de pedido.'
      : (errorBody?.message ??
        `Erro ao excluir produto (status ${response.status})`);
    throw new Error(friendlyMessage);
  }
}
