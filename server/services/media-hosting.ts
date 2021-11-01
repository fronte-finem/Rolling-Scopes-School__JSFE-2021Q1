import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: (req, file) => {
    return {
      folder: 'app',
      resource_type: 'auto',
      public_id: file.originalname.replace(/\.[^.]*$/, ''),
    };
  },
});

export const upload = multer({ storage });
