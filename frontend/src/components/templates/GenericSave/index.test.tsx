import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

describe('Template GenericSave', () => {
  const apiUrl = '/api/estoque/cadastro';

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('deve renderizar o estado de carregamento inicialmente', () => {
    vi.mocked(fetch).mockImplementationOnce(
      () => new Promise<Response>(() => {}),
    );

    render(<GenericCreate title="Cadastro de Item" apiUrl={apiUrl} />);

    expect(screen.getByText('Cadastro de Item')).toBeDefined();
    expect(screen.getByText('Carregando...')).toBeDefined();
  });

  it('deve renderizar o formulário quando buscar os campos com sucesso', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        fields: [
          {
            name: 'name',
            label: 'Nome',
            value: 'Palete',
            type: 'text',
          },
          {
            name: 'quantity',
            label: 'Quantidade',
            value: 10,
            type: 'number',
          },
        ],
      }),
    } as Response);

    render(<GenericCreate title="Cadastro de Item" apiUrl={apiUrl} />);

    await waitFor(() => {
      expect(screen.getByTestId('mock-generic-form')).toBeDefined();
    });

    expect(screen.getByText('Cadastrar Item')).toBeDefined();
    expect(screen.getByLabelText('Nome')).toBeDefined();
    expect(screen.getByLabelText('Quantidade')).toBeDefined();
  });

  it('deve renderizar mensagem de erro quando a busca dos campos falhar', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    render(<GenericCreate title="Cadastro de Item" apiUrl={apiUrl} />);

    await waitFor(() => {
      expect(
        screen.getByText('Falha ao buscar os campos do formulário.'),
      ).toBeDefined();
    });
  });

  it('deve renderizar mensagem de erro quando o formato da API for inválido', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [],
      }),
    } as Response);

    render(<GenericCreate title="Cadastro de Item" apiUrl={apiUrl} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Formato de dados inválido da API. Esperado { fields }',
        ),
      ).toBeDefined();
    });
  });

  it('deve chamar onBack ao clicar em Voltar para Listagem', async () => {
    const onBack = vi.fn();

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        fields: [],
      }),
    } as Response);

    render(
      <GenericCreate
        title="Cadastro de Item"
        apiUrl={apiUrl}
        onBack={onBack}
      />,
    );

    fireEvent.click(screen.getByText('Voltar para Listagem'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('deve enviar os dados preenchidos no cadastro', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          fields: [
            {
              name: 'name',
              label: 'Nome',
              value: '',
              type: 'text',
            },
          ],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: 'Item cadastrado com sucesso.',
        }),
      } as Response);

    render(<GenericCreate title="Cadastro de Item" apiUrl={apiUrl} />);

    await waitFor(() => {
      expect(screen.getByLabelText('Nome')).toBeDefined();
    });

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: {
        value: 'Palete de Madeira',
      },
    });

    fireEvent.click(screen.getByText('Enviar Mock'));

    await waitFor(() => {
      expect(screen.getByText('Item cadastrado com sucesso.')).toBeDefined();
    });

    expect(fetch).toHaveBeenCalledWith(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Palete de Madeira',
      }),
    });
  });

  it('deve renderizar mensagem de erro quando o cadastro falhar', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          fields: [
            {
              name: 'name',
              label: 'Nome',
              value: '',
              type: 'text',
            },
          ],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

    render(<GenericCreate title="Cadastro de Item" apiUrl={apiUrl} />);

    await waitFor(() => {
      expect(screen.getByTestId('mock-generic-form')).toBeDefined();
    });

    fireEvent.click(screen.getByText('Enviar Mock'));

    await waitFor(() => {
      expect(screen.getByText('Falha ao salvar o cadastro.')).toBeDefined();
    });
  });
});
