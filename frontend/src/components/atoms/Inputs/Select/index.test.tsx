import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FormSelect from '.';

describe('Atom FormSelect', () => {
  const options = [
    {
      label: 'Normal',
      value: 'Normal',
    },
    {
      label: 'Crítico',
      value: 'Crítico',
    },
    {
      label: 'Apropriado',
      value: 'Apropriado',
    },
  ];

  it('deve renderizar o label informado', () => {
    render(
      <FormSelect
        label="Status"
        name="status"
        value="Normal"
        options={options}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Status')).toBeDefined();
  });

  it('deve associar o label ao select pelo name', () => {
    render(
      <FormSelect
        label="Status"
        name="status"
        value="Normal"
        options={options}
        onChange={vi.fn()}
      />,
    );

    const select = screen.getByLabelText('Status') as HTMLSelectElement;

    expect(select).toBeDefined();
    expect(select.id).toBe('status');
  });

  it('deve renderizar o select com o atributo name correto', () => {
    render(
      <FormSelect
        label="Status"
        name="status"
        value="Normal"
        options={options}
        onChange={vi.fn()}
      />,
    );

    const select = screen.getByLabelText('Status') as HTMLSelectElement;

    expect(select.name).toBe('status');
  });

  it('deve aplicar as classes padrão e classes adicionais', () => {
    render(
      <FormSelect
        label="Status"
        name="status"
        value="Normal"
        options={options}
        className="campo-customizado"
        onChange={vi.fn()}
      />,
    );

    const select = screen.getByLabelText('Status');

    expect(select.className).toContain('form-select');
    expect(select.className).toContain('campo-customizado');
  });

  it('deve renderizar as opções informadas', () => {
    render(
      <FormSelect
        label="Status"
        name="status"
        value="Normal"
        options={options}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('option', { name: 'Normal' })).toBeDefined();
    expect(screen.getByRole('option', { name: 'Crítico' })).toBeDefined();
    expect(screen.getByRole('option', { name: 'Apropriado' })).toBeDefined();
  });

  it('deve manter o valor selecionado informado', () => {
    render(
      <FormSelect
        label="Status"
        name="status"
        value="Crítico"
        options={options}
        onChange={vi.fn()}
      />,
    );

    const select = screen.getByLabelText('Status') as HTMLSelectElement;

    expect(select.value).toBe('Crítico');
  });

  it('deve chamar onChange ao alterar a opção selecionada', () => {
    const onChange = vi.fn();

    render(
      <FormSelect
        label="Status"
        name="status"
        value="Normal"
        options={options}
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Status'), {
      target: {
        value: 'Crítico',
      },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('deve renderizar sem opções quando options não for informado', () => {
    render(
      <FormSelect label="Status" name="status" value="" onChange={vi.fn()} />,
    );

    const select = screen.getByLabelText('Status') as HTMLSelectElement;

    expect(select).toBeDefined();
    expect(select.options.length).toBe(0);
  });

  it('deve repassar propriedades extras para o select', () => {
    render(
      <FormSelect
        label="Status"
        name="status"
        value="Normal"
        options={options}
        disabled
        onChange={vi.fn()}
      />,
    );

    const select = screen.getByLabelText('Status') as HTMLSelectElement;

    expect(select.disabled).toBe(true);
  });
});
