export interface UserTableHeaderCellProps {
  content: string;
  width: number;
  minWidth: number;
  onClick?: () => void;
  sortArrow?: string;
}
