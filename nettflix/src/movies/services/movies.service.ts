import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { MovieListDto } from 'src/movies/dtos/movie-list.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { Movie } from 'src/movies/models/movie.model';
import { ModerationService } from 'src/movies/services/moderation.service';
import { SynopsisService } from 'src/movies/services/synopsis.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from 'src/movies/dtos/create-review.dto';
import { Review } from 'src/movies/models/review.model';

@Injectable()
export class MoviesService {
  constructor(
    private readonly synopsisService: SynopsisService,
    private readonly moderationService: ModerationService,
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async filter(isSaga: boolean | undefined): Promise<MovieListDto[]> {
    if (isSaga === undefined) {
      return this.moviesRepository
        .find()
        .then((movies) =>
          movies.map((movie) => MovieListDto.fromEntity(movie)),
        );
    }

    return this.moviesRepository
      .find({ where: { isSaga: isSaga } })
      .then((movies) => movies.map((movie) => MovieListDto.fromEntity(movie)));
  }

  async get(id: string): Promise<Movie> {
    return this.moviesRepository.findOneOrFail({
      where: { id: id },
      relations: ['reviews'],
    });
  }

  async delete(id: string): Promise<Movie> {
    const movie = await this.get(id);

    await this.moviesRepository.delete({ id: id });

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create({
      ...dto,
      synopsis: await this.synopsisService.createSynopsis(dto),
    });

    await this.moviesRepository.save(movie);

    return movie;
  }

  async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.get(id);
    const updateMovie = { ...movie, ...dto };

    await this.moviesRepository.save(updateMovie);

    return updateMovie;
  }

  async reviewMovie(
    id: string,
    dto: CreateReviewDto,
    userId: string,
  ): Promise<Review> {
    const movie = await this.get(id);

    const isAcceptable = await this.moderationService.isAcceptable(dto.text);

    if (!isAcceptable) {
      throw new NotAcceptableException(
        'Your review violates our content policy',
      );
    }

    const review = this.reviewsRepository.create({
      text: dto.text,
      score: dto.score,
      movie: {
        id: movie.id,
      },
      author: {
        id: userId,
      },
    });

    await this.reviewsRepository.save(review);

    return review;
  }

  async deleteReview(
    movieId: string,
    reviewId: string,
    userId: string,
  ): Promise<Review> {
    await this.get(movieId);

    const reviewToDelte = await this.reviewsRepository.findOneOrFail({
      where: { id: reviewId },
      relations: ['author'],
    });

    if (reviewToDelte.author.id !== userId) {
      throw new BadRequestException('You can only delete your own reviews');
    }

    await this.reviewsRepository.delete({ id: reviewId });

    return reviewToDelte;
  }
}
