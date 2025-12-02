import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export const storageConfig = {
  storage: diskStorage({
    destination: './uploads/temp',
    filename: (_, file, cb) => {
      const uniqueId = uuid();
      const extension = extname(file.originalname);
      cb(null, `${uniqueId}${extension}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
};
