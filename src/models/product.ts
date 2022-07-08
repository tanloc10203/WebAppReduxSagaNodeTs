import { CategoryAttribute, ProductPriceAttribute } from 'models';

export interface StatusProduct {
  id: number;

  name: string;
  key: 'process' | 'hide' | 'show';

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductAttribute {
  id?: number;

  categoryId?: number;
  statusPId?: number;

  name?: string;
  slug?: string;

  thumb?: string;

  description?: string;
  productDetail?: string;

  createdAt?: string | Date;
  updatedAt?: string | Date;

  status?: StatusProduct;
  categories?: CategoryAttribute;
  price?: ProductPriceAttribute;
}
