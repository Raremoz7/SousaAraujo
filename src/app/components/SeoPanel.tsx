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

import React, { useState, useMemo, useCallback } from 'react';
import {
  Search, Globe, FileText, CheckCircle2, AlertTriangle, XCircle,
  ChevronDown, ChevronRight, Eye, BarChart3, ListChecks, Code2,
  Smartphone, Monitor, ExternalLink, Info, TrendingUp, ArrowRight,
  CircleCheck, CircleX, CircleMinus, Image as ImageIcon, Link2,
  Heading1, Heading2, Hash, Type, Tag, Share2, Zap
} from 'lucide-react';
import { SiteSeoEditor } from './SiteSeoEditor';

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
type SeoTab = 'dashboard' | 'metatags' | 'analise' | 'checklist' | 'jsonld';

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
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
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
        <span className="font-['Noto_Sans'] font-bold text-[22px] text-white" style={{ fontSize: size * 0.22 }}>{score}</span>
        <span className="font-['Noto_Sans'] text-[9px] text-white/40" style={{ fontSize: size * 0.09 }}>/ 100</span>
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

  /* ─── Tabs config ─── */
  const tabs: { id: SeoTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={14} /> },
    { id: 'metatags', label: 'Meta Tags', icon: <Tag size={14} /> },
    { id: 'analise', label: 'Analise', icon: <Search size={14} /> },
    { id: 'checklist', label: 'Checklist', icon: <ListChecks size={14} /> },
    { id: 'jsonld', label: 'Schema.org', icon: <Code2 size={14} /> },
  ];

  return (
    <div className="space-y-[10px]">

      {/* Tab navigation — full width */}
      <div className="flex gap-[3px] bg-white/[0.02] rounded-lg p-[3px] border border-white/[0.06]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-[5px] px-[10px] py-[7px] rounded-md font-['Noto_Sans'] text-[11px] font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-[#a57255]/15 text-[#a57255] border border-[#a57255]/20'
                : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03] border border-transparent'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB: DASHBOARD
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'dashboard' && (
        <div className="space-y-[12px]">

          {/* Score overview — horizontal strip */}
          <div className="flex gap-[10px] items-stretch">
            {/* Main score — compact */}
            <div className="bg-gradient-to-br from-[#a57255]/10 via-[#1e1b19] to-[#1e1b19] border border-white/[0.08] rounded-xl px-[16px] py-[14px] flex items-center gap-[14px] shrink-0">
              <CircularScore score={globalScore} size={72} />
              <div className="flex flex-col">
                <span className="font-['Noto_Sans'] text-[13px] font-semibold" style={{ color: getScoreColor(globalScore) }}>
                  {getScoreLabel(globalScore)}
                </span>
                <span className="font-['Noto_Sans'] text-[10px] text-white/30">Score SEO Geral</span>
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
            <div className="flex-1 bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden min-w-0">
              <div className="px-[14px] py-[9px] border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="font-['Noto_Sans'] text-[12px] font-semibold text-white flex items-center gap-[6px]">
                  <TrendingUp size={13} className="text-[#a57255]" />
                  Score por Pagina
                </h3>
                <span className="font-['Noto_Sans'] text-[10px] text-white/25">{SEO_PAGES.length} paginas</span>
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
                      className={`flex items-center gap-[8px] px-[12px] py-[8px] hover:bg-white/[0.02] transition-colors text-left group ${col < 2 ? 'border-r border-white/[0.04]' : ''} ${!isLastRow ? 'border-b border-white/[0.04]' : ''}`}
                    >
                      <CircularScore score={score} size={28} />
                      <div className="flex-1 min-w-0">
                        <span className="font-['Noto_Sans'] text-[11px] text-white font-medium truncate block">{page.label}</span>
                        <div className="flex items-center gap-[6px] mt-[1px]">
                          {errors > 0 && <span className="font-['Noto_Sans'] text-[9px] text-red-400">{errors} erro{errors > 1 ? 's' : ''}</span>}
                          {warnings > 0 && <span className="font-['Noto_Sans'] text-[9px] text-yellow-400">{warnings} aviso{warnings > 1 ? 's' : ''}</span>}
                          {errors === 0 && warnings === 0 && <span className="font-['Noto_Sans'] text-[9px] text-emerald-400">OK</span>}
                        </div>
                      </div>
                      {/* Score bar — compact */}
                      <div className="w-[50px] shrink-0">
                        <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
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
              <div className="w-[340px] shrink-0 bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="px-[14px] py-[9px] border-b border-white/[0.06]">
                  <h3 className="font-['Noto_Sans'] text-[12px] font-semibold text-white flex items-center gap-[6px]">
                    <AlertTriangle size={13} className="text-yellow-500" />
                    Problemas ({allIssues.length})
                  </h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto divide-y divide-white/[0.04]">
                  {allIssues.slice(0, 20).map((issue, i) => (
                    <div key={i} className="flex items-start gap-[8px] px-[12px] py-[7px]">
                      {issue.type === 'error' ? <XCircle size={12} className="text-red-500 shrink-0 mt-[2px]" /> : <AlertTriangle size={12} className="text-yellow-500 shrink-0 mt-[2px]" />}
                      <div className="flex-1 min-w-0">
                        <span className="font-['Noto_Sans'] text-[10px] text-white/60 leading-[14px] block">{issue.message}</span>
                        <span className="font-['Noto_Sans'] text-[9px] text-white/25">{issue.page}</span>
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

          {/* Page selector */}
          <div className="flex items-center gap-[10px]">
            <span className="font-['Noto_Sans'] text-[11px] text-white/40 shrink-0">Pagina:</span>
            <select
              value={selectedPage}
              onChange={e => setSelectedPage(e.target.value)}
              className="flex-1 h-[36px] bg-[#1a1816] border border-white/[0.08] rounded-lg px-[12px] font-['Noto_Sans'] text-[12px] text-white focus:border-[#a57255]/40 focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {SEO_PAGES.map(p => (
                <option key={p.id} value={p.id}>{p.label} ({p.route})</option>
              ))}
            </select>
            {/* Score badge */}
            <div className="shrink-0 flex items-center gap-[6px] px-[10px] py-[6px] rounded-lg border border-white/[0.06]" style={{ borderColor: `${getScoreColor(pageAnalysis[selectedPage]?.score || 0)}30` }}>
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
                      <label className="font-['Noto_Sans'] text-[11px] text-white/50 mb-[4px] block">Robots (indexacao)</label>
                      <select
                        value={getSeoVal(selectedPage, 'robots') || 'index, follow'}
                        onChange={e => setSeoVal(selectedPage, 'robots', e.target.value)}
                        className="w-full h-[36px] bg-[#161413] border border-white/[0.08] rounded-lg px-[12px] font-['Noto_Sans'] text-[12px] text-white/80 focus:border-[#a57255]/40 focus:outline-none transition-colors appearance-none cursor-pointer"
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
                      <label className="font-['Noto_Sans'] text-[11px] text-white/50 mb-[4px] block">Card Type</label>
                      <select
                        value={getSeoVal(selectedPage, 'twitterCard') || 'summary_large_image'}
                        onChange={e => setSeoVal(selectedPage, 'twitterCard', e.target.value)}
                        className="w-full h-[36px] bg-[#161413] border border-white/[0.08] rounded-lg px-[12px] font-['Noto_Sans'] text-[12px] text-white/80 focus:border-[#a57255]/40 focus:outline-none transition-colors appearance-none cursor-pointer"
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
              {/* SERP Preview */}
              <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px]">
                <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white/70 mb-[8px] flex items-center gap-[6px]">
                  <Eye size={12} className="text-[#a57255]" />
                  Preview Google (SERP)
                </h3>
                <SerpPreview
                  title={getSeoVal(selectedPage, 'title') || `${SEO_PAGES.find(p => p.id === selectedPage)?.label} | Sousa Araujo Advocacia`}
                  description={getSeoVal(selectedPage, 'description') || 'Adicione uma meta description para ver como ficara nos resultados do Google.'}
                  url={`sousaaraujo.adv.br${SEO_PAGES.find(p => p.id === selectedPage)?.route || ''}`}
                />
              </div>

              {/* Social Preview */}
              <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px]">
                <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white/70 mb-[8px] flex items-center gap-[6px]">
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
              <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px]">
                <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white/70 mb-[8px] flex items-center gap-[6px]">
                  <Zap size={12} className="text-[#a57255]" />
                  Diagnostico
                </h3>
                <div className="space-y-[3px]">
                  {pageAnalysis[selectedPage]?.checks.map((check, i) => (
                    <div key={i} className="flex items-center gap-[6px] py-[4px] px-[8px] rounded-lg bg-white/[0.01]">
                      <StatusIcon status={check.status} />
                      <span className="font-['Noto_Sans'] text-[10px] text-white/60 font-medium shrink-0">{check.label}</span>
                      <span className="font-['Noto_Sans'] text-[10px] text-white/35 flex-1 truncate">{check.detail}</span>
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
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════ */

/* ─── Quick Stat Card ─── */
function QuickStat({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color?: string }) {
  return (
    <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[12px] py-[10px] flex flex-col justify-center min-w-0">
      <div className="flex items-center gap-[6px] mb-[4px]">
        <span className="text-[#a57255]/60 shrink-0">{icon}</span>
        <span className="font-['Noto_Sans'] text-[10px] text-white/30 truncate">{label}</span>
      </div>
      <div className="flex items-end gap-[4px]">
        <span className="font-['Noto_Sans'] text-[20px] font-bold leading-none" style={{ color: color || '#fff' }}>{value}</span>
        <span className="font-['Noto_Sans'] text-[9px] text-white/25 mb-[2px] truncate">{sub}</span>
      </div>
    </div>
  );
}

/* ─── Collapsible Section ─── */
function CollapsibleSection({ id, title, icon, expanded, onToggle, children }: {
  id: string; title: string; icon: React.ReactNode; expanded: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center gap-[8px] px-[16px] py-[12px] hover:bg-white/[0.01] transition-colors">
        {expanded ? <ChevronDown size={13} className="text-white/25" /> : <ChevronRight size={13} className="text-white/25" />}
        <span className="text-[#a57255]/60">{icon}</span>
        <span className="font-['Noto_Sans'] text-[12px] font-semibold text-white">{title}</span>
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
        <label className="font-['Noto_Sans'] text-[11px] text-white/50">{label}</label>
        {maxRecommended && (
          <span className={`font-['Noto_Sans'] text-[10px] ${isOver ? 'text-red-400' : isOptimal ? 'text-emerald-400' : 'text-white/25'}`}>
            {len} / {maxRecommended}
          </span>
        )}
      </div>
      {help && <p className="font-['Noto_Sans'] text-[10px] text-white/25 mb-[6px]">{help}</p>}
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-[#161413] border border-white/[0.08] rounded-lg px-[12px] py-[8px] font-['Noto_Sans'] text-[12px] text-white/80 placeholder:text-white/15 focus:border-[#a57255]/40 focus:outline-none resize-none transition-colors"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-[36px] bg-[#161413] border border-white/[0.08] rounded-lg px-[12px] font-['Noto_Sans'] text-[12px] text-white/80 placeholder:text-white/15 focus:border-[#a57255]/40 focus:outline-none transition-colors"
        />
      )}
      {/* Character bar */}
      {maxRecommended && len > 0 && (
        <div className="mt-[4px] h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
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

/* ─── Google SERP Preview ─── */
function SerpPreview({ title, description, url }: { title: string; description: string; url: string }) {
  return (
    <div className="bg-white rounded-lg p-[14px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-[4px] mb-[4px]">
        <div className="w-[20px] h-[20px] rounded-full bg-[#f0f0f0] flex items-center justify-center">
          <Globe size={10} className="text-gray-500" />
        </div>
        <div>
          <span className="font-['Arial'] text-[12px] text-[#202124]">Sousa Araujo Advocacia</span>
          <div className="font-['Arial'] text-[11px] text-[#4d5156]">{url}</div>
        </div>
      </div>
      {/* Title */}
      <h3 className="font-['Arial'] text-[18px] text-[#1a0dab] leading-[24px] mb-[4px] cursor-pointer hover:underline line-clamp-2">
        {title.slice(0, 70)}{title.length > 70 ? '...' : ''}
      </h3>
      {/* Description */}
      <p className="font-['Arial'] text-[13px] text-[#4d5156] leading-[20px] line-clamp-3">
        {description.slice(0, 200)}{description.length > 200 ? '...' : ''}
      </p>
    </div>
  );
}

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


/* ─── Content Analysis Tab ─── */
function ContentAnalysisTab({ data, getSeoVal, pageAnalysis }: { data: Record<string, string>; getSeoVal: (pageId: string, field: string) => string; pageAnalysis: Record<string, { checks: SeoCheckResult[]; score: number }> }) {
  
  // Analyze panel content for SEO signals
  const contentAudit = useMemo(() => {
    const results: { pageId: string; label: string; images: number; imagesWithoutAlt: number; textLength: number; hasH1: boolean; keyword: string; keywordCount: number }[] = [];
    
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
      
      results.push({
        pageId: page.id,
        label: page.label,
        images: imageCount,
        imagesWithoutAlt: 0, // In this architecture, alt is hardcoded in components
        textLength: textContent.trim().length,
        hasH1,
        keyword,
        keywordCount,
      });
    }
    return results;
  }, [data, getSeoVal]);

  return (
    <div className="space-y-[10px]">
      {/* Table + header combined */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="font-['Noto_Sans'] text-[12px] font-semibold text-white flex items-center gap-[6px]">
            <Search size={13} className="text-[#a57255]" />
            Analise de Conteudo por Pagina
          </h3>
          <span className="font-['Noto_Sans'] text-[10px] text-white/25">Conteudo detectado via painel</span>
        </div>
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_80px_1.5fr_60px] gap-[8px] px-[14px] py-[7px] border-b border-white/[0.04] text-white/30 font-['Noto_Sans'] text-[9px] font-semibold uppercase tracking-wider">
          <span>Pagina</span>
          <span>Conteudo</span>
          <span>Imagens</span>
          <span>Keyword</span>
          <span className="text-right">Score</span>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {contentAudit.map(item => {
            const score = pageAnalysis[item.pageId]?.score || 0;
            const contentStatus = item.textLength > 500 ? 'pass' : item.textLength > 100 ? 'warning' : 'fail';
            return (
              <div key={item.pageId} className="grid grid-cols-[2fr_1fr_80px_1.5fr_60px] gap-[8px] px-[14px] py-[7px] items-center hover:bg-white/[0.01] transition-colors">
                <span className="font-['Noto_Sans'] text-[11px] text-white font-medium truncate">{item.label}</span>
                <div className="flex items-center gap-[4px]">
                  <StatusIcon status={contentStatus} />
                  <span className="font-['Noto_Sans'] text-[10px] text-white/50">{item.textLength > 0 ? `${item.textLength}` : '—'}</span>
                </div>
                <span className="font-['Noto_Sans'] text-[10px] text-white/50">{item.images}</span>
                <div className="flex items-center gap-[3px] min-w-0">
                  {item.keyword ? (
                    <>
                      <span className={`font-['Noto_Sans'] text-[10px] shrink-0 ${item.keywordCount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {item.keywordCount}x
                      </span>
                      <span className="font-['Noto_Sans'] text-[9px] text-white/20 truncate">{item.keyword}</span>
                    </>
                  ) : (
                    <span className="font-['Noto_Sans'] text-[10px] text-white/20">—</span>
                  )}
                </div>
                <span className="font-['Noto_Sans'] text-[11px] font-semibold text-right" style={{ color: getScoreColor(score) }}>{score}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips — 2 column grid */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px]">
        <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white mb-[8px] flex items-center gap-[6px]">
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
              <span className="font-['Noto_Sans'] text-[10px] text-white/40 leading-[14px]">{tip.text}</span>
            </div>
          ))}
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
    const hasJsonLd = data['seo.global.jsonld.business'] || data['seo.global.jsonld.custom'];
    advChecks.push({
      label: 'Schema.org (JSON-LD)',
      status: hasJsonLd ? 'pass' : 'warning',
      detail: hasJsonLd ? 'Dados estruturados configurados' : 'Configure na aba Schema.org para rich snippets no Google'
    });
    advChecks.push({
      label: 'Sitemap XML',
      status: 'warning',
      detail: 'Sera gerado na conversao para WordPress/Elementor (plugin Yoast/RankMath)'
    });
    advChecks.push({
      label: 'Robots.txt',
      status: 'warning',
      detail: 'Sera configurado no servidor de producao'
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
      <div className="bg-gradient-to-r from-[#a57255]/10 via-[#1e1b19] to-[#1e1b19] border border-white/[0.08] rounded-xl px-[16px] py-[10px] flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <CircularScore score={Math.round((passedChecks / totalChecks) * 100)} size={44} />
          <div>
            <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-white flex items-center gap-[6px]">
              <ListChecks size={14} className="text-[#a57255]" />
              Checklist Tecnico SEO
            </h3>
            <p className="font-['Noto_Sans'] text-[10px] text-white/35">{passedChecks}/{totalChecks} verificacoes aprovadas</p>
          </div>
        </div>
      </div>

      {/* Categories — responsive grid */}
      <div className="grid grid-cols-3 gap-[10px]">
        {checks.map((cat, ci) => (
          <div key={ci} className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-[14px] py-[8px] border-b border-white/[0.06] flex items-center justify-between">
              <h4 className="font-['Noto_Sans'] text-[11px] font-semibold text-white">{cat.category}</h4>
              <span className="font-['Noto_Sans'] text-[10px] text-white/25">
                {cat.checks.filter(c => c.status === 'pass').length}/{cat.checks.length}
              </span>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {cat.checks.map((check, i) => (
                <div key={i} className="flex items-start gap-[8px] px-[12px] py-[7px]">
                  <StatusIcon status={check.status} />
                  <div className="flex-1 min-w-0">
                    <span className="font-['Noto_Sans'] text-[11px] text-white/70 font-medium">{check.label}</span>
                    <p className="font-['Noto_Sans'] text-[10px] text-white/30 mt-[1px] leading-[13px]">{check.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="font-['Noto_Sans'] text-[9px] text-white/20 uppercase tracking-[1px] shrink-0">
          Schemas gerados automaticamente
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
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
        <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px]">
          <h4 className="font-['Noto_Sans'] text-[11px] font-semibold text-white mb-[3px] flex items-center gap-[5px]">
            <Code2 size={12} className="text-[#a57255]" />
            JSON-LD Customizado
          </h4>
          <p className="font-['Noto_Sans'] text-[9px] text-white/30 mb-[6px]">Cole JSON-LD adicional aqui.</p>
          <textarea
            value={data['seo.global.jsonld.custom'] || ''}
            onChange={e => onChange('seo.global.jsonld.custom', e.target.value)}
            rows={6}
            placeholder='{"@context": "https://schema.org", ...}'
            className="w-full bg-[#111] border border-white/[0.08] rounded-lg p-[10px] font-mono text-[10px] text-emerald-400/70 placeholder:text-white/10 focus:border-[#a57255]/40 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Validation tip — compact */}
      <div className="bg-[#1a1816] border border-[#a57255]/15 rounded-xl px-[14px] py-[10px] flex items-center gap-[8px]">
        <Info size={13} className="text-[#a57255] shrink-0" />
        <p className="font-['Noto_Sans'] text-[10px] text-white/50">
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
    <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="px-[16px] py-[12px] flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-['Noto_Sans'] text-[12px] font-semibold text-white">{title}</h4>
          <p className="font-['Noto_Sans'] text-[10px] text-white/30 mt-[1px]">{description}</p>
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
            className="px-[8px] py-[5px] rounded-md text-white/30 hover:text-white/60 hover:bg-white/[0.03] transition-colors"
          >
            {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-white/[0.04]">
          <pre className="p-[14px] bg-[#111] text-[11px] font-mono text-emerald-400/60 overflow-x-auto max-h-[300px] overflow-y-auto leading-[18px]">
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}

export default SeoPanel;
