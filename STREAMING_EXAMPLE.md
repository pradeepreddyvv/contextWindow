# Streaming LLM Example

## Using Streaming in ExplainItBack Component

Here's how to integrate real-time streaming into the Explain It Back lens:

```tsx
import { useState } from 'react';
import { useStreamingLLM } from '../hooks/useStreamingLLM';
import { streamProvocations } from '../services/streamingExplainBackService';
import { isLLMAvailable } from '../services/llmService';

export function ExplainItBack({ 
  explainText, 
  documentContext, 
  round,
  onProvocationsGenerated 
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const streaming = useStreamingLLM();
  const canStream = isLLMAvailable();

  const handleSubmit = async () => {
    if (!explainText.trim()) return;

    setIsGenerating(true);
    
    if (canStream) {
      // Use streaming for real-time feedback
      streaming.startStreaming();
      
      try {
        const provocations = await streamProvocations(
          explainText,
          documentContext,
          round,
          {
            onToken: streaming.appendToken,
            onComplete: () => {
              streaming.completeStreaming();
              setIsGenerating(false);
            },
            onError: (error) => {
              streaming.setError(error);
              setIsGenerating(false);
            },
          }
        );
        
        onProvocationsGenerated(provocations);
      } catch (error) {
        console.error('Streaming failed:', error);
        setIsGenerating(false);
      }
    } else {
      // Fall back to non-streaming
      const { generateProvocations } = await import('../services/explainBackService');
      const provocations = await generateProvocations(explainText, documentContext, round);
      onProvocationsGenerated(provocations);
      setIsGenerating(false);
    }
  };

  return (
    <div className="explain-back">
      <textarea
        value={explainText}
        onChange={(e) => onExplainTextChange(e.target.value)}
        placeholder="Explain this section in your own words..."
        disabled={isGenerating}
      />
      
      <button onClick={handleSubmit} disabled={isGenerating || !explainText.trim()}>
        {isGenerating ? 'Generating...' : 'Submit'}
      </button>

      {/* Show streaming text in real-time */}
      {streaming.isStreaming && (
        <div className="streaming-preview">
          <p className="streaming-label">Generating provocations...</p>
          <div className="streaming-text">{streaming.streamedText}</div>
        </div>
      )}

      {/* Show error if streaming fails */}
      {streaming.error && (
        <div className="error-message">
          Failed to generate provocations. Using fallback.
        </div>
      )}

      {/* Show final provocations */}
      {!streaming.isStreaming && provocations.length > 0 && (
        <div className="provocations">
          {provocations.map((p, i) => (
            <div key={i} className="provocation-item">
              {p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Styling for Streaming UI

Add these styles to show streaming feedback:

```css
.streaming-preview {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--color-paper);
  border-left: 4px solid var(--color-rust);
  border-radius: 4px;
}

.streaming-label {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  margin-bottom: 0.5rem;
}

.streaming-text {
  font-family: var(--font-body);
  color: var(--color-ink);
  line-height: 1.6;
  white-space: pre-wrap;
  animation: fadeIn 0.2s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Typing cursor effect */
.streaming-text::after {
  content: '▋';
  animation: blink 1s step-end infinite;
  color: var(--color-rust);
}

@keyframes blink {
  50% { opacity: 0; }
}
```

## Progressive Enhancement Pattern

The streaming feature progressively enhances the experience:

1. **No API Key**: Uses mock data, instant response
2. **API Key + No Streaming**: Uses LLM, shows loading spinner
3. **API Key + Streaming**: Uses LLM, shows real-time generation

This ensures the app works at all levels while providing the best experience when possible.

## Performance Tips

### Debounce User Input

```tsx
import { useEffect, useRef } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// In component:
const debouncedExplainText = useDebounce(explainText, 500);
```

### Cancel In-Flight Requests

```tsx
const abortControllerRef = useRef<AbortController | null>(null);

const handleSubmit = async () => {
  // Cancel previous request
  abortControllerRef.current?.abort();
  abortControllerRef.current = new AbortController();

  try {
    await streamProvocations(/* ... */, {
      signal: abortControllerRef.current.signal,
      // ... callbacks
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request cancelled');
    }
  }
};
```

### Show Token Count

```tsx
const [tokenCount, setTokenCount] = useState(0);

await streamProvocations(explainText, documentContext, round, {
  onToken: (token) => {
    streaming.appendToken(token);
    setTokenCount((prev) => prev + 1);
  },
  // ...
});

// In UI:
<span className="token-count">{tokenCount} tokens generated</span>
```

## Accessibility

Ensure streaming content is accessible:

```tsx
<div 
  className="streaming-text"
  role="status"
  aria-live="polite"
  aria-atomic="false"
>
  {streaming.streamedText}
</div>
```

- `role="status"`: Indicates dynamic content
- `aria-live="polite"`: Announces updates without interrupting
- `aria-atomic="false"`: Only announces new content, not entire text

## Error Recovery

Handle network failures gracefully:

```tsx
const [retryCount, setRetryCount] = useState(0);
const MAX_RETRIES = 3;

const handleSubmitWithRetry = async () => {
  try {
    await streamProvocations(/* ... */);
    setRetryCount(0); // Reset on success
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      setRetryCount((prev) => prev + 1);
      setTimeout(() => handleSubmitWithRetry(), 1000 * retryCount);
    } else {
      // Fall back to mock mode
      const { generateProvocations } = await import('../services/explainBackService');
      const provocations = await generateProvocations(/* ... */);
      onProvocationsGenerated(provocations);
    }
  }
};
```
