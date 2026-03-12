import { useState } from 'react';
import { motion } from 'motion/react';
import { Contact } from '../components/Contact';
import { PlayButton } from '../components/ui/PlayButton';
import { readPanel } from '../hooks/usePanelContent';

/* ─── Images from Figma ─── */
import imgHeroBg  from 'figma:asset/f4055524b5d70eaefd66c7ff6f97bd21ce5739d1.png';
import imgVideo1  from 'figma:asset/9346a42e7477eb1ee3bca02820f0bd1d03362e6a.png';
import imgVideo2  from 'figma:asset/b6d4d8fd5a23bfafd55ed737639515ae2a9678d6.png';
import imgVideo3  from 'figma:asset/f919780634dcebfb98522182d1a622a904e92e1c.png';
import imgVideo4  from 'figma:asset/7d9d48b17642bfd1560d9af963da50ca64597cae.png';
import imgVideo5  from 'figma:asset/ebaadb496e0dd332168326162898a0dc2625533e.png';
import imgVideo6  from 'figma:asset/bba9b98207af961142aa7b6fdc3f47e7b6d4a280.png';
import imgVideo7  from 'figma:asset/a378ec088b55bf9acb776964f361fc10b84fde64.png';
import imgVideo8  from 'figma:asset/c384f55beb405894d8404b0e48841ea92161b830.png';
import imgVideo9  from 'figma:asset/4e0368effa05e19184d3051ff856b436790a646f.png';

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

