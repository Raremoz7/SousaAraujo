Aqui estão os prompts separados por arquivo/problema:

PROMPT 1 — SEO individual dos artigos do blog + JSON-LD Article
Arquivo: src/app/pages/BlogArticlePage.tsx
No arquivo BlogArticlePage.tsx, faça as seguintes alterações:

1. Adicione o import do Helmet no topo do arquivo, logo após os imports existentes:
   import { Helmet } from 'react-helmet-async';

2. Adicione a constante SITE_URL logo após os imports:
   const SITE_URL = 'https://sousaaraujo.adv.br';

3. Dentro da função BlogArticlePage(), logo antes do return, adicione o bloco de
   JSON-LD Article:

   const articleJsonLd = JSON.stringify({
     "@context": "https://schema.org",
     "@type": "Article",
     "headline": article.metaTitle,
     "description": article.metaDescription,
     "image": `${SITE_URL}/og-cover.jpg`,
     "datePublished": article.fullDate,
     "author": {
       "@type": "Person",
       "name": "Dra. Lidiane Sousa Araújo",
       "url": `${SITE_URL}/sobre`
     },
     "publisher": {
       "@type": "Organization",
       "name": "Sousa Araújo Advocacia",
       "url": SITE_URL
     },
     "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": `${SITE_URL}/blog/${article.slug}`
     }
   });

4. No return da função BlogArticlePage(), como PRIMEIRO filho do Fragment (<>),
   antes da section do hero, adicione:

   <Helmet>
     <title>{article.metaTitle}</title>
     <meta name="description" content={article.metaDescription} />
     <meta name="keywords" content={article.keyword} />
     <link rel="canonical" href={`${SITE_URL}/blog/${article.slug}`} />
     <meta name="robots" content="index, follow" />
     <meta property="og:title" content={article.metaTitle} />
     <meta property="og:description" content={article.metaDescription} />
     <meta property="og:type" content="article" />
     <meta property="og:url" content={`${SITE_URL}/blog/${article.slug}`} />
     <meta property="og:image" content={`${SITE_URL}/og-cover.jpg`} />
     <meta property="og:site_name" content="Sousa Araújo Advocacia" />
     <meta property="og:locale" content="pt_BR" />
     <meta name="twitter:card" content="summary_large_image" />
     <meta name="twitter:title" content={article.metaTitle} />
     <meta name="twitter:description" content={article.metaDescription} />
     <meta name="twitter:image" content={`${SITE_URL}/og-cover.jpg`} />
     <script type="application/ld+json">{articleJsonLd}</script>
   </Helmet>

Não altere nenhuma outra parte do componente.

PROMPT 2 — Corrigir bug do score de JSON-LD no TechnicalChecklist
Arquivo: src/app/components/SeoPanel.tsx
No arquivo SeoPanel.tsx, localize a função TechnicalChecklist.

Dentro do useMemo, na seção "5. SEO Avancado", encontre a linha:
  const hasJsonLd = data['seo.global.jsonld.business'] || data['seo.global.jsonld.custom'];

Substitua por:
  const hasJsonLd = data['site.name'] || data['seo.global.jsonld.custom'];

Explicação: a chave seo.global.jsonld.business nunca é salva no Supabase porque o
JSON-LD LocalBusiness é gerado dinamicamente pelo SeoHead a partir dos campos site.*.
A presença de site.name indica que o admin configurou os dados do escritório, o que
é suficiente para considerar o Schema.org como configurado.

Não altere nenhuma outra parte do arquivo.

PROMPT 3 — hreflang pt-BR no SeoHead
Arquivo: src/app/components/SeoHead.tsx
No arquivo SeoHead.tsx, dentro do componente SeoHelmet, localize o bloco return
que começa com <Helmet>.

Dentro do Helmet, após a tag <meta property="og:locale" content="pt_BR" />,
adicione as seguintes tags hreflang:

  <link rel="alternate" hreflang="pt-BR" href={`${SITE_URL}${pathname}`} />
  <link rel="alternate" hreflang="x-default" href={`${SITE_URL}${pathname}`} />

Não altere nenhuma outra parte do arquivo.

PROMPT 4 — sitemap.xml e robots.txt estáticos
Arquivos novos: public/sitemap.xml e public/robots.txt
Crie dois arquivos novos na pasta public/:

─────────────────────────────────────────────
ARQUIVO 1: public/sitemap.xml
─────────────────────────────────────────────

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sousaaraujo.adv.br/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/sobre</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/areas-de-atuacao</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/blog/imovel-sem-escritura-caminhos-regularizar-brasilia</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/blog/posso-vender-imovel-brasil-divorcio-pendente-exterior</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/blog/uniao-estavel-x-casamento-diferencas-patrimonio</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/contato</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/homologacao-de-sentenca-estrangeira</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/divorcio</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/imoveis</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/guarda-e-plano-de-convivencia</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/pensao-alimenticia</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/inventario-e-sucessoes</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/uniao-estavel</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/consultoria-empresarial-pmes</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/registro-de-marca-inpi</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/rede-de-parceiros</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://sousaaraujo.adv.br/videos-educativos</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>

─────────────────────────────────────────────
ARQUIVO 2: public/robots.txt
─────────────────────────────────────────────

User-agent: *
Allow: /
Disallow: /painel

Sitemap: https://sousaaraujo.adv.br/sitemap.xml

─────────────────────────────────────────────

Crie exatamente esses dois arquivos com esse conteúdo, sem alterações.

Ordem de aplicação recomendada: 4 → 2 → 3 → 1. Os de arquivo novo primeiro (sem risco de quebrar nada), depois as edições nos componentes existentes.