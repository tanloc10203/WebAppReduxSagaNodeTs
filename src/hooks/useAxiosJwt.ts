import { Dispatch } from '@reduxjs/toolkit';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { authApi, axiosJwt } from '../api';
import { authActions } from '../features/auth/authSlice';

export function useAxiosJwt(dispatch: Dispatch) {
  useEffect(() => {
    const requestIntercept = axiosJwt.interceptors.request.use(
      (config: AxiosRequestConfig) => config,
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosJwt.interceptors.response.use(
      (response) => response,
      async function (error: AxiosError) {
        const prevRequest = error.config;

        // @ts-ignore
        if (error.response?.status === 403 && !prevRequest?.sent) {
          // @ts-ignore
          prevRequest.sent = true;

          const response = await authApi.refresh();
          dispatch(authActions.loginSucceed(response));

          // @ts-ignore
          prevRequest.headers['Authorization'] = response.accessToken;

          localStorage.setItem('accessToken', response.accessToken as string);

          return axiosJwt(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosJwt.interceptors.request.eject(requestIntercept);
      axiosJwt.interceptors.response.eject(responseIntercept);
    };
  }, [dispatch]);

  return axiosJwt;
}
