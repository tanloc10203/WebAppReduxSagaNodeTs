import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { LazyLoadingImg } from 'components/Common';
import { Link as RouterLink } from 'react-router-dom';
import { ProductsMock } from '_mock';

export interface GridItemCatProps {
  product: ProductsMock;
}

export default function GridItemCat({ product }: GridItemCatProps) {
  const { name, cover } = product;

  return (
    <Link
      component={RouterLink}
      to="#"
      sx={{ width: '100%', height: '100%', display: 'block', textDecoration: 'none' }}
    >
      <Card
        sx={{
          width: '100%',
          position: 'relative',
          maxWidth: 400,
          borderRadius: 0,
        }}
      >
        <CardMedia sx={{ width: '100%', height: 180, position: 'relative' }}>
          <LazyLoadingImg url={cover} />
        </CardMedia>

        <CardContent>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
