import { IsBoolean, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  poster: string;

  @IsBoolean()
  limitedByTime: boolean;
}
