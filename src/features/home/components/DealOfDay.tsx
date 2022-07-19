import { Box } from '@mui/material';
import { ContentDealOfDay, HeadDealOfDay } from 'sections/@home/dealOfDay';

export interface DealOfDateProps {}

export default function DealOfDay(props: DealOfDateProps) {
  return (
    <Box mt={10}>
      <HeadDealOfDay />
      <ContentDealOfDay />
    </Box>
  );
}
