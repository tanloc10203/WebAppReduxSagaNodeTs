import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import { Box, Button, Grid } from '@mui/material';
import { TextFieldCustomNumber } from 'components/FormFields';
import { ProductPriceAttribute } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface ProductPriceUpdateFormProps {
  initialValues?: ProductPriceAttribute;
  onSubmit?: (values: ProductPriceAttribute) => Promise<unknown>;
}

const productPriceFormAddSchema = yup
  .object({
    price: yup.number().required().positive().min(1000),
    priceBeforeDiscount: yup.number().positive().min(1000),

    priceMax: yup.number().positive().min(1000),
    priceMaxBeforeDiscount: yup.number().positive().min(1000),

    priceMin: yup.number().positive().min(1000),
    priceMinBeforeDiscount: yup.number().positive().min(1000),
  })
  .required();

export function ProductPriceUpdateForm(props: ProductPriceUpdateFormProps) {
  const { initialValues, onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductPriceAttribute>({
    defaultValues: initialValues,
    resolver: yupResolver(productPriceFormAddSchema),
  });

  const handleOnSubmit = async (values: ProductPriceAttribute) => {
    if (!onSubmit) return;

    await onSubmit?.(values);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1, width: '100%' }}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      {/* {error && <Alert severity="error">{error}</Alert>} */}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextFieldCustomNumber name="price" control={control} label="Price" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldCustomNumber
            name="priceBeforeDiscount"
            control={control}
            label="Price Before Discount"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldCustomNumber name="priceMax" control={control} label="Price Max" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldCustomNumber
            name="priceMaxBeforeDiscount"
            control={control}
            label="Price Max Before Discount"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldCustomNumber name="priceMin" control={control} label="Price Min" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextFieldCustomNumber
            name="priceMinBeforeDiscount"
            control={control}
            label="Price Min Before Discount"
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting && <CircularProgress size={16} color="inherit" />}
        &nbsp;Save
      </Button>
    </Box>
  );
}
