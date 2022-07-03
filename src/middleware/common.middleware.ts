import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { decode, decodeJti, Payload } from '../utils';
import { MemberAttribute } from './../models/member.model';

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY as string;
// const REFRESH_TOKEN_PRIVATE_KEY = process.env.REFRESH_TOKEN_PRIVATE_KEY as string;

export function requireDataInput(req: Request, res: Response, next: NextFunction) {
  if (_.isEmpty(req.body)) {
    return res.status(404).json({ message: "Is't has data input" });
  }

  return next();
}

export async function authorization(req: Request, res: Response, next: NextFunction) {
  let accessToken = req.headers.authorization;

  if (!accessToken)
    return res.status(401).json({ error: true, message: "You're not authenticated" });

  accessToken = accessToken?.split(' ')[1];

  try {
    const response = await decode(accessToken as string, ACCESS_TOKEN_PRIVATE_KEY);
    const payload = response.payload as Payload;

    if (!response || !payload.jti)
      return res.status(403).json({ error: true, message: 'Token is not valid!' });

    const hashJti: MemberAttribute = JSON.parse(decodeJti(payload.jti));

    // @ts-ignore
    req.member = hashJti;

    next();
  } catch (error) {
    res.status(403).json({ error: true, message: 'Token is not valid!' });
  }
}

export function verifyTokenAndAdmin(req: Request, res: Response, next: NextFunction) {
  authorization(req, res, () => {
    // @ts-ignore
    const member: MemberAttribute = req.member;
    if (member.key === 'ADMIN') next();

    return res.status(403).json({ error: true, message: "You're not allowed to do that!!!" });
  });
}
