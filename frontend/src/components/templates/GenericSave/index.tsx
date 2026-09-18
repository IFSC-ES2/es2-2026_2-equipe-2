import React, { useEffect, useState } from 'react';
import type { FieldValue, GenericField } from '../../molecules/Form';
import GenericForm, { type GenericFormData } from '../../organisms/Form';
import Button from '../../atoms/Button';

interface GenericCreateProps {
  title: string;
  apiUrl: string;
  method?: 'POST' | 'PUT';
  submitLabel?: string;
  onBack?: () => void;
}

const GenericCreate: React.FC<GenericCreateProps> = ({
  title,
  apiUrl,
  method = 'POST',
  submitLabel = 'Cadastrar Item',
  onBack,
}) => {
  const [fields, setFields] = useState<GenericField[]>([]);
  const [values, setValues] = useState<GenericFormData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Falha ao buscar os campos do formulário.');
        }

        const result = await response.json();

        if (!result.fields) {
          throw new Error(
            'Formato de dados inválido da API. Esperado { fields }',
          );
        }

        const initialValues = result.fields.reduce(
          (accumulator: GenericFormData, field: GenericField) => {
            accumulator[field.name] = field.value;
            return accumulator;
          },
          {},
        );

        setFields(result.fields);
        setValues(initialValues);
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

    fetchForm();
  }, [apiUrl]);

  const handleChange = (name: string, value: FieldValue) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch(apiUrl.replace('/edicao', ''), {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar o cadastro.');
      }

      const result = await response.json();

      setSuccessMessage(result.message ?? 'Registro salvo com sucesso.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{title}</h2>
        
        {onBack && (
          <Button variant="secondary" onClick={onBack}>
            Voltar para Listagem
          </Button>
        )}
      </div>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger rounded-4" role="alert">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success rounded-4" role="alert">
          {successMessage}
        </div>
      )}

      {!loading && !error && (
        <>
          {saving && (
            <div className="alert alert-info rounded-4" role="alert">
              Salvando cadastro...
            </div>
          )}
          
          <GenericForm
            fields={fields}
            values={values}
            submitLabel={submitLabel}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default GenericCreate;
