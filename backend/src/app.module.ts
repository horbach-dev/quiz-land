import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QuizModule } from './quiz/quiz.module';
import { FilesModule } from './files/files.module';
import { QuizSessionModule } from './quiz-session/quiz-session.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 600,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    AuthModule,
    UserModule,
    QuizModule,
    FilesModule,
    QuizSessionModule,
  ],
})
export class AppModule {}
