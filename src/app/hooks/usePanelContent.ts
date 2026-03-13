/**
 * usePanelContent — Bridge entre o Painel Admin e os componentes do site
 * 
 * Busca dados editados no Supabase e os disponibiliza via cache reativo.
 * Retorna o valor editado no painel ou o fallback original do site se não houver edicao.
 */

import { useSyncExternalStore } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/panel`;

let cachedData: Record<string, string> = {};
let snapshot: Record<string, string> = {};
const listeners = new Set<() => void>();

let initialized = false;

// Busca dados iniciais da API
export async function fetchPanelData() {
  if (initialized) return;
  const MAX_RETRIES = 3;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      if (res.ok) {
        const json = await res.json();
        let data = json.data || {};
        // Handle case where data was stored as a JSON string (legacy double-serialization)
        if (typeof data === 'string') {
          try { data = JSON.parse(data); } catch { data = {}; }
        }
        cachedData = data;
        snapshot = { ...cachedData };
        initialized = true;
        listeners.forEach(l => l());
        return;
      }
      console.warn(`[PanelContent] Fetch attempt ${attempt}/${MAX_RETRIES} — status ${res.status}`);
    } catch (error) {
      console.warn(`[PanelContent] Fetch attempt ${attempt}/${MAX_RETRIES} failed:`, error);
    }
    if (attempt < MAX_RETRIES) {
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt - 1)));
    }
  }
  // All retries failed — mark as initialized so we don't keep retrying
  initialized = true;
  console.error('[PanelContent] Todas as tentativas de fetch falharam. Componentes usarao fallbacks.');
}

// Inicia a busca automaticamente no client
if (typeof window !== 'undefined') {
  fetchPanelData();

  // Listen for live panel updates from parent window (when loaded in iframe preview)
  window.addEventListener('message', (event) => {
    // Only accept same-origin messages
    if (event.origin !== window.location.origin) return;
    if (event.data?.type === 'panel-live-update' && event.data.data) {
      cachedData = event.data.data;
      snapshot = { ...cachedData };
      initialized = true;
      listeners.forEach(l => l());
    }
  });
}

// Update cache manualmente — usado pelo PainelPage para sincronizar o preview ao vivo
export function updatePanelDataCache(newData: Record<string, string>) {
  cachedData = newData;
  snapshot = { ...newData };
  listeners.forEach(l => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

/** Check if a value is a valid panel override (not empty and not a raw figma:asset reference) */
export function isValidPanelValue(val: string | undefined): val is string {
  return val !== undefined && val !== '' && !val.startsWith('figma:asset/');
}

/**
 * Hook simples: retorna valor editado ou fallback
 */
export function usePanel(key: string, fallback: string): string {
  const data = useSyncExternalStore(subscribe, getSnapshot);
  const val = data[key];
  return isValidPanelValue(val) ? val : fallback;
}

/**
 * Hook batch: para multiplos campos de uma vez
 */
export function usePanelBatch<T extends Record<string, string>>(
  keys: Record<keyof T, string>,
  defaults: T
): T {
  const data = useSyncExternalStore(subscribe, getSnapshot);
  const result = {} as Record<keyof T, string>;
  for (const prop in keys) {
    const panelKey = keys[prop];
    const val = data[panelKey];
    result[prop] = isValidPanelValue(val) ? val : defaults[prop];
  }
  return result as T;
}

/**
 * Leitura direta (nao reativa) — para uso fora de componentes
 */
export function readPanel(key: string, fallback: string): string {
  const val = snapshot[key];
  return isValidPanelValue(val) ? val : fallback;
}