import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { Router } from 'express';

import { uploadController } from '../controllers/media';
import { verifyToken } from '../middlewares/auth';

dotenv.config();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

cloudinary.v2.config(cloudinaryConfig);

export interface Data {
  image: string;
}

const mediaRouter = Router();

enum MediaRoute {
  UPLOAD = '/upload',
}

mediaRouter.post(MediaRoute.UPLOAD, [verifyToken], uploadController);

export { mediaRouter };
