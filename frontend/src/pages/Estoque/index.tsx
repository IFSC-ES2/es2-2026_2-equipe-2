import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../components/atoms/Button';
import Table, {
  type Column,
  type TableDataRow,
} from '../../components/organisms/Table';
import ProductCreateModal from '../../components/organisms/Modals/ProductCreateModal';
import BaseLayout from '../../components/templates/BaseLayout';
import { getProdutos, deleteProduto } from '../../services/produto.service';

const Estoque: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<TableDataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProdutos();
      setColumns(result.columns);
      setData(result.data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar produtos',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getProdutos()
      .then((result) => {
        if (isMounted) {
          setColumns(result.columns);
          setData(result.data);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Erro ao carregar produtos',
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);
  const handleDelete = async (row: TableDataRow) => {
    try {
      const { id } = row as { id: string };
      await deleteProduto(id);
      await loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir produto');
    }
  };

  return (
    <BaseLayout title="Estoque">
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="h4 fw-bold mb-0">Listagem dos Produtos</h3>
          <Button onClick={() => setIsModalOpen(true)} variant="primary">
            Novo Produto
          </Button>
        </div>

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

        {!loading && !error && (
          <Table columns={columns} data={data} onDelete={handleDelete} />
        )}
      </div>

      <ProductCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadData}
      />
    </BaseLayout>
  );
};

export default Estoque;
