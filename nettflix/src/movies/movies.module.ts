import { Module } from '@nestjs/common';
import { MoviesController } from 'src/movies/controllers/movies.controller';

@Module({
  controllers: [MoviesController],
})
export class MoviesModule {}
