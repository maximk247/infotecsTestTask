import { TableColumnWidths } from '../../../../interfaces/table-column.interface';
import { User } from '../../interfaces/user.interface';

export interface UserTableBodyProps {
  users: User[];
  onRowClick: (user: User) => void;
  columnWidths: TableColumnWidths;
}
