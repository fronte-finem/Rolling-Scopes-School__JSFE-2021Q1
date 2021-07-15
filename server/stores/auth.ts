import { compareSync, hashSync } from 'bcryptjs';

export const accessTokens = new Set<string>();

export interface User {
  readonly username: string;
  readonly password: string;
  readonly accessToken?: string;
}

export const admin: User = {
  username: 'admin',
  password: hashSync('admin', 8),
};

export function isAdmin({ username, password }: User): boolean {
  return admin.username === username && compareSync(password, admin.password);
}
