import React, { useEffect, useState } from 'react';
import GenericTable, {
  type Column,
  type TableDataRow,
} from '../organisms/GenericTable';
import Button from '../atoms/Button';

interface GenericListProps {
  apiUrl: string;
  title: string;
}

const GenericList: React.FC<GenericListProps> = ({ apiUrl, title }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<TableDataRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Falha ao buscar os dados.');
        }

        const result = await response.json();

        if (result.columns && result.data) {
          setColumns(result.columns);
          setData(result.data);
        } else {
          throw new Error(
            'Formato de dados inválido da API. Esperado { columns, data }',
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{title}</h2>
        <Button variant="success">Novo Registro</Button>
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

      {!loading && !error && <GenericTable columns={columns} data={data} />}
    </div>
  );
};

export default GenericList;
