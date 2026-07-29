import { z } from 'zod';
import { createEndpoint } from 'zite-integrations-backend-sdk';

export default createEndpoint({
  description: 'Translate text between languages using MyMemory API',
  inputSchema: z.object({
    text: z.string().min(1),
    sourceLang: z.string().default('en'),
    targetLang: z.string().default('es'),
  }),
  outputSchema: z.object({
    translatedText: z.string(),
    source: z.string(),
    target: z.string(),
  }),
  execute: async ({ input }) => {
    const { text, sourceLang, targetLang } = input;

    try {
      const resp = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
      );
      const data = await resp.json();
      const translatedText = data?.responseData?.translatedText || 'Translation unavailable';
      return { translatedText, source: sourceLang, target: targetLang };
    } catch {
      return { translatedText: 'Translation service temporarily unavailable', source: sourceLang, target: targetLang };
    }
  },
});
