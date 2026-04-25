import Anthropic from '@anthropic-ai/sdk';

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

let anthropicClient: Anthropic | null = null;

if (ANTHROPIC_API_KEY) {
  anthropicClient = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true, // For client-side usage
  });
}

export function isLLMAvailable(): boolean {
  return anthropicClient !== null;
}

export interface StreamCallbacks {
  onToken?: (token: string) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: Error) => void;
}

export async function streamCompletion(
  systemPrompt: string,
  userPrompt: string,
  callbacks?: StreamCallbacks
): Promise<string> {
  if (!anthropicClient) {
    throw new Error('LLM not available - running in mock mode');
  }

  try {
    const stream = await anthropicClient.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      temperature: 0.7,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
      stream: true,
    });

    let fullText = '';

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        const token = event.delta.text;
        fullText += token;
        callbacks?.onToken?.(token);
      }
    }

    callbacks?.onComplete?.(fullText);
    return fullText;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    callbacks?.onError?.(err);
    throw err;
  }
}

export async function generateCompletion(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  if (!anthropicClient) {
    throw new Error('LLM not available - running in mock mode');
  }

  const response = await anthropicClient.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    temperature: 0.7,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const content = response.content[0];
  if (content.type === 'text') {
    return content.text;
  }

  throw new Error('Unexpected response format from LLM');
}
