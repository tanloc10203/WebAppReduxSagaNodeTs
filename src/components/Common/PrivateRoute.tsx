import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  components: ComponentType;
}

export function PrivateRoute({ components: Children }: PrivateRouteProps) {
  const accessToken = Boolean(localStorage.getItem('accessToken'));

  if (!accessToken) return <Navigate to="/login" />;

  return <Children />;
}
