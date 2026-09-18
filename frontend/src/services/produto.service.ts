import type { Column } from '../components/organisms/GenericTable';
import {
  fetchGenericList,
  type GenericListResponse,
} from './genericList.service';

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
  return columns.map((column) => ({
    ...column,
    label: produtoLabels[column.key] ?? column.label,
  }));
}

export async function getProdutos(): Promise<GenericListResponse> {
  const result = await fetchGenericList(PRODUTOS_API_URL);

  return {
    columns: mapProdutoColumns(result.columns),
    data: result.data,
  };
}
