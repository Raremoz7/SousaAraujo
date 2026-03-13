/**
 * PanelPreview — Renderiza paginas inline no painel admin
 * 
 * Substitui o iframe por renderizacao direta dos componentes React.
 * Como os componentes usam usePanel/usePanelBatch (que leem do cache global),
 * editar campos no painel atualiza o preview automaticamente — sem postMessage.
 */

import React, { Suspense, lazy, useMemo } from 'react';

/* ── Lazy-loaded page components ── */
const PAGE_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'home': lazy(() => import('../pages/HomePage').then(m => ({ default: m.HomePage }))),
  'sobre': lazy(() => import('../pages/SobrePage').then(m => ({ default: m.SobrePage }))),
  'areas': lazy(() => import('../pages/AreasDeAtuacaoPage').then(m => ({ default: m.AreasDeAtuacaoPage }))),
  'blog': lazy(() => import('../pages/BlogPage').then(m => ({ default: m.BlogPage }))),
  'faq': lazy(() => import('../pages/FaqPage').then(m => ({ default: m.FaqPage }))),
  'videos': lazy(() => import('../pages/VideosEducativosPage').then(m => ({ default: m.VideosEducativosPage }))),
  'contato': lazy(() => import('../pages/ContatoPage').then(m => ({ default: m.ContatoPage }))),
  'parceiros': lazy(() => import('../pages/RedeDeParceirosPage').then(m => ({ default: m.RedeDeParceirosPage }))),
  'lp-homologacao': lazy(() => import('../pages/LpHomologacaoPage').then(m => ({ default: m.HomologacaoPage }))),
  'lp-divorcio': lazy(() => import('../pages/LpDivorcioPage').then(m => ({ default: m.DivorcioPage }))),
  'lp-imoveis': lazy(() => import('../pages/ImoveisPage').then(m => ({ default: m.ImoveisPage }))),
  'lp-guarda': lazy(() => import('../pages/LpGuardaPage').then(m => ({ default: m.GuardaPage }))),
  'lp-pensao': lazy(() => import('../pages/LpPensaoPage').then(m => ({ default: m.PensaoPage }))),
  'lp-inventario': lazy(() => import('../pages/LpInventarioPage').then(m => ({ default: m.InventarioPage }))),
  'lp-uniao': lazy(() => import('../pages/LpUniaoEstavelPage').then(m => ({ default: m.UniaoEstavelPage }))),
  'lp-pmes': lazy(() => import('../pages/LpPmesPage').then(m => ({ default: m.PmesPage }))),
  'lp-inpi': lazy(() => import('../pages/LpInpiPage').then(m => ({ default: m.InpiPage }))),
};

/* ── Lazy Navbar & Footer for complete preview ── */
const LazyNavbar = lazy(() => import('./Navbar').then(m => ({ default: m.Navbar })));
const LazyFooter = lazy(() => import('./Footer').then(m => ({ default: m.Footer })));

interface PanelPreviewProps {
  pageId: string;
  route: string;
  width: number;
  height: number;
}

function PreviewLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#161312]">
      <div className="w-[32px] h-[32px] border-2 border-[#a57255]/30 border-t-[#a57255] rounded-full animate-spin mb-[12px]" />
      <span className="font-['Noto_Sans'] text-[12px] text-white/30">Carregando preview...</span>
    </div>
  );
}

function PreviewError({ pageId }: { pageId: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#161312] text-center px-8">
      <p className="text-white/40 text-sm font-['Noto_Sans']">
        Preview nao disponivel para "{pageId}"
      </p>
    </div>
  );
}

export function PanelPreview({ pageId, route, width, height }: PanelPreviewProps) {
  const PageComponent = PAGE_COMPONENTS[pageId];

  if (!PageComponent) {
    return <PreviewError pageId={pageId} />;
  }

  return (
    <div
      style={{ width, height, overflow: 'auto', background: '#161312' }}
      className="preview-scroll-container"
    >
      <Suspense fallback={<PreviewLoading />}>
        <div className="min-h-screen bg-[#161312]">
          <Suspense fallback={null}>
            <LazyNavbar />
          </Suspense>
          <main>
            <PageComponent />
          </main>
          <Suspense fallback={null}>
            <LazyFooter />
          </Suspense>
        </div>
      </Suspense>
    </div>
  );
}