import { Request, Response } from 'express';
import multer from 'multer';

import { upload } from '../services/media-hosting';

const mediaUpload = upload.single('media');

export const uploadController = (request: Request, response: Response): void => {
  mediaUpload(request, response, (error) => {
    if (error instanceof multer.MulterError) {
      return response.status(500).json({ msg: 'cloudinary error', error });
    }
    if (error) {
      return response.status(500).json({ msg: 'some error', error: error as unknown });
    }
    if (request.file && request.file.path) {
      return response.status(200).send(request.file.path);
    }
    return response.status(500).json({ msg: 'unknown error, uploaded file not found' });
  });
};
