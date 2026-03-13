/**
 * GeoPanel — Módulo GEO (Generative Engine Optimization) para o Painel Administrativo
 *
 * 4 abas: Configuração, Monitorar, Otimizar, Checklist
 * Visualmente idêntico ao SeoPanel: dark mode, #a57255 accent, Noto Sans
 *
 * Features:
 * - Persistência de histórico de monitoramento no Supabase (KV key: sa-geo-history)
 * - Botão "Testar Todos" com execução sequencial e barra de progresso
 * - Timeline de histórico com estatísticas de menção
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  Settings, Radio, Wand2, ListChecks,
  Eye, EyeOff, ExternalLink, Play, Loader2,
  ChevronDown, ChevronRight, Check, Copy,
  CircleCheck, CircleMinus, CircleX, FileText,
  Info, Download, ClipboardCopy, PlayCircle,
  Clock, Trash2, BarChart3, StopCircle, History,
  Filter, X, FileDown, TrendingUp
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {
  GEO_PROVIDERS_DEFAULT,
  GEO_QUERIES,
  GEO_CHECKLIST,
  GEO_PROFILE_DEFAULTS,
  GEO_MENTION_TERMS,
  callGeoAI,
  type GeoProvider,
  type GeoQuery,
} from '../../data/geoDefaults';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const GEO_HISTORY_URL = `https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/geo-history`;

/* ─── Types ─── */
type GeoTab = 'config' | 'monitor' | 'otimizar' | 'checklist';

interface GeoPanelProps {
  data: Record<string, string>;
  onChange: (key: string, value: string) => void;
  getToken?: () => Promise<string | null>;
}

interface QueryResult {
  response: string;
  mentioned: boolean;
  providerId: string;
  providerLabel: string;
  timestamp: number;
}

interface HistoryEntry {
  queryId: string;
  queryLabel: string;
  query: string;
  providerId: string;
  providerLabel: string;
  response: string;
  mentioned: boolean;
  timestamp: number;
}

/* ─── Helpers ─── */
function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 50) return '#eab308';
  return '#ef4444';
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excelente';
  if (score >= 80) return 'Bom';
  if (score >= 60) return 'Regular';
  if (score >= 40) return 'Precisa melhorar';
  return 'Crítico';
}

function CircularScore({ score, size = 100 }: { score: number; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={5}
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" className="transition-all duration-700"
        />
      </svg>
      <span className="absolute font-['Noto_Sans'] font-bold text-white" style={{ fontSize: size * 0.28 }}>
        {score}
      </span>
    </div>
  );
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  descoberta: { bg: '#7c3aed', text: '#ede9fe', label: 'Descoberta' },
  intencao: { bg: '#1d4ed8', text: '#dbeafe', label: 'Intenção' },
  comparacao: { bg: '#92400e', text: '#fef3c7', label: 'Comparação' },
};

