import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { MoviesService } from 'src/movies/services/movies.service';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @IsPublic()
  @Get('movies')
  getAllMovies(
    @Query('isSaga', new ParseBoolPipe({ optional: true })) isSaga: boolean,
  ) {
    return this.moviesService.filter(isSaga);
  }

  @IsPublic()
  @Get('movies/:id')
  getMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.get(id);
  }

  @IsPublic()
  @Post('movies')
  createMovie(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @IsPublic()
  @Delete('movies/:id')
  deleteMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.delete(id);
  }

  @IsPublic()
  @Patch('movies/:id')
  updateMovie(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, dto);
  }
}
