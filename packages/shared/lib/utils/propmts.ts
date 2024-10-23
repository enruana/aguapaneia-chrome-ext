const REFACTOR_TEXT_PROMPT = `
You are an AI assistant. Refactor the following text to improve readability and efficiency:
- Maintain the original language
- Provide only the refactored text without any explanations or introductions
Text to refactor:
`;

const EN_ES_PROMPT = `
Translate the following text from English to Spanish:
- Provide only the translated text without any explanations or introductions
Text to translate:
`;

const ES_EN_PROMPT = `
Translate the following text from Spanish to English:
- Provide only the translated text without any explanations or introductions
Text to translate:
`;

export {
    REFACTOR_TEXT_PROMPT,
    EN_ES_PROMPT,
    ES_EN_PROMPT,
}