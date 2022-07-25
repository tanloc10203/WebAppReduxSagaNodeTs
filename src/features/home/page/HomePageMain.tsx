import { Box, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Page } from 'components/Common';
import { categoryActions, categorySelector } from 'features/category/categorySlice';
import { ProductAttribute } from 'models';
import { memo, useEffect } from 'react';
import { CatHead } from 'sections/@home/cat';
import { ContentDealOfDay } from 'sections/@home/dealOfDay';
import {
  Banner,
  BannerProduct,
  DealOfDay,
  Features,
  LoadingCat,
  SaleProduct,
  TopCatOfMonth,
} from '../components';

function HomePageMain() {
  const { dataProduct, isFetching } = useAppSelector(categorySelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoryActions.fetchCatProductStart());
  }, [dispatch]);

  return (
    <Page title="Trang chủ">
      <Banner />

      <Features />

      <BannerProduct />

      <DealOfDay />

      <TopCatOfMonth />

      {isFetching && [...Array(3)].map((item, i) => <LoadingCat key={i} />)}

      {Boolean(dataProduct) &&
        dataProduct.map((item, i) => {
          return (
            <Box mt={10} key={i}>
              <CatHead title={item.name} />
              <ContentDealOfDay data={item.products as Array<ProductAttribute>} />
            </Box>
          );
        })}

      <SaleProduct />

      <Divider sx={{ mt: 10 }} component="div" variant="fullWidth" />
    </Page>
  );
}

export default memo(HomePageMain);
