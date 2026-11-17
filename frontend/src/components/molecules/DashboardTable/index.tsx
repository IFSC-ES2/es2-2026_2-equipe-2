import React from 'react';
import Table, { type Column } from '../../organisms/Table';
import './index.css';

export type ColunaTabelaDashboard = Column;
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
  return (
    <Table
      columns={colunas ?? columns}
      data={dados ?? data}
      initialPageSize={tamanhoPaginaInicial ?? initialPageSize ?? 5}
      showPageSizeSelector={
        exibirSeletorTamanho ?? showPageSizeSelector ?? false
      }
      emptyMessage={
        mensagemVazio ?? emptyMessage ?? 'Nenhum registro encontrado.'
      }
      showActions={false}
      className={`dashboard-table-container ${className}`.trim()}
    />
  );
};

export default DashboardTable;
