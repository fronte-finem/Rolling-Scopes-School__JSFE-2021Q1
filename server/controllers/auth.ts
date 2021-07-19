import { Request, Response } from 'express';

import { getAdmin, LoginProps } from '../models/user';
import { createAccessToken } from '../services/auth';
import { getErrorMsg } from '../utils/error';

export async function login(request: Request, response: Response): Promise<Response> {
  try {
    const admin = await getAdmin();
    if (!admin.verify(request.body as LoginProps)) {
      return response.status(401).send('Login failed!');
    }
    return response.status(200).send(createAccessToken(admin));
  } catch (error) {
    return response.status(500).send(getErrorMsg(error));
  }
}

export function tokenVerified(request: Request, response: Response): void {
  response.sendStatus(200);
}
