import {
  Card,
  CardContent,
  CardMedia,
  Link,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { LazyLoadingImg } from 'components/Common';
import { ProductAttribute } from 'models';
import { Link as RouterLink } from 'react-router-dom';
import { fPriceVN } from 'utils';

export default function SwiperItemCard({ product }: { product: ProductAttribute }) {
  const { name, price, thumb } = product;

  console.log(price);

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
          {/* {status && (
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
          )} */}
          <LazyLoadingImg url={thumb as string} />
        </CardMedia>

        <CardContent>
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="subtitle1" color="green">
              {fPriceVN(price?.price as number)}
              &nbsp;&nbsp;
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {/* {priceSale && fPriceVN(priceSale)} */}
              </Typography>
            </Typography>
          </Stack>

          <Tooltip title={name as string} arrow placement="top">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Tooltip>
          <Rating name="read-only" value={3} readOnly />
        </CardContent>
      </Card>
    </Link>
  );
}
