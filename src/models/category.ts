export interface CategoryAttribute {
  id?: number;
  name: string;
  slug?: string;
  children?: Array<CategoryAttribute> | null;
  parentCatId?: number;
  level?: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
