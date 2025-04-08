import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';
import { AIService } from 'src/movies/services/ai.service';

@Injectable()
export class SynopsisService {
  constructor(private readonly aiService: AIService) {}

  async createSynopsis(dto: CreateMovieDto): Promise<string> {
    const response = await this.aiService.ask(
      `Hazme una breve sinopsis de la película ${dto.title}`,
    );

    return response;
  }
}
