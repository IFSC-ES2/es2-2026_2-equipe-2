import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Table, { type Column, type TableDataRow } from '.';

interface MockTableHeaderProps {
  columns: Column[];
}

interface MockTableRowProps {
  row: TableDataRow;
}

vi.mock('../../molecules/Table/TableHeader', () => ({
  default: ({ columns }: MockTableHeaderProps) => (
    <thead data-testid="mock-table-header">
      <tr>
        <th>Mock Header {columns.length}</th>
      </tr>
    </thead>
  ),
}));

vi.mock('../../molecules/Table/TableRow', () => ({
  default: ({ row }: MockTableRowProps) => (
    <tr data-testid="mock-table-row">
      <td>{row.name as string}</td>
    </tr>
  ),
}));

describe('Organismo Table', () => {
  const mockColumns = [
    { key: 'id', label: 'Código' },
    { key: 'name', label: 'Nome' },
  ];

  const mockData = [
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
  ];

  it('deve exibir uma mensagem de aviso quando nenhuma coluna for fornecida', () => {
    render(<Table columns={[]} data={[]} />);
    expect(
      screen.getByText('Nenhuma coluna disponível para exibição.'),
    ).toBeDefined();
  });

  it('deve exibir uma linha de aviso quando não houver dados registrados', () => {
    render(<Table columns={mockColumns} data={[]} />);
    expect(screen.getByText('Nenhum registro encontrado.')).toBeDefined();
  });

  it('deve renderizar os cabeçalhos e as linhas da tabela repassando as props perfeitamente para os filhos', () => {
    render(<Table columns={mockColumns} data={mockData} />);

    expect(screen.getByTestId('mock-table-header')).toBeDefined();

    const rows = screen.getAllByTestId('mock-table-row');
    expect(rows.length).toBe(2);

    expect(screen.getByText('Item A')).toBeDefined();
    expect(screen.getByText('Item B')).toBeDefined();
  });

  it('deve exibir mensagem customizada quando fornecida para tabela vazia', () => {
    render(
      <Table
        columns={mockColumns}
        data={[]}
        emptyMessage="Nenhum item na lista."
      />,
    );
    expect(screen.getByText('Nenhum item na lista.')).toBeDefined();
  });

  it('deve suportar props em português e paginação quando configurada', () => {
    const manyData = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
    }));

    render(
      <Table
        colunas={mockColumns}
        dados={manyData}
        tamanhoPaginaInicial={5}
        exibirSeletorTamanho={true}
      />,
    );

    const rows = screen.getAllByTestId('mock-table-row');
    expect(rows.length).toBe(5);
    expect(screen.getByLabelText('Paginação')).toBeDefined();
  });
});
