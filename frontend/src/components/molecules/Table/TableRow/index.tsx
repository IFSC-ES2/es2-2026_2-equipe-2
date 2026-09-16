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
}

const TableRow: React.FC<TableRowProps> = ({ columns, row }) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <TableCell key={`${index}-${column.key}`}>{row[column.key]}</TableCell>
      ))}
      <TableCell>
        <ActionButtons />
      </TableCell>
    </tr>
  );
};

export default TableRow;
