import { Box } from '@mui/material';
import { LazyLoadingImg } from 'components/Common';

export interface SaleProductProps {}

// Fixed number of columns
const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 2,
};

export default function SaleProduct(props: SaleProductProps) {
  return (
    <Box mt={10} sx={gridContainer}>
      <Box>
        <LazyLoadingImg
          url="/static/mock-images/banner/sale-banner-1.jpg"
          sx={{ position: 'unset !important' }}
        />
      </Box>
      <Box>
        <LazyLoadingImg
          url="/static/mock-images/banner/sale-banner-1.jpg"
          sx={{ position: 'unset !important' }}
        />
      </Box>
    </Box>
  );
}
