export interface ProductPriceAttribute {
  id?: number;

  price: number;
  isSale: boolean;

  percentDiscount: number;
  priceDiscount: number;

  productId?: number;
  timeChangeId?: number;

  createdAt?: string;
  updatedAt?: string;
}
