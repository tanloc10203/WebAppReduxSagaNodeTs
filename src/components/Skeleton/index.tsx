import { Box, Card, Skeleton, Stack } from '@mui/material';

export interface SkeletonProps {}

export default function SkeletonCustom(props: SkeletonProps) {
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Skeleton
          height="100%"
          width="100%"
          sx={{ position: 'absolute', top: 0 }}
          animation="wave"
          variant="rectangular"
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={15} width="80%" />
      </Stack>
    </Card>
  );
}
