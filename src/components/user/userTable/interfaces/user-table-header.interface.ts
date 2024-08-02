export interface UserTableHeaderProps {
  columnWidths: {
    firstName: number;
    age: number;
    gender: number;
    phone: number;
    addressCity: number;
  };
  onSort: (key: string) => void;
  getSortArrow: (key: string) => string;
}
