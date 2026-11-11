import React from 'react';
import './index.css';

export interface PaginationProps {
  paginaAtual?: number;
  totalPaginas?: number;
  onMudancaPagina?: (pagina: number) => void;
  itensPorPagina?: number;
  opcoesItensPorPagina?: number[];
  onMudancaTamanhoPagina?: (tamanho: number) => void;
  exibirSeletorTamanho?: boolean;
  className?: string;

  // Retrocompatibilidade
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  showPageSizeSelector?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  paginaAtual,
  totalPaginas,
  onMudancaPagina,
  itensPorPagina = 5,
  opcoesItensPorPagina = [5, 10, 20],
  onMudancaTamanhoPagina,
  exibirSeletorTamanho = false,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  showPageSizeSelector,
  className = '',
}) => {
  const paginaAtiva = paginaAtual ?? currentPage ?? 1;
  const total = totalPaginas ?? totalPages ?? 0;
  const mudarPagina = onMudancaPagina ?? onPageChange ?? (() => {});
  const tamanho = itensPorPagina ?? pageSize ?? 5;
  const opcoesTamanho = opcoesItensPorPagina ?? pageSizeOptions ?? [5, 10, 20];
  const mudarTamanho = onMudancaTamanhoPagina ?? onPageSizeChange;
  const mostrarSeletor = exibirSeletorTamanho || showPageSizeSelector || false;

  if (total <= 0) {
    return null;
  }

  const obterNumerosPagina = (): (number | string)[] => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (paginaAtiva <= 3) {
      return [1, 2, 3, 4, '...', total];
    }

    if (paginaAtiva >= total - 2) {
      return [1, '...', total - 3, total - 2, total - 1, total];
    }

    return [
      1,
      '...',
      paginaAtiva - 1,
      paginaAtiva,
      paginaAtiva + 1,
      '...',
      total,
    ];
  };

  const paginas = obterNumerosPagina();

  return (
    <div className={`pagination-container ${className}`.trim()}>
      <div
        className="pagination-pages"
        role="navigation"
        aria-label="Paginação"
      >
        <button
          type="button"
          className="pagination-btn pagination-arrow"
          disabled={paginaAtiva <= 1}
          onClick={() => mudarPagina(paginaAtiva - 1)}
          aria-label="Página anterior"
        >
          &lt;
        </button>

        {paginas.map((p, idx) =>
          typeof p === 'number' ? (
            <button
              key={`page-${p}`}
              type="button"
              className={`pagination-btn pagination-number ${
                p === paginaAtiva ? 'active' : ''
              }`}
              onClick={() => mudarPagina(p)}
              aria-current={p === paginaAtiva ? 'page' : undefined}
            >
              {p}
            </button>
          ) : (
            <span key={`dots-${idx}`} className="pagination-ellipsis">
              {p}
            </span>
          ),
        )}

        <button
          type="button"
          className="pagination-btn pagination-arrow"
          disabled={paginaAtiva >= total}
          onClick={() => mudarPagina(paginaAtiva + 1)}
          aria-label="Próxima página"
        >
          &gt;
        </button>
      </div>

      {mostrarSeletor && mudarTamanho && (
        <div className="pagination-page-size">
          <span className="page-size-label">Exibindo</span>
          <select
            className="page-size-select"
            value={tamanho}
            onChange={(e) => mudarTamanho(Number(e.target.value))}
            aria-label="Itens por página"
          >
            {opcoesTamanho.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
