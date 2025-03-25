import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

@Controller()
export class MoviesController {
  @Get('movies')
  getAllMovies() {
    console.log('soy el controller de getAllMovies');
  }

  @Get('movies/:id')
  getMovie(@Param('id', ParseUUIDPipe) id: string) {
    console.log(
      `soy el controller de getMovie y me piden la peli con ID ${id}`,
    );
  }

  @Post('movies')
  createMovie() {}

  @Delete('movies/:id')
  deleteMovie() {}
}
