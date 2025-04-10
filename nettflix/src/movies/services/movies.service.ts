import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { CreateReviewDto } from 'src/movies/dtos/create-review.dto';
import { MovieListDto } from 'src/movies/dtos/movie-list.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { Movie } from 'src/movies/models/movie.model';
import { Review } from 'src/movies/models/review.model';
import { ModerationService } from 'src/movies/services/moderation.service';
import { SynopsisService } from 'src/movies/services/synopsis.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MoviesService {
  constructor(
    private readonly synopsisService: SynopsisService,
    private readonly moderationService: ModerationService,
  ) {}

  db: Movie[] = [
    {
      id: '2aa1cc7c-ae73-4a21-b354-f19b243a7e5b',
      title: 'La naranaja mecánica',
      year: 1972,
      duration: 120,
      director: 'Kubrick',
      isSaga: false,
      reviews: [],
      synopsis: 'Bla bla bla',
    },
    {
      id: '58e816d4-4969-4276-866e-a0832af9a5fc',
      title: 'El Apartamento',
      year: 1964,
      duration: 90,
      director: 'Billy Wilder',
      isSaga: false,
      reviews: [],
      synopsis: 'Bla bla bla',
    },
    {
      id: '13577b18-bdce-4127-a951-4a4215334404',
      title: 'Harry Potter I',
      year: 2002,
      duration: 100,
      director: 'Chris Columbus',
      isSaga: true,
      reviews: [],
      synopsis: 'Bla bla bla',
    },
  ];

  filter(isSaga: boolean | undefined): MovieListDto[] {
    if (isSaga === undefined) {
      return this.db.map((movie) => MovieListDto.fromEntity(movie));
    }

    return this.db
      .filter((movie) => movie.isSaga === isSaga)
      .map((movie) => MovieListDto.fromEntity(movie));
  }

  get(id: string): Movie {
    const movie = this.db.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} was not found in DB`);
    }

    return movie;
  }

  delete(id: string): Movie {
    const movie = this.get(id);
    this.db = this.db.filter((movie) => movie.id !== id);

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const movie = {
      id: uuidv4(),
      ...dto,
      reviews: [],
      synopsis: await this.synopsisService.createSynopsis(dto),
    };
    this.db.push(movie);
    return movie;
  }

  update(id: string, dto: UpdateMovieDto) {
    const movie = this.get(id);
    const index = this.db.findIndex((movie) => movie.id === id);
    const updateMovie = { ...movie, ...dto };

    this.db[index] = updateMovie;

    return updateMovie;
  }

  async reviewMovie(id: string, dto: CreateReviewDto): Promise<Review> {
    const movie = this.get(id);

    const isAcceptable = await this.moderationService.isAcceptable(dto.text);

    if (!isAcceptable) {
      throw new NotAcceptableException(
        'Your review violates our content policy',
      );
    }

    const review = { id: uuidv4(), ...dto };
    movie.reviews.push(review);

    return review;
  }

  deleteReview(movieId: string, reviewId: string) {
    const movie = this.get(movieId);
    const reviewToDelte = movie.reviews.find(
      (review) => review.id === reviewId,
    );

    if (!reviewToDelte) {
      throw new NotFoundException(
        `Can not find review ${reviewId} of movie ${movieId}`,
      );
    }

    movie.reviews = movie.reviews.filter((review) => review.id !== reviewId);

    return reviewToDelte;
  }
}
