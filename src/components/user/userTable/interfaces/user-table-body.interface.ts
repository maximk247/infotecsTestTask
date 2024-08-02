import { User } from '../../interfaces/user.interface';

export interface UserTableBodyProps {
  users: User[];
  onRowClick: (user: User) => void;
  columnWidths: {
    firstName: number;
    age: number;
    gender: number;
    phone: number;
    addressCity: number;
  };
}
