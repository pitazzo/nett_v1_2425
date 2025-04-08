import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateReviewDto } from 'src/movies/dtos/create-review.dto';
import { MoviesService } from 'src/movies/services/movies.service';

@Controller()
export class ReviewsController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('movies/:id/review')
  review(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateReviewDto) {
    return this.moviesService.reviewMovie(id, dto);
  }
}
