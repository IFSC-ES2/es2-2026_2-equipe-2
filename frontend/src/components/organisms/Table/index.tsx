import React, { useState } from 'react';
import TableHeader from '../../molecules/Table/TableHeader';
import TableRow, {
  type Column,
  type TableDataRow,
} from '../../molecules/Table/TableRow';
import TableCell from '../../atoms/Table/TableCell';
import Pagination from '../../atoms/Pagination';
import './index.css';

export type { Column, TableDataRow };

export interface TableProps {
  columns?: Column[];
  data?: TableDataRow[];
  colunas?: Column[];
  dados?: TableDataRow[];
  onEdit?: (row: TableDataRow) => void;
  onDelete?: (row: TableDataRow) => void;
  showActions?: boolean;
  rowClassName?: (row: TableDataRow, index?: number) => string | undefined;
  className?: string;
  emptyMessage?: string;
  mensagemVazio?: string;
  initialPageSize?: number;
  tamanhoPaginaInicial?: number;
  showPageSizeSelector?: boolean;
  exibirSeletorTamanho?: boolean;
  pagination?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  colunas,
  dados,
  onEdit,
  onDelete,
  showActions,
  rowClassName,
  className = '',
  emptyMessage,
  mensagemVazio,
  initialPageSize,
  tamanhoPaginaInicial,
  showPageSizeSelector,
  exibirSeletorTamanho,
  pagination = false,
}) => {
  const colunasFinais = columns ?? colunas ?? [];
  const dadosFinais = data ?? dados ?? [];
  const hasActions =
    showActions !== undefined ? showActions : Boolean(onEdit || onDelete);
  const textoVazio =
    emptyMessage ?? mensagemVazio ?? 'Nenhum registro encontrado.';

  const isPaginated =
    pagination ||
    initialPageSize !== undefined ||
    tamanhoPaginaInicial !== undefined;
  const tamanhoInicial = initialPageSize ?? tamanhoPaginaInicial ?? 5;
  const mostrarSeletor = showPageSizeSelector ?? exibirSeletorTamanho ?? false;

  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [tamanhoPagina, setTamanhoPagina] = useState<number>(tamanhoInicial);

  if (!colunasFinais || colunasFinais.length === 0) {
    return <p>Nenhuma coluna disponível para exibição.</p>;
  }

  const totalPaginas = Math.max(
    Math.ceil(dadosFinais.length / tamanhoPagina),
    1,
  );
  const paginaAtiva = Math.min(paginaAtual, totalPaginas);

  const indiceInicial = isPaginated ? (paginaAtiva - 1) * tamanhoPagina : 0;
  const linhasAtuais = isPaginated
    ? dadosFinais.slice(indiceInicial, indiceInicial + tamanhoPagina)
    : dadosFinais;

  const handleMudarTamanho = (novoTamanho: number) => {
    setTamanhoPagina(novoTamanho);
    setPaginaAtual(1);
  };

  return (
    <div className={`app-table-container ${className}`.trim()}>
      <div className="table-responsive">
        <table className="app-table">
          <TableHeader columns={colunasFinais} showActions={hasActions} />
          <tbody>
            {linhasAtuais.length > 0 ? (
              linhasAtuais.map((row, rowIndex) => (
                <TableRow
                  key={String(row.id ?? `linha-${indiceInicial + rowIndex}`)}
                  columns={colunasFinais}
                  row={row}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  showActions={hasActions}
                  isStriped={rowIndex % 2 === 1}
                  className={rowClassName?.(row, indiceInicial + rowIndex)}
                />
              ))
            ) : (
              <tr>
                <TableCell
                  colSpan={colunasFinais.length + (hasActions ? 1 : 0)}
                  className="app-table-cell empty text-center py-4 text-muted"
                >
                  {textoVazio}
                </TableCell>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isPaginated && (
        <Pagination
          paginaAtual={paginaAtiva}
          totalPaginas={totalPaginas}
          onMudancaPagina={setPaginaAtual}
          itensPorPagina={tamanhoPagina}
          onMudancaTamanhoPagina={handleMudarTamanho}
          exibirSeletorTamanho={mostrarSeletor}
        />
      )}
    </div>
  );
};

export default Table;
