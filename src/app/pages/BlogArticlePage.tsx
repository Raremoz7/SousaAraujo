/**
 * BlogArticlePage — página individual de artigo do blog
 * Layout: hero compacto + corpo com sidebar + FAQ schema-ready + CTA
 */

import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { Contact } from '../components/Contact';
import { CtaBanner } from '../components/CtaBanner';
import svgArrow from '../../imports/svg-od596xq1d5';
import { getArticleBySlug, blogArticles } from '../../data/blogArticles';
import type { ContentBlock, FaqItem, BlogArticle } from '../../data/blogArticles';

/* ─── Images from Figma (same as BlogPage) ─── */
import imgArticle1 from 'figma:asset/a2616d7c2ac778c6f8d75f07e421726c6e9f2b6a.png';
import imgArticle2 from 'figma:asset/94bcd018ae7e3e83310ae217f6c2417f8843e3c9.png';
import imgArticle3 from 'figma:asset/a55fa73edf3ec28f91603fae5c986dfffd5b7291.png';
import imgSidebarBg from 'figma:asset/d7f10d9f31bb6500bea8bbdbdaf5de16612ab39b.png';

import LidianeSousaAraujo from '../../imports/LidianeSousaAraujo';

const blogImages = [imgArticle1, imgArticle2, imgArticle3];

