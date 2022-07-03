import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import jwtDecode from 'jwt-decode';
import {
  InterfaceVerifyChangePw,
  JWTPayload,
  ListResponsesLogin,
  ListResponsesRegister,
  LoginFormState,
  Member,
  PayloadFetchMember,
} from 'models';
import { decodeJti } from 'utils';
import { InitialValuesForgetPw } from './components';

export interface InterfaceInitialState {
  isFetching: boolean;
  error: string;
}

export interface LoginState {
  isFetching: boolean;
  error?: string;
  accessToken: string;
  user: Member | null;
}

export interface AuthState {
  register: InterfaceInitialState;
  forgotPw: InterfaceInitialState;
  login: LoginState;
  verifyChangePw: InterfaceInitialState;
}

const initialState: AuthState = {
  register: {
    error: '',
    isFetching: false,
  },
  login: {
    isFetching: false,
    error: '',
    user: null,
    accessToken: '' || (localStorage.getItem('accessToken') as string),
  },
  forgotPw: {
    isFetching: false,
    error: '',
  },
  verifyChangePw: {
    isFetching: false,
    error: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    // * Register
    registerStart(state, action: PayloadAction<Member>) {
      state.register.isFetching = true;
      state.register.error = '';
    },
    registerSucceed(state, action: PayloadAction<ListResponsesRegister>) {
      state.register.isFetching = false;
      if (action.payload.error) state.register.error = action.payload.message;
    },
    registerFailed(state, action: PayloadAction<string>) {
      state.register.isFetching = false;
      state.register.error = action.payload;
    },

    // * Login
    loginStart(state, action: PayloadAction<LoginFormState>) {
      state.login.isFetching = true;
      state.login.error = '';
    },
    loginSucceed(state, action: PayloadAction<ListResponsesLogin>) {
      state.login.isFetching = false;
      if (!action.payload.error) state.login.accessToken = action.payload.accessToken as string;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.login.isFetching = false;
      state.login.error = action.payload;
    },

    // * Logout
    logout(state, payload: PayloadAction<PayloadFetchMember>) {
      state.login.accessToken = '';
      state.login.user = null;
    },

    // * For got Password
    forgotPwStart(state, action: PayloadAction<InitialValuesForgetPw>) {
      state.forgotPw.isFetching = true;
      state.forgotPw.error = '';
    },
    forgotPwSucceed(state, action: PayloadAction<ListResponsesRegister>) {
      state.forgotPw.isFetching = false;
      if (action.payload.error) state.forgotPw.error = action.payload.message;
    },
    forgotPwFailed(state, action: PayloadAction<string>) {
      state.forgotPw.isFetching = false;
      state.forgotPw.error = action.payload;
    },

    // * Verify And Password New Change
    verifyChangePwStart(state, action: PayloadAction<InterfaceVerifyChangePw>) {
      state.verifyChangePw.isFetching = true;
      state.verifyChangePw.error = '';
    },
    verifyChangePwSucceed(state, action: PayloadAction<ListResponsesRegister>) {
      state.verifyChangePw.isFetching = false;
      if (action.payload.error) state.verifyChangePw.error = action.payload.message;
    },
    verifyChangePwFailed(state, action: PayloadAction<string>) {
      state.verifyChangePw.isFetching = false;
      state.verifyChangePw.error = action.payload;
    },

    // * Set user login
    setUserLogin(state, action: PayloadAction<string>) {
      if (action.payload) {
        try {
          const decode = jwtDecode<JWTPayload>(action.payload);

          if (decode) {
            const secure: string = decode.key?.split(' ')[1] as string;

            const member = JSON.parse(decodeJti(decode.jti as string, secure));

            if (member) {
              state.login.user = member;
            } else state.login.user = null;
          } else {
            state.login.user = null;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const registerSelectors = (state: RootState) => state.auth.register;
export const loginSelectors = (state: RootState) => state.auth.login;
export const forgotPwSelectors = (state: RootState) => state.auth.forgotPw;
export const verifyChangePwSelectors = (state: RootState) => state.auth.verifyChangePw;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
