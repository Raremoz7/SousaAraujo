import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Contact } from '../components/Contact';
import { CtaBanner } from '../components/CtaBanner';
import {
  imgCardHomologacao,
  imgCardFamilia,
  imgCardImoveis,
  imgCardEmpresarial,
} from '../../imports/images';
import svgPaths   from '../../imports/svg-practice-arrow';
import svgArrow   from '../../imports/svg-od596xq1d5';
import svgIcons   from '../../imports/svg-7ep6oounx2';
import { readPanel } from '../hooks/usePanelContent';
import { usePanel } from '../hooks/usePanelContent';
import { trackCtaClick } from '../components/PainelDashboard';

/* ─── Images from Figma ─── */
import imgHero        from 'figma:asset/1c5915f13f1286c3ef9a443f770e76f54396c6b2.png';
import imgOffice      from 'figma:asset/6c627bf6bc0511aa5872bd0ed7a7d5df4a890ba9.png';
import imgAreaImoveis from 'figma:asset/64cea56306b2570129258bd53b021cd25eec8f7b.png';
import imgServicesPhoto from 'figma:asset/2b85fa036dea8b3032c27b752074d867c5fe1f17.png';
import imgArticle1 from 'figma:asset/8f998da633bb92dcab13a208c71a97e2986d6c06.png';
import imgArticle2 from 'figma:asset/a6246b350004d1d692b469864824af4843190e94.png';
import imgArticle3 from 'figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png';

/* ─── Area illustration images ─── */
import imgIlustPassport   from 'figma:asset/c001fcb92bba9971248906b82582cd85cd4191f7.png';
import imgIlustFamily     from 'figma:asset/854de7fccfeac04b52bacaa3d28552d646eb7bd8.png';
import imgIlustBusiness   from 'figma:asset/e8a6bd59d0650c49da72c7cd94b2730167fa09bd.png';

/* ─── Arrow Icon (for accordion) ─── */
function AccordionArrow({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.4533 51.4167">
        <g>
          <path d={svgPaths.p2f6ed40} stroke="white" strokeWidth="2.0001" />
          <path d="M0.994251 1.1632H50.4537" stroke="white" strokeWidth="2.0001" />
          <path d="M50.4532 50.4085V0.949085" stroke="white" strokeWidth="2.0001" />
        </g>
      </svg>
    </div>
  );
}

function SmallArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[10px] h-[10px] ${className}`} fill="none" viewBox="0 0 10 10">
      <path d={svgArrow.p1238f200} stroke="currentColor" strokeWidth="1.02093" />
    </svg>
  );
}

/* ─── Fade-in animation wrapper ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <>{children}</>;
}

/* ─── Practice Areas data ─── */
interface Area {
  id: number;
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  expandedSubtitle?: string;
  checklist?: string[];
  href: string;
}

const areas: Area[] = [
  {
    id: 1, number: '01',
    title: 'Homologação de',
    subtitle: 'Sentença Estrangeira',
    expandedSubtitle: 'Homologação de Sentença Estrangeira',
    description:
      'Validamos no STJ decisões judiciais obtidas no exterior — divórcios, guardas, inventários, pensões, adoções e outras. Atendimento ágil e especializado para brasileiros em todo o mundo, com suporte de rede parceira em mais de 30 países.',
    checklist: [
      'Divórcio e separação internacionais',
      'Guarda e adoção transnacional',
      'Pensão alimentícia internacional',
      'Inventário e herança no exterior',
    ],
    image: imgIlustPassport,
    href: '/homologacao-de-sentenca-estrangeira',
  },
  {
    id: 2, number: '02',
    title: 'Imóveis e',
    subtitle: 'Usucapião',
    expandedSubtitle: 'Regularização de Imóveis e Usucapião',
    description:
      'Regularização de imóveis sem escritura ou com documentação irregular. Prioridade à via extrajudicial em cartório — mais rápida e previsível.',
    checklist: [
      'Usucapião extrajudicial em cartório',
      'Usucapião judicial',
      'Regularização fundiária',
      'Notificações extrajudiciais',
    ],
    image: imgIlustBusiness,
    href: '/imoveis',
  },
  {
    id: 3, number: '03',
    title: 'Família e',
    subtitle: 'Sucessões',
    expandedSubtitle: 'Direito de Família e Sucessões',
    description:
      'Divórcio consensual ou litigioso, guarda e alimentos, inventário, testamento e planejamento sucessório. Estratégia para reduzir desgaste e evitar prejuízos na divisão de bens, com prioridade à solução extrajudicial.',
    checklist: [
      'Divórcio consensual e litigioso',
      'Guarda e pensão alimentícia',
      'Inventário e planejamento sucessório',
      'Testamento e proteção patrimonial',
    ],
    image: imgIlustFamily,
    href: '/divorcio',
  },
  {
    id: 4, number: '04',
    title: 'Empresarial',
    expandedSubtitle: 'Direito Empresarial',
    description:
      'Consultoria jurídica para empresas: contratos, compliance, societário, proteção patrimonial e assessoria para empresários brasileiros com operações no exterior. Prevenção de conflitos e suporte estratégico nas decisões do negócio.',
    checklist: [
      'Contratos e compliance empresarial',
      'Constituição e reestruturação societária',
      'Proteção patrimonial para empresários',
      'Assessoria jurídica preventiva',
    ],
    image: imgIlustBusiness,
    href: '/consultoria-empresarial-pmes',
  },
];

/* ─── Services Grid data ─── */
const services = [
  { area: 'Homologação', title: 'Homologação de Sentença Estrangeira', href: '#contato' },
  { area: 'Homologação', title: 'Divórcio Internacional', href: '#contato' },
  { area: 'Homologação', title: 'Pensão Alimentícia Internacional', href: '#contato' },
  { area: 'Homologação', title: 'Guarda e Adoção Internacional', href: '#contato' },
  { area: 'Imóveis', title: 'Regularização de Imóveis', href: '#contato' },
  { area: 'Imóveis', title: 'Usucapião Extrajudicial', href: '#contato' },
  { area: 'Imóveis', title: 'Usucapião Judicial', href: '#contato' },
  { area: 'Imóveis', title: 'Inventário Imobiliário', href: '#contato' },
  { area: 'Família', title: 'Divórcio Consensual', href: '#contato' },
  { area: 'Família', title: 'Divórcio Litigioso', href: '#contato' },
  { area: 'Família', title: 'Guarda e Alimentos', href: '#contato' },
  { area: 'Família', title: 'Inventário e Sucessão', href: '#contato' },
  { area: 'Família', title: 'Planejamento Patrimonial', href: '#contato' },
  { area: 'Empresarial', title: 'Consultoria Empresarial', href: '#contato' },
  { area: 'Empresarial', title: 'Contratos e Compliance', href: '#contato' },
  { area: 'Empresarial', title: 'Societário', href: '#contato' },
];

/* ─── Articles ─── */
const articles = [
  {
    id: 1, day: '01', month: 'Nov',
    category: 'Direito Imobiliário e Usucapião',
    title: 'Imóvel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento',
    image: imgArticle1,
  },
  {
    id: 2, day: '01', month: 'Nov',
    category: 'Homologação e Direito Internacional',
    title: 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
    image: imgArticle2,
  },
  {
    id: 3, day: '01', month: 'Nov',
    category: 'Direito de Família',
    title: 'União Estável x Casamento: O que muda no seu patrimônio?',
    image: imgArticle3,
  },
];

const EXPAND_DUR   = 1.5;
const COLLAPSE_DUR = 1.5;
const FADE_IN_DUR  = 0.55;
const FADE_OUT_DUR = 0.4;
const CONTENT_IN_DELAY = EXPAND_DUR * 0.55;
const COLLAPSE_DELAY   = FADE_OUT_DUR + 0.08;
const EASE_EXPAND  = [0.22, 0.61, 0.36, 1] as const;
const EASE_CONTENT = [0.4, 0, 0.2, 1] as const;

/* ─── Page Hero (Group2098) ─── */
function PageHero() {
  const heroTitle = readPanel('areas.hero.title', 'Conheça nossas áreas de atuação');
  const heroDesc = readPanel('areas.hero.desc', 'A Sousa Araújo Advocacia atua em quatro grandes áreas do Direito, com foco em estratégia, organização documental e atendimento humanizado. Cada área é conduzida com o Método SAA — garantindo transparência, previsibilidade e acompanhamento em todas as etapas.');
  const heroCtaText = readPanel('areas.hero.ctaText', 'Agendar Atendimento');
  const heroBgImage = readPanel('areas.hero.bgImage', imgHero);
  const resolvedBgImage = heroBgImage.startsWith('figma:asset/') ? imgHero : heroBgImage;

  return (
    <section className="relative w-full bg-[#161312] overflow-hidden"
      style={{ height: 'clamp(600px, 80vh, 900px)' }}>

      {/* ── Full-width background image + gradient ── */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt="Áreas de atuação — Sousa Araújo Advocacia em Brasília"
            src={resolvedBgImage}
            className="absolute w-[152%] max-w-none"
            style={{ left: '-30%', top: '-45%', height: '265%', objectFit: 'cover' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(163.741deg, rgba(22,19,18,0) 67.361%, rgb(22,19,18) 92.378%), linear-gradient(188.882deg, rgba(22,19,18,0) 16.425%, rgb(22,19,18) 84.749%)',
          }}
        />
      </div>

      {/* ── Right floating video card ── */}
      <div
        className="absolute overflow-hidden hidden lg:block"
        style={{
          left: 'clamp(600px, 55.8%, 803px)',
          top: 'clamp(200px, 43.6%, 253px)',
          width:  'clamp(340px, 34.9%, 502px)',
          height: 'clamp(220px, 22.3%, 321px)',
        }}
        aria-hidden="true"
      >
        <img
          src={imgOffice}
          alt="Escritório Sousa Araújo Advocacia — ambiente de trabalho"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Play button */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: '50%', top: '50%' }}
        >
          <div
            className="flex items-center justify-center rounded-full size-[72px] lg:size-[90px] backdrop-blur-[3.5px]"
            style={{ background: 'rgba(75,37,36,0.35)' }}
          >
            <svg className="w-[14px] h-[18px] lg:w-[18px] lg:h-[24px]" fill="none" viewBox="0 0 18 24">
              <g clipPath="url(#pc1)">
                <path d="M18 12L0 24V0L18 12Z" fill="white" />
              </g>
              <defs>
                <clipPath id="pc1"><rect fill="white" height="24" width="18" /></clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Text content ── */}
      <div
        className="absolute inset-x-0 flex flex-col justify-end"
        style={{ top: 0, bottom: 0, padding: '0 clamp(20px,5.56%,80px)' }}
      >
        <div className="max-w-[640px] pb-[clamp(40px,5vw,72px)]">

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="font-['Marcellus'] text-[clamp(36px,4.03vw,58px)] leading-[1.14] tracking-[-0.87px] mb-[clamp(10px,1.5vw,22px)]"
          >
            <span className="text-white">Conheça nossas </span>
            <span className="text-[#a57255]">áreas de atuação</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="font-['Roboto'] font-bold text-[clamp(14px,1.25vw,18px)] leading-[25px] text-white max-w-[610px] mb-[clamp(24px,3vw,42px)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {heroDesc}
          </motion.p>

          {/* CTA link */}
          <motion.a
            href="#contato"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="inline-flex items-center gap-[10px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
            onClick={() => trackCtaClick('areas')}
          >
            {heroCtaText}
            <svg className="w-[10px] h-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 10 10">
              <path d="M0.360346 9.59673L9.48745 0.500255M0.411392 0.510465H9.47724M9.49766 9.39255V0.500255" stroke="currentColor" strokeWidth="1.02093" />
            </svg>
          </motion.a>

        </div>
      </div>

    </section>
  );
}

/* ─── [unused legacy] ─── */
function DesktopCard({
  area, isExpanded, onClick, isLast,
}: {
  area: Area; isExpanded: boolean; onClick: () => void; isLast: boolean;
}) {
  return (
    <motion.div
      className="relative h-full cursor-pointer overflow-hidden"
      initial={false}
      animate={{ flex: isExpanded ? '1 1 0%' : '0 0 16.5%' }}
      transition={{
        flex: {
          duration: isExpanded ? EXPAND_DUR : COLLAPSE_DUR,
          ease: EASE_EXPAND as unknown as number[],
          delay: isExpanded ? 0 : COLLAPSE_DELAY,
        },
      }}
      onClick={onClick}
      style={{ borderRight: !isLast ? '1px solid rgba(165,114,85,0.3)' : 'none', willChange: 'flex' }}
    >
      {/* Collapsed */}
      <motion.div className="absolute inset-0 bg-[#452b1e] z-10" initial={false}
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ opacity: { duration: isExpanded ? 0.5 : 0.6, ease: EASE_CONTENT as unknown as number[], delay: isExpanded ? 0 : COLLAPSE_DELAY + COLLAPSE_DUR * 0.15 } }}
        style={{ pointerEvents: isExpanded ? 'none' : 'auto' }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-[14px] w-[51.44px] h-[51.409px]">
          <div className={area.id === 1 ? 'rotate-180' : ''}>
            <AccordionArrow className="w-full h-full" />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%) rotate(-90deg)', width: '243px', height: '71px' }}>
          <div className="flex items-center justify-center h-full">
            <p className="font-['Roboto'] font-normal text-[32px] leading-[42px] tracking-[-0.832px] text-white text-center whitespace-nowrap"
              style={{ fontVariationSettings: "'wdth' 100" }}>
              {area.title.replace(' de', '').replace(' e', '')}
            </p>
          </div>
        </div>
        <div className="absolute left-1/2 bottom-[40px]" style={{ transform: 'translateX(-50%) rotate(-90deg)', width: '91px', height: '71px' }}>
          <p className="font-['Lora'] text-[70px] leading-[42px] tracking-[-0.832px] text-white text-center">{area.number}</p>
        </div>
      </motion.div>

      {/* Expanded */}
      <motion.div className="absolute inset-0 bg-[#452b1e]" initial={false}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ opacity: { duration: isExpanded ? 0.3 : FADE_OUT_DUR, delay: isExpanded ? 0.1 : 0 } }}
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
      >
        <div className="relative h-full">
          <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-[415px] h-[516px] overflow-hidden bg-[#452b1e]"
            initial={false}
            animate={{ opacity: isExpanded ? 1 : 0, scale: isExpanded ? 1 : 1.08 }}
            transition={{
              opacity: { duration: isExpanded ? FADE_IN_DUR + 0.2 : FADE_OUT_DUR * 0.8, ease: EASE_CONTENT as unknown as number[], delay: isExpanded ? CONTENT_IN_DELAY - 0.15 : 0 },
              scale: { duration: isExpanded ? FADE_IN_DUR + 0.6 : FADE_OUT_DUR, ease: EASE_CONTENT as unknown as number[], delay: isExpanded ? CONTENT_IN_DELAY - 0.15 : 0 },
            }}
          >
            <img src={area.image} alt={area.title} className="w-full h-full object-cover opacity-75 mix-blend-multiply" style={{ backgroundColor: '#452b1e' }} />
          </motion.div>

          <div className="absolute left-[42px] top-1/2 -translate-y-1/2 z-10 max-w-[458px]">
            <motion.h3
              className="font-['Roboto'] font-normal text-[25px] leading-[30px] tracking-[-0.525px] text-white mb-4"
              style={{ fontVariationSettings: "'wdth' 100" }}
              initial={false}
              animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 30 }}
              transition={{ opacity: { duration: isExpanded ? FADE_IN_DUR : FADE_OUT_DUR * 0.7, ease: EASE_CONTENT as unknown as number[], delay: isExpanded ? CONTENT_IN_DELAY : 0 }, y: { duration: isExpanded ? FADE_IN_DUR + 0.1 : FADE_OUT_DUR * 0.5, ease: EASE_CONTENT as unknown as number[], delay: isExpanded ? CONTENT_IN_DELAY : 0 } }}
            >
              {area.title}{area.subtitle && <><br />{area.subtitle}</>}
            </motion.h3>
            <motion.p
              className="font-['Roboto'] font-normal text-[15px] leading-[23px] tracking-[-0.225px] text-white mb-6"
              style={{ fontVariationSettings: "'wdth' 100" }}
              initial={false}
              animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 25 }}
              transition={{ opacity: { duration: isExpanded ? FADE_IN_DUR : FADE_OUT_DUR * 0.7, ease: EASE_CONTENT as unknown as number[], delay: isExpanded ? CONTENT_IN_DELAY + 0.1 : 0 }, y: { duration: isExpanded ? FADE_IN_DUR + 0.1 : FADE_OUT_DUR * 0.5, ease: EASE_CONTENT as unknown as number[], delay: isExpanded ? CONTENT_IN_DELAY + 0.1 : 0 } }}
            >
              {area.description}
            </motion.p>
            <motion.a
              href="#contato"
              className="inline-flex items-center justify-center bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[40px] px-[29px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              onClick={() => trackCtaClick('areas')}
            >
              Agendar Consulta
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Mobile Accordion ─── */
function MobileCard({ area, isExpanded, onClick }: { area: Area; isExpanded: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[#a57255]/30">
      <div className="flex items-center justify-between bg-[#452b1e] p-6 cursor-pointer" onClick={onClick}>
        <div>
          <span className="font-['Lora'] text-[18px] text-[#a57255] mr-3">{area.number}</span>
          <span className="font-['Roboto'] font-normal text-[22px] leading-[28px] tracking-[-0.525px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
            {area.title}{area.subtitle && ` ${area.subtitle}`}
          </span>
        </div>
        <div className="w-[32px] h-[32px] flex-shrink-0">
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}>
            <AccordionArrow className="w-full h-full" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ height: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] } }}
            className="overflow-hidden bg-[#452b1e]"
          >
            <div className="p-6 space-y-4">
              <motion.p
                className="font-['Roboto'] font-normal text-[15px] leading-[23px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.25 }}
              >
                {area.description}
              </motion.p>
              <motion.div
                className="w-full overflow-hidden"
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <img src={area.image} alt={area.title} className="w-full h-auto" />
              </motion.div>
              <motion.a
                href="#contato"
                className="inline-flex items-center justify-center bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[40px] px-[29px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.5 }}
                onClick={() => trackCtaClick('areas')}
              >
                Agendar Consulta
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Accordion Section ─── */
function AccordionSection() {
  const [expanded, setExpanded] = useState<number>(1);
  const handleClick = useCallback((id: number) => { if (id !== expanded) setExpanded(id); }, [expanded]);

  // Connect areas to panel
  const areaImages = [imgIlustPassport, imgIlustBusiness, imgIlustFamily, imgIlustBusiness];
  const panelAreas: Area[] = areas.map((a, i) => ({
    ...a,
    title: readPanel(`areas.area${i + 1}.title`, a.title),
    subtitle: readPanel(`areas.area${i + 1}.subtitle`, a.subtitle || ''),
    expandedSubtitle: readPanel(`areas.area${i + 1}.expandedSubtitle`, a.expandedSubtitle || ''),
    description: readPanel(`areas.area${i + 1}.desc`, a.description),
    checklist: [
      readPanel(`areas.area${i + 1}.check1`, a.checklist?.[0] || ''),
      readPanel(`areas.area${i + 1}.check2`, a.checklist?.[1] || ''),
      readPanel(`areas.area${i + 1}.check3`, a.checklist?.[2] || ''),
      readPanel(`areas.area${i + 1}.check4`, a.checklist?.[3] || ''),
    ].filter(Boolean),
    href: readPanel(`areas.area${i + 1}.href`, a.href),
  }));

  return (
    <section className="bg-[#161312] w-full mx-[0px] my-[50px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[113px]">

        {panelAreas.map((area) => (
          <div key={area.id}>

            {/* ── Tab row ── */}
            <button
              type="button"
              onClick={() => handleClick(area.id)}
              className="w-full flex items-center h-[100px] md:h-[120px] lg:h-[150px] cursor-pointer group text-left"
            >
              {/* Number */}
              <span className="font-['Lora'] font-normal text-[48px] md:text-[56px] lg:text-[70px] leading-[42px] tracking-[-0.832px] text-white flex-shrink-0 w-[72px] md:w-[95px] lg:w-[120px] select-none">
                {area.number}
              </span>
              {/* Name */}
              <span
                className="font-['Roboto'] font-normal text-[22px] md:text-[26px] lg:text-[32px] leading-[42px] tracking-[-0.832px] text-white flex-1 ml-[20px] lg:ml-[42px] group-hover:text-[#a57255] transition-colors duration-300"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {area.title}{area.subtitle ? ` ${area.subtitle}` : ''}
              </span>
              {/* Corner-bracket arrow */}
              <motion.div
                className="w-[40px] h-[40px] md:w-[46px] md:h-[46px] lg:w-[51px] lg:h-[51px] flex-shrink-0"
                animate={{ rotate: expanded === area.id ? 180 : 0 }}
                transition={{ duration: 0.65, ease: EASE_EXPAND as unknown as number[] }}
              >
                <AccordionArrow className="w-full h-full" />
              </motion.div>
            </button>

            {/* ── Divider ── */}
            <div className="w-full h-px bg-[#a57255]/40" />

            {/* ── Expanded content panel ── */}
            <AnimatePresence initial={false}>
              {expanded === area.id && (
                <motion.div
                  key={`panel-${area.id}`}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ height: { duration: 0.8, ease: EASE_EXPAND as unknown as number[] } }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-[36px] lg:gap-[80px] pt-[40px] pb-[60px] lg:pt-[50px] lg:pb-[90px]">

                    {/* Left: text */}
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.55, delay: 0.28, ease: EASE_CONTENT as unknown as number[] }}
                    >
                      {/* Subtitle */}
                      <h3
                        className="font-['Roboto'] font-normal text-[20px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.525px] text-[#a57255] mb-[20px] md:mb-[26px]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {area.expandedSubtitle ?? `${area.title}${area.subtitle ? ` ${area.subtitle}` : ''}`}
                      </h3>

                      {/* Description */}
                      <p
                        className="font-['Noto_Sans'] font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[28px] md:leading-[30px] tracking-[-0.225px] text-white mb-[24px] max-w-[537px]"
                        style={{ fontVariationSettings: "'wght' 400" }}
                      >
                        {area.description}
                      </p>

                      {/* Checklist */}
                      {area.checklist && (
                        <ul className="space-y-[8px] mb-[32px] md:mb-[40px]">
                          {area.checklist.map((item, i) => (
                            <li
                              key={i}
                              className="font-['Noto_Sans'] font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[28px] tracking-[-0.225px] text-white"
                              style={{ fontVariationSettings: "'wght' 400" }}
                            >
                              ✓ {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTA */}
                      <Link
                        to={area.href}
                        aria-label={`Saiba mais sobre ${area.title}${area.subtitle ? ` ${area.subtitle}` : ''}`}
                        className="inline-flex items-center gap-[8px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group/link"
                      >
                        Saiba Mais
                        <SmallArrow className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </motion.div>

                    {/* Right: image — full display, no crop */}
                    <motion.div
                      className="w-full flex items-center justify-center bg-[#161312]"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.7, delay: 0.18, ease: EASE_CONTENT as unknown as number[] }}
                    >
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-auto"
                      />
                    </motion.div>

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

/* ─── Services Grid ─── */
function ServicesGridSection() {
  const grouped = areas.map((a) => ({
    area: a,
    items: services.filter((s) => s.area === ['Homologação', 'Imóveis', 'Família', 'Empresarial'][a.id - 1]),
  }));

  return (
    null
  );
}

/* ─── Office Image Banner ─── */
function OfficeBanner() {
  return (
    <section className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      
    </section>
  );
}

/* ─── Blog Preview ─── */
function BlogPreview() {
  const heading = readPanel('areas.blog.heading', 'Quem se informa, se protege');
  const panelArticles = articles.map((a, i) => ({
    ...a,
    title: readPanel(`areas.blog.article${i + 1}.title`, a.title),
    category: readPanel(`areas.blog.article${i + 1}.category`, a.category),
    day: readPanel(`areas.blog.article${i + 1}.day`, a.day),
    month: readPanel(`areas.blog.article${i + 1}.month`, a.month),
  }));

  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[26px] md:text-[34px] lg:text-[43px] leading-[1.25] tracking-[-0.516px] text-white mb-[40px] md:mb-[50px] lg:mb-[70px]">
            {heading}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[24px] lg:gap-[30px]">
          {panelArticles.map((article, i) => (
            <FadeIn key={article.id} delay={i * 0.1}>
              <article className="group">
                <div className="relative w-full h-[200px] md:h-[235px] overflow-hidden mb-[16px] md:mb-[20px]">
                  <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-0 left-0 backdrop-blur-[2px] bg-white/45 w-[63px] h-[77px] flex flex-col items-center justify-center">
                    <span className="font-['Lora'] text-[20px] leading-[23px] text-white">{article.day}</span>
                    <span className="font-['Lora'] text-[15px] leading-[23px] text-white">{article.month}</span>
                  </div>
                </div>
                <p className="font-['Roboto'] text-[13px] leading-[18px] tracking-[-0.195px] text-[#a57255] mb-[12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {article.category}
                </p>
                <h3 className="font-['Roboto'] text-[19px] md:text-[21px] lg:text-[25px] leading-[1.4] tracking-[-0.525px] text-white mb-[16px] group-hover:text-[#a57255] transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {article.title}
                </h3>
                <a href="/blog" aria-label="Ler artigo completo no blog" className="inline-flex items-center gap-2 font-['Noto_Sans'] font-medium text-[15px] text-white hover:text-[#a57255] transition-colors group/link">
                  Ler Artigo
                  <SmallArrow className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services Panel data (Background-23-1603) ─── */
const servicesPanelList = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 60 52" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#spa1)">
          <path d={svgIcons.p309869c0} fill="#A57255" />
          <path d={svgIcons.pd747500}  fill="#A57255" />
          <path d={svgIcons.p28623280} fill="#A57255" />
        </g>
        <defs><clipPath id="spa1"><rect width="60" height="52" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Homologação Internacional',
    description: 'Validamos no Brasil divórcios, guardas e decisões judiciais obtidas no exterior.',
    href: '/homologacao-de-sentenca-estrangeira',
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 53 51" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#spa2)">
          <path d={svgIcons.p2a8d0000}  fill="#A57255" />
          <path d={svgIcons.p33279700}  fill="#A57255" />
          <path d={svgIcons.pd4f5700}   fill="#A57255" />
        </g>
        <defs><clipPath id="spa2"><rect width="53" height="51" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Divórcio Consensual e Litigioso',
    description: 'Condução objetiva com foco em acordo, proteção patrimonial e agilidade.',
    href: '/divorcio',
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 56 55" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#spa3)">
          <path d={svgIcons.p110e7500}  fill="#A57255" />
          <path d={svgIcons.p2affd980}  fill="#A57255" />
          <path d={svgIcons.p36fa7100}  fill="#A57255" />
          <path d={svgIcons.pe436f00}   fill="#A57255" />
        </g>
        <defs><clipPath id="spa3"><rect width="56" height="55" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Pensão Alimentícia',
    description: 'Fixação, revisão e execução de alimentos com estratégia e respaldo processual.',
    href: '/pensao-alimenticia',
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 40 42" fill="none" className="w-[44px] h-auto">
        <g clipPath="url(#spa4)">
          <path d={svgIcons.p28fa8500}  fill="#A57255" />
          <path d={svgIcons.p23419280}  fill="#A57255" />
          <path d={svgIcons.p3231c200}  fill="#A57255" />
          <path d={svgIcons.p1aeae080}  fill="#A57255" />
        </g>
        <defs><clipPath id="spa4"><rect width="40" height="42" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Guarda e Convivência',
    description: 'Acordos claros que protegem os filhos e garantem estabilidade para todos.',
    href: '/guarda-e-plano-de-convivencia',
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 60 30" fill="none" className="w-[56px] h-auto">
        <g clipPath="url(#spa5)">
          <path d={svgIcons.p22710880} fill="#A57255" />
          <path d={svgIcons.p22e3fb00} fill="#A57255" />
        </g>
        <defs><clipPath id="spa5"><rect width="60" height="30" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Inventário e Sucessões',
    description: 'Planejamento e condução do inventário com foco em agilidade e harmonia familiar.',
    href: '/inventario-e-sucessoes',
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 45 45" fill="none" className="w-[44px] h-auto">
        <g clipPath="url(#spa6)">
          <path d={svgIcons.p7c54b00}   fill="#A57255" />
          <path d={svgIcons.p46b6d00}   fill="#A57255" />
          <path d={svgIcons.p16409780}  fill="#A57255" />
          <path d={svgIcons.p13bf7870}  fill="#A57255" />
          <path d={svgIcons.p217da700}  fill="#A57255" />
        </g>
        <defs><clipPath id="spa6"><rect width="45" height="45" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'União Estável',
    description: 'Reconhecimento, dissolução e proteção patrimonial com orientação clara sobre direitos.',
    href: '/uniao-estavel',
  },
  {
    id: 7,
    icon: (
      <svg viewBox="0 0 54 50" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#spa7)">
          <path d={svgIcons.p3972d380} fill="#A57255" />
          <path d={svgIcons.p6029780}  fill="#A57255" />
          <path d={svgIcons.p2e300400} fill="#A57255" />
        </g>
        <defs><clipPath id="spa7"><rect width="54" height="50" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Regularização de Imóveis',
    description: 'Usucapião extrajudicial no cartório para regularizar sua propriedade com segurança.',
    href: '/imoveis',
  },
  {
    id: 8,
    icon: (
      <svg viewBox="0 0 59 55" fill="none" className="w-[52px] h-auto">
        <g clipPath="url(#spa8)">
          <path d={svgIcons.p29172800} fill="#A57255" />
          <path d={svgIcons.pf215680}  fill="#A57255" />
          <path d={svgIcons.p212f1800} fill="#A57255" />
          <path d={svgIcons.p3e410d00} fill="#A57255" />
          <path d={svgIcons.p3df8300}  fill="#A57255" />
          <path d={svgIcons.p10949100} fill="#A57255" />
        </g>
        <defs><clipPath id="spa8"><rect width="59" height="55" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Consultoria Empresarial',
    description: 'Suporte jurídico preventivo e recorrente para PMEs que querem crescer protegidas.',
    href: '/consultoria-empresarial-pmes',
  },
  {
    id: 9,
    icon: (
      <svg viewBox="0 0 44 48" fill="none" className="w-[44px] h-auto">
        <g clipPath="url(#spa9)">
          <path d={svgIcons.p33fcf000}  fill="#A57255" />
          <path d={svgIcons.p258a32c0}  fill="#A57255" />
          <path d={svgIcons.p1da69d80}  fill="#A57255" />
          <path d={svgIcons.p2e28a180}  fill="#A57255" />
          <path d={svgIcons.p2659cd00}  fill="#A57255" />
          <path d={svgIcons.p2a7c8780}  fill="#A57255" />
          <path d={svgIcons.pf974700}   fill="#A57255" />
          <path d={svgIcons.p37b41a00}  fill="#A57255" />
        </g>
        <defs><clipPath id="spa9"><rect width="44" height="48" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Registro de Marca no INPI',
    description: 'Da busca ao protocolo — proteção exclusiva da sua marca com acompanhamento completo.',
    href: '/registro-de-marca-inpi',
  },
  {
    id: 10,
    icon: (
      <svg viewBox="0 0 66 65" fill="none" className="w-[56px] h-auto">
        <g clipPath="url(#spa10)">
          <path d={svgIcons.p3a97d900}  fill="#A57255" />
          <path d={svgIcons.p351a370}   fill="#A57255" />
          <path d={svgIcons.p36d35080}  fill="#A57255" />
          <path d={svgIcons.p1bf35872}  fill="#A57255" />
        </g>
        <defs><clipPath id="spa10"><rect width="66" height="65" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Notificações Extrajudiciais',
    description: 'Instrumento estratégico para resolver conflitos antes que virem processos judiciais.',
    href: null as string | null,
  },
  {
    id: 11,
    icon: (
      <svg viewBox="0 0 54 53" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#spa11)">
          <path d={svgIcons.p3135b3c0}  fill="#A57255" />
          <path d={svgIcons.p1a0c7e0}   fill="#A57255" />
          <path d={svgIcons.p236a9600}  fill="#A57255" />
          <path d={svgIcons.p3e4b2b00}  fill="#A57255" />
          <path d={svgIcons.p3eed8400}  fill="#A57255" />
          <path d={svgIcons.p32d87700}  fill="#A57255" />
        </g>
        <defs><clipPath id="spa11"><rect width="54" height="53" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Partilha de Bens',
    description: 'Divisão patrimonial estruturada para evitar prejuízos e acelerar o desfecho do divórcio.',
    href: '/divorcio',
  },
  {
    id: 12,
    icon: (
      <svg viewBox="0 0 44 48" fill="none" className="w-[44px] h-auto">
        <g clipPath="url(#spa12)">
          <path d={svgIcons.p33fcf000} fill="#A57255" />
          <path d={svgIcons.p24f98d00} fill="#A57255" />
          <path d={svgIcons.p15265780} fill="#A57255" />
          <path d={svgIcons.p156c5200} fill="#A57255" />
        </g>
        <defs><clipPath id="spa12"><rect width="44" height="48" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Contratos Empresariais',
    description: 'Elaboração de contratos seguros para prestação de serviço, parceria e confidencialidade.',
    href: '/consultoria-empresarial-pmes',
  },
  {
    id: 13,
    icon: (
      <svg viewBox="0 0 56 55" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#spa13)">
          <path d={svgIcons.p110e7500}  fill="#A57255" />
          <path d={svgIcons.p13bf7870}  fill="#A57255" />
          <path d={svgIcons.p217da700}  fill="#A57255" />
        </g>
        <defs><clipPath id="spa13"><rect width="56" height="55" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Societário Básico',
    description: 'Alteração contratual, entrada e saída de sócios com segurança jurídica e clareza.',
    href: '/consultoria-empresarial-pmes',
  },
  {
    id: 14,
    icon: (
      <svg viewBox="0 0 53 51" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#spa14)">
          <path d={svgIcons.p2a8d0000} fill="#A57255" />
          <path d={svgIcons.p33279700} fill="#A57255" />
          <path d={svgIcons.p3972d380} fill="#A57255" />
        </g>
        <defs><clipPath id="spa14"><rect width="53" height="51" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Divórcio para Brasileiros no Exterior',
    description: 'Condução completa do processo para quem vive fora e precisa regularizar sua situação no Brasil.',
    href: '/homologacao-de-sentenca-estrangeira',
  },
];

/* ─── Services Panel — BioSection layout ─── */
function ServicesPanel() {
  const heading = readPanel('areas.services.heading', 'Serviços jurídicos especializados para cada momento da sua vida');

  // Connect service titles/descriptions/hrefs to panel
  const panelServices = servicesPanelList.map((svc, i) => ({
    ...svc,
    title: readPanel(`areas.svc${i + 1}.title`, svc.title),
    description: readPanel(`areas.svc${i + 1}.desc`, svc.description),
    href: readPanel(`areas.svc${i + 1}.href`, svc.href || '') || svc.href,
  }));

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

        {/* ── Left: sticky office lounge photo ── */}
        <div className="sticky top-0 w-full order-last lg:order-first">
          <img
            src={imgServicesPhoto}
            alt="Ambiente do escritório Sousa Araújo Advocacia"
            className="w-full h-screen object-cover object-center"
          />
        </div>

        {/* ── Right: dark panel with services grid ── */}
        <div className="bg-[#262626] px-[32px] md:px-[50px] lg:px-[70px] py-[60px] md:py-[80px] lg:py-[100px]">

          <FadeIn>
            <h2 className="font-['Lora'] text-[26px] md:text-[34px] lg:text-[43px] leading-[1.25] tracking-[-0.516px] text-[#a57255] mb-[48px] md:mb-[60px] lg:mb-[80px]">
              {heading}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[32px] md:gap-x-[40px] gap-y-[40px] md:gap-y-[52px]">
            {panelServices.map((service, i) => (
              <FadeIn key={service.id} delay={(i % 2) * 0.08}>
                {service.href ? (
                  <Link to={service.href} className="flex flex-col gap-[14px] group/svc">
                    <div className="flex items-start h-[52px]">
                      {service.icon}
                    </div>
                    <p className="font-['Noto_Sans'] font-medium text-[18px] md:text-[21px] leading-[30px] tracking-[-0.42px] text-white group-hover/svc:text-[#a57255] transition-colors">
                      {service.title}
                    </p>
                    <p className="font-['Noto_Sans'] font-normal text-[14px] md:text-[15px] leading-[23px] tracking-[-0.225px] text-white/70">
                      {service.description}
                    </p>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-[14px]">
                    <div className="flex items-start h-[52px]">
                      {service.icon}
                    </div>
                    <p className="font-['Noto_Sans'] font-medium text-[18px] md:text-[21px] leading-[30px] tracking-[-0.42px] text-white">
                      {service.title}
                    </p>
                    <p className="font-['Noto_Sans'] font-normal text-[14px] md:text-[15px] leading-[23px] tracking-[-0.225px] text-white/70">
                      {service.description}
                    </p>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export function AreasDeAtuacaoPage() {
  const orderJson = usePanel('areas.sectionOrder', '');

  const SECTION_REGISTRY: Record<string, { Component: React.FC }> = {
    'areas-hero': { Component: PageHero },
    'areas-accordion': { Component: AccordionSection },
    'areas-services': { Component: ServicesPanel },
    'areas-blog': { Component: BlogPreview },
    'areas-contact': { Component: Contact },
  };

  const DEFAULT_ORDER = [
    'areas-hero',
    'areas-accordion',
    'areas-services',
    'areas-blog',
    'areas-contact',
  ];

  const orderedIds = useMemo(() => {
    if (!orderJson) return DEFAULT_ORDER;
    try {
      const parsed = JSON.parse(orderJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
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

  return (
    <>
      {orderedIds.map(id => {
        const entry = SECTION_REGISTRY[id];
        if (!entry) return null;
        const { Component } = entry;
        return <Component key={id} />;
      })}
    </>
  );
}