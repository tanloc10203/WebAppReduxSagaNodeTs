import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Box, Container, LinearProgress, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { productApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError } from 'axios';
import { FormLayout } from 'components/FormFields';
import { productPriceActions } from 'features/productPrice/productPriceSlice';
import { ListResponse, ProductAttribute, ProductPriceAttribute } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductPriceUpdateForm } from '../components/forms';

export default function ProductPageUpdatePrice() {
  const { productId } = useParams();

  const theme = createTheme();

  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<ProductAttribute>();

  console.log('check params: ', productId);

  useEffect(() => {
    if (!productId || productId === undefined) return;

    (async () => {
      try {
        const response: ListResponse<ProductAttribute> = await productApi.getById(+productId);

        if (!response.error) setSelected(response.data as ProductAttribute);
      } catch (error) {
        if (error instanceof AxiosError) toast.error(error.message);
      }
    })();
  }, [productId]);

  const initialValues: ProductPriceAttribute = {
    price: 0,
    priceBeforeDiscount: 0,
    priceMax: 0,
    priceMaxBeforeDiscount: 0,
    priceMin: 0,
    priceMinBeforeDiscount: 0,
  };

  const handleSubmit = (values: ProductPriceAttribute) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          if (productId) {
            const newValues = {
              ...values,
              productId: +productId,
              timeChangeId: -1,
            };
            dispatch(productPriceActions.fetchCreateStart(newValues));
            resolve(true);
          }
        }, 300);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {!selected ? (
        <LinearProgress />
      ) : (
        <Container component="main">
          <Box mb={3}>
            <Typography component="h1" variant="h5">
              {selected?.name}
            </Typography>
          </Box>

          <FormLayout
            title="Product: Update price"
            titleHead="Update price"
            icon={<PriceCheckIcon />}
          >
            <ProductPriceUpdateForm initialValues={initialValues} onSubmit={handleSubmit} />
          </FormLayout>
        </Container>
      )}
    </ThemeProvider>
  );
}
