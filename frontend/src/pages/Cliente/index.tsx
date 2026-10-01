import React, { useCallback, useEffect, useState } from 'react';
import Button from '../../components/atoms/Button';
import Table, {
  type Column,
  type TableDataRow,
} from '../../components/organisms/Table';
import ClientCreateModal from '../../components/organisms/Modals/ClientCreateModal';
import BaseLayout from '../../components/templates/BaseLayout';
import { getClientes, deleteCliente } from '../../services/cliente.service';
import type { Cliente as ClienteType } from '../../interfaces/cliente.interface';

const Cliente: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<TableDataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCliente, setSelectedCliente] = useState<
    ClienteType | undefined
  >(undefined);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getClientes();
      setColumns(result.columns);
      setData(result.data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar clientes',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getClientes()
      .then((result) => {
        if (isMounted) {
          setColumns(result.columns);
          setData(result.data);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Erro ao carregar clientes',
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

  const handleOpenCreate = () => {
    setSelectedCliente(undefined);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCliente(undefined);
  };

  const handleEdit = (row: TableDataRow) => {
    setSelectedCliente(row as unknown as ClienteType);
    setIsModalOpen(true);
  };

  const handleDelete = async (row: TableDataRow) => {
    try {
      const { id } = row as { id: string | number };
      await deleteCliente(id);
      await loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir cliente');
    }
  };

  return (
    <BaseLayout title="Clientes">
      <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="h4 fw-bold mb-0">Listagem dos Clientes</h3>
          <Button onClick={handleOpenCreate} variant="primary">
            Novo Cliente
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
          <Table
            columns={columns}
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ClientCreateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={loadData}
        cliente={selectedCliente}
      />
    </BaseLayout>
  );
};

export default Cliente;
