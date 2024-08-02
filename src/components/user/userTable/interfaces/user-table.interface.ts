import { User } from "../../interfaces/user.interface";

export interface UserTableProps {
  onRowClick: (user: User) => void;
}
