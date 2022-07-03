import {
  InterfaceVerifyChangePw,
  ListResponsesLogin,
  ListResponsesRegister,
  LoginFormState,
  Member,
  PayloadFetchMember,
} from '../models';
import { InitialValuesForgetPw } from './../features/auth/components/ForgotPwForm';
import axiosClient from './axiosClient';

export const authApi = {
  nameUrl: '/auth',

  register(data: Member): Promise<ListResponsesRegister> {
    return axiosClient.post(authApi.nameUrl + '/register', data);
  },

  login(data: LoginFormState): Promise<ListResponsesLogin> {
    return axiosClient.post(authApi.nameUrl + '/login', data, {
      withCredentials: true,
    });
  },

  refresh(): Promise<ListResponsesLogin> {
    return axiosClient.get(authApi.nameUrl + '/refresh', {
      withCredentials: true,
    });
  },

  forgotPw(data: InitialValuesForgetPw): Promise<ListResponsesRegister> {
    return axiosClient.post(authApi.nameUrl + '/forgot-password', data);
  },

  verifyChangePw({ token, data }: InterfaceVerifyChangePw): Promise<ListResponsesRegister> {
    console.log(token);
    return axiosClient.post(authApi.nameUrl + '/verify-change-password?token=' + token, data);
  },

  logout({ accessToken, axiosJwt }: PayloadFetchMember): Promise<ListResponsesRegister> {
    return axiosJwt.post(
      authApi.nameUrl + '/logout',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        withCredentials: true,
      }
    );
  },
};
