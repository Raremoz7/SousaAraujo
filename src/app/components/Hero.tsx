import { useEffect, useRef } from 'react';
import { imgRectangle4 } from '../../imports/images';
import { PlayButton } from './ui/PlayButton';
import { usePanel } from '../hooks/usePanelContent';
import svgArrow from '../../imports/svg-od596xq1d5';
import LidianeSousaAraujo from '../../imports/LidianeSousaAraujo';

/**
 * Hero Component
 * Full-screen hero com imagem de fundo parallax e gradiente
 * Play button com efeito radial pulsante posicionado à esquerda
 * CTA outline com seta padrão do site
 */
export function Hero(props?: {
  backgroundImage?: string;
  subtitle?: string;
  title?: string;
  signature?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  const content = {
    backgroundImage: props?.backgroundImage || usePanel('home.hero.bgImage', imgRectangle4),
    subtitle: usePanel('home.hero.subtitle', props?.subtitle || 'A solução mais inteligente começa antes do processo'),
    title: usePanel('home.hero.title', props?.title || 'Escritório de advocacia em Brasília com atuação nacional e para brasileiros no exterior'),
    signature: usePanel('home.hero.signature', props?.signature || 'Lidiane Sousa Araújo'),
    videoUrl: usePanel('home.hero.videoUrl', props?.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    ctaText: usePanel('home.hero.ctaText', props?.ctaText || 'Agendar Consulta'),
    ctaHref: usePanel('home.hero.ctaHref', props?.ctaHref || '#contato'),
  };

  // Safety: if panel returned a raw 'figma:asset/...' string (not a valid URL), fall back to imported image
  const bgImage = content.backgroundImage.startsWith('figma:asset/') ? imgRectangle4 : content.backgroundImage;

  /* ─── Parallax effect ─── */
  const parallaxRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = parallaxRef.current;
    if (!img) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const rect = img.parentElement?.parentElement?.getBoundingClientRect();
          if (rect) {
            // Move image at 40% of scroll speed for parallax
            const offset = -rect.top * 0.4;
            img.style.transform = `translate3d(0, ${offset}px, 0)`;
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-[520px] h-screen max-h-[850px] overflow-hidden">
      {/* Background Image with Parallax + Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          ref={parallaxRef}
          alt="Escritório de advocacia em Brasília — Sousa Araújo Advocacia"
          className="absolute max-w-none object-cover object-[center_20%] w-full h-[130%] top-[-5%] will-change-transform"
          src={bgImage}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(210.536deg, rgba(22, 19, 18, 0) 33.101%, rgba(22, 19, 18, 0.7) 82.021%), linear-gradient(182.823deg, rgba(22, 19, 18, 0) 49.957%, rgb(22, 19, 18) 86.803%)"
          }}
        />
      </div>

      {/* Content Container — mobile-first com flexbox */}
      <div className="relative max-w-[1440px] mx-auto h-full flex flex-col justify-end px-[20px] md:px-[40px] lg:px-0 pb-[60px] md:pb-[80px] lg:pb-0 lg:block">

        {/* Subtitle */}
        <div className="lg:absolute lg:left-[81px] lg:top-[384px] mb-[16px] lg:mb-0">
          <p
            className="font-['Roboto'] font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[24px] lg:leading-[26px] tracking-[-0.95px] text-white max-w-[257px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {content.subtitle}
          </p>
        </div>

        {/* Main Title */}
        <div className="lg:absolute lg:left-[80px] lg:top-[437px] mb-[20px] lg:mb-0">
          <h1 className="font-['Marcellus'] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] leading-[34px] sm:leading-[42px] md:leading-[52px] lg:leading-[62px] tracking-[-0.87px] text-white max-w-[900px]">
            {content.title}
          </h1>
        </div>

        {/* Signature + CTA row */}
        <div className="lg:absolute lg:left-[81px] lg:top-[668px] flex items-center gap-[32px]">
          {/* SVG assinatura Lidiane Sousa Araújo */}
          <div className="w-[160px] lg:w-[200px] h-[30px] lg:h-[38px] text-white">
            <LidianeSousaAraujo />
          </div>

          {/* CTA Button — outline marrom 1.5px, fundo transparente, seta do site */}
          <a
            href={content.ctaHref}
            className="inline-flex items-center gap-[10px] px-[22px] py-[10px] border-[1.5px] border-[#a57255] bg-transparent text-white font-['Noto_Sans'] font-medium text-[13px] md:text-[14px] leading-[25px] tracking-[-0.225px] hover:bg-[#a57255]/10 transition-all duration-300 group"
          >
            <span>{content.ctaText}</span>
            <svg
              className="w-[10px] h-[10px] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[1px]"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path d={svgArrow.p1238f200} stroke="currentColor" strokeWidth="1.02093" />
            </svg>
          </a>
        </div>

        {/* Play Button — posicionado mais à esquerda, com pulse radial */}
        <div className="hidden lg:block absolute left-[1000px] top-[440px]">
          <PlayButton videoUrl={content.videoUrl} />
        </div>

        {/* Mobile Play Button */}
        <div className="lg:hidden mt-[24px]">
          <PlayButton size={80} videoUrl={content.videoUrl} />
        </div>
      </div>
    </section>
  );
}