import { CategoryAttribute } from 'models';

export interface StatusProduct {
  id: number;
  name: string;
  key: 'process' | 'hide' | 'show';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductAttribute {
  id?: number;
  name?: string;
  thumb?: string;
  categoryId?: number;
  statusPId?: number;
  slug?: string;
  description?: string;
  productDetail?: string;
  createdAt?: string;
  updatedAt?: string;

  status?: StatusProduct;
  categories?: CategoryAttribute;
}
