import { Tax, UseObject, Age, Image, Brand } from './index';
export interface Product {
  id: number;
  name: string;
  description: string;
  thumbnail: Image;
  discountPercent: number;
  sku: string;
  priceUnit: number;
  priceToBuy: number;
  tax: Tax;
  brand: Brand;
  useObjects: UseObject[];
  ages: Age[];
}

export interface ProductFilter {
  ageRangeIds: number[] | null;
  useObjectId: number | null;
  brandId: number | null;
  priceRange: [number, number] | null;
  order: [string, string] | null;
}

export interface PendingOrderItem{
  product: Product;
  quantity: number;
  totalPrice?: number;
}
export interface OrderItem extends PendingOrderItem{
}
export interface Coupon{
  name: string,
  code: string,
  discount: number
}

export interface FavoriteProduct{
  id: number,
  product: Product
}