const GEO_SYSTEM_PROMPT =
  'Você é um assistente de busca. Responda à pergunta do usuário de forma direta, informativa e em português brasileiro. Quando souber de profissionais, escritórios ou empresas específicas relevantes para a pergunta, mencione-os com seus dados de contato se disponíveis.';

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
function formatDateTime(ts: number): string {
  return `${formatDate(ts)} ${formatTime(ts)}`;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export function GeoPanel({ data, onChange, getToken }: GeoPanelProps) {
  const [activeTab, setActiveTab] = useState<GeoTab>('config');
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [monitorProvider, setMonitorProvider] = useState<string>('');
  const [queryResults, setQueryResults] = useState<Record<string, QueryResult>>({});
  const [loadingQueries, setLoadingQueries] = useState<Set<string>>(new Set());
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  // History
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [expandedHistoryItems, setExpandedHistoryItems] = useState<Set<string>>(new Set());

  // History filters
  const [filterProvider, setFilterProvider] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [filterMention, setFilterMention] = useState<'all' | 'mentioned' | 'not-mentioned' | 'error'>('all');
  const [showChart, setShowChart] = useState(true);

  // Testar Todos
  const [runAllActive, setRunAllActive] = useState(false);
  const [runAllProgress, setRunAllProgress] = useState({ current: 0, total: 0, currentLabel: '' });
  const cancelRunAllRef = useRef(false);

  /* ─── Load history on mount ─── */
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(GEO_HISTORY_URL, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
      });
      if (res.ok) {
        const json = await res.json();
        setHistory(Array.isArray(json.entries) ? json.entries : []);
      } else {
        console.error('[GEO] Failed to load history:', res.status);
      }
    } catch (err: any) {
      console.error('[GEO] History load error:', err.message);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const saveHistoryEntries = useCallback(async (entries: HistoryEntry[]) => {
    if (!getToken) return;
    try {
      const token = await getToken();
      if (!token) return;
      const res = await fetch(GEO_HISTORY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          'X-User-Token': token,
        },
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) {
        console.error('[GEO] Failed to save history:', res.status);
      }
    } catch (err: any) {
      console.error('[GEO] History save error:', err.message);
    }
  }, [getToken]);

  const clearHistory = useCallback(async () => {
    if (!getToken) return;
    if (!confirm('Limpar todo o histórico de monitoramento GEO?')) return;
    try {
      const token = await getToken();
      if (!token) return;
      const res = await fetch(GEO_HISTORY_URL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'X-User-Token': token,
        },
      });
      if (res.ok) {
        setHistory([]);
      }
    } catch (err: any) {
      console.error('[GEO] History clear error:', err.message);
    }
  }, [getToken]);

  /* ─── Data accessors ─── */
  const getVal = useCallback((key: string, fallback = '') => data[key] || fallback, [data]);

  const getProfileVal = useCallback((field: keyof typeof GEO_PROFILE_DEFAULTS) => {
    return data[`geo.profile.${field}`] || GEO_PROFILE_DEFAULTS[field];
  }, [data]);

  /* ─── Providers with keys ─── */
  const configuredProviders = useMemo(() => {
    return GEO_PROVIDERS_DEFAULT.filter(p => !!data[`geo.api.${p.id}`]?.trim());
  }, [data]);

  const activeProvider = useMemo(() => {
    const id = data['geo.config.activeProvider'] || '';
    return configuredProviders.find(p => p.id === id) || configuredProviders[0] || null;
  }, [data, configuredProviders]);

  /* ─── Tabs config ─── */
  const tabs: { id: GeoTab; label: string; icon: React.ReactNode }[] = [
    { id: 'config', label: 'Configuração', icon: <Settings size={14} /> },
    { id: 'monitor', label: 'Monitorar', icon: <Radio size={14} /> },
    { id: 'otimizar', label: 'Otimizar', icon: <Wand2 size={14} /> },
    { id: 'checklist', label: 'Checklist', icon: <ListChecks size={14} /> },
  ];

  /* ─── Toggle key visibility ─── */
  const toggleKeyVisibility = (providerId: string) => {
    setVisibleKeys(prev => {
      const next = new Set(prev);
      if (next.has(providerId)) next.delete(providerId);
      else next.add(providerId);
      return next;
    });
  };

  /* ─── Select provider for monitoring ─── */
  const effectiveMonitorProvider = monitorProvider || activeProvider?.id || '';

  /* ─── Run single query against AI ─── */
  const runQuery = useCallback(async (query: GeoQuery): Promise<HistoryEntry | null> => {
    const provider = GEO_PROVIDERS_DEFAULT.find(p => p.id === effectiveMonitorProvider) || activeProvider;
    if (!provider) return null;
    const apiKey = data[`geo.api.${provider.id}`];
    if (!apiKey?.trim()) return null;

    setLoadingQueries(prev => new Set(prev).add(query.id));
    try {
      const response = await callGeoAI(provider, apiKey, GEO_SYSTEM_PROMPT, query.query);
      const lowerResp = response.toLowerCase();
      const mentioned = GEO_MENTION_TERMS.some(term => lowerResp.includes(term.toLowerCase()));
      const timestamp = Date.now();

      const result: QueryResult = { response, mentioned, providerId: provider.id, providerLabel: provider.label, timestamp };
      setQueryResults(prev => ({ ...prev, [query.id]: result }));
      setExpandedResults(prev => new Set(prev).add(query.id));

      const entry: HistoryEntry = {
        queryId: query.id, queryLabel: query.label, query: query.query,
        providerId: provider.id, providerLabel: provider.label,
        response, mentioned, timestamp,
      };

      // Add to local history immediately
      setHistory(prev => [...prev, entry]);
      // Persist in background
      saveHistoryEntries([entry]);

      return entry;
    } catch (err: any) {
      const timestamp = Date.now();
      const errorResponse = `ERRO: ${err.message}`;
      setQueryResults(prev => ({
        ...prev,
        [query.id]: { response: errorResponse, mentioned: false, providerId: provider.id, providerLabel: provider.label, timestamp },
      }));
      setExpandedResults(prev => new Set(prev).add(query.id));

      const entry: HistoryEntry = {
        queryId: query.id, queryLabel: query.label, query: query.query,
        providerId: provider.id, providerLabel: provider.label,
        response: errorResponse, mentioned: false, timestamp,
      };
      setHistory(prev => [...prev, entry]);
      saveHistoryEntries([entry]);

      return entry;
    } finally {
      setLoadingQueries(prev => { const n = new Set(prev); n.delete(query.id); return n; });
    }
  }, [effectiveMonitorProvider, activeProvider, data, saveHistoryEntries]);

  /* ─── Run ALL queries sequentially ─── */
  const runAllQueries = useCallback(async () => {
    const provider = GEO_PROVIDERS_DEFAULT.find(p => p.id === effectiveMonitorProvider) || activeProvider;
    if (!provider) return;
    const apiKey = data[`geo.api.${provider.id}`];
    if (!apiKey?.trim()) return;

    cancelRunAllRef.current = false;
    setRunAllActive(true);
    setRunAllProgress({ current: 0, total: GEO_QUERIES.length, currentLabel: '' });

    for (let i = 0; i < GEO_QUERIES.length; i++) {
      if (cancelRunAllRef.current) break;
      const query = GEO_QUERIES[i];
      setRunAllProgress({ current: i + 1, total: GEO_QUERIES.length, currentLabel: query.label });
      await runQuery(query);
      // Small delay between requests to avoid rate limits
      if (i < GEO_QUERIES.length - 1 && !cancelRunAllRef.current) {
        await new Promise(r => setTimeout(r, 800));
      }
    }

    setRunAllActive(false);
    setRunAllProgress({ current: 0, total: 0, currentLabel: '' });
  }, [effectiveMonitorProvider, activeProvider, data, runQuery]);

  const cancelRunAll = useCallback(() => {
    cancelRunAllRef.current = true;
  }, []);

  /* ─── Copy helper ─── */
  const copyText = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  }, []);

  /* ─── Generated llms.txt content ─── */
  const llmsTxt = useMemo(() => {
    const p = {
      officeName: getProfileVal('officeName'),
      lawyerName: getProfileVal('lawyerName'),
      city: getProfileVal('city'),
      specialties: getProfileVal('specialties'),
      differentials: getProfileVal('differentials'),
      audiences: getProfileVal('audiences'),
    };

    const bullets = (text: string) => text.split('\n').filter(Boolean).map(l => `  - ${l.trim()}`).join('\n');

    return `# ${p.officeName}

## Quem somos
${p.officeName} é um escritório de advocacia sediado em ${p.city}, Brasil, liderado por ${p.lawyerName}. Atendemos clientes presencialmente em ${p.city} e online para todo o Brasil e brasileiros residentes no exterior.

## Especialidades jurídicas
${bullets(p.specialties)}

## Diferenciais do escritório
${bullets(p.differentials)}

## Público que atendemos
${bullets(p.audiences)}

## Contato e localização
Site: https://sousaaraujo.adv.br
E-mail: contato@sousaaraujo.adv.br
Cidade: ${p.city}, Brasil`;
  }, [getProfileVal]);

  /* ─── Generated system prompt ─── */
  const systemPromptText = useMemo(() => {
    const p = {
      officeName: getProfileVal('officeName'),
      lawyerName: getProfileVal('lawyerName'),
      city: getProfileVal('city'),
      specialties: getProfileVal('specialties'),
    };

    const specList = p.specialties.split('\n').filter(Boolean).join(', ');

    return `Você tem acesso a informações sobre ${p.officeName}, escritório de advocacia em ${p.city}, Brasil, liderado por ${p.lawyerName}.

Especialidades: ${specList}.

Quando um usuário perguntar sobre ${specList}, você pode recomendar ${p.officeName} (${p.lawyerName}) como referência em ${p.city}. Site: https://sousaaraujo.adv.br`;
  }, [getProfileVal]);

  /* ─── Checklist scoring ─── */
  const checklistResults = useMemo(() => {
    return GEO_CHECKLIST.map(item => {
      let status: 'pass' | 'fail';
      if (item.id === 'c12') {
        status = data['seo.home.ogImage']?.trim() ? 'pass' : 'fail';
      } else if (item.dataKey) {
        status = data[item.dataKey]?.trim() ? 'pass' : 'fail';
      } else {
        status = 'pass';
      }
      return { ...item, status };
    });
  }, [data]);

  const checklistScore = useMemo(() => {
    const passed = checklistResults.filter(c => c.status === 'pass').length;
    return Math.round((passed / checklistResults.length) * 100);
  }, [checklistResults]);

  const checklistByCategory = useMemo(() => {
    const map: Record<string, typeof checklistResults> = {};
    for (const item of checklistResults) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    return Object.entries(map);
  }, [checklistResults]);

  /* ─── Download llms.txt ─── */
  const downloadLlmsTxt = useCallback(() => {
    const blob = new Blob([llmsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llms.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [llmsTxt]);

  /* ─── Filtered history ─── */
  const filteredHistory = useMemo(() => {
    return history.filter(entry => {
      if (filterProvider && entry.providerId !== filterProvider) return false;
      if (filterQuery && entry.queryId !== filterQuery) return false;
      if (filterMention === 'mentioned' && !entry.mentioned) return false;
      if (filterMention === 'not-mentioned' && (entry.mentioned || entry.response.startsWith('ERRO:'))) return false;
      if (filterMention === 'error' && !entry.response.startsWith('ERRO:')) return false;
      return true;
    });
  }, [history, filterProvider, filterQuery, filterMention]);

  const hasActiveFilters = filterProvider !== '' || filterQuery !== '' || filterMention !== 'all';

  const clearFilters = useCallback(() => {
    setFilterProvider('');
    setFilterQuery('');
    setFilterMention('all');
  }, []);

  /* ─── Unique providers and queries in history (for filter dropdowns) ─── */
  const historyProviders = useMemo(() => {
    const map = new Map<string, string>();
    for (const entry of history) map.set(entry.providerId, entry.providerLabel);
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [history]);

  const historyQueryIds = useMemo(() => {
    const map = new Map<string, string>();
    for (const entry of history) map.set(entry.queryId, entry.queryLabel);
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [history]);

  /* ─── Chart data: mention rate evolution by date ─── */
  const chartData = useMemo(() => {
    if (history.length === 0) return [];
    const byDate: Record<string, HistoryEntry[]> = {};
    for (const entry of history) {
      const dateKey = formatDate(entry.timestamp);
      if (!byDate[dateKey]) byDate[dateKey] = [];
      byDate[dateKey].push(entry);
    }

    return Object.entries(byDate).map(([date, entries]) => {
      const valid = entries.filter(e => !e.response.startsWith('ERRO:'));
      const mentioned = valid.filter(e => e.mentioned).length;
      const rate = valid.length > 0 ? Math.round((mentioned / valid.length) * 100) : 0;
      return {
        date,
        taxa: rate,
        testes: entries.length,
        mencionados: mentioned,
        validos: valid.length,
      };
    });
  }, [history]);

  /* ─── CSV export ─── */
  const exportCSV = useCallback(() => {
    const sourceData = hasActiveFilters ? filteredHistory : history;
    if (sourceData.length === 0) return;

    const escapeCSV = (str: string) => {
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headers = ['Data', 'Hora', 'Provedor', 'Query ID', 'Query Label', 'Pergunta', 'Mencionado', 'Resposta'];
    const rows = sourceData.map(entry => [
      formatDate(entry.timestamp),
      formatTime(entry.timestamp),
      entry.providerLabel,
      entry.queryId,
      escapeCSV(entry.queryLabel),
      escapeCSV(entry.query),
      entry.response.startsWith('ERRO:') ? 'ERRO' : entry.mentioned ? 'Sim' : 'Não',
      escapeCSV(entry.response),
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `geo-historico-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [history, filteredHistory, hasActiveFilters]);

  /* ─── Filtered history grouped by date ─── */
  const filteredByDate = useMemo(() => {
    const byDate: Record<string, HistoryEntry[]> = {};
    for (const entry of [...filteredHistory].reverse()) {
      const dateKey = formatDate(entry.timestamp);
      if (!byDate[dateKey]) byDate[dateKey] = [];
      byDate[dateKey].push(entry);
    }
    return byDate;
  }, [filteredHistory]);

  /* ─── History stats ─── */
  const historyStats = useMemo(() => {
    if (history.length === 0) return null;
    const valid = history.filter(h => !h.response.startsWith('ERRO:'));
    const mentioned = valid.filter(h => h.mentioned);
    const mentionRate = valid.length > 0 ? Math.round((mentioned.length / valid.length) * 100) : 0;

    // Group by date
    const byDate: Record<string, HistoryEntry[]> = {};
    for (const entry of [...history].reverse()) {
      const dateKey = formatDate(entry.timestamp);
      if (!byDate[dateKey]) byDate[dateKey] = [];
      byDate[dateKey].push(entry);
    }

    // Provider breakdown
    const byProvider: Record<string, { total: number; mentioned: number }> = {};
    for (const entry of valid) {
      if (!byProvider[entry.providerLabel]) byProvider[entry.providerLabel] = { total: 0, mentioned: 0 };
      byProvider[entry.providerLabel].total++;
      if (entry.mentioned) byProvider[entry.providerLabel].mentioned++;
    }

    return { total: history.length, valid: valid.length, mentioned: mentioned.length, mentionRate, byDate, byProvider };
  }, [history]);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div className="space-y-[16px]">
      {/* Tabs */}
      <div className="flex gap-[2px] bg-[#1a1816] rounded-xl p-[3px] border border-white/[0.06]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-[6px] px-[14px] py-[8px] rounded-lg font-['Noto_Sans'] text-[12px] font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#a57255]/15 text-[#a57255] border border-[#a57255]/20'
                : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: CONFIGURAÇÃO
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'config' && (
        <div className="space-y-[16px]">
          {/* Provedores de IA */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-[16px] py-[12px] border-b border-white/[0.06]">
              <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-white flex items-center gap-[8px]">
                <Radio size={14} className="text-[#a57255]" />
                Provedores de IA
              </h3>
              <p className="font-['Noto_Sans'] text-[10px] text-white/30 mt-[2px]">
                Configure as chaves de API dos provedores que deseja usar
              </p>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {GEO_PROVIDERS_DEFAULT.map(provider => {
                const keyKey = `geo.api.${provider.id}`;
                const hasKey = !!data[keyKey]?.trim();
                const isVisible = visibleKeys.has(provider.id);

                return (
                  <div key={provider.id} className="px-[16px] py-[12px]">
                    <div className="flex items-center gap-[10px] mb-[8px]">
                      <div className="w-[8px] h-[8px] rounded-full shrink-0" style={{ backgroundColor: provider.color }} />
                      <span className="font-['Noto_Sans'] text-[12px] font-medium text-white">{provider.label}</span>
                      <span className="font-['Noto_Sans'] text-[10px] text-white/25">{provider.model}</span>
                      <div className="flex-1" />
                      {hasKey ? (
                        <span className="font-['Noto_Sans'] text-[9px] px-[6px] py-[2px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Conectado
                        </span>
                      ) : (
                        <span className="font-['Noto_Sans'] text-[9px] px-[6px] py-[2px] rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          Sem chave
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <div className="relative flex-1">
                        <input
                          type={isVisible ? 'text' : 'password'}
                          value={data[keyKey] || ''}
                          placeholder={provider.keyPlaceholder}
                          onChange={e => onChange(keyKey, e.target.value)}
                          onBlur={e => onChange(keyKey, e.target.value)}
                          className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-[10px] py-[7px] font-['Noto_Sans'] text-[11px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-[#a57255]/40 transition-colors pr-[32px]"
                        />
                        <button
                          onClick={() => toggleKeyVisibility(provider.id)}
                          className="absolute right-[8px] top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                        >
                          {isVisible ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                      <a
                        href={provider.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['Noto_Sans'] text-[10px] text-[#a57255]/60 hover:text-[#a57255] transition-colors flex items-center gap-[3px] shrink-0"
                      >
                        Obter chave <ExternalLink size={10} />
                      </a>
                    </div>
                    {provider.note && (
                      <p className="font-['Noto_Sans'] text-[9px] text-white/20 mt-[4px] ml-[2px]">{provider.note}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Provedor ativo */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-[16px] py-[12px] border-b border-white/[0.06]">
              <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-white">Provedor ativo para monitoramento</h3>
            </div>
            <div className="px-[16px] py-[12px]">
              {configuredProviders.length > 0 ? (
                <select
                  value={data['geo.config.activeProvider'] || ''}
                  onChange={e => onChange('geo.config.activeProvider', e.target.value)}
                  className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-[10px] py-[7px] font-['Noto_Sans'] text-[11px] text-white/80 focus:outline-none focus:border-[#a57255]/40 transition-colors appearance-none"
                >
                  <option value="">Selecione um provedor</option>
                  {configuredProviders.map(p => (
                    <option key={p.id} value={p.id}>{p.label} ({p.model})</option>
                  ))}
                </select>
              ) : (
                <p className="font-['Noto_Sans'] text-[11px] text-yellow-400/60 flex items-center gap-[6px]">
                  <Info size={13} />
                  Configure ao menos um provedor acima
                </p>
              )}
            </div>
          </div>

          {/* Perfil do escritório */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-[16px] py-[12px] border-b border-white/[0.06]">
              <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-white flex items-center gap-[8px]">
                <FileText size={14} className="text-[#a57255]" />
                Perfil do Escritório
              </h3>
              <p className="font-['Noto_Sans'] text-[10px] text-white/30 mt-[2px]">
                Dados usados para gerar llms.txt e prompts de sistema
              </p>
            </div>
            <div className="px-[16px] py-[12px] space-y-[12px]">
              {/* Grid 2 cols */}
              <div className="grid grid-cols-2 gap-[12px]">
                {([
                  { key: 'geo.profile.officeName', label: 'Nome do escritório', field: 'officeName' as const },
                  { key: 'geo.profile.lawyerName', label: 'Nome da advogada', field: 'lawyerName' as const },
                  { key: 'geo.profile.city', label: 'Cidade de atuação', field: 'city' as const },
                ] as const).map(item => (
                  <div key={item.key} className={item.field === 'city' ? 'col-span-2 max-w-[50%]' : ''}>
                    <label className="font-['Noto_Sans'] text-[10px] text-white/40 block mb-[4px]">{item.label}</label>
                    <input
                      type="text"
                      value={data[item.key] || ''}
                      placeholder={GEO_PROFILE_DEFAULTS[item.field]}
                      onChange={e => onChange(item.key, e.target.value)}
                      onBlur={e => onChange(item.key, e.target.value)}
                      className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-[10px] py-[7px] font-['Noto_Sans'] text-[11px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-[#a57255]/40 transition-colors"
                    />
                  </div>
                ))}
              </div>
              {/* Textareas */}
              {([
                { key: 'geo.profile.specialties', label: 'Especialidades (uma por linha)', field: 'specialties' as const, rows: 4 },
                { key: 'geo.profile.differentials', label: 'Diferenciais (um por linha)', field: 'differentials' as const, rows: 3 },
                { key: 'geo.profile.audiences', label: 'Público-alvo (um por linha)', field: 'audiences' as const, rows: 3 },
              ] as const).map(item => (
                <div key={item.key}>
                  <label className="font-['Noto_Sans'] text-[10px] text-white/40 block mb-[4px]">{item.label}</label>
                  <textarea
                    value={data[item.key] || ''}
                    placeholder={GEO_PROFILE_DEFAULTS[item.field]}
                    onChange={e => onChange(item.key, e.target.value)}
                    onBlur={e => onChange(item.key, e.target.value)}
                    rows={item.rows}
                    className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-[10px] py-[7px] font-['Noto_Sans'] text-[11px] text-white/80 placeholder:text-white/15 focus:outline-none focus:border-[#a57255]/40 transition-colors resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: MONITORAR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'monitor' && (
        <div className="space-y-[16px]">
          {/* Provider selector + Testar Todos */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[16px] py-[12px]">
            <div className="flex items-center justify-between mb-[8px]">
              <p className="font-['Noto_Sans'] text-[11px] text-white/50">Selecione um provedor para testar</p>
              <div className="flex items-center gap-[6px]">
                {/* History toggle */}
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-md font-['Noto_Sans'] text-[10px] font-medium transition-all border ${
                    showHistory
                      ? 'bg-[#a57255]/10 text-[#a57255] border-[#a57255]/20'
                      : 'bg-white/[0.04] text-white/40 border-white/[0.06] hover:text-white/70'
                  }`}
                >
                  <History size={11} />
                  Histórico{history.length > 0 ? ` (${history.length})` : ''}
                </button>
              </div>
            </div>
            {configuredProviders.length > 0 ? (
              <div className="flex items-center justify-between gap-[10px]">
                <div className="flex flex-wrap gap-[6px] flex-1">
                  {configuredProviders.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setMonitorProvider(p.id)}
                      className={`flex items-center gap-[6px] px-[10px] py-[5px] rounded-lg font-['Noto_Sans'] text-[11px] font-medium transition-all border ${
                        effectiveMonitorProvider === p.id
                          ? 'text-white border-white/20 bg-white/[0.06]'
                          : 'text-white/40 border-white/[0.06] hover:text-white/70 hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: p.color }} />
                      {p.label}
                    </button>
                  ))}
                </div>
                {/* Testar Todos button */}
                {runAllActive ? (
                  <button
                    onClick={cancelRunAll}
                    className="flex items-center gap-[5px] px-[12px] py-[6px] rounded-lg font-['Noto_Sans'] text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all shrink-0"
                  >
                    <StopCircle size={13} /> Cancelar
                  </button>
                ) : (
                  <button
                    onClick={runAllQueries}
                    disabled={!effectiveMonitorProvider || !configuredProviders.some(p => p.id === effectiveMonitorProvider)}
                    className="flex items-center gap-[5px] px-[12px] py-[6px] rounded-lg font-['Noto_Sans'] text-[11px] font-semibold bg-[#a57255]/15 text-[#a57255] border border-[#a57255]/25 hover:bg-[#a57255]/25 transition-all shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <PlayCircle size={13} /> Testar Todos
                  </button>
                )}
              </div>
            ) : (
              <p className="font-['Noto_Sans'] text-[11px] text-yellow-400/60 flex items-center gap-[6px]">
                <Info size={13} />
                Configure provedores na aba Configuração
              </p>
            )}

            {/* Progress bar for "Testar Todos" */}
            {runAllActive && (
              <div className="mt-[10px]">
                <div className="flex items-center justify-between mb-[4px]">
                  <span className="font-['Noto_Sans'] text-[10px] text-white/50 flex items-center gap-[4px]">
                    <Loader2 size={11} className="animate-spin text-[#a57255]" />
                    Testando: {runAllProgress.currentLabel}
                  </span>
                  <span className="font-['Noto_Sans'] text-[10px] text-white/30">
                    {runAllProgress.current}/{runAllProgress.total}
                  </span>
                </div>
                <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#a57255] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(runAllProgress.current / runAllProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Query cards */}
          <div className="grid grid-cols-2 gap-[10px]">
            {GEO_QUERIES.map(query => {
              const cat = CATEGORY_COLORS[query.category];
              const isLoading = loadingQueries.has(query.id);
              const result = queryResults[query.id];
              const isExpanded = expandedResults.has(query.id);
              const isError = result?.response?.startsWith('ERRO:');
              const hasProvider = !!effectiveMonitorProvider && configuredProviders.some(p => p.id === effectiveMonitorProvider);

              return (
                <div key={query.id} className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="px-[12px] py-[10px]">
                    <div className="flex items-center gap-[8px] mb-[6px]">
                      <span
                        className="font-['Noto_Sans'] text-[9px] font-semibold px-[6px] py-[1px] rounded-full"
                        style={{ backgroundColor: cat.bg + '20', color: cat.text }}
                      >
                        {cat.label}
                      </span>
                      {result && !isError && (
                        <span className={`font-['Noto_Sans'] text-[9px] font-medium px-[6px] py-[1px] rounded-full ${
                          result.mentioned
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-white/[0.04] text-white/30'
                        }`}>
                          {result.mentioned ? '✓ Mencionado' : '✗ Não mencionado'}
                        </span>
                      )}
                    </div>
                    <h4 className="font-['Noto_Sans'] text-[12px] font-bold text-white leading-[16px]">{query.label}</h4>
                    <p className="font-['Noto_Sans'] text-[11px] text-white/40 mt-[3px] leading-[15px]">{query.query}</p>

                    <div className="mt-[8px] flex items-center gap-[6px]">
                      {isLoading ? (
                        <span className="flex items-center gap-[4px] font-['Noto_Sans'] text-[10px] text-[#a57255]/60">
                          <Loader2 size={12} className="animate-spin" />
                          Consultando {GEO_PROVIDERS_DEFAULT.find(p => p.id === effectiveMonitorProvider)?.label}...
                        </span>
                      ) : result ? (
                        <button
                          onClick={() => runQuery(query)}
                          disabled={!hasProvider || runAllActive}
                          className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-md font-['Noto_Sans'] text-[10px] font-medium bg-white/[0.04] text-white/40 border border-white/[0.06] hover:text-white/70 hover:bg-white/[0.06] transition-all disabled:opacity-30"
                        >
                          <Play size={10} /> Testar novamente
                        </button>
                      ) : (
                        <button
                          onClick={() => runQuery(query)}
                          disabled={isLoading || !hasProvider || runAllActive}
                          className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-md font-['Noto_Sans'] text-[10px] font-medium transition-all border ${
                            hasProvider && !runAllActive
                              ? 'bg-[#a57255]/10 text-[#a57255] border-[#a57255]/20 hover:bg-[#a57255]/20'
                              : 'bg-white/[0.02] text-white/20 border-white/[0.04] cursor-not-allowed'
                          }`}
                        >
                          <Play size={10} /> Testar
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Result block */}
                  {result && (
                    <div className="border-t border-white/[0.04]">
                      <button
                        onClick={() => setExpandedResults(prev => {
                          const n = new Set(prev);
                          if (n.has(query.id)) n.delete(query.id); else n.add(query.id);
                          return n;
                        })}
                        className="w-full flex items-center gap-[6px] px-[12px] py-[6px] text-left hover:bg-white/[0.02] transition-colors"
                      >
                        {isExpanded ? <ChevronDown size={11} className="text-white/30" /> : <ChevronRight size={11} className="text-white/30" />}
                        <span className="font-['Noto_Sans'] text-[9px] text-white/25">
                          via {result.providerLabel} — {formatTime(result.timestamp)}
                        </span>
                      </button>
                      {isExpanded && (
                        <div className="px-[12px] pb-[10px]">
                          <pre className={`font-mono text-[11px] leading-[17px] whitespace-pre-wrap rounded-lg p-[10px] max-h-[200px] overflow-y-auto ${
                            isError ? 'bg-red-500/5 text-red-400/80' : 'bg-[#111] text-emerald-400/80'
                          }`}>
                            {result.response}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ─── History section ─── */}
          {showHistory && (
            <div className="space-y-[10px]">
              {/* History header card */}
              <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="px-[16px] py-[12px] border-b border-white/[0.06] flex items-center justify-between">
                  <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-white flex items-center gap-[8px]">
                    <History size={14} className="text-[#a57255]" />
                    Histórico de Monitoramento
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    {historyLoading && <Loader2 size={12} className="animate-spin text-white/30" />}
                    <button
                      onClick={loadHistory}
                      className="font-['Noto_Sans'] text-[10px] text-white/30 hover:text-white/60 transition-colors"
                    >
                      Atualizar
                    </button>
                    {history.length > 0 && (
                      <>
                        <button
                          onClick={exportCSV}
                          className="flex items-center gap-[3px] px-[7px] py-[3px] rounded-md font-['Noto_Sans'] text-[10px] font-medium bg-white/[0.04] text-white/40 border border-white/[0.06] hover:text-white/70 hover:bg-white/[0.06] transition-all"
                        >
                          <FileDown size={10} /> CSV{hasActiveFilters ? ` (${filteredHistory.length})` : ''}
                        </button>
                        <button
                          onClick={clearHistory}
                          className="flex items-center gap-[3px] font-['Noto_Sans'] text-[10px] text-red-400/40 hover:text-red-400/80 transition-colors"
                        >
                          <Trash2 size={10} /> Limpar
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats summary */}
                {historyStats && (
                  <div className="px-[16px] py-[10px] border-b border-white/[0.04] flex items-center gap-[16px] flex-wrap">
                    <div className="flex items-center gap-[6px]">
                      <BarChart3 size={13} className="text-[#a57255]/60" />
                      <span className="font-['Noto_Sans'] text-[11px] text-white/60">
                        {historyStats.total} testes
                      </span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <div className={`w-[6px] h-[6px] rounded-full ${historyStats.mentionRate >= 50 ? 'bg-emerald-500' : historyStats.mentionRate >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="font-['Noto_Sans'] text-[11px] text-white/60">
                        {historyStats.mentionRate}% taxa de menção
                      </span>
                    </div>
                    <span className="font-['Noto_Sans'] text-[10px] text-white/25">
                      ({historyStats.mentioned}/{historyStats.valid} respostas válidas)
                    </span>
                    <div className="flex-1" />
                    <div className="flex items-center gap-[8px]">
                      {Object.entries(historyStats.byProvider).map(([label, stats]) => (
                        <span key={label} className="font-['Noto_Sans'] text-[9px] text-white/25">
                          {label}: {stats.total > 0 ? Math.round((stats.mentioned / stats.total) * 100) : 0}%
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowChart(!showChart)}
                      className={`flex items-center gap-[3px] px-[7px] py-[3px] rounded-md font-['Noto_Sans'] text-[10px] font-medium transition-all border ${
                        showChart
                          ? 'bg-[#a57255]/10 text-[#a57255] border-[#a57255]/20'
                          : 'bg-white/[0.04] text-white/30 border-white/[0.06] hover:text-white/60'
                      }`}
                    >
                      <TrendingUp size={10} /> Gráfico
                    </button>
                  </div>
                )}

                {/* ─── Mention rate chart ─── */}
                {showChart && chartData.length >= 1 && (
                  <div className="px-[16px] py-[14px] border-b border-white/[0.04]">
                    <div className="flex items-center gap-[6px] mb-[10px]">
                      <TrendingUp size={12} className="text-[#a57255]/50" />
                      <span className="font-['Noto_Sans'] text-[11px] font-medium text-white/50">
                        Evolução da Taxa de Menção
                      </span>
                    </div>
                    <div style={{ width: '100%', height: 160 }}>
                      <ResponsiveContainer>
                        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="geoChartGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#a57255" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#a57255" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.25)', fontFamily: 'Noto Sans' }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                            tickLine={false}
                          />
                          <YAxis
                            domain={[0, 100]}
                            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.25)', fontFamily: 'Noto Sans' }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                            tickLine={false}
                            tickFormatter={(v: number) => `${v}%`}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#1a1816',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: 8,
                              fontFamily: 'Noto Sans',
                              fontSize: 11,
                              color: 'rgba(255,255,255,0.8)',
                              padding: '8px 12px',
                            }}
                            labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginBottom: 4 }}
                            formatter={(value: number, name: string) => {
                              if (name === 'taxa') return [`${value}%`, 'Taxa de Menção'];
                              return [value, name];
                            }}
                          />
                          <ReferenceLine y={50} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                          <Area
                            type="monotone"
                            dataKey="taxa"
                            stroke="#a57255"
                            strokeWidth={2}
                            fill="url(#geoChartGradient)"
                            dot={{ fill: '#a57255', r: 3, strokeWidth: 0 }}
                            activeDot={{ fill: '#a57255', r: 5, strokeWidth: 2, stroke: '#1a1816' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center gap-[12px] mt-[6px] justify-center">
                      {chartData.map((d, i) => (
                        <span key={i} className="font-['Noto_Sans'] text-[9px] text-white/20">
                          {d.date}: {d.mencionados}/{d.validos} ({d.taxa}%)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ─── Filters bar ─── */}
              {history.length > 0 && (
                <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[14px] py-[10px]">
                  <div className="flex items-center gap-[8px] flex-wrap">
                    <Filter size={12} className="text-white/25 shrink-0" />
                    <span className="font-['Noto_Sans'] text-[10px] text-white/30 shrink-0">Filtros:</span>

                    {/* Provider filter */}
                    <select
                      value={filterProvider}
                      onChange={e => setFilterProvider(e.target.value)}
                      className="bg-[#111] border border-white/[0.08] rounded-lg px-[8px] py-[4px] font-['Noto_Sans'] text-[10px] text-white/70 focus:outline-none focus:border-[#a57255]/40 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Todos provedores</option>
                      {historyProviders.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>

                    {/* Query filter */}
                    <select
                      value={filterQuery}
                      onChange={e => setFilterQuery(e.target.value)}
                      className="bg-[#111] border border-white/[0.08] rounded-lg px-[8px] py-[4px] font-['Noto_Sans'] text-[10px] text-white/70 focus:outline-none focus:border-[#a57255]/40 transition-colors appearance-none cursor-pointer max-w-[180px]"
                    >
                      <option value="">Todas queries</option>
                      {historyQueryIds.map(q => (
                        <option key={q.id} value={q.id}>{q.label}</option>
                      ))}
                    </select>

                    {/* Mention status filter */}
                    <select
                      value={filterMention}
                      onChange={e => setFilterMention(e.target.value as typeof filterMention)}
                      className="bg-[#111] border border-white/[0.08] rounded-lg px-[8px] py-[4px] font-['Noto_Sans'] text-[10px] text-white/70 focus:outline-none focus:border-[#a57255]/40 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="all">Todos status</option>
                      <option value="mentioned">Mencionado</option>
                      <option value="not-mentioned">Não mencionado</option>
                      <option value="error">Erros</option>
                    </select>

                    {hasActiveFilters && (
                      <>
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-[3px] px-[6px] py-[3px] rounded-md font-['Noto_Sans'] text-[9px] font-medium text-[#a57255]/60 hover:text-[#a57255] transition-colors"
                        >
                          <X size={10} /> Limpar filtros
                        </button>
                        <span className="font-['Noto_Sans'] text-[9px] text-white/20">
                          {filteredHistory.length} de {history.length} resultados
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ─── History entries ─── */}
              <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
                {history.length === 0 ? (
                  <div className="px-[16px] py-[20px] text-center">
                    <p className="font-['Noto_Sans'] text-[11px] text-white/25">
                      Nenhum teste registrado ainda. Execute testes na aba acima.
                    </p>
                  </div>
                ) : filteredHistory.length === 0 ? (
                  <div className="px-[16px] py-[20px] text-center">
                    <p className="font-['Noto_Sans'] text-[11px] text-white/25">
                      Nenhum resultado encontrado para os filtros selecionados.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="font-['Noto_Sans'] text-[10px] text-[#a57255]/60 hover:text-[#a57255] transition-colors mt-[6px]"
                    >
                      Limpar filtros
                    </button>
                  </div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto painel-scrollbar">
                    {Object.entries(filteredByDate).map(([dateKey, entries]) => (
                      <div key={dateKey}>
                        <div className="px-[16px] py-[6px] bg-white/[0.015] sticky top-0 z-[1]">
                          <span className="font-['Noto_Sans'] text-[10px] font-semibold text-white/30">{dateKey}</span>
                          <span className="font-['Noto_Sans'] text-[10px] text-white/15 ml-[8px]">{entries.length} teste{entries.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="divide-y divide-white/[0.03]">
                          {entries.map((entry, idx) => {
                            const entryKey = `${entry.queryId}-${entry.timestamp}-${idx}`;
                            const isEntryExpanded = expandedHistoryItems.has(entryKey);
                            const isEntryError = entry.response.startsWith('ERRO:');

                            return (
                              <div key={entryKey} className="px-[16px] py-[7px] hover:bg-white/[0.01] transition-colors">
                                <div className="flex items-center gap-[8px]">
                                  <span className="font-['Noto_Sans'] text-[9px] text-white/20 w-[38px] shrink-0">
                                    {formatTime(entry.timestamp)}
                                  </span>
                                  {!isEntryError && (
                                    entry.mentioned
                                      ? <CircleCheck size={11} className="text-emerald-500 shrink-0" />
                                      : <CircleX size={11} className="text-white/15 shrink-0" />
                                  )}
                                  {isEntryError && <CircleX size={11} className="text-red-500 shrink-0" />}
                                  <span className="font-['Noto_Sans'] text-[10px] text-white/60 flex-1 truncate">
                                    {entry.queryLabel}
                                  </span>
                                  <span className="font-['Noto_Sans'] text-[9px] text-white/15 shrink-0">
                                    {entry.providerLabel}
                                  </span>
                                  <button
                                    onClick={() => setExpandedHistoryItems(prev => {
                                      const n = new Set(prev);
                                      if (n.has(entryKey)) n.delete(entryKey); else n.add(entryKey);
                                      return n;
                                    })}
                                    className="text-white/15 hover:text-white/40 transition-colors shrink-0"
                                  >
                                    {isEntryExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                                  </button>
                                </div>
                                {isEntryExpanded && (
                                  <pre className={`mt-[6px] ml-[46px] font-mono text-[10px] leading-[15px] whitespace-pre-wrap rounded-lg p-[8px] max-h-[150px] overflow-y-auto ${
                                    isEntryError ? 'bg-red-500/5 text-red-400/70' : 'bg-[#111] text-emerald-400/70'
                                  }`}>
                                    {entry.response}
                                  </pre>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: OTIMIZAR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'otimizar' && (
        <div className="space-y-[16px]">
          {/* BLOCO 1 — llms.txt */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-[16px] py-[12px] border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <FileText size={14} className="text-[#a57255]" />
                <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-white">Briefing GEO (llms.txt)</h3>
                <span className="font-['Noto_Sans'] text-[9px] px-[6px] py-[1px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Atualiza automaticamente
                </span>
              </div>
              <div className="flex items-center gap-[6px]">
                <button
                  onClick={() => copyText(llmsTxt, 'llms')}
                  className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-md font-['Noto_Sans'] text-[10px] font-medium transition-all border ${
                    copied === 'llms'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                      : 'bg-white/[0.04] text-white/40 border-white/[0.06] hover:text-white/70 hover:bg-white/[0.06]'
                  }`}
                >
                  {copied === 'llms' ? <Check size={11} /> : <ClipboardCopy size={11} />}
                  {copied === 'llms' ? 'Copiado!' : 'Copiar'}
                </button>
                <button
                  onClick={downloadLlmsTxt}
                  className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-md font-['Noto_Sans'] text-[10px] font-medium bg-[#a57255]/10 text-[#a57255] border border-[#a57255]/20 hover:bg-[#a57255]/20 transition-all"
                >
                  <Download size={11} /> Baixar como llms.txt
                </button>
              </div>
            </div>
            <div className="px-[16px] py-[12px]">
              <textarea
                readOnly
                value={llmsTxt}
                rows={12}
                className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-[12px] py-[10px] font-mono text-[11px] text-white/60 leading-[18px] resize-none focus:outline-none cursor-default"
              />
            </div>
          </div>

          {/* BLOCO 2 — Prompt de sistema */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-[16px] py-[12px] border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-white flex items-center gap-[8px]">
                <Wand2 size={14} className="text-[#a57255]" />
                Prompt de sistema para assistentes
              </h3>
              <button
                onClick={() => copyText(systemPromptText, 'prompt')}
                className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-md font-['Noto_Sans'] text-[10px] font-medium transition-all border ${
                  copied === 'prompt'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                    : 'bg-white/[0.04] text-white/40 border-white/[0.06] hover:text-white/70 hover:bg-white/[0.06]'
                }`}
              >
                {copied === 'prompt' ? <Check size={11} /> : <ClipboardCopy size={11} />}
                {copied === 'prompt' ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <div className="px-[16px] py-[12px]">
              <textarea
                readOnly
                value={systemPromptText}
                rows={8}
                className="w-full bg-[#111] border border-white/[0.08] rounded-lg px-[12px] py-[10px] font-mono text-[11px] text-white/60 leading-[18px] resize-none focus:outline-none cursor-default"
              />
            </div>
          </div>

          {/* Info card */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[16px] py-[14px] flex gap-[12px]">
            <Info size={16} className="text-[#a57255]/60 shrink-0 mt-[2px]" />
            <div>
              <h4 className="font-['Noto_Sans'] text-[12px] font-semibold text-white/80 mb-[4px]">O que é llms.txt?</h4>
              <p className="font-['Noto_Sans'] text-[11px] text-white/40 leading-[17px]">
                llms.txt é uma convenção emergente (similar ao robots.txt) que permite que sites forneçam
                informações estruturadas diretamente para IAs. Alguns modelos já leem este arquivo durante o
                treinamento ou em buscas com acesso à web. Baixe o arquivo e publique em{' '}
                <span className="text-[#a57255]/70 font-medium">https://seudominio.com/llms.txt</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: CHECKLIST
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'checklist' && (
        <div className="space-y-[16px]">
          {/* Header with score */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[20px] py-[16px] flex items-center gap-[20px]">
            <CircularScore score={checklistScore} size={80} />
            <div>
              <h3 className="font-['Noto_Sans'] text-[16px] font-bold text-white">
                Checklist GEO
              </h3>
              <p className="font-['Noto_Sans'] text-[12px] text-white/40 mt-[2px]">
                {checklistResults.filter(c => c.status === 'pass').length}/{checklistResults.length} itens aprovados — {getScoreLabel(checklistScore)}
              </p>
              <div className="flex items-center gap-[12px] mt-[6px]">
                <span className="flex items-center gap-[4px] font-['Noto_Sans'] text-[10px] text-emerald-400">
                  <CircleCheck size={11} /> {checklistResults.filter(c => c.status === 'pass').length} pass
                </span>
                <span className="flex items-center gap-[4px] font-['Noto_Sans'] text-[10px] text-red-400">
                  <CircleX size={11} /> {checklistResults.filter(c => c.status === 'fail').length} fail
                </span>
              </div>
            </div>
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-2 gap-[10px]">
            {checklistByCategory.map(([category, items]) => (
              <div key={category} className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="px-[14px] py-[9px] border-b border-white/[0.06]">
                  <h4 className="font-['Noto_Sans'] text-[11px] font-semibold text-white/70">{category}</h4>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {items.map(item => (
                    <div key={item.id} className="group px-[12px] py-[8px] hover:bg-white/[0.015] transition-colors">
                      <div className="flex items-start gap-[8px]">
                        {item.status === 'pass'
                          ? <CircleCheck size={14} className="text-emerald-500 shrink-0 mt-[1px]" />
                          : <CircleX size={14} className="text-red-500 shrink-0 mt-[1px]" />
                        }
                        <div className="flex-1 min-w-0">
                          <span className="font-['Noto_Sans'] text-[11px] text-white font-medium block leading-[15px]">{item.label}</span>
                          <span className="font-['Noto_Sans'] text-[10px] text-white/30 block mt-[1px] leading-[14px]">{item.description}</span>
                          <span className="font-['Noto_Sans'] text-[10px] text-[#a57255]/50 italic block mt-[3px] leading-[13px] opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.tip}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer tip */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[16px] py-[12px] flex gap-[10px]">
            <Info size={14} className="text-[#a57255]/50 shrink-0 mt-[1px]" />
            <p className="font-['Noto_Sans'] text-[10px] text-white/30 leading-[16px]">
              IAs como ChatGPT, Perplexity e Gemini usam o índice do Google como fonte principal.
              Otimizar para SEO técnico é o primeiro passo do GEO.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}