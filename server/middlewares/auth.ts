import { NextFunction, Request, Response } from 'express';

import { verifyAccessToken } from '../services/auth';

export function verifyToken(request: Request, response: Response, next: NextFunction): void {
  const token = request.headers['x-access-token'];

  if (!token || typeof token !== 'string') {
    response.status(403).send('Token not provided!');
    return;
  }

  try {
    const jwtPayload = verifyAccessToken(token);
    console.log('decoded jwt:', jwtPayload);
    next();
  } catch (error) {
    response.status(401).send('Token invalid!');
  }
}
