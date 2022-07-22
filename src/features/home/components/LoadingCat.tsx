import { Box } from '@mui/material';
import LoadingContentCat from './LoadingContentCat';
import LoadingHeadCat from './LoadingHeadCat';

export default function LoadingCat() {
  return (
    <Box mt={10}>
      <LoadingHeadCat />
      <LoadingContentCat />
    </Box>
  );
}
