import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { MovieListDto } from 'src/movies/dtos/movie-list.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { Movie } from 'src/movies/models/movie.model';
import { ModerationService } from 'src/movies/services/moderation.service';
import { SynopsisService } from 'src/movies/services/synopsis.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    private readonly synopsisService: SynopsisService,
    private readonly moderationService: ModerationService,
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
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
    return this.moviesRepository.findOneOrFail({ where: { id: id } });
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

  // async reviewMovie(id: string, dto: CreateReviewDto): Promise<Review> {
  //   const movie = this.get(id);

  //   const isAcceptable = await this.moderationService.isAcceptable(dto.text);

  //   if (!isAcceptable) {
  //     throw new NotAcceptableException(
  //       'Your review violates our content policy',
  //     );
  //   }

  //   const review = { id: uuidv4(), ...dto };
  //   movie.reviews.push(review);

  //   return review;
  // }

  // deleteReview(movieId: string, reviewId: string) {
  //   const movie = this.get(movieId);
  //   const reviewToDelte = movie.reviews.find(
  //     (review) => review.id === reviewId,
  //   );

  //   if (!reviewToDelte) {
  //     throw new NotFoundException(
  //       `Can not find review ${reviewId} of movie ${movieId}`,
  //     );
  //   }

  //   movie.reviews = movie.reviews.filter((review) => review.id !== reviewId);

  //   return reviewToDelte;
  // }
}
