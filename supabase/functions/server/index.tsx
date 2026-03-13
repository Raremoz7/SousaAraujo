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

// Helper: extract user token from X-User-Token header and validate
async function authenticateUser(c: any): Promise<{ userId: string } | Response> {
  const userToken = c.req.header('X-User-Token');
  if (!userToken) {
    return c.json({ error: 'Unauthorized: missing X-User-Token header' }, 401);
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser(userToken);
  if (authError || !user?.id) {
    console.log('Auth validation failed:', authError?.message || 'no user');
    return c.json({ error: `Unauthorized: ${authError?.message || 'no user'}` }, 401);
  }

  return { userId: user.id };
}

// Allowed admin emails (lowercase)
const ALLOWED_ADMIN_EMAILS = ['sa@somo.com'];

// Route for signup — restricted to allowed emails only
app.post('/signup', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase().trim())) {
      return c.json({ error: 'Acesso não autorizado. Este email não tem permissão.' }, 403);
    }

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
    const auth = await authenticateUser(c);
    if (auth instanceof Response) return auth;

    const body = await c.req.json();
    // Store as JSONB object directly (kv_store handles JSONB)
    await kv.set(KV_KEY, body.data);
    console.log(`Panel data saved by user ${auth.userId}, keys: ${Object.keys(body.data || {}).length}`);
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
    const auth = await authenticateUser(c);
    if (auth instanceof Response) return auth;

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

// ─── GEO History ───
const GEO_HISTORY_KEY = 'sa-geo-history';
const GEO_HISTORY_MAX = 200;

// GET geo history (public read — same pattern as /panel)
app.get('/geo-history', async (c) => {
  try {
    const raw = await kv.get(GEO_HISTORY_KEY);
    const entries = Array.isArray(raw) ? raw : [];
    return c.json({ entries });
  } catch (error: any) {
    console.log("GEO history get error:", error);
    return c.json({ error: `Error fetching GEO history: ${error.message}` }, 500);
  }
});

// POST geo history — append entries (requires auth)
app.post('/geo-history', async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth instanceof Response) return auth;

    const body = await c.req.json();
    const newEntries = Array.isArray(body.entries) ? body.entries : [];
    if (newEntries.length === 0) return c.json({ success: true, total: 0 });

    // Get existing
    let existing: any[] = [];
    try {
      const raw = await kv.get(GEO_HISTORY_KEY);
      if (Array.isArray(raw)) existing = raw;
    } catch { existing = []; }

    // Append and cap at max
    const merged = [...existing, ...newEntries].slice(-GEO_HISTORY_MAX);
    await kv.set(GEO_HISTORY_KEY, merged);

    console.log(`GEO history saved: ${newEntries.length} new, ${merged.length} total`);
    return c.json({ success: true, total: merged.length });
  } catch (error: any) {
    console.log("GEO history save error:", error?.message || error);
    return c.json({ error: `Error saving GEO history: ${error?.message || 'unknown error'}` }, 500);
  }
});

// DELETE geo history — clear all (requires auth)
app.delete('/geo-history', async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth instanceof Response) return auth;

    await kv.set(GEO_HISTORY_KEY, []);
    console.log('GEO history cleared');
    return c.json({ success: true });
  } catch (error: any) {
    console.log("GEO history clear error:", error?.message || error);
    return c.json({ error: `Error clearing GEO history: ${error?.message || 'unknown error'}` }, 500);
  }
});

// ─── Image Upload to Supabase Storage ───
const IMAGE_BUCKET = 'make-979eabbc-images';

// Idempotently ensure the bucket exists
let bucketReady = false;
async function ensureBucket() {
  if (bucketReady) return;
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
  );
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b: any) => b.name === IMAGE_BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(IMAGE_BUCKET, { public: false });
    if (error) console.log('Bucket creation error:', error.message);
    else console.log(`Bucket "${IMAGE_BUCKET}" created`);
  }
  bucketReady = true;
}

// POST /upload-image — accepts multipart form with "file" field, returns signed URL
app.post('/upload-image', async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth instanceof Response) return auth;

    await ensureBucket();

    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return c.json({ error: 'No file provided in form data' }, 400);
    }

    // Validate file type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif'];
    if (!allowed.includes(file.type)) {
      return c.json({ error: `Tipo de arquivo não suportado: ${file.type}. Use JPG, PNG, WebP, GIF, SVG ou AVIF.` }, 400);
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: 'Arquivo muito grande. Máximo: 10MB.' }, 400);
    }

    // Generate unique filename: timestamp-random.ext
    const ext = file.name.split('.').pop() || 'png';
    const timestamp = Date.now();
    const rand = Math.random().toString(36).substring(2, 8);
    const path = `panel/${timestamp}-${rand}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(arrayBuffer);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    const { error: uploadError } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, uint8, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.log('Upload error:', uploadError.message);
      return c.json({ error: `Erro no upload: ${uploadError.message}` }, 500);
    }

    // Create a signed URL valid for 10 years (315360000 seconds)
    const { data: signedData, error: signError } = await supabase.storage
      .from(IMAGE_BUCKET)
      .createSignedUrl(path, 315360000);

    if (signError || !signedData?.signedUrl) {
      console.log('Signed URL error:', signError?.message);
      return c.json({ error: `Erro ao gerar URL: ${signError?.message || 'unknown'}` }, 500);
    }

    console.log(`Image uploaded by user ${auth.userId}: ${path} (${(file.size / 1024).toFixed(1)}KB)`);
    return c.json({ url: signedData.signedUrl, path, size: file.size });
  } catch (error: any) {
    console.log('Upload handler error:', error?.message || error);
    return c.json({ error: `Erro no upload: ${error?.message || 'unknown error'}` }, 500);
  }
});

// DELETE /upload-image — delete an image from storage
app.delete('/upload-image', async (c) => {
  try {
    const auth = await authenticateUser(c);
    if (auth instanceof Response) return auth;

    const { path } = await c.req.json();
    if (!path) return c.json({ error: 'Path is required' }, 400);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') || '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    );

    const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([path]);
    if (error) {
      console.log('Delete image error:', error.message);
      return c.json({ error: `Erro ao deletar: ${error.message}` }, 500);
    }

    console.log(`Image deleted by user ${auth.userId}: ${path}`);
    return c.json({ success: true });
  } catch (error: any) {
    console.log('Delete image handler error:', error?.message || error);
    return c.json({ error: `Erro ao deletar imagem: ${error?.message || 'unknown'}` }, 500);
  }
});

Deno.serve(app.fetch);