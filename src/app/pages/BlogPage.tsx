import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Contact } from '../components/Contact';
import { CtaBanner } from '../components/CtaBanner';
import { PlayButton } from '../components/ui/PlayButton';
import svgArrow from '../../imports/svg-od596xq1d5';
import { readPanel } from '../hooks/usePanelContent';
import LidianeSousaAraujo from '../../imports/LidianeSousaAraujo';

/* ─── Images from Figma ─── */
import imgHeroBg        from 'figma:asset/2f55e882e260b49370c3772b2944c805711d10d5.png';
import imgArticle1      from 'figma:asset/a2616d7c2ac778c6f8d75f07e421726c6e9f2b6a.png';
import imgArticle2      from 'figma:asset/94bcd018ae7e3e83310ae217f6c2417f8843e3c9.png';
import imgArticle3      from 'figma:asset/a55fa73edf3ec28f91603fae5c986dfffd5b7291.png';
import imgArticle4      from 'figma:asset/7b83365c45482e39e7578fbe85cff409a2b6f6c1.png';
import imgArticle5      from 'figma:asset/07a9114c818ffc71c7c6320be893fc737239a2f9.png';
import imgArticle6      from 'figma:asset/11e0f76fd4b5557cd29bcbafaa7a0719fb7bedda.png';
import imgSidebarPerson from 'figma:asset/0d829751629167d74a37f60e1e3ce65894d6be20.png';
import imgSidebarBg     from 'figma:asset/d7f10d9f31bb6500bea8bbdbdaf5de16612ab39b.png';

