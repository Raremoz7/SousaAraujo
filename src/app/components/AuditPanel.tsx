/**
 * AuditPanel — Indicador de campos não conectados
 *
 * Compara três fontes de verdade:
 *   1. Campos definidos no painel (PAGES config)  → panelKeys
 *   2. Chaves realmente lidas pelos componentes    → componentKeys
 *   3. Chaves salvas no Supabase                   → storedKeys
 *
 * Categorias:
 *   - Órfãos no Painel:  campo no painel mas nenhum componente lê
 *   - Sem Editor:         componente lê, mas nenhum campo no painel
 *   - Dados Mortos:       salvo no Supabase mas ninguém lê
 *   - Assets Pendentes:   valores figma:asset/* que precisam de migração
 */

import React, { useMemo, useState, useCallback } from 'react';
import {
  AlertTriangle, CheckCircle2, XCircle, Ghost, Database,
  ChevronDown, ChevronRight, Search, Image as ImageIcon,
  FileText, Globe, Copy, Check, ChevronsUpDown,
  Download, ArrowRight, BarChart3, Info, Zap, Sparkles
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface AuditPanelProps {
  panelKeys: string[];
  data: Record<string, string>;
  /** Navigate to a specific panel page (e.g. 'home', 'footer') */
  onNavigate?: (pageId: string) => void;
}

type AuditCategory = 'orphan' | 'noEditor' | 'deadData' | 'pendingAsset';

interface AuditItem {
  key: string;
  category: AuditCategory;
  page: string;
  detail?: string;
  sourceFile?: string;
  /** Page ID for navigation */
  panelPageId?: string;
}

interface PageCoverage {
  page: string;
  panelPageId: string;
  total: number;
  connected: number;
  orphan: number;
  noEditor: number;
  percent: number;
}

/* ═══════════════════════════════════════════════════════════════
   STATIC REGISTRY — Chaves efetivamente lidas por componentes
   ═══════════════════════════════════════════════════════════════ */

function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

function expand(prefix: string, suffixes: string[]): string[] {
  return suffixes.map(s => `${prefix}.${s}`);
}

function numbered(prefix: string, count: number, suffixes: string[]): string[] {
  return range(count).flatMap(i =>
    suffixes.map(s => `${prefix}${i}.${s}`)
  );
}

/** Map of key → source file (for reference/debugging) */
const KEY_SOURCE: Record<string, string> = {};
function register(file: string, keys: string[]): string[] {
  keys.forEach(k => { KEY_SOURCE[k] = file; });
  return keys;
}

function buildComponentKeys(): Set<string> {
  const keys: string[] = [
    /* ─── Navbar.tsx ─── */
    ...register('Navbar.tsx', [
      ...numbered('navbar.item', 6, ['label']),
      ...numbered('navbar.servico', 9, ['label']),
      'navbar.servicos.label', 'navbar.cta.text',
      'navbar.extra1.label', 'navbar.extra2.label',
    ]),

    /* ─── Footer.tsx ─── */
    ...register('Footer.tsx', [
      'footer.description', 'footer.contact.email', 'footer.contact.phone',
      'footer.location.address', 'footer.copyright',
      'footer.social.instagram', 'footer.social.facebook', 'footer.social.tiktok',
      'footer.social.linkedin', 'footer.social.youtube',
      'footer.newsletter.label', 'footer.newsletter.buttonText',
      'footer.contact.title', 'footer.location.title',
      'footer.ctaText', 'footer.ctaHref',
    ]),

    /* ─── Hero.tsx ─── */
    ...register('Hero.tsx',
      expand('home.hero', ['bgImage', 'subtitle', 'title', 'signature', 'videoUrl', 'ctaText', 'ctaHref']),
    ),

    /* ─── About.tsx ─── */
    ...register('About.tsx',
      expand('home.about', ['title', 'paragraph1', 'paragraph2', 'quote1', 'quote2', 'linkText', 'linkHref']),
    ),

    /* ─── Stats.tsx ─── */
    ...register('Stats.tsx', numbered('home.stat', 4, ['number', 'label'])),

    /* ─── Differentials.tsx ─── */
    ...register('Differentials.tsx', [
      'home.diff.title', 'home.diff.desc', 'home.diff.image',
      ...numbered('home.diff.item', 4, ['title', 'desc', 'linkText', 'linkHref']),
    ]),

    /* ─── PracticeAreas.tsx ─── */
    ...register('PracticeAreas.tsx', numbered('home.area', 4, ['number', 'title', 'subtitle', 'desc', 'href'])),

    /* ─── ServicesGrid.tsx ─── */
    ...register('ServicesGrid.tsx', numbered('home.service', 6, ['title', 'desc'])),

    /* ─── CtaBanner.tsx ─── */
    ...register('CtaBanner.tsx', expand('home.cta', ['title', 'buttonText', 'buttonHref', 'bgImage'])),

    /* ─── Videos.tsx ─── */
    ...register('Videos.tsx', [
      'home.videos.title', 'home.videos.viewAllText', 'home.videos.viewAllHref',
      ...numbered('home.video', 3, ['title', 'desc']),
    ]),

    /* ─── Blog.tsx ─── */
    ...register('Blog.tsx', [
      'home.articles.title', 'home.articles.viewAllText', 'home.articles.viewAllHref',
      ...numbered('home.article', 3, ['day', 'month', 'category', 'title', 'href']),
    ]),

    /* ─── Contact.tsx ─── */
    ...register('Contact.tsx',
      expand('contato', ['address', 'phone', 'submitText', 'title', 'bgImage', 'successMessage']),
    ),

    /* ─── HomePage.tsx ─── */
    ...register('HomePage.tsx', ['home.sectionOrder']),

    /* ─── SobrePage.tsx ─── */
    ...register('SobrePage.tsx', [
      'sobre.hero.title', 'sobre.hero.subtitle',
      ...numbered('sobre.stat', 4, ['number', 'label']),
      'sobre.quem.title', 'sobre.quem.paragraph1', 'sobre.quem.paragraph2',
      'sobre.bio.title',
      ...expand('sobre.bio', [
        'trajetoria.title', 'trajetoria.p1', 'trajetoria.p2', 'trajetoria.p3', 'trajetoria.p4',
        'areas.title', 'areas.p1', 'areas.p2', 'areas.p3', 'areas.p4',
        'metodo.title', 'metodo.content',
        'presencial.title', 'presencial.content',
        'rede.title', 'rede.content',
        'valores.title', 'valores.content',
        'areasAtuacao.title', 'contato.title',
      ]),
      ...numbered('sobre.testimonial', 4, ['quote', 'author', 'role']),
      'sobre.banner.caption',
      'sobre.parceiros.title', 'sobre.parceiros.desc',
      'sobre.servicos.heading',
      ...numbered('sobre.service', 14, ['title', 'desc']),
      'sobre.blog.title',
      ...numbered('sobre.article', 3, ['title', 'category', 'day', 'month', 'href']),
    ]),

    /* ─── AreasDeAtuacaoPage.tsx ─── */
    ...register('AreasDeAtuacaoPage.tsx', [
      'areas.hero.title', 'areas.hero.desc', 'areas.hero.ctaText',
      ...numbered('areas.area', 4, ['title', 'subtitle', 'expandedSubtitle', 'desc', 'check1', 'check2', 'check3', 'check4', 'href']),
      'areas.blog.heading',
      ...numbered('areas.blog.article', 3, ['title', 'category', 'day', 'month']),
      'areas.services.heading',
      ...numbered('areas.svc', 14, ['title', 'desc', 'href']),
    ]),

    /* ─── BlogPage.tsx ─── */
    ...register('BlogPage.tsx', [
      'blog.hero.title', 'blog.hero.subtitle',
      'blog.sidebar.ctaDesc', 'blog.sidebar.ctaText',
      ...numbered('blog.article', 6, ['title', 'category', 'desc', 'day', 'month', 'fullDate', 'slug']),
    ]),

    /* ─── FaqPage.tsx ─── */
    ...register('FaqPage.tsx', [
      'faq.hero.title',
      'faq.section.title', 'faq.section.desc',
      ...numbered('faq.item', 12, ['q', 'a', 'category']),
    ]),

    /* ─── VideosEducativosPage.tsx ─── */
    ...register('VideosEducativosPage.tsx', [
      'vidpage.hero.title', 'vidpage.hero.desc',
      ...numbered('vidpage.video', 9, ['title', 'desc']),
    ]),

    /* ─── ContatoPage.tsx ─── */
    ...register('ContatoPage.tsx', [
      'contato.map.alt', 'contato.mapImage', 'contato.mapLink',
    ]),

    /* ─── RedeDeParceirosPage.tsx ─── */
    ...register('RedeDeParceirosPage.tsx', [
      'parceiros.hero.title', 'parceiros.hero.subtitle',
      ...numbered('parceiros.stat', 4, ['number', 'label']),
      ...expand('parceiros.bio', ['allianceTitle', 'metodoTitle', 'perfilTitle', 'comoTitle', 'ctaText']),
      'parceiros.faq.title', 'parceiros.faq.desc',
      ...numbered('parceiros.faq', 8, ['q', 'a']),
      'parceiros.cta.title', 'parceiros.cta.desc', 'parceiros.cta.buttonText',
      'parceiros.blog.heading',
      ...numbered('parceiros.blog.article', 3, ['title', 'category', 'date']),
    ]),

    /* ─── SeoHead.tsx (dynamic seoId patterns) ─── */
    ...register('SeoHead.tsx', [
      ...expand('site', ['name', 'phone', 'email', 'address.street', 'address.city', 'address.state', 'address.zipCode']),
      ...expand('site.social', ['instagram', 'facebook', 'linkedin', 'youtube']),
      'seo.global.jsonld.custom',
    ]),

    /* ─── LpTemplate.tsx — reads lp-{id}.{key} for 8 service pages ─── */
    ...['divorcio', 'imoveis', 'guarda', 'pensao', 'inventario', 'uniao', 'pmes', 'inpi'].flatMap(svc => {
      const id = `lp-${svc}`;
      return register('LpTemplate.tsx', [
        `${id}.hero.title`, `${id}.hero.highlightedTitle`, `${id}.hero.subtitle`,
        `${id}.hero.image`, `${id}.hero.ctaText`, `${id}.hero.maxWidth`,
        `${id}.trust.feature1`, `${id}.trust.feature2`, `${id}.trust.feature3`,
        `${id}.trust.title`, `${id}.trust.body`,
        `${id}.parallax.image`,
        `${id}.metodo.title`, `${id}.metodo.image`,
        ...numbered(`${id}.metodo.step`, 3, ['label', 'desc']),
        `${id}.scenarios.title`, `${id}.scenarios.ctaSubtitle`,
        `${id}.scenarios.stickyImage`,
        ...range(6).map(i => `${id}.scenarios.item${i}`),
        `${id}.scenarios.risksTitle`,
        ...range(4).map(i => `${id}.scenarios.risk${i}`),
        ...numbered(`${id}.scenarios.deep`, 3, ['title', 'text']),
        `${id}.onlineBanner`, `${id}.riscoBanner`,
        ...numbered(`${id}.passo`, 5, ['title', 'subtitle', 'desc']),
        ...numbered(`${id}.objecao`, 6, ['q', 'a']),
        `${id}.costCta.title`, `${id}.costCta.bgImage`,
        ...range(5).map(i => `${id}.whyTrust.trust${i}`),
        ...range(3).map(i => `${id}.whyTrust.consulta${i}`),
        `${id}.whyTrust.lidianeImage`,
        `${id}.historias.title`,
        ...numbered(`${id}.historias.item`, 3, ['img', 'subtitle', 'body']),
        ...numbered(`${id}.faq`, 6, ['q', 'a']),
        `${id}.ctaText`,
      ]);
    }),

    /* ─── LpHomologacaoPage.tsx (custom layout) ─── */
    ...(() => {
      const id = 'lp-homologacao';
      return register('LpHomologacaoPage.tsx', [
        `${id}.hero.title`, `${id}.hero.highlightedTitle`, `${id}.hero.subtitle`,
        `${id}.hero.image`, `${id}.hero.ctaText`,
        `${id}.trust.feature1`, `${id}.trust.feature2`, `${id}.trust.feature3`,
        `${id}.trust.title`, `${id}.trust.body`,
        `${id}.scenarios.title`, `${id}.scenarios.ctaSubtitle`,
        `${id}.scenarios.risksTitle`,
        ...range(6).map(i => `${id}.scenarios.item${i}`),
        ...range(4).map(i => `${id}.scenarios.risk${i}`),
        ...numbered(`${id}.scenarios.deep`, 3, ['title', 'text']),
        `${id}.onlineBanner`,
        `${id}.metodo.title`,
        ...numbered(`${id}.metodo.step`, 2, ['label', 'desc']),
      ]);
    })(),

    /* ─── routes.tsx — Redirect Handler (redirect.{N}.from/to, N=1..20) ─── */
    ...register('routes.tsx', [
      ...numbered('redirect.', 20, ['from', 'to']),
    ]),

    /* ─── Section Order keys (dynamic section reordering per page) ─── */
    ...register('HomePage.tsx', ['home.sectionOrder']),
    ...register('SobrePage.tsx', ['sobre.sectionOrder']),
    ...register('AreasDeAtuacaoPage.tsx', ['areas.sectionOrder']),
    ...register('RedeDeParceirosPage.tsx', ['parceiros.sectionOrder']),
    ...register('FaqPage.tsx', ['faq.sectionOrder']),
    ...register('VideosEducativosPage.tsx', ['vidpage.sectionOrder']),
    ...register('BlogPage.tsx', ['blog.sectionOrder']),
  ];

  return new Set(keys);
}

/* ─── Key → page group label ─── */
const PAGE_GROUP_MAP: [string, string, string][] = [
  // [prefix, label, panelPageId]
  ['navbar.', 'Navbar', 'navbar'],
  ['footer.', 'Footer', 'footer'],
  ['home.', 'Home', 'home'],
  ['sobre.', 'Sobre', 'sobre'],
  ['areas.', 'Areas de Atuacao', 'areas'],
  ['blog.', 'Blog', 'blog'],
  ['faq.', 'FAQ', 'faq'],
  ['vidpage.', 'Videos Educativos', 'videos'],
  ['contato.', 'Contato', 'contato'],
  ['parceiros.', 'Rede de Parceiros', 'parceiros'],
  ['site.', 'Geral do Site', 'geral'],
  ['seo.', 'SEO', 'seo'],
  ['lp-homologacao.', 'Homologacao', 'lp-homologacao'],
  ['lp-divorcio.', 'Divorcio', 'lp-divorcio'],
  ['lp-imoveis.', 'Imoveis', 'lp-imoveis'],
  ['lp-guarda.', 'Guarda', 'lp-guarda'],
  ['lp-pensao.', 'Pensao', 'lp-pensao'],
  ['lp-inventario.', 'Inventario', 'lp-inventario'],
  ['lp-uniao.', 'Uniao Estavel', 'lp-uniao'],
  ['lp-pmes.', 'Consultoria PMEs', 'lp-pmes'],
  ['lp-inpi.', 'Registro INPI', 'lp-inpi'],
  ['redirect.', 'Redirects 301', 'redirects'],
];

function getPageInfo(key: string): { page: string; panelPageId: string } {
  for (const [prefix, label, id] of PAGE_GROUP_MAP) {
    if (key.startsWith(prefix)) return { page: label, panelPageId: id };
  }
  return { page: 'Outro', panelPageId: '' };
}

/* ─── Skippable site.* keys (generic config, not read by components) ─── */
const SKIP_ORPHAN_KEYS = new Set([
  'site.tagline', 'site.description', 'site.address.full', 'site.address.short',
  'site.address.neighborhood', 'site.hours.weekdays', 'site.hours.saturday',
  'site.social.tiktok',
]);

/* ═══════════════════════════════════════════════════════════════
   CATEGORY CONFIG
   ═══════════════════════════════════════════════════════════════ */

const CATEGORY_CFG = {
  orphan: {
    label: 'Orfaos no Painel',
    icon: <Ghost size={14} />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    desc: 'Campo editavel no painel que nenhum componente do site le. Editar nao tera efeito visual.',
    action: 'Conectar o componente via readPanel()/usePanel(), ou remover o campo do painel se nao for necessario.',
  },
  noEditor: {
    label: 'Sem Editor',
    icon: <XCircle size={14} />,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    desc: 'Componente le essa chave, mas o painel nao tem campo para edita-la.',
    action: 'Adicionar um field no PAGES config do PainelPage.tsx para permitir edicao.',
  },
  deadData: {
    label: 'Dados Mortos',
    icon: <Database size={14} />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    desc: 'Valor salvo no Supabase que ninguem referencia. Pode ser lixo de versoes antigas.',
    action: 'Considerar remover do Supabase via "Exportar JSON" → limpar → "Importar JSON".',
  },
  pendingAsset: {
    label: 'Assets Pendentes',
    icon: <ImageIcon size={14} />,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    desc: 'Valor figma:asset/* volatil armazenado no Supabase. Pode quebrar a qualquer momento.',
    action: 'Use "Migrar Imagens → Supabase" na sidebar ou faca upload individual.',
  },
} as const;

type CategoryKey = keyof typeof CATEGORY_CFG;

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function AuditPanel({ panelKeys, data, onNavigate }: AuditPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<CategoryKey | 'all'>('all');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showCoverage, setShowCoverage] = useState(true);
  const [exportedMsg, setExportedMsg] = useState('');

  const componentKeys = useMemo(() => buildComponentKeys(), []);
  const panelKeySet = useMemo(() => new Set(panelKeys), [panelKeys]);
  const storedKeys = useMemo(() => new Set(Object.keys(data)), [data]);

  /* ─── Build audit items ─── */
  const audit = useMemo(() => {
    const items: AuditItem[] = [];

    // 1. Orphans
    for (const key of panelKeys) {
      if (!componentKeys.has(key)) {
        if (key.startsWith('seo.') && !key.startsWith('seo.global')) continue;
        if (SKIP_ORPHAN_KEYS.has(key)) continue;
        const info = getPageInfo(key);
        items.push({
          key, category: 'orphan', ...info,
          detail: 'Campo no painel, mas nenhum componente le esta chave',
        });
      }
    }

    // 2. No Editor
    for (const key of componentKeys) {
      if (!panelKeySet.has(key)) {
        if (key.startsWith('seo.') && !key.startsWith('seo.global')) continue;
        if (key === 'home.sectionOrder') continue;
        if (key.endsWith('.sectionOrder')) continue;
        const info = getPageInfo(key);
        const src = KEY_SOURCE[key];
        items.push({
          key, category: 'noEditor', ...info,
          detail: `Componente le esta chave${src ? ` (${src})` : ''}, mas nao ha campo no painel`,
          sourceFile: src,
        });
      }
    }

    // 3. Dead Data
    for (const key of storedKeys) {
      if (!componentKeys.has(key) && !panelKeySet.has(key)) {
        if (key.startsWith('seo.') || key.startsWith('_') || key === 'home.sectionOrder') continue;
        // Also skip the sectionOrder keys for any page
        if (key.endsWith('.sectionOrder')) continue;
        const info = getPageInfo(key);
        const val = data[key] || '';
        items.push({
          key, category: 'deadData', ...info,
          detail: `Valor: "${val.substring(0, 80)}${val.length > 80 ? '...' : ''}"`,
        });
      }
    }

    // 4. Pending Assets
    for (const [key, value] of Object.entries(data)) {
      if (value && value.startsWith('figma:asset/')) {
        const info = getPageInfo(key);
        items.push({
          key, category: 'pendingAsset', ...info,
          detail: `figma:asset/${value.split('/').pop()}`,
        });
      }
    }

    return items;
  }, [panelKeys, panelKeySet, componentKeys, storedKeys, data]);

  /* ─── Per-page coverage ─── */
  const pageCoverage = useMemo<PageCoverage[]>(() => {
    const pageMap = new Map<string, { panelPageId: string; panelSet: Set<string>; compSet: Set<string> }>();

    for (const key of panelKeys) {
      const info = getPageInfo(key);
      if (!pageMap.has(info.page)) pageMap.set(info.page, { panelPageId: info.panelPageId, panelSet: new Set(), compSet: new Set() });
      pageMap.get(info.page)!.panelSet.add(key);
    }
    for (const key of componentKeys) {
      const info = getPageInfo(key);
      if (!pageMap.has(info.page)) pageMap.set(info.page, { panelPageId: info.panelPageId, panelSet: new Set(), compSet: new Set() });
      pageMap.get(info.page)!.compSet.add(key);
    }

    const results: PageCoverage[] = [];
    for (const [page, { panelPageId, panelSet, compSet }] of pageMap) {
      const total = panelSet.size;
      let connected = 0;
      let orphan = 0;
      for (const k of panelSet) {
        if (compSet.has(k)) connected++;
        else orphan++;
      }
      let noEditor = 0;
      for (const k of compSet) {
        if (!panelSet.has(k)) noEditor++;
      }
      results.push({
        page, panelPageId, total, connected, orphan, noEditor,
        percent: total > 0 ? Math.round((connected / total) * 100) : 100,
      });
    }

    return results.sort((a, b) => a.percent - b.percent);
  }, [panelKeys, componentKeys]);

  /* ─── Counts ─── */
  const counts = useMemo(() => {
    const c = { orphan: 0, noEditor: 0, deadData: 0, pendingAsset: 0 };
    for (const item of audit) c[item.category]++;
    return c;
  }, [audit]);

  const totalIssues = counts.orphan + counts.noEditor + counts.deadData + counts.pendingAsset;

  /* ─── Filter + Search ─── */
  const filtered = useMemo(() => {
    let items = audit;
    if (activeFilter !== 'all') items = items.filter(i => i.category === activeFilter);
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      items = items.filter(i =>
        i.key.toLowerCase().includes(s) ||
        i.page.toLowerCase().includes(s) ||
        (i.sourceFile && i.sourceFile.toLowerCase().includes(s))
      );
    }
    return items;
  }, [audit, activeFilter, searchTerm]);

  /* ─── Group by page ─── */
  const grouped = useMemo(() => {
    const map = new Map<string, AuditItem[]>();
    for (const item of filtered) {
      if (!map.has(item.page)) map.set(item.page, []);
      map.get(item.page)!.push(item);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  /* ─── Stats ─── */
  const totalPanelKeys = panelKeys.length;
  const totalComponentKeys = componentKeys.size;
  const totalStoredKeys = storedKeys.size;
  const connectedKeys = panelKeys.filter(k => componentKeys.has(k)).length;
  const healthPercent = totalPanelKeys > 0 ? Math.round((connectedKeys / totalPanelKeys) * 100) : 100;

  /* ─── Handlers ─── */
  const toggleGroup = useCallback((group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedGroups(new Set(grouped.map(([g]) => g)));
  }, [grouped]);

  const collapseAll = useCallback(() => {
    setExpandedGroups(new Set());
  }, []);

  const handleCopy = useCallback((key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  }, []);

  const handleExportReport = useCallback(() => {
    const lines: string[] = [
      '# Auditoria de Campos — Sousa Araujo Advocacia',
      `Data: ${new Date().toLocaleString('pt-BR')}`,
      '',
      `## Resumo`,
      `- Campos no Painel: ${totalPanelKeys}`,
      `- Lidos por Componentes: ${totalComponentKeys}`,
      `- Salvos no Supabase: ${totalStoredKeys}`,
      `- Conectados: ${connectedKeys} (${healthPercent}%)`,
      `- Total de problemas: ${totalIssues}`,
      '',
    ];

    for (const cat of Object.keys(CATEGORY_CFG) as CategoryKey[]) {
      const catItems = audit.filter(i => i.category === cat);
      if (catItems.length === 0) continue;
      lines.push(`## ${CATEGORY_CFG[cat].label} (${catItems.length})`);
      for (const item of catItems) {
        lines.push(`  - [${item.page}] ${item.key}${item.sourceFile ? ` (${item.sourceFile})` : ''}`);
      }
      lines.push('');
    }

    lines.push('## Cobertura por Pagina');
    for (const cov of pageCoverage) {
      lines.push(`  - ${cov.page}: ${cov.percent}% (${cov.connected}/${cov.total} conectados, ${cov.orphan} orfaos, ${cov.noEditor} sem editor)`);
    }

    const text = lines.join('\n');
    navigator.clipboard.writeText(text);
    setExportedMsg('Relatorio copiado!');
    setTimeout(() => setExportedMsg(''), 2500);
  }, [audit, pageCoverage, totalPanelKeys, totalComponentKeys, totalStoredKeys, connectedKeys, healthPercent, totalIssues]);

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */

  return (
    <div className="space-y-[20px] pb-[80px]">

      {/* ── Health Score ── */}
      <div className="bg-[#1a1715] border border-white/[0.08] rounded-xl p-[24px]">
        <div className="flex items-start justify-between mb-[20px]">
          <div>
            <h3 className="font-['Marcellus'] text-[18px] text-white tracking-[-0.3px] mb-[4px]">
              Saude da Conexao Painel ↔ Componentes
            </h3>
            <p className="font-['Noto_Sans'] text-[13px] text-white/40 leading-[1.5]">
              Auditoria em tempo real — {totalIssues} problema{totalIssues !== 1 ? 's' : ''} encontrado{totalIssues !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-[8px]">
            {/* Export */}
            <button
              onClick={handleExportReport}
              className="flex items-center gap-[5px] h-[34px] px-[12px] border border-white/[0.08] rounded-lg text-white/40 hover:text-white hover:bg-white/[0.03] transition-colors font-['Noto_Sans'] text-[11px]"
              title="Copiar relatorio para clipboard"
            >
              {exportedMsg ? (
                <><Check size={12} className="text-emerald-400" /> {exportedMsg}</>
              ) : (
                <><Download size={12} /> Exportar</>
              )}
            </button>
            {/* Score badge */}
            <div className={`flex items-center gap-[8px] px-[14px] py-[8px] rounded-lg border ${
              healthPercent >= 90 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
              healthPercent >= 70 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
              'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}>
              {healthPercent >= 90 ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              <span className="font-['Noto_Sans'] font-bold text-[20px]">{healthPercent}%</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[6px] bg-white/[0.06] rounded-full overflow-hidden mb-[16px]">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              healthPercent >= 90 ? 'bg-emerald-500' :
              healthPercent >= 70 ? 'bg-amber-500' :
              'bg-rose-500'
            }`}
            style={{ width: `${healthPercent}%` }}
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-[12px]">
          {[
            { label: 'Campos no Painel', value: totalPanelKeys, icon: <FileText size={14} className="text-white/30" /> },
            { label: 'Lidos por Componentes', value: totalComponentKeys, icon: <Globe size={14} className="text-white/30" /> },
            { label: 'Salvos no Supabase', value: totalStoredKeys, icon: <Database size={14} className="text-white/30" /> },
            { label: 'Conectados', value: connectedKeys, icon: <CheckCircle2 size={14} className="text-emerald-500/50" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-[12px]">
              <div className="flex items-center gap-[6px] mb-[6px]">
                {stat.icon}
                <span className="font-['Noto_Sans'] text-[11px] text-white/30">{stat.label}</span>
              </div>
              <span className="font-['Noto_Sans'] font-bold text-[22px] text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Per-page Coverage ── */}
      <div className="bg-[#1a1715] border border-white/[0.08] rounded-xl overflow-hidden">
        <button
          onClick={() => setShowCoverage(v => !v)}
          className="w-full flex items-center justify-between px-[20px] py-[14px] hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-[10px]">
            <BarChart3 size={16} className="text-[#a57255]" />
            <span className="font-['Noto_Sans'] font-semibold text-[13px] text-white">Cobertura por Pagina</span>
            <span className="font-['Noto_Sans'] text-[11px] text-white/25">{pageCoverage.length} paginas</span>
          </div>
          {showCoverage ? <ChevronDown size={14} className="text-white/30" /> : <ChevronRight size={14} className="text-white/30" />}
        </button>
        {showCoverage && (
          <div className="border-t border-white/[0.06] px-[20px] py-[14px] space-y-[10px]">
            {pageCoverage.map(cov => (
              <div key={cov.page} className="group">
                <div className="flex items-center justify-between mb-[4px]">
                  <div className="flex items-center gap-[8px]">
                    <span className="font-['Noto_Sans'] text-[12px] text-white/70">{cov.page}</span>
                    {cov.orphan > 0 && (
                      <span className="text-[10px] font-medium text-amber-400/70 bg-amber-500/10 px-[5px] py-[1px] rounded border border-amber-500/15">
                        {cov.orphan} orf.
                      </span>
                    )}
                    {cov.noEditor > 0 && (
                      <span className="text-[10px] font-medium text-rose-400/70 bg-rose-500/10 px-[5px] py-[1px] rounded border border-rose-500/15">
                        {cov.noEditor} s/ ed.
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <span className={`font-['Noto_Sans'] text-[11px] font-semibold ${
                      cov.percent >= 90 ? 'text-emerald-400' :
                      cov.percent >= 70 ? 'text-amber-400' :
                      'text-rose-400'
                    }`}>
                      {cov.percent}%
                    </span>
                    <span className="font-['Noto_Sans'] text-[10px] text-white/20">
                      {cov.connected}/{cov.total}
                    </span>
                    {onNavigate && cov.panelPageId && (
                      <button
                        onClick={() => onNavigate(cov.panelPageId)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#a57255]/50 hover:text-[#a57255]"
                        title={`Ir para ${cov.page}`}
                      >
                        <ArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full h-[4px] bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      cov.percent >= 90 ? 'bg-emerald-500/60' :
                      cov.percent >= 70 ? 'bg-amber-500/60' :
                      'bg-rose-500/60'
                    }`}
                    style={{ width: `${cov.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Category Filter Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[10px]">
        {(Object.keys(CATEGORY_CFG) as CategoryKey[]).map(cat => {
          const cfg = CATEGORY_CFG[cat];
          const count = counts[cat];
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(isActive ? 'all' : cat)}
              className={`flex items-center gap-[10px] p-[14px] rounded-lg border transition-all ${
                isActive
                  ? `${cfg.bgColor} ${cfg.borderColor} ring-1 ring-inset ${cfg.borderColor}`
                  : 'bg-[#1a1715] border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              <div className={cfg.color}>{cfg.icon}</div>
              <div className="text-left">
                <div className={`font-['Noto_Sans'] font-bold text-[18px] ${count > 0 ? cfg.color : 'text-white/20'}`}>
                  {count}
                </div>
                <div className="font-['Noto_Sans'] text-[10px] text-white/30 leading-tight">
                  {cfg.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Active filter action hint ── */}
      {activeFilter !== 'all' && (
        <div className={`flex items-start gap-[10px] px-[16px] py-[12px] rounded-lg border ${CATEGORY_CFG[activeFilter].borderColor} ${CATEGORY_CFG[activeFilter].bgColor}`}>
          <Zap size={14} className={`mt-[1px] shrink-0 ${CATEGORY_CFG[activeFilter].color}`} />
          <div>
            <p className={`font-['Noto_Sans'] font-semibold text-[12px] ${CATEGORY_CFG[activeFilter].color} mb-[2px]`}>
              Como corrigir:
            </p>
            <p className="font-['Noto_Sans'] text-[11px] text-white/40 leading-[1.5]">
              {CATEGORY_CFG[activeFilter].action}
            </p>
          </div>
        </div>
      )}

      {/* ── Search + Actions Bar ── */}
      <div className="flex items-center gap-[8px]">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por chave, pagina ou arquivo... (ex: home.about, Footer, LpTemplate)"
            className="w-full h-[38px] pl-[36px] pr-[80px] bg-[#1a1715] border border-white/[0.08] rounded-lg font-['Noto_Sans'] text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#a57255]/40 transition-colors"
          />
          {searchTerm && (
            <span className="absolute right-[12px] top-1/2 -translate-y-1/2 font-['Noto_Sans'] text-[11px] text-white/25">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        {grouped.length > 0 && (
          <button
            onClick={expandedGroups.size === grouped.length ? collapseAll : expandAll}
            className="flex items-center gap-[4px] h-[38px] px-[12px] bg-[#1a1715] border border-white/[0.08] rounded-lg text-white/30 hover:text-white hover:border-white/[0.15] transition-colors font-['Noto_Sans'] text-[11px] shrink-0"
            title={expandedGroups.size === grouped.length ? 'Recolher tudo' : 'Expandir tudo'}
          >
            <ChevronsUpDown size={13} />
            {expandedGroups.size === grouped.length ? 'Recolher' : 'Expandir'}
          </button>
        )}
      </div>

      {/* ── Results ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-[60px] text-white/20">
          {activeFilter === 'all' && !searchTerm ? (
            <>
              <Sparkles size={40} strokeWidth={1.5} className="mb-[12px] text-emerald-500/40" />
              <p className="font-['Noto_Sans'] text-[14px] font-medium text-emerald-500/60">
                Nenhum problema encontrado — tudo conectado!
              </p>
            </>
          ) : (
            <>
              <Search size={32} strokeWidth={1.5} className="mb-[10px]" />
              <p className="font-['Noto_Sans'] text-[13px] text-white/30">
                Nenhum resultado para este filtro
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-[6px]">
          {grouped.map(([group, items]) => {
            const isExpanded = expandedGroups.has(group);
            return (
              <div key={group} className="bg-[#1a1715] border border-white/[0.08] rounded-lg overflow-hidden">
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between px-[16px] py-[11px] hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-[10px]">
                    {isExpanded
                      ? <ChevronDown size={14} className="text-white/30" />
                      : <ChevronRight size={14} className="text-white/30" />
                    }
                    <span className="font-['Noto_Sans'] font-semibold text-[13px] text-white">{group}</span>
                    <span className="font-['Noto_Sans'] text-[11px] text-white/20">
                      {items.length} item{items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    {(Object.keys(CATEGORY_CFG) as CategoryKey[]).map(cat => {
                      const n = items.filter(i => i.category === cat).length;
                      if (n === 0) return null;
                      const c = CATEGORY_CFG[cat];
                      return (
                        <span key={cat} className={`inline-flex items-center gap-[3px] px-[6px] py-[1px] rounded text-[10px] font-medium ${c.bgColor} ${c.color} border ${c.borderColor}`}>
                          {n}
                        </span>
                      );
                    })}
                    {onNavigate && items[0]?.panelPageId && (
                      <button
                        onClick={e => { e.stopPropagation(); onNavigate(items[0].panelPageId!); }}
                        className="ml-[4px] text-[#a57255]/30 hover:text-[#a57255] transition-colors"
                        title={`Ir para ${group} no painel`}
                      >
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </button>

                {/* Items list */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06]">
                    {items.map((item, idx) => {
                      const cfg = CATEGORY_CFG[item.category];
                      return (
                        <div
                          key={`${item.key}-${item.category}-${idx}`}
                          className="flex items-start gap-[10px] px-[16px] py-[9px] border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.015] transition-colors group/item"
                        >
                          <div className={`mt-[3px] shrink-0 ${cfg.color}`}>{cfg.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-[8px] flex-wrap">
                              <code className="font-mono text-[12px] text-[#a57255] bg-[#a57255]/10 px-[6px] py-[1px] rounded break-all">
                                {item.key}
                              </code>
                              <button
                                onClick={() => handleCopy(item.key)}
                                className="opacity-0 group-hover/item:opacity-100 transition-opacity text-white/20 hover:text-white/50"
                                title="Copiar chave"
                              >
                                {copiedKey === item.key
                                  ? <Check size={11} className="text-emerald-400" />
                                  : <Copy size={11} />
                                }
                              </button>
                              {item.sourceFile && (
                                <span className="font-['Noto_Sans'] text-[10px] text-white/15 bg-white/[0.03] px-[5px] py-[1px] rounded">
                                  {item.sourceFile}
                                </span>
                              )}
                            </div>
                            {item.detail && (
                              <p className="font-['Noto_Sans'] text-[11px] text-white/20 mt-[2px] leading-[1.4] break-all">
                                {item.detail}
                              </p>
                            )}
                          </div>
                          <span className={`shrink-0 inline-flex items-center gap-[3px] px-[5px] py-[1px] rounded text-[9px] font-medium ${cfg.bgColor} ${cfg.color} border ${cfg.borderColor}`}>
                            {cfg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Legend ── */}
      <div className="bg-[#1a1715] border border-white/[0.08] rounded-xl p-[20px]">
        <div className="flex items-center gap-[8px] mb-[14px]">
          <Info size={14} className="text-white/30" />
          <h4 className="font-['Noto_Sans'] font-semibold text-[12px] text-white/50 uppercase tracking-[0.5px]">
            Legenda
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          {(Object.keys(CATEGORY_CFG) as CategoryKey[]).map(cat => {
            const cfg = CATEGORY_CFG[cat];
            return (
              <div key={cat} className={`flex gap-[10px] p-[12px] rounded-lg border ${cfg.borderColor} ${cfg.bgColor}`}>
                <div className={`mt-[1px] shrink-0 ${cfg.color}`}>{cfg.icon}</div>
                <div>
                  <p className={`font-['Noto_Sans'] font-semibold text-[12px] ${cfg.color} mb-[2px]`}>{cfg.label}</p>
                  <p className="font-['Noto_Sans'] text-[11px] text-white/30 leading-[1.5]">{cfg.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Utility to count total audit issues (for badge in sidebar) */
export function countAuditIssues(panelKeys: string[], data: Record<string, string>): number {
  const componentKeys = buildComponentKeys();
  const panelKeySet = new Set(panelKeys);
  let count = 0;

  // Orphans
  for (const key of panelKeys) {
    if (!componentKeys.has(key)) {
      if (key.startsWith('seo.') && !key.startsWith('seo.global')) continue;
      if (SKIP_ORPHAN_KEYS.has(key)) continue;
      count++;
    }
  }
  // No Editor
  for (const key of componentKeys) {
    if (!panelKeySet.has(key)) {
      if (key.startsWith('seo.') && !key.startsWith('seo.global')) continue;
      if (key === 'home.sectionOrder') continue;
      if (key.endsWith('.sectionOrder')) continue;
      count++;
    }
  }
  // Dead Data
  for (const key of Object.keys(data)) {
    if (!componentKeys.has(key) && !panelKeySet.has(key)) {
      if (key.startsWith('seo.') || key.startsWith('_') || key === 'home.sectionOrder' || key.endsWith('.sectionOrder')) continue;
      count++;
    }
  }
  // Pending Assets
  for (const value of Object.values(data)) {
    if (value && value.startsWith('figma:asset/')) count++;
  }

  return count;
}