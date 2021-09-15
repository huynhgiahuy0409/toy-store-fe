import { Permission } from "./index";
export interface Role {
  code: string;
  permissions: Permission[];
}
