# Quick Start Guide - Scaffold (Provoke)

## ✅ Your Setup is Ready!

The Supabase connection test passed. You're ready to use the app.

## Start the App (3 steps)

```bash
# 1. Start the development server
npm run dev

# 2. Open your browser
# Navigate to: http://localhost:5173

# 3. Sign up
# Click "Sign Up" and create your account
```

## Sign-Up Instructions

### Option 1: Disable Email Confirmation (Fastest for Testing)
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/awktgaehmdpgkubykdvn)
2. Navigate to: **Authentication** → **Providers** → **Email**
3. **Disable** "Enable email confirmations"
4. Save changes
5. Now you can sign up and get instant access!

### Option 2: Use Email Confirmation (Production-Ready)
1. Sign up with a **real email address**
2. Check your inbox for confirmation email
3. Click the confirmation link
4. Return to the app and sign in

## What You'll See After Sign-In

1. **Study Mode** (default view):
   - Three-column layout: Resources | Document | Outline
   - Four lens tabs: What to Watch For, Prerequisite Check, Common Misconceptions, Explain It Back
   - Interactive provocations (¿ markers) in the document
   - Outline panel tracks your engagement

2. **Battle Mode** (click "Battle Mode" in header):
   - Phase 1: Author 3 mechanism-based questions
   - Phase 2: Answer all questions with reasoning
   - Phase 3: Review AI-scored verdicts on reasoning rigor

## Test Credentials (if you want to skip sign-up)

If you've already created a test account, use those credentials. Otherwise, create a new account with:
- Any email (real email if confirmation is enabled)
- Password: minimum 4 characters
- Display name: your preferred name

## Troubleshooting

### "Check your email for a confirmation link"
→ Email confirmation is enabled. Either:
- Check your email and click the link, OR
- Disable confirmation in Supabase (see Option 1 above)

### "Invalid login credentials"
→ If you just signed up:
- Confirm your email first (if confirmation is enabled)
- Make sure you're using the correct password

### "Supabase not configured"
→ Restart the dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Database errors
→ Run migrations:
```bash
supabase link --project-ref awktgaehmdpgkubykdvn
supabase db push
```

## Features to Try

### In Study Mode:
1. **Select a lens** - Click any of the four lens tabs
2. **Click provocations** - Click any ¿ marker in the document
3. **Pin questions** - Click "Pin this" on lens questions
4. **Highlight text** - Select text and click "Highlight"
5. **Explain It Back** - Type your understanding, get AI provocations

### In Battle Mode:
1. **Write questions** - Create 3 mechanism-based questions
2. **Get feedback** - AI rejects recall questions, accepts reasoning questions
3. **Answer questions** - Type detailed reasoning (15+ words)
4. **Review verdicts** - See AI assessment of your reasoning rigor

## Project Structure

```
contextWindow/
├── src/
│   ├── components/     # React components
│   ├── services/       # AI and data services
│   ├── hooks/          # Custom React hooks (useAuth, etc.)
│   ├── lib/            # Supabase client
│   └── styles/         # CSS tokens and global styles
├── supabase/
│   └── migrations/     # Database schema
├── .env.local          # Your Supabase credentials
└── docs/               # Additional documentation
```

## Key Files

- `SUPABASE_SETUP.md` - Detailed Supabase configuration guide
- `SIGN_UP_FIX_SUMMARY.md` - What was fixed and why
- `test-supabase.js` - Connection test script
- `.env.local` - Your environment variables (already configured)

## Need Help?

1. **Run the test**: `npm run test:supabase`
2. **Check the logs**: Look at browser console (F12)
3. **Review docs**: See `SUPABASE_SETUP.md` for detailed troubleshooting
4. **Supabase logs**: Check Authentication → Logs in Supabase dashboard

## What's Next?

Once you're signed in and exploring the app:
- Try all four lenses in Study Mode
- Engage with provocations
- Build your outline
- Enter Battle Mode and test your understanding
- Check how the AI evaluates reasoning vs. recall

The app uses **mock data** for the React Hooks document, so you can explore all features without needing additional setup.

Enjoy learning with Scaffold! 🎓
