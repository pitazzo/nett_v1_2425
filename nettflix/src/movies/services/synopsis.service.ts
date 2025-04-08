import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/create-movie.dto';

import axios from 'axios';

@Injectable()
export class SynopsisService {
  async createSynopsis(dto: CreateMovieDto): Promise<string> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: `Hazme una breve sinopsis de la película ${dto.title}`,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content;
  }
}
