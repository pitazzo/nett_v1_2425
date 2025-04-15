import { Movie } from 'src/movies/models/movie.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public text: string;

  @Column()
  public score: number;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  public movie: Movie;
}
