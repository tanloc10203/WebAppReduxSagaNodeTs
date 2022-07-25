import HomeIcon from '@mui/icons-material/Home';
import { ListItemDecorator } from '@mui/joy';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Rating,
  Stack,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { productApi } from 'api';
import { AxiosError } from 'axios';
import { Page } from 'components/Common';
import { ListResponse, ProductAttribute, ProductImagesAttribute } from 'models';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Quantity } from 'sections/@home/product';
import LoadingLayout from 'sections/@home/product/LoadingLayout';
import { fPriceVN } from 'utils';
import { DealOfDay } from '../components';
import SliderThumb from '../components/product-page/SliderThumb';

export interface ProductPageProps {}

const useStyles = makeStyles((theme) => ({
  content: {
    overflow: 'hidden',
    WebkitLineClamp: 8,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
  },
  active: {
    display: 'block',
  },
}));

export default function ProductPage(props: ProductPageProps) {
  const { slug } = useParams();
  const [selected, setSelected] = useState<ProductAttribute>({});
  const [show, setShow] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        const response: ListResponse<ProductAttribute> = await productApi.getBySlug(slug);

        if (!response.error) {
          setSelected(response.data as ProductAttribute);
        }
      } catch (error) {
        if (error instanceof AxiosError) toast.error(error.message);
      }
    })();
  }, [slug]);

  const handleShow = () => {
    setShow((pre) => !pre);
  };

  return (
    <Page
      title={Boolean(selected) && Object.keys(selected).length > 0 ? selected.name : 'Loading...'}
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ background: '#f1f1f1', p: 2 }}>
        <Link
          component={NavLink}
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {Boolean(selected) && Object.keys(selected).length > 0 ? selected.name : 'Loading...'}
        </Typography>
      </Breadcrumbs>

      {!Boolean(Object.keys(selected).length) && <LoadingLayout />}

      <Box>
        <Box>
          <Grid container mt={2} spacing={1}>
            {/* Content Left */}
            <Grid item lg={9} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={5} md={5} sm={5} xs={12}>
                  {Boolean(selected.images) &&
                    (selected.images as Array<ProductImagesAttribute>).length > 0 && (
                      <SliderThumb images={selected.images as Array<ProductImagesAttribute>} />
                    )}
                </Grid>

                <Grid item lg={7} md={7} sm={7} xs={12}>
                  <Box borderBottom="1px solid #dedede" pb={1}>
                    <Typography variant="h5" fontWeight={500} fontSize={22} letterSpacing={0.5}>
                      {selected.name}
                    </Typography>
                    <Stack mt={1} direction="row" gap={2} alignItems="center">
                      <Typography variant="body2" borderRight="1px solid #dedede" pr={2}>
                        Brand:{' '}
                        <Link sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                          {selected.categories?.name}
                        </Link>
                      </Typography>
                      <Stack direction="row" alignItems="center">
                        <Rating name="read-only" value={3} readOnly />
                        <Typography variant="caption">(1 review)</Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  <Box mt={3} borderBottom="1px solid #dedede" pb={3}>
                    {Boolean(selected) && (
                      <Stack flexDirection="row" alignItems="center" mb={3}>
                        <Typography fontSize={20} variant="subtitle1" color="black">
                          {selected.price?.isSale
                            ? fPriceVN(selected.price?.priceDiscount)
                            : fPriceVN(selected.price?.price as number)}
                        </Typography>
                        {selected.price?.isSale && (
                          <>
                            <Typography
                              fontSize={16}
                              variant="subtitle1"
                              color="GrayText"
                              sx={{ textDecoration: 'line-through', ml: 1, mr: 1 }}
                            >
                              &nbsp;&nbsp;
                              {selected.price.isSale && fPriceVN(selected.price?.price as number)}
                            </Typography>
                            <Typography fontSize={16} variant="subtitle1" color="#f30">
                              &nbsp;&nbsp;
                              {selected.price.isSale && '-' + selected.price.percentDiscount + '%'}
                            </Typography>
                          </>
                        )}
                      </Stack>
                    )}

                    <Typography mb={1}>
                      Sold by: &nbsp;
                      <Link
                        sx={{ textDecoration: 'none', cursor: 'pointer' }}
                        textTransform="uppercase"
                        fontWeight="bold"
                      >
                        {selected.categories?.name}
                      </Link>
                    </Typography>

                    <Typography variant="subtitle1" color="#666" fontWeight={500}>
                      {selected.description}
                    </Typography>
                  </Box>

                  <Box mt={3} borderBottom="1px solid #dedede" pb={3}>
                    <Stack direction="row" alignItems="center" gap={1} color="#666">
                      <Typography>Quantity</Typography>
                      <Quantity />
                      <Typography variant="body2" ml={1}>
                        (100 products available)
                      </Typography>
                    </Stack>

                    <Stack direction="row" mt={3} gap={3}>
                      <Button variant="contained">Add To Cart</Button>
                      <Button variant="contained" color="secondary">
                        Buy now
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Content Right */}
            <Grid item lg={3} display={{ lg: 'block', md: 'none', sm: 'none', xs: 'none' }}>
              <Box>
                <List
                  aria-labelledby="decorated-list-demo"
                  sx={{ '--List-decorator-width': '32px' }}
                >
                  <ListItem>
                    <ListItemDecorator>🧅</ListItemDecorator> Shipping nationwide
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>🍤</ListItemDecorator> Free 7-day return if eligible, so easy
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>🥓</ListItemDecorator> Supplier give bills for this product.
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>🥓</ListItemDecorator> Supplier give bills for this product.
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box mt={3}>
          <Card>
            <CardHeader title="Detail Products" sx={{ pb: 3 }} />

            <Divider />

            <CardContent>
              <Box>
                <div
                  className={show ? classes.active : classes.content}
                  dangerouslySetInnerHTML={{ __html: selected.productDetail as string }}
                />
              </Box>
              <Box display="flex" justifyContent="center" onClick={handleShow}>
                <Button style={{ display: 'inline-block' }} variant="outlined" size="small">
                  {show ? 'Hide' : 'Show'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <DealOfDay />
      </Box>
    </Page>
  );
}
