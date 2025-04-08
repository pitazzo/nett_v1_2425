import { Injectable } from '@nestjs/common';
import { AIService } from 'src/movies/services/ai.service';

@Injectable()
export class ModerationService {
  constructor(private readonly aiService: AIService) {}

  async isAcceptable(text: string): Promise<boolean> {
    const response = await this.aiService.ask(
      `Eres un sistema de moderación de reseñas. No queremos reseñas que puedan ofender a nadie. Contéstame con un JSON de esta forma {"isAcceptable": true | false}. El texto de la review es ${text}`,
    );

    const result = JSON.parse(response);

    return result['isAcceptable'];
  }
}