/* ─── Small Arrow ─── */
function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[10px] h-[10px] ${className}`} fill="none" viewBox="0 0 10 10">
      <path d={svgArrow.p1238f200} stroke="currentColor" strokeWidth="1.02093" />
    </svg>
  );
}

/* ─── Share Icon ─── */
function ShareIcon() {
  return (
    <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 16 16">
      <circle cx="3.5" cy="8" r="1.5" fill="white" />
      <circle cx="12.5" cy="3" r="1.5" fill="white" />
      <circle cx="12.5" cy="13" r="1.5" fill="white" />
      <path d="M5 7.1L11 3.9" stroke="white" strokeWidth="0.9" />
      <path d="M5 8.9L11 12.1" stroke="white" strokeWidth="0.9" />
    </svg>
  );
}

/* ─── Search Icon ─── */
function SearchIcon() {
  return (
    <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 17 17">
      <circle cx="7.5" cy="7.5" r="6" stroke="white" strokeWidth="0.98" />
      <path d="M12 12L16 16" stroke="white" strokeWidth="0.98" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Fade-in wrapper ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */
const categories = [
  'Direito de Família',
  'Homologação',
  'Direito Imobiliário',
  'Direito Empresarial',
];

const latestArticles = [
  {
    title: 'Imóvel sem Escritura: 5 Caminhos Reais para Regularizar',
    date: '1 de Março, 2026',
    image: imgArticle4,
    slug: 'imovel-sem-escritura-caminhos-regularizar-brasilia',
  },
  {
    title: 'Posso Vender Imóvel no Brasil com Divórcio no Exterior?',
    date: '1 de Março, 2026',
    image: imgArticle5,
    slug: 'posso-vender-imovel-brasil-divorcio-pendente-exterior',
  },
  {
    title: 'União Estável x Casamento: O que Muda no Patrimônio?',
    date: '1 de Março, 2026',
    image: imgArticle6,
    slug: 'uniao-estavel-x-casamento-diferencas-patrimonio',
  },
];

const tags = ['Família', 'Divórcio', 'Herança', 'Usucapião', 'Internacional', 'Imóveis', 'Empresarial', 'STJ', 'Escritura'];

interface Article {
  id: number;
  day: string;
  month: string;
  fullDate: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  slug?: string;
}

const allArticles: Article[] = [
  {
    id: 1, day: '01', month: 'Mar', fullDate: '1 de Março, 2026',
    category: 'Direito Imobiliário e Usucapião',
    title: 'Imóvel sem Escritura: 5 Caminhos Reais para Regularizar e Destravar Venda em 2026',
    excerpt: 'Imóvel sem escritura? Descubra os 5 caminhos reais para regularizar, incluindo usucapião extrajudicial, adjudicação compulsória e Reurb. Guia completo e atualizado para 2026.',
    image: imgArticle1,
    slug: 'imovel-sem-escritura-caminhos-regularizar-brasilia',
  },
  {
    id: 2, day: '01', month: 'Mar', fullDate: '1 de Março, 2026',
    category: 'Homologação e Direito Internacional',
    title: 'Posso Vender Imóvel no Brasil com Divórcio Pendente no Exterior? 5 Riscos Graves',
    excerpt: 'Você fez seu divórcio no exterior e acha que está tudo resolvido — até tentar vender um imóvel no Brasil. Entenda os 5 riscos reais e como a homologação resolve.',
    image: imgArticle2,
    slug: 'posso-vender-imovel-brasil-divorcio-pendente-exterior',
  },
  {
    id: 3, day: '01', month: 'Mar', fullDate: '1 de Março, 2026',
    category: 'Direito de Família',
    title: 'União Estável x Casamento: 5 Diferenças Cruciais que Afetam Seu Patrimônio em 2026',
    excerpt: 'Moram juntos há anos mas nunca casaram? Descubra as 5 diferenças cruciais entre união estável e casamento que impactam diretamente patrimônio, herança e direitos.',
    image: imgArticle3,
    slug: 'uniao-estavel-x-casamento-diferencas-patrimonio',
  },
  {
    id: 4, day: '28', month: 'Out', fullDate: '28 de Outubro, 2025',
    category: 'Direito Empresarial',
    title: 'Contrato social: o que é e por que é tão importante para sua empresa',
    excerpt: 'O contrato social é o documento mais fundamental de qualquer empresa. Ele define a estrutura, os sócios, as responsabilidades e as regras de funcionamento do negócio com segurança jurídica.',
    image: imgArticle4,
  },
  {
    id: 5, day: '20', month: 'Out', fullDate: '20 de Outubro, 2025',
    category: 'Homologação e Direito Internacional',
    title: 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
    excerpt: 'Uma dúvida frequente entre brasileiros que vivem fora do país: é possível realizar transações imobiliárias no Brasil enquanto o processo de divórcio ainda não foi concluído?',
    image: imgArticle5,
  },
  {
    id: 6, day: '12', month: 'Out', fullDate: '12 de Outubro, 2025',
    category: 'Direito de Família',
    title: 'União Estável x Casamento: O que muda no seu patrimônio?',
    excerpt: 'Muitos casais escolhem a união estável como alternativa ao casamento, mas nem sempre entendem as implicações patrimoniais dessa escolha.',
    image: imgArticle6,
  },
];

const ARTICLES_PER_PAGE = 3;

/* ─── Article Card — vertical layout matching Figma ─── */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  const cardContent = (
    <article className="border-b border-white/10 pb-[80px] last:border-0 last:pb-0">

      {/* Full-width image with date badge overlay */}
      <div className="relative w-full overflow-hidden mb-[22px]" style={{ aspectRatio: '780 / 474' }}>
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Date badge */}
        <div className="absolute top-0 left-0 backdrop-blur-[3.5px] bg-[rgba(69,43,30,0.5)] w-[62px] h-[79px] flex flex-col items-center justify-center gap-0">
          <span className="font-['Lora'] text-[24px] leading-[23px] text-white">{article.day}</span>
          <span className="font-['Lora'] text-[15px] leading-[23px] text-white">{article.month}</span>
        </div>
      </div>

      {/* Meta: date + vertical divider + category */}
      <div className="flex items-center gap-[10px] mb-[18px]">
        <span className="font-['Noto_Sans'] font-normal text-[13px] leading-[18px] tracking-[-0.195px] text-white">
          {article.fullDate}
        </span>
        <div className="w-px h-[11px] bg-[#b58468]" />
        <span className="font-['Noto_Sans'] font-normal text-[13px] leading-[18px] tracking-[-0.195px] text-[#b58468]">
          {article.category}
        </span>
      </div>

      {/* Title in Marcellus */}
      <h2 className="font-['Marcellus'] text-[26px] md:text-[34px] lg:text-[43px] leading-[1.21] tracking-[-0.516px] text-white mb-[16px] hover:text-[#a57255] transition-colors cursor-pointer">
        {article.title}
      </h2>

      {/* Excerpt */}
      <p
        className="font-['Roboto'] font-normal text-[15px] leading-[23px] tracking-[-0.225px] text-white mb-[24px] line-clamp-3"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {article.excerpt}
      </p>

      {/* Bottom row: Read More (left) + Share (right) */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-[8px] font-['Noto_Sans'] font-medium text-[16px] leading-[26.67px] tracking-[-0.24px] text-white hover:text-[#a57255] transition-colors group">
          Ler Artigo
          <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
        <button className="inline-flex items-center gap-[6px] font-['Noto_Sans'] font-medium text-[13px] leading-[18px] text-white hover:text-[#a57255] transition-colors">
          Compartilhar
          <ShareIcon />
        </button>
      </div>

    </article>
  );

  return (
    <FadeIn delay={index * 0.08}>
      {article.slug ? (
        <Link to={`/blog/${article.slug}`} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </FadeIn>
  );
}

/* ─── Sidebar ─── */
function Sidebar() {
  const [search, setSearch] = useState('');

  return (
    <aside className="space-y-[40px]">

      {/* Search */}
      <FadeIn>
        <div className="relative border-b border-[#b58468] pb-[10px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar"
            className="w-full bg-transparent font-['Noto_Sans'] font-normal text-[13px] leading-[normal] text-white placeholder-white/60 focus:outline-none pr-[28px]"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>
      </FadeIn>

      {/* Categories */}
      <FadeIn delay={0.08}>
        <div>
          <h3
            className="font-['Roboto'] font-normal text-[25px] leading-[35px] tracking-[-0.525px] text-[#b58468] mb-[18px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Categorias
          </h3>
          <ul className="space-y-[10px]">
            {categories.map((cat) => (
              <li key={cat}>
                <button className="font-['Noto_Sans'] font-normal text-[15px] leading-[23px] tracking-[-0.225px] text-white hover:text-[#b58468] transition-colors">
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* Latest Articles */}
      <FadeIn delay={0.12}>
        <div>
          <h3
            className="font-['Roboto'] font-normal text-[25px] leading-[35px] tracking-[-0.525px] text-[#b58468] mb-[18px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Artigos Recentes
          </h3>
          <div className="space-y-[14px]">
            {latestArticles.map((item, i) => (
              <Link
                key={i}
                to={item.slug ? `/blog/${item.slug}` : '#'}
                className="flex gap-[12px] group items-start"
              >
                <div
                  className="flex-shrink-0 overflow-hidden"
                  style={{ width: '120px', height: '73px' }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p className="font-['Noto_Sans'] font-normal text-[13px] leading-[18px] tracking-[-0.195px] text-white group-hover:text-[#b58468] transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <p className="font-['Noto_Sans'] text-[11px] text-white/40 mt-[4px]">
                    {item.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Tags */}
      <FadeIn delay={0.16}>
        <div>
          <h3
            className="font-['Roboto'] font-normal text-[25px] leading-[35px] tracking-[-0.525px] text-[#b58468] mb-[18px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Tags
          </h3>
          <div className="flex flex-wrap gap-[8px]">
            {tags.map((tag) => (
              <button
                key={tag}
                className="px-[14px] py-[6px] border border-white/10 font-['Noto_Sans'] font-normal text-[12px] leading-[18px] text-white/70 hover:border-[#b58468] hover:text-[#b58468] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Sidebar CTA card with portrait */}
      <FadeIn delay={0.2}>
        <div className="relative overflow-hidden" style={{ background: '#452b1e' }}>
          {/* Background texture */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={imgSidebarBg}
              alt="Dra. Lidiane Sousa Araújo"
              className="absolute h-full max-w-none"
              style={{ left: '-70.19%', width: '222.22%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(22,19,18,0.8) 0%, transparent 60%)' }}
            />
          </div>
          {/* Portrait */}
          <div className="relative w-full" style={{ aspectRatio: '259/474' }}>
            <img
              src={imgSidebarBg}
              alt="Dra. Lidiane Sousa Araújo"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* CTA overlay */}
          <div className="relative bg-[#452b1e] px-[20px] py-[24px] -mt-[1px]">
            <div className="w-[170px] h-[32px] text-white mb-[8px]">
              <LidianeSousaAraujo />
            </div>
            <p className="font-['Noto_Sans'] font-normal text-[13px] leading-[18px] text-white/70 mb-[20px]">
              {readPanel('blog.sidebar.ctaDesc', 'OAB/DF 34.876 — Advogada especialista em Família, Imóveis e Homologação Internacional')}
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-[8px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
            >
              {readPanel('blog.sidebar.ctaText', 'Agendar Consulta')}
              <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </FadeIn>

    </aside>
  );
}

/* ─── Page Hero ─── */
function PageHero() {
  const heroTitle = readPanel('blog.hero.title', 'Blog');
  const heroSubtitle = readPanel('blog.hero.subtitle', 'Quem se informa, se protege');

  return (
    <section className="relative w-full h-[300px] md:h-[380px] lg:h-[440px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img alt="Blog e artigos jurídicos — Sousa Araújo Advocacia em Brasília" className="absolute inset-0 w-full h-full object-cover" src={imgHeroBg} />
        {/* Leve escurecimento geral */}
        <div className="absolute inset-0 bg-[#161312]/40" />
        {/* Gradiente do topo (semi-transparente para navbar) */}
        <div className="absolute inset-x-0 top-0 h-[120px]" style={{ background: 'linear-gradient(to bottom, rgba(22,19,18,0.55) 0%, transparent 100%)' }} />
        {/* Gradiente inferior forte (transição para conteúdo) */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg, rgba(22,19,18,0) 50%, rgb(22,19,18) 100%)' }} />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] h-full flex flex-col justify-end pb-[40px] md:pb-[60px]">
        <FadeIn>
          <p
            className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[26px] tracking-[-0.27px] text-[#a57255] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {heroSubtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-['Marcellus'] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[1.1] tracking-[-0.832px] text-white max-w-[820px]">
            {heroTitle}
          </h1>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Main Blog Page ─── */
export function BlogPage() {
  const [page, setPage] = useState(0);

  // Connect articles to panel
  const articleImages = [imgArticle1, imgArticle2, imgArticle3, imgArticle4, imgArticle5, imgArticle6];
  const panelArticles: Article[] = allArticles.map((a, i) => ({
    ...a,
    title: readPanel(`blog.article${i + 1}.title`, a.title),
    category: readPanel(`blog.article${i + 1}.category`, a.category),
    excerpt: readPanel(`blog.article${i + 1}.desc`, a.excerpt),
    day: readPanel(`blog.article${i + 1}.day`, a.day),
    month: readPanel(`blog.article${i + 1}.month`, a.month),
    fullDate: readPanel(`blog.article${i + 1}.fullDate`, a.fullDate),
    slug: readPanel(`blog.article${i + 1}.slug`, a.slug || ''),
  }));

  const totalPages = Math.ceil(panelArticles.length / ARTICLES_PER_PAGE);
  const displayed = panelArticles.slice(page * ARTICLES_PER_PAGE, (page + 1) * ARTICLES_PER_PAGE);

  return (
    <>
      <PageHero />

      <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[40px] lg:gap-[60px]">

            {/* Main column */}
            <div>
              <div className="space-y-[80px]">
                {displayed.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <FadeIn>
                  <div className="flex items-center justify-center gap-[12px] mt-[60px]">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setPage(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`w-[40px] h-[40px] flex items-center justify-center font-['Noto_Sans'] font-medium text-[14px] transition-colors ${
                          i === page
                            ? 'bg-[#a57255] text-white'
                            : 'border border-white/10 text-white/50 hover:border-[#a57255] hover:text-white'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-[100px]">
                <Sidebar />
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