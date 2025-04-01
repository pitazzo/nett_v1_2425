import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { MovieListDto } from 'src/movies/dtos/movie-list.dto';
import { UpdateMovieDto } from 'src/movies/dtos/update-movie.dto';
import { Movie } from 'src/movies/models/movie.model';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MoviesService {
  db: Movie[] = [
    {
      id: '2aa1cc7c-ae73-4a21-b354-f19b243a7e5b',
      title: 'La naranaja mecánica',
      year: 1972,
      duration: 120,
      director: 'Kubrick',
      isSaga: false,
      reviews: [],
    },
    {
      id: '58e816d4-4969-4276-866e-a0832af9a5fc',
      title: 'El Apartamento',
      year: 1964,
      duration: 90,
      director: 'Billy Wilder',
      isSaga: false,
      reviews: [
        {
          text: 'la mejor película de la historia! 🚀',
          score: 10,
        },
      ],
    },
    {
      id: '13577b18-bdce-4127-a951-4a4215334404',
      title: 'Harry Potter I',
      year: 2002,
      duration: 100,
      director: 'Chris Columbus',
      isSaga: true,
      reviews: [],
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

  create(dto: CreateMovieDto): Movie {
    const movie = { id: uuidv4(), ...dto, reviews: [] };
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
}
