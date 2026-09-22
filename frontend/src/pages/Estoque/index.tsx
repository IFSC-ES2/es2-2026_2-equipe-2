import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../components/atoms/Button';
import Table, {
  type Column,
  type TableDataRow,
} from '../../components/organisms/Table';
import ProductCreateModal from '../../components/organisms/Modals/ProductCreateModal';
import { getProdutos } from '../../services/produto.service';

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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Listagem dos Produtos</h2>
        <Button onClick={() => setIsModalOpen(true)} variant="success">
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

      {!loading && !error && <Table columns={columns} data={data} />}

      <ProductCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadData}
      />
    </div>
  );
};

export default Estoque;
