import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { imgCardHomologacao, imgCardFamilia, imgCardImoveis, imgCardEmpresarial } from '../../imports/images';
import svgPaths from '../../imports/svg-practice-arrow';
import { readPanel } from '../hooks/usePanelContent';

/**
 * Practice Areas Component
 * Animacoes sequenciadas estilo Dictum:
 * - Expandir: painel cresce lentamente, conteudo aparece so no final
 * - Recolher: conteudo some primeiro, painel recolhe so depois
 * Conteudo centralizado em /src/data/content.ts
 */

interface PracticeArea {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  number: string;
  href: string;
}

function panelImage(key: string, fallback: string): string {
  const val = readPanel(key, fallback);
  return val.startsWith('figma:asset/') ? fallback : val;
}

const practiceAreas: PracticeArea[] = [
  {
    id: 1,
    number: readPanel('home.area1.number', '01'),
    title: readPanel('home.area1.title', 'Homologacao de'),
    subtitle: readPanel('home.area1.subtitle', 'Sentenca Estrangeira'),
    description: readPanel('home.area1.desc', 'Validamos no STJ decisoes judiciais obtidas no exterior, como divorcios e guardas. Atendimento agil e especializado para brasileiros em todo o mundo.'),
    image: panelImage('home.area1.image', imgCardHomologacao),
    href: readPanel('home.area1.href', '/homologacao-de-sentenca-estrangeira'),
  },
  {
    id: 2,
    number: readPanel('home.area2.number', '02'),
    title: readPanel('home.area2.title', 'Direito de Familia e'),
    subtitle: readPanel('home.area2.subtitle', 'Sucessoes'),
    description: readPanel('home.area2.desc', 'Divorcio consensual ou litigioso, uniao estavel, partilha e protecao patrimonial. Estrategia clara para reduzir desgaste e evitar prejuizos na divisao de bens.'),
    image: panelImage('home.area2.image', imgCardFamilia),
    href: readPanel('home.area2.href', '/divorcio'),
  },
  {
    id: 3,
    number: readPanel('home.area3.number', '03'),
    title: readPanel('home.area3.title', 'Imoveis e Usucapiao'),
    description: readPanel('home.area3.desc', 'Regularizacao de imoveis sem escritura ou com documentacao irregular. Prioridade a via extrajudicial em cartorio — mais rapida e previsivel.'),
    image: panelImage('home.area3.image', imgCardImoveis),
    href: readPanel('home.area3.href', '/imoveis'),
  },
  {
    id: 4,
    number: readPanel('home.area4.number', '04'),
    title: readPanel('home.area4.title', 'Empresarial'),
    description: readPanel('home.area4.desc', 'Consultoria juridica para empresas: contratos, compliance, societario e protecao patrimonial. Prevencao de conflitos e suporte estrategico nas decisoes do negocio.'),
    image: panelImage('home.area4.image', imgCardEmpresarial),
    href: readPanel('home.area4.href', '/consultoria-empresarial-pmes'),
  },
];

/* ─── Timing constants (seconds) ─── */
const EXPAND_DUR   = 1.5;   // duração da expansão do painel
const COLLAPSE_DUR = 1.5;   // duração do recolhimento do painel
const FADE_IN_DUR  = 0.55;  // duração do fade-in do conteúdo
const FADE_OUT_DUR = 0.4;   // duração do fade-out do conteúdo

// Conteúdo aparece quando a expansão está ~55% pronta
const CONTENT_IN_DELAY = EXPAND_DUR * 0.55;
// Painel só recolhe após o conteúdo ter sumido
const COLLAPSE_DELAY   = FADE_OUT_DUR + 0.08;

const EASE_EXPAND  = [0.22, 0.61, 0.36, 1] as const;   // suave saída
const EASE_CONTENT = [0.4, 0, 0.2, 1] as const; // ease padrao

