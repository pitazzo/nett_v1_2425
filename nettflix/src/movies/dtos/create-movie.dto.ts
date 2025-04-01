import {
  IsBoolean,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @Length(3, 30)
  readonly title: string;

  @IsNumber()
  @Min(1850)
  @Max(new Date().getFullYear())
  readonly year: number;

  @Min(1)
  @IsNumber()
  readonly duration: number;

  @IsString()
  @Length(3, 30)
  readonly director: string;

  @IsBoolean()
  readonly isSaga: boolean;
}
