import { Box, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Page } from 'components/Common';
import { categoryActions, categorySelector } from 'features/category/categorySlice';
import { productActions, productSelector } from 'features/product/productSlice';
import { ProductAttribute } from 'models';
import { useEffect } from 'react';
import { CatHead } from 'sections/@home/cat';
import { ContentDealOfDay } from 'sections/@home/dealOfDay';
import {
  Banner,
  BannerProduct,
  DealOfDay,
  Features,
  SaleProduct,
  TopCatOfMonth,
} from '../components';

export interface HomePageMainProps {}

export default function HomePageMain(props: HomePageMainProps) {
  const { paramGetRandom } = useAppSelector(productSelector);
  const { dataProduct, isFetching } = useAppSelector(categorySelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActions.fetchRandomProductStart(paramGetRandom));
    dispatch(categoryActions.fetchCatProductStart());
  }, [dispatch, paramGetRandom]);

  return (
    <Page title="Trang chủ">
      <Banner />

      <Features />

      <BannerProduct />

      <DealOfDay />

      <TopCatOfMonth />

      {dataProduct.map((item, i) => {
        return (
          <Box mt={10} key={i}>
            <CatHead title={item.name} />
            <ContentDealOfDay
              data={item.products as Array<ProductAttribute>}
              loading={isFetching}
            />
          </Box>
        );
      })}

      <SaleProduct />

      <Divider sx={{ mt: 10 }} component="div" variant="fullWidth" />
    </Page>
  );
}
