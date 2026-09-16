import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import GenericList from '.';
import { type TableDataRow } from '../../organisms/GenericTable';
import { fetchGenericList } from '../../../services/genericList.service';

interface MockGenericTableProps {
  data: TableDataRow[];
}

vi.mock('../../organisms/GenericTable', () => ({
  default: ({ data }: MockGenericTableProps) => (
    <div data-testid="mock-table">
      Tabela Mockada {data && data.length > 0 ? (data[0].id as number) : ''}
    </div>
  ),
}));

vi.mock('../../../services/genericList.service', () => ({
  fetchGenericList: vi.fn(),
}));

describe('Template GenericList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o estado de carregamento (loading) inicialmente', () => {
    (fetchGenericList as Mock).mockImplementationOnce(
      () => new Promise(() => {}),
    );

    render(<GenericList apiUrl="/api/test" title="Teste" />);

    expect(screen.getByText('Teste')).toBeDefined();
    expect(screen.getByText('Carregando...')).toBeDefined();
  });

  it('deve renderizar uma mensagem de erro quando a chamada da API (fetch) falhar', async () => {
    (fetchGenericList as Mock).mockRejectedValueOnce(new Error('Erro de rede'));

    render(<GenericList apiUrl="/api/test" title="Teste de Erro" />);

    await waitFor(() => {
      expect(screen.getByText('Erro de rede')).toBeDefined();
    });
  });

  it('deve renderizar a tabela com os dados quando a chamada da API for bem sucedida', async () => {
    const mockResponse = {
      columns: [{ key: 'id', label: 'ID' }],
      data: [{ id: 100 }],
    };

    (fetchGenericList as Mock).mockResolvedValueOnce(mockResponse);

    render(<GenericList apiUrl="/api/test" title="Teste Tabela Sucesso" />);

    await waitFor(() => {
      expect(screen.getByText('Tabela Mockada 100')).toBeDefined();
    });
  });
});
