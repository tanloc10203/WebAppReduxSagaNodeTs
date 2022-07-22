import { Paper, Skeleton, Stack } from '@mui/material';

export default function LoadingHeadCat() {
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
        <Skeleton animation="wave" sx={{ p: 1, width: 100 }} />

        <Stack direction="row" flexWrap="wrap">
          <Skeleton animation="wave" sx={{ p: 1, width: 100 }} />
          <Skeleton animation="wave" sx={{ p: 1, width: 100, ml: 1, mr: 1 }} />
          <Skeleton animation="wave" sx={{ p: 1, width: 100 }} />
        </Stack>
      </Stack>
    </Paper>
  );
}
