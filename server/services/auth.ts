import dotenv from 'dotenv';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { UserDoc } from '../models/user';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'not secret';
const JWT_EXPIRE = '1h';

export const createAccessToken = (userDoc: UserDoc): string =>
  sign({ id: userDoc.id as string, name: userDoc.name }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

export const verifyAccessToken = (token: string): string | JwtPayload =>
  verify(token, JWT_SECRET, { maxAge: JWT_EXPIRE });
