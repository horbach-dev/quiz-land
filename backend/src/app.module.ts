import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'), // Путь к вашей папке 'upload'
      serveRoot: '/upload', // URL-префикс, по которому файлы будут доступны
    }),
    AuthModule,
    UserModule,
    QuizModule,
  ],
})
export class AppModule {}
