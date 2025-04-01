import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from 'src/movies/models/movie.model';

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
    },
    {
      id: '58e816d4-4969-4276-866e-a0832af9a5fc',
      title: 'El Apartamento',
      year: 1964,
      duration: 90,
      director: 'Billy Wilder',
      isSaga: false,
    },
    {
      id: '13577b18-bdce-4127-a951-4a4215334404',
      title: 'Harry Potter I',
      year: 2002,
      duration: 100,
      director: 'Chris Columbus',
      isSaga: true,
    },
  ];

  getAllMovies(): Movie[] {
    return this.db;
  }

  getMovie(id: string): Movie {
    const movie = this.db.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} was not found in DB`);
    }

    return movie;
  }

  deleteMovie(id: string): Movie {
    const movie = this.getMovie(id);
    this.db = this.db.filter((movie) => movie.id !== id);

    return movie;
  }
}
