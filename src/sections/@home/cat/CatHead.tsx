import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface CatHeadProps {
  title: string;
}

export default function CatHead(props: CatHeadProps) {
  const { title } = props;

  return (
    <Paper elevation={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#eee"
        p="12px"
        flexWrap="wrap"
      >
        <Typography variant="h5">{title}</Typography>

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
