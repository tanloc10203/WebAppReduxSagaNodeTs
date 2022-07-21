import { ProductAttribute } from 'models';

export interface CategoryAttribute {
  id?: number;
  name: string;

  slug?: string;
  children?: Array<CategoryAttribute> | null;

  parentCatId?: number;
  level?: number;

  image?: string;
  products?: Array<ProductAttribute>;

  createdAt?: string;
  updatedAt?: string;
}
