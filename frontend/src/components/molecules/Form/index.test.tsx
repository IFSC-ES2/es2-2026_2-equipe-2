import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import GenericFormField, { type GenericField } from '.';

describe('Molecule GenericFormField', () => {
  it('deve renderizar um input do tipo text', () => {
    const field: GenericField = {
      name: 'name',
      label: 'Nome',
      value: '',
      type: 'text',
    };

    render(
      <GenericFormField field={field} value="Palete" onChange={vi.fn()} />,
    );

    const input = screen.getByLabelText('Nome') as HTMLInputElement;

    expect(input).toBeDefined();
    expect(input.name).toBe('name');
    expect(input.type).toBe('text');
    expect(input.value).toBe('Palete');
  });

  it('deve renderizar um input do tipo number', () => {
    const field: GenericField = {
      name: 'quantity',
      label: 'Quantidade',
      value: 0,
      type: 'number',
    };

    render(<GenericFormField field={field} value={15} onChange={vi.fn()} />);

    const input = screen.getByLabelText('Quantidade') as HTMLInputElement;

    expect(input).toBeDefined();
    expect(input.name).toBe('quantity');
    expect(input.type).toBe('number');
    expect(input.value).toBe('15');
  });

  it('deve chamar onChange com texto quando o campo não for number', () => {
    const onChange = vi.fn();

    const field: GenericField = {
      name: 'category',
      label: 'Categoria',
      value: '',
      type: 'text',
    };

    render(<GenericFormField field={field} value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Categoria'), {
      target: {
        value: 'Embalagem',
      },
    });

    expect(onChange).toHaveBeenCalledWith('category', 'Embalagem');
  });

  it('deve converter o valor para number quando o campo for do tipo number', () => {
    const onChange = vi.fn();

    const field: GenericField = {
      name: 'quantity',
      label: 'Quantidade',
      value: 0,
      type: 'number',
    };

    render(<GenericFormField field={field} value={0} onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Quantidade'), {
      target: {
        value: '25',
      },
    });

    expect(onChange).toHaveBeenCalledWith('quantity', 25);
  });

  it('deve renderizar um select quando o campo for do tipo select', () => {
    const field: GenericField = {
      name: 'status',
      label: 'Status',
      value: 'Normal',
      type: 'select',
      options: [
        { label: 'Normal', value: 'Normal' },
        { label: 'Crítico', value: 'Crítico' },
      ],
    };

    render(
      <GenericFormField field={field} value="Normal" onChange={vi.fn()} />,
    );

    const select = screen.getByLabelText('Status') as HTMLSelectElement;

    expect(select).toBeDefined();
    expect(select.name).toBe('status');
    expect(select.value).toBe('Normal');
    expect(screen.getByRole('option', { name: 'Normal' })).toBeDefined();
    expect(screen.getByRole('option', { name: 'Crítico' })).toBeDefined();
  });

  it('deve chamar onChange ao alterar o valor do select', () => {
    const onChange = vi.fn();

    const field: GenericField = {
      name: 'status',
      label: 'Status',
      value: 'Normal',
      type: 'select',
      options: [
        { label: 'Normal', value: 'Normal' },
        { label: 'Crítico', value: 'Crítico' },
      ],
    };

    render(
      <GenericFormField field={field} value="Normal" onChange={onChange} />,
    );

    fireEvent.change(screen.getByLabelText('Status'), {
      target: {
        value: 'Crítico',
      },
    });

    expect(onChange).toHaveBeenCalledWith('status', 'Crítico');
  });

  it('deve renderizar select mesmo quando options não for informado', () => {
    const field: GenericField = {
      name: 'status',
      label: 'Status',
      value: '',
      type: 'select',
    };

    render(<GenericFormField field={field} value="" onChange={vi.fn()} />);

    const select = screen.getByLabelText('Status') as HTMLSelectElement;

    expect(select).toBeDefined();
    expect(select.options.length).toBe(0);
  });
});
