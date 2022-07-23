import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button, Container, LinearProgress, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { Iconify, Page } from 'components/Common';
import { productImageSelectors } from 'features/productImage/productImageSlice';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { ProductImageTable } from 'sections/@dashboard/product-image';

export interface ProductPageImagesProps {}

export default function ProductPageImages(props: ProductPageImagesProps) {
  const { productId } = useParams();
  const { data, isFetching } = useAppSelector(productImageSelectors);
  const navigate = useNavigate();

  console.log(productId);

  return (
    <Page title="Category">
      <Container>
        <Button onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon /> back
        </Button>
        {isFetching && <LinearProgress />}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product Image
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/dashboard/products/images/add/${productId}`}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product Image
          </Button>
        </Stack>

        <ProductImageTable data={data} />
      </Container>
    </Page>
  );
}
