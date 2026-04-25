# Sign-Up Fix Summary

## What Was Fixed

### 1. Environment Variables ✅
- Confirmed correct `VITE_` prefix (not `NEXT_PUBLIC_`)
- Verified Supabase URL and anon key are properly configured
- Updated both `.env.local` and `.env.example`

### 2. Enhanced Error Handling ✅
- Improved `useAuth.ts` to handle email confirmation flow
- Added better error messages for different sign-up scenarios
- Shows clear message when email confirmation is required

### 3. Auth Flow Improvements ✅
- Added `emailRedirectTo` option for proper redirect after confirmation
- Better handling of sign-up response (session vs. confirmation required)
- Improved user feedback in AuthGate component

### 4. Documentation ✅
- Created comprehensive `SUPABASE_SETUP.md` guide
- Added troubleshooting section for common issues
- Documented both development and production workflows

### 5. Testing Tools ✅
- Created `test-supabase.js` script to verify connection
- Added `npm run test:supabase` command
- Tests auth, database, and sign-up flow

## How to Test Sign-Up

### Quick Test (Recommended)
```bash
# 1. Test Supabase connection
npm run test:supabase

# 2. Start dev server
npm run dev

# 3. Open browser
# Navigate to http://localhost:5173

# 4. Try signing up
# Click "Sign Up" and create an account
```

### What to Expect

**If email confirmation is DISABLED** (recommended for development):
- Sign up → Instant access ✅
- You'll be logged in immediately

**If email confirmation is ENABLED** (default for production):
- Sign up → "Check your email for a confirmation link"
- Check your email → Click confirmation link
- Return to app → Sign in with your credentials

## Common Issues & Solutions

### Issue: "Check your email for a confirmation link"
This means email confirmation is enabled in Supabase.

**Solution A** (Quick - for development):
1. Go to Supabase Dashboard
2. Authentication → Providers → Email
3. Disable "Enable email confirmations"

**Solution B** (Proper - for production):
1. Check your email inbox
2. Click the confirmation link
3. Return to the app and sign in

### Issue: "Invalid login credentials"
**Causes**:
- Email not confirmed yet (if confirmation is enabled)
- Wrong password
- Account doesn't exist

**Solution**:
1. If you just signed up, confirm your email first
2. Try password reset if you forgot it
3. Try signing up again with a different email

### Issue: Database errors after sign-up
**Cause**: Database migrations not run

**Solution**:
```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref awktgaehmdpgkubykdvn

# Run migrations
supabase db push
```

Or manually run the SQL from `supabase/migrations/001_initial_schema.sql` in the Supabase SQL Editor.

## Supabase Dashboard Checklist

Go to your Supabase dashboard and verify:

- [ ] **Authentication → Providers → Email** is enabled
- [ ] **Email confirmation** setting matches your preference (disable for dev)
- [ ] **Authentication → URL Configuration**:
  - Site URL: `http://localhost:5173` (dev) or your production URL
  - Redirect URLs: `http://localhost:5173/**`
- [ ] **SQL Editor**: Run migrations if not already done
- [ ] **Table Editor**: Verify `documents`, `outlines`, `battle_sessions` tables exist

## Files Modified

1. `src/hooks/useAuth.ts` - Enhanced sign-up error handling
2. `.env.local` - Verified correct configuration
3. `.env.example` - Added helpful comments
4. `package.json` - Added test:supabase script
5. `test-supabase.js` - New connection test script
6. `SUPABASE_SETUP.md` - Comprehensive setup guide

## Next Steps

1. **Run the test**: `npm run test:supabase`
2. **Configure Supabase**: Follow recommendations from test output
3. **Start dev server**: `npm run dev`
4. **Test sign-up**: Try creating an account
5. **Check database**: Verify user data is saved correctly

## Support

If you're still having issues:
1. Check the test output: `npm run test:supabase`
2. Review `SUPABASE_SETUP.md` for detailed troubleshooting
3. Check Supabase dashboard logs (Authentication → Logs)
4. Verify your Supabase project is active and not paused
