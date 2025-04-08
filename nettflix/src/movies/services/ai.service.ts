import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AIService {
  async ask(prompt: string): Promise<string> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
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
