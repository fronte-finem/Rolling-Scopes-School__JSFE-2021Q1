import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { compareSync, hashSync } from 'bcryptjs';
import { LeanDocument } from 'mongoose';

export const ADMIN_USERNAME = 'admin';
export const CRYPT_SALT_LENGTH = 8;

export interface LoginProps {
  username: string;
  password: string;
}

export interface User {
  name: string;
  passwordHash: string;
  created?: Date;
}

export class UserClass implements User {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({ required: true })
  public passwordHash!: string;

  public verify({ username, password }: LoginProps): boolean {
    return username === this.name && compareSync(password, this.passwordHash);
  }
}

export const UserModel = getModelForClass(UserClass);

export type UserDoc = DocumentType<UserClass>;
export type UserLeanDoc = LeanDocument<UserDoc>;
export type UserType = User | UserClass | UserDoc | UserLeanDoc;

const initAdmin = async (): Promise<UserDoc> => {
  const admin = await UserModel.create({
    name: ADMIN_USERNAME,
    passwordHash: hashSync(ADMIN_USERNAME, CRYPT_SALT_LENGTH),
    created: new Date(),
  });
  return admin.save();
};

export const getAdmin = async (): Promise<UserDoc> => {
  const admin = await UserModel.findOne({ name: ADMIN_USERNAME });
  return admin || initAdmin();
};
