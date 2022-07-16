import { styled } from '@mui/material/styles';
import { lazy, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Loader } from 'routes';
import { DashboardNavbar, DashboardSidebar } from './components';
import Category from './page/Category';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const DashboardApp = Loader(lazy(() => import('./page/DashboardApp')));

const Product = Loader(lazy(() => import('./page/Product')));

const User = Loader(lazy(() => import('./page/User')));

const Blog = Loader(lazy(() => import('./page/Blog')));

export default function DashboardLayout() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle>
        <Routes>
          <Route element={<DashboardApp />} path="app" />
          <Route element={<User />} path="user" />
          <Route element={<Product />} path="products/*" />
          <Route element={<Blog />} path="blog" />
          <Route element={<Category />} path="category/*" />
        </Routes>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
