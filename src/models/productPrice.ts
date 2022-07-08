export interface ProductPriceAttribute {
  id?: number;

  price: number;
  priceBeforeDiscount?: number;

  priceMax?: number;
  priceMaxBeforeDiscount?: number;

  priceMin?: number;
  priceMinBeforeDiscount?: number;

  productId?: number;
  timeChangeId?: number;

  createdAt?: string;
  updatedAt?: string;
}
