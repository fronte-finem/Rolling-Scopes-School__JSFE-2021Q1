import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { accessTokens, admin, isAdmin, User } from '../stores/auth';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'not secret';
const JWT_EXPIRES_IN = 86400; // 24 hours

export function login(request: Request, response: Response): Response {
  if (!isAdmin(request.body as User)) {
    return response.status(401).send('login failed');
  }

  const accessToken = sign({ username: admin.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  accessTokens.add(accessToken);

  return response.status(200).json({
    username: admin.username,
    password: '',
    accessToken,
  } as User);
}

export function logout(request: Request, response: Response): void {
  const token = request.headers['x-access-token'] as string;
  accessTokens.delete(token);
  response.status(200).send('logout success!');
}

export function tokenVerified(request: Request, response: Response): void {
  response.status(200).json({ msg: 'Token valid!' });
}
