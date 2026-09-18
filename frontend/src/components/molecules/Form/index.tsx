import React from 'react';
import FormSelect, { type SelectOption } from '../../atoms/Inputs/Select';
import FormInput from '../../atoms/Inputs/Base';

export type FieldValue = string | number | boolean;

export interface GenericField {
  name: string;
  label: string;
  value: FieldValue;
  type: string;
  options?: SelectOption[];
}

interface GenericFormFieldProps {
  field: GenericField;
  value: FieldValue;
  onChange: (name: string, value: FieldValue) => void;
}

const Index: React.FC<GenericFormFieldProps> = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <FormSelect
        label={field.label}
        name={field.name}
        value={String(value)}
        options={field.options}
        onChange={(event: { target: { value: string | number | boolean } }) =>
          onChange(field.name, event.target.value)
        }
      />
    );
  }

  return (
    <FormInput
      label={field.label}
      name={field.name}
      type={field.type}
      value={String(value)}
      onChange={(event) => {
        const nextValue =
          field.type === 'number'
            ? Number(event.target.value)
            : event.target.value;

        onChange(field.name, nextValue);
      }}
    />
  );
};

export default Index;
