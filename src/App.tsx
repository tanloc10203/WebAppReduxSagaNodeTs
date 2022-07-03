import { useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { PrivateRoute } from './components/Common';
import { authActions, loginSelectors } from './features/auth/authSlice';
import appRoutes from './routes';

function App() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(loginSelectors);

  useEffect(() => {
    if (Boolean(accessToken) || accessToken !== '') {
      dispatch(authActions.setUserLogin(accessToken));
    }
  }, [dispatch, accessToken]);

  const NotFound = appRoutes[404].element;

  return (
    <>
      <Routes>
        {appRoutes.private.map((route, idx) => {
          const Element = route.element;
          return (
            <Route
              key={idx}
              path={route.path}
              element={<PrivateRoute components={Element} />}
              index={route.index}
            />
          );
        })}

        {appRoutes.public.map((route, idx) => {
          const Element = route.element;
          return <Route key={idx} path={route.path} element={<Element to="/dashboard/app" />} />;
        })}

        <Route path={appRoutes[404].path} element={<NotFound to="/404" />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
