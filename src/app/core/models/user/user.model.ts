import { Role } from "./role.model";

export interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: Role[];
}
