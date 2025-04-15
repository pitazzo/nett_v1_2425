// import { Review } from 'src/movies/models/review.model';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  public title: string;

  @Column()
  public year: number;

  @Column()
  public duration: number;

  @Column()
  public director: string;

  @Column()
  public isSaga: boolean;

  // public reviews: Review[];

  @Column()
  public synopsis: string;
}
