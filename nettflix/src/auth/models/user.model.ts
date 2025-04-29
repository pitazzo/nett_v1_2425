import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
