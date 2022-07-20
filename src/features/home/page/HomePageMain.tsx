import { Divider } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { Page } from 'components/Common';
import { productActions } from 'features/product/productSlice';
import { useEffect } from 'react';
import {
  Banner,
  Features,
  TopCatOfMonth,
  DealOfDay,
  CatSections,
  SaleProduct,
} from '../components';

export interface HomePageMainProps {}

export default function HomePageMain(props: HomePageMainProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActions.fetchRandomProductStart());
  }, [dispatch]);

  return (
    <Page title="Trang chủ">
      <Banner />

      <Features />

      <DealOfDay />

      <TopCatOfMonth />

      <CatSections />

      <CatSections />

      <CatSections />

      <SaleProduct />

      <Divider sx={{ mt: 10 }} component="div" variant="fullWidth" />
    </Page>
  );
}
