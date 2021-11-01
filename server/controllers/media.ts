import { Request, Response } from 'express';
import multer from 'multer';

import { upload } from '../services/media-hosting';
import { HttpStatusCode } from '../shared/http-status';

const mediaUpload = upload.single('media');

export const uploadController = (request: Request, response: Response): void => {
  mediaUpload(request, response, (error) => {
    if (error instanceof multer.MulterError) {
      return response
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: 'cloudinary error', error });
    }
    if (error) {
      return response
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ msg: 'some error', error: error as unknown });
    }
    if (request.file && request.file.path) {
      return response.status(HttpStatusCode.OK).send(request.file.path);
    }
    return response
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: 'unknown error, uploaded file not found' });
  });
};
