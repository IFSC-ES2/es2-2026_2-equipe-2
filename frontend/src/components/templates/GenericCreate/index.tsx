import React, { useState } from 'react';
import type { FieldValue, GenericField } from '../../molecules/Form';
import GenericForm, { type GenericFormData } from '../../organisms/Form';
import Button from '../../atoms/Button';

interface GenericCreateProps<T> {
  title: string;
  fields: GenericField[];
  onCreate: (data: GenericFormData) => Promise<T>;
  submitLabel?: string;
  onBack?: () => void;
  onSuccess?: (result: T) => void;
}

function buildInitialValues(fields: GenericField[]): GenericFormData {
  return fields.reduce((accumulator: GenericFormData, field) => {
    accumulator[field.name] = field.value;
    return accumulator;
  }, {});
}

function GenericCreate<T>({
  title,
  fields,
  onCreate,
  submitLabel = 'Cadastrar Item',
  onBack,
  onSuccess,
}: GenericCreateProps<T>) {
  const [values, setValues] = useState<GenericFormData>(() =>
    buildInitialValues(fields),
  );
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

      const result = await onCreate(values);

      setSuccessMessage('Registro salvo com sucesso.');
      onSuccess?.(result);
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

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {saving && (
        <div className="alert alert-info" role="alert">
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
    </div>
  );
}

export default GenericCreate;
