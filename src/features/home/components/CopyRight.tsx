import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export interface CopyRightProps {}

export default function CopyRight(props: CopyRightProps) {
  return (
    <Stack my={4} justifyContent="center" direction="row">
      &copy; 2022. All Rights &nbsp; <Link to="//github.com/tanloc10203">End Cool</Link>
    </Stack>
  );
}
