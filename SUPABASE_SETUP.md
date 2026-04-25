# Supabase Setup Guide for Scaffold

## Current Configuration

Your Supabase project is configured with:
- **Project URL**: `https://awktgaehmdpgkubykdvn.supabase.co`
- **Anon Key**: Already configured in `.env.local`

## Environment Variables

The app uses **Vite** (not Next.js), so environment variables must use the `VITE_` prefix:

```bash
VITE_SUPABASE_URL=https://awktgaehmdpgkubykdvn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ Already configured in `.env.local` and `.env.example`

## Required Supabase Configuration

### 1. Enable Email Authentication

In your Supabase dashboard:
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email settings:
   - **Enable email confirmations**: Toggle based on your preference
     - ✅ **Recommended for production**: Require email confirmation
     - ⚠️ **For development/testing**: Disable to allow instant sign-up
   - **Secure email change**: Enable
   - **Secure password change**: Enable

### 2. Configure Email Templates (Optional)

Go to **Authentication** → **Email Templates** to customize:
- Confirmation email
- Password reset email
- Magic link email

### 3. Site URL Configuration

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your app's URL:
   - Development: `http://localhost:5173`
   - Production: Your deployed URL
3. Add **Redirect URLs**:
   - `http://localhost:5173/**`
   - Your production URL pattern

### 4. Run Database Migrations

The database schema is defined in `supabase/migrations/001_initial_schema.sql`.

**Option A: Using Supabase CLI** (Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref awktgaehmdpgkubykdvn

# Run migrations
supabase db push
```

**Option B: Manual SQL Execution**
1. Go to **SQL Editor** in Supabase dashboard
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run the SQL

### 5. Verify Row Level Security (RLS)

The migration automatically sets up RLS policies:
- ✅ Anyone can read documents
- ✅ Users can only access their own outlines
- ✅ Users can only access their own battle sessions

## Testing Sign-Up

### If Email Confirmation is DISABLED:
1. Navigate to `http://localhost:5173`
2. Click "Sign Up"
3. Enter email, password, and display name
4. You should be signed in immediately

### If Email Confirmation is ENABLED:
1. Navigate to `http://localhost:5173`
2. Click "Sign Up"
3. Enter email, password, and display name
4. Check your email for confirmation link
5. Click the link to confirm
6. Return to the app and sign in

## Common Issues

### Issue: "Check your email for a confirmation link"
**Solution**: Email confirmation is enabled. Either:
- Check your email and click the confirmation link, OR
- Disable email confirmation in Supabase dashboard (Auth → Providers → Email)

### Issue: "Invalid login credentials"
**Solution**: 
- If you just signed up, confirm your email first
- Check that you're using the correct password
- Try resetting your password

### Issue: "Supabase not configured"
**Solution**: 
- Verify `.env.local` exists with correct variables
- Restart the dev server: `npm run dev`
- Check that variables use `VITE_` prefix (not `NEXT_PUBLIC_`)

### Issue: Database errors after sign-up
**Solution**: Run the database migrations (see step 4 above)

## Development Workflow

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Access the app**: `http://localhost:5173`

3. **Sign up** with any email (use a real email if confirmation is enabled)

4. **Start studying**: The app will load with mock data for the React Hooks document

## Production Deployment

Before deploying:
1. ✅ Enable email confirmation
2. ✅ Configure production Site URL and Redirect URLs
3. ✅ Set up custom SMTP (optional, for branded emails)
4. ✅ Review RLS policies
5. ✅ Set environment variables in your hosting platform (Vercel, Netlify, etc.)

## Security Notes

- The **anon key** is safe to expose in client-side code
- Never expose the **service role key** in client code
- RLS policies protect user data at the database level
- All auth operations use secure Supabase SDK methods