function ArrowIcon({ className = "" }: { className?: string }) {
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

/* ─────────────────────────────────────
   Desktop Accordion Card
   ───────────────────────────────────── */
function DesktopCard({
  area,
  isExpanded,
  onClick,
  isLast,
}: {
  area: PracticeArea;
  isExpanded: boolean;
  onClick: () => void;
  isLast: boolean;
}) {
  return (
    <motion.div
      className="relative h-full cursor-pointer overflow-hidden"
      initial={false}
      animate={{
        flex: isExpanded ? '1 1 0%' : '0 0 16.5%',
      }}
      transition={{
        flex: {
          duration: isExpanded ? EXPAND_DUR : COLLAPSE_DUR,
          ease: EASE_EXPAND as unknown as number[],
          // Ao recolher: espera o conteúdo sumir antes de encolher
          delay: isExpanded ? 0 : COLLAPSE_DELAY,
        },
      }}
      onClick={onClick}
      style={{
        borderRight: !isLast ? '1px solid rgba(165, 114, 85, 0.3)' : 'none',
        willChange: 'flex',
      }}
    >
      {/* ── Collapsed State ── */}
      <motion.div
        className="absolute inset-0 bg-[#452b1e] z-10"
        initial={false}
        animate={{
          opacity: isExpanded ? 0 : 1,
        }}
        transition={{
          opacity: {
            duration: isExpanded ? 0.5 : 0.6,
            ease: EASE_CONTENT as unknown as number[],
            // Ao expandir: some rápido; ao recolher: aparece após o painel começar a fechar
            delay: isExpanded ? 0 : COLLAPSE_DELAY + COLLAPSE_DUR * 0.15,
          },
        }}
        style={{ pointerEvents: isExpanded ? 'none' : 'auto' }}
      >
        {/* Arrow Icon */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[14px] w-[51.44px] h-[51.409px]">
          <div className={area.id === 1 ? 'rotate-180' : ''}>
            <ArrowIcon className="w-full h-full" />
          </div>
        </div>

        {/* Vertical Title */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%) rotate(-90deg)',
            width: '243px',
            height: '71px',
          }}
        >
          <div className="flex items-center justify-center h-full">
            <p
              className="font-['Roboto'] font-normal text-[32px] leading-[42px] tracking-[-0.832px] text-white text-center whitespace-nowrap"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {area.title.replace(' de', '').replace(' e', '')}
            </p>
          </div>
        </div>

        {/* Vertical Number */}
        <div
          className="absolute left-1/2 bottom-[40px]"
          style={{
            transform: 'translateX(-50%) rotate(-90deg)',
            width: '91px',
            height: '71px',
          }}
        >
          <p className="font-['Lora'] text-[70px] leading-[42px] tracking-[-0.832px] text-white text-center">
            {area.number}
          </p>
        </div>
      </motion.div>

      {/* ── Expanded State ── */}
      <motion.div
        className="absolute inset-0 bg-[#452b1e]"
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{
          opacity: {
            duration: isExpanded ? 0.3 : FADE_OUT_DUR,
            delay: isExpanded ? 0.1 : 0,
          },
        }}
        style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
      >
        <div className="relative h-full">
          {/* Background Image — faz fade-in junto com o conteúdo mas começa um pouco antes */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[415px] h-[516px] overflow-hidden bg-[#452b1e]"
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
              scale: isExpanded ? 1 : 1.08,
            }}
            transition={{
              opacity: {
                duration: isExpanded ? FADE_IN_DUR + 0.2 : FADE_OUT_DUR * 0.8,
                ease: EASE_CONTENT as unknown as number[],
                delay: isExpanded ? CONTENT_IN_DELAY - 0.15 : 0,
              },
              scale: {
                duration: isExpanded ? FADE_IN_DUR + 0.6 : FADE_OUT_DUR,
                ease: EASE_CONTENT as unknown as number[],
                delay: isExpanded ? CONTENT_IN_DELAY - 0.15 : 0,
              },
            }}
          >
            <img
              src={area.image}
              alt={area.title}
              className="w-full h-full object-cover opacity-75 mix-blend-multiply"
              style={{ backgroundColor: '#452b1e' }}
            />
          </motion.div>

          {/* Content */}
          <div className="absolute left-[42px] top-1/2 -translate-y-1/2 z-10 max-w-[458px]">
            {/* Title */}
            <motion.h3
              className="font-['Roboto'] font-normal text-[25px] leading-[30px] tracking-[-0.525px] text-white mb-6"
              style={{ fontVariationSettings: "'wdth' 100" }}
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                y: isExpanded ? 0 : 30,
              }}
              transition={{
                opacity: {
                  duration: isExpanded ? FADE_IN_DUR : FADE_OUT_DUR * 0.7,
                  ease: EASE_CONTENT as unknown as number[],
                  delay: isExpanded ? CONTENT_IN_DELAY : 0,
                },
                y: {
                  duration: isExpanded ? FADE_IN_DUR + 0.1 : FADE_OUT_DUR * 0.5,
                  ease: EASE_CONTENT as unknown as number[],
                  delay: isExpanded ? CONTENT_IN_DELAY : 0,
                },
              }}
            >
              {area.title}
              {area.subtitle && (
                <>
                  <br />
                  {area.subtitle}
                </>
              )}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="font-['Roboto'] font-normal text-[15px] leading-[23px] tracking-[-0.225px] text-white mb-8"
              style={{ fontVariationSettings: "'wdth' 100" }}
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                y: isExpanded ? 0 : 25,
              }}
              transition={{
                opacity: {
                  duration: isExpanded ? FADE_IN_DUR : FADE_OUT_DUR * 0.7,
                  ease: EASE_CONTENT as unknown as number[],
                  delay: isExpanded ? CONTENT_IN_DELAY + 0.1 : 0,
                },
                y: {
                  duration: isExpanded ? FADE_IN_DUR + 0.1 : FADE_OUT_DUR * 0.5,
                  ease: EASE_CONTENT as unknown as number[],
                  delay: isExpanded ? CONTENT_IN_DELAY + 0.1 : 0,
                },
              }}
            >
              {area.description}
            </motion.p>

            {/* Button */}
            <motion.div
              initial={false}
              animate={{
                opacity: isExpanded ? 1 : 0,
                y: isExpanded ? 0 : 20,
              }}
              transition={{
                opacity: {
                  duration: isExpanded ? FADE_IN_DUR : FADE_OUT_DUR * 0.6,
                  ease: EASE_CONTENT as unknown as number[],
                  delay: isExpanded ? CONTENT_IN_DELAY + 0.2 : 0,
                },
                y: {
                  duration: isExpanded ? FADE_IN_DUR + 0.1 : FADE_OUT_DUR * 0.4,
                  ease: EASE_CONTENT as unknown as number[],
                  delay: isExpanded ? CONTENT_IN_DELAY + 0.2 : 0,
                },
              }}
            >
              <Link
                to={area.href}
                aria-label={`Saiba mais sobre ${area.title}`}
                className="inline-flex items-center justify-center bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[40px] px-[29px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                Saiba Mais
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────
   Mobile Accordion Card
   ───────────────────────────────────── */
