import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableRow, { type Column, type TableDataRow } from '.';

vi.mock('../../ActionButtons', () => ({
  default: () => <div data-testid="mock-action-buttons">Ações Mockadas</div>,
}));

const mockColumns: Column[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nome' },
];

const mockRow: TableDataRow = {
  id: 1,
  name: 'João da Silva',
};

describe('TableRow', () => {
  it('deve renderizar os valores da linha de acordo com as colunas informadas', () => {
    render(
      <table>
        <tbody>
          <TableRow columns={mockColumns} row={mockRow} />
        </tbody>
      </table>,
    );

    expect(screen.getByText('1')).toBeDefined();
    expect(screen.getByText('João da Silva')).toBeDefined();
  });

  it('deve renderizar o componente ActionButtons na última célula', () => {
    render(
      <table>
        <tbody>
          <TableRow columns={mockColumns} row={mockRow} />
        </tbody>
      </table>,
    );

    expect(screen.getByTestId('mock-action-buttons')).toBeDefined();
  });

  it('deve renderizar a quantidade correta de células (colunas + Ações)', () => {
    render(
      <table>
        <tbody>
          <TableRow columns={mockColumns} row={mockRow} />
        </tbody>
      </table>,
    );

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(mockColumns.length + 1);
  });

  it('deve renderizar célula vazia quando a coluna não existir na linha', () => {
    const incompleteRow: TableDataRow = { id: 2 };

    render(
      <table>
        <tbody>
          <TableRow columns={mockColumns} row={incompleteRow} />
        </tbody>
      </table>,
    );

    const cells = screen.getAllByRole('cell');
    // id, name (vazio), ações
    expect(cells[1].textContent).toBe('');
  });
});
