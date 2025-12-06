import {
  IsBoolean,
  IsString,
  IsArray,
  IsInt,
  IsEnum,
  IsOptional,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType, ScoringAlgorithm } from '@prisma/client';

// ----------------------------------------------------
// DTO для Вариантов ответа (Option)
// ----------------------------------------------------
export class CreateQuestionOptionDto {
  @IsString()
  @MinLength(1)
  text: string;

  @IsString()
  @IsOptional()
  image?: string | null;

  @IsBoolean()
  isCorrect: boolean;
}

// ----------------------------------------------------
// DTO для Вопроса (Question)
// ----------------------------------------------------
export class CreateQuestionDto {
  @IsString()
  @MinLength(1)
  text: string;

  @IsString()
  @IsOptional()
  image?: string | null;

  @IsInt()
  order: number;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOptionDto)
  options?: CreateQuestionOptionDto[];
}

// ----------------------------------------------------
// DTO для Квиза (Quiz) - Основной DTO
// ----------------------------------------------------
export class CreateQuizDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  poster: string;

  @IsBoolean()
  limitedByTime: boolean;

  // @IsInt() // Добавил бы это, если бы вы присылали durationMinutes здесь
  // durationMinutes?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto) // Указываем класс для вложенных вопросов
  questions: CreateQuestionDto[];

  @IsString()
  scoringAlgorithm?: ScoringAlgorithm;
}
