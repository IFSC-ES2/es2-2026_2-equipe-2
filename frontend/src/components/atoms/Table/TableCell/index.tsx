import React from 'react';

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children, ...props }) => {
  return <td {...props}>{children}</td>;
};

export default TableCell;
