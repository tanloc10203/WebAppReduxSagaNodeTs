import { Box, Button, Grid, Link, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface FooterProps {}

export default function Footer(props: FooterProps) {
  const routeQuickLinks = [
    {
      path: '#',
      name: 'Policy',
    },
    {
      path: '#',
      name: 'About us',
    },
    {
      path: '#',
      name: 'Shipping',
    },
    {
      path: '#',
      name: 'Return',
    },
    {
      path: '#',
      name: 'FAQs',
    },
  ];

  return (
    <Box mt={10}>
      <Grid container spacing={2}>
        <Grid item xl={8} md={8} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item xl={6} md={6} sm={6} xs={12} color="#666666">
              <Typography
                variant="h6"
                color="#000000"
                borderBottom="1px solid #dedede"
                display="inline-block"
              >
                Contact us
              </Typography>
              <Box mt={2}>
                <Typography variant="body1">Call us 24/7</Typography>
                <Typography variant="h4" color="#2065D1" my={2} letterSpacing={1}>
                  0009 999 888
                </Typography>
                <Typography fontSize="15px" letterSpacing={1} mb={1}>
                  204 CTU University
                </Typography>
                <Typography fontSize="15px" letterSpacing={1}>
                  ginga550504@gmail.com
                </Typography>
              </Box>
            </Grid>

            <Grid item xl={6} md={6} sm={6} xs={12}>
              <Typography variant="h6" borderBottom="1px solid #dedede" display="inline-block">
                Quick links
              </Typography>
              <Stack mt={2}>
                {routeQuickLinks.map((item, i) => (
                  <Link
                    color="#666666"
                    key={i}
                    component={RouterLink}
                    to={item.path}
                    mb={1}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Typography>{item.name}</Typography>
                  </Link>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xl={4} md={4} sm={12} xs={12}>
          <Typography variant="h6" borderBottom="1px solid #dedede" display="inline-block">
            Feedback with us
          </Typography>
          <Box mt={2}>
            <TextField
              multiline
              rows={3}
              maxRows={4}
              fullWidth
              label="Feedback"
              variant="outlined"
              size="small"
            />

            <TextField
              type="email"
              fullWidth
              label="Email"
              size="small"
              variant="outlined"
              margin="normal"
            />

            <Button fullWidth variant="contained">
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
