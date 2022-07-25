import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { productActions, productSelector } from 'features/product/productSlice';
import { useEffect } from 'react';
import { ContentDealOfDay, HeadDealOfDay } from 'sections/@home/dealOfDay';
import LoadingCat from './LoadingCat';

export interface DealOfDateProps {}

export default function DealOfDay(props: DealOfDateProps) {
  const { paramGetRandom, data, isFetching: loading } = useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActions.fetchRandomProductStart(paramGetRandom));
  }, [paramGetRandom, dispatch]);

  return (
    <>
      {loading && <LoadingCat />}
      <Box mt={10}>
        <HeadDealOfDay />
        <ContentDealOfDay data={data} />
      </Box>
    </>
  );
}
