import { Box, Card, Link, Stack, Typography } from '@mui/material';
import { LazyLoadingImg } from 'components/Common';
import { ProductAttribute } from 'models';
import { Link as RouterLink } from 'react-router-dom';
import { fCurrency } from 'utils';
import { UserMoreMenu } from '../user';

export interface ShopProductCardProps {
  product: ProductAttribute;
  loading?: boolean;
}

export default function ShopProductCard({ product }: ShopProductCardProps) {
  const { name, thumb, slug, status } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
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
        <LazyLoadingImg alt={name} url={thumb as string} />
        <UserMoreMenu />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/dashboard/products/${slug}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle2">
            {/* <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {fCurrency(5000000)}
            </Typography> */}
            {/* &nbsp; */}
            {status && status.key === 'process' ? 'Chưa cập nhật giá' : fCurrency(5000000)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
