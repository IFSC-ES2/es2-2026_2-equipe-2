import React from 'react';
import TableHeader from '../../molecules/Table/TableHeader';
import TableRow, {
  type Column,
  type TableDataRow,
} from '../../molecules/Table/TableRow';
import TableCell from '../../atoms/Table/TableCell';

export type { Column, TableDataRow };

interface GenericTableProps {
  columns: Column[];
  data: TableDataRow[];
  onEdit?: (row: TableDataRow) => void;
}

const GenericTable: React.FC<GenericTableProps> = ({
  columns,
  data,
  onEdit,
}) => {
  if (!columns || columns.length === 0) {
    return <p>Nenhuma coluna disponível para exibição.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered">
        <TableHeader columns={columns} />
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                columns={columns}
                row={row}
                onEdit={onEdit}
              />
            ))
          ) : (
            <tr>
              <TableCell colSpan={columns.length + 1} className="text-center">
                Nenhum registro encontrado.
              </TableCell>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
