import { Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import { ErrorFallbackAlert } from 'components/Common';
import { categoryActions } from 'features/category/categorySlice';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, Route, Routes } from 'react-router-dom';
import { ProductCartWidget } from 'sections/@dashboard/products';
import { BottomAppBar, CopyRight, Footer, Header } from './components';
import { BackToTop } from './components/ScrollTop';
import { CategoryPage, HomePageMain } from './page';
import ProductPage from './page/ProductPage';

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
  paddingBottom: theme.spacing(0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2, 10, 2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 2, 10, 2),
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(0),
  },
}));

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (() => {
      dispatch(categoryActions.fetchCategoryTreeStart());
    })();
  }, [dispatch]);

  return (
    <RootStyle>
      <CssBaseline />

      <Header />

      <MainStyle>
        <ErrorBoundary FallbackComponent={ErrorFallbackAlert}>
          <span id="back-to-top-anchor" />

          <ProductCartWidget />

          <Routes>
            <Route element={<HomePageMain />} index />
            <Route element={<CategoryPage />} path="category/:slug" />
            <Route element={<ProductPage />} path=":slug" />
          </Routes>

          <BackToTop />

          <BottomAppBar />

          <Footer />

          <Divider sx={{ mt: 10 }} component="div" variant="fullWidth" />

          <CopyRight />
        </ErrorBoundary>
      </MainStyle>
      <Outlet />
    </RootStyle>
  );
}
