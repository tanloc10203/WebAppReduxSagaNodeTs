import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { AxiosError } from 'axios';
import { memberActions } from 'features/Members/memberSlice';
import {
  InterfaceVerifyChangePw,
  ListResponsesLogin,
  ListResponsesRegister,
  LoginFormState,
  Member,
  PayloadFetchMember,
} from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { history } from 'utils';
import { authActions } from './authSlice';
import { InitialValuesForgetPw } from './components';

function* fetchRegister(action: PayloadAction<Member>) {
  try {
    const response: ListResponsesRegister = yield call(authApi.register, action.payload);
    yield put(authActions.registerSucceed(response));
    if (!response.error) yield history.push('/login');
  } catch (error) {
    if (error instanceof Error) yield put(authActions.registerFailed(error.message));
  }
}

function* fetchLogin(action: PayloadAction<LoginFormState>) {
  try {
    const response: ListResponsesLogin = yield call(authApi.login, action.payload);
    yield put(authActions.loginSucceed(response));
    if (!response.error) {
      localStorage.setItem('accessToken', response.accessToken as string);
      // yield history.push('/');
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status) yield put(authActions.loginFailed(error.response.data?.message));
      yield put(authActions.loginFailed(error.message));
    } else if (error instanceof Error) {
      yield put(authActions.loginFailed(error.message));
    }
  }
}

function* fetchLogout(action: PayloadAction<PayloadFetchMember>) {
  try {
    localStorage.removeItem('accessToken');
    yield call(authApi.logout, action.payload);
    yield put(memberActions.fetchMemberFailed('login succeed'));
    yield history.push('/login');
  } catch (error) {
    console.log(error);
  }
}

function* fetchForgotPw(action: PayloadAction<InitialValuesForgetPw>) {
  try {
    const response: ListResponsesRegister = yield call(authApi.forgotPw, action.payload);
    yield put(authActions.forgotPwSucceed(response));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(authActions.forgotPwFailed(error.response.data?.message));
    } else if (error instanceof Error) {
      yield put(authActions.forgotPwFailed(error.message));
    }
  }
}

function* fetchVerifyChangePw(action: PayloadAction<InterfaceVerifyChangePw>) {
  try {
    const response: ListResponsesRegister = yield call(authApi.verifyChangePw, action.payload);
    yield put(authActions.verifyChangePwSucceed(response));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status)
        yield put(authActions.verifyChangePwFailed(error.response.data?.message));
    } else if (error instanceof Error) {
      yield put(authActions.verifyChangePwFailed(error.message));
    }
  }
}

function* watchLoginFlow() {
  yield takeLatest(authActions.loginStart.type, fetchLogin);
}

function* watchLogoutFlow() {
  yield takeLatest(authActions.logout.type, fetchLogout);
}

function* watchRegisterFlow() {
  yield takeLatest(authActions.registerStart.type, fetchRegister);
}

function* watchForgotPwFlow() {
  yield takeLatest(authActions.forgotPwStart.type, fetchForgotPw);
}

function* watchVerifyChangePwFlow() {
  yield takeLatest(authActions.verifyChangePwStart.type, fetchVerifyChangePw);
}

export default function* authSaga() {
  yield all([
    watchLoginFlow(),
    watchLogoutFlow(),
    watchRegisterFlow(),
    watchForgotPwFlow(),
    watchVerifyChangePwFlow(),
  ]);
}
