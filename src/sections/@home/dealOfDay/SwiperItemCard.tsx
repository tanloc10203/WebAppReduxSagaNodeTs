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
import { NavLink as RouterLink } from 'react-router-dom';
import { fPriceVN } from 'utils';

export default function SwiperItemCard({ product }: { product: ProductAttribute }) {
  const { name, price, thumb, slug } = product;

  return (
    <Link
      component={RouterLink}
      to={`/${slug}`}
      sx={{ width: '100%', height: '100%', display: 'block', textDecoration: 'none' }}
    >
      <Card
        sx={{
          width: '100%',
          position: 'relative',
          maxWidth: 400,
        }}
      >
        <CardMedia sx={{ width: '100%', height: 200, position: 'relative' }}>
          <LazyLoadingImg
            url={thumb as string}
            sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
          />
        </CardMedia>

        <CardContent>
          <Stack flexDirection="row" alignItems="center">
            <Typography
              fontSize={15}
              variant="subtitle1"
              color={price?.isSale ? '#3EC70B' : 'green'}
            >
              {price?.isSale ? fPriceVN(price?.priceDiscount) : fPriceVN(price?.price as number)}
            </Typography>
            {price?.isSale && (
              <Typography fontSize={16} variant="subtitle1" color="#f30">
                &nbsp;&nbsp;{price.isSale && '-' + price.percentDiscount + '%'}
              </Typography>
            )}
          </Stack>

          <Tooltip title={name as string} arrow placement="top">
            <Typography
              variant="subtitle2"
              color="#555"
              noWrap
              sx={{
                transition: 'color 0.3s ease-in-out 0s',
                '&:hover': {
                  color: 'blue',
                },
              }}
            >
              {name}
            </Typography>
          </Tooltip>
          <Rating name="read-only" value={3} readOnly />
        </CardContent>
      </Card>
    </Link>
  );
}
