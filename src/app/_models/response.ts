import { Jwt, User, Product, Brand, Age, UseObject } from './index';
export interface PaginationResult<T>{ 
  items: T[];
  totalLength: number
}
export interface AuthenticationResponse {
  user: User;
  jwt: Jwt;
}
