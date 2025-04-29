import { Review } from 'src/movies/models/review.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public passwordHash: string;

  @OneToMany(() => Review, (review) => review.author)
  reviews: Review[];
}
