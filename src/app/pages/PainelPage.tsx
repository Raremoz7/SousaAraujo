/**
 * PainelPage — Painel Administrativo Visual
 * Editor visual com preview ao vivo, cards agrupados e previews de imagem
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Link } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { supabase } from '../../lib/supabaseClient';
import { updatePanelDataCache } from '../hooks/usePanelContent';
import { panelDefaults } from '../../data/panelDefaults';
import {
  Home, FileText, Users, MessageSquare, Video, HelpCircle, MapPin,
  Handshake, Layout, Settings, ChevronRight, ChevronDown, Save,
  RotateCcw, Download, Upload, Eye, EyeOff, Menu, Search, Check,
  Globe, Phone, Clock, Instagram, SearchCheck,
  Image as ImageIcon, Type, Link2, AlignLeft, Trash2,
  ExternalLink, LogOut, LogIn, Monitor, Smartphone, Pencil, RefreshCw,
  GripVertical, Tablet, ArrowUp, RotateCw,
  Sun, Moon, Grid3X3, Minus, Plus, Cpu, Hash, ImageDown, AlertTriangle, BarChart3
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SeoPanel, saveSeoHistoryEntry } from '../components/SeoPanel';
import { GeoPanel } from '../components/GeoPanel';
import { PanelPreview } from '../components/PanelPreview';
import { AuditPanel, countAuditIssues } from '../components/AuditPanel';
import { PainelDashboard, mergePendingCtaClicks } from '../components/PainelDashboard';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/panel`;
const UPLOAD_URL = `https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/upload-image`;

/* ─── Image Upload Helper ─── */
async function uploadImageToStorage(file: File): Promise<{ url: string; path: string }> {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) throw new Error('Sessao expirada. Faca login novamente.');

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(UPLOAD_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'X-User-Token': token,
    },
    body: formData,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Erro no upload');
  return { url: json.url, path: json.path };
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
  /* Dashboard */
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 size={18} />,
    sections: [
      { id: 'dashboard-placeholder', title: 'Dashboard', fields: [] },
    ],
  },

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
        id: 'faq-section',
        title: 'Secao Principal',
        fields: [
          { key: 'faq.section.title', label: 'Titulo da secao (use \\n para quebra)', type: 'text' },
          { key: 'faq.section.desc', label: 'Descricao da secao', type: 'textarea', rows: 3 },
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
          { key: 'vidpage.hero.desc', label: 'Descricao abaixo do titulo', type: 'textarea', rows: 2 },
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
        id: 'footer-social',
        title: 'Redes Sociais',
        fields: [
          { key: 'footer.social.instagram', label: 'Instagram URL', type: 'url' },
          { key: 'footer.social.facebook', label: 'Facebook URL', type: 'url' },
          { key: 'footer.social.tiktok', label: 'TikTok URL', type: 'url' },
          { key: 'footer.social.linkedin', label: 'LinkedIn URL', type: 'url' },
          { key: 'footer.social.youtube', label: 'YouTube URL', type: 'url' },
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

  /* GEO — custom rendered via GeoPanel component */
  {
    id: 'geo',
    label: 'GEO',
    icon: <Cpu size={18} />,
    sections: [
      {
        id: 'geo-placeholder',
        title: 'Módulo GEO',
        fields: [],
      },
    ],
  },

  /* Audit — custom rendered via AuditPanel component */
  {
    id: 'audit',
    label: 'Auditoria de Campos',
    icon: <AlertTriangle size={18} />,
    sections: [
      {
        id: 'audit-placeholder',
        title: 'Auditoria',
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
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasImage = value && !value.startsWith('figma:asset/');

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(`Enviando ${file.name} (${(file.size / 1024).toFixed(0)}KB)...`);
    try {
      const { url } = await uploadImageToStorage(file);
      onChange(field.key, url);
      setUploadProgress('Upload concluido!');
      setEditing(false);
      setTimeout(() => setUploadProgress(''), 2000);
    } catch (err: any) {
      console.error('[Upload] Error:', err);
      setUploadProgress(`Erro: ${err.message}`);
      setTimeout(() => setUploadProgress(''), 4000);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [field.key, onChange]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    setUploadProgress(`Enviando ${file.name} (${(file.size / 1024).toFixed(0)}KB)...`);
    try {
      const { url } = await uploadImageToStorage(file);
      onChange(field.key, url);
      setUploadProgress('Upload concluido!');
      setEditing(false);
      setTimeout(() => setUploadProgress(''), 2000);
    } catch (err: any) {
      console.error('[Upload] Error:', err);
      setUploadProgress(`Erro: ${err.message}`);
      setTimeout(() => setUploadProgress(''), 4000);
    } finally {
      setUploading(false);
    }
  }, [field.key, onChange]);

  return (
    <div className="mb-[16px]">
      <div className="flex items-center gap-[8px] mb-[8px]">
        <FieldBadge type="image" />
        <span className="font-['Noto_Sans'] text-[12px] text-white/60">{field.label}</span>
      </div>
      <div
        className="relative group rounded-lg overflow-hidden bg-[#1a1715] border border-white/[0.08] hover:border-[#a57255]/30 transition-colors"
        onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
        onDrop={handleDrop}
      >
        {hasImage ? (
          <div className="relative">
            <img
              src={value}
              alt={field.label}
              className="w-full h-[160px] object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-[8px] opacity-0 group-hover:opacity-100">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-[6px] bg-[#a57255] text-white px-[12px] py-[6px] rounded-md text-[12px] font-medium hover:bg-[#8f6146] transition-colors disabled:opacity-50"
              >
                <Upload size={12} /> Upload
              </button>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-[6px] bg-white/90 text-[#161312] px-[12px] py-[6px] rounded-md text-[12px] font-medium hover:bg-white transition-colors"
              >
                <Pencil size={12} /> URL
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-[120px] flex flex-col items-center justify-center gap-[8px] text-white/20 hover:text-white/40 hover:bg-white/[0.02] transition-colors cursor-pointer">
            <ImageIcon size={28} strokeWidth={1.5} />
            <div className="flex items-center gap-[8px]">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-[4px] bg-[#a57255]/20 text-[#a57255] px-[10px] py-[4px] rounded text-[11px] font-medium hover:bg-[#a57255]/30 transition-colors disabled:opacity-50"
              >
                <Upload size={10} /> Upload
              </button>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-[4px] bg-white/5 text-white/40 px-[10px] py-[4px] rounded text-[11px] font-medium hover:bg-white/10 transition-colors"
              >
                <Link2 size={10} /> URL
              </button>
            </div>
            <span className="text-[10px] font-['Noto_Sans'] text-white/15">ou arraste uma imagem aqui</span>
          </div>
        )}

        {/* Upload progress / status */}
        {uploadProgress && (
          <div className={`px-[12px] py-[8px] text-[11px] font-['Noto_Sans'] border-t border-white/[0.06] ${
            uploadProgress.startsWith('Erro') ? 'text-red-400 bg-red-500/5' :
            uploadProgress.includes('concluido') ? 'text-emerald-400 bg-emerald-500/5' :
            'text-[#a57255] bg-[#a57255]/5'
          }`}>
            {uploading && (
              <span className="inline-block w-[12px] h-[12px] border-2 border-[#a57255]/30 border-t-[#a57255] rounded-full animate-spin mr-[6px] align-middle" />
            )}
            {uploadProgress}
          </div>
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

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
          className="hidden"
          onChange={handleFileSelect}
        />
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
    <div className="mb-[10px]">
      <div className="flex items-center gap-[8px] mb-[4px]">
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
  return (
    <div className="bg-[#1a1715] border border-white/[0.06] rounded-lg overflow-hidden hover:border-white/[0.1] transition-colors">
      {/* Card header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-[10px] px-[14px] py-[10px] hover:bg-white/[0.02] transition-colors"
      >
        {/* Mini image preview */}
        <div className="w-[36px] h-[36px] rounded-md overflow-hidden bg-[#161312] border border-white/[0.06] shrink-0">
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
          <ChevronRight size={12} className={`text-white/20 transition-transform ${collapsed ? '' : 'rotate-90'}`} />
        </div>
      </button>

      {/* Card content */}
      {!collapsed && (
        <div className="px-[14px] pb-[12px] border-t border-white/[0.04]">
          {/* Image field at top if present */}
          {group.imageField && (
            <div className="pt-[10px]">
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
  // Check if this section has images for a visual preview
  const imageFields = section.fields.filter(f => f.type === 'image');
  const firstImageVal = imageFields.map(f => data[f.key]).find(v => v && !v.startsWith('figma:asset/'));

  // Auto-group fields
  const grouped = useMemo(() => groupFieldsIntoCards(section.fields), [section.fields]);

  return (
    <div className="mb-[6px] rounded-lg overflow-hidden border border-white/[0.06] bg-[#1e1b19] hover:border-white/[0.1] transition-colors">
      {/* Section header with visual preview */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-[12px] px-[16px] py-[10px] hover:bg-white/[0.02] transition-colors text-left"
      >
        {/* Visual indicator */}
        <div className="relative w-[38px] h-[38px] rounded-lg overflow-hidden bg-[#161312] border border-white/[0.06] shrink-0">
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

        </div>

        <ChevronRight size={16} className={`text-white/20 transition-transform duration-200 shrink-0 ${open ? 'rotate-90' : ''}`} />
      </button>

      {/* Section content */}
      {open && (
        <div className="px-[20px] pb-[16px] border-t border-white/[0.04]">
          <div className="pt-[14px]">
            {(() => {
              // Separate items into groups and standalone fields
              const groups: FieldGroup[] = [];
              const standaloneImages: FieldConfig[] = [];
              const standaloneFields: FieldConfig[] = [];

              for (const item of grouped) {
                if (isGroup(item)) {
                  groups.push(item);
                } else if (item.type === 'image') {
                  standaloneImages.push(item);
                } else {
                  standaloneFields.push(item);
                }
              }

              const shortFields = standaloneFields.filter(f => f.type !== 'textarea' && f.type !== 'html');
              const longFields = standaloneFields.filter(f => f.type === 'textarea' || f.type === 'html');

              return (
                <>
                  {/* Short standalone fields in 2-col grid */}
                  {shortFields.length > 0 && (
                    <div className={shortFields.length > 1 ? 'grid grid-cols-2 gap-x-[16px]' : ''}>
                      {shortFields.map(field => (
                        <InlineField key={field.key} field={field} value={data[field.key] || ''} onChange={onChange} />
                      ))}
                    </div>
                  )}

                  {/* Long standalone fields full width */}
                  {longFields.map(field => (
                    <InlineField key={field.key} field={field} value={data[field.key] || ''} onChange={onChange} />
                  ))}

                  {/* Standalone images in grid */}
                  {standaloneImages.length > 0 && (
                    <div className={standaloneImages.length > 1 ? 'grid grid-cols-3 gap-[8px] mb-[12px]' : 'mb-[12px]'}>
                      {standaloneImages.map(field => (
                        <ImagePreview key={field.key} value={data[field.key] || ''} onChange={onChange} field={field} />
                      ))}
                    </div>
                  )}

                  {/* GroupCards in responsive grid */}
                  {groups.length > 0 && (
                    <div className={groups.length >= 2 ? 'grid grid-cols-2 gap-[10px]' : ''}>
                      {groups.map(g => (
                        <GroupCard key={`group-${g.groupLabel}-${g.groupNum}`} group={g} data={data} onChange={onChange} />
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
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
      data-section-id={section.id}
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
  const previousDataRef = useRef<Record<string, string>>({});

  const [activePage, setActivePage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'info' });
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set(['global', 'pages', 'tools']));
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewZoom, setPreviewZoom] = useState<number>(0); // 0 = auto-fit
  const [previewRotated, setPreviewRotated] = useState(false);
  const [previewBg, setPreviewBg] = useState<'dark' | 'light' | 'grid'>('dark');
  const baselineDataRef = useRef<Record<string, string>>({});

  // Section ordering per page — stored as panel data keys (e.g. "home.sectionOrder")
  // so the order is persisted to Supabase and read by public pages via usePanel.
  const getSectionOrderKey = useCallback((pageId: string) => `${pageId}.sectionOrder`, []);

  const getOrderedSections = useCallback((page: PageConfig): SectionConfig[] => {
    const orderJson = data[getSectionOrderKey(page.id)];
    let order: string[] | null = null;
    if (orderJson) {
      try { order = JSON.parse(orderJson); } catch { order = null; }
    }
    if (!order || !Array.isArray(order)) return page.sections;
    const sectionMap = new Map(page.sections.map(s => [s.id, s]));
    const ordered: SectionConfig[] = [];
    for (const id of order) {
      const s = sectionMap.get(id);
      if (s) { ordered.push(s); sectionMap.delete(id); }
    }
    // Append any new sections not in saved order
    sectionMap.forEach(s => ordered.push(s));
    return ordered;
  }, [data, getSectionOrderKey]);

  const contentRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
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

  const fetchBackendData = useCallback(async (retries = 3) => {
    setIsLoading(true);
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
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
          // Merge pending CTA clicks from localStorage
          const ctaUpdates = mergePendingCtaClicks(merged);
          if (ctaUpdates) Object.assign(merged, ctaUpdates);
          baselineDataRef.current = { ...merged };
          previousDataRef.current = { ...merged };
          setData(merged);
          updatePanelDataCache(merged);
          setIsLoading(false);
          return;
        }
        console.warn(`[Painel] Fetch attempt ${attempt}/${retries} — status ${res.status}`);
      } catch (e) {
        console.warn(`[Painel] Fetch attempt ${attempt}/${retries} failed:`, e);
      }
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt - 1)));
      }
    }
    console.error('[Painel] Todas as tentativas falharam. Usando defaults locais.');
    const fallback = { ...panelDefaults };
    baselineDataRef.current = { ...fallback };
    setData(fallback);
    updatePanelDataCache(fallback);
    setIsLoading(false);
  }, []);

  // Load data on mount (GET /panel is public) and again when session arrives
  useEffect(() => {
    fetchBackendData();
  }, [fetchBackendData]);

  useEffect(() => {
    if (session) {
      fetchBackendData();
    }
  }, [session, fetchBackendData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Validate allowed email on the frontend
    const ALLOWED_EMAILS = ['sa@somo.com'];
    if (!ALLOWED_EMAILS.includes(email.toLowerCase().trim())) {
      setAuthError('Acesso não autorizado. Este email não tem permissão.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        try {
          const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
            body: JSON.stringify({ email: email.trim(), password })
          });
          if (res.ok) {
            const { error: signInErr } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
            if (signInErr) setAuthError('Email ou senha incorretos.');
          } else {
            const errBody = await res.json().catch(() => ({}));
            setAuthError(errBody.error || 'Acesso não autorizado.');
          }
        } catch {
          setAuthError('Erro no servidor. Tente novamente.');
        }
      } else {
        setAuthError('Email ou senha incorretos.');
      }
    }
  };

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2600);
  }, []);

  const handleFieldChange = useCallback((key: string, value: string) => {
    setData(prev => {
      const next = { ...prev, [key]: value };
      // Atualiza cache global — componentes renderizados inline re-renderizam automaticamente
      updatePanelDataCache(next);
      return next;
    });
  }, []);

  const moveSectionForPage = useCallback((pageId: string, sections: SectionConfig[], dragIndex: number, hoverIndex: number) => {
    const ids = sections.map(s => s.id);
    const [moved] = ids.splice(dragIndex, 1);
    ids.splice(hoverIndex, 0, moved);
    const key = getSectionOrderKey(pageId);
    handleFieldChange(key, JSON.stringify(ids));
  }, [getSectionOrderKey, handleFieldChange]);

  // Helper: get access token — uses current session, only refreshes if close to expiry
  const getToken = useCallback(async (): Promise<string | null> => {
    try {
      const { data: { session: current } } = await supabase.auth.getSession();
      if (current?.access_token) {
        const expiresAt = current.expires_at ?? 0;
        const now = Math.floor(Date.now() / 1000);
        // Token still valid for > 60s — use it directly
        if (expiresAt - now > 60) {
          return current.access_token;
        }
        // Token expiring soon — try to refresh
        console.log('[Auth] Token expiring soon, refreshing...');
        const { data: { session: refreshed } } = await supabase.auth.refreshSession();
        if (refreshed?.access_token) {
          return refreshed.access_token;
        }
        // Refresh failed but token might still work — use it anyway
        if (expiresAt - now > 0) {
          console.log('[Auth] Refresh failed but token not yet expired, using current token');
          return current.access_token;
        }
      }
      console.error('[Auth] No valid session available.');
      return null;
    } catch (e: any) {
      console.error('[Auth] getToken error:', e.message);
      return null;
    }
  }, []);

  // Helper: perform an authenticated fetch — sends anonKey in Authorization + user token in X-User-Token
  const authFetch = useCallback(async (url: string, options: RequestInit): Promise<Response> => {
    const token = await getToken();
    if (!token) throw new Error('NO_SESSION');
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
      'Authorization': `Bearer ${publicAnonKey}`,
      'X-User-Token': token,
    };
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      console.log('[Auth] 401 received, refreshing and retrying...');
      const { data: { session: refreshed } } = await supabase.auth.refreshSession();
      if (refreshed?.access_token) {
        return fetch(url, {
          ...options,
          headers: { ...headers, 'X-User-Token': refreshed.access_token },
        });
      }
    }
    return res;
  }, [getToken]);

  const handleSave = useCallback(async () => {
    if (!session) return;
    setIsSaving(true);
    try {
      // Record SEO history before saving
      saveSeoHistoryEntry(
        previousDataRef.current,
        data,
        `Salvo em ${new Date().toLocaleDateString('pt-BR')}`
      );
      previousDataRef.current = { ...data };
      const res = await authFetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      if (res.ok) {
        showToast('Alteracoes salvas com sucesso!');
        baselineDataRef.current = { ...data };
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
          showToast('Sessao expirada. Faca login novamente.', 'info');
        } else {
          showToast(`Erro ao salvar: ${errMsg}`, 'info');
        }
      }
    } catch (e: any) {
      if (e.message === 'NO_SESSION') {
        showToast('Sessao expirada. Faca login novamente.', 'info');
      } else {
        console.error('[Painel] Save network error:', e);
        showToast(e.message || 'Erro ao salvar', 'info');
      }
    } finally {
      setIsSaving(false);
    }
  }, [data, showToast, session, authFetch]);

  const handleReset = useCallback(async () => {
    if (confirm('Descartar alteracoes nao salvas e voltar ao ultimo estado salvo?')) {
      if (!session) return;
      setIsSaving(true);
      try {
        // Reload from server to get last saved state
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
          baselineDataRef.current = { ...merged };
          previousDataRef.current = { ...merged };
          setData(merged);
          updatePanelDataCache(merged);
          showToast('Restaurado ao ultimo estado salvo', 'info');
        }
      } catch(e) {
        console.error(e);
      } finally {
        setIsSaving(false);
      }
    }
  }, [showToast, session]);

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

      const SEED_URL = `https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/panel/seed`;
      const res = await authFetch(SEED_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
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
          showToast('Sessão expirada. Faça login novamente.', 'info');
        } else {
          showToast(`Erro ao sincronizar: ${errMsg}`, 'info');
        }
      }
    } catch (e: any) {
      if (e.message === 'NO_SESSION') {
        showToast('Sessão expirada. Faça login novamente.', 'info');
      } else {
        console.error('[Painel] Seed network error:', e);
        showToast(`Erro de rede: ${e.message || 'falha na conexão'}`, 'info');
      }
    } finally {
      setIsSaving(false);
    }
  }, [session, showToast, authFetch]);

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
            try {
              await authFetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: imported }),
              });
            } catch (saveErr) {
              console.error('[Painel] Import save error:', saveErr);
            }
          }
          showToast('Backup importado com sucesso!');
        } catch { showToast('Arquivo invalido', 'info'); }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [showToast, session, authFetch]);

  // ─── Migrate all images to Supabase Storage in batch ───
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrateProgress, setMigrateProgress] = useState('');

  const handleMigrateImages = useCallback(async () => {
    if (!session) { showToast('Faca login primeiro', 'info'); return; }
    if (!confirm('Isso vai baixar todas as imagens do Figma e fazer upload para o Supabase Storage.\nAs URLs permanentes serao salvas automaticamente no painel.\n\nDeseja continuar?')) return;

    setIsMigrating(true);
    setMigrateProgress('Coletando campos de imagem...');

    try {
      // 1. Collect all image-type field keys from ALL pages
      const imageKeys: string[] = [];
      for (const page of PAGES) {
        for (const section of page.sections) {
          for (const field of section.fields) {
            if (field.type === 'image') imageKeys.push(field.key);
          }
        }
      }

      // 2. For each key, check if it needs migration
      const toMigrate: { key: string; url: string }[] = [];
      for (const key of imageKeys) {
        const currentVal = data[key] || '';
        const defaultVal = panelDefaults[key] || '';

        // Already has a permanent URL → skip
        if (currentVal && !currentVal.startsWith('figma:asset/') && currentVal.startsWith('http')) continue;

        // Default has resolved URL (figma:asset imports resolve to https:// at build time)
        if (defaultVal && !defaultVal.startsWith('figma:asset/') && defaultVal.startsWith('http')) {
          toMigrate.push({ key, url: defaultVal });
        }
      }

      if (toMigrate.length === 0) {
        setMigrateProgress('');
        showToast('Nenhuma imagem para migrar — todas ja estao no Supabase ou definidas manualmente!');
        setIsMigrating(false);
        return;
      }

      setMigrateProgress(`0 / ${toMigrate.length} imagens migradas...`);
      let migrated = 0;
      let errors = 0;
      const updatedData = { ...data };

      // 3. Process in batches of 3
      const BATCH = 3;
      for (let i = 0; i < toMigrate.length; i += BATCH) {
        const batch = toMigrate.slice(i, i + BATCH);
        const results = await Promise.allSettled(
          batch.map(async ({ key, url }) => {
            const imgRes = await fetch(url);
            if (!imgRes.ok) throw new Error(`HTTP ${imgRes.status}`);
            const blob = await imgRes.blob();
            const ext = url.split('.').pop()?.split('?')[0] || 'png';
            const sanitizedKey = key.replace(/\./g, '-');
            const file = new File([blob], `${sanitizedKey}.${ext}`, { type: blob.type || 'image/png' });
            const { url: signedUrl } = await uploadImageToStorage(file);
            return { key, signedUrl };
          })
        );

        for (const r of results) {
          if (r.status === 'fulfilled') {
            updatedData[r.value.key] = r.value.signedUrl;
            migrated++;
          } else {
            errors++;
            console.error('[Migrate] batch error:', r.reason);
          }
        }
        setMigrateProgress(`${migrated} / ${toMigrate.length} imagens migradas...${errors > 0 ? ` (${errors} erros)` : ''}`);
      }

      // 4. Save to panel + Supabase
      setData(updatedData);
      updatePanelDataCache(updatedData);
      try {
        await authFetch(API_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: updatedData }),
        });
        baselineDataRef.current = { ...updatedData };
      } catch (saveErr) {
        console.error('[Migrate] Save error:', saveErr);
      }

      setMigrateProgress('');
      showToast(`Migracao concluida! ${migrated} imagens salvas no Supabase.${errors > 0 ? ` ${errors} erros.` : ''}`);
    } catch (err: any) {
      console.error('[Migrate] Error:', err);
      setMigrateProgress('');
      showToast(`Erro na migracao: ${err.message}`, 'info');
    } finally {
      setIsMigrating(false);
    }
  }, [session, data, showToast, authFetch]);

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
  const searchLower = searchTerm.trim().toLowerCase();
  const filteredPages = searchLower
    ? PAGES.filter(p =>
        p.label.toLowerCase().includes(searchLower) ||
        p.sections.some(s =>
          s.title.toLowerCase().includes(searchLower) ||
          s.fields.some(f =>
            f.label.toLowerCase().includes(searchLower) ||
            f.key.toLowerCase().includes(searchLower) ||
            (data[f.key] && data[f.key].toLowerCase().includes(searchLower) && !data[f.key].startsWith('figma:asset/')) ||
            (panelDefaults[f.key] && panelDefaults[f.key].toLowerCase().includes(searchLower) && !panelDefaults[f.key].startsWith('figma:asset/'))
          )
        )
      )
    : PAGES;

  // Advanced search: pages, sections, fields, data values, defaults, placeholders, keys
  const [searchActiveIdx, setSearchActiveIdx] = useState(-1);
  const searchListRef = useRef<HTMLDivElement>(null);

  type SearchMatchType = 'page' | 'section' | 'field' | 'value' | 'default' | 'placeholder' | 'key';
  interface SearchResult {
    pageId: string; pageLabel: string; sectionId: string; sectionTitle: string;
    fieldLabel?: string; fieldKey?: string; matchType: SearchMatchType; matchSnippet?: string; uid: string;
  }

  const searchResults: SearchResult[] = useMemo(() => {
    if (!searchLower || searchLower.length < 2) return [];
    const results: SearchResult[] = [];
    const seen = new Set<string>();
    const MAX = 30;

    const add = (r: Omit<SearchResult, 'uid'>) => {
      if (results.length >= MAX) return;
      const uid = `${r.pageId}::${r.sectionId}::${r.fieldKey || ''}::${r.matchType}`;
      if (seen.has(uid)) return;
      seen.add(uid);
      results.push({ ...r, uid });
    };

    const snippet = (val: string, term: string): string => {
      const idx = val.toLowerCase().indexOf(term);
      if (idx < 0) return val.slice(0, 60);
      const s = Math.max(0, idx - 25), e = Math.min(val.length, idx + term.length + 25);
      return (s > 0 ? '…' : '') + val.slice(s, e) + (e < val.length ? '…' : '');
    };

    for (const page of PAGES) {
      if (results.length >= MAX) break;
      if (page.label.toLowerCase().includes(searchLower)) {
        add({ pageId: page.id, pageLabel: page.label, sectionId: page.sections[0]?.id || '', sectionTitle: '', matchType: 'page' });
      }
      for (const section of page.sections) {
        if (results.length >= MAX) break;
        if (section.title.toLowerCase().includes(searchLower)) {
          add({ pageId: page.id, pageLabel: page.label, sectionId: section.id, sectionTitle: section.title, matchType: 'section' });
        }
        for (const field of section.fields) {
          if (results.length >= MAX) break;
          if (field.label.toLowerCase().includes(searchLower)) {
            add({ pageId: page.id, pageLabel: page.label, sectionId: section.id, sectionTitle: section.title, fieldLabel: field.label, fieldKey: field.key, matchType: 'field' });
          }
          if (field.key.toLowerCase().includes(searchLower)) {
            add({ pageId: page.id, pageLabel: page.label, sectionId: section.id, sectionTitle: section.title, fieldLabel: field.label, fieldKey: field.key, matchType: 'key', matchSnippet: field.key });
          }
          const val = data[field.key];
          if (val && val.toLowerCase().includes(searchLower) && !val.startsWith('figma:asset/')) {
            add({ pageId: page.id, pageLabel: page.label, sectionId: section.id, sectionTitle: section.title, fieldLabel: field.label, fieldKey: field.key, matchType: 'value', matchSnippet: snippet(val, searchLower) });
          }
          const defVal = panelDefaults[field.key];
          if (defVal && defVal !== val && defVal.toLowerCase().includes(searchLower) && !defVal.startsWith('figma:asset/')) {
            add({ pageId: page.id, pageLabel: page.label, sectionId: section.id, sectionTitle: section.title, fieldLabel: field.label, fieldKey: field.key, matchType: 'default', matchSnippet: snippet(defVal, searchLower) });
          }
          if (field.placeholder && field.placeholder.toLowerCase().includes(searchLower)) {
            add({ pageId: page.id, pageLabel: page.label, sectionId: section.id, sectionTitle: section.title, fieldLabel: field.label, fieldKey: field.key, matchType: 'placeholder', matchSnippet: field.placeholder });
          }
        }
      }
    }

    const order: Record<string, number> = { page: 0, section: 1, field: 2, key: 3, value: 4, default: 5, placeholder: 6 };
    results.sort((a, b) => (order[a.matchType] ?? 9) - (order[b.matchType] ?? 9));
    return results;
  }, [searchLower, data]);

  // Reset keyboard index when results change
  useEffect(() => { setSearchActiveIdx(-1); }, [searchLower]);

  // Navigate to search result: go to page, expand section, scroll & highlight
  const navigateToResult = useCallback((result: SearchResult) => {
    setActivePage(result.pageId);
    setSearchTerm('');
    setSearchFocused(false);
    setSearchActiveIdx(-1);

    const attemptScroll = (retries: number) => {
      const sectionEl = document.querySelector(`[data-section-id="${result.sectionId}"]`);
      if (!sectionEl) {
        if (retries > 0) setTimeout(() => attemptScroll(retries - 1), 80);
        return;
      }
      // Expand section if collapsed
      const chevron = sectionEl.querySelector('svg.shrink-0');
      const isOpen = chevron?.classList.contains('rotate-90');
      if (!isOpen) {
        const headerBtn = sectionEl.querySelector('button');
        if (headerBtn) headerBtn.click();
      }
      setTimeout(() => {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const el = sectionEl as HTMLElement;
        el.style.transition = 'box-shadow 0.3s ease, outline 0.3s ease';
        el.style.outline = '2px solid rgba(165, 114, 85, 0.5)';
        el.style.boxShadow = '0 0 20px rgba(165, 114, 85, 0.15)';
        el.style.borderRadius = '8px';
        setTimeout(() => { el.style.outline = 'none'; el.style.boxShadow = 'none'; }, 2500);
      }, 60);
    };

    setTimeout(() => attemptScroll(5), 120);
  }, []);

  // Keyboard handler for search
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!searchResults.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSearchActiveIdx(i => Math.min(i + 1, searchResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSearchActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && searchActiveIdx >= 0) {
      e.preventDefault();
      navigateToResult(searchResults[searchActiveIdx]);
    } else if (e.key === 'Escape') {
      setSearchTerm('');
      setSearchFocused(false);
    }
  }, [searchResults, searchActiveIdx, navigateToResult]);

  // Keep active item in view inside dropdown
  useEffect(() => {
    if (searchActiveIdx < 0 || !searchListRef.current) return;
    const activeResult = searchResults[searchActiveIdx];
    if (!activeResult) return;
    const btn = searchListRef.current.querySelector(`[data-search-uid="${activeResult.uid}"]`) as HTMLElement;
    if (btn) btn.scrollIntoView({ block: 'nearest' });
  }, [searchActiveIdx, searchResults]);

  // Group pages
  const globalIds = new Set(['geral', 'footer', 'navbar']);
  const toolIds = new Set(['seo', 'geo', 'audit', 'dashboard']);
  const mainPages = filteredPages.filter(p => !p.id.startsWith('lp-') && !globalIds.has(p.id) && !toolIds.has(p.id));
  const lpPages = filteredPages.filter(p => p.id.startsWith('lp-'));
  const globalPages = filteredPages.filter(p => globalIds.has(p.id));
  const toolPages = filteredPages.filter(p => toolIds.has(p.id));

  // Audit issue count for badge
  const auditBadgeCount = useMemo(() => {
    const allPanelKeys = PAGES.flatMap(page => page.sections.flatMap(sec => sec.fields.map(f => f.key)));
    return countAuditIssues(allPanelKeys, data);
  }, [data]);

  const toolBadges = useMemo(() => ({
    audit: auditBadgeCount,
  }), [auditBadgeCount]);

  // Determine if current page has a live preview (any page with a route)
  const pageHasPreview = useMemo(() => {
    if (!activePage) return false;
    return !!currentPage?.route;
  }, [activePage, currentPage]);

  // Auto-close preview when navigating to a page without preview
  useEffect(() => {
    if (showPreview && !pageHasPreview) {
      setShowPreview(false);
    }
  }, [activePage, pageHasPreview]);

  // Scroll to top on page change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Track preview container size for desktop 16:9 viewport scaling
  useEffect(() => {
    const el = previewContainerRef.current;
    if (!el) return;
    // Immediate measurement fallback
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setPreviewContainerSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
    }
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setPreviewContainerSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [showPreview]);

  // Sync panel data to usePanelContent cache when data is first loaded
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
          <div className="relative" ref={searchRef}>
            <Search size={13} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-white/25 z-[1]" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Buscar paginas, secoes, textos..."
              className="w-full bg-[#0e0d0c] border border-white/[0.06] h-[32px] pl-[30px] pr-[28px] text-[12px] text-white font-['Noto_Sans'] rounded-md focus:border-[#a57255]/30 focus:outline-none placeholder:text-white/15"
            />
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); setSearchFocused(false); }}
                className="absolute right-[8px] top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors z-[1]"
              >
                <span className="text-[14px] leading-none">×</span>
              </button>
            )}

            {/* Search results dropdown */}
            {searchFocused && searchLower.length >= 2 && (
              <div
                ref={searchListRef}
                className="absolute top-full left-0 mt-[4px] z-50 bg-[#1a1816] border border-white/[0.1] rounded-xl shadow-2xl max-h-[380px] overflow-y-auto painel-scrollbar"
                style={{ width: 'max(100%, 320px)', right: 0 }}
              >
                {searchResults.length === 0 ? (
                  <div className="px-[16px] py-[20px] text-center">
                    <Search size={20} className="text-white/10 mx-auto mb-[8px]" />
                    <p className="font-['Noto_Sans'] text-[12px] text-white/25">Nenhum resultado para "{searchTerm}"</p>
                    <p className="font-['Noto_Sans'] text-[10px] text-white/15 mt-[4px]">Tente buscar por nomes de paginas, secoes ou textos do site</p>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="px-[12px] pt-[8px] pb-[4px] flex items-center justify-between">
                      <span className="font-['Noto_Sans'] text-[9px] tracking-[0.5px] text-white/20 uppercase">
                        {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                      </span>
                      <span className="font-['Noto_Sans'] text-[9px] text-white/10">↑↓ navegar · Enter selecionar</span>
                    </div>

                    {/* Results grouped by page */}
                    {(() => {
                      const grouped: Record<string, SearchResult[]> = {};
                      for (const r of searchResults) {
                        if (!grouped[r.pageId]) grouped[r.pageId] = [];
                        grouped[r.pageId].push(r);
                      }

                      const matchTypeLabel: Record<string, string> = {
                        page: 'Pagina', section: 'Secao', field: 'Campo',
                        key: 'Chave', value: 'Conteudo', default: 'Default', placeholder: 'Placeholder',
                      };
                      const matchTypeColor: Record<string, string> = {
                        page: 'text-[#a57255]', section: 'text-blue-400/60', field: 'text-white/40',
                        key: 'text-purple-400/50', value: 'text-emerald-400/60', default: 'text-amber-400/50', placeholder: 'text-white/20',
                      };

                      return Object.entries(grouped).map(([pageId, items]) => (
                        <div key={pageId}>
                          {/* Page group header */}
                          <div className="px-[12px] pt-[6px] pb-[2px] flex items-center gap-[6px] border-t border-white/[0.04] first:border-t-0">
                            <span className="font-['Noto_Sans'] text-[9px] font-semibold text-[#a57255]/60 uppercase tracking-[0.4px]">
                              {items[0].pageLabel}
                            </span>
                          </div>

                          {items.map((result) => {
                            const thisIdx = searchResults.indexOf(result);
                            const isActive = searchActiveIdx === thisIdx;

                            // Highlight matching text
                            const highlightMatch = (text: string) => {
                              const idx = text.toLowerCase().indexOf(searchLower);
                              if (idx < 0) return <>{text}</>;
                              return (
                                <>
                                  {text.slice(0, idx)}
                                  <span className="text-[#a57255] font-semibold">{text.slice(idx, idx + searchLower.length)}</span>
                                  {text.slice(idx + searchLower.length)}
                                </>
                              );
                            };

                            return (
                              <button
                                key={result.uid}
                                data-search-uid={result.uid}
                                onMouseDown={(e) => { e.preventDefault(); navigateToResult(result); }}
                                onMouseEnter={() => setSearchActiveIdx(thisIdx)}
                                className={`w-full flex items-start gap-[8px] px-[12px] py-[6px] text-left transition-colors ${
                                  isActive ? 'bg-[#a57255]/10' : 'hover:bg-white/[0.02]'
                                }`}
                              >
                                {/* Type icon */}
                                <div className="shrink-0 mt-[3px]">
                                  {result.matchType === 'page' && <FileText size={11} className="text-[#a57255]/50" />}
                                  {result.matchType === 'section' && <Layout size={11} className="text-blue-400/40" />}
                                  {result.matchType === 'field' && <Type size={11} className="text-white/25" />}
                                  {result.matchType === 'key' && <Hash size={11} className="text-purple-400/40" />}
                                  {result.matchType === 'value' && <AlignLeft size={11} className="text-emerald-400/40" />}
                                  {result.matchType === 'default' && <Pencil size={11} className="text-amber-400/40" />}
                                  {result.matchType === 'placeholder' && <Type size={11} className="text-white/15" />}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  {/* Breadcrumb */}
                                  {result.sectionTitle && (
                                    <div className="flex items-center gap-[3px] mb-[1px]">
                                      <span className="font-['Noto_Sans'] text-[9px] text-white/25 truncate">
                                        {highlightMatch(result.sectionTitle)}
                                      </span>
                                      {result.fieldLabel && (
                                        <>
                                          <ChevronRight size={7} className="text-white/10 shrink-0" />
                                          <span className="font-['Noto_Sans'] text-[9px] text-white/25 truncate">
                                            {highlightMatch(result.fieldLabel)}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  )}

                                  {/* Match type = page: show page name */}
                                  {result.matchType === 'page' && !result.sectionTitle && (
                                    <span className="font-['Noto_Sans'] text-[11px] text-white/70 block truncate">
                                      {highlightMatch(result.pageLabel)}
                                    </span>
                                  )}

                                  {/* Snippet / matched value */}
                                  {result.matchSnippet && (
                                    <span className="font-['Noto_Sans'] text-[10px] text-white/30 italic block truncate leading-[16px]">
                                      "{highlightMatch(result.matchSnippet)}"
                                    </span>
                                  )}
                                </div>

                                {/* Badge */}
                                <span className={`font-['Noto_Sans'] text-[8px] shrink-0 mt-[3px] px-[4px] py-[1px] rounded-sm bg-white/[0.03] ${matchTypeColor[result.matchType] || 'text-white/10'}`}>
                                  {matchTypeLabel[result.matchType] || result.matchType}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ));
                    })()}
                  </>
                )}
              </div>
            )}
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
            expanded={expandedGroups.has('global')}
            onToggle={() => setExpandedGroups(prev => { const next = new Set(prev); next.has('global') ? next.delete('global') : next.add('global'); return next; })}
          />

          {/* Pages */}
          <NavGroup
            label="Paginas"
            items={mainPages}
            active={activePage}
            onSelect={setActivePage}
            expanded={expandedGroups.has('pages')}
            onToggle={() => setExpandedGroups(prev => { const next = new Set(prev); next.has('pages') ? next.delete('pages') : next.add('pages'); return next; })}
          />

          {/* Serviços */}
          <NavGroup
            label="Servicos"
            items={lpPages}
            active={activePage}
            onSelect={setActivePage}
            expanded={expandedGroups.has('lps')}
            onToggle={() => setExpandedGroups(prev => { const next = new Set(prev); next.has('lps') ? next.delete('lps') : next.add('lps'); return next; })}
          />

          {/* Ferramentas (SEO, GEO, Auditoria) */}
          <NavGroup
            label="Ferramentas"
            items={toolPages}
            active={activePage}
            onSelect={setActivePage}
            expanded={expandedGroups.has('tools')}
            onToggle={() => setExpandedGroups(prev => { const next = new Set(prev); next.has('tools') ? next.delete('tools') : next.add('tools'); return next; })}
            badges={toolBadges}
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
          <button
            onClick={handleMigrateImages}
            disabled={isMigrating || isSaving}
            className={`w-full flex items-center gap-[8px] px-[10px] py-[7px] text-[12px] transition-colors font-['Noto_Sans'] rounded-md ${
              isMigrating ? 'text-emerald-400/50 cursor-wait' : 'text-emerald-500/60 hover:text-emerald-400 hover:bg-emerald-500/5'
            } disabled:opacity-40`}
          >
            <ImageDown size={13} className={isMigrating ? 'animate-pulse' : ''} />
            {isMigrating ? migrateProgress || 'Migrando...' : 'Migrar Imagens → Supabase'}
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
            {/* Preview toggle — only visible when page has a preview component */}
            {pageHasPreview && (
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
            )}

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
              title="Descartar alteracoes e voltar ao ultimo estado salvo"
            >
              <RotateCcw size={13} />
              Descartar
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
            <div className={`max-w-full ${showPreview ? 'px-[16px]' : 'px-[24px]'} mx-auto py-[20px] transition-all`}>

              {/* Page header card */}
              {currentPage && (
                <div className="mb-[16px] rounded-xl overflow-hidden">
                  {/* Visual page header with gradient */}
                  <div className="bg-gradient-to-br from-[#a57255]/15 via-[#1e1b19] to-[#1e1b19] border border-white/[0.08] rounded-xl px-[20px] py-[14px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-[10px] mb-[6px]">
                          <span className="text-[#a57255]">{currentPage.icon}</span>
                          <h2 className="font-['Marcellus'] text-[20px] text-white tracking-[-0.4px]">
                            {currentPage.label}
                          </h2>
                        </div>
                        <div className="flex items-center gap-[12px] text-white/30 font-['Noto_Sans'] text-[12px]">
                          {activePage === 'dashboard' ? (
                            <span>Visao geral — Completude, SEO, Imagens, CTAs</span>
                          ) : activePage === 'seo' ? (
                            <span>5 abas — Dashboard, Meta Tags, Analise, Checklist, Schema.org</span>
                          ) : activePage === 'geo' ? (
                            <span>4 abas — Configuração, Monitorar, Otimizar, Checklist</span>
                          ) : activePage === 'audit' ? (
                            <span>Painel ↔ Componentes — Orfaos, Sem Editor, Dados Mortos, Assets Pendentes</span>
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
                        {data[getSectionOrderKey(currentPage.id)] && (
                          <button
                            onClick={() => {
                              handleFieldChange(getSectionOrderKey(currentPage.id), '');
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

              {/* Sections — drag-and-drop reordering or custom panels */}
              {currentPage && activePage === 'dashboard' ? (
                <PainelDashboard data={data} onNavigate={setActivePage} />
              ) : currentPage && activePage === 'seo' ? (
                <SeoPanel data={data} onChange={handleFieldChange} />
              ) : currentPage && activePage === 'geo' ? (
                <GeoPanel data={data} onChange={handleFieldChange} getToken={getToken} />
              ) : currentPage && activePage === 'audit' ? (
                <AuditPanel
                  panelKeys={PAGES.flatMap(page => page.sections.flatMap(sec => sec.fields.map(f => f.key)))}
                  data={data}
                  onNavigate={setActivePage}
                />
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
              <div className="h-[40px]" />
            </div>
          </div>

          {/* Preview panel — iframe-based live preview */}
          {showPreview && (() => {
            /* ── Device dimensions ── */
            const DEVICE_SPECS = {
              desktop: { w: 1920, h: 1080, label: '1920 × 1080' },
              tablet:  { w: 768,  h: 1024, label: '768 × 1024'  },
              mobile:  { w: 375,  h: 812,  label: '375 × 812'   },
            } as const;
            const spec = DEVICE_SPECS[previewDevice];
            const deviceW = previewRotated && previewDevice !== 'desktop' ? spec.h : spec.w;
            const deviceH = previewRotated && previewDevice !== 'desktop' ? spec.w : spec.h;
            const dimLabel = previewRotated && previewDevice !== 'desktop'
              ? `${spec.h} × ${spec.w}` : spec.label;

            /* Zoom helpers */
            const ZOOM_PRESETS = [50, 75, 100, 125, 150];
            const effectiveZoom = previewZoom || 0; // 0 = auto-fit

            /* Background class */
            const bgClass = previewBg === 'light' ? 'bg-[#e5e5e5]'
              : previewBg === 'grid' ? 'bg-[#1a1917]'
              : 'bg-[#0e0d0c]';
            const bgGridStyle = previewBg === 'grid' ? {
              backgroundImage: 'linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(-45deg, #222 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #222 75%), linear-gradient(-45deg, transparent 75%, #222 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            } : undefined;

            const btnCls = (active: boolean) =>
              `p-[3px] rounded transition-colors cursor-pointer ${active ? 'text-[#a57255]' : 'text-white/20 hover:text-white/40'}`;

            const rawRoute = currentPage?.route
              ? (currentPage.route.startsWith('/') ? currentPage.route : `/${currentPage.route}`)
              : null;

            return (
            <div className="w-[50%] border-l border-white/[0.06] flex flex-col bg-[#0a0908] min-h-0">
              {/* Preview top bar — browser-like */}
              <div className="shrink-0 bg-[#151311] border-b border-white/[0.06]">
                {/* Row 1: Controls */}
                <div className="h-[38px] flex items-center justify-between px-[12px]">
                  <div className="flex items-center gap-[6px]">
                    {/* Traffic lights */}
                    <div className="flex items-center gap-[5px] mr-[2px]">
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
                    {([
                      { id: 'desktop' as const, icon: <Monitor size={13} />, tip: 'Desktop (1920px)' },
                      { id: 'tablet'  as const, icon: <Tablet size={13} />,  tip: 'Tablet (768px)' },
                      { id: 'mobile'  as const, icon: <Smartphone size={13} />, tip: 'Mobile (375px)' },
                    ]).map(d => (
                      <button
                        key={d.id}
                        onClick={() => { setPreviewDevice(d.id); setPreviewZoom(0); setPreviewRotated(false); }}
                        className={btnCls(previewDevice === d.id)}
                        title={d.tip}
                      >
                        {d.icon}
                      </button>
                    ))}

                    {/* Rotate — tablet & mobile only */}
                    {previewDevice !== 'desktop' && (
                      <>
                        <div className="h-[16px] w-px bg-white/[0.06] mx-[2px]" />
                        <button
                          onClick={() => setPreviewRotated(r => !r)}
                          className={btnCls(previewRotated)}
                          title={previewRotated ? 'Landscape → Portrait' : 'Portrait → Landscape'}
                        >
                          <RotateCw size={12} />
                        </button>
                      </>
                    )}

                    <div className="h-[16px] w-px bg-white/[0.06] mx-[2px]" />

                    {/* Zoom controls */}
                    <button
                      onClick={() => setPreviewZoom(z => Math.max(25, (z || 100) - 25))}
                      className="p-[3px] text-white/20 hover:text-white/40 transition-colors cursor-pointer"
                      title="Zoom out"
                    >
                      <Minus size={11} />
                    </button>

                    <button
                      onClick={() => setPreviewZoom(0)}
                      className={`font-['Noto_Sans'] text-[10px] tabular-nums px-[6px] py-[1px] rounded transition-colors cursor-pointer ${effectiveZoom === 0 ? 'text-[#a57255] bg-[#a57255]/10' : 'text-white/30 hover:text-white/50 bg-white/[0.03]'}`}
                      title="Responsivo (ajustar ao container)"
                    >
                      {effectiveZoom === 0 ? 'Fit' : `${effectiveZoom}%`}
                    </button>

                    <button
                      onClick={() => setPreviewZoom(z => Math.min(200, (z || 100) + 25))}
                      className="p-[3px] text-white/20 hover:text-white/40 transition-colors cursor-pointer"
                      title="Zoom in"
                    >
                      <Plus size={11} />
                    </button>

                    {/* Quick zoom presets */}
                    {ZOOM_PRESETS.map(z => (
                      <button
                        key={z}
                        onClick={() => setPreviewZoom(z === 100 && effectiveZoom === 100 ? 0 : z)}
                        className={`font-['Noto_Sans'] text-[9px] tabular-nums px-[4px] py-[1px] rounded transition-colors cursor-pointer ${effectiveZoom === z ? 'text-[#a57255]' : 'text-white/15 hover:text-white/30'}`}
                        title={`${z}%`}
                      >
                        {z}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-[4px]">
                    {/* Scroll to top */}
                    <button
                      onClick={() => {
                        const scrollEl = previewContainerRef.current?.querySelector('.preview-scroll-container');
                        if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-[3px] text-white/20 hover:text-white/40 transition-colors cursor-pointer"
                      title="Scroll ao topo"
                    >
                      <ArrowUp size={12} />
                    </button>

                    {/* Background toggle */}
                    <button
                      onClick={() => setPreviewBg(b => b === 'dark' ? 'light' : b === 'light' ? 'grid' : 'dark')}
                      className="p-[3px] text-white/20 hover:text-white/40 transition-colors cursor-pointer"
                      title={`Fundo: ${previewBg === 'dark' ? 'escuro' : previewBg === 'light' ? 'claro' : 'grid'}`}
                    >
                      {previewBg === 'dark' ? <Moon size={11} /> : previewBg === 'light' ? <Sun size={11} /> : <Grid3X3 size={11} />}
                    </button>

                    <div className="h-[16px] w-px bg-white/[0.06]" />

                    {/* Open in new tab */}
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

                {/* Row 2: URL bar + dimensions */}
                <div className="px-[12px] pb-[8px]">
                  <div className="flex items-center gap-[6px] bg-[#0e0d0c] rounded-md h-[28px] px-[10px] border border-white/[0.04]">
                    <Globe size={10} className="text-emerald-500/50 shrink-0" />
                    <span className="font-['Noto_Sans'] text-[11px] text-white/35 truncate flex-1 select-none">
                      sousaaraujo.adv.br{currentPage?.route || '/'}
                    </span>
                    <span className="font-['Noto_Sans'] text-[9px] text-white/15 tabular-nums shrink-0 bg-white/[0.04] px-[5px] py-[1px] rounded">
                      {dimLabel}
                    </span>
                    <span className="font-['Noto_Sans'] text-[9px] text-emerald-500/40 shrink-0">●</span>
                  </div>
                </div>
              </div>

              {/* Inline preview area */}
              {(() => {
                const rawRoute = currentPage?.route
                  ? (currentPage.route.startsWith('/') ? currentPage.route : `/${currentPage.route}`)
                  : null;

                if (!rawRoute) {
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

                const cw = previewContainerSize.w;
                const ch = previewContainerSize.h;

                /* ── Mobile / Tablet: device frame with inline preview ── */
                if (previewDevice === 'mobile' || previewDevice === 'tablet') {
                  const frameW = deviceW;
                  const autoScale = cw > 0 ? Math.min((cw - 32) / frameW, (ch - 16) / deviceH, 1) : 0.6;
                  const finalScale = effectiveZoom > 0 ? effectiveZoom / 100 : autoScale;
                  const isMobile = previewDevice === 'mobile';
                  const borderRadius = isMobile ? 'rounded-[28px]' : 'rounded-[16px]';
                  const borderW = isMobile ? 3 : 2;

                  return (
                    <div
                      ref={previewContainerRef}
                      className={`flex-1 overflow-auto flex justify-center items-start p-[12px] ${bgClass} min-h-0`}
                      style={bgGridStyle}
                    >
                      <div
                        className={`${borderRadius} shadow-2xl overflow-hidden shrink-0 transition-all duration-200`}
                        style={{
                          width: frameW,
                          height: deviceH,
                          transform: `scale(${finalScale})`,
                          transformOrigin: 'top center',
                          border: `${borderW}px solid #333`,
                        }}
                      >
                        <PanelPreview
                          key={`${activePage}-${previewDevice}-${previewRotated}`}
                          pageId={activePage}
                          route={rawRoute}
                          width={frameW}
                          height={deviceH}
                        />
                      </div>
                    </div>
                  );
                }

                /* ── Desktop: responsive viewport with inline preview ── */
                const BASE_W = deviceW;
                const VIRTUAL_W = effectiveZoom > 0 ? Math.round(BASE_W * (100 / effectiveZoom)) : BASE_W;
                const scale = cw > 0 ? cw / VIRTUAL_W : 0.5;
                const visibleH = ch > 0 ? Math.round(ch / scale) : deviceH;

                return (
                  <div
                    ref={previewContainerRef}
                    className={`flex-1 overflow-hidden flex items-start justify-center ${bgClass} min-h-0`}
                    style={bgGridStyle}
                  >
                    {cw > 0 && (
                      <div
                        className="relative overflow-hidden"
                        style={{ width: cw, height: ch }}
                      >
                        <div
                          className="absolute top-0 left-0 overflow-hidden"
                          style={{
                            width: VIRTUAL_W,
                            height: visibleH,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                          }}
                        >
                          <PanelPreview
                            key={activePage}
                            pageId={activePage}
                            route={rawRoute}
                            width={VIRTUAL_W}
                            height={visibleH}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
            );
          })()}
        </div>
      </div>

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} type={toast.type} />
    </div>
    </DndProvider>
  );
}


/* ─── Nav Group Component ─── */
function NavGroup({ label, items, active, onSelect, expanded, onToggle, badges }: {
  label: string;
  items: PageConfig[];
  active: string;
  onSelect: (id: string) => void;
  expanded: boolean;
  onToggle: () => void;
  badges?: Record<string, number>;
}) {
  const isOpen = expanded;
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
            const badge = badges?.[page.id];
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
                <span className="font-['Noto_Sans'] text-[12px] tracking-[-0.18px] truncate flex-1">{page.label}</span>
                {badge != null && badge > 0 && (
                  <span className="font-['Noto_Sans'] text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/20 px-[5px] py-[1px] rounded-full min-w-[18px] text-center">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PainelPage;
