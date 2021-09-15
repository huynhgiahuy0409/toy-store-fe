import { Role } from './index';
export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  gender:string;
  status: string;
  address: string;
  phoneNumber: string;
  email: string;
  roles: Role[];
}
