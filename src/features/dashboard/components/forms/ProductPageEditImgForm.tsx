import { CircularProgress } from '@material-ui/core';
import { Box, Button, Grid } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ReviewImg } from 'components/Common';
import { UploadFile } from 'components/FormFields';
import { productImageSelectors } from 'features/productImage/productImageSlice';
import { ProductImagesAttribute } from 'models';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UploadImageProduct from './UploadImageProduct';

export interface ProductPageEditImgProps {
  data: ProductImagesAttribute;
  onSubmit?: (value: ProductImagesAttribute) => Promise<unknown>;
}

export default function ProductPageEditImg(props: ProductPageEditImgProps) {
  const { data, onSubmit } = props;
  const { isFetching } = useAppSelector(productImageSelectors);

  const { handleSubmit } = useForm<ProductImagesAttribute>({});

  const [urlImg, setUrlImg] = useState<string>(() => data.urlImg);
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleOnSubmit = async (values: ProductImagesAttribute) => {
    if (!onSubmit || !urlImg) return;

    const newData = {
      ...data,
      urlImg,
    };

    await onSubmit?.(newData);
  };

  const handleImgUpload = async (file: File) => {
    if (!file) return;
    setFile(file);
  };

  const handleGetImgUrl = (imgUrl: string) => {
    setFile(null);
    setUrlImg(imgUrl);
  };

  const loading = isFetching ? true : false;

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1, width: '100%' }}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UploadFile onChange={handleImgUpload} />
          <UploadImageProduct file={file as File} onGetUrl={handleGetImgUrl} />
        </Grid>

        {(urlImg.length > 0 || Boolean(data)) && (
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
                urlImg={urlImg || data.urlImg}
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
        &nbsp;Save
      </Button>
    </Box>
  );
}
