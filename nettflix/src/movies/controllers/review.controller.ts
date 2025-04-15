import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateReviewDto } from 'src/movies/dtos/create-review.dto';
import { MoviesService } from 'src/movies/services/movies.service';

@Controller()
export class ReviewsController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('movies/:id/reviews')
  createReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateReviewDto,
  ) {
    // return this.moviesService.reviewMovie(id, dto);
  }

  @Delete('movies/:movieId/reviews/:reviewId')
  deleteReview(
    @Param('movieId', ParseUUIDPipe) movieId: string,
    @Param('reviewId', ParseUUIDPipe) reviewId: string,
  ) {
    // return this.moviesService.deleteReview(movieId, reviewId);
  }
}
