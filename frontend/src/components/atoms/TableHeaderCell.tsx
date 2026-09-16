import React from 'react';

interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  ...props
}) => {
  return <th {...props}>{children}</th>;
};

export default TableHeaderCell;
