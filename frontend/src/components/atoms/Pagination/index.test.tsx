import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './index';

describe('Pagination Atom', () => {
  it('deve renderizar botões de página e chamar onMudancaPagina', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination
        paginaAtual={2}
        totalPaginas={5}
        onMudancaPagina={handlePageChange}
      />,
    );

    const btnNext = screen.getByLabelText('Próxima página');
    expect(btnNext).toBeDefined();

    fireEvent.click(btnNext);
    expect(handlePageChange).toHaveBeenCalledWith(3);

    const btnPage4 = screen.getByRole('button', { name: '4' });
    fireEvent.click(btnPage4);
    expect(handlePageChange).toHaveBeenCalledWith(4);
  });

  it('deve renderizar seletor de itens por página quando habilitado com texto Exibindo', () => {
    const handleSizeChange = vi.fn();
    render(
      <Pagination
        paginaAtual={1}
        totalPaginas={10}
        onMudancaPagina={vi.fn()}
        exibirSeletorTamanho={true}
        onMudancaTamanhoPagina={handleSizeChange}
      />,
    );

    expect(screen.getByText('Exibindo')).toBeDefined();
    const select = screen.getByLabelText('Itens por página');
    fireEvent.change(select, { target: { value: '10' } });
    expect(handleSizeChange).toHaveBeenCalledWith(10);
  });

  it('não deve renderizar nada se o total de páginas for menor ou igual a zero', () => {
    const { container } = render(
      <Pagination paginaAtual={1} totalPaginas={0} onMudancaPagina={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
