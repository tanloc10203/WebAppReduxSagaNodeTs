import { Box, Button, Card, Link, Stack, Typography } from '@mui/material';
import { LazyLoadingImg } from 'components/Common';
import { ProductAttribute } from 'models';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fCurrency } from 'utils';
import { UserMoreMenu } from '../user';
import DialogProduct from './DialogProduct';

export interface ShopProductCardProps {
  product: ProductAttribute;
  loading?: boolean;
}

export default function ShopProductCard({ product }: ShopProductCardProps) {
  const { name, thumb, status, id, price } = product;

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <DialogProduct open={open} onClose={() => setOpen(false)} product={product} />

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
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link
            color="inherit"
            underline="hover"
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <ColorPreview colors={colors} /> */}
            {status && status.key === 'process' ? (
              <Button
                variant="text"
                component={RouterLink}
                to={`/dashboard/products/update/price/${id}`}
              >
                Cập nhật giá
              </Button>
            ) : (
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
                {fCurrency(price?.price as number) + ' VNĐ'}
              </Typography>
            )}

            <UserMoreMenu />
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
