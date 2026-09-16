import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableHeader from '.';
import { type Column } from '../TableRow/';

const mockColumns: Column[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nome' },
];

describe('TableHeader', () => {
  it('deve renderizar o label de cada coluna recebida', () => {
    render(
      <table>
        <TableHeader columns={mockColumns} />
      </table>,
    );

    expect(screen.getByText('ID')).toBeDefined();
    expect(screen.getByText('Nome')).toBeDefined();
  });

  it('deve renderizar a coluna fixa "Ações" ao final', () => {
    render(
      <table>
        <TableHeader columns={mockColumns} />
      </table>,
    );

    expect(screen.getByText('Ações')).toBeDefined();
  });

  it('deve renderizar a quantidade correta de células (colunas + Ações)', () => {
    render(
      <table>
        <TableHeader columns={mockColumns} />
      </table>,
    );

    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(mockColumns.length + 1);
  });

  it('deve renderizar apenas a coluna "Ações" quando não houver colunas', () => {
    render(
      <table>
        <TableHeader columns={[]} />
      </table>,
    );

    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(1);
    expect(headerCells[0].textContent).toBe('Ações');
  });
});
