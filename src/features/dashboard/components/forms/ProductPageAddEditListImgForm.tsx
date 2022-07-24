import { CircularProgress } from '@material-ui/core';
import { Box, Button, Grid, ImageList, ImageListItem } from '@mui/material';
import { PayloadFetchCreateProductImg } from 'api/productImgApi';
import { useAppSelector } from 'app/hooks';
import { LazyLoadingImg } from 'components/Common';
import { UploadFileMultiple } from 'components/FormFields';
import { productImageSelectors } from 'features/productImage/productImageSlice';
import { ProductImagesAttribute } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProgressImageItem from 'sections/@dashboard/product-image/ProgressImageItem';

export interface ProductPageAddEditListImgFormProps {
  productId: number;
  onSubmit?: (values: PayloadFetchCreateProductImg) => Promise<unknown>;
}

function ProductPageAddEditListImgForm(props: ProductPageAddEditListImgFormProps) {
  const { onSubmit, productId } = props;

  const { handleSubmit } = useForm<ProductImagesAttribute>({});

  const { isFetching } = useAppSelector(productImageSelectors);

  const [files, setFiles] = useState<Array<File>>([]);

  const [data, setData] = useState<Array<ProductImagesAttribute>>([]);

  const handleOnSubmit = async (values: ProductImagesAttribute) => {
    if (!onSubmit || !Boolean(productId) || !Boolean(data.length)) return;

    const payload: PayloadFetchCreateProductImg = {
      productId,
      data,
    };

    await onSubmit?.(payload);
  };

  const loading = isFetching ? true : false;

  const handleChangeFiles = (filesInput: Array<File>) => {
    if (!Boolean(filesInput)) return;

    const uploadFiles = [...files];

    // eslint-disable-next-line array-callback-return
    filesInput.some((file) => {
      if (uploadFiles.findIndex((f) => f.name === file.name) === -1) {
        uploadFiles.push(file);
      }
    });

    setFiles(uploadFiles);
  };

  const handleGetFileUrl = (values: string) => {
    setData((pre) => [...pre, { productId, urlImg: values }]);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1, width: '100%' }}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item>
          <UploadFileMultiple onChange={handleChangeFiles} />
          <ImageList rowHeight={200} cols={4} sx={{ mt: 2 }}>
            {Boolean(files) &&
              (files as Array<File>)?.length > 0 &&
              (files as Array<File>).map((file, index) => (
                <ProgressImageItem file={file} key={index} onGetUrl={handleGetFileUrl} />
              ))}
            {Boolean(data.length) &&
              data.map((p, i) => {
                return (
                  <ImageListItem key={i} cols={1} rows={1}>
                    <LazyLoadingImg url={p.urlImg} sx={{ position: 'unset !important' }} />
                  </ImageListItem>
                );
              })}
          </ImageList>
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

export default ProductPageAddEditListImgForm;
