import { Box, Card, CardContent, CardHeader, Divider, Grid, Skeleton, Stack } from '@mui/material';

export interface LoadingLayoutProps {}

export default function LoadingLayout(props: LoadingLayoutProps) {
  return (
    <Box>
      <Box>
        <Grid container mt={2} spacing={1}>
          {/* Content Left */}
          <Grid item lg={9} md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <Box>
                  <Skeleton variant="rectangular" width={355} height={191} />
                </Box>
                <Stack direction="row" gap={1} mt={2}>
                  <Skeleton variant="rectangular" width={84} height={47} />
                  <Skeleton variant="rectangular" width={84} height={47} />
                  <Skeleton variant="rectangular" width={84} height={47} />
                  <Skeleton variant="rectangular" width={84} height={47} />
                </Stack>
              </Grid>

              <Grid item lg={7} md={7} sm={7} xs={12}>
                <Box borderBottom="1px solid #dedede" pb={1}>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </Box>

                <Box mt={3} borderBottom="1px solid #dedede" pb={3}>
                  <Skeleton animation="wave" sx={{ mt: 3 }} width="30%" />

                  <Skeleton animation="wave" sx={{ mt: 3 }} />

                  <Skeleton animation="wave" sx={{ mt: 1 }} />
                </Box>

                <Box mt={3} borderBottom="1px solid #dedede" pb={3}>
                  <Skeleton animation="wave" sx={{ mt: 3 }} width="65%" />

                  <Stack direction="row" mt={3} gap={3}>
                    <Skeleton animation="wave" sx={{ p: 2 }} width="20%" />
                    <Skeleton animation="wave" sx={{ p: 2 }} width="20%" />
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={3} display={{ lg: 'block', md: 'none', sm: 'none', xs: 'none' }}>
            <Box>
              <Skeleton animation="wave" />

              <Skeleton animation="wave" sx={{ mt: 2 }} />

              <Skeleton animation="wave" sx={{ mt: 2 }} />

              <Skeleton animation="wave" sx={{ mt: 2 }} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt={3}>
        <Card>
          <CardHeader title="Detail Products" sx={{ pb: 3 }} />

          <Divider />

          <CardContent>
            {[...Array(6)].map((t, i) => (
              <Skeleton animation="wave" sx={{ mt: 2 }} key={i} />
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
