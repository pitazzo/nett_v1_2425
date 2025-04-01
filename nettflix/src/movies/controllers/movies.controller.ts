import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { MoviesService } from 'src/movies/services/movies.service';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('movies')
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @Get('movies/:id')
  getMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.getMovie(id);
  }

  @Post('movies')
  createMovie() {}

  @Delete('movies/:id')
  deleteMovie(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.deleteMovie(id);
  }
}