/* ─── Small Arrow ─── */
function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[10px] h-[10px] ${className}`} fill="none" viewBox="0 0 10 10">
      <path d={svgArrow.p1238f200} stroke="currentColor" strokeWidth="1.02093" />
    </svg>
  );
}

/* ─── Fade-in wrapper ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Share Icons ─── */
function ShareBar({ title, slug }: { title: string; slug: string }) {
  const url = `${window.location.origin}/blog/${slug}`;
  return (
    <div className="flex items-center gap-[12px]">
      <span className="font-['Noto_Sans'] text-[13px] text-white/50">Compartilhar:</span>
      <a href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#25D366] transition-colors" aria-label="Compartilhar no WhatsApp">
        <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#0077B5] transition-colors" aria-label="Compartilhar no LinkedIn">
        <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
    </div>
  );
}

/* ─── Content Block Renderer ─── */
function RenderBlock({ block, lpLink }: { block: ContentBlock; lpLink: string }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className={`font-['Roboto'] font-normal text-[16px] leading-[28px] tracking-[-0.225px] text-white/85 mb-[20px] ${block.bold ? 'font-bold' : ''}`}
          style={{ fontVariationSettings: "'wdth' 100" }}
          dangerouslySetInnerHTML={{ __html: block.text || '' }}
        />
      );
    case 'heading2':
      return (
        <h2 className="font-['Marcellus'] text-[24px] md:text-[28px] lg:text-[32px] leading-[1.3] tracking-[-0.516px] text-[#a57255] mt-[48px] mb-[20px]">
          {block.text}
        </h2>
      );
    case 'heading3':
      return (
        <h3 className="font-['Marcellus'] text-[20px] md:text-[22px] leading-[1.35] tracking-[-0.33px] text-white mt-[32px] mb-[14px]">
          {block.text}
        </h3>
      );
    case 'quote':
      return (
        <blockquote className="border-l-[3px] border-[#a57255] pl-[20px] md:pl-[28px] py-[8px] my-[32px]">
          <p className="font-['Noto_Sans'] italic text-[17px] md:text-[19px] leading-[1.5] tracking-[-0.285px] text-white/90">
            "{block.text}"
          </p>
        </blockquote>
      );
    case 'list':
      return (
        <ul className="space-y-[12px] mb-[24px] pl-[4px]">
          {block.items?.map((item, i) => {
            const colonIndex = item.indexOf(':');
            const hasBold = colonIndex > 0 && colonIndex < 60;
            return (
              <li key={i} className="flex items-start gap-[12px] font-['Roboto'] font-normal text-[15px] leading-[26px] tracking-[-0.225px] text-white/80" style={{ fontVariationSettings: "'wdth' 100" }}>
                <span className="mt-[10px] shrink-0 w-[5px] h-[5px] bg-[#a57255]" />
                <span>
                  {hasBold ? (
                    <><strong className="font-bold text-white">{item.slice(0, colonIndex)}</strong>{item.slice(colonIndex)}</>
                  ) : item}
                </span>
              </li>
            );
          })}
        </ul>
      );
    case 'table':
      return (
        <div className="overflow-x-auto mb-[32px] mt-[16px]">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr>
                {block.headers?.map((h, i) => (
                  <th key={i} className="text-left font-['Noto_Sans'] font-medium text-[13px] text-[#a57255] border-b border-[#a57255]/30 py-[12px] px-[16px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row, ri) => (
                <tr key={ri} className="border-b border-white/[0.06]">
                  {row.cells.map((cell, ci) => (
                    <td key={ci} className="font-['Roboto'] text-[14px] leading-[22px] text-white/75 py-[10px] px-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'cta':
      return (
        <div className="my-[48px] text-center">
          <Link
            to={lpLink}
            className="inline-flex items-center gap-[10px] px-[32px] py-[14px] bg-[#a57255] text-white font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] hover:bg-[#8a5e46] transition-colors"
          >
            {block.text}
            <ArrowIcon className="text-white" />
          </Link>
        </div>
      );
    default:
      return null;
  }
}

/* ─── FAQ Section ─── */
function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-[56px] mb-[32px]">
      <h2 className="font-['Marcellus'] text-[24px] md:text-[28px] lg:text-[32px] leading-[1.3] tracking-[-0.516px] text-[#a57255] mb-[32px]">
        Perguntas Frequentes
      </h2>
      <div className="space-y-0 divide-y divide-white/[0.08]">
        {items.map((faq, i) => (
          <details key={i} className="group py-[18px]">
            <summary className="cursor-pointer list-none flex items-start justify-between gap-[16px] font-['Noto_Sans'] font-medium text-[16px] md:text-[17px] leading-[1.4] tracking-[-0.255px] text-white select-none">
              <span>{faq.question}</span>
              <span className="mt-[4px] shrink-0 text-[#a57255] transition-transform duration-300 group-open:rotate-45 text-[20px] leading-none">+</span>
            </summary>
            <p className="font-['Roboto'] font-normal text-[15px] leading-[26px] tracking-[-0.225px] text-white/70 mt-[12px] pr-[32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

/* ─── Sidebar (sticky) ─── */
function ArticleSidebar({ article }: { article: BlogArticle }) {
  const otherArticles = blogArticles.filter(a => a.slug !== article.slug);
  return (
    <aside className="space-y-[40px]">
      {/* Author card */}
      <FadeIn>
        <div className="relative overflow-hidden" style={{ background: '#452b1e' }}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img src={imgSidebarBg} alt="Dra. Lidiane Sousa Araújo" className="absolute h-full max-w-none" style={{ left: '-70%', width: '222%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
          <div className="relative px-[24px] pt-[220px] pb-[24px]">
            <div className="w-[170px] h-[32px] text-white mb-[4px]">
              <LidianeSousaAraujo />
            </div>
            <p className="font-['Noto_Sans'] text-[12px] text-white/60">OAB/DF 34.876</p>
          </div>
        </div>
      </FadeIn>

      {/* Related */}
      <FadeIn delay={0.1}>
        <div>
          <h3 className="font-['Roboto'] font-normal text-[25px] leading-[35px] tracking-[-0.525px] text-[#b58468] mb-[18px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Outros Artigos
          </h3>
          <div className="space-y-[16px]">
            {otherArticles.map(art => (
              <Link key={art.slug} to={`/blog/${art.slug}`} className="flex gap-[12px] group items-start">
                <div className="shrink-0 w-[80px] h-[56px] overflow-hidden">
                  <img src={blogImages[art.imageIndex]} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                  <p className="font-['Noto_Sans'] text-[13px] leading-[18px] text-white group-hover:text-[#a57255] transition-colors line-clamp-2">
                    {art.title}
                  </p>
                  <p className="font-['Noto_Sans'] text-[11px] text-white/40 mt-[4px]">{art.fullDate}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* External link */}
      <FadeIn delay={0.15}>
        <div>
          <h3 className="font-['Roboto'] font-normal text-[25px] leading-[35px] tracking-[-0.525px] text-[#b58468] mb-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Referência Legal
          </h3>
          <a href={article.externalLink} target="_blank" rel="noopener noreferrer" aria-label={`Acessar referência legal: ${article.externalLinkLabel}`} className="inline-flex items-center gap-[6px] font-['Noto_Sans'] text-[13px] text-white/60 hover:text-[#a57255] transition-colors group">
            {article.externalLinkLabel}
            <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </FadeIn>

      {/* LP link */}
      <FadeIn delay={0.2}>
        <Link
          to={article.lpLink}
          className="flex items-center gap-[10px] px-[20px] py-[14px] border border-[#a57255]/40 hover:border-[#a57255] transition-colors group"
        >
          <span className="font-['Noto_Sans'] font-medium text-[14px] text-white">Saiba mais sobre este tema</span>
          <ArrowIcon className="text-[#a57255] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </FadeIn>
    </aside>
  );
}

/* ─── 404 fallback ─── */
function ArticleNotFound() {
  return (
    <section className="bg-[#161312] min-h-[60vh] flex items-center justify-center px-[20px]">
      <div className="text-center">
        <h1 className="font-['Marcellus'] text-[48px] text-white mb-[16px]">Artigo não encontrado</h1>
        <p className="font-['Roboto'] text-[16px] text-white/60 mb-[32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          O artigo que você procura não existe ou foi removido.
        </p>
        <Link to="/blog" aria-label="Voltar para a página do blog" className="inline-flex items-center gap-[8px] text-[#a57255] hover:text-white transition-colors font-['Noto_Sans'] font-medium text-[15px]">
          Voltar ao Blog <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) return <ArticleNotFound />;

  const heroImage = blogImages[article.imageIndex];

  return (
    <>
      {/* ── Hero compacto ── */}
      <section className="relative w-full h-[340px] md:h-[420px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src={heroImage} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#161312]/50" />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg, rgba(22,19,18,0) 40%, rgb(22,19,18) 100%)' }} />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] h-full flex flex-col justify-end pb-[40px] md:pb-[60px]">
          <FadeIn>
            <div className="flex items-center gap-[10px] mb-[14px]">
              <Link to="/blog" aria-label="Voltar para a página do blog" className="font-['Noto_Sans'] text-[13px] text-white/60 hover:text-[#a57255] transition-colors">Blog</Link>
              <span className="text-white/30">/</span>
              <span className="font-['Noto_Sans'] text-[13px] text-[#a57255]">{article.category}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-['Marcellus'] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.15] tracking-[-0.87px] text-white max-w-[900px]">
              {article.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-[16px] mt-[20px]">
              <span className="font-['Noto_Sans'] text-[13px] text-white/60">{article.fullDate}</span>
              <div className="w-px h-[11px] bg-[#b58468]" />
              <span className="font-['Noto_Sans'] text-[13px] text-white/60">Dra. Lidiane Sousa Araújo</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Body: content + sidebar ── */}
      <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[40px] lg:gap-[60px]">

            {/* Main content */}
            <article className="min-w-0">
              <FadeIn>
                <ShareBar title={article.title} slug={article.slug} />
              </FadeIn>

              <div className="mt-[32px]">
                {article.content.map((block, i) => (
                  <FadeIn key={i} delay={0}>
                    <RenderBlock block={block} lpLink={article.lpLink} />
                  </FadeIn>
                ))}
              </div>

              {/* FAQ */}
              <FadeIn>
                <FaqSection items={article.faq} />
              </FadeIn>

              {/* Final CTA */}
              <FadeIn>
                <div className="text-center mt-[32px] mb-[16px]">
                  <Link
                    to={article.lpLink}
                    className="inline-flex items-center gap-[10px] px-[32px] py-[14px] bg-[#a57255] text-white font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] hover:bg-[#8a5e46] transition-colors"
                  >
                    Agendar Consulta de Viabilidade
                    <ArrowIcon className="text-white" />
                  </Link>
                </div>
              </FadeIn>

              {/* Disclaimer */}
              <FadeIn>
                <div className="mt-[48px] pt-[24px] border-t border-white/[0.06]">
                  <p className="font-['Noto_Sans'] text-[12px] leading-[18px] text-white/40">
                    Conteúdo informativo. Cada caso exige análise individual. Comunicação em conformidade com o Provimento OAB 205/2021.
                  </p>
                  <div className="w-[160px] h-[30px] text-[#a57255] mt-[12px]" style={{ '--fill-0': '#a57255' } as React.CSSProperties}>
                    <LidianeSousaAraujo />
                  </div>
                  <p className="font-['Noto_Sans'] text-[11px] text-white/30 mt-[2px]">OAB/DF 34.876</p>
                </div>
              </FadeIn>
            </article>

            {/* Sidebar (sticky) */}
            <div className="hidden lg:block">
              <div className="sticky top-[100px]">
                <ArticleSidebar article={article} />
              </div>
            </div>

          </div>
        </div>
      </section>

      <CtaBanner />
      <Contact />
    </>
  );
}