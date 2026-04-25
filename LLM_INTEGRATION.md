# Real-Time LLM Integration Guide

## Overview

Scaffold now supports real-time LLM integration using Anthropic's Claude API. The system gracefully falls back to mock data when the API key is not configured, ensuring the app works in both modes.

## Setup

### 1. Install Dependencies

```bash
npm install @anthropic-ai/sdk
```

### 2. Configure API Key

Add your Anthropic API key to `.env`:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-api03-...
```

The app will automatically detect the API key and switch from mock mode to real-time LLM mode.

## Architecture

### Service Layer

All AI services follow a consistent pattern:

1. Check if LLM is available via `isLLMAvailable()`
2. If available, call LLM with pedagogically-constrained prompts
3. Validate all LLM output through `guardrailService`
4. Fall back to mock data if LLM fails or is unavailable

### Core Services

#### `llmService.ts`
- `isLLMAvailable()`: Check if Anthropic client is configured
- `generateCompletion()`: Non-streaming LLM call
- `streamCompletion()`: Streaming LLM call with token callbacks

#### `lensService.ts`
Generates lens questions (What to Watch For, Prerequisites, Misconceptions)
- Mock mode: Returns hardcoded questions
- LLM mode: Generates 3-5 mechanism-level questions based on document

#### `explainBackService.ts`
Generates Socratic provocations for student explanations
- Mock mode: Returns hardcoded provocations
- LLM mode: Analyzes student text and generates 1-3 targeted questions

#### `questionEvaluatorService.ts`
Evaluates student-authored questions (recall vs. mechanism)
- Mock mode: Rule-based evaluation (rejects "What is..." starters)
- LLM mode: Semantic evaluation of question quality

#### `answerScorerService.ts`
Scores student answers on reasoning rigor (0-5 scale)
- Mock mode: Hash-based mock scoring
- LLM mode: Evaluates reasoning quality, never reveals correct answer

### Streaming Support

For real-time feedback, use `streamingExplainBackService.ts`:

```typescript
import { streamProvocations } from './services/streamingExplainBackService';
import { useStreamingLLM } from './hooks/useStreamingLLM';

const { streamedText, isStreaming, appendToken, completeStreaming } = useStreamingLLM();

await streamProvocations(explanation, docContext, round, {
  onToken: appendToken,
  onComplete: completeStreaming,
  onError: setError,
});
```

## Guardrails

All LLM output passes through `guardrailService.checkContent()` which blocks:

1. Forbidden phrases: "the answer is", "correct answer", "you should write"
2. Verbatim student text (>5 word substring match)
3. Any content that violates pedagogical constraints

If guardrails block LLM output, the service automatically falls back to mock data.

## System Prompts

Each service has a carefully crafted system prompt that enforces pedagogical constraints:

### Lens Questions
- Ask WHY, HOW, WHAT-IF about mechanisms
- Never provide answers or summaries
- Focus on causal relationships

### Explain Back Provocations
- NEVER provide corrections or rewrite student text
- Ask questions about gaps, vague terms, unstated mechanisms
- Make students think harder, not give them answers

### Question Evaluation
- Accept mechanism-based questions
- Reject recall questions
- NEVER rewrite questions for students

### Answer Scoring
- Score reasoning rigor (0-5), not correctness
- NEVER reveal correct answers
- Describe what student DID, not what they should do

## Testing

Run tests to verify both mock and LLM modes:

```bash
npm test -- --run
```

Tests cover:
- Mock mode fallback behavior
- Guardrail enforcement
- Service integration
- Property-based testing (fast-check)

## Mode Detection

The app displays a "Mock Mode" badge when running without LLM:

```typescript
import { isMockMode } from './services/lensService';

{isMockMode() && <span className="mock-badge">Mock Mode</span>}
```

## Performance Considerations

### Caching
Consider implementing response caching for repeated queries:
- Cache lens questions per document
- Cache question evaluations for similar patterns

### Rate Limiting
Anthropic API has rate limits. Consider:
- Debouncing user input (already implemented for Explain Back)
- Queueing requests during Battle Mode scoring

### Error Handling
All services gracefully degrade:
1. LLM call fails → log error, return mock data
2. Guardrail blocks output → return mock data
3. Network timeout → return mock data

## Cost Management

Claude API pricing (as of 2025):
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

Typical usage per session:
- Lens questions: ~500 tokens input, ~200 tokens output
- Explain Back: ~800 tokens input, ~150 tokens output
- Question eval: ~600 tokens input, ~100 tokens output
- Answer scoring: ~700 tokens input, ~150 tokens output

Estimated cost per full session: $0.01-0.03

## Future Enhancements

### Streaming UI
Implement streaming for all services to show real-time generation:
- Lens questions appear one by one
- Answer scoring shows progressive feedback

### Context Window Optimization
- Summarize document sections for longer texts
- Use embeddings for relevant passage retrieval

### Adaptive Difficulty
- Track student performance
- Adjust provocation difficulty based on history

### Multi-Model Support
- Add OpenAI GPT-4 as alternative
- Allow model selection in settings

## Troubleshooting

### "LLM not available" error
- Check `.env` has `VITE_ANTHROPIC_API_KEY`
- Verify API key is valid
- Check browser console for CORS errors

### Guardrails blocking all output
- Check system prompts are properly constraining LLM
- Review `guardrailService.ts` forbidden phrases
- Add logging to see what's being blocked

### Slow response times
- Check network latency to Anthropic API
- Consider implementing request timeouts
- Use streaming for better perceived performance

## Security Notes

⚠️ **Client-Side API Key**: The current implementation uses `dangerouslyAllowBrowser: true` to call Anthropic from the browser. For production:

1. Move LLM calls to a backend API
2. Implement rate limiting per user
3. Add authentication to prevent API key exposure
4. Use environment-specific keys (dev/staging/prod)

## References

- [Anthropic API Docs](https://docs.anthropic.com/)
- [Claude Sonnet 4 Model Card](https://www.anthropic.com/claude)
- Pedagogy constraints: See `.kiro/steering/pedagogy.md`
- Guardrail rules: See `.kiro/steering/guardrails.md`
