import React, { useCallback, useEffect, useState } from 'react';
import GenericTable, {
  type Column,
  type TableDataRow,
} from '../../organisms/GenericTable';
import Button from '../../atoms/Button';
import type { GenericListResponse } from '../../../services/genericList.service';
import type {
  Produto,
  ProdutoCreate,
} from '../../../interfaces/produto.interface';
import { createProduto } from '../../../services/produto.service';
import type { GenericFormData } from '../../organisms/Form';
import type { GenericField } from '../../molecules/Form';
import GenericCreate from '../GenericCreate';

type CurrentScreen = 'list' | 'create' | 'edit';

interface GenericListProps {
  title: string;
  fetchData: () => Promise<GenericListResponse>;
}

const PRODUTO_FIELDS: GenericField[] = [
  { name: 'sku', label: 'SKU', type: 'text', value: '' },
  { name: 'nome', label: 'Nome', type: 'text', value: '' },
  { name: 'descricao', label: 'Descrição', type: 'textarea', value: '' },
  { name: 'categoria_id', label: 'Categoria (ID)', type: 'number', value: '' },
  {
    name: 'fornecedor_id',
    label: 'Fornecedor (ID)',
    type: 'number',
    value: '',
  },
  { name: 'preco', label: 'Preço', type: 'number', value: '' },
  { name: 'quantidade', label: 'Quantidade', type: 'number', value: '' },
  {
    name: 'estoque_minimo',
    label: 'Estoque Mínimo',
    type: 'number',
    value: '',
  },
];

function mapValuesToProdutoCreate(values: GenericFormData): ProdutoCreate {
  return {
    sku: String(values.sku ?? '').trim(),
    nome: String(values.nome ?? '').trim(),
    descricao: values.descricao ? String(values.descricao).trim() : null,
    categoria_id: values.categoria_id ? Number(values.categoria_id) : null,
    fornecedor_id: values.fornecedor_id ? Number(values.fornecedor_id) : null,
    preco: Number(values.preco ?? 0),
    quantidade:
      values.quantidade !== undefined && values.quantidade !== ''
        ? Number(values.quantidade)
        : undefined,
    estoque_minimo:
      values.estoque_minimo !== undefined && values.estoque_minimo !== ''
        ? Number(values.estoque_minimo)
        : undefined,
  };
}

const GenericList: React.FC<GenericListProps> = ({ title, fetchData }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<TableDataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>('list');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchData();
      setColumns(result.columns);
      setData(result.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{title}</h2>
        {currentScreen === 'list' && (
          <Button onClick={() => setCurrentScreen('create')} variant="success">
            Novo Registro
          </Button>
        )}
      </div>

      {currentScreen === 'create' && (
        <GenericCreate<Produto>
          title="Novo Produto"
          fields={PRODUTO_FIELDS}
          onCreate={(formData: GenericFormData) =>
            createProduto(mapValuesToProdutoCreate(formData))
          }
          submitLabel="Cadastrar Produto"
          onBack={() => setCurrentScreen('list')}
          onSuccess={() => {
            setCurrentScreen('list');
            loadData();
          }}
        />
      )}

      {currentScreen === 'list' && (
        <>
          {loading && (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && <GenericTable columns={columns} data={data} />}
        </>
      )}
    </div>
  );
};

export default GenericList;
