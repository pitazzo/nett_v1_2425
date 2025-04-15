import { Review } from 'src/movies/models/review.model';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Review, (review) => review.movie)
  public reviews: Review[];

  @Column()
  public synopsis: string;
}
