import Editor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ErrorFallbackAlert, ReviewImg } from 'components/Common';
import { InputField, SelectField, SelectOptions, UploadFile } from 'components/FormFields';
import Markdown from 'components/Markdown';
import { selectCategoryOptions } from 'features/category/categorySlice';
import { productSelector } from 'features/product/productSlice';
import { selectProductStatusOptions } from 'features/productStatus/productStatusSlice';
import { ProductAttribute } from 'models';
import { ChangeEvent, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { convertToSlug } from 'utils';
import * as yup from 'yup';
import UploadImageProduct from './UploadImageProduct';

export interface ProductAddEditFormProps {
  initialValues?: ProductAttribute;
  onSubmit?: (values: ProductAttribute) => Promise<unknown>;
}

const schemaProductForm = yup
  .object({
    name: yup.string().required().min(5),
    categoryId: yup.number().required(),
    statusPId: yup.number().required(),
    description: yup.string().required(),
  })
  .required();

export default function ProductAddEditForm({ initialValues, onSubmit }: ProductAddEditFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProductAttribute>({
    defaultValues: initialValues,
    resolver: yupResolver(schemaProductForm),
  });

  const { isFetching } = useAppSelector(productSelector);

  const [urlImg, setUrlImg] = useState<string>('');

  const [file, setFile] = useState<File | null>(null);

  const [productDetail, setProductDetail] = useState<string>('');

  const [open, setOpen] = useState<boolean>(false);

  const [slug, setSlug] = useState<string>('');

  const categoryOptions = useAppSelector(selectCategoryOptions);

  const productStatusOptions = useAppSelector(selectProductStatusOptions);

  useEffect(() => {
    if (!(initialValues as ProductAttribute).id) return;

    setProductDetail(initialValues?.productDetail as string);
    setUrlImg(initialValues?.thumb as string);
    setSlug(initialValues?.slug as string);
  }, [initialValues]);

  const handleOnSubmit = async (values: ProductAttribute) => {
    if (!onSubmit || productDetail.length < 0 || urlImg.length < 0) return;

    const newValues: ProductAttribute = {
      ...values,
      productDetail,
      slug: convertToSlug(values.name as string),
      thumb: urlImg,
    };

    await onSubmit?.(newValues);
  };

  const handleImgUpload = async (file: File) => {
    if (!file) return;
    setFile(file);
  };

  const handleChangeProductDetail = (event: EventInfo, editor: Editor) => {
    const data = editor.getData();
    setProductDetail(data);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSlug(convertToSlug(event.target.value));
  };

  const handleGetImgUrl = (imgUrl: string) => {
    setFile(null);
    setUrlImg(imgUrl);
  };

  const loading = isSubmitting ? true : isFetching ? true : false;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackAlert}>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1, width: '100%' }}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputField
              name="name"
              id="product-name"
              onChange={handleChange}
              control={control}
              label="Product name"
            />
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

          {Array.isArray(categoryOptions) && categoryOptions.length > 0 && (
            <Grid item xs={12} sm={6}>
              <SelectField
                name="categoryId"
                control={control}
                label="Category Id"
                options={categoryOptions as Array<SelectOptions>}
              />
            </Grid>
          )}

          {Array.isArray(productStatusOptions) && productStatusOptions.length > 0 && (
            <Grid item xs={12} sm={6}>
              <SelectField
                name="statusPId"
                control={control}
                label="Product Status Id"
                options={productStatusOptions as Array<SelectOptions>}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <InputField name="description" control={control} label="Description" />
          </Grid>

          <Grid item xs={12}>
            {(!Boolean(initialValues?.id) || Boolean(productDetail)) && (
              <Markdown value={productDetail} onChangeValueInput={handleChangeProductDetail} />
            )}
          </Grid>

          <Grid item xs={12}>
            <UploadFile onChange={handleImgUpload} />
            <UploadImageProduct file={file as File} onGetUrl={handleGetImgUrl} />
          </Grid>

          {urlImg.length > 0 && (
            <Grid item xs={12}>
              <Box
                position="relative"
                sx={{
                  height: 233,
                  width: 350,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              >
                <ReviewImg
                  open={open}
                  urlImg={urlImg}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                />
              </Box>
            </Grid>
          )}
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
          &nbsp;{!Boolean(initialValues?.id) ? 'Add new' : 'Save'}
        </Button>
      </Box>
    </ErrorBoundary>
  );
}
