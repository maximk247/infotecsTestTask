export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  address: Address;
  height: number;
  weight: number;
  email: string;
}

interface Address {
  address: string;
  city: string;
}
