import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono().basePath('/make-server-979eabbc');

app.use('*', logger(console.log));
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));

const KV_KEY = 'sa-painel-data';

// Route for signup
app.post('/signup', async (c) => {
  try {
    const { email, password } = await c.req.json();
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });
    if (error) throw error;
    return c.json({ user: data.user });
  } catch (error: any) {
    console.log("Signup error:", error);
    return c.json({ error: error.message }, 400);
  }
});

// Route for GET panel data (public — components need this without auth)
app.get('/panel', async (c) => {
  try {
    const raw = await kv.get(KV_KEY);
    // kv_store stores JSONB, so raw is already an object (or null)
    const data = raw || {};
    return c.json({ data });
  } catch (error: any) {
    console.log("KV Get error:", error);
    return c.json({ error: `Error fetching panel data: ${error.message}` }, 500);
  }
});

// Route for PUT panel data (requires auth)
app.put('/panel', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return c.json({ error: 'Unauthorized: no auth header' }, 401);
    
    const token = authHeader.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return c.json({ error: `Unauthorized: ${authError?.message || 'no user'}` }, 401);

    const body = await c.req.json();
    // Store as JSONB object directly (kv_store handles JSONB)
    await kv.set(KV_KEY, body.data);
    return c.json({ success: true });
  } catch (error: any) {
    console.log("KV Put error:", error);
    return c.json({ error: `Error saving panel data: ${error.message}` }, 500);
  }
});

// Route for POST seed defaults — merges defaults into existing data (only fills empty keys)
// Requires auth
app.post('/panel/seed', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return c.json({ error: 'Unauthorized: no auth header' }, 401);
    
    const token = authHeader.split(' ')[1];
    if (!token) return c.json({ error: 'Unauthorized: malformed auth header' }, 401);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return c.json({ error: `Unauthorized: ${authError?.message || 'no user'}` }, 401);

    let body: any;
    try {
      body = await c.req.json();
    } catch (parseErr: any) {
      console.log("Seed body parse error:", parseErr);
      return c.json({ error: `Invalid JSON body: ${parseErr.message}` }, 400);
    }

    const defaults = body.defaults || {};
    const defaultsCount = Object.keys(defaults).length;
    console.log(`Seed request: ${defaultsCount} default keys received`);

    // Get current data (may be null/undefined for first run)
    let current: Record<string, any> = {};
    try {
      const raw = await kv.get(KV_KEY);
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        current = raw;
      } else if (typeof raw === 'string') {
        try { current = JSON.parse(raw); } catch { current = {}; }
      }
    } catch (kvGetErr: any) {
      console.log("KV get error during seed (starting fresh):", kvGetErr.message);
      current = {};
    }
    
    // Merge: only fill keys that don't exist or are empty in current data
    const merged: Record<string, string> = { ...current };
    let seeded = 0;
    for (const [key, value] of Object.entries(defaults)) {
      if (value === undefined || value === null) continue;
      const existing = merged[key];
      if (existing === undefined || existing === null || (typeof existing === 'string' && existing.trim() === '')) {
        merged[key] = String(value);
        seeded++;
      }
    }
    
    await kv.set(KV_KEY, merged);
    const totalKeys = Object.keys(merged).length;
    console.log(`Seed complete: ${seeded} new values seeded, ${totalKeys} total keys`);
    return c.json({ success: true, seeded, total: totalKeys, data: merged });
  } catch (error: any) {
    console.log("Seed error:", error?.message || error);
    return c.json({ error: `Error seeding defaults: ${error?.message || 'unknown error'}` }, 500);
  }
});

Deno.serve(app.fetch);