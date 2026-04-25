import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables for tests
vi.stubEnv('VITE_SUPABASE_URL', '');
vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');
vi.stubEnv('VITE_ANTHROPIC_API_KEY', '');

