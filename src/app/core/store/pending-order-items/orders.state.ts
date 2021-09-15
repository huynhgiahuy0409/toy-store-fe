import { PendingOrderItem } from "src/app/_models";
export interface SummaryCart{
  subTotal: number
  couponValue: number;
  totalPayment: number;
}
export interface CartState {
  pendingOrders: PendingOrderItem[];
  summaryCart: SummaryCart
}
