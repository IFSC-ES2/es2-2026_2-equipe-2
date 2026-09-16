import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import GenericList from './GenericList';
import { type TableDataRow } from '../organisms/GenericTable';

interface MockGenericTableProps {
  data: TableDataRow[];
}

vi.mock('../organisms/GenericTable', () => ({
  default: ({ data }: MockGenericTableProps) => (
    <div data-testid="mock-table">
      Tabela Mockada {data && data.length > 0 ? (data[0].id as number) : ''}
    </div>
  )
}));

describe('Template GenericList', () => {
  beforeEach(() => {
    // Usando globalThis no lugar de global para evitar erros TS2304 no vite/browser e vi.spyOn para espiar de forma inteligente
    vi.spyOn(globalThis, 'fetch');
  });

  it('deve renderizar o estado de carregamento (loading) inicialmente', () => {
    (globalThis.fetch as Mock).mockImplementationOnce(() => new Promise(() => {}));
    
    render(<GenericList apiUrl="/api/test" title="Teste" />);
    
    expect(screen.getByText('Teste')).toBeDefined();
    expect(screen.getByText('Carregando...')).toBeDefined();
  });

  it('deve renderizar uma mensagem de erro quando a chamada da API (fetch) falhar', async () => {
    (globalThis.fetch as Mock).mockRejectedValueOnce(new Error('Erro de rede'));
    
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

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<GenericList apiUrl="/api/test" title="Teste Tabela Sucesso" />);

    await waitFor(() => {
      expect(screen.getByText('Tabela Mockada 100')).toBeDefined();
    });
  });
});
