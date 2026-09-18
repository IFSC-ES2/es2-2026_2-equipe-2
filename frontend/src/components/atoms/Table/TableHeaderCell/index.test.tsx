import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableHeaderCell from '.';

describe('TableHeaderCell', () => {
  it('deve renderizar o conteúdo (children) dentro de um elemento <th>', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell>ID</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );

    const cell = screen.getByRole('columnheader', { name: 'ID' });
    expect(cell).toBeDefined();
    expect(cell.tagName).toBe('TH');
  });

  it('deve renderizar children que não sejam apenas texto (ex: elementos React)', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell>
              <span data-testid="custom-child">Nome</span>
            </TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );

    expect(screen.getByTestId('custom-child')).toBeDefined();
  });

  it('deve repassar props HTML adicionais para o elemento <th>', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell
              className="text-center"
              colSpan={2}
              data-testid="header-cell"
            >
              Ações
            </TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );

    const cell = screen.getByTestId('header-cell');
    expect(cell.tagName).toBe('TH');
    expect(cell.className).toBe('text-center');
    expect(cell.getAttribute('colspan')).toBe('2');
  });
});
