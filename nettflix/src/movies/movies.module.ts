import { Module } from '@nestjs/common';
import { MoviesController } from 'src/movies/controllers/movies.controller';
import { ReviewsController } from 'src/movies/controllers/review.controller';
import { ModerationService } from 'src/movies/services/moderation.service';
import { MoviesService } from 'src/movies/services/movies.service';
import { SynopsisService } from 'src/movies/services/synopsis.service';

@Module({
  controllers: [MoviesController, ReviewsController],
  providers: [MoviesService, SynopsisService, ModerationService],
})
export class MoviesModule {}