function MobileCard({
  area,
  isExpanded,
  onClick,
}: {
  area: PracticeArea;
  isExpanded: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-[#a57255]/30">
      {/* Header */}
      <div
        className="flex items-center justify-between bg-[#452b1e] p-6 cursor-pointer"
        onClick={onClick}
      >
        <h3 className="font-['Roboto'] font-normal text-[24px] leading-[30px] tracking-[-0.525px] text-white">
          {area.title}
        </h3>
        <div className="w-[32px] h-[32px] flex-shrink-0">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <ArrowIcon className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{
              height: {
                duration: 0.8,
                ease: [0.22, 0.61, 0.36, 1],
              },
            }}
            className="overflow-hidden bg-[#452b1e]"
          >
            <div className="p-6 space-y-6">
              {/* Title */}
              <motion.h4
                className="font-['Roboto'] font-normal text-[20px] leading-[26px] tracking-[-0.525px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.25 }}
              >
                {area.title}
                {area.subtitle && (
                  <>
                    <br />
                    {area.subtitle}
                  </>
                )}
              </motion.h4>

              {/* Description */}
              <motion.p
                className="font-['Roboto'] font-normal text-[15px] leading-[23px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, delay: 0.35 }}
              >
                {area.description}
              </motion.p>

              {/* Image */}
              <motion.div
                className="w-full overflow-hidden"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <img
                  src={area.image}
                  alt={area.title}
                  className="w-full h-auto object-contain opacity-75 mix-blend-multiply"
                />
              </motion.div>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.5 }}
              >
                <Link
                  to={area.href}
                  aria-label={`Saiba mais sobre ${area.title}`}
                  className="inline-flex items-center justify-center bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[40px] px-[29px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white"
                >
                  Saiba Mais
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────
   Main Section
   ───────────────────────────────────── */
export function PracticeAreas() {
  const [expandedCard, setExpandedCard] = useState<number>(1);
  const isAnimatingRef = useRef(false);

  const handleCardClick = useCallback((id: number) => {
    if (id === expandedCard) return; // já está aberto
    setExpandedCard(id);
  }, [expandedCard]);

  return (
    <section className="bg-[#452b1e] w-full overflow-hidden">
      <div className="w-full">
        {/* Title */}
        <div className="px-[20px] md:px-[40px] lg:px-[80px] py-[40px] md:py-[50px] lg:py-[60px]">
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[48px] leading-[1.2] tracking-[-0.832px] text-white">
            Áreas de Atuação
          </h2>
        </div>

        {/* Desktop Accordion Cards */}
        <div className="hidden lg:flex w-full h-[600px]">
          {practiceAreas.map((area) => (
            <DesktopCard
              key={area.id}
              area={area}
              isExpanded={expandedCard === area.id}
              onClick={() => handleCardClick(area.id)}
              isLast={area.id === 4}
            />
          ))}
        </div>

        {/* Mobile/Tablet Accordion */}
        <div className="lg:hidden">
          {practiceAreas.map((area) => (
            <MobileCard
              key={area.id}
              area={area}
              isExpanded={expandedCard === area.id}
              onClick={() => handleCardClick(area.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}