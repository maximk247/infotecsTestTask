import { User } from '../components/user/interfaces/user.interface';

export interface UserState {
  users: User[];
  unsortedUsers: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  searchKey: string;
  sortConfig: { key: string; direction: string };
  currentPage: number;
  itemsPerPage: number;
  selectedUser: User | null;
}
