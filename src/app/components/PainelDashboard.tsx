/**
 * PainelDashboard — Status Dashboard das Páginas + Heatmap de CTAs
 *
 * Mostra o estado de completude de cada página (SEO preenchido, imagens,
 * textos editados vs. default) e um contador de cliques nos CTAs
 * persistido no Supabase via endpoint /cta-clicks + localStorage fallback.
 */

import React, { useMemo } from 'react';
import {
  Layout, Zap, Info, CheckCircle2, AlertTriangle,
  Image as ImageIcon, FileText, Globe, ArrowRight,
  BarChart3, TrendingUp, Search as SearchIcon
} from 'lucide-react';
import { isValidPanelValue } from '../hooks/usePanelContent';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const CTA_API = `https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/cta-clicks`;

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface DashboardProps {
  data: Record<string, string>;
  onNavigate?: (pageId: string) => void;
}

interface DashboardPage {
  id: string;
  label: string;
  panelPageId: string;
  seoKey: string;
  imageKeys: string[];
  textKeys: string[];
}

/* ═══════════════════════════════════════════════════════════════
   PAGE DEFINITIONS — usando as chaves REAIS do projeto
   ═══════════════════════════════════════════════════════════════ */

const DASHBOARD_PAGES: DashboardPage[] = [
  {
    id: 'home', label: 'Home', panelPageId: 'home',
    seoKey: 'seo.home.title',
    imageKeys: [],  // imagens usam fallback seguro — nao penalizar
    textKeys: ['home.hero.title', 'home.hero.subtitle', 'home.about.title', 'home.about.paragraph1', 'home.diff.title', 'home.cta.title'],
  },
  {
    id: 'sobre', label: 'Sobre', panelPageId: 'sobre',
    seoKey: 'seo.sobre.title',
    imageKeys: [],  // imagens hardcoded/CSS — sem campo no painel
    textKeys: ['sobre.hero.title', 'sobre.hero.subtitle', 'sobre.quem.title', 'sobre.quem.paragraph1'],
  },
  {
    id: 'areas', label: 'Areas de Atuacao', panelPageId: 'areas',
    seoKey: 'seo.areas.title',
    imageKeys: [],  // hero usa CSS gradient — sem campo no painel
    textKeys: ['areas.hero.title', 'areas.hero.desc', 'areas.area1.title', 'areas.area2.title', 'areas.area3.title', 'areas.area4.title'],
  },
  {
    id: 'blog', label: 'Blog', panelPageId: 'blog',
    seoKey: 'seo.blog.title',
    imageKeys: [],  // sem imagens gerenciadas no painel
    textKeys: ['blog.hero.title', 'blog.hero.subtitle', 'blog.article1.title', 'blog.article2.title', 'blog.article3.title'],
  },
  {
    id: 'faq', label: 'FAQ', panelPageId: 'faq',
    seoKey: 'seo.faq.title',
    imageKeys: [],  // hero usa CSS gradient — sem campo no painel
    textKeys: ['faq.hero.title', 'faq.section.title', 'faq.item1.q', 'faq.item1.a', 'faq.item2.q'],
  },
  {
    id: 'contato', label: 'Contato', panelPageId: 'contato',
    seoKey: 'seo.contato.title',
    imageKeys: [],  // imagem de fundo usa fallback CSS — nao penalizar
    textKeys: ['contato.title', 'contato.address', 'contato.phone'],
  },
  {
    id: 'videos', label: 'Videos Educativos', panelPageId: 'videos',
    seoKey: 'seo.videos.title',
    imageKeys: [],  // sem imagens gerenciadas no painel
    textKeys: ['vidpage.hero.title', 'vidpage.hero.desc', 'vidpage.video1.title'],
  },
  {
    id: 'parceiros', label: 'Rede de Parceiros', panelPageId: 'parceiros',
    seoKey: 'seo.parceiros.title',
    imageKeys: [],  // sem imagens gerenciadas no painel
    textKeys: ['parceiros.hero.title', 'parceiros.hero.subtitle', 'parceiros.cta.title'],
  },
  {
    id: 'homologacao', label: 'LP Homologacao', panelPageId: 'lp-homologacao',
    seoKey: 'seo.homologacao.title',
    imageKeys: [],  // hero usa fallback seguro — nao penalizar
    textKeys: ['lp-homologacao.hero.title', 'lp-homologacao.hero.subtitle', 'lp-homologacao.trust.title', 'lp-homologacao.trust.body'],
  },
  {
    id: 'divorcio', label: 'LP Divorcio', panelPageId: 'lp-divorcio',
    seoKey: 'seo.divorcio.title',
    imageKeys: ['lp-divorcio.hero.image', 'lp-divorcio.parallax.image'],
    textKeys: ['lp-divorcio.hero.title', 'lp-divorcio.hero.subtitle', 'lp-divorcio.trust.title', 'lp-divorcio.trust.body'],
  },
  {
    id: 'imoveis', label: 'LP Imoveis', panelPageId: 'lp-imoveis',
    seoKey: 'seo.imoveis.title',
    imageKeys: ['lp-imoveis.hero.image'],
    textKeys: ['lp-imoveis.hero.title', 'lp-imoveis.hero.subtitle', 'lp-imoveis.trust.title', 'lp-imoveis.trust.body'],
  },
  {
    id: 'guarda', label: 'LP Guarda', panelPageId: 'lp-guarda',
    seoKey: 'seo.guarda.title',
    imageKeys: ['lp-guarda.hero.image'],
    textKeys: ['lp-guarda.hero.title', 'lp-guarda.hero.subtitle', 'lp-guarda.trust.title', 'lp-guarda.trust.body'],
  },
  {
    id: 'pensao', label: 'LP Pensao', panelPageId: 'lp-pensao',
    seoKey: 'seo.pensao.title',
    imageKeys: ['lp-pensao.hero.image'],
    textKeys: ['lp-pensao.hero.title', 'lp-pensao.hero.subtitle', 'lp-pensao.trust.title', 'lp-pensao.trust.body'],
  },
  {
    id: 'inventario', label: 'LP Inventario', panelPageId: 'lp-inventario',
    seoKey: 'seo.inventario.title',
    imageKeys: ['lp-inventario.hero.image'],
    textKeys: ['lp-inventario.hero.title', 'lp-inventario.hero.subtitle', 'lp-inventario.trust.title', 'lp-inventario.trust.body'],
  },
  {
    id: 'uniao', label: 'LP Uniao Estavel', panelPageId: 'lp-uniao',
    seoKey: 'seo.uniao.title',
    imageKeys: ['lp-uniao.hero.image'],
    textKeys: ['lp-uniao.hero.title', 'lp-uniao.hero.subtitle', 'lp-uniao.trust.title', 'lp-uniao.trust.body'],
  },
  {
    id: 'pmes', label: 'LP PMEs', panelPageId: 'lp-pmes',
    seoKey: 'seo.pmes.title',
    imageKeys: ['lp-pmes.hero.image'],
    textKeys: ['lp-pmes.hero.title', 'lp-pmes.hero.subtitle', 'lp-pmes.trust.title', 'lp-pmes.trust.body'],
  },
  {
    id: 'inpi', label: 'LP Registro Marca', panelPageId: 'lp-inpi',
    seoKey: 'seo.inpi.title',
    imageKeys: ['lp-inpi.hero.image'],
    textKeys: ['lp-inpi.hero.title', 'lp-inpi.hero.subtitle', 'lp-inpi.trust.title', 'lp-inpi.trust.body'],
  },
];

