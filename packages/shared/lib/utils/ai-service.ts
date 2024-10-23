import Anthropic from '@anthropic-ai/sdk';
import { TextBlock } from '@anthropic-ai/sdk/resources';
import { anthropicTokenStorage } from '@extension/storage';

interface AIServiceResponse {
  text: string;
}

class AnthropicService {
  private anthropic: Anthropic | null = null;

  constructor() {
    this.init().catch(console.error);
  }

  async init() {
    this.anthropic = new Anthropic({
      apiKey: await anthropicTokenStorage.get(),
      dangerouslyAllowBrowser: true,
    });
  }

  async ask(prompt: string): Promise<AIServiceResponse> {
    if (!this.anthropic) {
      throw new Error('Anthropic service not initialized');
    }

    try {
      const message = await this.anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const textBlock = message.content[0] as TextBlock;
      console.log(textBlock);

      return { text: textBlock.text };
    } catch (error) {
      console.error('Error al consultar a Claude:', error);
      throw new Error('Error al procesar la solicitud con Anthropic');
    }
  }
}

class AIService {
  private anthropicService: AnthropicService;

  constructor() {
    this.anthropicService = new AnthropicService();
  }

  async ask(prompt: string): Promise<AIServiceResponse> {
    return this.anthropicService.ask(prompt);
  }
}

export const aiService = new AIService();
