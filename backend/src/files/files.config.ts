import { diskStorage } from 'multer';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { v4 as uuid } from 'uuid';
import { extname, join } from 'path';
import { existsSync, unlinkSync } from 'fs';

const destination = 'uploads/temp';

export const storageConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: `./${destination}`,
    filename: (req, file, cb) => {
      const uniqueId = uuid();
      const extension = extname(file.originalname);
      const fileName = `${uniqueId}${extension}`;
      cb(null, fileName);

      req.on('error', () => {
        try {
          const filePath = join(process.cwd(), `${destination}/${fileName}`);
          if (existsSync(filePath)) unlinkSync(filePath);
        } catch (_) {
          console.error(
            'Ошибка при попытке удалить файл при отмене загрузки на клиенте',
          );
        }
      });
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
};
