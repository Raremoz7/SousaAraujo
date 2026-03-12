/**
 * PainelPage — Painel Administrativo Visual
 * Editor visual com preview ao vivo, cards agrupados e previews de imagem
 */

import React, { useState, useEffect, useCallback, useRef, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { updatePanelDataCache } from '../hooks/usePanelContent';
import { panelDefaults } from '../../data/panelDefaults';
import {
  Home, FileText, Users, MessageSquare, Video, HelpCircle, MapPin,
  Handshake, Layout, Settings, ChevronRight, ChevronDown, Save,
  RotateCcw, Download, Upload, Eye, EyeOff, Menu, Search, Check,
  Globe, Phone, Clock, Instagram, SearchCheck,
  Image as ImageIcon, Type, Link2, AlignLeft, Trash2,
  ExternalLink, LogOut, LogIn, Monitor, Smartphone, Pencil, RefreshCw,
  GripVertical
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SeoPanel } from '../components/SeoPanel';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);
const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/panel`;

/* ─── Lazy page components for live preview ─── */
/* Keys must match the `id` in PAGES array */

/* Preview layout wrapper — adds Navbar + Footer around page content.
   Router context is already provided by the app's RouterProvider. */
const PreviewLayout = lazy(() =>
  Promise.all([
    import('../components/Navbar'),
    import('../components/Footer'),
  ]).then(([navMod, footMod]) => ({
    default: ({ children }: { children: React.ReactNode }) => (
      <div className="min-h-screen bg-[#161312]">
        <navMod.Navbar />
        <main>{children}</main>
        <footMod.Footer />
      </div>
    ),
  }))
);

const PreviewPages: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  home: lazy(() => import('./HomePage').then(m => ({ default: m.HomePage }))),
  sobre: lazy(() => import('./SobrePage').then(m => ({ default: m.SobrePage }))),
  areas: lazy(() => import('./AreasDeAtuacaoPage').then(m => ({ default: m.AreasDeAtuacaoPage }))),
  blog: lazy(() => import('./BlogPage').then(m => ({ default: m.BlogPage }))),
  faq: lazy(() => import('./FaqPage').then(m => ({ default: m.FaqPage }))),
  videos: lazy(() => import('./VideosEducativosPage').then(m => ({ default: m.VideosEducativosPage }))),
  contato: lazy(() => import('./ContatoPage').then(m => ({ default: m.ContatoPage }))),
  parceiros: lazy(() => import('./RedeDeParceirosPage').then(m => ({ default: m.RedeDeParceirosPage }))),
  imoveis: lazy(() => import('./ImoveisPage').then(m => ({ default: m.ImoveisPage }))),
  homologacao: lazy(() => import('./LpHomologacaoPage').then(m => ({ default: m.HomologacaoPage }))),
  divorcio: lazy(() => import('./LpDivorcioPage').then(m => ({ default: m.DivorcioPage }))),
  guarda: lazy(() => import('./LpGuardaPage').then(m => ({ default: m.GuardaPage }))),
  pensao: lazy(() => import('./LpPensaoPage').then(m => ({ default: m.PensaoPage }))),
  inventario: lazy(() => import('./LpInventarioPage').then(m => ({ default: m.InventarioPage }))),
  uniao: lazy(() => import('./LpUniaoEstavelPage').then(m => ({ default: m.UniaoEstavelPage }))),
  pmes: lazy(() => import('./LpPmesPage').then(m => ({ default: m.PmesPage }))),
  inpi: lazy(() => import('./LpInpiPage').then(m => ({ default: m.InpiPage }))),
};

/* ─── Preview Error Boundary ─── */
class PreviewErrorBoundary extends React.Component<{ children: React.ReactNode; pageId: string }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidUpdate(prevProps: { pageId: string }) {
    if (prevProps.pageId !== this.props.pageId) this.setState({ hasError: false });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full bg-[#161312] text-white/30 font-['Noto_Sans'] text-[13px] p-[32px] text-center">
          <div>
            <p className="mb-[8px] text-white/50 font-medium">Erro ao renderizar preview</p>
            <p className="text-[11px]">A pagina pode ter dependencias que nao carregaram. Tente abri-la em nova aba.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─── Preview Loader ─── */
function PreviewLoader() {
  return (
    <div className="flex items-center justify-center h-[200px]">
      <div className="flex flex-col items-center gap-[12px]">
        <div className="w-[24px] h-[24px] border-2 border-[#a57255]/30 border-t-[#a57255] rounded-full animate-spin" />
        <span className="font-['Noto_Sans'] text-[12px] text-[#a57255]/50">Carregando preview...</span>
      </div>
    </div>
  );
}

/* ─── Types ─── */
interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'image' | 'html' | 'number';
  placeholder?: string;
  rows?: number;
  help?: string;
}

interface SectionConfig {
  id: string;
  title: string;
  icon?: React.ReactNode;
  fields: FieldConfig[];
  repeatable?: boolean;
  repeatLabel?: string;
}

interface PageConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  route?: string;
  sections: SectionConfig[];
}

interface FieldGroup {
  groupLabel: string;
  groupNum: string;
  fields: FieldConfig[];
  imageField?: FieldConfig;
}

/* ─── Service Page Names ─── */
const SERVICE_NAMES = [
  { id: 'homologacao', label: 'Homologacao de Sentenca', route: '/homologacao-de-sentenca-estrangeira' },
  { id: 'divorcio', label: 'Divorcio', route: '/divorcio' },
  { id: 'imoveis', label: 'Imoveis', route: '/imoveis' },
  { id: 'guarda', label: 'Guarda e Convivencia', route: '/guarda-e-plano-de-convivencia' },
  { id: 'pensao', label: 'Pensao Alimenticia', route: '/pensao-alimenticia' },
  { id: 'inventario', label: 'Inventario e Sucessoes', route: '/inventario-e-sucessoes' },
  { id: 'uniao', label: 'Uniao Estavel', route: '/uniao-estavel' },
  { id: 'pmes', label: 'Consultoria PMEs', route: '/consultoria-empresarial-pmes' },
  { id: 'inpi', label: 'Registro de Marca INPI', route: '/registro-de-marca-inpi' },
];

/* ─── Generate service page section fields ─── */
function serviceSections(lpId: string): SectionConfig[] {
  return [
    {
      id: `${lpId}-hero`,
      title: 'Hero',
      fields: [
        { key: `${lpId}.hero.title`, label: 'Titulo H1', type: 'text' },
        { key: `${lpId}.hero.subtitle`, label: 'Subtitulo', type: 'textarea', rows: 3 },
        { key: `${lpId}.hero.image`, label: 'Imagem de fundo (URL)', type: 'image' },
        { key: `${lpId}.hero.ctaText`, label: 'Texto do CTA', type: 'text' },
        { key: `${lpId}.hero.maxWidth`, label: 'Max-width do titulo', type: 'text', placeholder: 'ex: 820px' },
      ],
    },
    {
      id: `${lpId}-trust`,
      title: 'Secao de Confianca',
      fields: [
        { key: `${lpId}.trust.title`, label: 'Titulo', type: 'text' },
        { key: `${lpId}.trust.body`, label: 'Texto', type: 'textarea', rows: 4 },
        { key: `${lpId}.trust.feature1`, label: 'Feature 1', type: 'text' },
        { key: `${lpId}.trust.feature2`, label: 'Feature 2', type: 'text' },
        { key: `${lpId}.trust.feature3`, label: 'Feature 3', type: 'text' },
      ],
    },
    {
      id: `${lpId}-parallax`,
      title: 'Imagem Parallax',
      fields: [
        { key: `${lpId}.parallax.image`, label: 'Imagem (URL)', type: 'image' },
      ],
    },
    {
      id: `${lpId}-metodo`,
      title: 'Metodo SAA',
      fields: [
        { key: `${lpId}.metodo.title`, label: 'Titulo', type: 'text' },
        { key: `${lpId}.metodo.image`, label: 'Imagem (URL)', type: 'image' },
        { key: `${lpId}.metodo.step1.label`, label: 'Passo 1 — Titulo', type: 'text' },
        { key: `${lpId}.metodo.step1.desc`, label: 'Passo 1 — Descricao', type: 'textarea', rows: 2 },
        { key: `${lpId}.metodo.step2.label`, label: 'Passo 2 — Titulo', type: 'text' },
        { key: `${lpId}.metodo.step2.desc`, label: 'Passo 2 — Descricao', type: 'textarea', rows: 2 },
        { key: `${lpId}.metodo.step3.label`, label: 'Passo 3 — Titulo', type: 'text' },
        { key: `${lpId}.metodo.step3.desc`, label: 'Passo 3 — Descricao', type: 'textarea', rows: 2 },
      ],
    },
    {
      id: `${lpId}-cenarios`,
      title: 'Cenarios',
      fields: [
        { key: `${lpId}.scenarios.title`, label: 'Titulo', type: 'text' },
        { key: `${lpId}.scenarios.item1`, label: 'Cenario 1', type: 'text' },
        { key: `${lpId}.scenarios.item2`, label: 'Cenario 2', type: 'text' },
        { key: `${lpId}.scenarios.item3`, label: 'Cenario 3', type: 'text' },
        { key: `${lpId}.scenarios.item4`, label: 'Cenario 4', type: 'text' },
        { key: `${lpId}.scenarios.item5`, label: 'Cenario 5', type: 'text' },
        { key: `${lpId}.scenarios.item6`, label: 'Cenario 6', type: 'text' },
        { key: `${lpId}.scenarios.ctaSubtitle`, label: 'Subtitulo CTA', type: 'text' },
        { key: `${lpId}.scenarios.stickyImage`, label: 'Imagem sticky (URL)', type: 'image' },
      ],
    },
    {
      id: `${lpId}-riscos`,
      title: 'Pontos de Atencao / Riscos',
      fields: [
        { key: `${lpId}.scenarios.risksTitle`, label: 'Titulo', type: 'text' },
        { key: `${lpId}.scenarios.risk1`, label: 'Risco 1', type: 'text' },
        { key: `${lpId}.scenarios.risk2`, label: 'Risco 2', type: 'text' },
        { key: `${lpId}.scenarios.risk3`, label: 'Risco 3', type: 'text' },
        { key: `${lpId}.scenarios.risk4`, label: 'Risco 4', type: 'text' },
        { key: `${lpId}.scenarios.deep1.title`, label: 'Deep Dive 1 — Titulo', type: 'text' },
        { key: `${lpId}.scenarios.deep1.text`, label: 'Deep Dive 1 — Texto', type: 'textarea', rows: 3 },
        { key: `${lpId}.scenarios.deep2.title`, label: 'Deep Dive 2 — Titulo', type: 'text' },
        { key: `${lpId}.scenarios.deep2.text`, label: 'Deep Dive 2 — Texto', type: 'textarea', rows: 3 },
        { key: `${lpId}.scenarios.deep3.title`, label: 'Deep Dive 3 — Titulo', type: 'text' },
        { key: `${lpId}.scenarios.deep3.text`, label: 'Deep Dive 3 — Texto', type: 'textarea', rows: 3 },
      ],
    },
    {
      id: `${lpId}-banners`,
      title: 'Banners',
      fields: [
        { key: `${lpId}.onlineBanner`, label: 'Banner Online (texto)', type: 'textarea', rows: 2 },
        { key: `${lpId}.riscoBanner`, label: 'Banner Risco (texto)', type: 'textarea', rows: 2 },
      ],
    },
    {
      id: `${lpId}-passo`,
      title: 'Passo a Passo',
      fields: [
        { key: `${lpId}.passo1.title`, label: 'Passo 1 — Titulo', type: 'text' },
        { key: `${lpId}.passo1.subtitle`, label: 'Passo 1 — Subtitulo', type: 'text' },
        { key: `${lpId}.passo1.desc`, label: 'Passo 1 — Descricao', type: 'textarea', rows: 2 },
        { key: `${lpId}.passo2.title`, label: 'Passo 2 — Titulo', type: 'text' },
        { key: `${lpId}.passo2.subtitle`, label: 'Passo 2 — Subtitulo', type: 'text' },
        { key: `${lpId}.passo2.desc`, label: 'Passo 2 — Descricao', type: 'textarea', rows: 2 },
        { key: `${lpId}.passo3.title`, label: 'Passo 3 — Titulo', type: 'text' },
        { key: `${lpId}.passo3.subtitle`, label: 'Passo 3 — Subtitulo', type: 'text' },
        { key: `${lpId}.passo3.desc`, label: 'Passo 3 — Descricao', type: 'textarea', rows: 2 },
        { key: `${lpId}.passo4.title`, label: 'Passo 4 — Titulo', type: 'text' },
        { key: `${lpId}.passo4.subtitle`, label: 'Passo 4 — Subtitulo', type: 'text' },
        { key: `${lpId}.passo4.desc`, label: 'Passo 4 — Descricao', type: 'textarea', rows: 2 },
        { key: `${lpId}.passo5.title`, label: 'Passo 5 — Titulo', type: 'text' },
        { key: `${lpId}.passo5.subtitle`, label: 'Passo 5 — Subtitulo', type: 'text' },
        { key: `${lpId}.passo5.desc`, label: 'Passo 5 — Descricao', type: 'textarea', rows: 2 },
      ],
    },
    {
      id: `${lpId}-objecoes`,
      title: 'Objecoes (FAQ da LP)',
      fields: Array.from({ length: 6 }, (_, i) => ([
        { key: `${lpId}.objecao${i+1}.q`, label: `Pergunta ${i+1}`, type: 'text' as const },
        { key: `${lpId}.objecao${i+1}.a`, label: `Resposta ${i+1}`, type: 'textarea' as const, rows: 3 },
      ])).flat(),
    },
    {
      id: `${lpId}-cta`,
      title: 'CTA e Confianca',
      fields: [
        { key: `${lpId}.costCta.title`, label: 'CTA titulo', type: 'text' },
        { key: `${lpId}.costCta.bgImage`, label: 'CTA imagem de fundo', type: 'image' },
        { key: `${lpId}.whyTrust.trust1`, label: 'Confianca item 1', type: 'text' },
        { key: `${lpId}.whyTrust.trust2`, label: 'Confianca item 2', type: 'text' },
        { key: `${lpId}.whyTrust.trust3`, label: 'Confianca item 3', type: 'text' },
        { key: `${lpId}.whyTrust.trust4`, label: 'Confianca item 4', type: 'text' },
        { key: `${lpId}.whyTrust.trust5`, label: 'Confianca item 5', type: 'text' },
        { key: `${lpId}.whyTrust.consulta1`, label: 'Consulta item 1', type: 'text' },
        { key: `${lpId}.whyTrust.consulta2`, label: 'Consulta item 2', type: 'text' },
        { key: `${lpId}.whyTrust.consulta3`, label: 'Consulta item 3', type: 'text' },
        { key: `${lpId}.whyTrust.lidianeImage`, label: 'Foto Dra. Lidiane', type: 'image' },
      ],
    },
    {
      id: `${lpId}-historias`,
      title: 'Historias de Sucesso',
      fields: [
        { key: `${lpId}.historias.title`, label: 'Titulo da secao', type: 'text' },
        { key: `${lpId}.historias.item1.img`, label: 'Historia 1 — Imagem', type: 'image' },
        { key: `${lpId}.historias.item1.subtitle`, label: 'Historia 1 — Subtitulo', type: 'text' },
        { key: `${lpId}.historias.item1.body`, label: 'Historia 1 — Texto', type: 'textarea', rows: 3 },
        { key: `${lpId}.historias.item2.img`, label: 'Historia 2 — Imagem', type: 'image' },
        { key: `${lpId}.historias.item2.subtitle`, label: 'Historia 2 — Subtitulo', type: 'text' },
        { key: `${lpId}.historias.item2.body`, label: 'Historia 2 — Texto', type: 'textarea', rows: 3 },
        { key: `${lpId}.historias.item3.img`, label: 'Historia 3 — Imagem', type: 'image' },
        { key: `${lpId}.historias.item3.subtitle`, label: 'Historia 3 — Subtitulo', type: 'text' },
        { key: `${lpId}.historias.item3.body`, label: 'Historia 3 — Texto', type: 'textarea', rows: 3 },
      ],
    },
    {
      id: `${lpId}-faqfinal`,
      title: 'FAQ Final',
      fields: Array.from({ length: 6 }, (_, i) => ([
        { key: `${lpId}.faq${i+1}.q`, label: `Pergunta ${i+1}`, type: 'text' as const },
        { key: `${lpId}.faq${i+1}.a`, label: `Resposta ${i+1}`, type: 'textarea' as const, rows: 3 },
      ])).flat(),
    },
  ];
}

/* ─── Page configurations ─── */
const PAGES: PageConfig[] = [
  /* Geral */
  {
    id: 'geral',
    label: 'Geral do Site',
    icon: <Settings size={18} />,
    sections: [
      {
        id: 'site-info',
        title: 'Informacoes Basicas',
        icon: <Globe size={16} />,
        fields: [
          { key: 'site.name', label: 'Nome do site', type: 'text', placeholder: 'Sousa Araujo Advocacia' },
          { key: 'site.tagline', label: 'Tagline', type: 'text' },
          { key: 'site.description', label: 'Descricao', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'site-contact',
        title: 'Dados de Contato',
        icon: <Phone size={16} />,
        fields: [
          { key: 'site.phone', label: 'Telefone', type: 'text', placeholder: '+55 61 99599-1322' },
          { key: 'site.email', label: 'E-mail', type: 'text', placeholder: 'contato@sousaaraujo.adv.br' },
        ],
      },
      {
        id: 'site-address',
        title: 'Endereco',
        icon: <MapPin size={16} />,
        fields: [
          { key: 'site.address.full', label: 'Endereco completo', type: 'textarea', rows: 2 },
          { key: 'site.address.short', label: 'Endereco curto', type: 'text' },
          { key: 'site.address.street', label: 'Rua', type: 'text' },
          { key: 'site.address.neighborhood', label: 'Bairro', type: 'text' },
          { key: 'site.address.city', label: 'Cidade', type: 'text' },
          { key: 'site.address.state', label: 'Estado', type: 'text' },
          { key: 'site.address.zipCode', label: 'CEP', type: 'text' },
        ],
      },
      {
        id: 'site-hours',
        title: 'Horario de Funcionamento',
        icon: <Clock size={16} />,
        fields: [
          { key: 'site.hours.weekdays', label: 'Dias uteis', type: 'text' },
          { key: 'site.hours.saturday', label: 'Sabado', type: 'text' },
        ],
      },
      {
        id: 'site-social',
        title: 'Redes Sociais',
        icon: <Instagram size={16} />,
        fields: [
          { key: 'site.social.instagram', label: 'Instagram URL', type: 'url' },
          { key: 'site.social.facebook', label: 'Facebook URL', type: 'url' },
          { key: 'site.social.linkedin', label: 'LinkedIn URL', type: 'url' },
          { key: 'site.social.tiktok', label: 'TikTok URL', type: 'url' },
          { key: 'site.social.youtube', label: 'YouTube URL', type: 'url' },
        ],
      },
    ],
  },

  /* Navbar / Menu */
  {
    id: 'navbar',
    label: 'Menu / Navbar',
    icon: <Menu size={18} />,
    sections: [
      {
        id: 'navbar-items',
        title: 'Itens do Menu Principal',
        fields: [
          { key: 'navbar.item1.label', label: 'Item 1 (Home)', type: 'text' },
          { key: 'navbar.item2.label', label: 'Item 2 (Sobre)', type: 'text' },
          { key: 'navbar.item3.label', label: 'Item 3 (Areas)', type: 'text' },
          { key: 'navbar.item4.label', label: 'Item 4 (Blog)', type: 'text' },
          { key: 'navbar.item5.label', label: 'Item 5 (FAQ)', type: 'text' },
          { key: 'navbar.item6.label', label: 'Item 6 (Contato)', type: 'text' },
        ],
      },
      {
        id: 'navbar-servicos',
        title: 'Dropdown de Servicos',
        fields: [
          { key: 'navbar.servicos.label', label: 'Label do dropdown', type: 'text', placeholder: 'Servicos' },
          { key: 'navbar.servico1.label', label: 'Servico 1 — Homologacao', type: 'text' },
          { key: 'navbar.servico2.label', label: 'Servico 2 — Divorcio', type: 'text' },
          { key: 'navbar.servico3.label', label: 'Servico 3 — Imoveis', type: 'text' },
          { key: 'navbar.servico4.label', label: 'Servico 4 — Guarda', type: 'text' },
          { key: 'navbar.servico5.label', label: 'Servico 5 — Pensao', type: 'text' },
          { key: 'navbar.servico6.label', label: 'Servico 6 — Inventario', type: 'text' },
          { key: 'navbar.servico7.label', label: 'Servico 7 — Uniao Estavel', type: 'text' },
          { key: 'navbar.servico8.label', label: 'Servico 8 — PMEs', type: 'text' },
          { key: 'navbar.servico9.label', label: 'Servico 9 — INPI', type: 'text' },
        ],
      },
      {
        id: 'navbar-extras',
        title: 'Links Extras e CTA',
        fields: [
          { key: 'navbar.extra1.label', label: 'Extra 1 (Rede de Parceiros)', type: 'text' },
          { key: 'navbar.extra2.label', label: 'Extra 2 (Videos Educativos)', type: 'text' },
          { key: 'navbar.cta.text', label: 'Texto do botao CTA', type: 'text', placeholder: 'Agendar Atendimento' },
        ],
      },
    ],
  },

  /* Home */
  {
    id: 'home',
    label: 'Home',
    icon: <Home size={18} />,
    route: '/',
    sections: [
      {
        id: 'home-hero',
        title: 'Hero',
        fields: [
          { key: 'home.hero.title', label: 'Titulo H1 (keyword SEO)', type: 'text', help: 'Deve conter "escritorio de advocacia em Brasilia"' },
          { key: 'home.hero.subtitle', label: 'Subtitulo', type: 'text' },
          { key: 'home.hero.signature', label: 'Assinatura (fonte Allura)', type: 'text' },
          { key: 'home.hero.bgImage', label: 'Imagem de fundo (parallax)', type: 'image' },
          { key: 'home.hero.videoUrl', label: 'URL do video (YouTube)', type: 'url' },
          { key: 'home.hero.ctaText', label: 'Texto do botao CTA', type: 'text' },
          { key: 'home.hero.ctaHref', label: 'Link do botao CTA', type: 'url' },
        ],
      },
      {
        id: 'home-about',
        title: 'Quem Somos',
        fields: [
          { key: 'home.about.title', label: 'Titulo', type: 'text' },
          { key: 'home.about.paragraph1', label: 'Paragrafo 1 (aceita HTML)', type: 'html', rows: 4 },
          { key: 'home.about.paragraph2', label: 'Paragrafo 2 (aceita HTML)', type: 'html', rows: 4 },
          { key: 'home.about.linkText', label: 'Texto do link', type: 'text' },
          { key: 'home.about.linkHref', label: 'URL do link', type: 'url' },
          { key: 'home.about.quote1', label: 'Citacao 1', type: 'textarea', rows: 2 },
          { key: 'home.about.quote2', label: 'Citacao 2', type: 'textarea', rows: 2 },
          { key: 'home.about.image', label: 'Imagem principal', type: 'image' },
        ],
      },
      {
        id: 'home-services',
        title: 'Carrossel de Servicos',
        fields: Array.from({ length: 6 }, (_, i) => ([
          { key: `home.service${i+1}.title`, label: `Servico ${i+1} — Titulo`, type: 'text' as const },
          { key: `home.service${i+1}.desc`, label: `Servico ${i+1} — Descricao`, type: 'textarea' as const, rows: 3 },
          { key: `home.service${i+1}.image`, label: `Servico ${i+1} — Imagem`, type: 'image' as const },
        ])).flat(),
      },
      {
        id: 'home-differentials',
        title: 'Diferenciais',
        fields: [
          { key: 'home.diff.title', label: 'Titulo da secao', type: 'text' },
          { key: 'home.diff.desc', label: 'Descricao da secao', type: 'textarea', rows: 3 },
          { key: 'home.diff.image', label: 'Imagem principal', type: 'image' },
          { key: 'home.diff.teamImage', label: 'Foto da equipe', type: 'image' },
          ...Array.from({ length: 4 }, (_, i) => ([
            { key: `home.diff.item${i+1}.title`, label: `Diferencial ${i+1} — Titulo`, type: 'text' as const },
            { key: `home.diff.item${i+1}.desc`, label: `Diferencial ${i+1} — Descricao`, type: 'textarea' as const, rows: 2 },
            { key: `home.diff.item${i+1}.linkText`, label: `Diferencial ${i+1} — Texto link`, type: 'text' as const },
            { key: `home.diff.item${i+1}.linkHref`, label: `Diferencial ${i+1} — URL`, type: 'url' as const },
          ])).flat(),
          { key: 'home.diff.gallery1', label: 'Galeria imagem 1', type: 'image' },
          { key: 'home.diff.gallery2', label: 'Galeria imagem 2', type: 'image' },
          { key: 'home.diff.gallery3', label: 'Galeria imagem 3', type: 'image' },
        ],
      },
      {
        id: 'home-stats',
        title: 'Estatisticas',
        fields: Array.from({ length: 4 }, (_, i) => ([
          { key: `home.stat${i+1}.number`, label: `Stat ${i+1} — Numero`, type: 'text' as const },
          { key: `home.stat${i+1}.label`, label: `Stat ${i+1} — Label`, type: 'text' as const },
        ])).flat(),
      },
      {
        id: 'home-practice',
        title: 'Areas de Atuacao (accordion)',
        fields: Array.from({ length: 4 }, (_, i) => ([
          { key: `home.area${i+1}.number`, label: `Area ${i+1} — Numero`, type: 'text' as const },
          { key: `home.area${i+1}.title`, label: `Area ${i+1} — Titulo`, type: 'text' as const },
          { key: `home.area${i+1}.subtitle`, label: `Area ${i+1} — Subtitulo`, type: 'text' as const },
          { key: `home.area${i+1}.desc`, label: `Area ${i+1} — Descricao`, type: 'textarea' as const, rows: 2 },
          { key: `home.area${i+1}.image`, label: `Area ${i+1} — Imagem`, type: 'image' as const },
          { key: `home.area${i+1}.href`, label: `Area ${i+1} — Link`, type: 'url' as const },
        ])).flat(),
      },
      {
        id: 'home-cta',
        title: 'Banner CTA',
        fields: [
          { key: 'home.cta.title', label: 'Titulo', type: 'text' },
          { key: 'home.cta.buttonText', label: 'Texto do botao', type: 'text' },
          { key: 'home.cta.buttonHref', label: 'Link do botao', type: 'url' },
          { key: 'home.cta.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
      {
        id: 'home-videos',
        title: 'Videos',
        fields: [
          { key: 'home.videos.title', label: 'Titulo da secao', type: 'text' },
          { key: 'home.videos.viewAllText', label: 'Texto "ver todos"', type: 'text' },
          { key: 'home.videos.viewAllHref', label: 'Link "ver todos"', type: 'url' },
          ...Array.from({ length: 3 }, (_, i) => ([
            { key: `home.video${i+1}.title`, label: `Video ${i+1} — Titulo`, type: 'text' as const },
            { key: `home.video${i+1}.desc`, label: `Video ${i+1} — Descricao`, type: 'textarea' as const, rows: 3 },
            { key: `home.video${i+1}.image`, label: `Video ${i+1} — Thumbnail`, type: 'image' as const },
          ])).flat(),
        ],
      },
      {
        id: 'home-blog',
        title: 'Blog / Artigos',
        fields: [
          { key: 'home.articles.title', label: 'Titulo da secao', type: 'text' },
          { key: 'home.articles.viewAllText', label: 'Texto "ver todos"', type: 'text' },
          { key: 'home.articles.viewAllHref', label: 'Link "ver todos"', type: 'url' },
          ...Array.from({ length: 3 }, (_, i) => ([
            { key: `home.article${i+1}.day`, label: `Artigo ${i+1} — Dia`, type: 'text' as const },
            { key: `home.article${i+1}.month`, label: `Artigo ${i+1} — Mes`, type: 'text' as const },
            { key: `home.article${i+1}.category`, label: `Artigo ${i+1} — Categoria`, type: 'text' as const },
            { key: `home.article${i+1}.title`, label: `Artigo ${i+1} — Titulo`, type: 'text' as const },
            { key: `home.article${i+1}.image`, label: `Artigo ${i+1} — Imagem`, type: 'image' as const },
            { key: `home.article${i+1}.href`, label: `Artigo ${i+1} — Link`, type: 'url' as const },
          ])).flat(),
        ],
      },
      {
        id: 'home-contact',
        title: 'Contato (formulario)',
        fields: [
          { key: 'contato.title', label: 'Titulo (use \\n para quebra)', type: 'text' },
          { key: 'contato.address', label: 'Endereco', type: 'text' },
          { key: 'contato.phone', label: 'Telefone', type: 'text' },
          { key: 'contato.submitText', label: 'Texto do botao submit', type: 'text' },
          { key: 'contato.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
    ],
  },

  /* Sobre */
  {
    id: 'sobre',
    label: 'Sobre',
    icon: <Users size={18} />,
    route: '/sobre',
    sections: [
      {
        id: 'sobre-hero',
        title: 'Hero',
        fields: [
          { key: 'sobre.hero.title', label: 'Titulo H1', type: 'text' },
          { key: 'sobre.hero.subtitle', label: 'Subtitulo', type: 'textarea', rows: 2 },
          { key: 'sobre.hero.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
      {
        id: 'sobre-stats',
        title: 'Estatisticas',
        fields: [
          ...Array.from({ length: 4 }, (_, i) => ([
            { key: `sobre.stat${i+1}.number`, label: `Stat ${i+1} — Numero`, type: 'text' as const },
            { key: `sobre.stat${i+1}.label`, label: `Stat ${i+1} — Label`, type: 'text' as const },
          ])).flat(),
        ],
      },
      {
        id: 'sobre-bio',
        title: 'Biografia (Quem Somos)',
        fields: [
          { key: 'sobre.quem.title', label: 'Titulo principal', type: 'text', help: 'Use \\n para quebra de linha' },
          { key: 'sobre.quem.paragraph1', label: 'Paragrafo 1 (intro)', type: 'html', rows: 4 },
          { key: 'sobre.quem.paragraph2', label: 'Paragrafo 2 (intro)', type: 'html', rows: 4 },
          { key: 'sobre.quem.imgLidiane', label: 'Foto Dra. Lidiane', type: 'image' },
          { key: 'sobre.quem.imgTeam', label: 'Foto equipe', type: 'image' },
        ],
      },
      {
        id: 'sobre-bio-titulos',
        title: 'Bio — Titulos das Secoes',
        fields: [
          { key: 'sobre.bio.trajetoria.title', label: 'Titulo: Trajetoria', type: 'text' },
          { key: 'sobre.bio.areas.title', label: 'Titulo: Areas que se Conectam', type: 'text' },
          { key: 'sobre.bio.metodo.title', label: 'Titulo: Metodo de Trabalho', type: 'text' },
          { key: 'sobre.bio.presencial.title', label: 'Titulo: Presencial/Online', type: 'text' },
          { key: 'sobre.bio.rede.title', label: 'Titulo: Atuacao em Rede', type: 'text' },
          { key: 'sobre.bio.valores.title', label: 'Titulo: Valores', type: 'text' },
        ],
      },
      {
        id: 'sobre-depoimentos',
        title: 'Depoimentos',
        fields: [
          ...Array.from({ length: 4 }, (_, i) => ([
            { key: `sobre.testimonial${i+1}.quote`, label: `Depoimento ${i+1} — Texto`, type: 'textarea' as const, rows: 3 },
            { key: `sobre.testimonial${i+1}.author`, label: `Depoimento ${i+1} — Autor`, type: 'text' as const },
            { key: `sobre.testimonial${i+1}.role`, label: `Depoimento ${i+1} — Cargo/Area`, type: 'text' as const },
          ])).flat(),
        ],
      },
      {
        id: 'sobre-banner',
        title: 'Banner do Escritorio',
        fields: [
          { key: 'sobre.banner.caption', label: 'Frase do banner', type: 'text' },
        ],
      },
      {
        id: 'sobre-parceiros',
        title: 'Secao Parceiros',
        fields: [
          { key: 'sobre.parceiros.title', label: 'Titulo', type: 'text' },
          { key: 'sobre.parceiros.desc', label: 'Descricao', type: 'textarea', rows: 3 },
          { key: 'sobre.parceiros.img1', label: 'Foto parceiro 1', type: 'image' },
          { key: 'sobre.parceiros.img2', label: 'Foto parceiro 2', type: 'image' },
          { key: 'sobre.parceiros.img3', label: 'Foto parceiro 3', type: 'image' },
        ],
      },
      {
        id: 'sobre-servicos',
        title: 'Grid de Servicos (14 itens)',
        fields: [
          { key: 'sobre.servicos.heading', label: 'Titulo da secao', type: 'text' },
          ...Array.from({ length: 14 }, (_, i) => ([
            { key: `sobre.service${i+1}.title`, label: `Servico ${i+1} — Titulo`, type: 'text' as const },
            { key: `sobre.service${i+1}.desc`, label: `Servico ${i+1} — Descricao`, type: 'textarea' as const, rows: 2 },
          ])).flat(),
        ],
      },
      {
        id: 'sobre-blog',
        title: 'Blog Preview',
        fields: [
          { key: 'sobre.blog.title', label: 'Titulo da secao', type: 'text' },
          { key: 'sobre.article1.href', label: 'Artigo 1 — Link', type: 'url' },
          { key: 'sobre.article2.href', label: 'Artigo 2 — Link', type: 'url' },
          { key: 'sobre.article3.href', label: 'Artigo 3 — Link', type: 'url' },
        ],
      },
    ],
  },

  /* Areas de Atuacao */
  {
    id: 'areas',
    label: 'Areas de Atuacao',
    icon: <Layout size={18} />,
    route: '/areas-de-atuacao',
    sections: [
      {
        id: 'areas-hero',
        title: 'Hero',
        fields: [
          { key: 'areas.hero.title', label: 'Titulo H1', type: 'text' },
          { key: 'areas.hero.desc', label: 'Descricao', type: 'textarea', rows: 3 },
          { key: 'areas.hero.ctaText', label: 'Texto do CTA', type: 'text' },
          { key: 'areas.hero.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
      {
        id: 'areas-accordion',
        title: 'Accordion (4 areas)',
        fields: Array.from({ length: 4 }, (_, i) => ([
          { key: `areas.area${i+1}.title`, label: `Area ${i+1} — Titulo`, type: 'text' as const },
          { key: `areas.area${i+1}.subtitle`, label: `Area ${i+1} — Subtitulo`, type: 'text' as const },
          { key: `areas.area${i+1}.expandedSubtitle`, label: `Area ${i+1} — Subtitulo expandido`, type: 'text' as const },
          { key: `areas.area${i+1}.desc`, label: `Area ${i+1} — Descricao`, type: 'textarea' as const, rows: 2 },
          { key: `areas.area${i+1}.check1`, label: `Area ${i+1} — Check 1`, type: 'text' as const },
          { key: `areas.area${i+1}.check2`, label: `Area ${i+1} — Check 2`, type: 'text' as const },
          { key: `areas.area${i+1}.check3`, label: `Area ${i+1} — Check 3`, type: 'text' as const },
          { key: `areas.area${i+1}.check4`, label: `Area ${i+1} — Check 4`, type: 'text' as const },
          { key: `areas.area${i+1}.href`, label: `Area ${i+1} — Link`, type: 'url' as const },
        ])).flat(),
      },
      {
        id: 'areas-services',
        title: 'Painel de Servicos (14)',
        fields: [
          { key: 'areas.services.heading', label: 'Titulo da secao', type: 'text' },
          ...Array.from({ length: 14 }, (_, i) => ([
            { key: `areas.svc${i+1}.title`, label: `Servico ${i+1} — Titulo`, type: 'text' as const },
            { key: `areas.svc${i+1}.desc`, label: `Servico ${i+1} — Descricao`, type: 'text' as const },
            { key: `areas.svc${i+1}.href`, label: `Servico ${i+1} — Link`, type: 'url' as const },
          ])).flat(),
        ],
      },
      {
        id: 'areas-blog',
        title: 'Blog Preview',
        fields: [
          { key: 'areas.blog.heading', label: 'Titulo da secao', type: 'text' },
          ...Array.from({ length: 3 }, (_, i) => ([
            { key: `areas.blog.article${i+1}.title`, label: `Artigo ${i+1} — Titulo`, type: 'text' as const },
            { key: `areas.blog.article${i+1}.category`, label: `Artigo ${i+1} — Categoria`, type: 'text' as const },
            { key: `areas.blog.article${i+1}.day`, label: `Artigo ${i+1} — Dia`, type: 'text' as const },
            { key: `areas.blog.article${i+1}.month`, label: `Artigo ${i+1} — Mes`, type: 'text' as const },
          ])).flat(),
        ],
      },
    ],
  },

  /* Blog */
  {
    id: 'blog',
    label: 'Blog',
    icon: <FileText size={18} />,
    route: '/blog',
    sections: [
      {
        id: 'blog-hero',
        title: 'Hero',
        fields: [
          { key: 'blog.hero.title', label: 'Titulo H1', type: 'text' },
          { key: 'blog.hero.subtitle', label: 'Subtitulo', type: 'text' },
          { key: 'blog.hero.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
      {
        id: 'blog-articles',
        title: 'Artigos (6)',
        fields: Array.from({ length: 6 }, (_, i) => ([
          { key: `blog.article${i+1}.title`, label: `Artigo ${i+1} — Titulo`, type: 'text' as const },
          { key: `blog.article${i+1}.category`, label: `Artigo ${i+1} — Categoria`, type: 'text' as const },
          { key: `blog.article${i+1}.desc`, label: `Artigo ${i+1} — Resumo`, type: 'textarea' as const, rows: 2 },
          { key: `blog.article${i+1}.day`, label: `Artigo ${i+1} — Dia`, type: 'text' as const },
          { key: `blog.article${i+1}.month`, label: `Artigo ${i+1} — Mes (abreviado)`, type: 'text' as const },
          { key: `blog.article${i+1}.fullDate`, label: `Artigo ${i+1} — Data completa`, type: 'text' as const },
          { key: `blog.article${i+1}.slug`, label: `Artigo ${i+1} — Slug (URL)`, type: 'text' as const },
          { key: `blog.article${i+1}.image`, label: `Artigo ${i+1} — Imagem`, type: 'image' as const },
        ])).flat(),
      },
      {
        id: 'blog-sidebar',
        title: 'Sidebar CTA',
        fields: [
          { key: 'blog.sidebar.ctaName', label: 'Nome (Allura)', type: 'text' },
          { key: 'blog.sidebar.ctaDesc', label: 'Descricao abaixo do nome', type: 'text' },
          { key: 'blog.sidebar.ctaText', label: 'Texto do link CTA', type: 'text' },
          { key: 'blog.sidebar.bgImage', label: 'Imagem de fundo sidebar', type: 'image' },
        ],
      },
    ],
  },

  /* FAQ */
  {
    id: 'faq',
    label: 'FAQ',
    icon: <HelpCircle size={18} />,
    route: '/faq',
    sections: [
      {
        id: 'faq-hero',
        title: 'Hero',
        fields: [
          { key: 'faq.hero.title', label: 'Titulo H1', type: 'text' },
          { key: 'faq.hero.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
      {
        id: 'faq-items',
        title: 'Perguntas e Respostas',
        fields: Array.from({ length: 12 }, (_, i) => ([
          { key: `faq.item${i+1}.category`, label: `FAQ ${i+1} — Categoria`, type: 'text' as const },
          { key: `faq.item${i+1}.q`, label: `FAQ ${i+1} — Pergunta`, type: 'text' as const },
          { key: `faq.item${i+1}.a`, label: `FAQ ${i+1} — Resposta`, type: 'textarea' as const, rows: 3 },
        ])).flat(),
      },
    ],
  },

  /* Videos */
  {
    id: 'videos',
    label: 'Videos Educativos',
    icon: <Video size={18} />,
    route: '/videos-educativos',
    sections: [
      {
        id: 'videos-hero',
        title: 'Hero',
        fields: [
          { key: 'vidpage.hero.title', label: 'Titulo H1', type: 'text' },
          { key: 'vidpage.hero.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
      {
        id: 'videos-grid',
        title: 'Videos',
        fields: Array.from({ length: 9 }, (_, i) => ([
          { key: `vidpage.video${i+1}.title`, label: `Video ${i+1} — Titulo`, type: 'text' as const },
          { key: `vidpage.video${i+1}.desc`, label: `Video ${i+1} — Descricao`, type: 'textarea' as const, rows: 2 },
          { key: `vidpage.video${i+1}.image`, label: `Video ${i+1} — Thumbnail`, type: 'image' as const },
          { key: `vidpage.video${i+1}.youtubeUrl`, label: `Video ${i+1} — URL YouTube`, type: 'url' as const },
        ])).flat(),
      },
    ],
  },

  /* Contato */
  {
    id: 'contato',
    label: 'Contato',
    icon: <MessageSquare size={18} />,
    route: '/contato',
    sections: [
      {
        id: 'contato-form',
        title: 'Formulario de Contato',
        fields: [
          { key: 'contato.title', label: 'Titulo (use \\n para quebra)', type: 'text' },
          { key: 'contato.address', label: 'Endereco', type: 'text' },
          { key: 'contato.phone', label: 'Telefone', type: 'text' },
          { key: 'contato.email', label: 'E-mail', type: 'text' },
          { key: 'contato.submitText', label: 'Texto do botao enviar', type: 'text' },
          { key: 'contato.successMessage', label: 'Mensagem de sucesso', type: 'text' },
          { key: 'contato.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
      {
        id: 'contato-map',
        title: 'Mapa',
        fields: [
          { key: 'contato.map.alt', label: 'Alt da imagem do mapa', type: 'text' },
          { key: 'contato.mapImage', label: 'Imagem do mapa', type: 'image' },
          { key: 'contato.mapLink', label: 'Link Google Maps', type: 'url' },
        ],
      },
    ],
  },

  /* Parceiros */
  {
    id: 'parceiros',
    label: 'Rede de Parceiros',
    icon: <Handshake size={18} />,
    route: '/rede-de-parceiros',
    sections: [
      {
        id: 'parceiros-hero',
        title: 'Hero',
        fields: [
          { key: 'parceiros.hero.title', label: 'Titulo H1', type: 'text' },
          { key: 'parceiros.hero.subtitle', label: 'Subtitulo', type: 'textarea', rows: 2 },
          { key: 'parceiros.hero.bgImage', label: 'Imagem de fundo', type: 'image' },
        ],
      },
      {
        id: 'parceiros-stats',
        title: 'Estatisticas',
        fields: Array.from({ length: 4 }, (_, i) => ([
          { key: `parceiros.stat${i+1}.number`, label: `Stat ${i+1} — Numero`, type: 'text' as const },
          { key: `parceiros.stat${i+1}.label`, label: `Stat ${i+1} — Label`, type: 'text' as const },
        ])).flat(),
      },
      {
        id: 'parceiros-bio',
        title: 'Bio / Conteudo',
        fields: [
          { key: 'parceiros.bio.heading', label: 'Titulo Bio (use \\n)', type: 'textarea', rows: 2 },
          { key: 'parceiros.bio.allianceTitle', label: 'Titulo Alliance', type: 'text' },
          { key: 'parceiros.bio.metodoTitle', label: 'Titulo Metodo SAA', type: 'text' },
          { key: 'parceiros.bio.perfilTitle', label: 'Titulo Perfil Parceiro', type: 'text' },
          { key: 'parceiros.bio.comoTitle', label: 'Titulo Como Funciona', type: 'text' },
          { key: 'parceiros.bio.ctaText', label: 'Texto CTA interno', type: 'text' },
          { key: 'parceiros.stickyImage', label: 'Imagem sticky', type: 'image' },
        ],
      },
      {
        id: 'parceiros-faq',
        title: 'FAQ (8 perguntas)',
        fields: [
          { key: 'parceiros.faq.title', label: 'Titulo FAQ', type: 'text' },
          { key: 'parceiros.faq.desc', label: 'Descricao FAQ', type: 'textarea', rows: 2 },
          ...Array.from({ length: 8 }, (_, i) => ([
            { key: `parceiros.faq${i+1}.q`, label: `Pergunta ${i+1}`, type: 'text' as const },
            { key: `parceiros.faq${i+1}.a`, label: `Resposta ${i+1}`, type: 'textarea' as const, rows: 3 },
          ])).flat(),
        ],
      },
      {
        id: 'parceiros-cta',
        title: 'CTA Parceiro',
        fields: [
          { key: 'parceiros.cta.title', label: 'Titulo', type: 'text' },
          { key: 'parceiros.cta.desc', label: 'Descricao', type: 'textarea', rows: 3 },
          { key: 'parceiros.cta.buttonText', label: 'Texto botao', type: 'text' },
        ],
      },
      {
        id: 'parceiros-blog',
        title: 'Blog Preview',
        fields: [
          { key: 'parceiros.blog.heading', label: 'Titulo da secao', type: 'text' },
          ...Array.from({ length: 3 }, (_, i) => ([
            { key: `parceiros.blog.article${i+1}.title`, label: `Artigo ${i+1} — Titulo`, type: 'text' as const },
            { key: `parceiros.blog.article${i+1}.category`, label: `Artigo ${i+1} — Categoria`, type: 'text' as const },
            { key: `parceiros.blog.article${i+1}.date`, label: `Artigo ${i+1} — Data`, type: 'text' as const },
          ])).flat(),
        ],
      },
    ],
  },

  /* Footer */
  {
    id: 'footer',
    label: 'Footer',
    icon: <AlignLeft size={18} />,
    sections: [
      {
        id: 'footer-desc',
        title: 'Descricao',
        fields: [
          { key: 'footer.description', label: 'Texto do footer', type: 'textarea', rows: 4 },
        ],
      },
      {
        id: 'footer-newsletter',
        title: 'Newsletter',
        fields: [
          { key: 'footer.newsletter.label', label: 'Label', type: 'text' },
          { key: 'footer.newsletter.buttonText', label: 'Texto botao', type: 'text' },
        ],
      },
      {
        id: 'footer-contact',
        title: 'Dados de Contato',
        fields: [
          { key: 'footer.contact.title', label: 'Titulo', type: 'text' },
          { key: 'footer.contact.email', label: 'E-mail', type: 'text' },
          { key: 'footer.contact.phone', label: 'Telefone', type: 'text' },
        ],
      },
      {
        id: 'footer-location',
        title: 'Localizacao',
        fields: [
          { key: 'footer.location.title', label: 'Titulo', type: 'text' },
          { key: 'footer.location.address', label: 'Endereco', type: 'textarea', rows: 2 },
        ],
      },
      {
        id: 'footer-links',
        title: 'Links e Legal',
        fields: [
          ...Array.from({ length: 6 }, (_, i) => ([
            { key: `footer.link${i+1}.label`, label: `Link ${i+1} — Texto`, type: 'text' as const },
            { key: `footer.link${i+1}.href`, label: `Link ${i+1} — URL`, type: 'url' as const },
          ])).flat(),
          { key: 'footer.ctaText', label: 'CTA texto', type: 'text' },
          { key: 'footer.ctaHref', label: 'CTA link', type: 'url' },
          { key: 'footer.copyright', label: 'Copyright / termos', type: 'textarea', rows: 3 },
        ],
      },
    ],
  },

  /* SEO — custom rendered via SeoPanel component */
  {
    id: 'seo',
    label: 'SEO e Meta Tags',
    icon: <SearchCheck size={18} />,
    sections: [
      {
        id: 'seo-placeholder',
        title: 'Modulo SEO',
        fields: [],
      },
    ],
  },

  /* Service Pages */
  ...SERVICE_NAMES.map(svc => ({
    id: `lp-${svc.id}`,
    label: svc.label,
    icon: <FileText size={18} />,
    route: svc.route,
    sections: serviceSections(`lp-${svc.id}`),
  })),
];


/* ═══════════════════════════════════════════════════════════════════
   VISUAL COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Auto-group fields into visual cards ─── */
function groupFieldsIntoCards(fields: FieldConfig[]): (FieldConfig | FieldGroup)[] {
  const result: (FieldConfig | FieldGroup)[] = [];
  const seenGroups = new Set<string>();

  // Build a map of groups first
  const groupMap = new Map<string, FieldConfig[]>();
  for (const field of fields) {
    // Match numbered patterns: prefix + digits + .suffix
    const match = field.key.match(/^(.+?)(\d+)\.([^.]+)$/);
    if (match) {
      const groupKey = match[1] + match[2];
      if (!groupMap.has(groupKey)) groupMap.set(groupKey, []);
      groupMap.get(groupKey)!.push(field);
    }
  }

  // Only create visual groups if there are 2+ groups with same prefix (repeating pattern)
  const prefixCounts = new Map<string, number>();
  for (const field of fields) {
    const match = field.key.match(/^(.+?)(\d+)\.([^.]+)$/);
    if (match) prefixCounts.set(match[1], (prefixCounts.get(match[1]) || 0) + 1);
  }

  for (const field of fields) {
    const match = field.key.match(/^(.+?)(\d+)\.([^.]+)$/);
    if (match && (prefixCounts.get(match[1]) || 0) >= 2) {
      const groupKey = match[1] + match[2];
      if (!seenGroups.has(groupKey)) {
        seenGroups.add(groupKey);
        const groupFields = groupMap.get(groupKey) || [];
        const imageField = groupFields.find(f => f.type === 'image');
        // Derive a readable group label from the first field's label
        const firstLabel = groupFields[0]?.label || '';
        const labelMatch = firstLabel.match(/^(.+?)\s*—/);
        const groupLabel = labelMatch ? labelMatch[1].trim() : `Item ${match[2]}`;
        result.push({
          groupLabel,
          groupNum: match[2],
          fields: groupFields.filter(f => f !== imageField),
          imageField,
        });
      }
    } else if (!match || (prefixCounts.get(match?.[1] || '') || 0) < 2) {
      result.push(field);
    }
  }

  return result;
}

function isGroup(item: FieldConfig | FieldGroup): item is FieldGroup {
  return 'groupLabel' in item;
}

/* ─── Field Type Badge ─── */
function FieldBadge({ type }: { type: string }) {
  const config: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
    image: { icon: <ImageIcon size={10} />, label: 'IMG', color: 'bg-purple-500/20 text-purple-300 border-purple-500/20' },
    url: { icon: <Link2 size={10} />, label: 'URL', color: 'bg-blue-500/20 text-blue-300 border-blue-500/20' },
    html: { icon: <AlignLeft size={10} />, label: 'HTML', color: 'bg-amber-500/20 text-amber-300 border-amber-500/20' },
    textarea: { icon: <Type size={10} />, label: 'TXT', color: 'bg-white/5 text-white/30 border-white/10' },
    text: { icon: <Type size={10} />, label: 'TXT', color: 'bg-white/5 text-white/30 border-white/10' },
    number: { icon: <Type size={10} />, label: 'NUM', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20' },
  };
  const c = config[type] || config.text;
  return (
    <span className={`inline-flex items-center gap-[3px] px-[5px] py-[1px] rounded text-[9px] font-medium border ${c.color}`}>
      {c.icon} {c.label}
    </span>
  );
}

/* ─── Image Preview Card ─── */
function ImagePreview({ value, onChange, field }: {
  value: string;
  onChange: (key: string, val: string) => void;
  field: FieldConfig;
}) {
  const [editing, setEditing] = useState(false);
  const hasImage = value && !value.startsWith('figma:asset/');

  return (
    <div className="mb-[16px]">
      <div className="flex items-center gap-[8px] mb-[8px]">
        <FieldBadge type="image" />
        <span className="font-['Noto_Sans'] text-[12px] text-white/60">{field.label}</span>
      </div>
      <div className="relative group rounded-lg overflow-hidden bg-[#1a1715] border border-white/[0.08] hover:border-[#a57255]/30 transition-colors">
        {hasImage ? (
          <div className="relative">
            <img
              src={value}
              alt={field.label}
              className="w-full h-[160px] object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-[6px] bg-white/90 text-[#161312] px-[12px] py-[6px] rounded-md text-[12px] font-medium hover:bg-white transition-colors"
              >
                <Pencil size={12} /> Alterar imagem
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full h-[120px] flex flex-col items-center justify-center gap-[8px] text-white/20 hover:text-white/40 hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <ImageIcon size={28} strokeWidth={1.5} />
            <span className="text-[12px] font-['Noto_Sans']">Clique para adicionar imagem</span>
          </button>
        )}

        {editing && (
          <div className="p-[12px] border-t border-white/[0.06] bg-[#161312]">
            <div className="flex gap-[8px]">
              <input
                type="url"
                value={value}
                onChange={e => onChange(field.key, e.target.value)}
                placeholder="Cole a URL da imagem aqui..."
                autoFocus
                className="flex-1 bg-[#1a1715] border border-white/10 text-white font-['Noto_Sans'] text-[13px] h-[36px] px-[12px] focus:border-[#a57255]/50 focus:outline-none rounded placeholder:text-white/20"
              />
              <button
                onClick={() => setEditing(false)}
                className="h-[36px] px-[12px] bg-[#a57255]/20 text-[#a57255] text-[12px] rounded hover:bg-[#a57255]/30 transition-colors"
              >
                OK
              </button>
              {value && (
                <button
                  onClick={() => { onChange(field.key, ''); setEditing(false); }}
                  className="h-[36px] px-[8px] text-red-400/60 hover:text-red-400 transition-colors rounded"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Image Gallery (for sections with multiple image-only fields) ─── */
function ImageGallery({ fields, data, onChange }: {
  fields: FieldConfig[];
  data: Record<string, string>;
  onChange: (key: string, val: string) => void;
}) {
  return (
    <div className="mb-[16px]">
      <div className="grid grid-cols-3 gap-[8px]">
        {fields.map(field => (
          <ImagePreview
            key={field.key}
            value={data[field.key] || ''}
            onChange={onChange}
            field={field}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Text Field (inline visual) ─── */
function InlineField({ field, value, onChange }: {
  field: FieldConfig;
  value: string;
  onChange: (key: string, val: string) => void;
}) {
  const isTextArea = field.type === 'textarea' || field.type === 'html';

  return (
    <div className="mb-[14px]">
      <div className="flex items-center gap-[8px] mb-[5px]">
        <FieldBadge type={field.type} />
        <span className="font-['Noto_Sans'] text-[12px] text-white/50 truncate flex-1">
          {field.label}
        </span>
        {value?.trim() && (
          <span className="w-[6px] h-[6px] rounded-full bg-emerald-500/60 shrink-0" title="Preenchido" />
        )}
      </div>
      {field.help && (
        <p className="font-['Noto_Sans'] text-[10px] text-[#a57255]/50 mb-[4px] pl-[2px]">{field.help}</p>
      )}
      {isTextArea ? (
        <textarea
          value={value}
          onChange={e => onChange(field.key, e.target.value)}
          placeholder={field.placeholder || ''}
          rows={field.rows || 3}
          className={`w-full bg-[#161312] border border-white/[0.06] text-white font-['Noto_Sans'] text-[13px] leading-[20px] px-[12px] py-[10px] rounded-md focus:border-[#a57255]/40 focus:outline-none focus:ring-1 focus:ring-[#a57255]/20 transition-all resize-y placeholder:text-white/15 ${field.type === 'html' ? 'font-mono text-[12px]' : ''}`}
        />
      ) : (
        <div className="flex items-center gap-[8px]">
          <input
            type={field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text'}
            value={value}
            onChange={e => onChange(field.key, e.target.value)}
            placeholder={field.placeholder || ''}
            className="w-full bg-[#161312] border border-white/[0.06] text-white font-['Noto_Sans'] text-[13px] leading-[20px] h-[38px] px-[12px] rounded-md focus:border-[#a57255]/40 focus:outline-none focus:ring-1 focus:ring-[#a57255]/20 transition-all placeholder:text-white/15"
          />
          {field.type === 'url' && value && (
            <a href={value} target="_blank" rel="noopener noreferrer" className="shrink-0 text-blue-400/40 hover:text-blue-400 transition-colors">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Grouped Item Card ─── */
function GroupCard({ group, data, onChange }: {
  group: FieldGroup;
  data: Record<string, string>;
  onChange: (key: string, val: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const imageVal = group.imageField ? (data[group.imageField.key] || '') : '';
  const hasImage = imageVal && !imageVal.startsWith('figma:asset/');
  const filledCount = [...group.fields, ...(group.imageField ? [group.imageField] : [])]
    .filter(f => data[f.key]?.trim()).length;
  const totalCount = group.fields.length + (group.imageField ? 1 : 0);

  return (
    <div className="bg-[#1a1715] border border-white/[0.06] rounded-lg overflow-hidden mb-[10px] hover:border-white/[0.1] transition-colors">
      {/* Card header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-[12px] px-[16px] py-[12px] hover:bg-white/[0.02] transition-colors"
      >
        {/* Mini image preview */}
        <div className="w-[40px] h-[40px] rounded-md overflow-hidden bg-[#161312] border border-white/[0.06] shrink-0">
          {hasImage ? (
            <img src={imageVal} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/10">
              <ImageIcon size={16} />
            </div>
          )}
        </div>

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-[8px]">
            <span className="font-['Noto_Sans'] font-medium text-[13px] text-white truncate">
              {group.groupLabel}
            </span>
            <span className="text-[10px] text-white/20 font-['Noto_Sans']">#{group.groupNum}</span>
          </div>
          {/* Preview of title field */}
          {group.fields[0] && data[group.fields[0].key] && (
            <p className="font-['Noto_Sans'] text-[11px] text-white/30 truncate mt-[1px]">
              {data[group.fields[0].key]}
            </p>
          )}
        </div>

        <div className="flex items-center gap-[8px] shrink-0">
          <span className="font-['Noto_Sans'] text-[10px] text-white/20">{filledCount}/{totalCount}</span>
          <ChevronRight size={12} className={`text-white/20 transition-transform ${collapsed ? '' : 'rotate-90'}`} />
        </div>
      </button>

      {/* Card content */}
      {!collapsed && (
        <div className="px-[16px] pb-[16px] border-t border-white/[0.04]">
          {/* Image field at top if present */}
          {group.imageField && (
            <div className="pt-[12px]">
              <ImagePreview
                value={data[group.imageField.key] || ''}
                onChange={onChange}
                field={group.imageField}
              />
            </div>
          )}
          {/* Text fields */}
          <div className="pt-[8px]">
            {group.fields.map(field => (
              <InlineField
                key={field.key}
                field={field}
                value={data[field.key] || ''}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


/* ─── Visual Section Block ─── */
function VisualSectionBlock({ section, data, onChange }: {
  section: SectionConfig;
  data: Record<string, string>;
  onChange: (key: string, val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const filledCount = section.fields.filter(f => data[f.key]?.trim()).length;
  const totalCount = section.fields.length;
  const progress = totalCount > 0 ? (filledCount / totalCount * 100) : 0;

  // Check if this section has images for a visual preview
  const imageFields = section.fields.filter(f => f.type === 'image');
  const firstImageVal = imageFields.map(f => data[f.key]).find(v => v && !v.startsWith('figma:asset/'));

  // Auto-group fields
  const grouped = useMemo(() => groupFieldsIntoCards(section.fields), [section.fields]);

  return (
    <div className="mb-[8px] rounded-lg overflow-hidden border border-white/[0.06] bg-[#1e1b19] hover:border-white/[0.1] transition-colors">
      {/* Section header with visual preview */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-[14px] px-[20px] py-[14px] hover:bg-white/[0.02] transition-colors text-left"
      >
        {/* Visual indicator */}
        <div className="relative w-[44px] h-[44px] rounded-lg overflow-hidden bg-[#161312] border border-white/[0.06] shrink-0">
          {firstImageVal ? (
            <img src={firstImageVal} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {section.icon || <Type size={18} className="text-[#a57255]/40" />}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[10px]">
            <span className="font-['Noto_Sans'] font-semibold text-[14px] tracking-[-0.21px] text-white">
              {section.title}
            </span>
            {imageFields.length > 0 && (
              <span className="text-[10px] text-purple-300/50 font-['Noto_Sans']">
                {imageFields.length} img
              </span>
            )}
          </div>
          {/* Mini progress bar */}
          <div className="flex items-center gap-[8px] mt-[6px]">
            <div className="flex-1 h-[3px] bg-white/[0.04] rounded-full overflow-hidden max-w-[120px]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-500/60' : 'bg-[#a57255]/50'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-['Noto_Sans'] text-[10px] text-white/25">
              {filledCount}/{totalCount}
            </span>
          </div>
        </div>

        <ChevronRight size={16} className={`text-white/20 transition-transform duration-200 shrink-0 ${open ? 'rotate-90' : ''}`} />
      </button>

      {/* Section content */}
      {open && (
        <div className="px-[20px] pb-[20px] border-t border-white/[0.04]">
          <div className="pt-[16px]">
            {grouped.map((item, idx) => {
              if (isGroup(item)) {
                return (
                  <GroupCard
                    key={`group-${item.groupLabel}-${item.groupNum}`}
                    group={item}
                    data={data}
                    onChange={onChange}
                  />
                );
              }

              // Standalone image field → visual card
              if (item.type === 'image') {
                return (
                  <ImagePreview
                    key={item.key}
                    value={data[item.key] || ''}
                    onChange={onChange}
                    field={item}
                  />
                );
              }

              // Regular field
              return (
                <InlineField
                  key={item.key}
                  field={item}
                  value={data[item.key] || ''}
                  onChange={onChange}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Draggable Section Block (wraps VisualSectionBlock with DnD) ─── */
const SECTION_DND_TYPE = 'PANEL_SECTION';

function DraggableSectionBlock({ section, index, data, onChange, moveSection }: {
  section: SectionConfig;
  index: number;
  data: Record<string, string>;
  onChange: (key: string, val: string) => void;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: SECTION_DND_TYPE,
    item: () => ({ index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: SECTION_DND_TYPE,
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the item
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveSection(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  dragPreview(drop(ref));

  return (
    <div
      ref={ref}
      className={`transition-all duration-150 ${isDragging ? 'opacity-30 scale-[0.98]' : ''} ${isOver ? 'ring-1 ring-[#a57255]/40 rounded-lg' : ''}`}
    >
      <div className="flex items-start gap-0 group/dnd">
        {/* Drag handle */}
        <div
          ref={drag}
          className="shrink-0 w-[20px] mt-[16px] flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover/dnd:opacity-60 hover:!opacity-100 transition-opacity"
          title="Arrastar para reordenar"
        >
          <GripVertical size={14} className="text-white/30 hover:text-[#a57255]" />
        </div>
        <div className="flex-1 min-w-0">
          <VisualSectionBlock
            section={section}
            data={data}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Toast ─── */
function Toast({ message, visible, type = 'success' }: { message: string; visible: boolean; type?: 'success' | 'info' }) {
  if (!visible) return null;
  return (
    <div className={`fixed bottom-[24px] right-[24px] z-[999] flex items-center gap-[10px] px-[20px] py-[14px] shadow-2xl rounded-lg ${type === 'success' ? 'bg-emerald-900/90 border border-emerald-500/30' : 'bg-[#452b1e] border border-[#a57255]/30'}`}>
      <Check size={16} className={type === 'success' ? 'text-emerald-400' : 'text-[#a57255]'} />
      <span className="font-['Noto_Sans'] text-[14px] text-white">{message}</span>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   MAIN PANEL
   ═══════════════════════════════════════════════════════════════════ */

export function PainelPage() {
  const [session, setSession] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [data, setData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [activePage, setActivePage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'info' });
  const [expandedGroup, setExpandedGroup] = useState<string | null>('pages');
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Section ordering per page (persisted in localStorage)
  const [sectionOrders, setSectionOrders] = useState<Record<string, string[]>>(() => {
    try {
      const stored = localStorage.getItem('panel-section-orders');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const getOrderedSections = useCallback((page: PageConfig): SectionConfig[] => {
    const order = sectionOrders[page.id];
    if (!order) return page.sections;
    const sectionMap = new Map(page.sections.map(s => [s.id, s]));
    const ordered: SectionConfig[] = [];
    for (const id of order) {
      const s = sectionMap.get(id);
      if (s) { ordered.push(s); sectionMap.delete(id); }
    }
    // Append any new sections not in saved order
    sectionMap.forEach(s => ordered.push(s));
    return ordered;
  }, [sectionOrders]);

  const moveSectionForPage = useCallback((pageId: string, sections: SectionConfig[], dragIndex: number, hoverIndex: number) => {
    const ids = sections.map(s => s.id);
    const [moved] = ids.splice(dragIndex, 1);
    ids.splice(hoverIndex, 0, moved);
    setSectionOrders(prev => {
      const next = { ...prev, [pageId]: ids };
      try { localStorage.setItem('panel-section-orders', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const liveUpdateTimer = useRef<ReturnType<typeof setTimeout>>();
  const [previewContainerSize, setPreviewContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchBackendData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      if (res.ok) {
        const json = await res.json();
        let serverData = json.data || {};
        if (typeof serverData === 'string') {
          try { serverData = JSON.parse(serverData); } catch { serverData = {}; }
        }
        const merged = { ...panelDefaults, ...serverData };
        setData(merged);
        updatePanelDataCache(merged);
      }
    } catch (e) {
      console.error('Erro ao carregar dados do painel:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      fetchBackendData();
    }
  }, [session, fetchBackendData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        try {
          const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
            body: JSON.stringify({ email, password })
          });
          if (res.ok) {
            const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
            if (signInErr) setAuthError(signInErr.message);
          } else {
            const errBody = await res.json();
            setAuthError(errBody.error || 'Erro no login');
          }
        } catch {
          setAuthError('Erro no servidor');
        }
      } else {
        setAuthError(error.message);
      }
    }
  };

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2600);
  }, []);

  // Live preview: update panel cache directly (components re-render instantly)
  const pushLivePreview = useCallback((newData: Record<string, string>) => {
    if (liveUpdateTimer.current) clearTimeout(liveUpdateTimer.current);
    liveUpdateTimer.current = setTimeout(() => {
      updatePanelDataCache(newData);
    }, 100); // debounce 100ms
  }, []);

  const handleFieldChange = useCallback((key: string, value: string) => {
    setData(prev => {
      const next = { ...prev, [key]: value };
      pushLivePreview(next);
      return next;
    });
  }, [pushLivePreview]);

  // Helper: get a fresh access token — always forces a refresh to avoid stale tokens
  const getFreshToken = useCallback(async (): Promise<string | null> => {
    try {
      // Always try to refresh first to guarantee a valid token
      console.log('[Auth] Refreshing session...');
      const { data: { session: refreshed }, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshed && !refreshError) {
        setSession(refreshed);
        console.log('[Auth] Session refreshed, expires_at:', refreshed.expires_at);
        return refreshed.access_token;
      }

      // If refresh fails, try getSession as fallback
      console.log('[Auth] Refresh failed, trying getSession fallback...', refreshError?.message);
      const { data: { session: cached }, error: sessionError } = await supabase.auth.getSession();
      
      if (cached && !sessionError) {
        const expiresAt = cached.expires_at ?? 0;
        const now = Math.floor(Date.now() / 1000);
        if (expiresAt - now > 30) {
          console.log('[Auth] Using cached session, expires in', expiresAt - now, 'seconds');
          setSession(cached);
          return cached.access_token;
        }
      }

      // Nothing works — clear session so user sees login form
      console.error('[Auth] No valid session available. Clearing state.');
      setSession(null);
      return null;
    } catch (e: any) {
      console.error('[Auth] getFreshToken error:', e.message);
      setSession(null);
      return null;
    }
  }, []);

  const handleSave = useCallback(async () => {
    if (!session) return;
    setIsSaving(true);
    try {
      const token = await getFreshToken();
      if (!token) { showToast('Sessao expirada. Faca login novamente.', 'info'); return; }
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ data })
      });
      if (res.ok) {
        showToast('Alteracoes salvas com sucesso!');
        updatePanelDataCache(data);
      } else {
        let errMsg = `HTTP ${res.status}`;
        try {
          const ct = res.headers.get('content-type') || '';
          if (ct.includes('json')) {
            const err = await res.json();
            errMsg = err.error || err.message || errMsg;
          } else {
            errMsg = await res.text() || errMsg;
          }
        } catch { /* ignore */ }
        console.error('[Painel] Save error:', errMsg);
        if (res.status === 401) {
          setSession(null);
          showToast('Sessao expirada. Faca login novamente.', 'info');
        } else {
          showToast(`Erro ao salvar: ${errMsg}`, 'info');
        }
      }
    } catch (e: any) {
      console.error('[Painel] Save network error:', e);
      showToast(e.message || 'Erro ao salvar', 'info');
    } finally {
      setIsSaving(false);
    }
  }, [data, showToast, session, getFreshToken]);

  const handleReset = useCallback(async () => {
    if (confirm('Resetar todas as alteracoes? Isso nao pode ser desfeito.')) {
      if (!session) return;
      setIsSaving(true);
      try {
        const token = await getFreshToken();
        if (!token) { showToast('Sessao expirada. Faca login novamente.', 'info'); return; }
        const res = await fetch(API_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ data: {} })
        });
        if (res.ok) {
          setData({});
          updatePanelDataCache({});
          showToast('Dados resetados ao original', 'info');
        }
      } catch(e) {
        console.error(e);
      } finally {
        setIsSaving(false);
      }
    }
  }, [showToast, session, getFreshToken]);

  const handleExport = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sa-painel-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup exportado!');
  }, [data, showToast]);

  const handleSeedDefaults = useCallback(async () => {
    if (!session) {
      showToast('Faça login antes de sincronizar defaults.', 'info');
      return;
    }

    // Validate panelDefaults is available and non-empty
    if (!panelDefaults || typeof panelDefaults !== 'object' || Object.keys(panelDefaults).length === 0) {
      console.error('[Painel] panelDefaults is empty or invalid:', panelDefaults);
      showToast('Erro: defaults não carregados. Recarregue a página.', 'info');
      return;
    }

    const defaultsCount = Object.keys(panelDefaults).length;
    if (!confirm(`Sincronizar ${defaultsCount} valores default?\n\nIsso preenche apenas campos vazios — dados existentes NÃO serão sobrescritos.`)) return;

    setIsSaving(true);
    try {
      const token = await getFreshToken();
      if (!token) { showToast('Sessão expirada. Faça login novamente.', 'info'); setIsSaving(false); return; }

      // Filter out figma:asset values that aren't valid runtime URLs
      const cleanDefaults: Record<string, string> = {};
      let skipped = 0;
      for (const [key, value] of Object.entries(panelDefaults)) {
        if (typeof value === 'string' && value.startsWith('figma:asset/')) {
          skipped++;
          continue;
        }
        cleanDefaults[key] = value;
      }
      if (skipped > 0) {
        console.log(`[Painel] Filtered out ${skipped} figma:asset values from defaults`);
      }

      const payload = JSON.stringify({ defaults: cleanDefaults });
      console.log(`[Painel] Sending seed request with ${Object.keys(cleanDefaults).length} defaults (${(payload.length / 1024).toFixed(1)}KB)`);

      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/panel/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });

      if (res.ok) {
        const json = await res.json();
        console.log(`[Painel] Seed success: ${json.seeded} seeded, ${json.total} total`);
        setData(json.data || {});
        updatePanelDataCache(json.data || {});
        if (json.seeded === 0) {
          showToast('Todos os defaults já estavam sincronizados. Nenhum campo novo preenchido.', 'info');
        } else {
          showToast(`${json.seeded} valores default sincronizados! (${json.total} total)`);
        }
      } else {
        let errMsg = `HTTP ${res.status}`;
        try {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const err = await res.json();
            errMsg = err.error || err.message || errMsg;
          } else {
            const text = await res.text();
            errMsg = `HTTP ${res.status}: ${text.slice(0, 200)}`;
          }
        } catch { /* ignore parse error */ }
        console.error('[Painel] Seed error response:', errMsg);
        if (res.status === 401) {
          setSession(null);
          showToast('Sessão expirada. Faça login novamente.', 'info');
        } else {
          showToast(`Erro ao sincronizar: ${errMsg}`, 'info');
        }
      }
    } catch (e: any) {
      console.error('[Painel] Seed network error:', e);
      showToast(`Erro de rede: ${e.message || 'falha na conexão'}`, 'info');
    } finally {
      setIsSaving(false);
    }
  }, [session, showToast, getFreshToken]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const imported = JSON.parse(ev.target?.result as string);
          setData(imported);
          updatePanelDataCache(imported);
          if (session) {
            const tk = await getFreshToken();
            if (tk) {
              await fetch(API_URL, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${tk}`
                },
                body: JSON.stringify({ data: imported })
              });
            }
          }
          showToast('Backup importado com sucesso!');
        } catch { showToast('Arquivo invalido', 'info'); }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [showToast, session, getFreshToken]);

  // Keyboard shortcut
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleSave]);

  const currentPage = PAGES.find(p => p.id === activePage);

  // Filter pages by search
  const filteredPages = searchTerm.trim()
    ? PAGES.filter(p =>
        p.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sections.some(s =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.fields.some(f => f.label.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      )
    : PAGES;

  // Group pages
  const globalIds = new Set(['geral', 'footer', 'navbar', 'seo']);
  const mainPages = filteredPages.filter(p => !p.id.startsWith('lp-') && !globalIds.has(p.id));
  const lpPages = filteredPages.filter(p => p.id.startsWith('lp-'));
  const globalPages = filteredPages.filter(p => globalIds.has(p.id));

  const totalFields = PAGES.reduce((acc, p) => acc + p.sections.reduce((a, s) => a + s.fields.length, 0), 0);
  const filledFields = Object.values(data).filter(v => v?.trim()).length;

  // Scroll to top on page change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // When preview page changes, scroll preview to top
  useEffect(() => {
    if (showPreview && previewScrollRef.current) {
      previewScrollRef.current.scrollTop = 0;
    }
  }, [activePage, showPreview]);

  // Track preview container size for desktop 16:9 viewport scaling
  useEffect(() => {
    const el = previewContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setPreviewContainerSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [showPreview]);

  // Sync panel data to usePanelContent cache when data changes (for live preview)
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      updatePanelDataCache(data);
    }
  }, [data]);

  // ─── Auth loading ───
  if (loadingAuth) {
    return (
      <div className="fixed inset-0 bg-[#0e0d0c] flex items-center justify-center text-white z-[100]">
        <div className="flex flex-col items-center gap-[16px]">
          <div className="w-[40px] h-[40px] border-2 border-[#a57255]/30 border-t-[#a57255] rounded-full animate-spin" />
          <span className="font-['Noto_Sans'] text-[13px] text-white/40">Carregando painel...</span>
        </div>
      </div>
    );
  }

  // ─── Login screen ───
  if (!session) {
    return (
      <div className="fixed inset-0 bg-[#0e0d0c] flex items-center justify-center p-4 z-[100]">
        <div className="bg-[#1a1715] border border-white/[0.08] rounded-xl p-[36px] max-w-[420px] w-full shadow-2xl">
          {/* Logo area */}
          <div className="flex items-center gap-[12px] mb-[28px]">
            <div className="w-[10px] h-[10px] bg-[#a57255] rounded-sm" />
            <span className="font-['Marcellus'] text-[20px] text-white tracking-[-0.4px]">Painel SA</span>
          </div>

          <div className="mb-[24px]">
            <h1 className="font-['Noto_Sans'] text-[22px] text-white font-semibold mb-[8px] tracking-[-0.44px]">
              Acesso ao Painel
            </h1>
            <p className="font-['Noto_Sans'] text-[13px] text-white/40 leading-[20px]">
              Entre com suas credenciais para gerenciar o conteudo do site. No primeiro acesso, sua conta sera criada automaticamente.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-[16px]">
            <div>
              <label className="block font-['Noto_Sans'] text-[12px] text-white/50 mb-[6px]">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-[#161312] border border-white/[0.08] px-[14px] py-[11px] text-white text-[14px] rounded-lg focus:outline-none focus:border-[#a57255]/50 focus:ring-1 focus:ring-[#a57255]/20 transition-all"
              />
            </div>
            <div>
              <label className="block font-['Noto_Sans'] text-[12px] text-white/50 mb-[6px]">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-[#161312] border border-white/[0.08] px-[14px] py-[11px] text-white text-[14px] rounded-lg focus:outline-none focus:border-[#a57255]/50 focus:ring-1 focus:ring-[#a57255]/20 transition-all"
              />
            </div>
            {authError && <div className="text-red-400 text-[13px] bg-red-500/10 border border-red-500/20 rounded-lg px-[12px] py-[8px]">{authError}</div>}
            <button
              type="submit"
              className="mt-[8px] bg-[#a57255] hover:bg-[#b88566] text-white font-['Noto_Sans'] font-medium text-[14px] py-[12px] rounded-lg transition-colors flex justify-center items-center gap-[8px]"
            >
              <LogIn size={16} /> Entrar
            </button>
            <Link to="/" className="text-center text-[13px] text-white/30 hover:text-white/60 mt-[4px] transition-colors">
              Voltar ao site
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // ─── Main Panel UI ───
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="painel-scrollbar fixed inset-0 bg-[#0e0d0c] flex z-[100]">

      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'w-[260px]' : 'w-0'} shrink-0 bg-[#151311] border-r border-white/[0.06] flex flex-col transition-all duration-300 overflow-hidden`}>
        {/* Header */}
        <div className="px-[18px] py-[16px] border-b border-white/[0.06]">
          <div className="flex items-center gap-[10px] mb-[14px]">
            <div className="w-[8px] h-[8px] bg-[#a57255] rounded-sm" />
            <span className="font-['Marcellus'] text-[16px] text-white tracking-[-0.32px]">Painel SA</span>
          </div>
          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-[#0e0d0c] border border-white/[0.06] h-[32px] pl-[30px] pr-[10px] text-[12px] text-white font-['Noto_Sans'] rounded-md focus:border-[#a57255]/30 focus:outline-none placeholder:text-white/15"
            />
          </div>
        </div>

        {/* Global progress */}
        <div className="px-[18px] py-[10px] border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-[5px]">
            <span className="font-['Noto_Sans'] text-[10px] text-white/30">Preenchimento geral</span>
            <span className="font-['Noto_Sans'] text-[10px] text-[#a57255]/70">{Math.round(filledFields / totalFields * 100)}%</span>
          </div>
          <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full bg-[#a57255]/60 rounded-full transition-all duration-500" style={{ width: `${totalFields > 0 ? (filledFields / totalFields * 100) : 0}%` }} />
          </div>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto py-[6px]">

          {/* Global */}
          <NavGroup
            label="Configuracoes"
            items={globalPages}
            active={activePage}
            onSelect={setActivePage}
            expanded={expandedGroup === 'global'}
            onToggle={() => setExpandedGroup(expandedGroup === 'global' ? null : 'global')}
            defaultExpanded
          />

          {/* Pages */}
          <NavGroup
            label="Paginas"
            items={mainPages}
            active={activePage}
            onSelect={setActivePage}
            expanded={expandedGroup === 'pages'}
            onToggle={() => setExpandedGroup(expandedGroup === 'pages' ? null : 'pages')}
            defaultExpanded
          />

          {/* Serviços */}
          <NavGroup
            label="Servicos"
            items={lpPages}
            active={activePage}
            onSelect={setActivePage}
            expanded={expandedGroup === 'lps'}
            onToggle={() => setExpandedGroup(expandedGroup === 'lps' ? null : 'lps')}
          />
        </nav>

        {/* Sidebar bottom actions */}
        <div className="px-[10px] py-[10px] border-t border-white/[0.06] space-y-[2px]">
          <button onClick={handleExport} className="w-full flex items-center gap-[8px] px-[10px] py-[7px] text-[12px] text-white/40 hover:text-white hover:bg-white/[0.03] transition-colors font-['Noto_Sans'] rounded-md">
            <Download size={13} /> Exportar JSON
          </button>
          <button onClick={handleImport} className="w-full flex items-center gap-[8px] px-[10px] py-[7px] text-[12px] text-white/40 hover:text-white hover:bg-white/[0.03] transition-colors font-['Noto_Sans'] rounded-md">
            <Upload size={13} /> Importar JSON
          </button>
          <button onClick={handleSeedDefaults} disabled={isSaving} className={`w-full flex items-center gap-[8px] px-[10px] py-[7px] text-[12px] transition-colors font-['Noto_Sans'] rounded-md ${isSaving ? 'text-[#a57255]/30 cursor-wait' : 'text-[#a57255]/60 hover:text-[#a57255] hover:bg-[#a57255]/5'}`}>
            <RefreshCw size={13} className={isSaving ? 'animate-spin' : ''} /> {isSaving ? 'Sincronizando...' : 'Sincronizar Defaults'}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-[52px] shrink-0 bg-[#151311] border-b border-white/[0.06] flex items-center justify-between px-[16px] gap-[12px]">
          <div className="flex items-center gap-[10px]">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/30 hover:text-white transition-colors p-[4px] rounded">
              <Menu size={18} />
            </button>
            <div className="h-[20px] w-px bg-white/[0.06]" />
            <div className="flex items-center gap-[8px]">
              <span className="text-[#a57255]/60">{currentPage?.icon}</span>
              <h1 className="font-['Noto_Sans'] font-semibold text-[14px] text-white tracking-[-0.21px]">
                {currentPage?.label || 'Painel'}
              </h1>
              {currentPage?.route && (
                <span className="font-['Noto_Sans'] text-[11px] text-white/20 ml-[4px]">{currentPage.route}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-[8px]">
            {/* Preview toggle — always visible */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-[5px] h-[30px] px-[12px] rounded-md text-[12px] font-['Noto_Sans'] font-medium transition-all ${
                showPreview
                  ? 'bg-[#a57255]/15 text-[#a57255] border border-[#a57255]/30 shadow-sm shadow-[#a57255]/10'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-white/[0.08]'
              }`}
            >
              {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
              {showPreview ? 'Fechar Preview' : 'Preview ao Vivo'}
              {showPreview && <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse ml-[2px]" />}
            </button>

            <div className="h-[20px] w-px bg-white/[0.06]" />

            <button
              onClick={() => supabase.auth.signOut()}
              className="flex items-center gap-[5px] h-[30px] px-[10px] text-white/30 hover:text-white transition-colors font-['Noto_Sans'] text-[12px] rounded-md"
            >
              <LogOut size={13} />
            </button>
            <button
              onClick={handleReset}
              disabled={isSaving}
              className="flex items-center gap-[5px] h-[30px] px-[10px] border border-white/[0.08] text-white/40 hover:text-white hover:border-white/[0.15] transition-colors font-['Noto_Sans'] text-[12px] rounded-md"
            >
              <RotateCcw size={13} />
              Resetar
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-[5px] h-[30px] px-[14px] bg-[#a57255] hover:bg-[#8f6146] transition-colors text-white font-['Noto_Sans'] font-medium text-[12px] disabled:opacity-50 rounded-md"
            >
              <Save size={13} />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </header>

        {/* Content area with optional preview */}
        <div className="flex-1 flex overflow-hidden">

          {/* Editor panel */}
          <div ref={contentRef} className={`overflow-y-auto transition-all duration-300 ${showPreview ? 'w-[50%] shrink-0' : 'flex-1'}`}>
            <div className={`${showPreview ? 'max-w-full px-[16px]' : activePage === 'seo' ? 'max-w-full px-[20px]' : 'max-w-[780px] px-[20px]'} mx-auto py-[28px] transition-all`}>

              {/* Page header card */}
              {currentPage && (
                <div className="mb-[20px] rounded-xl overflow-hidden">
                  {/* Visual page header with gradient */}
                  <div className="bg-gradient-to-br from-[#a57255]/15 via-[#1e1b19] to-[#1e1b19] border border-white/[0.08] rounded-xl px-[24px] py-[20px]">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-[10px] mb-[6px]">
                          <span className="text-[#a57255]">{currentPage.icon}</span>
                          <h2 className="font-['Marcellus'] text-[20px] text-white tracking-[-0.4px]">
                            {currentPage.label}
                          </h2>
                        </div>
                        <div className="flex items-center gap-[12px] text-white/30 font-['Noto_Sans'] text-[12px]">
                          {activePage === 'seo' ? (
                            <span>5 abas — Dashboard, Meta Tags, Analise, Checklist, Schema.org</span>
                          ) : (
                            <>
                              <span>{currentPage.sections.length} secoes</span>
                              <span className="w-[3px] h-[3px] rounded-full bg-white/15" />
                              <span>{currentPage.sections.reduce((a, s) => a + s.fields.length, 0)} campos</span>
                            </>
                          )}
                          {currentPage.route && (
                            <>
                              <span className="w-[3px] h-[3px] rounded-full bg-white/15" />
                              <span className="text-[#a57255]/50">{currentPage.route}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-[6px]">
                        {sectionOrders[currentPage.id] && (
                          <button
                            onClick={() => {
                              setSectionOrders(prev => {
                                const next = { ...prev };
                                delete next[currentPage.id];
                                try { localStorage.setItem('panel-section-orders', JSON.stringify(next)); } catch {}
                                return next;
                              });
                            }}
                            className="flex items-center gap-[5px] h-[32px] px-[10px] text-white/30 hover:text-white hover:bg-white/[0.04] transition-colors font-['Noto_Sans'] text-[11px] rounded-lg"
                            title="Restaurar ordem original das secoes"
                          >
                            <RotateCcw size={12} />
                            Ordem original
                          </button>
                        )}
                        {currentPage.route && (
                          <Link
                            to={currentPage.route}
                            target="_blank"
                            className="flex items-center gap-[6px] h-[32px] px-[12px] border border-[#a57255]/20 text-[#a57255]/70 hover:text-[#a57255] hover:bg-[#a57255]/10 transition-colors font-['Noto_Sans'] text-[12px] rounded-lg"
                          >
                            <ExternalLink size={13} />
                            Abrir
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sections — drag-and-drop reordering or custom SEO panel */}
              {currentPage && activePage === 'seo' ? (
                <SeoPanel data={data} onChange={handleFieldChange} />
              ) : currentPage && (() => {
                const orderedSections = getOrderedSections(currentPage);
                return orderedSections.map((section, idx) => (
                  <DraggableSectionBlock
                    key={section.id}
                    section={section}
                    index={idx}
                    data={data}
                    onChange={handleFieldChange}
                    moveSection={(dragIdx, hoverIdx) => moveSectionForPage(currentPage.id, orderedSections, dragIdx, hoverIdx)}
                  />
                ));
              })()}

              {/* Bottom spacer */}
              <div className="h-[80px]" />
            </div>
          </div>

          {/* Preview panel — renders actual page component (no iframe) */}
          {showPreview && (
            <div className="w-[50%] border-l border-white/[0.06] flex flex-col bg-[#0a0908]">
              {/* Preview top bar — browser-like */}
              <div className="shrink-0 bg-[#151311] border-b border-white/[0.06]">
                {/* Controls row */}
                <div className="h-[38px] flex items-center justify-between px-[12px]">
                  <div className="flex items-center gap-[8px]">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-[5px] mr-[4px]">
                      <button
                        onClick={() => setShowPreview(false)}
                        className="w-[10px] h-[10px] rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer"
                        title="Fechar preview"
                      />
                      <span className="w-[10px] h-[10px] rounded-full bg-yellow-500/70" />
                      <span className="w-[10px] h-[10px] rounded-full bg-emerald-500/70 animate-pulse" title="Preview ao vivo" />
                    </div>

                    <div className="h-[16px] w-px bg-white/[0.06]" />

                    {/* Device toggles */}
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-[3px] rounded transition-colors cursor-pointer ${previewDevice === 'desktop' ? 'text-[#a57255]' : 'text-white/20 hover:text-white/40'}`}
                      title="Desktop"
                    >
                      <Monitor size={13} />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-[3px] rounded transition-colors cursor-pointer ${previewDevice === 'mobile' ? 'text-[#a57255]' : 'text-white/20 hover:text-white/40'}`}
                      title="Mobile"
                    >
                      <Smartphone size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-[6px]">
                    {currentPage?.route && (
                      <Link
                        to={currentPage.route}
                        target="_blank"
                        className="p-[3px] text-white/20 hover:text-white/40 transition-colors rounded"
                        title="Abrir em nova aba"
                      >
                        <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>
                </div>

                {/* URL bar */}
                <div className="px-[12px] pb-[8px]">
                  <div className="flex items-center gap-[6px] bg-[#0e0d0c] rounded-md h-[28px] px-[10px] border border-white/[0.04]">
                    <Globe size={10} className="text-white/15 shrink-0" />
                    <span className="font-['Noto_Sans'] text-[11px] text-white/25 truncate flex-1">
                      sousaaraujo.adv.br{currentPage?.route || ''}
                    </span>
                    {previewDevice === 'desktop' && previewContainerSize.w > 0 && (
                      <span className="font-['Noto_Sans'] text-[9px] text-white/15 tabular-nums shrink-0 bg-white/[0.04] px-[5px] py-[1px] rounded">
                        {Math.round((previewContainerSize.w / 1920) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Live page preview — rendered directly (no iframe) */}
              {(() => {
                const PageComp = PreviewPages[activePage];
                if (!PageComp) {
                  return (
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-[40px]">
                      <div className="w-[56px] h-[56px] rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-[16px]">
                        <Eye size={24} className="text-white/15" />
                      </div>
                      <h3 className="font-['Noto_Sans'] text-[14px] text-white/40 font-medium mb-[6px]">
                        Sem preview disponivel
                      </h3>
                      <p className="font-['Noto_Sans'] text-[12px] text-white/20 max-w-[240px] leading-[18px]">
                        Esta secao ({currentPage?.label}) nao possui uma pagina associada para preview.
                      </p>
                    </div>
                  );
                }
                /* ── Desktop: virtual 1920×1080 viewport scaled to fit ── */
                /* ── Mobile: 375px with phone frame ── */
                const VIRTUAL_W = 1920;
                const VIRTUAL_H = 1080;

                if (previewDevice === 'mobile') {
                  return (
                    <div ref={previewContainerRef} className="flex-1 overflow-hidden flex justify-center items-start bg-[#0e0d0c] p-[12px]">
                      <div
                        ref={previewScrollRef}
                        className="w-[375px] overflow-y-auto overflow-x-hidden bg-white rounded-xl border-[3px] border-[#333] shadow-2xl transition-all duration-300"
                        style={{ maxHeight: '100%', transform: 'scale(1)' }}
                      >
                        <PreviewErrorBoundary pageId={activePage}>
                          <Suspense fallback={<PreviewLoader />}>
                            <PreviewLayout>
                              <PageComp key={activePage} />
                            </PreviewLayout>
                          </Suspense>
                        </PreviewErrorBoundary>
                      </div>
                    </div>
                  );
                }

                /* Desktop: 1920×1080 virtual viewport scaled to fit container width.
                   Height is capped at 1080px (Full HD) so it simulates a real monitor.
                   The outer wrapper clips to the scaled dimensions; scroll happens inside. */
                const cw = previewContainerSize.w;
                const ch = previewContainerSize.h;
                const scale = cw > 0 ? cw / VIRTUAL_W : 0.5;
                const scaledViewportH = Math.round(VIRTUAL_H * scale);

                return (
                  <div
                    ref={previewContainerRef}
                    className="flex-1 overflow-hidden bg-[#0e0d0c] flex items-start justify-center"
                  >
                    {cw > 0 && (
                      <div
                        className="relative overflow-hidden"
                        style={{
                          width: cw,
                          height: Math.min(scaledViewportH, ch),
                        }}
                      >
                        <div
                          ref={previewScrollRef}
                          className="overflow-y-auto overflow-x-hidden bg-white absolute top-0 left-0"
                          style={{
                            width: VIRTUAL_W,
                            height: VIRTUAL_H,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                          }}
                        >
                        <PreviewErrorBoundary pageId={activePage}>
                          <Suspense fallback={<PreviewLoader />}>
                            <PreviewLayout>
                              <PageComp key={activePage} />
                            </PreviewLayout>
                          </Suspense>
                        </PreviewErrorBoundary>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} type={toast.type} />
    </div>
    </DndProvider>
  );
}


/* ─── Nav Group Component ─── */
function NavGroup({ label, items, active, onSelect, expanded, onToggle, defaultExpanded }: {
  label: string;
  items: PageConfig[];
  active: string;
  onSelect: (id: string) => void;
  expanded: boolean;
  onToggle: () => void;
  defaultExpanded?: boolean;
}) {
  const isOpen = defaultExpanded ? true : expanded;
  if (items.length === 0) return null;

  return (
    <div className="mb-[2px]">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-[8px] px-[18px] py-[8px] hover:bg-white/[0.02] transition-colors"
      >
        <ChevronDown size={10} className={`text-white/20 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
        <span className="font-['Noto_Sans'] text-[10px] tracking-[0.8px] text-white/25 uppercase">{label}</span>
        <span className="font-['Noto_Sans'] text-[9px] text-white/10 ml-auto">{items.length}</span>
      </button>
      {isOpen && (
        <div className="pb-[4px]">
          {items.map(page => {
            const isActive = active === page.id;
            return (
              <button
                key={page.id}
                onClick={() => onSelect(page.id)}
                className={`w-full flex items-center gap-[8px] px-[18px] pl-[32px] py-[7px] text-left transition-all ${
                  isActive
                    ? 'bg-[#a57255]/10 text-[#a57255] border-r-2 border-[#a57255]'
                    : 'text-white/45 hover:text-white/70 hover:bg-white/[0.02]'
                }`}
              >
                <span className={isActive ? 'text-[#a57255]' : 'text-white/25'}>{page.icon}</span>
                <span className="font-['Noto_Sans'] text-[12px] tracking-[-0.18px] truncate">{page.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PainelPage;
