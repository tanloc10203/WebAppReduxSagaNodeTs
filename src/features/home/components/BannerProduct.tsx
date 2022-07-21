import { Box } from '@mui/material';
import { LazyLoadingImg } from 'components/Common';

// Fixed number of columns
const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 3fr))',
  gap: 2,
};

export interface BannerProductProps {}

export default function BannerProduct(props: BannerProductProps) {
  return (
    <Box mt={10} sx={gridContainer}>
      <Box>
        <LazyLoadingImg
          url="/static/mock-images/banner/banner-9.jpg"
          sx={{ position: 'unset !important' }}
        />
      </Box>
      <Box>
        <LazyLoadingImg
          url="/static/mock-images/banner/banner-9.jpg"
          sx={{ position: 'unset !important' }}
        />
      </Box>
      <Box>
        <LazyLoadingImg
          url="/static/mock-images/banner/banner-9.jpg"
          sx={{ position: 'unset !important' }}
        />
      </Box>
    </Box>
  );
}
