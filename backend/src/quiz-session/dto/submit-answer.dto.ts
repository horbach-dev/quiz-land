import {IsOptional, IsString, IsArray, IsInt} from 'class-validator';

export class SubmitAnswerDto {
  @IsString()
  sessionId: string;

  @IsString()
  questionId: string;

  @IsArray()
  submittedOptionIds: [];

  @IsInt()
  timeSpentSeconds: number;

  @IsString()
  @IsOptional()
  submittedAnswerText?: string | null;
}
