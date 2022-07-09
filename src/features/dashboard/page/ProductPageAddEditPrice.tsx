import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Box, Container, LinearProgress, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { productApi, productPriceApi } from 'api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError } from 'axios';
import { FormLayout } from 'components/FormFields';
import { productPriceActions } from 'features/productPrice/productPriceSlice';
import { ListResponse, ProductAttribute, ProductPriceAttribute } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductPageAddEditPriceForm } from '../components/forms';

export default function ProductPageAddEditPrice() {
  const { productId, priceId } = useParams();

  const theme = createTheme();

  const isAddMode = !priceId;

  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<ProductAttribute>();

  const [selectedPrice, setSelectedPrice] = useState<ProductPriceAttribute>();

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

  useEffect(() => {
    if (!priceId) return;

    (async () => {
      try {
        const response: ListResponse<ProductPriceAttribute> = await productPriceApi.getById(
          +priceId
        );

        if (!response.error) setSelectedPrice(response.data as ProductPriceAttribute);
      } catch (error) {
        if (error instanceof AxiosError) toast.error(error.message);
      }
    })();
  }, [priceId]);

  const initialValues: ProductPriceAttribute = {
    price: 0,
    ...selectedPrice,
  };

  const handleSubmit = (values: ProductPriceAttribute) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          if (productId) {
            if (isAddMode) {
              const newValues = {
                ...values,
                productId: +productId,
                timeChangeId: -1,
              };
              dispatch(productPriceActions.fetchCreateStart(newValues));
            } else {
              dispatch(productPriceActions.fetchUpdateStart(values));
            }
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
            {(isAddMode || Boolean(selectedPrice)) && (
              <ProductPageAddEditPriceForm initialValues={initialValues} onSubmit={handleSubmit} />
            )}
          </FormLayout>
        </Container>
      )}
    </ThemeProvider>
  );
}
