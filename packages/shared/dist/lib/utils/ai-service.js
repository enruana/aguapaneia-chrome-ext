"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import Anthropic from "@anthropic-ai/sdk";
import { anthropicTokenStorage } from "@extension/storage";
class AnthropicService {
  constructor() {
    this.anthropic = null;
    this.init().catch(console.error);
  }
  init() {
    return __async(this, null, function* () {
      this.anthropic = new Anthropic({
        apiKey: yield anthropicTokenStorage.get(),
        dangerouslyAllowBrowser: true
      });
    });
  }
  ask(prompt) {
    return __async(this, null, function* () {
      if (!this.anthropic) {
        throw new Error("Anthropic service not initialized");
      }
      try {
        const message = yield this.anthropic.messages.create({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        });
        const textBlock = message.content[0];
        return { text: textBlock.text };
      } catch (error) {
        console.error("Error al consultar a Claude:", error);
        throw new Error("Error al procesar la solicitud con Anthropic");
      }
    });
  }
}
class AIService {
  constructor() {
    this.anthropicService = new AnthropicService();
  }
  ask(prompt) {
    return __async(this, null, function* () {
      return this.anthropicService.ask(prompt);
    });
  }
}
export const aiService = new AIService();
//# sourceMappingURL=ai-service.js.map
