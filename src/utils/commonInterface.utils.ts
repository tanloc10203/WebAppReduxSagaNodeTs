import { JwtPayload } from 'jsonwebtoken';
import { Member } from '../models/member.model';

export type DestinationCallback = (error: Error | null, destination: string) => void;

export type FileNameCallback = (error: Error | null, filename: string) => void;

export interface LoginInterface {
  username: string;
  password: string;
}

export interface Payload {
  jti: string;
  iss: string;
  aud: Array<string>;
  alg: string;
  sub: string;
  scope: string;
  iat: number;
  exp: number;
}

export interface ResponseDecodeJWT {
  valid: boolean;
  expired: boolean;
  payload: JwtPayload | undefined | string;
}

export interface PayloadEmail {
  data: Member;
  sendEmail: string;
  urlVerify: string;
}

export interface FilterPayload {
  _limit: number;
  _page: number;
  _order?: 'ASC' | 'DESC';
  name_order?: string;
  name_query: string;
  name_like?: string | number;

  [key: string]: any;
}