/* ─── Video Data ─── */
interface Video {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

const allVideos: Video[] = [
  {
    id: 1,
    image: imgVideo1,
    category: 'Homologação de Sentença Estrangeira',
    title: 'Homologação de Sentença Estrangeira',
    description:
      'Vendeu no Brasil uma decisão obtida no exterior. Saiba como o Brasil reconhece sentenças estrangeiras e o que você precisa fazer para que valham aqui.',
  },
  {
    id: 2,
    image: imgVideo2,
    category: 'Regularização de Imóveis',
    title: 'Regularização de Imóvel sem Escritura — Usucapião',
    description:
      'Muitos imóveis no Brasil não têm escritura, bloqueando financiamento, venda e herança. Entenda os caminhos para regularizar extrajudicialmente no cartório ou via ação judicial.',
  },
  {
    id: 3,
    image: imgVideo3,
    category: 'Divórcio',
    title: 'Divórcio Consensual e Litigioso',
    description:
      'Conheça as diferenças entre divórcio consensual e litigioso, os documentos necessários, prazos estimados e como proteger seus filhos e seu patrimônio durante o processo.',
  },
  {
    id: 4,
    image: imgVideo4,
    category: 'Homologação de Sentença Consular',
    title: 'Homologação de Sentença Consular',
    description:
      'Existe uma rota alternativa para homologar decisões em países com convênio com o Brasil. Saiba quando ela se aplica e quais são as vantagens em prazo e custo.',
  },
  {
    id: 5,
    image: imgVideo5,
    category: 'Regularização de Imóvel sem Escritura — Usucapião',
    title: 'Regularização de Imóvel sem Escritura — Usucapião',
    description:
      'Imóvel herdado sem registro, comprado "de boca" ou por contrato de gaveta? Neste vídeo mostramos como identificar o melhor caminho e os documentos que você precisa reunir.',
  },
  {
    id: 6,
    image: imgVideo6,
    category: 'Divórcio Consensual e Litigioso',
    title: 'Divórcio Consensual e Litigioso',
    description:
      'Quando o casal não chega a um acordo, o divórcio litigioso pode se tornar longo e custoso. Conheça as estratégias para reduzir conflito e proteger o que importa — principalmente os filhos.',
  },
  {
    id: 7,
    image: imgVideo7,
    category: 'Direito de Família',
    title: 'Planejamento Patrimonial antes do Casamento',
    description:
      'O regime de bens escolhido no casamento define o que acontece com seu patrimônio em caso de separação ou falecimento. Entenda as diferenças e como proteger o que você construiu.',
  },
  {
    id: 8,
    image: imgVideo8,
    category: 'Direito Imobiliário',
    title: 'Inventário Imobiliário: como destravar a herança',
    description:
      'Imóvel sem inventário não pode ser vendido ou transferido. Veja o passo a passo do inventário extrajudicial — mais rápido e barato — e quando o judicial é necessário.',
  },
  {
    id: 9,
    image: imgVideo9,
    category: 'Empresarial',
    title: 'Proteção Patrimonial para Empresários',
    description:
      'Como estruturar seu patrimônio pessoal de forma a protegê-lo de riscos empresariais? Estratégias jurídicas para quem tem empresa e quer manter a segurança do que é pessoal.',
  },
];

const BATCH_SIZE = 6;

/* ─── Video Card ─── */
function VideoCard({ video, index }: { video: Video; index: number }) {
  const title = readPanel(`vidpage.video${video.id}.title`, video.title);
  const desc = readPanel(`vidpage.video${video.id}.desc`, video.description);

  return (
    <FadeIn delay={(index % 3) * 0.1}>
      <div className="group cursor-pointer">
        {/* Thumbnail — texto sobreposto dentro da imagem */}
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: '72%' }}>
          <img
            src={video.image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradiente escuro na base para legibilidade do texto */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(180.625deg, rgba(102,102,102,0) 14.869%, rgba(0,0,0,0.82) 99.159%), linear-gradient(90deg, rgba(22,19,18,0.15) 0%, rgba(22,19,18,0.15) 100%)' }}
          />
          {/* Play Button centrado */}
          <PlayButton />
          {/* Category badge */}
          <div className="absolute top-[12px] left-[12px]">
            <span
              className="font-['Roboto'] text-[11px] tracking-[-0.165px] text-white bg-[#a57255]/80 px-[10px] py-[4px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {video.category}
            </span>
          </div>
          {/* Texto sobreposto na base */}
          <div className="absolute bottom-0 left-0 right-0 px-[18px] md:px-[22px] pb-[18px] md:pb-[22px]">
            <h3
              className="font-['Noto_Sans'] font-medium text-[13px] md:text-[15px] leading-[20px] md:leading-[22px] tracking-[-0.195px] text-white mb-[6px] md:mb-[8px]"
            >
              {title}
            </h3>
            <p
              className="font-['Noto_Sans'] font-normal text-[11px] md:text-[12px] leading-[17px] md:leading-[18px] tracking-[-0.165px] text-white/75 line-clamp-3"
            >
              {desc}
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Page Hero ─── */
function PageHero() {
  const heroTitle = readPanel('vidpage.hero.title', 'Vídeos Educativos: Entenda Antes de Decidir');
  const heroDesc = readPanel('vidpage.hero.desc', 'Conteúdo jurídico gratuito para ajudar você a tomar decisões mais seguras — antes mesmo de contratar um advogado.');

  return (
    <section className="relative w-full min-h-[440px] lg:h-[580px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img alt="Vídeos educativos sobre direito — Sousa Araújo Advocacia" className="absolute inset-0 w-full h-full object-cover object-center" src={imgHeroBg} />
        {/* Leve escurecimento geral */}
        <div className="absolute inset-0 bg-[#161312]/40" />
        {/* Gradiente do topo (semi-transparente para navbar) */}
        <div
          className="absolute inset-x-0 top-0 h-[120px]"
          style={{ background: 'linear-gradient(to bottom, rgba(22,19,18,0.55) 0%, transparent 100%)' }}
        />
        {/* Gradiente de transição para cor sólida na base */}
        <div
          className="absolute inset-x-0 bottom-0 h-[220px] md:h-[260px]"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(22,19,18,0.75) 40%, rgb(22,19,18) 100%)' }}
        />
      </div>
      <div className="relative max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] h-full flex flex-col justify-end pb-[60px] md:pb-[80px] pt-[130px]">
        <FadeIn>
          <h1 className="font-['Marcellus'] text-[32px] sm:text-[42px] md:text-[54px] lg:text-[64px] leading-[1.1] tracking-[-0.832px] text-white max-w-[780px]">
            {heroTitle.includes(':') ? (
              <>{heroTitle.split(':')[0]}:{' '}<span className="block">{heroTitle.split(':')[1]?.trim()}</span></>
            ) : heroTitle}
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p
            className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[26px] tracking-[-0.27px] text-white/80 mt-6 max-w-[520px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {heroDesc}
          </p>
        </FadeIn>

        {/* Play Button */}
        <div className="hidden lg:block absolute right-[110px] bottom-[80px]">
          <PlayButton size={100} />
        </div>
      </div>
    </section>
  );
}

/* ─── Videos Grid ─── */
function VideosGrid() {
  const [visible, setVisible] = useState(BATCH_SIZE);
  const hasMore = visible < allVideos.length;

  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] md:gap-[32px] lg:gap-[30px]">
          {allVideos.slice(0, visible).map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <FadeIn delay={0.2}>
            <div className="flex justify-center mt-[50px] md:mt-[60px] lg:mt-[80px]">
              <button
                onClick={() => setVisible((prev) => Math.min(prev + BATCH_SIZE, allVideos.length))}
                className="inline-flex items-center gap-3 font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] border border-white/30 hover:border-[#a57255] transition-colors px-[32px] h-[46px]"
              >
                Carregar mais
                <svg className="w-[10px] h-[10px]" fill="none" viewBox="0 0 10 10">
                  <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>
          </FadeIn>
        )}

        {!hasMore && (
          <FadeIn delay={0.1}>
            <div className="flex justify-center mt-[50px] md:mt-[60px]">
              <p className="font-['Noto_Sans'] text-[14px] text-white/40">
                Todos os vídeos foram carregados
              </p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ─── Page ─── */
export function VideosEducativosPage() {
  return (
    <>
      <PageHero />
      <VideosGrid />
      <Contact />
    </>
  );
}