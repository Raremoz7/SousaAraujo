/**
 * ServiceTemplate — Shared template for all practice area / service pages
 * Following the exact structure of HomologacaoPage
 */

import { useState, useRef, useCallback, createContext, useContext } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { PlayButton } from './ui/PlayButton';
import { Contact } from './Contact';
import { readPanel } from '../hooks/usePanelContent';
import { trackCtaClick } from './PainelDashboard';

/* ─── SVG icons from Homologação ─── */
import svgPaths from '../../imports/svg-6m3rhq93hc';
import { imgG4831 } from '../../imports/svg-vm94k';

/* ─── Arrow path (reused across all CTAs) ─── */
const ARROW_PATH = "M19.1609 0V0.220558L19.1825 0.24226H19.4661V18.8519H18.9411V0.856491L0.370449 19.4661L0.185224 19.2794L0 19.0921L18.5264 0.527421H0.29164V0H19.1609Z";

/* ─── CTA Track Context ─── */
const TrackKeyCtx = createContext('');

/* ─── Types ─── */
export interface ServiceData {
  hero: {
    title: string;
    highlightedTitle?: string;
    subtitle: string;
    image: string;
    ctaText?: string;
    maxWidth?: string;
  };
  trust: {
    features: string[];
    title: string;
    body: string;
  };
  parallaxImage: string;
  metodo: {
    title: string;
    steps: { label: string; desc: string }[];
    image: string;
  };
  scenarios: {
    title: string;
    items: string[];
    ctaSubtitle: string;
    risksTitle: string;
    risks: string[];
    deepDives: { title: string; text: string }[];
    stickyImage: string;
    stickyAlt: string;
  };
  onlineBanner: string;
  passoAPasso: {
    id: number;
    number: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  riscoBanner: string;
  objecoes: { q: string; a: string }[];
  costCta: {
    title: string;
    bgImage: string;
  };
  whyTrust: {
    trustItems: string[];
    consultaItems: string[];
    lidianeImage: string;
  };
  historias: {
    title: string;
    items: {
      id: number;
      img: string;
      alt: string;
      subtitle: string;
      body: string;
    }[];
  };
  faqItems: { q: string; a: string }[];
  ctaText?: string;
}

/* ─── Icon components ─── */
function IconGlobe() {
  return (
    <svg fill="none" viewBox="0 0 70.9044 70.9044" className="w-full h-full">
      <path d={svgPaths.p27f46000} fill="#B58468" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg fill="none" viewBox="0 0 67.9085 67.9085" className="w-full h-full">
      <g clipPath="url(#folderClipTpl)">
        <path d={svgPaths.p382e2f00} fill="#B58468" />
        <path d={svgPaths.p1ffc9480} fill="#B58468" />
        <path d={svgPaths.p68f4000} fill="#B58468" />
        <path d={svgPaths.pcbc0200} fill="#B58468" />
        <path d={svgPaths.p322cc600} fill="#B58468" />
        <path d={svgPaths.pd46ad00} fill="#B58468" />
        <path d={svgPaths.p14c80f00} fill="#B58468" />
      </g>
      <defs>
        <clipPath id="folderClipTpl">
          <rect fill="white" height="67.9085" width="67.9085" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconBalance() {
  return (
    <div className="relative size-full overflow-hidden">
      <div className="absolute flex items-center justify-center" style={{ inset: '20.97% 44.36% 35.48% 45.97%' }}>
        <div className="flex-none" style={{ width: '8.36px', height: '41.81px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-26.322px -6.194px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-26.322px -6.194px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29032 41.8065"><path d={svgPaths.pef9f880} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '14.52% 43.55% 74.19% 45.16%' }}>
        <div className="flex-none" style={{ width: '10.84px', height: '10.84px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-25.548px 0px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-25.548px 0px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.8387 10.8387"><path d={svgPaths.p385f06f0} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '79.03% 20.16% 15.32% 45.16%' }}>
        <div className="flex-none" style={{ width: '33.29px', height: '5.42px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-25.548px -61.936px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-25.548px -61.936px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.2903 5.41939"><path d={svgPaths.pef66000} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '20.97% 70.16% 52.42% 20.16%' }}>
        <div className="flex-none" style={{ width: '9.29px', height: '25.55px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-1.548px -6.194px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-1.548px -6.194px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29032 25.5484"><path d={svgPaths.p23614f00} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '20.97% 27.42% 52.42% 62.1%' }}>
        <div className="flex-none" style={{ width: '10.06px', height: '25.55px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-41.807px -6.194px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-41.807px -6.194px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0645 25.5484"><path d={svgPaths.peca7780} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '45.16% 61.29% 46.77% 17.74%' }}>
        <div className="flex-none" style={{ width: '20.13px', height: '7.74px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-41.032px -29.419px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-41.032px -29.419px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.129 7.74197"><path d={svgPaths.p19779000} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '45.16% 17.74% 46.77% 61.29%' }}>
        <div className="flex-none" style={{ width: '20.13px', height: '7.74px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '0px -29.419px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '0px -29.419px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.129 7.74197"><path d={svgPaths.p26899880} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '58.06% 19.35% 21.77% 26.61%' }}>
        <div className="flex-none" style={{ width: '51.87px', height: '19.36px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-7.742px -41.807px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-7.742px -41.807px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.871 19.3549"><path d={svgPaths.p1d947d80} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '16.94% 52.42% 76.61% 22.58%' }}>
        <div className="flex-none" style={{ width: '24px', height: '6.19px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-3.871px -2.323px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-3.871px -2.323px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 6.19358"><path d={svgPaths.p129bd000} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center" style={{ inset: '16.94% 20.97% 76.61% 54.03%' }}>
        <div className="flex-none" style={{ width: '24px', height: '6.19px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-34.064px -2.323px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-34.064px -2.323px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 6.19358"><path d={svgPaths.p1cd8d300} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared UI components ─── */
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

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="border-t border-[#e0dede]/30">
      {items.map((item, i) => (
        <div key={i} className="border-b border-[#e0dede]/30">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between py-[22px] md:py-[26px] text-left gap-4"
          >
            <span className="font-['Noto_Sans'] text-[16px] md:text-[18px] leading-[1.4] tracking-[-0.27px] text-white">{item.q}</span>
            <svg className={`w-[14px] h-[14px] shrink-0 text-[#a57255] transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 14 14">
              <path d="M7 0.875V13.125M0.875 7H13.125" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="font-['Roboto'] text-[15px] leading-[23px] tracking-[-0.225px] text-white/70 pb-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function AccordionArrow({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.4533 51.4167">
        <g>
          <path d="M0.707141 50.7096L50.7096 0.707141" stroke="white" strokeWidth="2.0001" />
          <path d="M0.99425 1.1632H50.4537" stroke="white" strokeWidth="2.0001" />
          <path d="M50.4532 50.4085V0.949084" stroke="white" strokeWidth="2.0001" />
        </g>
      </svg>
    </div>
  );
}

function CtaButtonPixel({ label }: { label: string }) {
  const tk = useContext(TrackKeyCtx);
  return (
    <a
      href="#contato"
      onClick={() => tk && trackCtaClick(tk)}
      className="group inline-flex items-center gap-[14px] border border-[#a57255] hover:bg-[#a57255]/10 transition-colors h-[49px] px-[22px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white shrink-0"
    >
      {label}
      <svg fill="none" viewBox="0 0 10 10" className="w-[10px] h-[10px] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
        <path d="M0.360346 9.59673L9.48745 0.500255M0.411392 0.510465H9.47724M9.49766 9.39255V0.500255" stroke="white" strokeWidth="1.02093" />
      </svg>
    </a>
  );
}

function CtaButtonInline({ label }: { label: string }) {
  const tk = useContext(TrackKeyCtx);
  return (
    <a
      href="#contato"
      onClick={() => tk && trackCtaClick(tk)}
      className="group inline-flex items-center gap-[14px] border border-[#a57255] hover:bg-[#a57255]/10 transition-colors h-[49px] px-[22px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white"
    >
      {label}
      <svg fill="none" viewBox="0 0 10 10" className="w-[10px] h-[10px] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
        <path d="M0.360346 9.59673L9.48745 0.500255M0.411392 0.510465H9.47724M9.49766 9.39255V0.500255" stroke="white" strokeWidth="1.02093" />
      </svg>
    </a>
  );
}

const EASE_EXPAND = [0.22, 0.61, 0.36, 1] as const;

/* ─── Section components ─── */

function PageHero({ data }: { data: ServiceData }) {
  const { hero } = data;
  const ctaLabel = hero.ctaText || data.ctaText || 'Agendar Consulta de Viabilidade';
  const tk = useContext(TrackKeyCtx);
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[720px] lg:min-h-[800px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img src={hero.image} alt={`${hero.title} — Sousa Araújo Advocacia`} className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180.958deg, rgba(22,19,18,0) 38%, rgb(22,19,18) 96%)' }} />
        <div className="absolute inset-x-0 top-0 h-[120px]" style={{ background: 'linear-gradient(to bottom, rgba(22,19,18,0.55) 0%, transparent 100%)' }} />
      </div>
      <div className="relative max-w-[1440px] mx-auto px-[110px] pt-[365px] pb-[12px]">
        <FadeIn>
          <h1 className="font-['Marcellus'] text-[36px] sm:text-[46px] md:text-[54px] lg:text-[58px] leading-[1.15] tracking-[-0.87px] text-white mb-[24px]" style={{ maxWidth: hero.maxWidth || '820px' }}>
            {hero.title}
            {hero.highlightedTitle && <>{' '}<span className="text-[#a57255]">{hero.highlightedTitle}</span></>}
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="font-['Roboto'] font-bold text-[18px] md:text-[20px] leading-[25px] text-white max-w-[732px] mb-[32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {hero.subtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <a href="#contato" aria-label="Agendar consulta de viabilidade" onClick={() => tk && trackCtaClick(tk)} className="group inline-flex items-center gap-[14px] border border-[#a57255] hover:bg-[#a57255]/10 transition-colors h-[49px] px-[22px] font-['Noto_Sans'] font-medium text-[15px] text-white tracking-[-0.225px]">
            {ctaLabel}
            <svg fill="none" viewBox="0 0 10 10" className="w-[10px] h-[10px] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <path d="M0.360346 9.59673L9.48745 0.500255M0.411392 0.510465H9.47724M9.49766 9.39255V0.500255" stroke="white" strokeWidth="1.02093" />
            </svg>
          </a>
        </FadeIn>

        {/* Play Button */}
        <div className="hidden lg:block absolute right-[110px] top-[365px]">
          <PlayButton size={100} />
        </div>
      </div>
    </section>
  );
}

function TrustSection({ data }: { data: ServiceData }) {
  const { trust } = data;
  const ctaLabel = data.ctaText || 'Agendar Consulta de Viabilidade';
  const features = [
    { icon: <IconGlobe />, size: 'size-[72px]', text: trust.features[0] },
    { icon: <IconFolder />, size: 'size-[68px]', text: trust.features[1] },
    { icon: <IconBalance />, size: 'size-[80px]', text: trust.features[2] },
  ];

  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[80px] items-center">
          <FadeIn>
            <div className="flex flex-col gap-[36px] md:gap-[44px]">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-[24px] md:gap-[28px]">
                  <div className={`shrink-0 ${f.size}`}>{f.icon}</div>
                  <p className="font-['Noto_Sans'] font-medium text-[18px] md:text-[21px] leading-[25px] tracking-[-0.4194px] text-white">{f.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <div className="flex flex-col gap-[28px] md:gap-[36px]">
            <FadeIn delay={0.1}>
              <h2 className="font-['Lora'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white">{trust.title}</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-['Noto_Sans'] text-[16px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white">{trust.body}</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <CtaButtonInline label={ctaLabel} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParallaxSection({ data }: { data: ServiceData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 45vw, 580px)' }}>
      <motion.div className="absolute inset-x-0 w-full" style={{ y, top: '-18%', bottom: '-18%' }}>
        <img src={data.parallaxImage} alt="Atendimento jurídico especializado — Sousa Araújo Advocacia em Brasília" className="w-full h-full object-cover object-center" />
      </motion.div>
    </div>
  );
}

function MetodoSaaSection({ data }: { data: ServiceData }) {
  const { metodo } = data;
  const ctaLabel = data.ctaText || 'Agendar Consulta de Viabilidade';
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-16%', '16%']);

  return (
    <section ref={ref} className="bg-[#161312] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-[20px] md:px-[40px] lg:px-[110px] py-[60px] md:py-[80px] lg:py-[100px] flex flex-col gap-[40px] lg:gap-[48px]">
          <FadeIn>
            <h2 className="font-['Lora'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[566px]">{metodo.title}</h2>
          </FadeIn>
          <div className="flex flex-col gap-[32px] md:gap-[40px]">
            {metodo.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border-t border-white/15 pt-[24px]">
                  <p className="font-['Noto_Sans'] font-medium text-[#a57255] text-[18px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.42px] mb-[12px]">{step.label}</p>
                  {step.desc.split('\n').map((line, j) => (
                    <p key={j} className="font-['Noto_Sans'] text-[15px] md:text-[16px] leading-[23px] tracking-[-0.225px] text-white mb-[4px]">{line}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <CtaButtonInline label={ctaLabel} />
          </FadeIn>
        </div>
        <div className="relative overflow-hidden min-h-[420px] lg:min-h-0">
          <motion.div className="absolute inset-x-0 w-full" style={{ y, top: '-16%', bottom: '-16%' }}>
            <img src={metodo.image} alt={`Método SAA — ${metodo.title}`} className="w-full h-full object-cover object-center" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScenariosSection({ data }: { data: ServiceData }) {
  const { scenarios } = data;
  const ctaLabel = data.ctaText || 'Agendar Consulta de Viabilidade';

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Sticky photo */}
        <div className="hidden lg:block relative lg:order-1">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img src={scenarios.stickyImage} alt={scenarios.stickyAlt} className="w-full h-full object-cover object-center" />
          </div>
        </div>

        <div className="bg-[#262626] px-[20px] md:px-[40px] lg:px-[68px] py-[60px] md:py-[80px] lg:py-[100px] flex flex-col gap-[48px] lg:gap-[60px] lg:order-2">
          {/* Cenários */}
          <div>
            <FadeIn>
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white mb-[40px]">{scenarios.title}</h2>
            </FadeIn>
            <div className="flex flex-col gap-[20px] md:gap-[24px] mb-[40px]">
              {scenarios.items.map((s, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="flex items-start gap-[24px]">
                    <span className="font-['Lora'] text-[52px] md:text-[64px] leading-[1] text-[#a57255] shrink-0 w-[32px]">{i + 1}</span>
                    <p className="font-['Roboto'] text-[16px] md:text-[18px] lg:text-[20px] leading-[1.45] tracking-[-0.42px] text-white pt-[8px]" style={{ fontVariationSettings: "'wdth' 100" }}>{s}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <p className="font-['Roboto'] font-bold text-[18px] md:text-[20px] leading-[25px] text-white mb-[28px]" style={{ fontVariationSettings: "'wdth' 100" }}>{scenarios.ctaSubtitle}</p>
              <CtaButtonInline label={ctaLabel} />
            </FadeIn>
          </div>

          <div className="border-t border-white/10" />

          {/* Pontos de Atenção */}
          <div>
            <FadeIn>
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white mb-[32px]">{scenarios.risksTitle}</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h3 className="font-['Noto_Sans'] font-medium text-[#a57255] text-[20px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.42px] mb-[16px]">O Que Está em Risco Se Você Não Resolver</h3>
              <ul className="flex flex-col gap-[14px] mb-[40px]">
                {scenarios.risks.map((r, i) => (
                  <li key={i} className="flex items-start gap-[10px]">
                    <span className="text-[#a57255] shrink-0 mt-[3px]">•</span>
                    <p className="font-['Noto_Sans'] text-[15px] md:text-[16px] leading-[23px] tracking-[-0.225px] text-white">{r}</p>
                  </li>
                ))}
              </ul>
            </FadeIn>
            <div className="flex flex-col gap-[36px] md:gap-[44px]">
              {scenarios.deepDives.map((d, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="border-t border-white/10 pt-[24px]">
                    <h3 className="font-['Noto_Sans'] font-medium text-[#a57255] text-[20px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.42px] mb-[12px]">{d.title}</h3>
                    <p className="font-['Noto_Sans'] text-[15px] md:text-[16px] leading-[23px] tracking-[-0.225px] text-white">{d.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <div className="mt-[40px]">
                <CtaButtonInline label={ctaLabel} />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function OnlineBanner({ data }: { data: ServiceData }) {
  const ctaLabel = data.ctaText || 'Agendar Consulta de Viabilidade';
  const tk = useContext(TrackKeyCtx);
  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] text-center">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[997px] mx-auto mb-[32px]">{data.onlineBanner}</h2>
          <a href="#contato" onClick={() => tk && trackCtaClick(tk)} className="group inline-flex items-center gap-[14px] border border-[#a57255] hover:bg-[#a57255]/10 transition-colors h-[49px] px-[22px] font-['Noto_Sans'] font-medium text-[15px] text-white tracking-[-0.225px]">
            {ctaLabel}
            <svg fill="none" viewBox="0 0 10 10" className="w-[10px] h-[10px] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <path d="M0.360346 9.59673L9.48745 0.500255M0.411392 0.510465H9.47724M9.49766 9.39255V0.500255" stroke="white" strokeWidth="1.02093" />
            </svg>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function ComoFuncionaSection({ data }: { data: ServiceData }) {
  const [expanded, setExpanded] = useState<number>(1);
  const handleClick = useCallback((id: number) => { if (id !== expanded) setExpanded(id); }, [expanded]);
  const ctaLabel = data.ctaText || 'Agendar Consulta de Viabilidade';

  return (
    <section className="bg-[#161312] w-full my-[50px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[113px]">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[40px] md:mb-[60px]">Como Funciona — Passo a Passo</h2>
        </FadeIn>
        {data.passoAPasso.map((step) => (
          <div key={step.id}>
            <button type="button" onClick={() => handleClick(step.id)} className="w-full flex items-center h-[100px] md:h-[120px] lg:h-[150px] cursor-pointer group text-left">
              <span className="font-['Lora'] font-normal text-[48px] md:text-[56px] lg:text-[70px] leading-[42px] tracking-[-0.832px] text-white flex-shrink-0 w-[72px] md:w-[95px] lg:w-[120px] select-none">{step.number}</span>
              <span className="font-['Roboto'] font-normal text-[22px] md:text-[26px] lg:text-[32px] leading-[42px] tracking-[-0.832px] text-white flex-1 ml-[20px] lg:ml-[42px] group-hover:text-[#a57255] transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>{step.title}</span>
              <motion.div className="w-[40px] h-[40px] md:w-[46px] md:h-[46px] lg:w-[51px] lg:h-[51px] flex-shrink-0" animate={{ rotate: expanded === step.id ? 180 : 0 }} transition={{ duration: 0.65, ease: EASE_EXPAND as unknown as number[] }}>
                <AccordionArrow className="w-full h-full" />
              </motion.div>
            </button>
            <div className="w-full h-px bg-[#a57255]/40" />
            <AnimatePresence initial={false}>
              {expanded === step.id && (
                <motion.div key={`panel-${step.id}`} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ height: { duration: 0.8, ease: EASE_EXPAND as unknown as number[] } }} className="overflow-hidden">
                  <div className="pt-[40px] pb-[60px] lg:pt-[50px] lg:pb-[90px] max-w-[760px]">
                    <motion.h3 className="font-['Roboto'] font-normal text-[20px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.525px] text-[#a57255] mb-[16px]" style={{ fontVariationSettings: "'wdth' 100" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, delay: 0.22 }}>{step.subtitle}</motion.h3>
                    <motion.p className="font-['Noto_Sans'] text-[16px] md:text-[18px] lg:text-[20px] leading-[28px] md:leading-[30px] tracking-[-0.225px] text-white mb-[28px]" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, delay: 0.3 }}>{step.description}</motion.p>
                    <motion.a href="#contato" className="inline-flex items-center gap-[8px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group/link" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.38 }}>
                      {ctaLabel}
                      <svg className="w-[10px] h-[10px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 10 10">
                        <path d="M0.360346 9.59673L9.48745 0.500255M0.411392 0.510465H9.47724M9.49766 9.39255V0.500255" stroke="currentColor" strokeWidth="1.02093" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

function RiscoCtaBanner({ data }: { data: ServiceData }) {
  const ctaLabel = data.ctaText || 'Agendar Consulta de Viabilidade';
  return (
    <section className="bg-[#452b1e]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[32px] lg:gap-[60px] py-[48px] lg:py-0" style={{ minHeight: '197px' }}>
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[24px] md:text-[32px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[733px]">{data.riscoBanner}</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <CtaButtonPixel label={ctaLabel} />
        </FadeIn>
      </div>
    </section>
  );
}

function ObjecoesSection({ data }: { data: ServiceData }) {
  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[60px] lg:gap-[80px]">
          <FadeIn>
            <div className="lg:sticky lg:top-[100px]">
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] tracking-[-0.516px] text-white mb-[16px]">Dúvidas e Objeções Mais Comuns</h2>
              <p className="font-['Noto_Sans'] text-[16px] md:text-[18px] leading-[25px] tracking-[-0.225px] text-white/70">Reunimos as dúvidas mais comuns dos nossos clientes, organizadas por tema. Se a sua pergunta não estiver aqui, entre em contato — a Sousa Araújo Advocacia responde com agilidade e transparência.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Accordion items={data.objecoes} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function CostCtaBanner({ data }: { data: ServiceData }) {
  const { costCta } = data;
  const ctaLabel = data.ctaText || 'Agendar Consulta de Viabilidade';
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(320px, 38vw, 543px)' }}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img src={costCta.bgImage} alt="Advocacia de resultados — agende sua consulta com a Sousa Araújo" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-[rgba(22,19,18,0.4)]" />
      </div>
      <div className="relative flex flex-col items-center justify-center gap-[32px] md:gap-[40px] px-[20px] text-center h-full py-[80px] md:py-[100px] lg:py-[120px]">
        <FadeIn>
          <h2 className="font-['Lora'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[567px]">{costCta.title}</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <CtaButtonPixel label={ctaLabel} />
        </FadeIn>
      </div>
    </section>
  );
}

function WhyTrustSection({ data }: { data: ServiceData }) {
  const { whyTrust } = data;
  const ctaLabel = data.ctaText || 'Agendar Consulta de Viabilidade';

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img src={whyTrust.lidianeImage} alt="Dra. Lidiane Sousa Araújo" className="absolute h-full max-w-none top-0" style={{ left: '-70.19%', width: '222.22%' }} />
          </div>
        </div>
        <div className="bg-[#262626] px-[20px] md:px-[40px] lg:px-[70px] py-[60px] md:py-[80px] lg:py-[100px] flex flex-col gap-[56px] lg:gap-[72px]">
          <FadeIn>
            <div className="flex flex-col gap-[32px]">
              <h2 className="font-['Marcellus'] text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.516px] text-[#a57255]">Por Que Clientes Confiam na Sousa Araújo Advocacia</h2>
              <ul className="flex flex-col gap-[14px] font-['Noto_Sans'] text-[17px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white list-disc pl-[27px]">
                {whyTrust.trustItems.map((item, i) => (<li key={i}>{item}</li>))}
              </ul>
              <CtaButtonPixel label={ctaLabel} />
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="flex flex-col gap-[32px]">
              <h2 className="font-['Marcellus'] text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.516px] text-[#a57255]">O que você recebe na Consulta de Viabilidade:</h2>
              <ul className="flex flex-col gap-[10px] font-['Noto_Sans'] text-[17px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white list-disc pl-[27px]">
                {whyTrust.consultaItems.map((item, i) => (<li key={i}>{item}</li>))}
              </ul>
              <CtaButtonPixel label={ctaLabel} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function HistoriasSection({ data }: { data: ServiceData }) {
  const { historias } = data;
  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.2] lg:leading-[52px] tracking-[-0.516px] text-white mb-[48px] md:mb-[64px] max-w-[456px]">{historias.title}</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[36px] md:gap-[38px]">
          {historias.items.map((h, i) => (
            <FadeIn key={h.id} delay={i * 0.1}>
              <div className="flex flex-col gap-[20px]">
                <div className="overflow-hidden w-full" style={{ aspectRatio: '409.86 / 249.13' }}>
                  <img src={h.img} alt={h.alt} className="w-[calc(100%+23.2px)] h-[calc(100%+14.1px)] max-w-none object-cover -ml-[11.6px] -mt-[7.05px]" />
                </div>
                <p className="font-['Roboto'] text-[18px] md:text-[20px] lg:text-[25px] leading-[1.2] lg:leading-[30px] tracking-[-0.525px] text-[#a57255]">{h.subtitle}</p>
                <p className="font-['Noto_Sans'] text-[13px] leading-[18px] tracking-[-0.195px] text-white">{h.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ data }: { data: ServiceData }) {
  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[60px] lg:gap-[80px]">
          <FadeIn>
            <div className="lg:sticky lg:top-[100px]">
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] tracking-[-0.516px] text-white">FAQ</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Accordion items={data.faqItems} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Template Component ─── */
export function ServiceTemplate({ data, panelId }: { data: ServiceData; panelId?: string }) {
  // Merge panel overrides into data when panelId is provided
  const d = panelId ? applyPanelOverrides(data, panelId) : data;
  const trackKey = panelId?.replace('lp-', '') || '';

  return (
    <TrackKeyCtx.Provider value={trackKey}>
      <PageHero data={d} />
      <TrustSection data={d} />
      <ParallaxSection data={d} />
      <MetodoSaaSection data={d} />
      <ScenariosSection data={d} />
      <OnlineBanner data={d} />
      <ComoFuncionaSection data={d} />
      <RiscoCtaBanner data={d} />
      <ObjecoesSection data={d} />
      <CostCtaBanner data={d} />
      <WhyTrustSection data={d} />
      <HistoriasSection data={d} />
      <FaqSection data={d} />
      <Contact />
    </TrackKeyCtx.Provider>
  );
}

/* ─── Panel Override Helper ─── */
function p(panelId: string, key: string, fallback: string): string {
  return readPanel(`${panelId}.${key}`, fallback);
}

/**
 * Panel override for IMAGE fields only.
 * Only uses the panel value if it's a user-provided URL (Supabase Storage,
 * Unsplash, user CDN, etc.). Rejects stale auto-seeded URLs that may have
 * expired across Figma Make rebuilds.
 *
 * Strategy: the fallback (from the fresh figma:asset import) is ALWAYS the
 * most reliable source. We only override it with a panel value that we're
 * confident was explicitly set by the user — which means Supabase Storage
 * signed URLs (from our upload system) or URLs from well-known permanent hosts.
 */
function pImg(panelId: string, key: string, fallback: string): string {
  const val = readPanel(`${panelId}.${key}`, fallback);
  // If readPanel returned the fallback, use it directly (no panel override exists)
  if (val === fallback) return fallback;
  // Accept Supabase Storage signed URLs (uploaded via our panel)
  if (val.includes('supabase.co/storage')) return val;
  // Accept well-known permanent image hosts
  if (val.includes('unsplash.com') || val.includes('cloudinary.com') || val.includes('imgur.com')) return val;
  // Accept data URIs
  if (val.startsWith('data:image/')) return val;
  // For any other URL: compare with the fallback. If the fallback is a real URL
  // (resolved figma:asset), the panel value is likely a stale copy → prefer fallback
  if (fallback && fallback.startsWith('http')) return fallback;
  // If fallback is not a URL (e.g. empty), accept the panel value
  if (val.startsWith('http')) return val;
  return fallback;
}

function applyPanelOverrides(data: ServiceData, id: string): ServiceData {
  return {
    ...data,
    hero: {
      ...data.hero,
      title: p(id, 'hero.title', data.hero.title),
      highlightedTitle: data.hero.highlightedTitle ? p(id, 'hero.highlightedTitle', data.hero.highlightedTitle) : undefined,
      subtitle: p(id, 'hero.subtitle', data.hero.subtitle),
      image: pImg(id, 'hero.image', data.hero.image),
      ctaText: p(id, 'hero.ctaText', data.hero.ctaText || ''),
      maxWidth: data.hero.maxWidth,
    },
    trust: {
      features: [
        p(id, 'trust.feature1', data.trust.features[0]),
        p(id, 'trust.feature2', data.trust.features[1]),
        p(id, 'trust.feature3', data.trust.features[2]),
      ],
      title: p(id, 'trust.title', data.trust.title),
      body: p(id, 'trust.body', data.trust.body),
    },
    parallaxImage: pImg(id, 'parallax.image', data.parallaxImage),
    metodo: {
      title: p(id, 'metodo.title', data.metodo.title),
      image: pImg(id, 'metodo.image', data.metodo.image),
      steps: data.metodo.steps.map((s, i) => ({
        label: p(id, `metodo.step${i+1}.label`, s.label),
        desc: p(id, `metodo.step${i+1}.desc`, s.desc),
      })),
    },
    scenarios: {
      ...data.scenarios,
      title: p(id, 'scenarios.title', data.scenarios.title),
      items: data.scenarios.items.map((s, i) => p(id, `scenarios.item${i+1}`, s)),
      ctaSubtitle: p(id, 'scenarios.ctaSubtitle', data.scenarios.ctaSubtitle),
      risksTitle: p(id, 'scenarios.risksTitle', data.scenarios.risksTitle),
      risks: data.scenarios.risks.map((r, i) => p(id, `scenarios.risk${i+1}`, r)),
      deepDives: data.scenarios.deepDives.map((d, i) => ({
        title: p(id, `scenarios.deep${i+1}.title`, d.title),
        text: p(id, `scenarios.deep${i+1}.text`, d.text),
      })),
      stickyImage: pImg(id, 'scenarios.stickyImage', data.scenarios.stickyImage),
    },
    onlineBanner: p(id, 'onlineBanner', data.onlineBanner),
    passoAPasso: data.passoAPasso.map((s, i) => ({
      ...s,
      title: p(id, `passo${i+1}.title`, s.title),
      subtitle: p(id, `passo${i+1}.subtitle`, s.subtitle),
      description: p(id, `passo${i+1}.desc`, s.description),
    })),
    riscoBanner: p(id, 'riscoBanner', data.riscoBanner),
    objecoes: data.objecoes.map((o, i) => ({
      q: p(id, `objecao${i+1}.q`, o.q),
      a: p(id, `objecao${i+1}.a`, o.a),
    })),
    costCta: {
      title: p(id, 'costCta.title', data.costCta.title),
      bgImage: pImg(id, 'costCta.bgImage', data.costCta.bgImage),
    },
    whyTrust: {
      trustItems: data.whyTrust.trustItems.map((t, i) => p(id, `whyTrust.trust${i+1}`, t)),
      consultaItems: data.whyTrust.consultaItems.map((c, i) => p(id, `whyTrust.consulta${i+1}`, c)),
      lidianeImage: pImg(id, 'whyTrust.lidianeImage', data.whyTrust.lidianeImage),
    },
    historias: {
      title: p(id, 'historias.title', data.historias.title),
      items: data.historias.items.map((h, i) => ({
        ...h,
        img: pImg(id, `historias.item${i+1}.img`, h.img),
        subtitle: p(id, `historias.item${i+1}.subtitle`, h.subtitle),
        body: p(id, `historias.item${i+1}.body`, h.body),
      })),
    },
    faqItems: data.faqItems.map((f, i) => ({
      q: p(id, `faq${i+1}.q`, f.q),
      a: p(id, `faq${i+1}.a`, f.a),
    })),
    ctaText: p(id, 'ctaText', data.ctaText || ''),
  };
}