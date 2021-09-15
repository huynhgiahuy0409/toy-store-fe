import { PendingOrderItem, User } from ".";
import { OrderItem } from "./product";

export interface CreditCard{
  cardHolderName: string,
  cardNumber: string,
  expiredDate: string
}
export interface OrderRequest {
  userId: string,
  creditCard: CreditCard | null
  totalPayment: number
}
export interface Order{
  id: number,
  createdDate: string,
  orderItems: OrderItem[],
  totalPayment: number,
  payment: Payment
  user: User,
}
export interface Payment{
  creditCard: CreditCard;
	status: number;
}

