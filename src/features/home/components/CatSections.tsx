import { Box } from '@mui/material';
import { CatHead } from 'sections/@home/cat';
import { ContentDealOfDay } from 'sections/@home/dealOfDay';

export interface CatSectionsProps {}

export default function CatSections(props: CatSectionsProps) {
  return (
    <Box mt={10}>
      <CatHead />
      <ContentDealOfDay />
    </Box>
  );
}
