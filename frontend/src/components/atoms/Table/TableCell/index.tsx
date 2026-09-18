import React from 'react';
import './index.css';

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children, className = '', ...props }) => {
  return (
    <td className={className} {...props}>
      {children}
    </td>
  );
};

export default TableCell;
