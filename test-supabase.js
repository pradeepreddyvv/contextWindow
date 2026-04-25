#!/usr/bin/env node

/**
 * Quick Supabase Connection Test
 * Run with: node test-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables!');
  console.error('   VITE_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓' : '✗');
  console.error('\nMake sure .env.local exists with the correct variables.');
  process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log('   URL:', supabaseUrl);
console.log('   Key:', supabaseAnonKey.substring(0, 20) + '...\n');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Test 1: Check auth status
    console.log('📡 Test 1: Checking auth status...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    console.log('   ✅ Auth service responding');
    console.log('   Current session:', session ? 'Logged in' : 'Not logged in');

    // Test 2: Check database connection
    console.log('\n📡 Test 2: Checking database connection...');
    const { data, error: dbError } = await supabase
      .from('documents')
      .select('count')
      .limit(1);
    
    if (dbError) {
      if (dbError.code === '42P01') {
        console.log('   ⚠️  Table "documents" does not exist');
        console.log('   → Run database migrations: supabase db push');
      } else {
        throw dbError;
      }
    } else {
      console.log('   ✅ Database connection successful');
      console.log('   Documents table exists');
    }

    // Test 3: Check auth settings
    console.log('\n📡 Test 3: Testing sign-up flow...');
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'test1234';
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: { data: { display_name: 'Test User' } }
    });

    if (signUpError) {
      console.log('   ⚠️  Sign-up error:', signUpError.message);
    } else if (signUpData.user && !signUpData.session) {
      console.log('   ✅ Sign-up successful (email confirmation required)');
      console.log('   → Email confirmation is ENABLED in Supabase');
      console.log('   → To disable: Auth → Providers → Email → Disable confirmations');
    } else if (signUpData.session) {
      console.log('   ✅ Sign-up successful (instant access)');
      console.log('   → Email confirmation is DISABLED');
      
      // Clean up test user
      await supabase.auth.signOut();
    }

    console.log('\n✅ All tests completed!\n');
    console.log('Next steps:');
    console.log('1. Run migrations if needed: supabase db push');
    console.log('2. Start dev server: npm run dev');
    console.log('3. Open http://localhost:5173');
    console.log('4. Try signing up with a real email\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check that your Supabase project is active');
    console.error('2. Verify the URL and anon key are correct');
    console.error('3. Check Supabase dashboard for service status');
    process.exit(1);
  }
}

testConnection();
