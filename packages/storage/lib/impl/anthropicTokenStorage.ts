import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type AnthropicToken = string;

type AnthropicTokenStorage = BaseStorage<AnthropicToken> & {
  clear: () => Promise<void>;
};

const storage = createStorage<AnthropicToken>('anthropic-token-key', '', {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// You can extend it with your own methods
export const anthropicTokenStorage: AnthropicTokenStorage = {
  ...storage,
  clear: async () => {
    await storage.set('');
  },
};
