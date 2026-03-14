/**
 * SeoPanel — Modulo completo de SEO para o Painel Administrativo
 * 
 * Features:
 * - Dashboard com score geral e por pagina
 * - Editor de Meta Tags (title, description, OG, Twitter Card, canonical, robots)
 * - Preview Google SERP e Open Graph
 * - Analise de conteudo em tempo real
 * - Checklist tecnico de SEO
 * - Gerador de JSON-LD (Schema.org)
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Search, Globe, FileText, CheckCircle2, AlertTriangle, XCircle,
  ChevronDown, ChevronRight, Eye, BarChart3, ListChecks, Code2,
  Smartphone, Monitor, ExternalLink, Info, TrendingUp, ArrowRight,
  CircleCheck, CircleX, CircleMinus, Image as ImageIcon, Link2,
  Heading1, Heading2, Hash, Type, Tag, Share2, Zap, ClipboardCopy, Check,
  History, Sparkles, RotateCcw, Clock, Loader2, Trash2, BookOpen
} from 'lucide-react';
import { callGeoAI, GEO_PROVIDERS_DEFAULT } from '../../data/geoDefaults';
import { SiteSeoEditor } from './SiteSeoEditor';
import { projectId } from '/utils/supabase/info';

/* ─── SEO History (localStorage) ─── */
const SEO_HISTORY_KEY = 'seo_history_v1';
const SEO_HISTORY_MAX = 30;

interface SeoHistoryEntry {
  timestamp: number;
  label: string;
  changes: { key: string; from: string; to: string }[];
  snapshot: Record<string, string>;
}

