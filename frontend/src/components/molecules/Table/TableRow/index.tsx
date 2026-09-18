import React from 'react';
import TableCell from '../../../atoms/Table/TableCell';
import ActionButtons from '../../ActionButtons';

export interface Column {
  key: string;
  label: string;
}

export type TableDataRow = Record<string, React.ReactNode>;

interface TableRowProps {
  columns: Column[];
  row: TableDataRow;
  onEdit?: (row: TableDataRow) => void;
}

const TableRow: React.FC<TableRowProps> = ({ columns, row, onEdit }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <TableCell key={`${index}-${column.key}`}>{row[column.key]}</TableCell>
      ))}
      <TableCell>
        <ActionButtons onEdit={() => onEdit?.(row)} />
      </TableCell>
    </tr>
  );
};

export default TableRow;
