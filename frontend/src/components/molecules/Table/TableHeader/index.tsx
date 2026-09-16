import React from 'react';
import TableHeaderCell from '../../../atoms/Table/TableHeaderCell';
import { type Column } from '../TableRow/';

interface TableHeaderProps {
  columns: Column[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead className="table-dark">
      <tr>
        {columns.map((column) => (
          <TableHeaderCell key={column.key}>{column.label}</TableHeaderCell>
        ))}
        <TableHeaderCell>Ações</TableHeaderCell>
      </tr>
    </thead>
  );
};

export default TableHeader;
