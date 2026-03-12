/**
 * SeoHead — Injeta meta tags SEO no <head> de cada pagina
 * 
 * Le os dados de SEO do painel admin (chaves seo.*) via usePanelContent
 * e injeta: <title>, <meta description>, canonical, OG tags, Twitter Card e JSON-LD.
 * 
 * Usado dentro do Layout para aplicar automaticamente a cada rota.
 */

import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import { useMemo } from 'react';

import { usePanel, readPanel } from '../hooks/usePanelContent';

/* ─── Route → SEO page ID mapping ─── */
const ROUTE_TO_SEO_ID: Record<string, string> = {
  '/': 'home',
  '/sobre': 'sobre',
  '/areas-de-atuacao': 'areas',
  '/blog': 'blog',
  '/faq': 'faq',
  '/contato': 'contato',
  '/rede-de-parceiros': 'parceiros',
  '/videos-educativos': 'videos',
  '/imoveis': 'imoveis',
  '/homologacao-de-sentenca-estrangeira': 'homologacao',
  '/divorcio': 'divorcio',
  '/guarda-e-plano-de-convivencia': 'guarda',
  '/pensao-alimenticia': 'pensao',
  '/inventario-e-sucessoes': 'inventario',
  '/uniao-estavel': 'uniao',
  '/consultoria-empresarial-pmes': 'pmes',
  '/registro-de-marca-inpi': 'inpi',
};

const SITE_URL = 'https://sousaaraujo.adv.br';

export function SeoHead() {
  const { pathname } = useLocation();
  
  // Resolve SEO ID from current route
  // For blog articles (/blog/:slug), use blog SEO
  const seoId = ROUTE_TO_SEO_ID[pathname] || (pathname.startsWith('/blog/') ? 'blog' : null);
  
  // If no SEO config for this route (e.g. /painel), render nothing
  if (!seoId) return null;

  return <SeoHelmet seoId={seoId} pathname={pathname} />;
}

/* Separate component so hooks are not called conditionally */
function SeoHelmet({ seoId, pathname }: { seoId: string; pathname: string }) {
  // Read all SEO fields from panel data
  const title = usePanel(`seo.${seoId}.title`, '');
  const description = usePanel(`seo.${seoId}.description`, '');
  const keyword = usePanel(`seo.${seoId}.keyword`, '');
  const canonical = usePanel(`seo.${seoId}.canonical`, `${SITE_URL}${pathname}`);
  const robots = usePanel(`seo.${seoId}.robots`, 'index, follow');
  const ogTitle = usePanel(`seo.${seoId}.ogTitle`, '');
  const ogDescription = usePanel(`seo.${seoId}.ogDescription`, '');
  const ogImage = usePanel(`seo.${seoId}.ogImage`, '');
  const ogType = usePanel(`seo.${seoId}.ogType`, 'website');
  const twitterCard = usePanel(`seo.${seoId}.twitterCard`, 'summary_large_image');
  const twitterTitle = usePanel(`seo.${seoId}.twitterTitle`, '');
  const twitterDescription = usePanel(`seo.${seoId}.twitterDescription`, '');

  // Site-level data for JSON-LD
  const siteName = usePanel('site.name', 'Sousa Araújo Advocacia');
  const sitePhone = usePanel('site.phone', '+55 61 99599-1322');
  const siteEmail = usePanel('site.email', 'contato@sousaaraujo.adv.br');
  const siteStreet = usePanel('site.address.street', '');
  const siteCity = usePanel('site.address.city', 'Brasília');
  const siteState = usePanel('site.address.state', 'DF');
  const siteZip = usePanel('site.address.zipCode', '');
  const socialInstagram = usePanel('site.social.instagram', '');
  const socialFacebook = usePanel('site.social.facebook', '');
  const socialLinkedin = usePanel('site.social.linkedin', '');
  const socialYoutube = usePanel('site.social.youtube', '');

  // Custom JSON-LD from panel
  const customJsonLd = usePanel('seo.global.jsonld.custom', '');

  // Derived values
  const finalTitle = title || siteName;
  const finalOgTitle = ogTitle || title || siteName;
  const finalOgDesc = ogDescription || description;
  const finalTwitterTitle = twitterTitle || ogTitle || title || siteName;
  const finalTwitterDesc = twitterDescription || ogDescription || description;

  // LocalBusiness JSON-LD (homepage only)
  const localBusinessJsonLd = useMemo(() => {
    if (seoId !== 'home') return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": siteName,
      "description": description || "Escritório de advocacia em Brasília com atuação nacional e para brasileiros no exterior.",
      "url": SITE_URL,
      "telephone": sitePhone,
      "email": siteEmail,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteStreet,
        "addressLocality": siteCity,
        "addressRegion": siteState,
        "postalCode": siteZip,
        "addressCountry": "BR"
      },
      "priceRange": "$$",
      "areaServed": { "@type": "Country", "name": "Brazil" },
      "sameAs": [socialInstagram, socialFacebook, socialLinkedin, socialYoutube].filter(Boolean),
    });
  }, [seoId, siteName, description, sitePhone, siteEmail, siteStreet, siteCity, siteState, siteZip, socialInstagram, socialFacebook, socialLinkedin, socialYoutube]);

  // BreadcrumbList JSON-LD (all pages except home)
  const breadcrumbJsonLd = useMemo(() => {
    if (seoId === 'home') return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
        { "@type": "ListItem", "position": 2, "name": title || seoId, "item": `${SITE_URL}${pathname}` },
      ]
    });
  }, [seoId, title, pathname]);

  // FAQ Page JSON-LD (only on /faq) — uses readPanel (non-reactive, OK for structured data)
  const faqJsonLd = useMemo(() => {
    if (seoId !== 'faq') return null;
    const faqs: { q: string; a: string }[] = [];
    for (let i = 1; i <= 12; i++) {
      const q = readPanel(`faq.item${i}.q`, '');
      const a = readPanel(`faq.item${i}.a`, '');
      if (q && a) faqs.push({ q, a });
    }
    if (faqs.length === 0) return null;
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    });
  }, [seoId]);

  // Validated custom JSON-LD
  const validCustomJsonLd = useMemo(() => {
    if (!customJsonLd) return null;
    try { JSON.parse(customJsonLd); return customJsonLd; } catch { return null; }
  }, [customJsonLd]);

  // If zero SEO data configured, still render minimal tags
  return (
    <Helmet>
      {/* Title */}
      <title>{finalTitle}</title>

      {/* Basic meta tags */}
      {description && <meta name="description" content={description} />}
      {keyword && <meta name="keywords" content={keyword} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={finalOgTitle} />
      {finalOgDesc && <meta property="og:description" content={finalOgDesc} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${SITE_URL}${pathname}`} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      {finalTwitterDesc && <meta name="twitter:description" content={finalTwitterDesc} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD: LocalBusiness (homepage only) */}
      {localBusinessJsonLd && (
        <script type="application/ld+json">{localBusinessJsonLd}</script>
      )}

      {/* JSON-LD: BreadcrumbList (inner pages) */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">{breadcrumbJsonLd}</script>
      )}

      {/* JSON-LD: FAQPage (/faq only) */}
      {faqJsonLd && (
        <script type="application/ld+json">{faqJsonLd}</script>
      )}

      {/* JSON-LD: Custom (from panel) */}
      {validCustomJsonLd && (
        <script type="application/ld+json">{validCustomJsonLd}</script>
      )}
    </Helmet>
  );
}

export default SeoHead;
