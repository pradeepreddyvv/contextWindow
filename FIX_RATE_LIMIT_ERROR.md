# Fix: Email Rate Limit Exceeded Error

## The Error
```
email rate limit exceeded
```

## What It Means
Supabase is blocking sign-up attempts because:
- Too many sign-ups from your IP address in a short time
- Too many emails sent to the same address
- Rate limit protection against spam/abuse

## Quick Fix (Recommended for Development)

### Disable Email Confirmation

This allows instant sign-up without sending emails:

1. **Go to Supabase Dashboard**:
   https://supabase.com/dashboard/project/awktgaehmdpgkubykdvn

2. **Navigate to**:
   Authentication → Providers → Email

3. **Disable these settings**:
   - ❌ Enable email confirmations
   - ❌ Enable email change confirmations
   - ❌ Enable secure email change

4. **Click Save**

5. **Try signing up again** - it should work instantly!

## Alternative Solutions

### Solution 1: Wait It Out
- Rate limits typically reset after **1 hour**
- Just wait and try again later

### Solution 2: Use Different Emails
- Don't reuse the same email address
- Use real email addresses from different domains
- Avoid disposable email services

### Solution 3: Check Your Supabase Logs
1. Go to **Authentication** → **Logs**
2. Look for rate limit errors
3. See which operations are being blocked

### Solution 4: Upgrade Your Plan
- Free tier has strict rate limits
- Paid plans allow higher limits
- Go to **Settings** → **Billing** to upgrade

### Solution 5: Use Custom SMTP
Configure your own email service:
1. Go to **Settings** → **Auth** → **SMTP Settings**
2. Add your SMTP credentials (Gmail, SendGrid, etc.)
3. This bypasses Supabase's email rate limits

## Testing Without Rate Limits

For development, the best approach is:

```
✅ Disable email confirmation (instant sign-up)
✅ Use real email addresses
✅ Don't sign up repeatedly with the same email
✅ Wait between test sign-ups
```

## Verify Your Settings

After disabling email confirmation, test:

```bash
# Run the connection test
npm run test:supabase

# Start the app
npm run dev

# Try signing up with a new email
```

You should now be able to sign up instantly without any email being sent!

## Current Rate Limits (Free Tier)

Supabase free tier limits:
- **Sign-ups**: ~10 per hour per IP
- **Emails**: ~3-4 per hour per address
- **Password resets**: ~3 per hour per address

## Production Considerations

For production deployment:
- ✅ Keep email confirmation **enabled**
- ✅ Use custom SMTP for better deliverability
- ✅ Consider upgrading to Pro plan for higher limits
- ✅ Implement your own rate limiting on the frontend
- ✅ Add CAPTCHA to prevent abuse

## Still Having Issues?

1. **Clear your browser cache and cookies**
2. **Try from a different network** (mobile hotspot)
3. **Use incognito/private browsing mode**
4. **Check Supabase status**: https://status.supabase.com
5. **Contact Supabase support** if the issue persists

## Summary

**For Development**: Disable email confirmation in Supabase dashboard
**For Production**: Keep it enabled and use custom SMTP

This will solve your rate limit error! 🎉
