export interface UserSearchProps {
  searchTerm: string;
  searchKey: string;
  onSearch: (key: string, value: string) => void;
  onKeyChange: (key: string) => void;
}
