import { CircularProgress } from '@material-ui/core';
import { Box, Button, Grid, ImageList } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { UploadFileMultiple } from 'components/FormFields';
import { productImageSelectors } from 'features/productImage/productImageSlice';
import { ProductImagesAttribute } from 'models';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ProgressImageItem from 'sections/@dashboard/product-image/ProgressImageItem';

export interface ProductPageAddEditListImgFormProps {
  initialValues?: Omit<ProductImagesAttribute, 'productId'>;
  productId: number;
  onSubmit?: (values: ProductImagesAttribute) => Promise<unknown>;
}

const log = console.log;

function ProductPageAddEditListImgForm(props: ProductPageAddEditListImgFormProps) {
  const { onSubmit, productId } = props;
  const { handleSubmit } = useForm<ProductImagesAttribute>({});

  const { isFetching } = useAppSelector(productImageSelectors);

  const [files, setFiles] = useState<Array<File>>(() => {
    log('Initializers run twice');
    return [];
  });

  const [data, setData] = useState<Array<ProductImagesAttribute>>([]);

  const handleOnSubmit = async (values: ProductImagesAttribute) => {
    if (!onSubmit) return;

    await onSubmit?.(values);
  };

  const loading = isFetching ? true : false;

  const handleChangeFiles = (filesInput: Array<File>) => {
    log('Event handlers don’t need to be pure, so they run only once');
    if (!Boolean(filesInput)) return;

    const uploadFiles = [...files];

    // eslint-disable-next-line array-callback-return
    filesInput.some((file) => {
      if (uploadFiles.findIndex((f) => f.name === file.name) === -1) {
        uploadFiles.push(file);
      }
    });

    setFiles((pre) => {
      log('Updaters run twice');
      return [...pre, ...uploadFiles];
    });
  };

  const handleGetFileUrl = (values: string) => {
    console.log('check data', values);
  };

  log(files);

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
          <ImageList rowHeight={200} cols={4}>
            {Boolean(files) &&
              (files as Array<File>)?.length > 0 &&
              (files as Array<File>).map((file, index) => (
                <ProgressImageItem file={file} key={index} onGetUrl={handleGetFileUrl} />
              ))}
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