/* ─── CTA Keys for click tracking ─── */
const CTA_KEYS = [
  { key: 'cta.clicks.home',        label: 'CTA Home — Agendar' },
  { key: 'cta.clicks.homologacao', label: 'CTA LP Homologacao' },
  { key: 'cta.clicks.divorcio',    label: 'CTA LP Divorcio' },
  { key: 'cta.clicks.imoveis',     label: 'CTA LP Imoveis' },
  { key: 'cta.clicks.guarda',      label: 'CTA LP Guarda' },
  { key: 'cta.clicks.pensao',      label: 'CTA LP Pensao' },
  { key: 'cta.clicks.inventario',  label: 'CTA LP Inventario' },
  { key: 'cta.clicks.uniao',       label: 'CTA LP Uniao Estavel' },
  { key: 'cta.clicks.pmes',        label: 'CTA LP PMEs' },
  { key: 'cta.clicks.inpi',        label: 'CTA LP Registro Marca' },
  { key: 'cta.clicks.contato',     label: 'Formulario de Contato' },
  { key: 'cta.clicks.sobre',       label: 'CTA Sobre — Trabalhe Conosco' },
  { key: 'cta.clicks.areas',       label: 'CTA Areas de Atuacao' },
  { key: 'cta.clicks.parceiros',   label: 'CTA Rede de Parceiros' },
  { key: 'cta.clicks.blog',        label: 'CTA Blog — Sidebar' },
];

