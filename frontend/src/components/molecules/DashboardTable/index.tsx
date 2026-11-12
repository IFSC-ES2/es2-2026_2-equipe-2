import React, { useState } from 'react';
import Pagination from '../../atoms/Pagination';
import './index.css';

export interface ColunaTabelaDashboard {
  chave?: string;
  rotulo?: string;
  alinhamento?: 'left' | 'center' | 'right';
  render?: (valor: unknown, linha: Record<string, unknown>) => React.ReactNode;

  // Retrocompatibilidade
  key?: string;
  label?: string;
  align?: 'left' | 'center' | 'right';
}

export type DashboardTableColumn = ColunaTabelaDashboard;

export interface DashboardTableProps {
  colunas?: ColunaTabelaDashboard[];
  dados?: Record<string, unknown>[];
  tamanhoPaginaInicial?: number;
  exibirSeletorTamanho?: boolean;
  mensagemVazio?: string;
  className?: string;

  // Retrocompatibilidade
  columns?: ColunaTabelaDashboard[];
  data?: Record<string, unknown>[];
  initialPageSize?: number;
  showPageSizeSelector?: boolean;
  emptyMessage?: string;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  colunas,
  dados,
  tamanhoPaginaInicial,
  exibirSeletorTamanho,
  mensagemVazio,
  columns,
  data,
  initialPageSize,
  showPageSizeSelector,
  emptyMessage,
  className = '',
}) => {
  const colunasFinais = colunas ?? columns ?? [];
  const dadosFinais = dados ?? data ?? [];
  const tamanhoInicial = tamanhoPaginaInicial ?? initialPageSize ?? 5;
  const mostrarSeletor = exibirSeletorTamanho ?? showPageSizeSelector ?? false;
  const textoVazio =
    mensagemVazio ?? emptyMessage ?? 'Nenhum registro encontrado.';

  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [tamanhoPagina, setTamanhoPagina] = useState<number>(tamanhoInicial);

  const totalPaginas = Math.max(
    Math.ceil(dadosFinais.length / tamanhoPagina),
    1,
  );
  const paginaAtiva = Math.min(paginaAtual, totalPaginas);

  const indiceInicial = (paginaAtiva - 1) * tamanhoPagina;
  const linhasAtuais = dadosFinais.slice(
    indiceInicial,
    indiceInicial + tamanhoPagina,
  );

  const handleMudarTamanho = (novoTamanho: number) => {
    setTamanhoPagina(novoTamanho);
    setPaginaAtual(1);
  };

  return (
    <div className={`dashboard-table-container ${className}`.trim()}>
      <div className="table-responsive">
        <table className="dashboard-table">
          <thead>
            <tr>
              {colunasFinais.map((col, idx) => {
                const chave = col.chave ?? col.key ?? `col-${idx}`;
                const rotulo = col.rotulo ?? col.label ?? '';
                const alinhamento = col.alinhamento ?? col.align ?? 'left';
                return (
                  <th
                    key={chave}
                    className={`dashboard-th text-${alinhamento}`}
                  >
                    {rotulo}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {linhasAtuais.length === 0 ? (
              <tr>
                <td
                  colSpan={colunasFinais.length}
                  className="dashboard-td empty text-center py-4 text-muted"
                >
                  {textoVazio}
                </td>
              </tr>
            ) : (
              linhasAtuais.map((linha, indiceLinha) => (
                <tr
                  key={String(
                    linha.id ?? `linha-${indiceInicial + indiceLinha}`,
                  )}
                  className={`dashboard-tr ${indiceLinha % 2 === 1 ? 'striped' : ''}`}
                >
                  {colunasFinais.map((col, idx) => {
                    const chave = col.chave ?? col.key ?? `col-${idx}`;
                    const alinhamento = col.alinhamento ?? col.align ?? 'left';
                    const valorLinha = linha[chave];

                    return (
                      <td
                        key={chave}
                        className={`dashboard-td text-${alinhamento}`}
                      >
                        {col.render
                          ? col.render(valorLinha, linha)
                          : ((valorLinha as React.ReactNode) ?? '-')}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        paginaAtual={paginaAtiva}
        totalPaginas={totalPaginas}
        onMudancaPagina={setPaginaAtual}
        itensPorPagina={tamanhoPagina}
        onMudancaTamanhoPagina={handleMudarTamanho}
        exibirSeletorTamanho={mostrarSeletor}
      />
    </div>
  );
};

export default DashboardTable;
