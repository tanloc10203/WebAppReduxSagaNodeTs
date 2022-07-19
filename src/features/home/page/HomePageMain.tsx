import { Divider } from '@mui/material';
import { Page } from 'components/Common';
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
