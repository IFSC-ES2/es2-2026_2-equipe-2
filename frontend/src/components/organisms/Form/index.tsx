import React from 'react';
import Button from '../../atoms/Button';
import Index, {
  type FieldValue,
  type GenericField,
} from '../../molecules/Form';

export type GenericFormData = Record<string, FieldValue>;

interface GenericFormProps {
  fields: GenericField[];
  values: GenericFormData;
  submitLabel?: string;
  onChange: (name: string, value: FieldValue) => void;
  onSubmit: () => void;
}

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  values,
  submitLabel = 'Salvar',
  onChange,
  onSubmit,
}) => {
  return (
    <form
      className="card shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="card-body">
        <div className="row">
          {fields.map((field) => (
            <div className="col-md-6" key={field.name}>
              <Index
                field={field}
                value={values[field.name] ?? field.value}
                onChange={onChange}
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button type="reset" variant="secondary">
            Limpar
          </Button>

          <Button type="submit" variant="success">
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default GenericForm;
