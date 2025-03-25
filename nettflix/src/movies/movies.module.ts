import { Module } from '@nestjs/common';
import { MoviesController } from 'src/movies/controllers/movies.controller';
import { MoviesService } from 'src/movies/services/movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
