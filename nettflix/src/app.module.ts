import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/movies/models/movie.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Movie],
      synchronize: true,
    }),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
