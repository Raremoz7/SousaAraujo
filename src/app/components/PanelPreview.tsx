/**
 * PanelPreview — Renderiza paginas inline no painel admin
 * 
 * Substitui o iframe por renderizacao direta dos componentes React.
 * Como os componentes usam usePanel/usePanelBatch (que leem do cache global),
 * editar campos no painel atualiza o preview automaticamente — sem postMessage.
 *
 * Click interception: We attach a NATIVE capture-phase listener so that clicks
 * on React Router <Link>/<NavLink> are intercepted before React's synthetic
 * event system (and therefore before Router can call navigate()).
 */

import React, { Suspense, lazy, useRef, useEffect, useCallback } from 'react';
import { PreviewModeContext } from '../hooks/usePreviewMode';

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
  mode?: 'desktop' | 'tablet' | 'mobile';
  /** Called when user clicks a link inside the preview — receives the pathname */
  onNavigate?: (pathname: string) => void;
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

export function PanelPreview({ pageId, route, width, height, mode, onNavigate }: PanelPreviewProps) {
  const PageComponent = PAGE_COMPONENTS[pageId];
  const containerRef = useRef<HTMLDivElement>(null);
  const onNavigateRef = useRef(onNavigate);
  onNavigateRef.current = onNavigate;

  // Determine mode from width if not explicitly provided
  const resolvedMode = mode || (width <= 480 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop');

  /**
   * Native capture-phase click listener.
   * Fires BEFORE React's synthetic event system, so React Router's <Link>
   * onClick handler never sees the event (we stopImmediatePropagation).
   */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Block ALL navigation inside preview
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation(); // prevents React Router's handler too

      // Ignore mailto, tel, external, hash-only
      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('http') ||
        href.startsWith('#')
      ) {
        return;
      }

      if (onNavigateRef.current && href.startsWith('/')) {
        const pathname = href.split('#')[0] || '/';
        onNavigateRef.current(pathname);
      }
    }

    // capture: true → fires before bubble phase (where React Router listens)
    el.addEventListener('click', handleClick, true);
    return () => el.removeEventListener('click', handleClick, true);
  }, []);

  if (!PageComponent) {
    return <PreviewError pageId={pageId} />;
  }

  return (
    <PreviewModeContext.Provider value={resolvedMode}>
      <div
        ref={containerRef}
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
    </PreviewModeContext.Provider>
  );
}