/* ═══════════════════════════════════════════════════════════════
   UTILITY — trackCtaClick (importável por componentes do site)
   ═══════════════════════════════════════════════════════════════ */

/**
 * Registra um clique em CTA.
 * 1. Salva em localStorage para garantia (offline-first)
 * 2. Envia ao servidor em fire-and-forget (POST /cta-clicks)
 */
export function trackCtaClick(pageKey: string): void {
  const kvKey = `cta.clicks.${pageKey}`;
  try {
    // localStorage buffer
    const storageKey = `cta_pending_${pageKey}`;
    const current = parseInt(localStorage.getItem(storageKey) || '0', 10);
    localStorage.setItem(storageKey, String(current + 1));
  } catch { /* silencia em SSR ou sem storage */ }

  // Fire-and-forget POST ao servidor
  try {
    fetch(CTA_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ clicks: { [kvKey]: 1 } }),
    }).catch(() => { /* ignora falha — localStorage é fallback */ });
  } catch { /* SSR guard */ }
}

/**
 * Busca cliques persistidos no servidor (GET /cta-clicks).
 * Retorna Record<string, number> ou {} em caso de erro.
 */
export async function fetchServerCtaClicks(): Promise<Record<string, number>> {
  try {
    const res = await fetch(CTA_API, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` },
    });
    if (!res.ok) return {};
    const json = await res.json();
    return (json.data && typeof json.data === 'object') ? json.data : {};
  } catch {
    return {};
  }
}

/**
 * Mescla cliques pendentes do localStorage com os dados do KV.
 * Também envia pendentes ao servidor via POST /cta-clicks.
 * Retorna um objeto de updates se houver pendentes, ou null.
 */
export function mergePendingCtaClicks(loadedData: Record<string, string>): Record<string, string> | null {
  try {
    const pendingKeys = Object.keys(localStorage).filter(k => k.startsWith('cta_pending_'));
    if (pendingKeys.length === 0) return null;

    const updates: Record<string, string> = {};
    const serverClicks: Record<string, number> = {};

    pendingKeys.forEach(pk => {
      const pageKey = pk.replace('cta_pending_', '');
      const kvKey = `cta.clicks.${pageKey}`;
      const existing = parseInt(loadedData[kvKey] || '0', 10);
      const pending = parseInt(localStorage.getItem(pk) || '0', 10);
      if (pending > 0) {
        updates[kvKey] = String(existing + pending);
        serverClicks[kvKey] = pending;
        localStorage.removeItem(pk);
      }
    });

    // Flush pendentes ao servidor
    if (Object.keys(serverClicks).length > 0) {
      try {
        fetch(CTA_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ clicks: serverClicks }),
        }).catch(() => {});
      } catch { /* guard */ }
    }

    return Object.keys(updates).length > 0 ? updates : null;
  } catch {
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════════
   HELPER — Check if value is "edited" (non-empty, non-figma:asset)
   ═══════════════════════════════════════════════════════════════ */

function isEdited(data: Record<string, string>, key: string): boolean {
  const val = data[key];
  return isValidPanelValue(val);
}

/** Para imagens, figma:asset/ também conta como preenchido (é uma imagem real do Figma) */
function hasImage(data: Record<string, string>, key: string): boolean {
  const val = data[key];
  return val !== undefined && val !== '';
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function PainelDashboard({ data, onNavigate }: DashboardProps) {

  /* ── Page scores ── */
  const pageScores = useMemo(() => {
    return DASHBOARD_PAGES.map(page => {
      const hasSeo = isEdited(data, page.seoKey);
      const hasImages = page.imageKeys.length === 0 ||
        page.imageKeys.some(k => hasImage(data, k));
      const editedTexts = page.textKeys.filter(k => isEdited(data, k)).length;
      const textPct = page.textKeys.length > 0
        ? Math.round((editedTexts / page.textKeys.length) * 100)
        : 100;
      const score = Math.round(
        (hasSeo ? 35 : 0) +
        (hasImages ? 25 : 0) +
        (textPct * 0.4)
      );
      return { ...page, hasSeo, hasImages, textPct, score };
    }).sort((a, b) => a.score - b.score);
  }, [data]);

  const avgScore = useMemo(() =>
    Math.round(pageScores.reduce((acc, p) => acc + p.score, 0) / pageScores.length),
    [pageScores]
  );
  const fullyReady = pageScores.filter(p => p.score >= 80).length;
  const needsWork = pageScores.filter(p => p.score < 50).length;

  /* ── CTA clicks ── */
  const ctaData = useMemo(() => {
    return CTA_KEYS.map(c => ({
      ...c,
      count: parseInt(data[c.key] || '0', 10),
    })).sort((a, b) => b.count - a.count);
  }, [data]);

  const totalClicks = ctaData.reduce((acc, c) => acc + c.count, 0);
  const maxClicks = Math.max(...ctaData.map(c => c.count), 1);

  /* ── Quick stats ── */
  const totalStoredKeys = Object.keys(data).length;
  const figmaAssetCount = Object.values(data).filter(v => v?.startsWith('figma:asset/')).length;

  return (
    <div className="space-y-[16px] pb-[60px]">

      {/* ── Header ── */}
      <div>
        <h2 className="font-['Marcellus'] text-[20px] text-gray-900 tracking-[-0.4px]">
          Dashboard
        </h2>
        <p className="font-['Noto_Sans'] text-[12px] text-gray-400 mt-[3px]">
          Visao geral do estado do site — {DASHBOARD_PAGES.length} paginas monitoradas
        </p>
      </div>

      {/* ── Summary Cards — 4 columns ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[8px]">
        {[
          {
            label: 'Score medio',
            value: `${avgScore}`,
            suffix: '/100',
            color: avgScore >= 80 ? '#22c55e' : avgScore >= 50 ? '#eab308' : '#ef4444',
            sub: 'completude geral do site',
            icon: <TrendingUp size={14} />,
          },
          {
            label: 'Paginas prontas',
            value: `${fullyReady}`,
            suffix: `/${DASHBOARD_PAGES.length}`,
            color: '#a57255',
            sub: 'score ≥ 80',
            icon: <CheckCircle2 size={14} />,
          },
          {
            label: 'Precisam atencao',
            value: `${needsWork}`,
            suffix: '',
            color: needsWork > 0 ? '#ef4444' : '#22c55e',
            sub: 'score < 50',
            icon: <AlertTriangle size={14} />,
          },
          {
            label: 'Chaves no Supabase',
            value: `${totalStoredKeys}`,
            suffix: figmaAssetCount > 0 ? ` (${figmaAssetCount} assets)` : '',
            color: figmaAssetCount > 0 ? '#eab308' : '#a57255',
            sub: figmaAssetCount > 0 ? 'figma:asset pendentes' : 'dados salvos',
            icon: <Globe size={14} />,
          },
        ].map(card => (
          <div key={card.label} className="bg-white border border-gray-200 rounded-xl px-[14px] py-[12px]">
            <div className="flex items-center gap-[6px] mb-[8px]">
              <span className="text-gray-300">{card.icon}</span>
              <p className="font-['Noto_Sans'] text-[10px] text-gray-400 uppercase tracking-[0.6px]">
                {card.label}
              </p>
            </div>
            <div className="flex items-baseline gap-[2px]">
              <span className="font-['Noto_Sans'] text-[28px] font-bold tabular-nums leading-none" style={{ color: card.color }}>
                {card.value}
              </span>
              <span className="font-['Noto_Sans'] text-[13px] text-gray-400">{card.suffix}</span>
            </div>
            <p className="font-['Noto_Sans'] text-[10px] text-gray-400 mt-[4px]">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Page Status Table ── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <Layout size={12} className="text-[#a57255]" />
            <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-900">
              Status por pagina
            </h3>
          </div>
          <div className="flex items-center gap-[12px] font-['Noto_Sans'] text-[9px] text-gray-400">
            <span className="flex items-center gap-[3px]"><span className="w-[6px] h-[6px] rounded-full bg-emerald-500" /> SEO</span>
            <span className="flex items-center gap-[3px]"><span className="w-[6px] h-[6px] rounded-full bg-blue-500" /> IMG</span>
            <span className="flex items-center gap-[3px]"><span className="w-[6px] h-[6px] rounded-full bg-purple-500" /> Textos</span>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {pageScores.map(page => (
            <div
              key={page.id}
              className="flex items-center gap-[10px] px-[14px] py-[8px] hover:bg-gray-50 transition-colors group cursor-pointer"
              onClick={() => onNavigate?.(page.panelPageId)}
            >
              {/* Score */}
              <div className="w-[30px] shrink-0 text-right">
                <span
                  className="font-['Noto_Sans'] text-[11px] font-bold tabular-nums"
                  style={{ color: page.score >= 80 ? '#22c55e' : page.score >= 50 ? '#eab308' : '#ef4444' }}
                >
                  {page.score}
                </span>
              </div>

              {/* Mini progress */}
              <div className="w-[48px] h-[3px] bg-gray-100 rounded-full shrink-0">
                <div
                  className="h-[3px] rounded-full transition-all duration-500"
                  style={{
                    width: `${page.score}%`,
                    background: page.score >= 80 ? '#22c55e' : page.score >= 50 ? '#eab308' : '#ef4444'
                  }}
                />
              </div>

              {/* Label */}
              <span className="font-['Noto_Sans'] text-[11px] text-gray-600 flex-1 truncate group-hover:text-gray-900 transition-colors">
                {page.label}
              </span>

              {/* Badges */}
              <div className="flex items-center gap-[4px] shrink-0">
                <span
                  className={`font-['Noto_Sans'] text-[9px] px-[5px] py-[1px] rounded font-medium ${
                    page.hasSeo
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-red-50 text-red-400'
                  }`}
                  title={page.hasSeo ? 'SEO preenchido' : 'SEO pendente'}
                >
                  SEO
                </span>
                <span
                  className={`font-['Noto_Sans'] text-[9px] px-[5px] py-[1px] rounded font-medium ${
                    page.hasImages
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-50 text-gray-300'
                  }`}
                  title={page.hasImages ? 'Imagens OK' : 'Imagens pendentes'}
                >
                  IMG
                </span>
                <span
                  className={`font-['Noto_Sans'] text-[9px] px-[5px] py-[1px] rounded tabular-nums font-medium ${
                    page.textPct >= 80
                      ? 'bg-purple-50 text-purple-600'
                      : page.textPct >= 50
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-gray-50 text-gray-300'
                  }`}
                  title={`${page.textPct}% dos textos editados`}
                >
                  {page.textPct}%
                </span>
              </div>

              {/* Navigate arrow */}
              <ArrowRight size={12} className="shrink-0 text-transparent group-hover:text-[#a57255]/50 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA Click Heatmap ── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <Zap size={12} className="text-[#a57255]" />
            <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-900">
              Cliques em CTAs
            </h3>
          </div>
          <span className="font-['Noto_Sans'] text-[10px] text-gray-400 tabular-nums">
            Total: {totalClicks.toLocaleString('pt-BR')}
          </span>
        </div>

        {totalClicks === 0 ? (
          <div className="px-[14px] py-[28px] text-center">
            <Zap size={24} className="text-gray-200 mx-auto mb-[8px]" />
            <p className="font-['Noto_Sans'] text-[11px] text-gray-400">
              Nenhum clique registrado ainda.
            </p>
            <p className="font-['Noto_Sans'] text-[10px] text-gray-300 mt-[4px] max-w-[320px] mx-auto leading-[15px]">
              Para ativar o rastreamento, importe
              <code className="text-[#a57255]/60 mx-[3px]">trackCtaClick(key)</code>
              de <code className="text-[#a57255]/60 mx-[3px]">PainelDashboard.tsx</code>
              {' '}e chame nos botoes "Agendar Consulta" de cada LP.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {ctaData.map(cta => (
              <div key={cta.key} className="flex items-center gap-[10px] px-[14px] py-[7px]">
                <span className="font-['Noto_Sans'] text-[11px] text-gray-600 flex-1 truncate">
                  {cta.label}
                </span>
                <div className="w-[80px] h-[3px] bg-gray-100 rounded-full shrink-0">
                  <div
                    className="h-[3px] rounded-full bg-[#a57255] transition-all"
                    style={{ width: `${(cta.count / maxClicks) * 100}%` }}
                  />
                </div>
                <span className="font-['Noto_Sans'] text-[11px] text-gray-400 w-[32px] text-right tabular-nums shrink-0">
                  {cta.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-2 gap-[8px]">
        <button
          onClick={() => onNavigate?.('seo')}
          className="bg-white border border-gray-200 rounded-xl px-[14px] py-[12px] text-left hover:border-[#a57255]/20 hover:bg-[#a57255]/5 transition-all group"
        >
          <div className="flex items-center gap-[6px] mb-[4px]">
            <SearchIcon size={12} className="text-[#a57255]/50" />
            <span className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">SEO e Meta Tags</span>
          </div>
          <p className="font-['Noto_Sans'] text-[10px] text-gray-400 leading-[14px]">
            {pageScores.filter(p => p.hasSeo).length}/{DASHBOARD_PAGES.length} paginas com SEO
          </p>
        </button>
        <button
          onClick={() => onNavigate?.('audit')}
          className="bg-white border border-gray-200 rounded-xl px-[14px] py-[12px] text-left hover:border-amber-500/20 hover:bg-amber-500/5 transition-all group"
        >
          <div className="flex items-center gap-[6px] mb-[4px]">
            <AlertTriangle size={12} className="text-amber-500/50" />
            <span className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">Auditoria de Campos</span>
          </div>
          <p className="font-['Noto_Sans'] text-[10px] text-gray-400 leading-[14px]">
            Verificar campos orfaos e desconectados
          </p>
        </button>
      </div>

      {/* ── GA4 Note ── */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-[14px] py-[10px] flex items-start gap-[8px]">
        <Info size={12} className="text-gray-300 mt-[1px] shrink-0" />
        <p className="font-['Noto_Sans'] text-[10px] text-gray-400 leading-[15px]">
          Para metricas avancadas (sessoes, conversoes, origem do trafego),
          configure o Google Analytics 4 e acesse o painel em
          <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-[#a57255]/60 hover:text-[#a57255] ml-[3px] transition-colors">
            analytics.google.com
          </a>.
        </p>
      </div>
    </div>
  );
}

/* ─── Circular Score Component ─── */
function CircularScore({ score, size = 100 }: { score: number; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={5} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={5} strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-['Noto_Sans'] font-bold text-[22px] text-gray-900" style={{ fontSize: size * 0.22 }}>{score}</span>
        <span className="font-['Noto_Sans'] text-[9px] text-gray-400" style={{ fontSize: size * 0.09 }}>/ 100</span>
      </div>
    </div>
  );
}

/* ─── Helper Function to Get Score Color ─── */
function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 50) return '#eab308';
  return '#ef4444';
}