import { Card, CardContent, CardMedia, Link, Rating, Stack, Typography } from '@mui/material';
import { Label, LazyLoadingImg } from 'components/Common';
import { Link as RouterLink } from 'react-router-dom';
import { fPriceVN } from 'utils';
import { ProductsMock } from '_mock';

export default function SwiperItemCard({ product }: { product: ProductsMock }) {
  const { name, cover, price, status, priceSale } = product;

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
        }}
      >
        <CardMedia sx={{ width: '100%', height: 180, position: 'relative' }}>
          {status && (
            <Label
              variant="filled"
              color={(status === 'sale' && 'error') || 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
              }}
            >
              {status}
            </Label>
          )}
          <LazyLoadingImg url={cover} />
        </CardMedia>

        <CardContent>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="subtitle1" color="green">
              {fPriceVN(price)}
              &nbsp;&nbsp;
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {priceSale && fPriceVN(priceSale)}
              </Typography>
            </Typography>
          </Stack>

          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
          <Rating name="read-only" value={3} readOnly />
        </CardContent>
      </Card>
    </Link>
  );
}
