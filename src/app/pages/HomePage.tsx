import { useMemo, lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Stats } from '../components/Stats';
import { PracticeAreas } from '../components/PracticeAreas';
import { Contact } from '../components/Contact';
import { ScrollReveal } from '../components/ui/animations';
import { usePanel } from '../hooks/usePanelContent';

// Lazy load components below the fold
const ServicesGrid = lazy(() => import('../components/ServicesGrid').then(m => ({ default: m.ServicesGrid })));
const Differentials = lazy(() => import('../components/Differentials').then(m => ({ default: m.Differentials })));
const CtaBanner = lazy(() => import('../components/CtaBanner').then(m => ({ default: m.CtaBanner })));
const Videos = lazy(() => import('../components/Videos').then(m => ({ default: m.Videos })));
const Blog = lazy(() => import('../components/Blog').then(m => ({ default: m.Blog })));

/**
 * Section registry — maps panel section IDs to their React components and ScrollReveal props.
 * The order is controlled by the `home.sectionOrder` panel key.
 */
const SECTION_REGISTRY: Record<string, { Component: React.FC; revealProps?: Record<string, any> }> = {
  'home-hero':          { Component: Hero },
  'home-about':         { Component: About },
  'home-services':      { Component: ServicesGrid },
  'home-differentials': { Component: Differentials },
  'home-stats':         { Component: Stats },
  'home-practice':      { Component: PracticeAreas },
  'home-cta':           { Component: CtaBanner, revealProps: { direction: 'none', duration: 0.9 } },
  'home-videos':        { Component: Videos },
  'home-blog':          { Component: Blog },
  'home-contact':       { Component: Contact },
};

/** Default section order (matches original hardcoded layout) */
const DEFAULT_ORDER = [
  'home-hero',
  'home-about',
  'home-services',
  'home-differentials',
  'home-stats',
  'home-practice',
  'home-cta',
  'home-videos',
  'home-blog',
  'home-contact',
];

/**
 * HomePage — all sections of the main landing page.
 * Order is dynamically read from the panel (`home.sectionOrder`).
 */
export function HomePage() {
  const orderJson = usePanel('home.sectionOrder', '');

  const orderedIds = useMemo(() => {
    if (!orderJson) return DEFAULT_ORDER;
    try {
      const parsed = JSON.parse(orderJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Include any new sections that might not be in the saved order
        const set = new Set(parsed as string[]);
        const result = [...parsed];
        for (const id of DEFAULT_ORDER) {
          if (!set.has(id)) result.push(id);
        }
        return result;
      }
    } catch { /* fall through */ }
    return DEFAULT_ORDER;
  }, [orderJson]);

  // Define which sections should use lazy loading
  const lazyIds = new Set(['home-services', 'home-differentials', 'home-cta', 'home-videos', 'home-blog']);

  return (
    <>
      {orderedIds.map(id => {
        const entry = SECTION_REGISTRY[id];
        if (!entry) return null;
        const { Component, revealProps } = entry;

        // Hero renders without ScrollReveal wrapper
        if (id === 'home-hero') {
          return <Component key={id} />;
        }

        // Wrap lazy components with Suspense
        const isLazy = lazyIds.has(id);
        const content = (
          <ScrollReveal key={id} {...(revealProps || {})}>
            <Component />
          </ScrollReveal>
        );

        if (isLazy) {
          return (
            <Suspense key={id} fallback={<div className="h-96 bg-[#161312]" />}>
              {content}
            </Suspense>
          );
        }

        return content;
      })}
    </>
  );
}