import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface CatHeadProps {}

export default function CatHead(props: CatHeadProps) {
  return (
    <Paper elevation={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#eee"
        p="12px"
      >
        <Typography variant="h5">Danh mục</Typography>

        <Box>
          <Button color="inherit">Best Seller</Button>
          <Button color="inherit">Best Popular</Button>
          <Link component={RouterLink} to="#">
            <Button>View All</Button>
          </Link>
        </Box>
      </Stack>
    </Paper>
  );
}
