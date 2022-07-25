import { CategoryAttribute, ProductPriceAttribute, ProductImagesAttribute } from 'models';

export type KeyStatusProduct = 'process' | 'hide' | 'show';

export interface StatusProduct {
  id: number;

  name: string;
  key: KeyStatusProduct;

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
  images?: Array<ProductImagesAttribute>;

  createdAt?: string | Date;
  updatedAt?: string | Date;

  status?: StatusProduct;
  categories?: CategoryAttribute;
  price?: ProductPriceAttribute;
}
