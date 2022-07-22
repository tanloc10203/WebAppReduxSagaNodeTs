import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { productApi } from 'api';
import { AxiosError } from 'axios';
import { Page } from 'components/Common';
import { ListResponse, ProductAttribute } from 'models';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface ProductPageProps {}

export default function ProductPage(props: ProductPageProps) {
  const { slug } = useParams();
  const [selected, setSelected] = useState<ProductAttribute>({});

  console.log(selected);

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        const response: ListResponse<ProductAttribute> = await productApi.getBySlug(slug);

        if (!response.error) {
          setSelected(response.data as ProductAttribute);
        }
      } catch (error) {
        if (error instanceof AxiosError) toast.error(error.message);
      }
    })();
  }, [slug]);

  return (
    <Page
      title={Boolean(selected) && Object.keys(selected).length > 0 ? selected.name : 'Loading...'}
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ background: '#f1f1f1', p: 2 }}>
        <Link
          component={NavLink}
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {Boolean(selected) && Object.keys(selected).length > 0 ? selected.name : 'Loading...'}
        </Typography>
      </Breadcrumbs>
    </Page>
  );
}
