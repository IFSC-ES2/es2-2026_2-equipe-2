import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import GenericCreate from '.';
import type { FieldValue, GenericField } from '../../molecules/Form';
import type { GenericFormData } from '../../organisms/Form';

interface MockGenericFormProps {
  fields: GenericField[];
  values: GenericFormData;
  submitLabel?: string;
  onChange: (name: string, value: FieldValue) => void;
  onSubmit: () => void;
}

vi.mock('../../organisms/Form', () => ({
  default: ({
    fields,
    values,
    submitLabel,
    onChange,
    onSubmit,
  }: MockGenericFormProps) => (
    <div data-testid="mock-generic-form">
      <span>{submitLabel}</span>

      {fields.map((field) => (
        <input
          key={field.name}
          aria-label={field.label}
          value={String(values[field.name] ?? '')}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      ))}

      <button type="button" onClick={onSubmit}>
        Enviar Mock
      </button>
    </div>
  ),
}));

describe('Template GenericCreate', () => {
  const mockFields: GenericField[] = [
    { name: 'name', label: 'Nome', value: '', type: 'text' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o formulário com os campos informados', () => {
    const onCreate = vi.fn();

    render(
      <GenericCreate
        title="Cadastro de Item"
        fields={mockFields}
        onCreate={onCreate}
      />,
    );

    expect(screen.getByText('Cadastro de Item')).toBeDefined();
    expect(screen.getByTestId('mock-generic-form')).toBeDefined();
    expect(screen.getByText('Cadastrar Item')).toBeDefined();
    expect(screen.getByLabelText('Nome')).toBeDefined();
  });

  it('deve usar os valores iniciais definidos nos fields', () => {
    const fieldsComValor: GenericField[] = [
      { name: 'name', label: 'Nome', value: 'Palete', type: 'text' },
      { name: 'quantity', label: 'Quantidade', value: 10, type: 'number' },
    ];

    render(
      <GenericCreate
        title="Cadastro de Item"
        fields={fieldsComValor}
        onCreate={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Nome')).toHaveProperty('value', 'Palete');
    expect(screen.getByLabelText('Quantidade')).toHaveProperty('value', '10');
  });

  it('deve chamar onBack ao clicar em Voltar para Listagem', () => {
    const onBack = vi.fn();

    render(
      <GenericCreate
        title="Cadastro de Item"
        fields={mockFields}
        onCreate={vi.fn()}
        onBack={onBack}
      />,
    );

    fireEvent.click(screen.getByText('Voltar para Listagem'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('não deve renderizar o botão Voltar quando onBack não for informado', () => {
    render(
      <GenericCreate
        title="Cadastro de Item"
        fields={mockFields}
        onCreate={vi.fn()}
      />,
    );

    expect(screen.queryByText('Voltar para Listagem')).toBeNull();
  });

  it('deve enviar os dados preenchidos no cadastro', async () => {
    const onCreate = vi.fn().mockResolvedValueOnce({ id: 1 });
    const onSuccess = vi.fn();

    render(
      <GenericCreate
        title="Cadastro de Item"
        fields={mockFields}
        onCreate={onCreate}
        onSuccess={onSuccess}
      />,
    );

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Palete de Madeira' },
    });

    fireEvent.click(screen.getByText('Enviar Mock'));

    await waitFor(() => {
      expect(screen.getByText('Registro salvo com sucesso.')).toBeDefined();
    });

    expect(onCreate).toHaveBeenCalledWith({ name: 'Palete de Madeira' });
    expect(onSuccess).toHaveBeenCalledWith({ id: 1 });
  });

  it('deve renderizar mensagem de erro quando o cadastro falhar', async () => {
    const onCreate = vi
      .fn()
      .mockRejectedValueOnce(new Error('Falha ao salvar o cadastro.'));

    render(
      <GenericCreate
        title="Cadastro de Item"
        fields={mockFields}
        onCreate={onCreate}
      />,
    );

    fireEvent.click(screen.getByText('Enviar Mock'));

    await waitFor(() => {
      expect(screen.getByText('Falha ao salvar o cadastro.')).toBeDefined();
    });
  });

  it('deve renderizar mensagem de erro genérica quando o erro não for uma instância de Error', async () => {
    const onCreate = vi.fn().mockRejectedValueOnce('erro qualquer');

    render(
      <GenericCreate
        title="Cadastro de Item"
        fields={mockFields}
        onCreate={onCreate}
      />,
    );

    fireEvent.click(screen.getByText('Enviar Mock'));

    await waitFor(() => {
      expect(screen.getByText('Erro desconhecido')).toBeDefined();
    });
  });

  it('deve exibir "Salvando cadastro..." enquanto o onCreate está em andamento', async () => {
    let resolvePromise: (value: unknown) => void = () => {};
    const onCreate = vi.fn(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        }),
    );

    render(
      <GenericCreate
        title="Cadastro de Item"
        fields={mockFields}
        onCreate={onCreate}
      />,
    );

    fireEvent.click(screen.getByText('Enviar Mock'));

    await waitFor(() => {
      expect(screen.getByText('Salvando cadastro...')).toBeDefined();
    });

    resolvePromise({ id: 1 });

    await waitFor(() => {
      expect(screen.queryByText('Salvando cadastro...')).toBeNull();
    });
  });
});
