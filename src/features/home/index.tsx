import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import { categoryActions } from 'features/category/categorySlice';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductCartWidget } from 'sections/@dashboard/products';
import { BottomAppBar, Header } from './components';
import { BackToTop } from './components/ScrollTop';
import { CategoryPage, HomePageMain } from './page';

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
        <span id="back-to-top-anchor" />

        <ProductCartWidget />

        <Routes>
          <Route element={<HomePageMain />} index />
          <Route element={<CategoryPage />} path="category/:slug" />
        </Routes>

        <BackToTop />

        <BottomAppBar />
      </MainStyle>
    </RootStyle>
  );
}
