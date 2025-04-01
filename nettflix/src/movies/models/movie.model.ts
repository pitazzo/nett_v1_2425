import { Review } from 'src/movies/models/review.model';

export class Movie {
  constructor(
    public readonly id: string,
    public title: string,
    public year: number,
    public duration: number,
    public director: string,
    public isSaga: boolean,
    public reviews: Review[],
  ) {}
}
