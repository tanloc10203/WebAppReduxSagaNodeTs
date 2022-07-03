// material
import { Grid } from '@mui/material';
import SkeletonCustom from 'components/Skeleton';
import { ProductAttribute } from 'models';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

export interface ProductListProps {
  products: Array<ProductAttribute>;
  loading: boolean;
  [key: string]: any;
}

export default function ProductList({ products, loading, ...other }: ProductListProps) {
  return (
    <Grid container spacing={3} {...other}>
      {!loading
        ? products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={3}>
              <ShopProductCard loading={loading} product={product} />
            </Grid>
          ))
        : [...Array(4)].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <SkeletonCustom />
            </Grid>
          ))}
    </Grid>
  );
}
