import { User } from '../../models/user/user.model';
export interface LoginState {
  user: User | null;
  mess: string;
}
