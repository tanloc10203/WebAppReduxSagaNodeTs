import Editor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { uploadImgApi } from 'api';
import { useAppSelector } from 'app/hooks';
import { ReviewImg } from 'components/Common';
import { InputField, SelectField, SelectOptions, UploadFile } from 'components/FormFields';
import Markdown from 'components/Markdown';
import {
  productSelector,
  selectCategoryOptions,
  selectProductStatusOptions,
} from 'features/dashboard/dashboardSlice';
import { FileResponse, ProductAttribute } from 'models';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { convertToSlug } from 'utils';
import * as yup from 'yup';

const URL_SERVER = process.env.REACT_APP_URL_IMG;

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

  // console.log('check field', fields, append);

  const [urlImg, setUrl] = useState<string>('');

  const [productDetail, setProductDetail] = useState<string>('');

  const [open, setOpen] = useState<boolean>(false);

  const [slug, setSlug] = useState<string>('');

  const { error } = useAppSelector(productSelector);

  const categoryOptions = useAppSelector(selectCategoryOptions);

  const productStatusOptions = useAppSelector(selectProductStatusOptions);

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

  const handleChangeImg = async (file: File) => {
    try {
      if (!file) return;
      const response: FileResponse = await uploadImgApi.post(file);
      const urlImg = `${URL_SERVER}${response.filename}`;
      setUrl(urlImg);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProductDetail = (event: EventInfo, editor: Editor) => {
    const data = editor.getData();
    setProductDetail(data);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSlug(convertToSlug(event.target.value));
  };

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
          <Markdown value={productDetail} onChangeValueInput={handleChangeProductDetail} />
        </Grid>

        <Grid item xs={12}>
          <UploadFile onChange={handleChangeImg} />
        </Grid>

        {urlImg.length > 0 && (
          <Grid item xs={12}>
            <ReviewImg
              open={open}
              urlImg={urlImg}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
            />
          </Grid>
        )}
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
        &nbsp;Add new
      </Button>
    </Box>
  );
}
