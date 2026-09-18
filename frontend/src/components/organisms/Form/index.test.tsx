import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import GenericForm from '.';
import type { FieldValue, GenericField } from '../../molecules/Form';

interface MockFieldProps {
  field: GenericField;
  value: FieldValue;
  onChange: (name: string, value: FieldValue) => void;
}

vi.mock('../../molecules/Form', () => ({
  default: ({ field, value, onChange }: MockFieldProps) => (
    <label>
      {field.label}
      <input
        aria-label={field.label}
        value={String(value)}
        onChange={(event) => onChange(field.name, event.target.value)}
      />
    </label>
  ),
}));

describe('Organism GenericForm', () => {
  const fields: GenericField[] = [
    {
      name: 'name',
      label: 'Nome',
      value: '',
      type: 'text',
    },
    {
      name: 'quantity',
      label: 'Quantidade',
      value: 10,
      type: 'number',
    },
  ];

  it('deve renderizar os campos recebidos', () => {
    render(
      <GenericForm
        fields={fields}
        values={{
          name: 'Palete',
          quantity: 20,
        }}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Nome')).toBeDefined();
    expect(screen.getByLabelText('Quantidade')).toBeDefined();
  });

  it('deve renderizar o texto padrão do botão de submit quando submitLabel não for informado', () => {
    render(
      <GenericForm
        fields={fields}
        values={{
          name: 'Palete',
          quantity: 20,
        }}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDefined();
  });

  it('deve renderizar o texto customizado do botão de submit', () => {
    render(
      <GenericForm
        fields={fields}
        values={{
          name: 'Palete',
          quantity: 20,
        }}
        submitLabel="Cadastrar Item"
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Cadastrar Item' }),
    ).toBeDefined();
  });

  it('deve chamar onSubmit ao enviar o formulário', () => {
    const onSubmit = vi.fn();

    render(
      <GenericForm
        fields={fields}
        values={{
          name: 'Palete',
          quantity: 20,
        }}
        onChange={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onChange ao alterar um campo', () => {
    const onChange = vi.fn();

    render(
      <GenericForm
        fields={fields}
        values={{
          name: 'Palete',
          quantity: 20,
        }}
        onChange={onChange}
        onSubmit={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: {
        value: 'Bobina Filme Stretch',
      },
    });

    expect(onChange).toHaveBeenCalledWith('name', 'Bobina Filme Stretch');
  });

  it('deve renderizar o botão Limpar', () => {
    render(
      <GenericForm
        fields={fields}
        values={{
          name: 'Palete',
          quantity: 20,
        }}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Limpar' })).toBeDefined();
  });
});
