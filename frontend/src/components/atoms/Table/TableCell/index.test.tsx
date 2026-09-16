import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TableCell from '.';

describe('TableCell', () => {
  it('deve renderizar o conteúdo (children) dentro de um elemento <td>', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>100</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByRole('cell', { name: '100' });
    expect(cell).toBeDefined();
    expect(cell.tagName).toBe('TD');
  });

  it('deve renderizar children que não sejam apenas texto (ex: elementos React)', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell>
              <button data-testid="custom-child">Editar</button>
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );

    expect(screen.getByTestId('custom-child')).toBeDefined();
  });

  it('deve repassar props HTML adicionais para o elemento <td>', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell className="text-end" colSpan={2} data-testid="body-cell">
              Valor
            </TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByTestId('body-cell');
    expect(cell.tagName).toBe('TD');
    expect(cell.className).toBe('text-end');
    expect(cell.getAttribute('colspan')).toBe('2');
  });

  it('deve renderizar célula vazia quando children for undefined/null', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell data-testid="empty-cell">{null}</TableCell>
          </tr>
        </tbody>
      </table>,
    );

    const cell = screen.getByTestId('empty-cell');
    expect(cell.textContent).toBe('');
  });
});
