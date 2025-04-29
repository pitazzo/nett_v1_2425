import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/models/movie.model';
import { Review } from 'src/movies/models/review.model';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/models/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Movie, Review, User],
      synchronize: true,
    }),
    MoviesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
