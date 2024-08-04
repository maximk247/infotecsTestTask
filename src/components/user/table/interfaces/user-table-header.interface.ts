import { TableColumnWidths } from '../../../../interfaces/table-column.interface';

export interface UserTableHeaderProps {
  columnWidths: TableColumnWidths;
  onSort: (key: string) => void;
  getSortArrow: (key: string) => string;
}
