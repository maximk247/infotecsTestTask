/**
 * Пропсы для инпута поиска
 */
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}
