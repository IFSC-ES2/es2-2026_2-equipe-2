import React from 'react';
import TableCell from '../../../atoms/Table/TableCell';
import ActionButtons from '../../ActionButtons';
import './index.css';

export interface Column {
  key?: string;
  label?: string;
  chave?: string;
  rotulo?: string;
  align?: 'left' | 'center' | 'right';
  alinhamento?: 'left' | 'center' | 'right';
  render?: (valor: unknown, linha: Record<string, unknown>) => React.ReactNode;
}

export type TableDataRow = Record<string, unknown>;

export interface TableRowProps {
  columns: Column[];
  row: TableDataRow;
  onEdit?: (row: TableDataRow) => void;
  onDelete?: (row: TableDataRow) => void;
  showActions?: boolean;
  isStriped?: boolean;
  className?: string;
}

const TableRow: React.FC<TableRowProps> = ({
  columns,
  row,
  onEdit,
  onDelete,
  showActions = true,
  isStriped = false,
  className,
}) => {
  const rowClasses = [
    'app-table-row',
    isStriped ? 'striped' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr className={rowClasses}>
      {columns.map((column, index) => {
        const key = column.key ?? column.chave ?? `col-${index}`;
        const align = column.align ?? column.alinhamento ?? 'left';
        const val = row[key];
        const content = column.render
          ? column.render(val, row)
          : ((val as React.ReactNode) ?? '');

        return (
          <TableCell
            key={`${index}-${key}`}
            className={`app-table-cell text-${align}`}
          >
            {content}
          </TableCell>
        );
      })}
      {showActions && (
        <TableCell className="app-table-cell text-center">
          <ActionButtons
            onEdit={() => onEdit?.(row)}
            onDelete={() => onDelete?.(row)}
          />
        </TableCell>
      )}
    </tr>
  );
};

export default TableRow;
