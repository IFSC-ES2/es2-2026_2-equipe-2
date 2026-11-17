import Table, {
  type TableProps,
  type Column,
  type TableDataRow,
} from '../../organisms/Table';
import TableHeader, { type TableHeaderProps } from './TableHeader';
import TableRow, { type TableRowProps } from './TableRow';

export { Table, TableHeader, TableRow };
export type {
  TableProps,
  TableHeaderProps,
  TableRowProps,
  Column,
  TableDataRow,
};
export default Table;
