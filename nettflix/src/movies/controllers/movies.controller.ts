import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { MoviesService } from 'src/movies/services/movies.service';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('movies')
  getAllMovies() {
    return this.moviesService.getAll();
  }

  @Get('movies/:id')
  getMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.get(id);
  }

  @Post('movies')
  createMovie(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @Delete('movies/:id')
  deleteMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.delete(id);
  }

  @Patch('movies/:id')
  updateMovie(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, dto);
  }
}
