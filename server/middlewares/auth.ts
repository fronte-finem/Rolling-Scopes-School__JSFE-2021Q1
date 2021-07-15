import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { accessTokens } from '../stores/auth';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'not secret';

export function verifyToken(request: Request, response: Response, next: NextFunction): void {
  const token = request.headers['x-access-token'];

  if (!token || typeof token !== 'string') {
    response.status(403).json({ msg: 'No token provided!' });
    return;
  }

  if (!accessTokens.has(token)) {
    response.status(401).json({ msg: 'Unknown token!' });
    return;
  }

  verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      accessTokens.delete(token);
      response.status(401).json({ msg: 'Token expired or invalid!' });
      return;
    }
    console.log('decoded jwt:', decoded);
    next();
  });
}
