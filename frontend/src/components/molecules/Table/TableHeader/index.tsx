import React from 'react';
import TableHeaderCell from '../../../atoms/Table/TableHeaderCell';
import { type Column } from '../TableRow/';
import './index.css';

export interface TableHeaderProps {
  columns: Column[];
  showActions?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  showActions = true,
}) => {
  return (
    <thead>
      <tr className="app-table-header-row">
        {columns.map((column, idx) => {
          const key = column.key ?? column.chave ?? `col-${idx}`;
          const label = column.label ?? column.rotulo ?? '';
          const align = column.align ?? column.alinhamento ?? 'left';

          return (
            <TableHeaderCell
              key={key}
              className={`app-table-header-cell text-${align}`}
            >
              {label}
            </TableHeaderCell>
          );
        })}
        {showActions && (
          <TableHeaderCell className="app-table-header-cell text-center">
            Ações
          </TableHeaderCell>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
