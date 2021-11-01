import { Request, Response } from 'express';

import { getAdmin, LoginProps } from '../models/user';
import { createAccessToken } from '../services/auth';
import { HttpStatusCode } from '../shared/http-status';
import { getErrorMsg } from '../utils/error';

export async function login(request: Request, response: Response): Promise<Response> {
  try {
    const admin = await getAdmin();
    if (!admin.verify(request.body as LoginProps)) {
      return response.status(HttpStatusCode.UNAUTHORIZED).send('Login failed!');
    }
    return response.status(HttpStatusCode.OK).send(createAccessToken(admin));
  } catch (error) {
    return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(getErrorMsg(error));
  }
}

export function tokenVerified(request: Request, response: Response): void {
  response.sendStatus(HttpStatusCode.OK);
}
