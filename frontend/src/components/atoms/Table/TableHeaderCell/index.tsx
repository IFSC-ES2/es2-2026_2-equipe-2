import React from 'react';
import './index.css';

interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <th className={className} {...props}>
      {children}
    </th>
  );
};

export default TableHeaderCell;
