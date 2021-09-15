import { Coupon } from "src/app/_models";
export interface SummaryCart {
  subTotal: number;
  couponDiscount: number;
  tax: number;
  grandTotal: number;
}
