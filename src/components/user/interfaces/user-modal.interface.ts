import { User } from "./user.interface";


export interface UserModalProps {
  user: User | null;
  onClose: () => void;
}
