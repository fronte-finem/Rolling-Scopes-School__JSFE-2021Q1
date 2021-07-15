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

console.log(cloudinaryConfig);
cloudinary.v2.config(cloudinaryConfig);

export interface Data {
  image: string;
}

const mediaRouter = Router();

// mediaRouter.post('/upload', [verifyToken, upload.single('media')], uploadMedia);

mediaRouter.post('/upload', [verifyToken], uploadController);

export { mediaRouter };
