import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import { Box, Button, Grid } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField, TextFieldCustomNumber } from 'components/FormFields';
import { isFetchingProductPriceSelector } from 'features/productPrice/productPriceSlice';
import { ProductPriceAttribute } from 'models';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface ProductPriceUpdateFormProps {
  initialValues?: Omit<ProductPriceAttribute, 'priceDiscount'>;
  onSubmit?: (values: ProductPriceAttribute) => Promise<unknown>;
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

export function ProductPageAddEditPriceForm(props: ProductPriceUpdateFormProps) {
  const { initialValues, onSubmit } = props;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductPriceAttribute>({
    defaultValues: initialValues,
    resolver: yupResolver(productPriceFormAddSchema),
  });

  const isFetching = useAppSelector(isFetchingProductPriceSelector);

  const handleOnSubmit = async (values: ProductPriceAttribute) => {
    if (!onSubmit) return;

    const newValues = {
      ...values,
      priceDiscount: values.price - values.price * (values.percentDiscount / 100),
    };

    await onSubmit?.(newValues);
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
        <Grid item xs={12} sm={6}>
          <TextFieldCustomNumber name="price" control={control} label="Price" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectField
            name="isSale"
            control={control}
            label="Discount"
            options={[
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputField
            name="percentDiscount"
            control={control}
            label="Percent Discount"
            defaultValue={0}
            type="number"
            minLength={0}
            maxLength={100}
          />
        </Grid>
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
