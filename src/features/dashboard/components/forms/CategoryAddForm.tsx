import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { categorySelector } from 'features/category/categorySlice';
import { CategoryAttribute } from 'models';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { convertToSlug } from 'utils';
import * as yup from 'yup';

export interface CategoryAddFormProps {
  initialValues?: CategoryAttribute;
  onSubmit?: (values: CategoryAttribute) => Promise<unknown>;
}

const schemaCategoryAdd = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export default function CategoryAddForm({ initialValues, onSubmit }: CategoryAddFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CategoryAttribute>({
    defaultValues: initialValues,
    resolver: yupResolver(schemaCategoryAdd),
  });

  const { error, isFetching } = useAppSelector(categorySelector);

  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    if (!initialValues?.slug) return;
    setSlug(initialValues.slug);
  }, [initialValues]);

  const handleOnSubmit = async (values: CategoryAttribute) => {
    if (!onSubmit) return;

    const newValues: CategoryAttribute = {
      ...values,
      slug: convertToSlug(values.name),
    };

    await onSubmit?.(newValues);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSlug(convertToSlug(event.target.value));
  };

  const loading = isSubmitting ? true : isFetching ? true : false;

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1, width: '100%' }}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField name="name" onChange={handleChange} control={control} label="Category name" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            value={slug}
            label="Slug"
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
            disabled
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
        &nbsp;Add new
      </Button>
    </Box>
  );
}
