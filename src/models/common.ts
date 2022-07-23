import { AxiosInstance } from 'axios';
import { InitialValuesVerifyEmail } from '../features/auth/components';

export interface ListResponsesRegister {
  message: string;
  error: string | boolean;
}

export interface LoginFormState {
  username: string;
  password: string;
}

export interface ListResponsesLogin {
  message: string;
  error?: string | boolean;
  accessToken?: string;
}

export interface JWTPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  alg?: string;
  key?: string;
  scope?: string;
}

export interface ListResponse<T> {
  error: boolean;
  message?: string;
  data: T[] | T;
  pagination?: PaginationParams;
}

export interface ListResponseRandom<T> extends ListResponse<T> {
  dayGet: string;
}

export interface ParamGetRandom {
  _day: null | string;

  [key: string]: any;
}

export interface PayloadFetchMember {
  accessToken: string;
  axiosJwt: AxiosInstance;
}

export interface InterfaceVerifyChangePw {
  token: string;
  data: InitialValuesVerifyEmail;
}

export interface FileResponse {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface FilterPayload {
  _limit: number;
  _page: number;
  _order?: 'ASC' | 'DESC';
  name_order?: string;
  name_query?: string;
  name_like?: string;

  [key: string]: any;
}

export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface HeadLabelState {
  id?: string;
  label?: string | null;
  alignRight?: boolean | null;
}

export interface FetchDataStateSlice<T> {
  error: string;
  isFetching: boolean;
  data: Array<T>;
  filters?: FilterPayload;
  pagination?: PaginationParams;
}
