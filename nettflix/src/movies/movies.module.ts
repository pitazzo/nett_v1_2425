import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from 'src/movies/controllers/movies.controller';
import { ReviewsController } from 'src/movies/controllers/review.controller';
import { Movie } from 'src/movies/models/movie.model';
import { Review } from 'src/movies/models/review.model';
import { AIService } from 'src/movies/services/ai.service';
import { ModerationService } from 'src/movies/services/moderation.service';
import { MoviesService } from 'src/movies/services/movies.service';
import { SynopsisService } from 'src/movies/services/synopsis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Review])],
  controllers: [MoviesController, ReviewsController],
  providers: [MoviesService, SynopsisService, ModerationService, AIService],
})
export class MoviesModule {}
