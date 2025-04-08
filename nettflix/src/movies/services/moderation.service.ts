import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ModerationService {
  async isAcceptable(text: string): Promise<boolean> {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'user',
            content: `Eres un sistema de moderación de reseñas. No queremos reseñas que puedan ofender a nadie. Contéstame con un JSON de esta forma {"isAcceptable": true | false}. El texto de la review es ${text}`,
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

    const result = JSON.parse(response.data.choices[0].message.content);

    return result['isAcceptable'];
  }
}
