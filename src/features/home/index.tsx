import { Box, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { ProductCartWidget } from 'sections/@dashboard/products';
import { BottomAppBar, Header } from './components';
import { BackToTop } from './components/ScrollTop';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    display: 'unset',
  },
  [theme.breakpoints.up('md')]: {
    display: 'unset',
  },
}));

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2, 15, 2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 2, 15, 2),
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

export default function Home() {
  return (
    <RootStyle>
      <CssBaseline />

      <Header />

      <MainStyle>
        <span id="back-to-top-anchor" />

        <ProductCartWidget />

        <Box>
          <Typography textAlign="justify">
            {[...new Array(100)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join('\n')}
          </Typography>
        </Box>

        <BackToTop />

        <BottomAppBar />
      </MainStyle>
    </RootStyle>
  );
}
