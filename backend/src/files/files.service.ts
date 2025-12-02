import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import path from 'path';
import { existsSync, unlinkSync } from 'fs';

type TFileType = 'poster' | 'question' | 'answer';

@Injectable()
export class FilesService {
  // Логика валидации по типу
  validateFileByType(file: Express.Multer.File, type: TFileType) {
    if (!file.mimetype.match(/(image\/jpeg|image\/png|image\/gif)/)) {
      throw new BadRequestException('Разрешена загрузка только картинок');
    }

    // Проверка размера в зависимости от типа
    switch (type) {
      case 'poster':
        if (file.size > 1 * 1024 * 1024) {
          throw new BadRequestException(
            'Размер постера не должен превышать 1МБ',
          );
        }
        break;
      case 'question':
      case 'answer':
        if (file.size > 1 * 1024 * 1024) {
          // 1 MB
          throw new BadRequestException(
            'Question/Answer image size limit is 1MB.',
          );
        }
        break;
      default:
        throw new BadRequestException('Invalid file type specified.');
    }
  }

  deleteFile(fileName: string) {
    const filePath = path.join(process.cwd(), fileName);

    console.log(filePath)

    // Проверяем, существует ли файл
    if (!existsSync(filePath)) {
      throw new NotFoundException(`Файл ${fileName} не найден`);
    }

    try {
      unlinkSync(filePath);
      console.log(`Успешно удален: ${fileName}`);
    } catch (error) {
      throw new InternalServerErrorException(
        `Нельзя удалить файл: ${error.message}`,
      );
    }
  }
}
