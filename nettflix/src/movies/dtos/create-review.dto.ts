import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateReviewDto {
  @MinLength(3)
  @IsString()
  text: string;

  @Min(0)
  @Max(10)
  @IsInt()
  score: number;
}
