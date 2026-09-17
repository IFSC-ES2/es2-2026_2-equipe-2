import React, { useEffect, useState } from 'react';
import GenericTable, {
  type Column,
  type TableDataRow,
} from '../../organisms/GenericTable';
import Button from '../../atoms/Button';
import { fetchGenericList } from '../../../services/genericList.service';

interface GenericListProps {
  apiUrl: string;
  title: string;
  onCreate?: () => void;
  onEdit?: (row: TableDataRow) => void;
}

const GenericList: React.FC<GenericListProps> = ({
  apiUrl,
  title,
  onCreate,
  onEdit,
}) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<TableDataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchGenericList(apiUrl);
        setColumns(result.columns);
        setData(result.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{title}</h2>
        <Button variant="success" onClick={onCreate}>
          Novo Registro
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
        <GenericTable columns={columns} data={data} onEdit={onEdit} />
      )}
    </div>
  );
};

export default GenericList;
