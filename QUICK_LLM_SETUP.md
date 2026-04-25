# Quick LLM Setup Guide

## 5-Minute Setup

### 1. Get Your API Key
Visit [console.anthropic.com](https://console.anthropic.com) and create an API key.

### 2. Add to .env
```bash
echo "VITE_ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY_HERE" >> .env
```

### 3. Restart Dev Server
```bash
npm run dev
```

That's it! The app will automatically detect the API key and switch to LLM mode.

## Verify It's Working

### Check 1: Mock Mode Badge
The "Mock Mode" badge in the header should disappear when LLM is active.

### Check 2: Console Logs
Open browser DevTools → Console. You should NOT see:
```
LLM generation failed, falling back to mock
```

### Check 3: Dynamic Content
In Study Mode:
1. Switch between lens tabs
2. Questions should vary based on document content
3. In Explain It Back, type an explanation
4. Provocations should reference your specific text

## Troubleshooting

### "LLM not available" in console
- Check `.env` file exists and has `VITE_ANTHROPIC_API_KEY`
- Verify no typos in the key
- Restart dev server after adding key

### CORS errors
- The app uses `dangerouslyAllowBrowser: true` for client-side API calls
- This is fine for development/demo
- For production, move LLM calls to a backend API

### Slow responses
- First request may take 2-3 seconds (cold start)
- Subsequent requests should be faster
- Consider implementing caching for repeated queries

### API rate limits
Anthropic free tier limits:
- 50 requests per minute
- 5,000 requests per day

If you hit limits:
- App automatically falls back to mock mode
- Check console for error messages
- Wait a minute and try again

## Cost Tracking

Typical costs per session:
- Study Mode (4 lenses): ~$0.005
- Explain It Back (3 rounds): ~$0.003
- Battle Mode (3 questions): ~$0.008

Total per full session: ~$0.01-0.02

Monitor usage at [console.anthropic.com/settings/usage](https://console.anthropic.com/settings/usage)

## Development Tips

### Test Both Modes
Always test with and without API key:
```bash
# Test mock mode
mv .env .env.backup
npm run dev

# Test LLM mode
mv .env.backup .env
npm run dev
```

### Mock LLM in Tests
Tests automatically use mock mode (see `src/test/setup.ts`):
```typescript
vi.stubEnv('VITE_ANTHROPIC_API_KEY', '');
```

### Debug LLM Responses
Add logging to see raw LLM output:
```typescript
// In llmService.ts
console.log('LLM Response:', fullText);
```

### Test Guardrails
Try to make the LLM violate constraints:
- Ask it to provide answers
- Request summaries
- See if it rewrites student text

All violations should be caught and fall back to mock data.

## Production Checklist

Before deploying with LLM:

- [ ] Move API key to backend (don't expose in browser)
- [ ] Implement rate limiting per user
- [ ] Add request caching for common queries
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Add usage analytics
- [ ] Implement cost alerts
- [ ] Test fallback behavior under load
- [ ] Document API key rotation process

## Security Notes

⚠️ **Current Implementation**: API key is exposed in browser (development only)

For production:
1. Create a backend API route (e.g., `/api/generate`)
2. Store API key in server environment variables
3. Add authentication to prevent abuse
4. Implement rate limiting per user/IP
5. Log all requests for monitoring

Example backend route (Next.js):
```typescript
// pages/api/generate.ts
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // Verify user authentication
  const session = await getSession(req);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  // Rate limit check
  const allowed = await checkRateLimit(session.user.id);
  if (!allowed) return res.status(429).json({ error: 'Rate limit exceeded' });

  // Call Anthropic API
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // Server-side only
  });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: req.body.systemPrompt,
    messages: [{ role: 'user', content: req.body.userPrompt }],
  });

  res.json({ text: response.content[0].text });
}
```

## Support

Issues with LLM integration? Check:
1. [Anthropic API Status](https://status.anthropic.com/)
2. [API Documentation](https://docs.anthropic.com/)
3. Project issues: [GitHub Issues](https://github.com/pradeepreddyvv/contextWindow/issues)