function loadSeoHistory(): SeoHistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(SEO_HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveSeoHistoryEntry(
  previousData: Record<string, string>,
  newData: Record<string, string>,
  label: string
): void {
  const seoKeys = Object.keys(newData).filter(k =>
    k.startsWith('seo.') || k.startsWith('site.')
  );

  const changes = seoKeys
    .filter(k => previousData[k] !== newData[k])
    .map(k => ({ key: k, from: previousData[k] || '', to: newData[k] || '' }));

  if (changes.length === 0) return;

  const entry: SeoHistoryEntry = {
    timestamp: Date.now(),
    label,
    changes,
    snapshot: Object.fromEntries(
      seoKeys.map(k => [k, newData[k] || ''])
    ),
  };

  const history = loadSeoHistory();
  history.unshift(entry);
  if (history.length > SEO_HISTORY_MAX) history.splice(SEO_HISTORY_MAX);
  localStorage.setItem(SEO_HISTORY_KEY, JSON.stringify(history));
}

function formatHistoryTimestamp(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString('pt-BR') + ' as ' +
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/* ─── Types ─── */
interface SeoPanelProps {
  data: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

interface PageSeoConfig {
  id: string;
  label: string;
  route: string;
  descriptionKey?: string; // key to read page content for analysis
}

interface SeoIssue {
  type: 'error' | 'warning' | 'info';
  page: string;
  message: string;
  fix: string;
}

interface SeoCheckResult {
  label: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
  score: number; // 0-100
}

/* ─── Site pages for SEO ─── */
const SEO_PAGES: PageSeoConfig[] = [
  { id: 'home', label: 'Home', route: '/' },
  { id: 'sobre', label: 'Sobre', route: '/sobre' },
  { id: 'areas', label: 'Areas de Atuacao', route: '/areas-de-atuacao' },
  { id: 'blog', label: 'Blog', route: '/blog' },
  { id: 'faq', label: 'FAQ', route: '/faq' },
  { id: 'contato', label: 'Contato', route: '/contato' },
  { id: 'parceiros', label: 'Rede de Parceiros', route: '/rede-de-parceiros' },
  { id: 'videos', label: 'Videos Educativos', route: '/videos-educativos' },
  { id: 'imoveis', label: 'Imoveis', route: '/imoveis' },
  { id: 'homologacao', label: 'Homologacao de Sentenca', route: '/homologacao-de-sentenca-estrangeira' },
  { id: 'divorcio', label: 'Divorcio', route: '/divorcio' },
  { id: 'guarda', label: 'Guarda e Convivencia', route: '/guarda-e-plano-de-convivencia' },
  { id: 'pensao', label: 'Pensao Alimenticia', route: '/pensao-alimenticia' },
  { id: 'inventario', label: 'Inventario e Sucessoes', route: '/inventario-e-sucessoes' },
  { id: 'uniao', label: 'Uniao Estavel', route: '/uniao-estavel' },
  { id: 'pmes', label: 'Consultoria PMEs', route: '/consultoria-empresarial-pmes' },
  { id: 'inpi', label: 'Registro de Marca INPI', route: '/registro-de-marca-inpi' },
];

/* ─── Tabs ─── */
type SeoTab = 'dashboard' | 'metatags' | 'analise' | 'checklist' | 'jsonld' | 'ia' | 'historico';

/* ─── SEO Analysis helpers ─── */
function analyzeTitleLength(title: string): SeoCheckResult {
  const len = title.length;
  if (len === 0) return { label: 'Titulo da pagina', status: 'fail', detail: 'Titulo nao definido', score: 0 };
  if (len < 30) return { label: 'Titulo da pagina', status: 'warning', detail: `Muito curto (${len} chars). Ideal: 50-60`, score: 40 };
  if (len >= 50 && len <= 60) return { label: 'Titulo da pagina', status: 'pass', detail: `Perfeito (${len} chars)`, score: 100 };
  if (len > 60 && len <= 70) return { label: 'Titulo da pagina', status: 'warning', detail: `Um pouco longo (${len} chars). Ideal: 50-60`, score: 70 };
  if (len > 70) return { label: 'Titulo da pagina', status: 'fail', detail: `Muito longo (${len} chars). Sera cortado no Google`, score: 30 };
  return { label: 'Titulo da pagina', status: 'warning', detail: `${len} chars — poderia ser mais longo (ideal: 50-60)`, score: 60 };
}

function analyzeDescriptionLength(desc: string): SeoCheckResult {
  const len = desc.length;
  if (len === 0) return { label: 'Meta description', status: 'fail', detail: 'Nao definida', score: 0 };
  if (len < 70) return { label: 'Meta description', status: 'warning', detail: `Muito curta (${len} chars). Ideal: 150-160`, score: 35 };
  if (len >= 120 && len <= 160) return { label: 'Meta description', status: 'pass', detail: `Otimo (${len} chars)`, score: 100 };
  if (len > 160 && len <= 200) return { label: 'Meta description', status: 'warning', detail: `Um pouco longa (${len} chars). Ideal: 150-160`, score: 65 };
  if (len > 200) return { label: 'Meta description', status: 'fail', detail: `Muito longa (${len} chars). Sera cortada`, score: 25 };
  return { label: 'Meta description', status: 'warning', detail: `${len} chars — poderia ser mais longa (ideal: 150-160)`, score: 55 };
}

function analyzeCanonical(url: string): SeoCheckResult {
  if (!url) return { label: 'URL Canonica', status: 'warning', detail: 'Nao definida — recomendado para evitar conteudo duplicado', score: 40 };
  if (url.startsWith('https://')) return { label: 'URL Canonica', status: 'pass', detail: 'Definida com HTTPS', score: 100 };
  return { label: 'URL Canonica', status: 'warning', detail: 'Definida mas sem HTTPS', score: 60 };
}

function analyzeOgImage(url: string): SeoCheckResult {
  if (!url) return { label: 'OG Image', status: 'warning', detail: 'Sem imagem para compartilhamento social', score: 30 };
  return { label: 'OG Image', status: 'pass', detail: 'Imagem de compartilhamento definida', score: 100 };
}

function analyzeRobots(robots: string): SeoCheckResult {
  if (!robots || robots === 'index, follow') return { label: 'Robots', status: 'pass', detail: 'Pagina indexavel', score: 100 };
  if (robots.includes('noindex')) return { label: 'Robots', status: 'warning', detail: 'Pagina configurada para NAO ser indexada', score: 50 };
  return { label: 'Robots', status: 'pass', detail: robots, score: 80 };
}

function analyzeKeywords(title: string, desc: string, keyword: string): SeoCheckResult {
  if (!keyword.trim()) return { label: 'Palavra-chave', status: 'warning', detail: 'Nenhuma palavra-chave principal definida', score: 20 };
  const kw = keyword.toLowerCase().trim();
  const titleHas = title.toLowerCase().includes(kw);
  const descHas = desc.toLowerCase().includes(kw);
  if (titleHas && descHas) return { label: 'Palavra-chave', status: 'pass', detail: `"${keyword}" presente no titulo e descricao`, score: 100 };
  if (titleHas) return { label: 'Palavra-chave', status: 'warning', detail: `"${keyword}" no titulo mas nao na descricao`, score: 65 };
  if (descHas) return { label: 'Palavra-chave', status: 'warning', detail: `"${keyword}" na descricao mas nao no titulo`, score: 55 };
  return { label: 'Palavra-chave', status: 'fail', detail: `"${keyword}" nao encontrada no titulo nem descricao`, score: 15 };
}

function getPageScore(checks: SeoCheckResult[]): number {
  if (checks.length === 0) return 0;
  return Math.round(checks.reduce((sum, c) => sum + c.score, 0) / checks.length);
}

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
  return 'Critico';
}

/* ─── Status Icon ─── */
function StatusIcon({ status }: { status: 'pass' | 'warning' | 'fail' }) {
  if (status === 'pass') return <CircleCheck size={15} className="text-emerald-500" />;
  if (status === 'warning') return <CircleMinus size={15} className="text-yellow-500" />;
  return <CircleX size={15} className="text-red-500" />;
}

/* ─── Circular Score ─── */
function CircularScore({ score, size = 100 }: { score: number; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={5} />
        <circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={color} strokeWidth={5}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-['Noto_Sans'] font-bold text-[22px] text-gray-900" style={{ fontSize: size * 0.22 }}>{score}</span>
        <span className="font-['Noto_Sans'] text-[9px] text-gray-400" style={{ fontSize: size * 0.09 }}>/ 100</span>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   MAIN SEO PANEL COMPONENT
   ═══════════════════════════════════════════════════════ */
export function SeoPanel({ data, onChange }: SeoPanelProps) {
  const [activeTab, setActiveTab] = useState<SeoTab>('dashboard');
  const [selectedPage, setSelectedPage] = useState('home');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['meta', 'og', 'keyword']));
  const [issuesCopied, setIssuesCopied] = useState(false);
  const [pageDropdownOpen, setPageDropdownOpen] = useState(false);
  const pageDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!pageDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (pageDropdownRef.current && !pageDropdownRef.current.contains(e.target as Node)) {
        setPageDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [pageDropdownOpen]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  /* ─── Read SEO field ─── */
  const getSeoVal = useCallback((pageId: string, field: string): string => {
    return data[`seo.${pageId}.${field}`] || '';
  }, [data]);

  const setSeoVal = useCallback((pageId: string, field: string, value: string) => {
    onChange(`seo.${pageId}.${field}`, value);
  }, [onChange]);

  /* ─── Per-page analysis ─── */
  const pageAnalysis = useMemo(() => {
    const results: Record<string, { checks: SeoCheckResult[]; score: number }> = {};
    for (const page of SEO_PAGES) {
      const title = getSeoVal(page.id, 'title');
      const desc = getSeoVal(page.id, 'description');
      const canonical = getSeoVal(page.id, 'canonical');
      const ogImage = getSeoVal(page.id, 'ogImage');
      const robots = getSeoVal(page.id, 'robots');
      const keyword = getSeoVal(page.id, 'keyword');

      const checks = [
        analyzeTitleLength(title),
        analyzeDescriptionLength(desc),
        analyzeCanonical(canonical),
        analyzeOgImage(ogImage),
        analyzeRobots(robots),
        analyzeKeywords(title, desc, keyword),
      ];
      results[page.id] = { checks, score: getPageScore(checks) };
    }
    return results;
  }, [getSeoVal]);

  /* ─── Global score ─── */
  const globalScore = useMemo(() => {
    const scores = Object.values(pageAnalysis).map(p => p.score);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [pageAnalysis]);

  /* ─── All issues ─── */
  const allIssues = useMemo(() => {
    const issues: SeoIssue[] = [];
    for (const page of SEO_PAGES) {
      const { checks } = pageAnalysis[page.id];
      for (const check of checks) {
        if (check.status === 'fail') {
          issues.push({ type: 'error', page: page.label, message: `${check.label}: ${check.detail}`, fix: `Edite as meta tags da pagina "${page.label}"` });
        } else if (check.status === 'warning') {
          issues.push({ type: 'warning', page: page.label, message: `${check.label}: ${check.detail}`, fix: `Otimize o campo em "${page.label}"` });
        }
      }
    }
    issues.sort((a, b) => (a.type === 'error' ? 0 : 1) - (b.type === 'error' ? 0 : 1));
    return issues;
  }, [pageAnalysis]);

  const filledPages = useMemo(() => SEO_PAGES.filter(p => getSeoVal(p.id, 'title')).length, [getSeoVal]);

  /* ─── Copy issues to clipboard ─── */
  const copyIssuesToClipboard = useCallback(() => {
    if (allIssues.length === 0) return;

    const errors = allIssues.filter(i => i.type === 'error');
    const warnings = allIssues.filter(i => i.type === 'warning');

    // Group by page
    const groupByPage = (items: SeoIssue[]) => {
      const map: Record<string, string[]> = {};
      for (const item of items) {
        if (!map[item.page]) map[item.page] = [];
        map[item.page].push(item.message);
      }
      return map;
    };

    const errorsByPage = groupByPage(errors);
    const warningsByPage = groupByPage(warnings);

    const lines: string[] = [];
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    lines.push('══════════════════════════════════════════');
    lines.push('  RELATÓRIO SEO — Sousa Araújo Advocacia');
    lines.push('══════════════════════════════════════════');
    lines.push('');
    lines.push(`Score geral: ${globalScore}/100 (${getScoreLabel(globalScore)})`);
    lines.push(`Páginas analisadas: ${SEO_PAGES.length}`);
    lines.push(`Meta tags preenchidas: ${filledPages}/${SEO_PAGES.length}`);
    lines.push(`Total de problemas: ${allIssues.length} (${errors.length} erro${errors.length !== 1 ? 's' : ''}, ${warnings.length} aviso${warnings.length !== 1 ? 's' : ''})`);
    lines.push(`Data: ${dateStr} às ${timeStr}`);
    lines.push('');

    // Errors section
    if (errors.length > 0) {
      lines.push('──────────────────────────────────────────');
      lines.push(`  ❌ ERROS CRÍTICOS (${errors.length})`);
      lines.push('──────────────────────────────────────────');
      lines.push('');
      for (const [page, msgs] of Object.entries(errorsByPage)) {
        lines.push(`▸ ${page}`);
        for (const msg of msgs) {
          lines.push(`    • ${msg}`);
        }
        lines.push('');
      }
    }

    // Warnings section
    if (warnings.length > 0) {
      lines.push('──────────────────────────────────────────');
      lines.push(`  ⚠️  AVISOS (${warnings.length})`);
      lines.push('──────────────────────────────────────────');
      lines.push('');
      for (const [page, msgs] of Object.entries(warningsByPage)) {
        lines.push(`▸ ${page}`);
        for (const msg of msgs) {
          lines.push(`    • ${msg}`);
        }
        lines.push('');
      }
    }

    // Per-page scores
    lines.push('──────────────────────────────────────────');
    lines.push('  📊 SCORE POR PÁGINA');
    lines.push('──────────────────────────────────────────');
    lines.push('');
    for (const page of SEO_PAGES) {
      const { score } = pageAnalysis[page.id];
      const bar = score >= 80 ? '✅' : score >= 50 ? '⚠️' : '❌';
      lines.push(`  ${bar}  ${score.toString().padStart(3, ' ')}/100  ${page.label} (${page.route})`);
    }
    lines.push('');
    lines.push('══════════════════════════════════════════');
    lines.push('  Gerado pelo Painel Admin — Módulo SEO');
    lines.push('══════════════════════════════════════════');

    navigator.clipboard.writeText(lines.join('\n'));
    setIssuesCopied(true);
    setTimeout(() => setIssuesCopied(false), 2500);
  }, [allIssues, globalScore, filledPages, pageAnalysis]);

  /* ─── Tabs config ─── */
  const tabs: { id: SeoTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={14} /> },
    { id: 'metatags', label: 'Meta Tags', icon: <Tag size={14} /> },
    { id: 'analise', label: 'Analise', icon: <Search size={14} /> },
    { id: 'checklist', label: 'Checklist', icon: <ListChecks size={14} /> },
    { id: 'jsonld', label: 'Schema.org', icon: <Code2 size={14} /> },
    { id: 'ia', label: 'Analise IA', icon: <Sparkles size={14} /> },
    { id: 'historico', label: 'Historico', icon: <History size={14} /> },
  ];

  return (
    <div className="space-y-[10px]">

      {/* Tab navigation — full width */}
      <div className="flex gap-[3px] bg-gray-50 rounded-lg p-[3px] border border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-[5px] px-[10px] py-[7px] rounded-md font-['Noto_Sans'] text-[11px] font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#a57255]/10 text-[#a57255] border border-[#a57255]/20'
                : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100 border border-transparent'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━��━━
          TAB: DASHBOARD
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'dashboard' && (
        <div className="space-y-[12px]">

          {/* Score overview — horizontal strip */}
          <div className="flex gap-[10px] items-stretch">
            {/* Main score — compact */}
            <div className="bg-gradient-to-br from-[#a57255]/10 via-white to-white border border-gray-200 rounded-xl px-[16px] py-[14px] flex items-center gap-[14px] shrink-0">
              <CircularScore score={globalScore} size={72} />
              <div className="flex flex-col">
                <span className="font-['Noto_Sans'] text-[13px] font-semibold" style={{ color: getScoreColor(globalScore) }}>
                  {getScoreLabel(globalScore)}
                </span>
                <span className="font-['Noto_Sans'] text-[10px] text-gray-400">Score SEO Geral</span>
              </div>
            </div>
            {/* Quick stats — fill remaining space */}
            <div className="flex-1 grid grid-cols-4 gap-[8px]">
              <QuickStat icon={<FileText size={14} />} label="Paginas" value={`${SEO_PAGES.length}`} sub="analisadas" />
              <QuickStat icon={<CheckCircle2 size={14} />} label="Meta tags" value={`${filledPages}/${SEO_PAGES.length}`} sub="preenchidas" color={filledPages === SEO_PAGES.length ? '#22c55e' : '#eab308'} />
              <QuickStat icon={<XCircle size={14} />} label="Erros" value={`${allIssues.filter(i => i.type === 'error').length}`} sub="criticos" color={allIssues.filter(i => i.type === 'error').length > 0 ? '#ef4444' : '#22c55e'} />
              <QuickStat icon={<AlertTriangle size={14} />} label="Avisos" value={`${allIssues.filter(i => i.type === 'warning').length}`} sub="otimizaveis" color={allIssues.filter(i => i.type === 'warning').length > 5 ? '#eab308' : '#22c55e'} />
            </div>
          </div>

          {/* Page scores + Issues — side by side */}
          <div className="flex gap-[10px] items-start">
            {/* Page scores — 2 column grid */}
            <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden min-w-0">
              <div className="px-[14px] py-[9px] border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-['Noto_Sans'] text-[12px] font-semibold text-gray-900 flex items-center gap-[6px]">
                  <TrendingUp size={13} className="text-[#a57255]" />
                  Score por Pagina
                </h3>
                <span className="font-['Noto_Sans'] text-[10px] text-gray-400">{SEO_PAGES.length} paginas</span>
              </div>
              <div className="grid grid-cols-3">
                {SEO_PAGES.map((page, idx) => {
                  const { score, checks } = pageAnalysis[page.id];
                  const errors = checks.filter(c => c.status === 'fail').length;
                  const warnings = checks.filter(c => c.status === 'warning').length;
                  const col = idx % 3;
                  const remainder = SEO_PAGES.length % 3;
                  const isLastRow = idx >= SEO_PAGES.length - (remainder === 0 ? 3 : remainder);
                  return (
                    <button
                      key={page.id}
                      onClick={() => { setSelectedPage(page.id); setActiveTab('metatags'); }}
                      className={`flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-gray-50 transition-colors text-left group ${col < 2 ? 'border-r border-gray-100' : ''} ${!isLastRow ? 'border-b border-gray-100' : ''}`}
                    >
                      <CircularScore score={score} size={28} />
                      <div className="flex-1 min-w-0">
                        <span className="font-['Noto_Sans'] text-[11px] text-gray-900 font-medium truncate block">{page.label}</span>
                        <div className="flex items-center gap-[6px] mt-[1px]">
                          {errors > 0 && <span className="font-['Noto_Sans'] text-[9px] text-red-400">{errors} erro{errors > 1 ? 's' : ''}</span>}
                          {warnings > 0 && <span className="font-['Noto_Sans'] text-[9px] text-yellow-400">{warnings} aviso{warnings > 1 ? 's' : ''}</span>}
                          {errors === 0 && warnings === 0 && <span className="font-['Noto_Sans'] text-[9px] text-emerald-400">OK</span>}
                        </div>
                      </div>
                      {/* Score bar — compact */}
                      <div className="w-[50px] shrink-0">
                        <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Issues panel — right side */}
            {allIssues.length > 0 && (
              <div className="w-[340px] shrink-0 bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-[14px] py-[9px] border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-['Noto_Sans'] text-[12px] font-semibold text-gray-900 flex items-center gap-[6px]">
                    <AlertTriangle size={13} className="text-yellow-500" />
                    Problemas ({allIssues.length})
                  </h3>
                  <button
                    onClick={copyIssuesToClipboard}
                    className={`flex items-center gap-[4px] px-[8px] py-[4px] rounded-md font-['Noto_Sans'] text-[10px] font-medium transition-all ${
                      issuesCopied
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-gray-50 text-gray-400 border border-gray-200 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    title="Copiar relatório completo de problemas"
                  >
                    {issuesCopied ? <Check size={11} /> : <ClipboardCopy size={11} />}
                    {issuesCopied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
                  {allIssues.slice(0, 20).map((issue, i) => (
                    <div key={i} className="flex items-start gap-[8px] px-[12px] py-[7px]">
                      {issue.type === 'error' ? <XCircle size={12} className="text-red-500 shrink-0 mt-[2px]" /> : <AlertTriangle size={12} className="text-yellow-500 shrink-0 mt-[2px]" />}
                      <div className="flex-1 min-w-0">
                        <span className="font-['Noto_Sans'] text-[10px] text-gray-600 leading-[14px] block">{issue.message}</span>
                        <span className="font-['Noto_Sans'] text-[9px] text-gray-400">{issue.page}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: META TAGS EDITOR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'metatags' && (
        <div className="space-y-[10px]">

          {/* Page selector — custom dropdown with scores */}
          <div className="flex items-center gap-[10px]">
            <span className="font-['Noto_Sans'] text-[11px] text-gray-400 shrink-0">Pagina:</span>
            <div ref={pageDropdownRef} className="relative flex-1">
              <button
                onClick={() => setPageDropdownOpen(!pageDropdownOpen)}
                className={`w-full h-[36px] bg-white border rounded-lg px-[12px] font-['Noto_Sans'] text-[12px] text-gray-900 flex items-center justify-between transition-colors cursor-pointer ${
                  pageDropdownOpen ? 'border-[#a57255]/40' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-[8px] min-w-0">
                  {(() => {
                    const score = pageAnalysis[selectedPage]?.score || 0;
                    const color = getScoreColor(score);
                    return (
                      <>
                        <span className="font-['Noto_Sans'] text-[10px] font-bold tabular-nums shrink-0 w-[22px] text-center" style={{ color }}>{score}</span>
                        <span className="truncate">{SEO_PAGES.find(p => p.id === selectedPage)?.label}</span>
                        <span className="text-gray-400 text-[10px] shrink-0">{SEO_PAGES.find(p => p.id === selectedPage)?.route}</span>
                      </>
                    );
                  })()}
                </div>
                <ChevronDown size={13} className={`text-gray-400 shrink-0 transition-transform duration-200 ${pageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {pageDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-[4px] z-50 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-[360px] overflow-y-auto painel-scrollbar">
                  {/* Group: Paginas */}
                  <div className="px-[10px] pt-[8px] pb-[4px]">
                    <span className="font-['Noto_Sans'] text-[9px] tracking-[0.6px] text-gray-400 uppercase">Paginas</span>
                  </div>
                  {SEO_PAGES.filter(p => !['homologacao','divorcio','guarda','pensao','inventario','uniao','pmes','inpi'].includes(p.id)).map(page => {
                    const score = pageAnalysis[page.id]?.score || 0;
                    const color = getScoreColor(score);
                    const isSelected = selectedPage === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => { setSelectedPage(page.id); setPageDropdownOpen(false); }}
                        className={`w-full flex items-center gap-[8px] px-[12px] py-[7px] text-left transition-all ${
                          isSelected
                            ? 'bg-[#a57255]/10 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {/* Mini score circle */}
                        <div className="w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: `${color}40` }}>
                          <span className="font-['Noto_Sans'] text-[9px] font-bold tabular-nums" style={{ color }}>{score}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-['Noto_Sans'] text-[11px] block truncate">{page.label}</span>
                          <span className="font-['Noto_Sans'] text-[9px] text-gray-400 block">{page.route}</span>
                        </div>
                        {/* Status dots */}
                        <div className="flex gap-[2px] shrink-0">
                          {pageAnalysis[page.id]?.checks.map((check, ci) => (
                            <div
                              key={ci}
                              className="w-[5px] h-[5px] rounded-full"
                              style={{ backgroundColor: check.status === 'pass' ? '#22c55e' : check.status === 'warning' ? '#eab308' : '#ef4444', opacity: 0.6 }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}

                  {/* Group: Servicos */}
                  <div className="px-[10px] pt-[10px] pb-[4px] border-t border-gray-100 mt-[2px]">
                    <span className="font-['Noto_Sans'] text-[9px] tracking-[0.6px] text-gray-400 uppercase">Servicos</span>
                  </div>
                  {SEO_PAGES.filter(p => ['homologacao','divorcio','guarda','pensao','inventario','uniao','pmes','inpi'].includes(p.id)).map(page => {
                    const score = pageAnalysis[page.id]?.score || 0;
                    const color = getScoreColor(score);
                    const isSelected = selectedPage === page.id;
                    return (
                      <button
                        key={page.id}
                        onClick={() => { setSelectedPage(page.id); setPageDropdownOpen(false); }}
                        className={`w-full flex items-center gap-[8px] px-[12px] py-[7px] text-left transition-all ${
                          isSelected
                            ? 'bg-[#a57255]/10 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <div className="w-[24px] h-[24px] rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: `${color}40` }}>
                          <span className="font-['Noto_Sans'] text-[9px] font-bold tabular-nums" style={{ color }}>{score}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-['Noto_Sans'] text-[11px] block truncate">{page.label}</span>
                          <span className="font-['Noto_Sans'] text-[9px] text-gray-400 block">{page.route}</span>
                        </div>
                        <div className="flex gap-[2px] shrink-0">
                          {pageAnalysis[page.id]?.checks.map((check, ci) => (
                            <div
                              key={ci}
                              className="w-[5px] h-[5px] rounded-full"
                              style={{ backgroundColor: check.status === 'pass' ? '#22c55e' : check.status === 'warning' ? '#eab308' : '#ef4444', opacity: 0.6 }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                  <div className="h-[4px]" />
                </div>
              )}
            </div>
            {/* Score badge */}
            <div className="shrink-0 flex items-center gap-[6px] px-[10px] py-[6px] rounded-lg border border-gray-200" style={{ borderColor: `${getScoreColor(pageAnalysis[selectedPage]?.score || 0)}30` }}>
              <CircularScore score={pageAnalysis[selectedPage]?.score || 0} size={28} />
              <span className="font-['Noto_Sans'] text-[10px] font-medium" style={{ color: getScoreColor(pageAnalysis[selectedPage]?.score || 0) }}>
                {getScoreLabel(pageAnalysis[selectedPage]?.score || 0)}
              </span>
            </div>
          </div>

          {/* 2-column layout: Forms left, Previews+Diagnostics right */}
          <div className="flex gap-[12px] items-start">
            {/* Left — Form sections */}
            <div className="flex-1 min-w-0 space-y-[8px]">
              {/* Meta Tags Section */}
              <CollapsibleSection
                id="meta"
                title="Meta Tags Basicas"
                icon={<Tag size={14} />}
                expanded={expandedSections.has('meta')}
                onToggle={() => toggleSection('meta')}
              >
                <div className="space-y-[10px]">
                  <div className="grid grid-cols-2 gap-[10px]">
                    <SeoField
                      label="Titulo da Pagina (title tag)"
                      help="Aparece na aba do navegador e nos resultados do Google. Ideal: 50-60 caracteres."
                      value={getSeoVal(selectedPage, 'title')}
                      onChange={v => setSeoVal(selectedPage, 'title', v)}
                      placeholder={`${SEO_PAGES.find(p => p.id === selectedPage)?.label} | Sousa Araujo Advocacia`}
                      maxRecommended={60}
                      charWarning={70}
                    />
                    <SeoField
                      label="Palavra-chave Principal"
                      help="Termo principal pelo qual esta pagina deve ser encontrada."
                      value={getSeoVal(selectedPage, 'keyword')}
                      onChange={v => setSeoVal(selectedPage, 'keyword', v)}
                      placeholder="ex: advocacia em brasilia"
                    />
                  </div>
                  <SeoField
                    label="Meta Description"
                    help="Texto exibido nos resultados do Google abaixo do titulo. Ideal: 150-160 caracteres."
                    value={getSeoVal(selectedPage, 'description')}
                    onChange={v => setSeoVal(selectedPage, 'description', v)}
                    placeholder="Descreva o conteudo desta pagina de forma atrativa para o usuario..."
                    multiline
                    maxRecommended={160}
                    charWarning={200}
                  />
                  <div className="grid grid-cols-2 gap-[10px]">
                    <SeoField
                      label="URL Canonica"
                      help="URL preferida para evitar conteudo duplicado."
                      value={getSeoVal(selectedPage, 'canonical')}
                      onChange={v => setSeoVal(selectedPage, 'canonical', v)}
                      placeholder={`https://sousaaraujo.adv.br${SEO_PAGES.find(p => p.id === selectedPage)?.route || ''}`}
                    />
                    <div>
                      <label className="font-['Noto_Sans'] text-[11px] text-gray-500 mb-[4px] block">Robots (indexacao)</label>
                      <select
                        value={getSeoVal(selectedPage, 'robots') || 'index, follow'}
                        onChange={e => setSeoVal(selectedPage, 'robots', e.target.value)}
                        className="w-full h-[36px] bg-white border border-gray-200 rounded-lg px-[12px] font-['Noto_Sans'] text-[12px] text-gray-800 focus:border-[#a57255]/40 focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="index, follow">index, follow (padrao)</option>
                        <option value="noindex, follow">noindex, follow</option>
                        <option value="index, nofollow">index, nofollow</option>
                        <option value="noindex, nofollow">noindex, nofollow</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              {/* Open Graph Section */}
              <CollapsibleSection
                id="og"
                title="Open Graph (Redes Sociais)"
                icon={<Share2 size={14} />}
                expanded={expandedSections.has('og')}
                onToggle={() => toggleSection('og')}
              >
                <div className="space-y-[10px]">
                  <div className="grid grid-cols-2 gap-[10px]">
                    <SeoField label="OG Title" help="Titulo ao compartilhar no Facebook, LinkedIn, WhatsApp." value={getSeoVal(selectedPage, 'ogTitle')} onChange={v => setSeoVal(selectedPage, 'ogTitle', v)} placeholder={getSeoVal(selectedPage, 'title') || 'Mesmo do titulo'} />
                    <SeoField label="OG Type" help="Tipo do conteudo. Padrao: website" value={getSeoVal(selectedPage, 'ogType')} onChange={v => setSeoVal(selectedPage, 'ogType', v)} placeholder="website" />
                  </div>
                  <SeoField label="OG Description" help="Descricao exibida nas redes sociais." value={getSeoVal(selectedPage, 'ogDescription')} onChange={v => setSeoVal(selectedPage, 'ogDescription', v)} placeholder={getSeoVal(selectedPage, 'description') || 'Mesmo da meta description'} multiline />
                  <SeoField label="OG Image URL" help="Imagem exibida nas redes sociais. Recomendado: 1200x630px." value={getSeoVal(selectedPage, 'ogImage')} onChange={v => setSeoVal(selectedPage, 'ogImage', v)} placeholder="https://sousaaraujo.adv.br/og-image.jpg" />
                </div>
              </CollapsibleSection>

              {/* Twitter Card */}
              <CollapsibleSection
                id="twitter"
                title="Twitter Card"
                icon={<Hash size={14} />}
                expanded={expandedSections.has('twitter')}
                onToggle={() => toggleSection('twitter')}
              >
                <div className="space-y-[10px]">
                  <div className="grid grid-cols-3 gap-[10px]">
                    <div>
                      <label className="font-['Noto_Sans'] text-[11px] text-gray-500 mb-[4px] block">Card Type</label>
                      <select
                        value={getSeoVal(selectedPage, 'twitterCard') || 'summary_large_image'}
                        onChange={e => setSeoVal(selectedPage, 'twitterCard', e.target.value)}
                        className="w-full h-[36px] bg-white border border-gray-200 rounded-lg px-[12px] font-['Noto_Sans'] text-[12px] text-gray-800 focus:border-[#a57255]/40 focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="summary_large_image">summary_large_image</option>
                        <option value="summary">summary</option>
                      </select>
                    </div>
                    <SeoField label="Twitter Title" value={getSeoVal(selectedPage, 'twitterTitle')} onChange={v => setSeoVal(selectedPage, 'twitterTitle', v)} placeholder={getSeoVal(selectedPage, 'ogTitle') || 'Herda do OG Title'} />
                    <SeoField label="Twitter Description" value={getSeoVal(selectedPage, 'twitterDescription')} onChange={v => setSeoVal(selectedPage, 'twitterDescription', v)} placeholder={getSeoVal(selectedPage, 'ogDescription') || 'Herda do OG Description'} />
                  </div>
                </div>
              </CollapsibleSection>
            </div>

            {/* Right — Previews + Diagnostics sticky */}
            <div className="w-[380px] shrink-0 space-y-[8px] sticky top-[20px]">
              {/* SERP Preview with metrics */}
              <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
                <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-600 mb-[8px] flex items-center gap-[6px]">
                  <Eye size={12} className="text-[#a57255]" />
                  Preview Google (SERP)
                </h3>
                {(() => {
                  const serpTitle = getSeoVal(selectedPage, 'title');
                  const serpDesc = getSeoVal(selectedPage, 'description');
                  const serpKeyword = getSeoVal(selectedPage, 'keyword');
                  const serpUrl = SEO_PAGES.find(p => p.id === selectedPage)?.route || '/';
                  const titleLen = serpTitle.length;
                  const descLen = serpDesc.length;
                  const titleTruncated = titleLen > 60;
                  const descTruncated = descLen > 160;
                  const keywordInTitle = serpKeyword && serpTitle.toLowerCase().includes(serpKeyword.toLowerCase().trim());

                  const titleColor = titleLen === 0 ? '#ef4444' : (titleLen >= 50 && titleLen <= 60) ? '#22c55e' : (titleLen >= 30 && titleLen <= 70) ? '#eab308' : '#ef4444';
                  const descColor = descLen === 0 ? '#ef4444' : (descLen >= 120 && descLen <= 160) ? '#22c55e' : (descLen >= 70 && descLen <= 200) ? '#eab308' : '#ef4444';

                  return (
                    <>
                      <div className="bg-white rounded-lg p-[16px]">
                        {/* URL */}
                        <div className="flex items-center gap-[4px] mb-[4px]">
                          <div className="w-[20px] h-[20px] rounded-full bg-[#f0f0f0] flex items-center justify-center">
                            <Globe size={10} className="text-gray-500" />
                          </div>
                          <div>
                            <span className="font-sans text-[12px] text-[#202124]">Sousa Araujo Advocacia</span>
                            <div className="font-sans text-[11px] text-[#006621]">sousaaraujo.adv.br › {serpUrl.replace(/^\//, '').replace(/\//g, ' › ') || 'inicio'}</div>
                          </div>
                        </div>
                        {/* Title */}
                        <h3 className="font-sans text-[20px] text-[#1a0dab] leading-[26px] mb-[4px] cursor-pointer hover:underline" style={{ maxWidth: 600 }}>
                          {serpTitle ? (
                            <>
                              {serpTitle.slice(0, 60)}{titleTruncated ? '...' : ''}
                            </>
                          ) : (
                            <span className="text-red-500 text-[16px]">(nao definido)</span>
                          )}
                        </h3>
                        {titleTruncated && (
                          <span className="inline-block bg-yellow-100 text-yellow-700 text-[9px] font-medium px-[5px] py-[1px] rounded mb-[4px]">Cortado pelo Google</span>
                        )}
                        {/* Description */}
                        <p className="font-sans text-[14px] text-[#545454] leading-[22px] line-clamp-2">
                          {serpDesc ? (
                            <>
                              {serpDesc.slice(0, 160)}{descTruncated ? '...' : ''}
                            </>
                          ) : (
                            <span className="text-red-500 text-[12px]">(nao definido)</span>
                          )}
                        </p>
                        {descTruncated && (
                          <span className="inline-block bg-yellow-100 text-yellow-700 text-[9px] font-medium px-[5px] py-[1px] rounded mt-[4px]">Cortada pelo Google</span>
                        )}
                      </div>

                      {/* SERP Metrics */}
                      <div className="grid grid-cols-3 gap-[6px] mt-[8px]">
                        <div className="bg-gray-50 rounded-lg px-[8px] py-[6px] text-center">
                          <div className="font-['Noto_Sans'] text-[10px] text-gray-400 mb-[2px]">Title</div>
                          <div className="font-['Noto_Sans'] text-[13px] font-bold" style={{ color: titleColor }}>
                            {titleLen}/60
                          </div>
                          <div className="font-['Noto_Sans'] text-[8px] text-gray-400">chars</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-[8px] py-[6px] text-center">
                          <div className="font-['Noto_Sans'] text-[10px] text-gray-400 mb-[2px]">Description</div>
                          <div className="font-['Noto_Sans'] text-[13px] font-bold" style={{ color: descColor }}>
                            {descLen}/160
                          </div>
                          <div className="font-['Noto_Sans'] text-[8px] text-gray-400">chars</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg px-[8px] py-[6px] text-center">
                          <div className="font-['Noto_Sans'] text-[10px] text-gray-400 mb-[2px]">Keyword</div>
                          <div className="font-['Noto_Sans'] text-[12px] font-bold" style={{ color: !serpKeyword ? '#9ca3af' : keywordInTitle ? '#22c55e' : '#ef4444' }}>
                            {!serpKeyword ? '—' : keywordInTitle ? '✓ Presente' : '✗ Ausente'}
                          </div>
                          <div className="font-['Noto_Sans'] text-[8px] text-gray-400">no title</div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Social Preview */}
              <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
                <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-600 mb-[8px] flex items-center gap-[6px]">
                  <Share2 size={12} className="text-[#a57255]" />
                  Preview Redes Sociais (OG)
                </h3>
                <OgPreview
                  title={getSeoVal(selectedPage, 'ogTitle') || getSeoVal(selectedPage, 'title') || SEO_PAGES.find(p => p.id === selectedPage)?.label || ''}
                  description={getSeoVal(selectedPage, 'ogDescription') || getSeoVal(selectedPage, 'description') || ''}
                  image={getSeoVal(selectedPage, 'ogImage')}
                  url={`sousaaraujo.adv.br${SEO_PAGES.find(p => p.id === selectedPage)?.route || ''}`}
                />
              </div>

              {/* Diagnostics */}
              <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
                <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-600 mb-[8px] flex items-center gap-[6px]">
                  <Zap size={12} className="text-[#a57255]" />
                  Diagnostico
                </h3>
                <div className="space-y-[3px]">
                  {pageAnalysis[selectedPage]?.checks.map((check, i) => (
                    <div key={i} className="flex items-center gap-[6px] py-[4px] px-[8px] rounded-lg bg-gray-50">
                      <StatusIcon status={check.status} />
                      <span className="font-['Noto_Sans'] text-[10px] text-gray-600 font-medium shrink-0">{check.label}</span>
                      <span className="font-['Noto_Sans'] text-[10px] text-gray-400 flex-1 truncate">{check.detail}</span>
                      <span className="font-['Noto_Sans'] text-[10px] font-semibold shrink-0" style={{ color: getScoreColor(check.score) }}>{check.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: ANALISE DE CONTEUDO
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'analise' && (
        <ContentAnalysisTab data={data} getSeoVal={getSeoVal} pageAnalysis={pageAnalysis} />
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: CHECKLIST TECNICO
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'checklist' && (
        <TechnicalChecklist data={data} getSeoVal={getSeoVal} globalScore={globalScore} />
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: SCHEMA.ORG JSON-LD
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'jsonld' && (
        <JsonLdTab data={data} getSeoVal={getSeoVal} onChange={onChange} />
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: ANALISE IA
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'ia' && (
        <IaAnalysisTab
          data={data}
          getSeoVal={getSeoVal}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          pageAnalysis={pageAnalysis}
          onChange={onChange}
        />
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: HISTORICO
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'historico' && (
        <SeoHistoryTab data={data} onChange={onChange} />
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════ */

/* ─── Quick Stat Card ─── */
function QuickStat({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-[12px] py-[10px] flex flex-col justify-center min-w-0">
      <div className="flex items-center gap-[6px] mb-[4px]">
        <span className="text-[#a57255]/60 shrink-0">{icon}</span>
        <span className="font-['Noto_Sans'] text-[10px] text-gray-400 truncate">{label}</span>
      </div>
      <div className="flex items-end gap-[4px]">
        <span className="font-['Noto_Sans'] text-[20px] font-bold leading-none" style={{ color: color || '#111' }}>{value}</span>
        <span className="font-['Noto_Sans'] text-[9px] text-gray-400 mb-[2px] truncate">{sub}</span>
      </div>
    </div>
  );
}

/* ─── Collapsible Section ─── */
function CollapsibleSection({ id, title, icon, expanded, onToggle, children }: {
  id: string; title: string; icon: React.ReactNode; expanded: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-[8px] px-[16px] py-[12px] hover:bg-gray-50 transition-colors">
        {expanded ? <ChevronDown size={13} className="text-gray-400" /> : <ChevronRight size={13} className="text-gray-400" />}
        <span className="text-[#a57255]/60">{icon}</span>
        <span className="font-['Noto_Sans'] text-[12px] font-semibold text-gray-900">{title}</span>
      </button>
      {expanded && <div className="px-[16px] pb-[16px]">{children}</div>}
    </div>
  );
}

/* ─── SEO Text Field ─── */
function SeoField({ label, help, value, onChange, placeholder, multiline, maxRecommended, charWarning }: {
  label: string; help?: string; value: string; onChange: (v: string) => void; placeholder?: string;
  multiline?: boolean; maxRecommended?: number; charWarning?: number;
}) {
  const len = value.length;
  const isOver = charWarning ? len > charWarning : false;
  const isOptimal = maxRecommended ? (len >= (maxRecommended - 15) && len <= maxRecommended) : false;

  return (
    <div>
      <div className="flex items-center justify-between mb-[4px]">
        <label className="font-['Noto_Sans'] text-[11px] text-gray-500">{label}</label>
        {maxRecommended && (
          <span className={`font-['Noto_Sans'] text-[10px] ${isOver ? 'text-red-500' : isOptimal ? 'text-emerald-500' : 'text-gray-400'}`}>
            {len} / {maxRecommended}
          </span>
        )}
      </div>
      {help && <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mb-[6px]">{help}</p>}
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-white border border-gray-200 rounded-lg px-[12px] py-[8px] font-['Noto_Sans'] text-[12px] text-gray-800 placeholder:text-gray-300 focus:border-[#a57255]/40 focus:outline-none resize-none transition-colors"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-[36px] bg-white border border-gray-200 rounded-lg px-[12px] font-['Noto_Sans'] text-[12px] text-gray-800 placeholder:text-gray-300 focus:border-[#a57255]/40 focus:outline-none transition-colors"
        />
      )}
      {/* Character bar */}
      {maxRecommended && len > 0 && (
        <div className="mt-[4px] h-[2px] bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(100, (len / (charWarning || maxRecommended)) * 100)}%`,
              backgroundColor: isOver ? '#ef4444' : isOptimal ? '#22c55e' : '#eab308'
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Google SERP Preview (legacy, replaced by enhanced inline preview) ─── */

/* ─── OG Preview ─── */
function OgPreview({ title, description, image, url }: { title: string; description: string; image: string; url: string }) {
  return (
    <div className="rounded-lg border border-[#dadde1] overflow-hidden bg-[#f0f2f5]">
      {image ? (
        <div className="w-full h-[140px] bg-[#e4e6eb]">
          <img src={image} alt="OG" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-sm">Imagem nao carregou</div>'; }} />
        </div>
      ) : (
        <div className="w-full h-[140px] bg-[#e4e6eb] flex items-center justify-center">
          <ImageIcon size={32} className="text-gray-300" />
        </div>
      )}
      <div className="px-[12px] py-[10px] bg-[#f0f2f5]">
        <div className="font-['Arial'] text-[11px] text-[#606770] uppercase tracking-wide">{url}</div>
        <div className="font-['Arial'] text-[15px] text-[#1d2129] font-semibold leading-[20px] mt-[2px] line-clamp-2">{title || 'Titulo nao definido'}</div>
        <div className="font-['Arial'] text-[13px] text-[#606770] leading-[18px] mt-[2px] line-clamp-2">{description || 'Descricao nao definida'}</div>
      </div>
    </div>
  );
}


/* ─── Readability Analysis (client-side, no API) ─── */
interface ReadabilityResult {
  score: number;
  level: 'facil' | 'medio' | 'dificil';
  avgWordsPerSentence: number;
  avgCharsPerWord: number;
  estimatedReadTime: number;
  longSentences: number;
  totalWords: number;
  checks: { label: string; status: 'pass' | 'warning' | 'fail'; detail: string }[];
}

function analyzeReadability(text: string): ReadabilityResult {
  if (!text.trim()) {
    return { score: 0, level: 'dificil', avgWordsPerSentence: 0, avgCharsPerWord: 0, estimatedReadTime: 0, longSentences: 0, totalWords: 0, checks: [] };
  }
  const sentences = text.replace(/\n+/g, ' ').split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
  const words = text.replace(/[^a-zA-ZÀ-ú\s]/g, ' ').split(/\s+/).filter(w => w.length > 1);
  const totalWords = words.length;
  const totalSentences = Math.max(sentences.length, 1);
  const avgWordsPerSentence = Math.round(totalWords / totalSentences);
  const avgCharsPerWord = Math.round(words.reduce((acc, w) => acc + w.length, 0) / Math.max(words.length, 1));
  const longSentences = sentences.filter(s => s.split(/\s+/).length > 25).length;
  const estimatedReadTime = Math.max(1, Math.round(totalWords / 200));
  const checks: ReadabilityResult['checks'] = [];

  if (avgWordsPerSentence <= 15) checks.push({ label: 'Comprimento das frases', status: 'pass', detail: `Média de ${avgWordsPerSentence} palavras por frase — ótimo` });
  else if (avgWordsPerSentence <= 22) checks.push({ label: 'Comprimento das frases', status: 'warning', detail: `Média de ${avgWordsPerSentence} palavras por frase — ideal é abaixo de 15` });
  else checks.push({ label: 'Comprimento das frases', status: 'fail', detail: `Média de ${avgWordsPerSentence} palavras por frase — texto muito denso` });

  if (longSentences === 0) checks.push({ label: 'Frases longas (+25 palavras)', status: 'pass', detail: 'Nenhuma frase excessivamente longa detectada' });
  else if (longSentences <= 2) checks.push({ label: 'Frases longas (+25 palavras)', status: 'warning', detail: `${longSentences} frase(s) muito longa(s) — considere quebrar` });
  else checks.push({ label: 'Frases longas (+25 palavras)', status: 'fail', detail: `${longSentences} frases muito longas — dificulta leitura no mobile` });

  if (totalWords >= 300) checks.push({ label: 'Volume de conteúdo', status: 'pass', detail: `${totalWords} palavras — suficiente para indexação` });
  else if (totalWords >= 150) checks.push({ label: 'Volume de conteúdo', status: 'warning', detail: `${totalWords} palavras — recomendado mínimo 300` });
  else checks.push({ label: 'Volume de conteúdo', status: 'fail', detail: `${totalWords} palavras — conteúdo muito escasso para SEO` });

  if (avgCharsPerWord <= 5) checks.push({ label: 'Complexidade das palavras', status: 'pass', detail: 'Vocabulário acessível ao público geral' });
  else if (avgCharsPerWord <= 7) checks.push({ label: 'Complexidade das palavras', status: 'warning', detail: 'Vocabulário moderadamente técnico' });
  else checks.push({ label: 'Complexidade das palavras', status: 'fail', detail: 'Vocabulário muito técnico — pode afastar leitores leigos' });

  const passCount = checks.filter(c => c.status === 'pass').length;
  const score = Math.round((passCount / checks.length) * 100);
  const level: ReadabilityResult['level'] = score >= 75 ? 'facil' : score >= 40 ? 'medio' : 'dificil';
  return { score, level, avgWordsPerSentence, avgCharsPerWord, estimatedReadTime, longSentences, totalWords, checks };
}


/* ─── Content Analysis Tab ─── */
function ContentAnalysisTab({ data, getSeoVal, pageAnalysis }: { data: Record<string, string>; getSeoVal: (pageId: string, field: string) => string; pageAnalysis: Record<string, { checks: SeoCheckResult[]; score: number }> }) {
  
  // Analyze panel content for SEO signals
  const contentAudit = useMemo(() => {
    const results: { pageId: string; label: string; images: number; imagesWithoutAlt: number; textLength: number; hasH1: boolean; keyword: string; keywordCount: number; readability: ReadabilityResult }[] = [];
    
    for (const page of SEO_PAGES) {
      // Collect all text content for this page from panel data
      const pagePrefix = page.id === 'home' ? 'home.' : page.id === 'sobre' ? 'sobre.' : page.id === 'areas' ? 'areas.' : page.id === 'blog' ? 'blog.' : page.id === 'faq' ? 'faq.' : page.id === 'contato' ? 'contato.' : page.id === 'parceiros' ? 'parceiros.' : page.id === 'videos' ? 'videos.' : page.id === 'imoveis' ? 'imoveis.' : `lp-${page.id}.`;
      
      let textContent = '';
      let imageCount = 0;
      
      for (const [key, val] of Object.entries(data)) {
        if (key.startsWith(pagePrefix) && val) {
          if (key.includes('image') || key.includes('img') || key.includes('Image') || key.includes('bgImage') || key.includes('photo')) {
            imageCount++;
          } else {
            textContent += ' ' + val;
          }
        }
      }
      
      const keyword = getSeoVal(page.id, 'keyword').toLowerCase();
      const keywordCount = keyword ? (textContent.toLowerCase().match(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'))?.length || 0) : 0;
      const hasH1 = Object.keys(data).some(k => k.startsWith(pagePrefix) && (k.includes('title') || k.includes('heading')) && data[k]?.length > 10);
      const readability = analyzeReadability(textContent);
      
      results.push({
        pageId: page.id,
        label: page.label,
        images: imageCount,
        imagesWithoutAlt: 0,
        textLength: textContent.trim().length,
        hasH1,
        keyword,
        keywordCount,
        readability,
      });
    }
    return results;
  }, [data, getSeoVal]);

  return (
    <div className="space-y-[10px]">
      {/* Table + header combined */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-['Noto_Sans'] text-[12px] font-semibold text-gray-900 flex items-center gap-[6px]">
            <Search size={13} className="text-[#a57255]" />
            Analise de Conteudo por Pagina
          </h3>
          <span className="font-['Noto_Sans'] text-[10px] text-gray-400">Conteudo detectado via painel</span>
        </div>
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_80px_1.5fr_60px] gap-[8px] px-[14px] py-[7px] border-b border-gray-100 text-gray-400 font-['Noto_Sans'] text-[9px] font-semibold uppercase tracking-wider">
          <span>Pagina</span>
          <span>Conteudo</span>
          <span>Imagens</span>
          <span>Keyword</span>
          <span className="text-right">Score</span>
        </div>
        <div className="divide-y divide-gray-100">
          {contentAudit.map(item => {
            const score = pageAnalysis[item.pageId]?.score || 0;
            const contentStatus = item.textLength > 500 ? 'pass' : item.textLength > 100 ? 'warning' : 'fail';
            return (
              <div key={item.pageId} className="grid grid-cols-[2fr_1fr_80px_1.5fr_60px] gap-[8px] px-[14px] py-[7px] items-center hover:bg-gray-50 transition-colors">
                <span className="font-['Noto_Sans'] text-[11px] text-gray-900 font-medium truncate">{item.label}</span>
                <div className="flex items-center gap-[4px]">
                  <StatusIcon status={contentStatus} />
                  <span className="font-['Noto_Sans'] text-[10px] text-gray-500">{item.textLength > 0 ? `${item.textLength}` : '—'}</span>
                </div>
                <span className="font-['Noto_Sans'] text-[10px] text-gray-500">{item.images}</span>
                <div className="flex items-center gap-[3px] min-w-0">
                  {item.keyword ? (
                    <>
                      <span className={`font-['Noto_Sans'] text-[10px] shrink-0 ${item.keywordCount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {item.keywordCount}x
                      </span>
                      <span className="font-['Noto_Sans'] text-[9px] text-gray-400 truncate">{item.keyword}</span>
                    </>
                  ) : (
                    <span className="font-['Noto_Sans'] text-[10px] text-gray-300">—</span>
                  )}
                </div>
                <span className="font-['Noto_Sans'] text-[11px] font-semibold text-right" style={{ color: getScoreColor(score) }}>{score}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips — 2 column grid */}
      <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
        <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-900 mb-[8px] flex items-center gap-[6px]">
          <Info size={12} className="text-[#a57255]" />
          Dicas de Otimizacao
        </h3>
        <div className="grid grid-cols-2 gap-x-[12px] gap-y-[6px]">
          {[
            { icon: <Heading1 size={12} />, text: 'Cada pagina deve ter exatamente um H1 claro e unico, contendo a palavra-chave principal.' },
            { icon: <Type size={12} />, text: 'Conteudo ideal: 300+ palavras por pagina. Paginas de servico devem ter 500+.' },
            { icon: <ImageIcon size={12} />, text: 'Todas as imagens devem ter atributo alt descritivo. O site ja usa alt em todas as <img>.' },
            { icon: <Link2 size={12} />, text: 'Links internos entre paginas melhoram a autoridade. Vincule servicos a areas de atuacao.' },
            { icon: <Hash size={12} />, text: 'A palavra-chave deve aparecer no titulo, descricao, primeiro paragrafo e subtitulos.' },
            { icon: <Globe size={12} />, text: 'URLs amigaveis implementadas (ex: /homologacao-de-sentenca-estrangeira).' },
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-[6px] py-[3px]">
              <span className="text-[#a57255]/50 mt-[1px] shrink-0">{tip.icon}</span>
              <span className="font-['Noto_Sans'] text-[10px] text-gray-400 leading-[14px]">{tip.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Análise de Legibilidade ── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-gray-100 flex items-center gap-[6px]">
          <BookOpen size={12} className="text-[#a57255]" />
          <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-900">Legibilidade por Página</h3>
          <span className="font-['Noto_Sans'] text-[10px] text-gray-400 ml-auto">Calculado sobre textos editados no painel</span>
        </div>
        <div className="divide-y divide-gray-100">
          {contentAudit.map(page => {
            const r = page.readability;
            const levelColor = { facil: '#22c55e', medio: '#eab308', dificil: '#ef4444' }[r.level];
            const levelLabel = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' }[r.level];
            return (
              <details key={page.pageId} className="group">
                <summary className="flex items-center gap-[10px] px-[14px] py-[8px] cursor-pointer hover:bg-gray-50 transition-colors list-none">
                  <span className="font-['Noto_Sans'] text-[11px] font-bold w-[28px] text-right tabular-nums shrink-0" style={{ color: levelColor }}>{r.score}</span>
                  <div className="w-[40px] h-[3px] bg-gray-100 rounded-full shrink-0">
                    <div className="h-[3px] rounded-full" style={{ width: `${r.score}%`, background: levelColor }} />
                  </div>
                  <span className="font-['Noto_Sans'] text-[11px] text-gray-600 flex-1 truncate">{page.label}</span>
                  <div className="flex items-center gap-[8px] shrink-0">
                    <span className="font-['Noto_Sans'] text-[9px] text-gray-400 tabular-nums">{r.totalWords} palavras</span>
                    <span className="font-['Noto_Sans'] text-[9px] text-gray-400 tabular-nums">~{r.estimatedReadTime}min leitura</span>
                    <span className="font-['Noto_Sans'] text-[9px] font-medium px-[5px] py-[1px] rounded" style={{ background: `${levelColor}20`, color: levelColor }}>{levelLabel}</span>
                    <ChevronRight size={11} className="text-gray-300 group-open:rotate-90 transition-transform" />
                  </div>
                </summary>
                <div className="px-[14px] pb-[10px] space-y-[4px]">
                  {r.checks.map((check, i) => (
                    <div key={i} className="flex items-start gap-[8px]">
                      {check.status === 'pass' ? <CircleCheck size={11} className="text-emerald-400 mt-[1px] shrink-0" />
                        : check.status === 'warning' ? <CircleMinus size={11} className="text-yellow-400 mt-[1px] shrink-0" />
                        : <CircleX size={11} className="text-red-400 mt-[1px] shrink-0" />}
                      <div>
                        <span className="font-['Noto_Sans'] text-[10px] text-gray-600 font-medium">{check.label}</span>
                        <span className="font-['Noto_Sans'] text-[10px] text-gray-400 ml-[6px]">{check.detail}</span>
                      </div>
                    </div>
                  ))}
                  {r.totalWords < 50 && (
                    <p className="font-['Noto_Sans'] text-[10px] text-gray-400 italic mt-[4px]">
                      Adicione mais conteúdo nos campos de texto desta página para análise completa.
                    </p>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}


/* ─── Technical Checklist Tab ─── */
function TechnicalChecklist({ data, getSeoVal, globalScore }: { data: Record<string, string>; getSeoVal: (pageId: string, field: string) => string; globalScore: number }) {
  
  const checks = useMemo(() => {
    const items: { category: string; checks: { label: string; status: 'pass' | 'warning' | 'fail'; detail: string }[] }[] = [];

    // 1. Meta Tags
    const metaChecks: { label: string; status: 'pass' | 'warning' | 'fail'; detail: string }[] = [];
    const pagesWithTitle = SEO_PAGES.filter(p => getSeoVal(p.id, 'title')).length;
    const pagesWithDesc = SEO_PAGES.filter(p => getSeoVal(p.id, 'description')).length;
    metaChecks.push({
      label: 'Titulos de pagina',
      status: pagesWithTitle === SEO_PAGES.length ? 'pass' : pagesWithTitle > SEO_PAGES.length / 2 ? 'warning' : 'fail',
      detail: `${pagesWithTitle}/${SEO_PAGES.length} paginas com titulo definido`
    });
    metaChecks.push({
      label: 'Meta descriptions',
      status: pagesWithDesc === SEO_PAGES.length ? 'pass' : pagesWithDesc > SEO_PAGES.length / 2 ? 'warning' : 'fail',
      detail: `${pagesWithDesc}/${SEO_PAGES.length} paginas com descricao definida`
    });
    const pagesWithCanonical = SEO_PAGES.filter(p => getSeoVal(p.id, 'canonical')).length;
    metaChecks.push({
      label: 'URLs canonicas',
      status: pagesWithCanonical === SEO_PAGES.length ? 'pass' : pagesWithCanonical > 0 ? 'warning' : 'fail',
      detail: `${pagesWithCanonical}/${SEO_PAGES.length} paginas com canonical`
    });
    items.push({ category: 'Meta Tags', checks: metaChecks });

    // 2. Social / OG
    const socialChecks: { label: string; status: 'pass' | 'warning' | 'fail'; detail: string }[] = [];
    const pagesWithOg = SEO_PAGES.filter(p => getSeoVal(p.id, 'ogTitle') || getSeoVal(p.id, 'ogImage')).length;
    socialChecks.push({
      label: 'Open Graph tags',
      status: pagesWithOg === SEO_PAGES.length ? 'pass' : pagesWithOg > 0 ? 'warning' : 'fail',
      detail: `${pagesWithOg}/${SEO_PAGES.length} paginas com OG configurado`
    });
    const pagesWithOgImage = SEO_PAGES.filter(p => getSeoVal(p.id, 'ogImage')).length;
    socialChecks.push({
      label: 'OG Images',
      status: pagesWithOgImage === SEO_PAGES.length ? 'pass' : pagesWithOgImage > 0 ? 'warning' : 'fail',
      detail: `${pagesWithOgImage}/${SEO_PAGES.length} paginas com imagem social`
    });
    items.push({ category: 'Redes Sociais', checks: socialChecks });

    // 3. Estrutura
    const structChecks: { label: string; status: 'pass' | 'warning' | 'fail'; detail: string }[] = [];
    structChecks.push({
      label: 'URLs amigaveis (slugs)',
      status: 'pass',
      detail: 'Todas as URLs usam slugs descritivos (ex: /divorcio, /faq)'
    });
    structChecks.push({
      label: 'React Router SPA',
      status: 'pass',
      detail: 'Navegacao via React Router com rotas nomeadas'
    });
    structChecks.push({
      label: 'Alt text em imagens',
      status: 'pass',
      detail: '55+ tags <img> com alt descritivo no codigo fonte'
    });
    structChecks.push({
      label: 'Aria labels em links',
      status: 'pass',
      detail: 'Links interativos possuem aria-label para acessibilidade'
    });
    structChecks.push({
      label: 'Responsividade',
      status: 'pass',
      detail: 'Layout responsivo com breakpoints mobile/tablet/desktop'
    });
    items.push({ category: 'Estrutura e Acessibilidade', checks: structChecks });

    // 4. Performance
    const perfChecks: { label: string; status: 'pass' | 'warning' | 'fail'; detail: string }[] = [];
    perfChecks.push({
      label: 'Lazy loading de paginas',
      status: 'pass',
      detail: 'Componentes de preview carregados via React.lazy + Suspense'
    });
    perfChecks.push({
      label: 'Otimizacao de imagens',
      status: 'warning',
      detail: 'Recomendado: converter imagens para WebP e definir width/height explicitos'
    });
    perfChecks.push({
      label: 'Fontes externas',
      status: 'warning',
      detail: 'Fontes carregadas via Google Fonts — considere self-hosting para performance'
    });
    items.push({ category: 'Performance', checks: perfChecks });

    // 5. SEO Avancado
    const advChecks: { label: string; status: 'pass' | 'warning' | 'fail'; detail: string }[] = [];
    const hasJsonLd = data['site.name'] || data['seo.global.jsonld.custom'];
    advChecks.push({
      label: 'Schema.org (JSON-LD)',
      status: hasJsonLd ? 'pass' : 'warning',
      detail: hasJsonLd ? 'Dados estruturados configurados' : 'Configure na aba Schema.org para rich snippets no Google'
    });
    advChecks.push({
      label: 'Sitemap XML',
      status: 'pass',
      detail: 'Sitemap dinâmico via Edge Function — inclui artigos publicados automaticamente'
    });
    advChecks.push({
      label: 'Robots.txt',
      status: 'pass',
      detail: 'Arquivo /robots.txt configurado (Disallow: /painel, Sitemap incluso)'
    });
    advChecks.push({
      label: 'hreflang',
      status: 'pass',
      detail: 'Tags hreflang pt-BR e x-default injetadas automaticamente via SeoHead'
    });
    advChecks.push({
      label: 'SSL / HTTPS',
      status: 'pass',
      detail: 'Supabase ja serve via HTTPS'
    });
    items.push({ category: 'SEO Avancado', checks: advChecks });

    return items;
  }, [data, getSeoVal]);

  const totalChecks = checks.reduce((a, c) => a + c.checks.length, 0);
  const passedChecks = checks.reduce((a, c) => a + c.checks.filter(ch => ch.status === 'pass').length, 0);

  return (
    <div className="space-y-[10px]">
      {/* Header — compact strip */}
      <div className="bg-gradient-to-r from-[#a57255]/10 via-white to-white border border-gray-200 rounded-xl px-[16px] py-[10px] flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <CircularScore score={Math.round((passedChecks / totalChecks) * 100)} size={44} />
          <div>
            <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-gray-900 flex items-center gap-[6px]">
              <ListChecks size={14} className="text-[#a57255]" />
              Checklist Tecnico SEO
            </h3>
            <p className="font-['Noto_Sans'] text-[10px] text-gray-400">{passedChecks}/{totalChecks} verificacoes aprovadas</p>
          </div>
        </div>
      </div>

      {/* Categories — responsive grid */}
      <div className="grid grid-cols-3 gap-[10px]">
        {checks.map((cat, ci) => (
          <div key={ci} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-[14px] py-[8px] border-b border-gray-200 flex items-center justify-between">
              <h4 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-900">{cat.category}</h4>
              <span className="font-['Noto_Sans'] text-[10px] text-gray-400">
                {cat.checks.filter(c => c.status === 'pass').length}/{cat.checks.length}
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {cat.checks.map((check, i) => (
                <div key={i} className="flex items-start gap-[8px] px-[12px] py-[7px]">
                  <StatusIcon status={check.status} />
                  <div className="flex-1 min-w-0">
                    <span className="font-['Noto_Sans'] text-[11px] text-gray-600 font-medium">{check.label}</span>
                    <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mt-[1px] leading-[13px]">{check.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sitemap Dinâmico card */}
      <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
        <div className="flex items-center gap-[6px] mb-[8px]">
          <Globe size={13} className="text-[#a57255]" />
          <h4 className="font-['Noto_Sans'] text-[12px] font-semibold text-gray-900">Sitemap Dinâmico</h4>
          <span className="font-['Noto_Sans'] text-[9px] bg-emerald-500/15 text-emerald-400 px-[5px] py-[1px] rounded ml-auto">Automático</span>
        </div>
        <p className="font-['Noto_Sans'] text-[10px] text-gray-400 leading-[15px] mb-[10px]">
          O sitemap é gerado automaticamente pela Edge Function do Supabase, incluindo todos os artigos de blog publicados pelo painel. Novos artigos entram no sitemap imediatamente após publicação.
        </p>
        <div className="flex gap-[6px]">
          <a
            href={`https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/sitemap.xml`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[4px] font-['Noto_Sans'] text-[10px] text-[#a57255] border border-[#a57255]/30 px-[8px] py-[3px] rounded-lg hover:bg-[#a57255]/10 transition-colors"
          >
            <ExternalLink size={10} /> Ver sitemap
          </a>
          <a
            href="https://search.google.com/search-console/sitemaps"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[4px] font-['Noto_Sans'] text-[10px] text-gray-400 border border-gray-200 px-[8px] py-[3px] rounded-lg hover:text-gray-600 transition-colors"
          >
            <ExternalLink size={10} /> Submeter ao GSC
          </a>
        </div>
      </div>

      {/* Google Search Console card */}
      <div className="bg-white border border-[#a57255]/20 rounded-xl p-[14px]">
        <div className="flex items-center gap-[8px] mb-[8px]">
          <ExternalLink size={13} className="text-[#a57255]" />
          <h4 className="font-['Noto_Sans'] text-[13px] font-semibold text-gray-900">Google Search Console</h4>
          <span className="bg-emerald-500/15 text-emerald-400 text-[9px] font-['Noto_Sans'] font-medium px-[6px] py-[1px] rounded-full">Gratuito</span>
        </div>
        <p className="font-['Noto_Sans'] text-[11px] text-gray-500 leading-[16px] mb-[10px]">
          Ferramenta gratuita do Google que mostra quais palavras-chave trazem visitantes, posicao media nos resultados, cliques e impressoes reais — dados que nenhum painel local consegue simular.
        </p>
        <div className="space-y-[5px] mb-[12px]">
          {[
            'Ver quais buscas levam ao site (palavras-chave reais)',
            'Identificar paginas com queda de posicao',
            'Submeter o sitemap.xml para indexacao imediata',
            'Receber alertas de erros de rastreamento',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-[6px]">
              <CircleCheck size={12} className="text-emerald-400/60 mt-[2px] shrink-0" />
              <span className="font-['Noto_Sans'] text-[10px] text-gray-500">{item}</span>
            </div>
          ))}
        </div>
        <div className="space-y-[4px] mb-[12px]">
          {[
            { n: '1', t: 'Acesse search.google.com/search-console' },
            { n: '2', t: 'Clique em "Adicionar propriedade" e insira o dominio do site' },
            { n: '3', t: 'Adicione o arquivo de verificacao na pasta /public e submeta' },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-[6px]">
              <span className="font-['Noto_Sans'] text-[9px] text-[#a57255] font-bold shrink-0 w-[14px]">{step.n}.</span>
              <span className="font-['Noto_Sans'] text-[10px] text-gray-400">{step.t}</span>
            </div>
          ))}
        </div>
        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[6px] border border-[#a57255]/40 text-[#a57255] hover:bg-[#a57255]/10 rounded-lg px-[12px] py-[7px] text-[11px] font-['Noto_Sans'] font-medium transition-colors"
        >
          Abrir Search Console <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
}


/* ─── JSON-LD Tab ─── */
function JsonLdTab({ data, getSeoVal, onChange }: { data: Record<string, string>; getSeoVal: (pageId: string, field: string) => string; onChange: (key: string, value: string) => void }) {
  
  // Generate LocalBusiness JSON-LD from site data
  const localBusinessJsonLd = useMemo(() => {
    const name = data['site.name'] || 'Sousa Araujo Advocacia';
    const phone = data['site.phone'] || '+55 61 99599-1322';
    const email = data['site.email'] || 'contato@sousaaraujo.adv.br';
    const street = data['site.address.street'] || '';
    const city = data['site.address.city'] || 'Brasilia';
    const state = data['site.address.state'] || 'DF';
    const zip = data['site.address.zipCode'] || '';
    
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": name,
      "description": getSeoVal('home', 'description') || "Escritorio de advocacia em Brasilia com atuacao nacional e para brasileiros no exterior.",
      "url": "https://sousaaraujo.adv.br",
      "telephone": phone,
      "email": email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": street,
        "addressLocality": city,
        "addressRegion": state,
        "postalCode": zip,
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-15.7975",
        "longitude": "-47.8919"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        }
      ],
      "priceRange": "$$",
      "areaServed": {
        "@type": "Country",
        "name": "Brazil"
      },
      "sameAs": [
        data['site.social.instagram'] || '',
        data['site.social.facebook'] || '',
        data['site.social.linkedin'] || '',
        data['site.social.youtube'] || '',
      ].filter(Boolean),
    }, null, 2);
  }, [data, getSeoVal]);

  // BreadcrumbList
  const breadcrumbJsonLd = useMemo(() => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": SEO_PAGES.slice(0, 8).map((page, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": page.label,
        "item": `https://sousaaraujo.adv.br${page.route}`
      }))
    }, null, 2);
  }, []);

  // FAQ Schema
  const faqJsonLd = useMemo(() => {
    const faqs: { q: string; a: string }[] = [];
    for (let i = 1; i <= 12; i++) {
      const q = data[`faq.item${i}.q`];
      const a = data[`faq.item${i}.a`];
      if (q && a) faqs.push({ q, a });
    }
    if (faqs.length === 0) return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }, null, 2);
  }, [data]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${text}\n</script>`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-[10px]">
      {/* Site data editor — fields that feed LocalBusiness JSON-LD */}
      <SiteSeoEditor data={data} onChange={onChange} />

      {/* Separator */}
      <div className="flex items-center gap-[10px]">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="font-['Noto_Sans'] text-[9px] text-gray-400 uppercase tracking-[1px] shrink-0">
          Schemas gerados automaticamente
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Schema blocks — grid layout */}
      <div className="grid grid-cols-2 gap-[10px]">
        {/* LocalBusiness */}
        <JsonLdBlock
          title="LocalBusiness / LegalService"
          description="Google Maps, Knowledge Panel, pesquisa local"
          code={localBusinessJsonLd}
          id="business"
          copiedId={copiedId}
          onCopy={copyToClipboard}
        />

        {/* BreadcrumbList */}
        <JsonLdBlock
          title="BreadcrumbList"
          description="Navegacao em breadcrumbs nos resultados do Google"
          code={breadcrumbJsonLd}
          id="breadcrumb"
          copiedId={copiedId}
          onCopy={copyToClipboard}
        />

        {/* FAQ */}
        {faqJsonLd && (
          <JsonLdBlock
            title="FAQPage"
            description="Dropdown de FAQ nos resultados do Google"
            code={faqJsonLd}
            id="faq"
            copiedId={copiedId}
            onCopy={copyToClipboard}
          />
        )}

        {/* Custom JSON-LD */}
        <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
          <h4 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-900 mb-[3px] flex items-center gap-[5px]">
            <Code2 size={12} className="text-[#a57255]" />
            JSON-LD Customizado
          </h4>
          <p className="font-['Noto_Sans'] text-[9px] text-gray-400 mb-[6px]">Cole JSON-LD adicional aqui.</p>
          <textarea
            value={data['seo.global.jsonld.custom'] || ''}
            onChange={e => onChange('seo.global.jsonld.custom', e.target.value)}
            rows={6}
            placeholder='{"@context": "https://schema.org", ...}'
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-[10px] font-mono text-[10px] text-emerald-600 placeholder:text-gray-300 focus:border-[#a57255]/40 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Validation tip — compact */}
      <div className="bg-white border border-[#a57255]/15 rounded-xl px-[14px] py-[10px] flex items-center gap-[8px]">
        <Info size={13} className="text-[#a57255] shrink-0" />
        <p className="font-['Noto_Sans'] text-[10px] text-gray-500">
          Valide em{' '}
          <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-[#a57255] hover:underline">Rich Results Test</a>
          {' '}e{' '}
          <a href="https://validator.schema.org/" target="_blank" rel="noopener noreferrer" className="text-[#a57255] hover:underline">Schema.org Validator</a>.
          {' '}JSON-LD ja e injetado automaticamente no {'<head>'} via SeoHead.
        </p>
      </div>
    </div>
  );
}

/* ─── JSON-LD Code Block ─── */
function JsonLdBlock({ title, description, code, id, copiedId, onCopy }: {
  title: string; description: string; code: string; id: string; copiedId: string | null; onCopy: (code: string, id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-[16px] py-[12px] flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-['Noto_Sans'] text-[12px] font-semibold text-gray-900">{title}</h4>
          <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mt-[1px]">{description}</p>
        </div>
        <div className="flex items-center gap-[6px]">
          <button
            onClick={() => onCopy(code, id)}
            className={`px-[10px] py-[5px] rounded-md font-['Noto_Sans'] text-[10px] font-medium transition-all ${
              copiedId === id
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                : 'bg-[#a57255]/10 text-[#a57255] border border-[#a57255]/20 hover:bg-[#a57255]/20'
            }`}
          >
            {copiedId === id ? 'Copiado!' : 'Copiar <script>'}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-[8px] py-[5px] rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-gray-100">
          <pre className="p-[14px] bg-gray-50 text-[11px] font-mono text-emerald-600 overflow-x-auto max-h-[300px] overflow-y-auto leading-[18px]">
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SEO HISTORY TAB
   ═══════════════════════════════════════════════════════ */
function SeoHistoryTab({ data, onChange }: { data: Record<string, string>; onChange: (key: string, value: string) => void }) {
  const [history, setHistory] = useState<SeoHistoryEntry[]>(loadSeoHistory);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [confirmRestore, setConfirmRestore] = useState<number | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [restored, setRestored] = useState(false);

  const clearHistory = () => {
    localStorage.removeItem(SEO_HISTORY_KEY);
    setHistory([]);
    setConfirmClear(false);
  };

  const restoreEntry = (entry: SeoHistoryEntry) => {
    for (const [key, value] of Object.entries(entry.snapshot)) {
      onChange(key, value);
    }
    setConfirmRestore(null);
    setRestored(true);
    setTimeout(() => setRestored(false), 2500);
  };

  const formatKey = (k: string) => k.replace(/^seo\./, '').replace(/^site\./, '');

  return (
    <div className="space-y-[10px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#a57255]/10 via-white to-white border border-gray-200 rounded-xl px-[16px] py-[10px] flex items-center justify-between">
        <div>
          <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-gray-900 flex items-center gap-[6px]">
            <History size={14} className="text-[#a57255]" />
            Historico de Alteracoes SEO
          </h3>
          <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mt-[2px]">
            {history.length} registro{history.length !== 1 ? 's' : ''} salvo{history.length !== 1 ? 's' : ''} localmente — ate {SEO_HISTORY_MAX} entradas no navegador
          </p>
        </div>
        {history.length > 0 && (
          confirmClear ? (
            <div className="flex items-center gap-[6px]">
              <button onClick={clearHistory} className="font-['Noto_Sans'] text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-[10px] py-[4px] rounded-lg hover:bg-red-500/20 transition-colors">
                Confirmar
              </button>
              <button onClick={() => setConfirmClear(false)} className="font-['Noto_Sans'] text-[10px] text-gray-400 px-[8px] py-[4px] rounded-lg hover:text-gray-600 transition-colors">
                Cancelar
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmClear(true)} className="font-['Noto_Sans'] text-[10px] text-red-400/50 hover:text-red-400 px-[8px] py-[4px] rounded-lg hover:bg-red-500/5 transition-colors flex items-center gap-[4px]">
              <Trash2 size={10} /> Limpar
            </button>
          )
        )}
      </div>

      {/* Toast */}
      {restored && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-[14px] py-[8px] flex items-center gap-[8px]">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span className="font-['Noto_Sans'] text-[11px] text-emerald-400">Estado restaurado com sucesso</span>
        </div>
      )}

      {/* Empty state */}
      {history.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl px-[20px] py-[40px] text-center">
          <History size={32} className="text-gray-200 mx-auto mb-[12px]" />
          <p className="font-['Noto_Sans'] text-[13px] text-gray-400">Nenhuma alteracao registrada ainda.</p>
          <p className="font-['Noto_Sans'] text-[10px] text-gray-300 mt-[4px]">O historico e gravado automaticamente quando voce salva alteracoes nos campos de SEO.</p>
        </div>
      )}

      {/* History entries */}
      {history.map((entry) => {
        const isExpanded = expandedId === entry.timestamp;
        return (
          <div key={entry.timestamp} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : entry.timestamp)}
              className="w-full flex items-center gap-[10px] px-[14px] py-[10px] text-left hover:bg-gray-50 transition-colors"
            >
              <Clock size={12} className="text-gray-300 shrink-0" />
              <span className="font-['Noto_Sans'] text-[11px] text-gray-600">{formatHistoryTimestamp(entry.timestamp)}</span>
              <span className="font-['Noto_Sans'] text-[11px] text-[#a57255]/70">{entry.label}</span>
              <span className="font-['Noto_Sans'] text-[9px] text-gray-400 bg-gray-50 px-[6px] py-[1px] rounded-full">
                {entry.changes.length} campo{entry.changes.length !== 1 ? 's' : ''}
              </span>
              <div className="flex-1" />
              <ChevronRight size={13} className={`text-gray-300 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="border-t border-gray-100 px-[14px] py-[10px]">
                {/* Changes table */}
                <div className="space-y-[4px] mb-[10px]">
                  {entry.changes.map((ch, i) => (
                    <div key={i} className="flex items-center gap-[8px] py-[3px]">
                      <span className="font-mono text-[10px] text-gray-400 w-[160px] shrink-0 truncate">{formatKey(ch.key)}</span>
                      <span className="font-['Noto_Sans'] text-[10px] text-red-500/60 truncate max-w-[120px]">
                        {ch.from ? ch.from.slice(0, 40) : <span className="italic text-gray-300">(vazio)</span>}
                      </span>
                      <ArrowRight size={10} className="text-gray-300 shrink-0" />
                      <span className="font-['Noto_Sans'] text-[10px] text-emerald-600/60 truncate max-w-[120px]">
                        {ch.to ? ch.to.slice(0, 40) : <span className="italic text-gray-300">(vazio)</span>}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Restore button */}
                {confirmRestore === entry.timestamp ? (
                  <div className="flex items-center gap-[6px]">
                    <button onClick={() => restoreEntry(entry)} className="font-['Noto_Sans'] text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-[10px] py-[5px] rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-[4px]">
                      Confirmar restauracao
                    </button>
                    <button onClick={() => setConfirmRestore(null)} className="font-['Noto_Sans'] text-[10px] text-gray-400 px-[8px] py-[5px] rounded-lg hover:text-gray-600 transition-colors">
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmRestore(entry.timestamp)} className="font-['Noto_Sans'] text-[10px] text-gray-400 hover:text-gray-700 px-[8px] py-[5px] rounded-lg border border-gray-200 hover:border-gray-300 transition-colors flex items-center gap-[4px]">
                    <RotateCcw size={10} /> Restaurar este estado
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   IA ANALYSIS TAB
   ═══════════════════════════════════════════════════════ */
interface IaAnalysisResult {
  score: number;
  resumo: string;
  title: { avaliacao: string; detalhe: string; sugestao?: string };
  description: { avaliacao: string; detalhe: string; sugestao?: string };
  keyword: { avaliacao: string; detalhe: string };
  prioridade: string;
  quick_wins: string[];
}

interface IaBatchResult {
  pageId: string;
  pageLabel: string;
  result: IaAnalysisResult | null;
  error?: string;
}

function IaAnalysisTab({ data, getSeoVal, selectedPage, setSelectedPage, pageAnalysis, onChange }: {
  data: Record<string, string>;
  getSeoVal: (pageId: string, field: string) => string;
  selectedPage: string;
  setSelectedPage: (id: string) => void;
  pageAnalysis: Record<string, { score: number; checks: SeoCheckResult[] }>;
  onChange: (key: string, value: string) => void;
}) {
  const [iaProvider, setIaProvider] = useState(data['geo.config.activeProvider'] || 'openai');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IaAnalysisResult | null>(null);
  const [rawError, setRawError] = useState<string | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [batchResults, setBatchResults] = useState<IaBatchResult[]>([]);

  // Available providers (those with API key configured)
  const availableProviders = useMemo(() => {
    return GEO_PROVIDERS_DEFAULT.filter(p => {
      const key = data[`geo.api.${p.id}`];
      return key && key.trim().length > 0;
    });
  }, [data]);

  const activeProvider = availableProviders.find(p => p.id === iaProvider) || availableProviders[0];

  const analyzePage = async (pageId?: string) => {
    const targetPage = pageId || selectedPage;
    if (!activeProvider) return null;

    const apiKey = data[`geo.api.${activeProvider.id}`];
    if (!apiKey) return null;

    const page = SEO_PAGES.find(p => p.id === targetPage);
    if (!page) return null;

    const title = getSeoVal(targetPage, 'title');
    const description = getSeoVal(targetPage, 'description');
    const keyword = getSeoVal(targetPage, 'keyword');
    const canonical = getSeoVal(targetPage, 'canonical');

    const systemPrompt = `Voce e um especialista em SEO tecnico e copywriting para escritorios de advocacia brasileiros. Analise os dados de SEO fornecidos e retorne uma analise estruturada em JSON valido, sem markdown, sem blocos de codigo, apenas o objeto JSON puro.`;

    const userPrompt = `Analise o SEO desta pagina de escritorio de advocacia e retorne JSON puro:
{
  pagina: '${page.label}',
  title: '${title}',
  description: '${description}',
  keyword: '${keyword}',
  canonical: '${canonical}'
}

Retorne exatamente este JSON, preenchendo todos os campos:
{
  "score": numero de 0 a 100,
  "resumo": "texto curto de 1 frase avaliando o SEO geral",
  "title": {
    "avaliacao": "otimo" | "bom" | "fraco" | "ausente",
    "detalhe": "observacao especifica sobre o title",
    "sugestao": "title alternativo otimizado para advocacia em Brasilia"
  },
  "description": {
    "avaliacao": "otimo" | "bom" | "fraco" | "ausente",
    "detalhe": "observacao sobre a description",
    "sugestao": "description alternativa entre 150-160 caracteres"
  },
  "keyword": {
    "avaliacao": "otimo" | "bom" | "fraco" | "ausente",
    "detalhe": "observacao sobre uso da palavra-chave"
  },
  "prioridade": "title" | "description" | "keyword" | "nenhuma",
  "quick_wins": ["acao rapida 1", "acao rapida 2", "acao rapida 3"]
}`;

    try {
      const text = await callGeoAI(activeProvider, apiKey, systemPrompt, userPrompt);
      // Try to extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Resposta nao contem JSON valido');
      const parsed = JSON.parse(jsonMatch[0]) as IaAnalysisResult;
      return parsed;
    } catch (err: unknown) {
      throw err;
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    setRawError(null);
    setRawResponse(null);
    try {
      const parsed = await analyzePage();
      setResult(parsed);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setRawError(msg);
      setRawResponse(msg);
    }
    setLoading(false);
  };

  const handleBatchAnalyze = async () => {
    setBatchRunning(true);
    setBatchProgress(0);
    setBatchResults([]);
    const results: IaBatchResult[] = [];

    for (let i = 0; i < SEO_PAGES.length; i++) {
      const page = SEO_PAGES[i];
      setBatchProgress(i + 1);
      try {
        const res = await analyzePage(page.id);
        results.push({ pageId: page.id, pageLabel: page.label, result: res });
      } catch (err: unknown) {
        results.push({ pageId: page.id, pageLabel: page.label, result: null, error: err instanceof Error ? err.message : String(err) });
      }
      setBatchResults([...results]);
      if (i < SEO_PAGES.length - 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    }
    setBatchRunning(false);
  };

  const avaliacaoColor: Record<string, string> = {
    'otimo': '#22c55e', 'bom': '#3b82f6', 'fraco': '#eab308', 'ausente': '#ef4444',
  };
  const avaliacaoBg: Record<string, string> = {
    'otimo': 'bg-emerald-500/15', 'bom': 'bg-blue-500/15', 'fraco': 'bg-yellow-500/15', 'ausente': 'bg-red-500/15',
  };

  return (
    <div className="space-y-[10px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#a57255]/10 via-white to-white border border-gray-200 rounded-xl px-[16px] py-[10px]">
        <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-gray-900 flex items-center gap-[6px]">
          <Sparkles size={14} className="text-[#a57255]" />
          Analise SEO com Inteligencia Artificial
        </h3>
        <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mt-[2px]">
          Avaliacao automatica de title, description e keywords usando provedores de IA configurados no modulo GEO
        </p>
      </div>

      {/* No providers warning */}
      {availableProviders.length === 0 && (
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-[16px] py-[12px] flex items-start gap-[10px]">
          <AlertTriangle size={16} className="text-yellow-500 shrink-0 mt-[1px]" />
          <div>
            <p className="font-['Noto_Sans'] text-[12px] text-yellow-400">Configure provedores na secao GEO do painel para usar analise por IA</p>
            <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mt-[2px]">Va ate Configuracoes → GEO e insira a chave de API de pelo menos um provedor.</p>
          </div>
        </div>
      )}

      {/* Page selector + provider selector */}
      {availableProviders.length > 0 && (
        <div className="flex items-center gap-[10px] flex-wrap">
          {/* Page selector */}
          <div className="flex items-center gap-[6px]">
            <span className="font-['Noto_Sans'] text-[11px] text-gray-400">Pagina:</span>
            <select
              value={selectedPage}
              onChange={e => { setSelectedPage(e.target.value); setResult(null); setRawError(null); }}
              className="bg-white border border-gray-200 rounded-lg px-[10px] py-[5px] font-['Noto_Sans'] text-[11px] text-gray-700 focus:outline-none focus:border-[#a57255]/40"
            >
              {SEO_PAGES.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Provider selector */}
          <div className="flex items-center gap-[4px]">
            <span className="font-['Noto_Sans'] text-[11px] text-gray-400">Provedor:</span>
            {availableProviders.map(p => (
              <button
                key={p.id}
                onClick={() => setIaProvider(p.id)}
                className={`font-['Noto_Sans'] text-[10px] px-[8px] py-[4px] rounded-lg border transition-colors ${
                  iaProvider === p.id
                    ? 'border-[#a57255]/40 text-[#a57255] bg-[#a57255]/10'
                    : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Analyze button */}
      {availableProviders.length > 0 && (
        <button
          onClick={handleAnalyze}
          disabled={loading || !activeProvider}
          className="flex items-center gap-[6px] bg-[#a57255] hover:bg-[#b88566] disabled:opacity-50 text-white font-['Noto_Sans'] text-[12px] font-medium px-[16px] py-[8px] rounded-lg transition-colors"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Analisando {SEO_PAGES.find(p => p.id === selectedPage)?.label} com {activeProvider?.label}...
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Analisar pagina com IA
            </>
          )}
        </button>
      )}

      {/* Error display */}
      {rawError && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-[14px]">
          <p className="font-['Noto_Sans'] text-[11px] text-red-400 mb-[4px]">Erro na analise:</p>
          <pre className="font-mono text-[10px] text-red-300/50 whitespace-pre-wrap break-all max-h-[200px] overflow-y-auto">
            {rawResponse}
          </pre>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-[8px]">
          {/* Score card */}
          <div className="bg-white border border-gray-200 rounded-xl p-[16px] flex items-center gap-[16px]">
            <CircularScore score={result.score} size={60} />
            <div>
              <p className="font-['Noto_Sans'] text-[14px] text-gray-900 font-semibold">Score IA: {result.score}/100</p>
              <p className="font-['Noto_Sans'] text-[11px] text-gray-500 mt-[2px]">{result.resumo}</p>
              {result.prioridade && result.prioridade !== 'nenhuma' && (
                <p className="font-['Noto_Sans'] text-[10px] text-[#a57255] mt-[2px]">Prioridade: {result.prioridade}</p>
              )}
            </div>
          </div>

          {/* Title card */}
          <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
            <div className="flex items-center gap-[8px] mb-[6px]">
              <span className="font-['Noto_Sans'] text-[12px] text-gray-900 font-semibold">Title</span>
              <span className={`font-['Noto_Sans'] text-[9px] px-[6px] py-[1px] rounded-full ${avaliacaoBg[result.title.avaliacao] || 'bg-white/10'}`} style={{ color: avaliacaoColor[result.title.avaliacao] || '#fff' }}>
                {result.title.avaliacao}
              </span>
            </div>
            <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mb-[4px]">Atual: {getSeoVal(selectedPage, 'title') || '(vazio)'}</p>
            <p className="font-['Noto_Sans'] text-[11px] text-gray-600">{result.title.detalhe}</p>
            {result.title.sugestao && (
              <div className="mt-[8px] bg-[#a57255]/5 border border-[#a57255]/20 rounded-lg px-[12px] py-[8px] flex items-start justify-between gap-[8px]">
                <div>
                  <p className="font-['Noto_Sans'] text-[9px] text-[#a57255] mb-[2px]">Sugestao da IA:</p>
                  <p className="font-['Noto_Sans'] text-[11px] text-[#a57255]/80">{result.title.sugestao}</p>
                </div>
                <button
                  onClick={() => onChange(`seo.${selectedPage}.title`, result.title.sugestao!)}
                  className="font-['Noto_Sans'] text-[10px] text-[#a57255] border border-[#a57255]/30 px-[8px] py-[4px] rounded-md hover:bg-[#a57255]/10 transition-colors shrink-0"
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>

          {/* Description card */}
          <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
            <div className="flex items-center gap-[8px] mb-[6px]">
              <span className="font-['Noto_Sans'] text-[12px] text-gray-900 font-semibold">Description</span>
              <span className={`font-['Noto_Sans'] text-[9px] px-[6px] py-[1px] rounded-full ${avaliacaoBg[result.description.avaliacao] || 'bg-white/10'}`} style={{ color: avaliacaoColor[result.description.avaliacao] || '#fff' }}>
                {result.description.avaliacao}
              </span>
            </div>
            <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mb-[4px]">Atual: {getSeoVal(selectedPage, 'description')?.slice(0, 60) || '(vazio)'}...</p>
            <p className="font-['Noto_Sans'] text-[11px] text-gray-600">{result.description.detalhe}</p>
            {result.description.sugestao && (
              <div className="mt-[8px] bg-[#a57255]/5 border border-[#a57255]/20 rounded-lg px-[12px] py-[8px] flex items-start justify-between gap-[8px]">
                <div>
                  <p className="font-['Noto_Sans'] text-[9px] text-[#a57255] mb-[2px]">Sugestao da IA:</p>
                  <p className="font-['Noto_Sans'] text-[11px] text-[#a57255]/80">{result.description.sugestao}</p>
                </div>
                <button
                  onClick={() => onChange(`seo.${selectedPage}.description`, result.description.sugestao!)}
                  className="font-['Noto_Sans'] text-[10px] text-[#a57255] border border-[#a57255]/30 px-[8px] py-[4px] rounded-md hover:bg-[#a57255]/10 transition-colors shrink-0"
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>

          {/* Keyword card */}
          <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
            <div className="flex items-center gap-[8px] mb-[6px]">
              <span className="font-['Noto_Sans'] text-[12px] text-gray-900 font-semibold">Palavra-chave</span>
              <span className={`font-['Noto_Sans'] text-[9px] px-[6px] py-[1px] rounded-full ${avaliacaoBg[result.keyword.avaliacao] || 'bg-white/10'}`} style={{ color: avaliacaoColor[result.keyword.avaliacao] || '#fff' }}>
                {result.keyword.avaliacao}
              </span>
            </div>
            <p className="font-['Noto_Sans'] text-[11px] text-gray-600">{result.keyword.detalhe}</p>
          </div>

          {/* Quick Wins card */}
          {result.quick_wins && result.quick_wins.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
              <h4 className="font-['Noto_Sans'] text-[12px] text-gray-900 font-semibold flex items-center gap-[6px] mb-[8px]">
                <Zap size={13} className="text-[#a57255]" />
                Proximos passos recomendados
              </h4>
              <div className="space-y-[6px]">
                {result.quick_wins.map((win, i) => (
                  <div key={i} className="flex items-start gap-[8px]">
                    <Zap size={11} className="text-[#a57255] mt-[2px] shrink-0" />
                    <span className="font-['Noto_Sans'] text-[11px] text-gray-500">{win}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Batch analyze button */}
      {availableProviders.length > 0 && !batchRunning && (
        <button
          onClick={handleBatchAnalyze}
          disabled={loading}
          className="flex items-center gap-[6px] border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 font-['Noto_Sans'] text-[11px] px-[14px] py-[7px] rounded-lg transition-colors disabled:opacity-50"
        >
          <BarChart3 size={13} />
          Analisar todas as paginas ({SEO_PAGES.length})
        </button>
      )}

      {/* Batch progress */}
      {batchRunning && (
        <div className="bg-white border border-gray-200 rounded-xl p-[14px]">
          <div className="flex items-center gap-[8px] mb-[6px]">
            <Loader2 size={14} className="animate-spin text-[#a57255]" />
            <span className="font-['Noto_Sans'] text-[11px] text-gray-600">Analisando {batchProgress}/{SEO_PAGES.length} paginas...</span>
          </div>
          <div className="h-[4px] bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#a57255] rounded-full transition-all duration-300" style={{ width: `${(batchProgress / SEO_PAGES.length) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Batch results table */}
      {batchResults.length > 0 && !batchRunning && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-[14px] py-[8px] border-b border-gray-200 flex items-center gap-[8px]">
            <BarChart3 size={13} className="text-[#a57255]" />
            <h4 className="font-['Noto_Sans'] text-[12px] font-semibold text-gray-900">Resultado Geral — {batchResults.length} paginas</h4>
          </div>
          <div className="divide-y divide-gray-100">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_60px_80px_80px] gap-[8px] px-[14px] py-[5px] bg-gray-50">
              <span className="font-['Noto_Sans'] text-[9px] text-gray-400 uppercase">Pagina</span>
              <span className="font-['Noto_Sans'] text-[9px] text-gray-400 uppercase text-center">Score</span>
              <span className="font-['Noto_Sans'] text-[9px] text-gray-400 uppercase text-center">Title</span>
              <span className="font-['Noto_Sans'] text-[9px] text-gray-400 uppercase text-center">Description</span>
            </div>
            {batchResults.map((br) => (
              <button
                key={br.pageId}
                onClick={() => { setSelectedPage(br.pageId); if (br.result) setResult(br.result); }}
                className="w-full grid grid-cols-[1fr_60px_80px_80px] gap-[8px] px-[14px] py-[6px] hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-['Noto_Sans'] text-[11px] text-gray-600 truncate">{br.pageLabel}</span>
                <span className="font-['Noto_Sans'] text-[11px] font-bold text-center" style={{ color: br.result ? getScoreColor(br.result.score) : '#ef4444' }}>
                  {br.result ? br.result.score : 'Err'}
                </span>
                <span className={`font-['Noto_Sans'] text-[10px] text-center ${br.result ? '' : 'text-red-400/50'}`} style={{ color: br.result ? avaliacaoColor[br.result.title.avaliacao] : undefined }}>
                  {br.result ? br.result.title.avaliacao : '—'}
                </span>
                <span className={`font-['Noto_Sans'] text-[10px] text-center ${br.result ? '' : 'text-red-400/50'}`} style={{ color: br.result ? avaliacaoColor[br.result.description.avaliacao] : undefined }}>
                  {br.result ? br.result.description.avaliacao : '—'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export default SeoPanel;
