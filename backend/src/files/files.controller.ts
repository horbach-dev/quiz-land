import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { unlinkSync } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { storageConfig } from './files.config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', storageConfig))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: 'poster' | 'question' | 'answer',
  ) {
    if (!file) {
      throw new BadRequestException('Файл не передан');
    }

    if (!type) {
      throw new BadRequestException('Тип не передан');
    }

    try {
      this.filesService.validateFileByType(file, type);
    } catch (error) {
      unlinkSync(file.path);
      throw error;
    }

    return {
      tempPath: `/uploads/temp/${file.filename}`,
      fileName: file.filename,
      type: type,
    };
  }

  @Post('delete')
  deleteFile(@Body() data: { fileName: string }) {
    if (!data.fileName) throw new BadRequestException('file не передан');
    this.filesService.deleteFile(data.fileName);
    return {
      message: `Файл ${data.fileName} успешно удален`,
    };
  }
}
