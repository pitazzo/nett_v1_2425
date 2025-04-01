import { Movie } from 'src/movies/models/movie.model';

export class MovieListDto {
  constructor(
    public readonly id: string,
    public title: string,
    public year: number,
    public duration: number,
    public director: string,
    public isSaga: boolean,
  ) {}

  static fromEntity(movie: Movie) {
    return new MovieListDto(
      movie.id,
      movie.title,
      movie.year,
      movie.duration,
      movie.director,
      movie.isSaga,
    );
  }
}
