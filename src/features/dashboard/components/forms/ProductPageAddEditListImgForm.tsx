import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import { Box, Button, Grid } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { isFetchingProductPriceSelector } from 'features/productPrice/productPriceSlice';
import { ProductImagesAttribute } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface ProductPageAddEditListImgFormProps {
  initialValues?: Omit<ProductImagesAttribute, 'productId'>;
  onSubmit?: (values: ProductImagesAttribute) => Promise<unknown>;
}

const productPriceFormAddSchema = yup
  .object({
    price: yup.number().required().positive().min(1000),
    isSale: yup.boolean().required(),
    percentDiscount: yup
      .number()
      .min(0)
      .max(100)
      .required()
      .when('isSale', {
        is: true,
        then: yup.number().min(0.1).max(100).required(),
        otherwise: yup.number().min(0).max(100).notRequired(),
      }),
  })
  .required();

export default function ProductPageAddEditListImgForm(props: ProductPageAddEditListImgFormProps) {
  const { initialValues, onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductImagesAttribute>({
    defaultValues: initialValues,
    resolver: yupResolver(productPriceFormAddSchema),
  });

  const isFetching = useAppSelector(isFetchingProductPriceSelector);

  const handleOnSubmit = async (values: ProductImagesAttribute) => {
    if (!onSubmit) return;

    await onSubmit?.(values);
  };

  const loading = isSubmitting ? true : isFetching ? true : false;

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1, width: '100%' }}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Grid container spacing={2}>
        dsdsfsdfs
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="primary"
        disabled={loading}
      >
        {loading && <CircularProgress size={16} color="inherit" />}
        &nbsp;Save
      </Button>
    </Box>
  );
}
