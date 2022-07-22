import { Box } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { productSelector } from 'features/product/productSlice';
import { ContentDealOfDay, HeadDealOfDay } from 'sections/@home/dealOfDay';

export interface DealOfDateProps {}

export default function DealOfDay(props: DealOfDateProps) {
  const { data } = useAppSelector(productSelector);

  return (
    <Box mt={10}>
      <HeadDealOfDay />
      <ContentDealOfDay data={data} />
    </Box>
  );
}
