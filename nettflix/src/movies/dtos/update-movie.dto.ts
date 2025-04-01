import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @Length(3, 30)
  @IsOptional()
  readonly title: string;

  @IsNumber()
  @Min(1850)
  @Max(new Date().getFullYear())
  @IsOptional()
  readonly year: number;

  @Min(1)
  @IsNumber()
  @IsOptional()
  readonly duration: number;

  @IsString()
  @Length(3, 30)
  @IsOptional()
  readonly director: string;

  @IsBoolean()
  @IsOptional()
  readonly isSaga: boolean;
}
