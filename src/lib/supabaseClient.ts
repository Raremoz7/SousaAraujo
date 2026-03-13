/**
 * Singleton Supabase client for the frontend.
 * Ensures only ONE GoTrueClient instance exists regardless of HMR re-evaluation.
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const SUPABASE_URL = `https://${projectId}.supabase.co`;

// Attach to globalThis so HMR doesn't create duplicate instances
const KEY = '__sa_supabase_singleton__';

function getOrCreateClient(): SupabaseClient {
  const g = globalThis as any;
  if (!g[KEY]) {
    g[KEY] = createClient(SUPABASE_URL, publicAnonKey);
  }
  return g[KEY];
}

export const supabase = getOrCreateClient();
