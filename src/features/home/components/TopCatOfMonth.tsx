import { Box, Grid, Typography } from '@mui/material';
import { GridItemCat } from 'sections/@home/topCatOfMonth';
import { products } from '_mock';

export interface TopCatOfMonthProps {}

export default function TopCatOfMonth(props: TopCatOfMonthProps) {
  const data = products.slice(0, 10);

  return (
    <Box mt={10}>
      <Box mb={2}>
        <Typography variant="h4" textTransform="capitalize">
          Top Categories Of The Month
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid key={item.id} item lg={2} md={3} sm={4} xs={6}>
            <GridItemCat product={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
