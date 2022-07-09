import { Avatar, Box, Card, Grid, Link, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { LazyLoadingImg, SvgIconStyle } from 'components/Common';
import { ProductAttribute } from 'models';
import { useState } from 'react';
import DialogProduct from './DialogProduct';

import { CardContent } from '@mui/material';
import { Iconify } from 'components/Common';
import { fDate, fShortenNumber } from 'utils';
import ProductMoreMenu from './ProductMoreMenu';

export interface ShopProductCardProps {
  product: ProductAttribute;
  loading?: boolean;
  index: number;
}

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  },
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

export default function ShopProductCard({ product, index }: ShopProductCardProps) {
  const { name, thumb, id, price, createdAt } = product;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  const classes = useStyles();

  const POST_INFO = [
    { number: 100, icon: 'eva:message-circle-fill' },
    { number: 1000, icon: 'eva:eye-fill' },
    { number: 20000, icon: 'eva:share-fill' },
  ];

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
        <DialogProduct open={open} onClose={() => setOpen(false)} product={product} />

        <Card sx={{ position: 'relative' }}>
          <CardMediaStyle
            sx={{
              ...((latestPostLarge || latestPost) && {
                pt: 'calc(100% * 4 / 3)',
                '&:after': {
                  top: 0,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                },
              }),
              ...(latestPostLarge && {
                pt: {
                  xs: 'calc(100% * 4 / 3)',
                  sm: 'calc(100% * 3 / 4.66)',
                },
              }),
            }}
          >
            <SvgIconStyle
              color="paper"
              src="/static/icons/shape-avatar.svg"
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: 'absolute',
                color: 'background.paper',
                ...((latestPostLarge || latestPost) && { display: 'none' }),
              }}
            />
            <AvatarStyle
              sx={{
                ...((latestPostLarge || latestPost) && {
                  zIndex: 9,
                  top: 24,
                  left: 24,
                  width: 40,
                  height: 40,
                }),
              }}
            >
              <ProductMoreMenu productId={id as number} priceId={price?.id as number} />
            </AvatarStyle>

            <LazyLoadingImg alt={name as string} url={thumb as string} />
          </CardMediaStyle>

          <CardContent
            sx={{
              pt: 4,
              ...((latestPostLarge || latestPost) && {
                bottom: 0,
                width: '100%',
                position: 'absolute',
              }),
            }}
          >
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block' }}
            >
              {fDate(createdAt as Date)}
            </Typography>

            <Link
              color="inherit"
              variant="subtitle2"
              className={classes.titleStyle}
              underline="hover"
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
              sx={{
                ...(latestPostLarge && { typography: 'h5', height: '60px !important' }),
                ...((latestPostLarge || latestPost) && {
                  color: 'common.white',
                }),
              }}
            >
              {name}
            </Link>

            <InfoStyle>
              {POST_INFO.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: index === 0 ? 0 : 1.5,
                    ...((latestPostLarge || latestPost) && {
                      color: 'grey.500',
                    }),
                  }}
                >
                  <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                  <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                </Box>
              ))}
            </InfoStyle>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
