import SuspenseLoader from 'components/SuspenseLoader';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

const Loader = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

const DashboardLayout = Loader(lazy(() => import('features/dashboard')));

const DashboardApp = Loader(lazy(() => import('features/dashboard/page/DashboardApp')));

const Product = Loader(lazy(() => import('features/dashboard/page/Product')));

const User = Loader(lazy(() => import('features/dashboard/page/User')));

const Blog = Loader(lazy(() => import('features/dashboard/page/Blog')));

const Login = Loader(lazy(() => import('features/auth/pages/Login')));

const Logout = Loader(lazy(() => import('features/auth/pages/Logout')));

const ForgotPassword = Loader(lazy(() => import('features/auth/pages/ForgotPassword')));

const VerifyEmail = Loader(lazy(() => import('features/auth/pages/VerifyEmail')));

const Register = Loader(lazy(() => import('features/auth/pages/Register')));

const Page404 = Loader(lazy(() => import('components/Common/Page404')));

const HomePage = Loader(lazy(() => import('features/home')));

const appRoutes = {
  private: [{ path: '/logout', element: Logout, index: true }],
  public: [
    { path: '/', element: HomePage },
    {
      path: '/dashboard/*',
      element: DashboardLayout,
      index: true,
      children: [
        { path: 'app', element: DashboardApp },
        { path: 'user', element: User },
        { path: 'products', element: Product },
        { path: 'blog', element: Blog },
      ],
    },
    { path: '/login', element: Login },
    { path: '/forgot-password', element: ForgotPassword },
    { path: '/verify-email/:token', element: VerifyEmail },
    { path: '/register', element: Register },
    { path: '/404', element: Page404 },
  ],
  404: { path: '*', element: Navigate },
};

export default appRoutes;
