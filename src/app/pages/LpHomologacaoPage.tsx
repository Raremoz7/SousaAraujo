/**
 * HomologacaoPage — Página de Homologação de Sentença Estrangeira
 */

import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { PlayButton } from '../components/ui/PlayButton';
import { Contact } from '../components/Contact';
import { readPanel } from '../hooks/usePanelContent';
import { trackCtaClick } from '../components/PainelDashboard';

/* ─── SVG icons (Group2108) ─── */
import svgPaths from '../../imports/svg-6m3rhq93hc';
import { imgG4831 } from '../../imports/svg-vm94k';

/* ─── Images ─── */
import imgHero        from 'figma:asset/06aaca3c12be1ff51f1d4afd173a07e3f7c97a71.png';
import imgSticky      from 'figma:asset/a0b7c9bef0b44dc80296ef9e1988f0fafef366c6.png';
import imgLidiane     from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgArticle1    from 'figma:asset/34ce5436e08c758c7caf264d1f898def9d74aca4.png';
import imgArticle2    from 'figma:asset/d7fe1dfe4f2ee3429afecf2779e1c80cb1fe325d.png';
import imgArticle3    from 'figma:asset/a5580c23af3b216a8a3f848b2925b7a923ff7361.png';
import imgParallax    from 'figma:asset/556ebedb0f16ed8ef71076d16091bebcb3d946fc.png';
import imgMetodo      from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgCtaBg       from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';

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
      <g clipPath="url(#folderClip)">
        <path d={svgPaths.p382e2f00} fill="#B58468" />
        <path d={svgPaths.p1ffc9480} fill="#B58468" />
        <path d={svgPaths.p68f4000} fill="#B58468" />
        <path d={svgPaths.pcbc0200} fill="#B58468" />
        <path d={svgPaths.p322cc600} fill="#B58468" />
        <path d={svgPaths.pd46ad00} fill="#B58468" />
        <path d={svgPaths.p14c80f00} fill="#B58468" />
      </g>
      <defs>
        <clipPath id="folderClip">
          <rect fill="white" height="67.9085" width="67.9085" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconBalance() {
  return (
    <div className="relative size-full overflow-hidden">
      {/* stand */}
      <div className="absolute flex items-center justify-center" style={{ inset: '20.97% 44.36% 35.48% 45.97%' }}>
        <div className="flex-none" style={{ width: '8.36px', height: '41.81px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-26.322px -6.194px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-26.322px -6.194px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29032 41.8065"><path d={svgPaths.pef9f880} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* circle top */}
      <div className="absolute flex items-center justify-center" style={{ inset: '14.52% 43.55% 74.19% 45.16%' }}>
        <div className="flex-none" style={{ width: '10.84px', height: '10.84px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-25.548px 0px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-25.548px 0px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.8387 10.8387"><path d={svgPaths.p385f06f0} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* base */}
      <div className="absolute flex items-center justify-center" style={{ inset: '79.03% 20.16% 15.32% 45.16%' }}>
        <div className="flex-none" style={{ width: '33.29px', height: '5.42px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-25.548px -61.936px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-25.548px -61.936px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.2903 5.41939"><path d={svgPaths.pef66000} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* left diagonal bar */}
      <div className="absolute flex items-center justify-center" style={{ inset: '20.97% 70.16% 52.42% 20.16%' }}>
        <div className="flex-none" style={{ width: '9.29px', height: '25.55px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-1.548px -6.194px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-1.548px -6.194px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.29032 25.5484"><path d={svgPaths.p23614f00} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* right diagonal bar */}
      <div className="absolute flex items-center justify-center" style={{ inset: '20.97% 27.42% 52.42% 62.1%' }}>
        <div className="flex-none" style={{ width: '10.06px', height: '25.55px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-41.807px -6.194px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-41.807px -6.194px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0645 25.5484"><path d={svgPaths.peca7780} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* left pan arch */}
      <div className="absolute flex items-center justify-center" style={{ inset: '45.16% 61.29% 46.77% 17.74%' }}>
        <div className="flex-none" style={{ width: '20.13px', height: '7.74px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-41.032px -29.419px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-41.032px -29.419px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.129 7.74197"><path d={svgPaths.p19779000} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* right pan arch */}
      <div className="absolute flex items-center justify-center" style={{ inset: '45.16% 17.74% 46.77% 61.29%' }}>
        <div className="flex-none" style={{ width: '20.13px', height: '7.74px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '0px -29.419px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '0px -29.419px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.129 7.74197"><path d={svgPaths.p26899880} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* ribbon wave base */}
      <div className="absolute flex items-center justify-center" style={{ inset: '58.06% 19.35% 21.77% 26.61%' }}>
        <div className="flex-none" style={{ width: '51.87px', height: '19.36px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-7.742px -41.807px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-7.742px -41.807px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.871 19.3549"><path d={svgPaths.p1d947d80} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* top left horizontal bar */}
      <div className="absolute flex items-center justify-center" style={{ inset: '16.94% 52.42% 76.61% 22.58%' }}>
        <div className="flex-none" style={{ width: '24px', height: '6.19px' }}>
          <div className="relative size-full" style={{ maskImage: `url('${imgG4831}')`, maskSize: '67.355px 67.355px', maskPosition: '-3.871px -2.323px', WebkitMaskImage: `url('${imgG4831}')`, WebkitMaskSize: '67.355px 67.355px', WebkitMaskPosition: '-3.871px -2.323px' }}>
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 6.19358"><path d={svgPaths.p129bd000} fill="#B58468" /></svg>
          </div>
        </div>
      </div>
      {/* top right horizontal bar */}
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

/* ─── Fade-in ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <>{children}</>;
}

/* ─── Accordion ─── */
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
            <span className="font-['Noto_Sans'] text-[16px] md:text-[18px] leading-[1.4] tracking-[-0.27px] text-white">
              {item.q}
            </span>
            <svg
              className={`w-[14px] h-[14px] shrink-0 text-[#a57255] transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
              fill="none" viewBox="0 0 14 14"
            >
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
                <p className="font-['Roboto'] text-[15px] leading-[23px] tracking-[-0.225px] text-white/70 pb-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ─── Data ─── */
const trustPoints = [
  'Atendimento 100% online, de qualquer país, com segurança',
  'Organização documental completa antes do protocolo',
  '14+ anos de experiência em Família e Direito Internacional',
];

const scenarios = [
  'Divorciou-se nos EUA, Europa ou outro país e não sabe se o divórcio vale no Brasil',
  'Precisa atualizar o estado civil no registro brasileiro, mas a sentença é estrangeira',
  'Tem filhos e a decisão de guarda foi feita no exterior — precisa que valha aqui',
  'Quer vender ou partilhar bens no Brasil, mas o divórcio foi feito fora',
  'Já tentou resolver sozinho no STJ e o processo foi indeferido por erro documental',
  'Mora no exterior e não sabe como conduzir o processo à distância',
];

const metodoSteps = [
  { letter: 'S', title: 'Seleção do Caminho Correto', desc: 'Diagnóstico do caso e análise da documentação disponível para identificar o tipo de sentença e o rito aplicável no STJ.' },
  { letter: 'A', title: 'Arquitetura Documental', desc: 'Levantamento e organização de todos os documentos necessários: certidões, traduções juramentadas, apostilamento e procurações.' },
  { letter: 'A', title: 'Ação Monitorada no STJ', desc: 'Protocolo, acompanhamento do andamento processual, resposta a diligências e comunicação transparente em cada etapa.' },
];

const objecoes = [
  { 
    q: readPanel('lp-homologacao.objecao1.q', 'Meu divórcio foi feito no exterior, não preciso fazer nada no Brasil?'), 
    a: readPanel('lp-homologacao.objecao1.a', 'Mito. Sem a homologação, seu estado civil permanece inalterado no registro brasileiro. Isso impede novo casamento, gera problemas em partilha de bens e pode afetar questões tributárias e previdenciárias.') 
  },
  { 
    q: readPanel('lp-homologacao.objecao2.q', 'O processo é muito demorado?'), 
    a: readPanel('lp-homologacao.objecao2.a', 'Com a documentação correta e organizada previamente, o prazo médio no STJ é de 6 a 18 meses. O maior fator de atraso são erros documentais — evitamos isso com nossa Arquitetura Documental.') 
  },
  { 
    q: readPanel('lp-homologacao.objecao3.q', 'Documentos Necessários'), 
    a: readPanel('lp-homologacao.objecao3.a', 'Sentença estrangeira original com apostilamento, tradução juramentada, certidão de trânsito em julgado, documentos de identificação das partes e procuração para o advogado. Outros documentos podem ser necessários conforme o caso.') 
  },
  { 
    q: readPanel('lp-homologacao.objecao4.q', 'Qualquer advogado pode fazer?'), 
    a: readPanel('lp-homologacao.objecao4.a', 'Tecnicamente sim, mas na prática exige conhecimento específico das exigências do STJ, fluência em documentação internacional e experiência com apostilamento e traduções. Erro documental significa indeferimento e reinício do processo.') 
  },
  { 
    q: readPanel('lp-homologacao.objecao5.q', 'Posso fazer sozinho no STJ?'), 
    a: readPanel('lp-homologacao.objecao5.a', 'A representação por advogado é obrigatória no STJ. Não é possível fazer o pedido de homologação sem patrono habilitado.') 
  },
  { 
    q: readPanel('lp-homologacao.objecao6.q', 'Moro no exterior e não consigo ir ao Brasil'), 
    a: readPanel('lp-homologacao.objecao6.a', 'Todo o processo pode ser conduzido 100% online. A procuração pode ser outorgada no Consulado Brasileiro ou com apostilamento no país de residência.') 
  },
];

const faqItems = [
  { 
    q: readPanel('lp-homologacao.faq1.q', 'O que é homologação de sentença estrangeira?'), 
    a: readPanel('lp-homologacao.faq1.a', 'É o procedimento pelo qual o Superior Tribunal de Justiça (STJ) reconhece e valida uma decisão judicial estrangeira para que ela produza efeitos legais no Brasil. Sem a homologação, a sentença estrangeira não tem força executória em território nacional.') 
  },
  { 
    q: readPanel('lp-homologacao.faq2.q', 'Quanto tempo demora a homologação de sentença estrangeira no STJ?'), 
    a: readPanel('lp-homologacao.faq2.a', 'O prazo médio é de 6 a 18 meses, dependendo da complexidade documental e da demanda do STJ. Com a documentação completa e correta desde o início, evitamos diligências que prolongam o processo.') 
  },
  { 
    q: readPanel('lp-homologacao.faq3.q', 'Quanto custa o processo de homologação?'), 
    a: readPanel('lp-homologacao.faq3.a', 'O custo envolve honorários advocatícios, custas do STJ, tradução juramentada e apostilamento. O valor exato é informado na Consulta de Viabilidade, após análise dos documentos.') 
  },
  { 
    q: readPanel('lp-homologacao.faq4.q', 'Preciso de advogado para homologar sentença estrangeira?'), 
    a: readPanel('lp-homologacao.faq4.a', 'Sim. A representação por advogado habilitado é obrigatória nos processos no STJ.') 
  },
  { 
    q: readPanel('lp-homologacao.faq5.q', 'Divórcio consensual feito no exterior precisa de homologação?'), 
    a: readPanel('lp-homologacao.faq5.a', 'Sim, independentemente de como o divórcio foi realizado no exterior (consensual ou litigioso, judicial ou administrativa), é necessária a homologação pelo STJ para que produza efeitos no Brasil.') 
  },
  { 
    q: readPanel('lp-homologacao.faq6.q', 'Posso homologar sentença estrangeira morando fora do Brasil?'), 
    a: readPanel('lp-homologacao.faq6.a', 'Sim. Todo o processo pode ser conduzido remotamente. Você outorga procuração no Consulado Brasileiro ou com apostilamento, e o advogado conduz tudo no Brasil.') 
  },
];

const articles = [
  { id: 1, image: imgArticle1, category: 'Homologação de Sentença Estrangeira', title: 'O que acontece se você não homologar seu divórcio estrangeiro no Brasil', date: '01 Nov' },
  { id: 2, image: imgArticle2, category: 'Direito Internacional', title: 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?', date: '01 Nov' },
  { id: 3, image: imgArticle3, category: 'Direito de Família', title: 'Guarda de filhos decidida no exterior: como fazer valer no Brasil?', date: '01 Nov' },
];

/* ─────────────────────────────────────────── */

function PageHero() {
  const heroTitle = readPanel('lp-homologacao.hero.title', 'Homologação de Sentença Estrangeira em Brasília DF.');
  const heroHighlight = readPanel('lp-homologacao.hero.highlightedTitle', 'Atendimento Online Mundial');
  const heroSubtitle = readPanel('lp-homologacao.hero.subtitle', 'Seu divórcio, guarda ou decisão judicial obtida no exterior só tem validade no Brasil após homologação pelo STJ. Na SA Advocacia, cuidamos de todo o processo com organização documental rigorosa e atendimento online para brasileiros em qualquer lugar do mundo.');

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[720px] lg:min-h-[800px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img src={imgHero} alt="Homologação de sentença estrangeira no Brasil — Sousa Araújo Advocacia" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180.958deg, rgba(22,19,18,0) 38%, rgb(22,19,18) 96%)' }} />
        <div className="absolute inset-x-0 top-0 h-[120px]" style={{ background: 'linear-gradient(to bottom, rgba(22,19,18,0.55) 0%, transparent 100%)' }} />
      </div>
      <div className="relative max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] pt-[130px] md:pt-[160px] pb-[80px] md:pb-[100px]">
        <FadeIn>
          <h1 className="font-['Marcellus'] text-[36px] sm:text-[46px] md:text-[54px] lg:text-[58px] leading-[1.15] tracking-[-0.87px] text-white max-w-[820px] mb-[24px]">
            {heroTitle}{' '}
            <span className="text-[#a57255]">{heroHighlight}</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="font-['Roboto'] font-bold text-[18px] md:text-[20px] leading-[25px] text-white max-w-[615px] mb-[32px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {heroSubtitle}
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <a href="#contato" aria-label="Agendar consulta de viabilidade para homologação" onClick={() => trackCtaClick('homologacao')} className="inline-flex items-center justify-center bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[46px] px-[32px] font-['Noto_Sans'] font-medium text-[15px] text-white tracking-[-0.225px]">
            Agendar Consulta de Viabilidade
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

function TrustSection() {
  const feat1 = readPanel('lp-homologacao.trust.feature1', 'Atendimento 100% online, de qualquer país, com segurança');
  const feat2 = readPanel('lp-homologacao.trust.feature2', 'Organização documental completa antes do protocolo');
  const feat3 = readPanel('lp-homologacao.trust.feature3', '14+ anos de experiência em Família e Direito Internacional');
  const trustTitle = readPanel('lp-homologacao.trust.title', 'Por Que Confiar na Sousa Araújo Advocacia em Brasília');
  const trustBody = readPanel('lp-homologacao.trust.body', 'Com 14 anos de atuação em Direito de Família e experiência consolidada em processos internacionais, a SA | Sousa Araújo Advocacia desenvolveu um fluxo próprio para homologação de sentença estrangeira em Brasília DF.');

  const features = [
    { icon: <IconGlobe />, size: 'size-[72px]', text: feat1 },
    { icon: <IconFolder />, size: 'size-[68px]', text: feat2 },
    { icon: <IconBalance />, size: 'size-[80px]', text: feat3 },
  ];

  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[80px] items-center">

          {/* Left — icon list */}
          <FadeIn>
            <div className="flex flex-col gap-[36px] md:gap-[44px]">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-[24px] md:gap-[28px]">
                  <div className={`shrink-0 ${f.size}`}>{f.icon}</div>
                  <p className="font-['Noto_Sans'] font-medium text-[18px] md:text-[21px] leading-[25px] tracking-[-0.4194px] text-white">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right — title + body + CTA */}
          <div className="flex flex-col gap-[28px] md:gap-[36px]">
            <FadeIn delay={0.1}>
              <h2 className="font-['Lora'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white">
                {trustTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-['Noto_Sans'] text-[16px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white">
                {trustBody}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <a
                href="#contato"
                onClick={() => trackCtaClick('homologacao')}
                className="inline-flex items-center gap-[14px] bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[49px] px-[28px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white self-start"
              >
                Agendar Consulta de Viabilidade
                <svg fill="none" viewBox="0 0 19.47 19.47" className="w-[19px] h-[19px] shrink-0">
                  <path d={svgPaths.p353ec300} fill="white" />
                </svg>
              </a>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}

function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);
  const parallaxImage = readPanel('lp-homologacao.parallax.image', imgParallax);

  return (
    <>
      {/* Strip #452b1e — ponte visual entre TrustSection e o parallax */}
      

      {/* Parallax image */}
      <div ref={ref} className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 45vw, 580px)' }}>
        <motion.div
          className="absolute inset-x-0 w-full"
          style={{ y, top: '-18%', bottom: '-18%' }}
        >
          <img
            src={parallaxImage}
            alt="Atendimento online — escritório de advocacia em Brasília"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>
    </>
  );
}

function ScenariosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  const scenariosTitle = readPanel('lp-homologacao.scenarios.title', 'Você Se Reconhece em Algum Desses Cenários?');
  const ctaSubtitle = readPanel('lp-homologacao.scenarios.ctaSubtitle', 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.');
  const risksTitle = readPanel('lp-homologacao.scenarios.risksTitle', 'Os Principais Pontos de Atenção Nesse Processo');
  const stickyImage = readPanel('lp-homologacao.scenarios.stickyImage', imgSticky);
  const panelScenarios = scenarios.map((s, i) => readPanel(`lp-homologacao.scenarios.item${i + 1}`, s));
  const risks = [
    readPanel('lp-homologacao.scenarios.risk1', 'Estado civil desatualizado no Brasil: você continua legalmente casado(a), o que impede novo casamento'),
    readPanel('lp-homologacao.scenarios.risk2', 'Impossibilidade de partilhar bens no Brasil: imóveis e contas ficam bloqueados'),
    readPanel('lp-homologacao.scenarios.risk3', 'Decisão de guarda sem validade no Brasil sem a homologação'),
    readPanel('lp-homologacao.scenarios.risk4', 'Risco de indeferimento por vício documental'),
  ];
  const deepDives = [
    { title: readPanel('lp-homologacao.scenarios.deep1.title', 'Homologação de divórcio feito no exterior no Brasil'), text: readPanel('lp-homologacao.scenarios.deep1.text', 'Esse é um dos temas mais frequentes entre nossos clientes.') },
    { title: readPanel('lp-homologacao.scenarios.deep2.title', 'Como homologar sentença estrangeira no STJ'), text: readPanel('lp-homologacao.scenarios.deep2.text', 'Na Consulta de Viabilidade, definimos a melhor estratégia.') },
    { title: readPanel('lp-homologacao.scenarios.deep3.title', 'Documentos necessários para homologação'), text: readPanel('lp-homologacao.scenarios.deep3.text', 'A lista pode parecer extensa, mas você não precisa ter tudo pronto.') },
  ];

  return (
    <section ref={ref} className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left: all content bg-[#262626] ── */}
        <div className="bg-[#262626] px-[20px] md:px-[40px] lg:px-[68px] py-[60px] md:py-[80px] lg:py-[100px] flex flex-col gap-[48px] lg:gap-[60px]">

          {/* Block 1 — Cenários */}
          <div>
            <FadeIn>
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white mb-[40px]">
                {scenariosTitle}
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-[20px] md:gap-[24px] mb-[40px]">
              {panelScenarios.map((s, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="flex items-start gap-[24px]">
                    <span className="font-['Lora'] text-[52px] md:text-[64px] leading-[1] text-[#a57255] shrink-0 w-[32px]">{i + 1}</span>
                    <p className="font-['Roboto'] text-[16px] md:text-[18px] lg:text-[20px] leading-[1.45] tracking-[-0.42px] text-white pt-[8px]" style={{ fontVariationSettings: "'wdth' 100" }}>{s}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.2}>
              <p className="font-['Roboto'] font-bold text-[18px] md:text-[20px] leading-[25px] text-white mb-[28px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                {ctaSubtitle}
              </p>
              <a
                href="#contato"
                onClick={() => trackCtaClick('homologacao')}
                className="inline-flex items-center gap-[14px] bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[49px] px-[22px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white"
              >
                Agendar Consulta de Viabilidade
                <svg fill="none" viewBox="0 0 19.47 19.47" className="w-[19px] h-[19px] shrink-0">
                  <path d={svgPaths.p353ec300} fill="white" />
                </svg>
              </a>
            </FadeIn>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Block 2 — Pontos de Atenção */}
          <div>
            <FadeIn>
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white mb-[32px]">
                {risksTitle}
              </h2>
            </FadeIn>

            {/* Risks subsection */}
            <FadeIn delay={0.1}>
              <h3 className="font-['Noto_Sans'] font-medium text-[#a57255] text-[20px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.42px] mb-[16px]">
                O Que Está em Risco Se Você Não Resolver
              </h3>
              <ul className="flex flex-col gap-[14px] mb-[40px]">
                {risks.map((r, i) => (
                  <li key={i} className="flex items-start gap-[10px]">
                    <span className="text-[#a57255] shrink-0 mt-[3px]">•</span>
                    <p className="font-['Noto_Sans'] text-[15px] md:text-[16px] leading-[23px] tracking-[-0.225px] text-white">{r}</p>
                  </li>
                ))}
              </ul>
            </FadeIn>

            {/* Deep-dive articles */}
            <div className="flex flex-col gap-[36px] md:gap-[44px]">
              {deepDives.map((d, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="border-t border-white/10 pt-[24px]">
                    <h3 className="font-['Noto_Sans'] font-medium text-[#a57255] text-[20px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.42px] mb-[12px]">
                      {d.title}
                    </h3>
                    <p className="font-['Noto_Sans'] text-[15px] md:text-[16px] leading-[23px] tracking-[-0.225px] text-white">
                      {d.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <a
                href="#contato"
                onClick={() => trackCtaClick('homologacao')}
                className="inline-flex items-center gap-[14px] bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[49px] px-[22px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white mt-[40px]"
              >
                Agendar Consulta de Viabilidade
                <svg fill="none" viewBox="0 0 19.47 19.47" className="w-[19px] h-[19px] shrink-0">
                  <path d={svgPaths.p353ec300} fill="white" />
                </svg>
              </a>
            </FadeIn>
          </div>
        </div>

        {/* ── Right: sticky + parallax photo ── */}
        <div className="hidden lg:block relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img
              src={stickyImage}
              alt="Brasileira no exterior com passaporte — homologação de sentença estrangeira"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function OnlineBanner() {
  const bannerText = readPanel('lp-homologacao.onlineBanner', 'Atendimento 100% online de qualquer país, com a mesma segurança de um escritório presencial.');
  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] text-center">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[997px] mx-auto mb-[32px]">
            {bannerText}
          </h2>
          <a href="#contato" onClick={() => trackCtaClick('homologacao')} className="inline-flex items-center justify-center bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[46px] px-[32px] font-['Noto_Sans'] font-medium text-[15px] text-white tracking-[-0.225px]">
            Agendar Consulta de Viabilidade
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function MetodoSaaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-16%', '16%']);
  const metodoTitle = readPanel('lp-homologacao.metodo.title', 'Método SAA (Sousa Araújo Advocacia) Aplicado a Homologação de Sentença Estrangeira (STJ)');
  const metodoImage = readPanel('lp-homologacao.metodo.image', imgMetodo);

  const steps = [
    {
      label: readPanel('lp-homologacao.metodo.step1.label', 'S: Seleção do Caminho Correto'),
      desc: readPanel('lp-homologacao.metodo.step1.desc', 'Analisamos sua sentença estrangeira e definimos a melhor rota processual.'),
    },
    {
      label: readPanel('lp-homologacao.metodo.step2.label', 'A: Arquitetura Documental'),
      desc: 'Montamos o dossiê completo: tradução juramentada, apostila de Haia, procuração, petição ao STJ. Você não precisa ter tudo pronto. Nós guiamos documento por documento, com checklist personalizado enviado por etapas. Se falta algo, orientamos como obter — inclusive à distância.\n(Você não precisa ter tudo pronto — nós guiamos cada etapa.)',
    },
    {
      label: readPanel('lp-homologacao.metodo.step3.label', 'A: Acompanhamento e Ação Técnica'),
      desc: readPanel('lp-homologacao.metodo.step3.desc', 'Protocolo no STJ, acompanhamento processual com relatórios periódicos, resposta a eventuais exigências do Ministério Público e do relator, até a decisão final e expedição da carta de sentença. Você recebe atualizações em cada movimentação relevante.'),
    },
  ];

  return (
    <section ref={ref} className="bg-[#161312] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]">

        {/* ── Left: text content ── */}
        <div className="px-[20px] md:px-[40px] lg:px-[110px] py-[60px] md:py-[80px] lg:py-[100px] flex flex-col gap-[40px] lg:gap-[48px]">
          <FadeIn>
            <h2 className="font-['Lora'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[566px]">
              Método SAA (Sousa Araújo Advocacia) Aplicado a Homologação de Sentença Estrangeira (STJ)
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-[32px] md:gap-[40px]">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border-t border-white/15 pt-[24px]">
                  <p className="font-['Noto_Sans'] font-medium text-[#a57255] text-[18px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.42px] mb-[12px]">
                    {step.label.replace(/^:\s*/, '')}
                  </p>
                  {step.desc.split('\n').map((line, j) => (
                    <p key={j} className="font-['Noto_Sans'] text-[15px] md:text-[16px] leading-[23px] tracking-[-0.225px] text-white mb-[4px]">
                      {line}
                    </p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <a
              href="#contato"
              onClick={() => trackCtaClick('homologacao')}
              className="inline-flex items-center gap-[14px] bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[49px] px-[22px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white self-start"
            >
              Agendar Consulta de Viabilidade
              <svg fill="none" viewBox="0 0 19.47 19.47" className="w-[19px] h-[19px] shrink-0">
                <path d={svgPaths.p353ec300} fill="white" />
              </svg>
            </a>
          </FadeIn>
        </div>

        {/* ── Right: parallax photo ── */}
        <div className="relative overflow-hidden min-h-[420px] lg:min-h-0">
          <motion.div
            className="absolute inset-x-0 w-full"
            style={{ y, top: '-16%', bottom: '-16%' }}
          >
            <img
              src={metodoImage}
              alt="Advogadas da Sousa Araújo Advocacia em reunião de trabalho"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* ─── Corner-bracket arrow (same as AreasDeAtuacao) ─── */
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

const EASE_EXPAND = [0.22, 0.61, 0.36, 1] as const;

const passoAPasso = [
  {
    id: 1, number: '01', 
    title: readPanel('lp-homologacao.passo1.title', 'Consulta de Viabilidade'),
    subtitle: readPanel('lp-homologacao.passo1.subtitle', 'Consulta de Viabilidade'),
    description: readPanel('lp-homologacao.passo1.desc', 'Analisamos sua sentença estrangeira, verificamos os requisitos do STJ e definimos a rota processual mais adequada ao seu caso. Se houver dispensa de homologação (divórcio consensual simples), identificamos isso antes de qualquer custo.'),
  },
  {
    id: 2, number: '02', 
    title: readPanel('lp-homologacao.passo2.title', 'Organização Documental'),
    subtitle: readPanel('lp-homologacao.passo2.subtitle', 'Organização Documental'),
    description: readPanel('lp-homologacao.passo2.desc', 'Montamos o dossiê completo: tradução juramentada, apostila de Haia, procuração e demais documentos exigidos pelo STJ. Você recebe um checklist personalizado e orientação passo a passo — sem precisar ter tudo pronto de imediato.'),
  },
  {
    id: 3, number: '03', 
    title: readPanel('lp-homologacao.passo3.title', 'Protocolo no STJ'),
    subtitle: readPanel('lp-homologacao.passo3.subtitle', 'Protocolo no STJ'),
    description: readPanel('lp-homologacao.passo3.desc', 'Com a documentação completa e revisada, protocolamos a petição de homologação no Superior Tribunal de Justiça. A organização prévia reduz o risco de exigências e indeferimentos por vício documental.'),
  },
  {
    id: 4, number: '04', 
    title: readPanel('lp-homologacao.passo4.title', 'Acompanhamento até a Decisão'),
    subtitle: readPanel('lp-homologacao.passo4.subtitle', 'Acompanhamento até a Decisão'),
    description: readPanel('lp-homologacao.passo4.desc', 'Monitoramos o andamento processual, respondemos às diligências do Ministério Público e do relator, e mantemos você informado em cada movimentação relevante — com relatórios periódicos e comunicação transparente.'),
  },
  {
    id: 5, number: '05', 
    title: readPanel('lp-homologacao.passo5.title', 'Carta de Sentença e Execução no STJ'),
    subtitle: readPanel('lp-homologacao.passo5.subtitle', 'Carta de Sentença e Execução'),
    description: readPanel('lp-homologacao.passo5.desc', 'Após a decisão favorável, providenciamos a expedição da carta de sentença e orientamos os próximos passos: atualização do estado civil no registro brasileiro, partilha de bens, regularização de guarda e demais desdobramentos.'),
  },
];

function ComoFuncionaSection() {
  const [expanded, setExpanded] = useState<number>(1);
  const handleClick = useCallback((id: number) => { if (id !== expanded) setExpanded(id); }, [expanded]);

  return (
    <section className="bg-[#161312] w-full my-[50px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[113px]">

        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[40px] md:mb-[60px]">
            Como Funciona — Passo a Passo
          </h2>
        </FadeIn>

        {passoAPasso.map((step) => (
          <div key={step.id}>
            <button
              type="button"
              onClick={() => handleClick(step.id)}
              className="w-full flex items-center h-[100px] md:h-[120px] lg:h-[150px] cursor-pointer group text-left"
            >
              <span className="font-['Lora'] font-normal text-[48px] md:text-[56px] lg:text-[70px] leading-[42px] tracking-[-0.832px] text-white flex-shrink-0 w-[72px] md:w-[95px] lg:w-[120px] select-none">
                {step.number}
              </span>
              <span
                className="font-['Roboto'] font-normal text-[22px] md:text-[26px] lg:text-[32px] leading-[42px] tracking-[-0.832px] text-white flex-1 ml-[20px] lg:ml-[42px] group-hover:text-[#a57255] transition-colors duration-300"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {step.title}
              </span>
              <motion.div
                className="w-[40px] h-[40px] md:w-[46px] md:h-[46px] lg:w-[51px] lg:h-[51px] flex-shrink-0"
                animate={{ rotate: expanded === step.id ? 180 : 0 }}
                transition={{ duration: 0.65, ease: EASE_EXPAND as unknown as number[] }}
              >
                <AccordionArrow className="w-full h-full" />
              </motion.div>
            </button>

            <div className="w-full h-px bg-[#a57255]/40" />

            <AnimatePresence initial={false}>
              {expanded === step.id && (
                <motion.div
                  key={`panel-${step.id}`}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ height: { duration: 0.8, ease: EASE_EXPAND as unknown as number[] } }}
                  className="overflow-hidden"
                >
                  <div className="pt-[40px] pb-[60px] lg:pt-[50px] lg:pb-[90px] max-w-[760px]">
                    <motion.h3
                      className="font-['Roboto'] font-normal text-[20px] md:text-[22px] lg:text-[25px] leading-[30px] tracking-[-0.525px] text-[#a57255] mb-[16px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, delay: 0.22 }}
                    >
                      {step.subtitle}
                    </motion.h3>
                    <motion.p
                      className="font-['Noto_Sans'] text-[16px] md:text-[18px] lg:text-[20px] leading-[28px] md:leading-[30px] tracking-[-0.225px] text-white mb-[28px]"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, delay: 0.3 }}
                    >
                      {step.description}
                    </motion.p>
                    <motion.a
                      href="#contato"
                      onClick={() => trackCtaClick('homologacao')}
                      className="inline-flex items-center gap-[8px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group/link"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.38 }}
                    >
                      Agendar Consulta de Viabilidade
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

/* ─────────────────────────────────────────────────────────────
   RiscoCtaBanner — "O maior risco não é o custo do processo"
   bg-[#452b1e] | 197px | texto esquerda + botão direita
───────────────────────────────────────────────────────────── */
function RiscoCtaBanner() {
  const riscoBannerText = readPanel('lp-homologacao.riscoBanner', 'O maior risco não é o custo do processo. É o custo de não resolver.');
  
  return (
    <section className="bg-[#452b1e]">
      <div
        className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[32px] lg:gap-[60px] py-[48px] lg:py-0"
        style={{ minHeight: '197px' }}
      >
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[24px] md:text-[32px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[733px]">
            {riscoBannerText}
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <a
            href="#contato"
            onClick={() => trackCtaClick('homologacao')}
            className="group relative inline-block bg-[#a57255] hover:bg-[#8f6146] transition-colors shrink-0"
            style={{ width: '316px', height: '49.314px' }}
          >
            <span
              className="absolute rounded-full bg-[#a57255] group-hover:bg-[#8f6146] transition-colors"
              style={{ left: '267.98px', top: '5.84px', width: '38.283px', height: '38.283px' }}
            />
            <span className="absolute" style={{ top: '30.04%', right: '6.17%', bottom: '30.48%', left: '87.67%' }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4661 19.4661">
                <path d={svgPaths.p353ec300} fill="white" />
              </svg>
            </span>
            <span
              className="absolute -translate-y-1/2 font-['Noto_Sans'] font-medium text-white whitespace-nowrap"
              style={{ left: '22.06px', top: '24.68px', fontSize: '15.184px', letterSpacing: '-0.2278px', lineHeight: '25.306px' }}
            >
              Agendar Consulta de Viabilidade
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function ObjecoesSection() {
  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[60px] lg:gap-[80px]">
          <FadeIn>
            <div className="lg:sticky lg:top-[100px]">
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] tracking-[-0.516px] text-white mb-[16px]">Dúvidas e Objeções Mais Comuns</h2>
              <p className="font-['Noto_Sans'] text-[16px] md:text-[18px] leading-[25px] tracking-[-0.225px] text-white/70">
                Reunimos as dúvidas mais comuns dos nossos clientes, organizadas por tema. Se a sua pergunta não estiver aqui, entre em contato — a Sousa Araújo Advocacia responde com agilidade e transparência.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Accordion items={objecoes} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function CostCtaBanner() {
  const costCtaTitle = readPanel('lp-homologacao.costCta.title', 'Quem entende o processo, controla o resultado');
  const costCtaBgImage = readPanel('lp-homologacao.costCta.bgImage', imgCtaBg);
  
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(320px, 38vw, 543px)' }}>
      {/* Background image + overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img
          src={costCtaBgImage}
          alt="Custo real da homologação de sentença estrangeira — agende sua consulta"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgba(22,19,18,0.4)]" />
      </div>

      {/* Centered content */}
      <div className="relative flex flex-col items-center justify-center gap-[32px] md:gap-[40px] px-[20px] text-center h-full py-[80px] md:py-[100px] lg:py-[120px]">
        <FadeIn>
          <h2 className="font-['Lora'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[567px]">
            {costCtaTitle}
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <a
            href="#contato"
            onClick={() => trackCtaClick('homologacao')}
            className="group relative inline-block bg-[#a57255] hover:bg-[#8f6146] transition-colors shrink-0"
            style={{ width: '316px', height: '49.314px' }}
          >
            {/* Circle — inside button, near right edge */}
            <span
              className="absolute rounded-full bg-[#a57255] group-hover:bg-[#8f6146] transition-colors"
              style={{ left: '267.98px', top: '5.84px', width: '38.283px', height: '38.283px' }}
            />
            {/* Arrow SVG — positioned over the circle */}
            <span className="absolute" style={{ top: '30.04%', right: '6.17%', bottom: '30.48%', left: '87.67%' }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4661 19.4661">
                <path d={svgPaths.p353ec300} fill="white" />
              </svg>
            </span>
            {/* Label */}
            <span
              className="absolute -translate-y-1/2 font-['Noto_Sans'] font-medium text-white whitespace-nowrap"
              style={{ left: '22.06px', top: '24.68px', fontSize: '15.184px', letterSpacing: '-0.2278px', lineHeight: '25.306px' }}
            >
              Agendar Consulta de Viabilidade
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WhyTrustSection — "Por Que Clientes Confiam" + "O Que Você Recebe"
   Layout: foto sticky esquerda | conteúdo bg-[#262626] direita
───────────────────────────────────────────────────────────── */
function WhyTrustSection() {
  const lidianeImage = readPanel('lp-homologacao.whyTrust.lidianeImage', imgLidiane);
  const trust1 = readPanel('lp-homologacao.whyTrust.trust1', '14+ anos de experiência em Direito de Família e processos internacionais');
  const trust2 = readPanel('lp-homologacao.whyTrust.trust2', 'Atuação em Brasília/DF com alcance nacional e atendimento a brasileiros no exterior');
  const trust3 = readPanel('lp-homologacao.whyTrust.trust3', 'Método SAA: Seleção, Arquitetura Documental e Acompanhamento por etapas');
  const trust4 = readPanel('lp-homologacao.whyTrust.trust4', 'Checklist personalizado entregue na consulta de viabilidade');
  const trust5 = readPanel('lp-homologacao.whyTrust.trust5', 'Relatórios periódicos de acompanhamento do caso');
  const consulta1 = readPanel('lp-homologacao.whyTrust.consulta1', 'Análise preliminar do seu caso');
  const consulta2 = readPanel('lp-homologacao.whyTrust.consulta2', 'Definição da rota processual (cartório ou judicial)');
  const consulta3 = readPanel('lp-homologacao.whyTrust.consulta3', 'Checklist documental personalizado');
  
  function CtaButton() {
    return (
      <a
        href="#contato"
        onClick={() => trackCtaClick('homologacao')}
        className="group relative inline-block bg-[#a57255] hover:bg-[#8f6146] transition-colors shrink-0 self-start"
        style={{ width: '316px', height: '49.314px' }}
      >
        <span
          className="absolute rounded-full bg-[#a57255] group-hover:bg-[#8f6146] transition-colors"
          style={{ left: '267.98px', top: '5.84px', width: '38.283px', height: '38.283px' }}
        />
        <span className="absolute" style={{ top: '30.04%', right: '6.17%', bottom: '30.48%', left: '87.67%' }}>
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4661 19.4661">
            <path d={svgPaths.p353ec300} fill="white" />
          </svg>
        </span>
        <span
          className="absolute -translate-y-1/2 font-['Noto_Sans'] font-medium text-white whitespace-nowrap"
          style={{ left: '22.06px', top: '24.68px', fontSize: '15.184px', letterSpacing: '-0.2278px', lineHeight: '25.306px' }}
        >
          Agendar Consulta de Viabilidade
        </span>
      </a>
    );
  }

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── Esquerda: foto sticky ── */}
        <div className="hidden lg:block relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <img
              src={lidianeImage}
              alt="Dra. Lidiane Sousa Araújo"
              className="absolute h-full max-w-none top-0"
              style={{ left: '-70.19%', width: '222.22%' }}
            />
          </div>
        </div>

        {/* ── Direita: conteúdo ── */}
        <div className="bg-[#262626] px-[20px] md:px-[40px] lg:px-[70px] py-[60px] md:py-[80px] lg:py-[100px] flex flex-col gap-[56px] lg:gap-[72px]">

          {/* Bloco 1 */}
          <FadeIn>
            <div className="flex flex-col gap-[32px]">
              <h2 className="font-['Marcellus'] text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.516px] text-[#a57255]">
                Por Que Clientes Confiam na Sousa Araújo Advocacia
              </h2>
              <ul className="flex flex-col gap-[14px] font-['Noto_Sans'] text-[17px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white list-disc pl-[27px]">
                <li>{trust1}</li>
                <li>{trust2}</li>
                <li>{trust3}</li>
                <li>{trust4}</li>
                <li>{trust5}</li>
                <li>Parceria com tradutores juramentados e empresas de apostilamento</li>
                <li>Sigilo absoluto e comunicação transparente como valores inegociáveis</li>
              </ul>
              <CtaButton />
            </div>
          </FadeIn>

          {/* Bloco 2 */}
          <FadeIn delay={0.12}>
            <div className="flex flex-col gap-[32px]">
              <h2 className="font-['Marcellus'] text-[28px] md:text-[32px] leading-[1.25] tracking-[-0.516px] text-[#a57255]">
                O que você recebe na Consulta de Viabilidade:
              </h2>
              <ul className="flex flex-col gap-[10px] font-['Noto_Sans'] text-[17px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white list-disc pl-[27px]">
                <li>{consulta1}</li>
                <li>{consulta2}</li>
                <li>{consulta3}</li>
                <li>Estimativa de prazos e custos</li>
                <li>Plano de ação claro com próximos passos</li>
              </ul>
              <CtaButton />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ─��───────────────────────────────────────────────────────────
   HistoriasSection — "Histórias Reais de Quem Já Passou por Isso"
   bg-[#452b1e] | 3 colunas: imagem + subtítulo #a57255 + texto
───────────────────────────────────────────────────────────── */
const historiasDefault = [
  {
    id: 1,
    img: imgArticle1,
    alt: "Brasileira nos EUA com documentação de viagem",
    subtitle: "Brasileira nos EUA, divorciada há 3 anos, estado civil bloqueado no Brasil",
    body: "Cliente residia nos Estados Unidos há 8 anos e obteve o divórcio em tribunal americano. Ao tentar vender um imóvel no Brasil, descobriu que seu estado civil continuava como 'casada' no registro civil brasileiro. Procurou a Sousa Araújo Advocacia, que organizou toda a documentação à distância — tradução juramentada, apostilamento e petição ao STJ. Em 4 meses, a sentença foi homologada e o estado civil atualizado. O imóvel foi vendido sem impedimentos.",
  },
  {
    id: 2,
    img: imgArticle2,
    alt: "Família binacional em aeroporto",
    subtitle: "Casal binacional com guarda definida na Alemanha — decisão sem validade no Brasil",
    body: "Brasileiro casado com alemã obteve decisão de guarda compartilhada em tribunal alemão. Ao retornar ao Brasil com os filhos, percebeu que a decisão não tinha validade aqui. A Sousa Araújo Advocacia conduziu a homologação no STJ com atendimento 100% online, incluindo tradução juramentada e apostila de Haia. A decisão foi homologada em 5 meses e a guarda passou a ter força executória no Brasil.",
  },
  {
    id: 3,
    img: imgArticle3,
    alt: "Documentos jurídicos sobre mesa",
    subtitle: "Pedido indeferido no STJ por erro documental — recuperado com nova instrução",
    body: "Cliente havia contratado outro profissional para homologar divórcio feito em Portugal. O pedido foi indeferido pelo STJ por falha na tradução e ausência de apostilamento. A Sousa Araújo Advocacia analisou o motivo do indeferimento, refez toda a instrução documental e protocolou novo pedido. Em 3 meses, a homologação foi deferida.",
  },
];

function HistoriasSection() {
  const title = readPanel('lp-homologacao.historias.title', 'Histórias Reais de Quem Já Passou por Isso');
  
  const historias = historiasDefault.map((h, i) => {
    const itemNum = i + 1;
    const imgKey = `lp-homologacao.historias.item${itemNum}.img`;
    const imgPanel = readPanel(imgKey, '');
    const resolvedImg = imgPanel && !imgPanel.startsWith('figma:asset/') ? imgPanel : h.img;
    
    return {
      ...h,
      img: resolvedImg,
      subtitle: readPanel(`lp-homologacao.historias.item${itemNum}.subtitle`, h.subtitle),
      body: readPanel(`lp-homologacao.historias.item${itemNum}.body`, h.body),
    };
  });

  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.2] lg:leading-[52px] tracking-[-0.516px] text-white mb-[48px] md:mb-[64px] max-w-[456px]">
            {title}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[36px] md:gap-[38px]">
          {historias.map((h, i) => (
            <FadeIn key={h.id} delay={i * 0.1}>
              <div className="flex flex-col gap-[20px]">
                {/* Imagem — aspect 410/249 com leve zoom */}
                <div className="overflow-hidden w-full" style={{ aspectRatio: '409.86 / 249.13' }}>
                  <img
                    src={h.img}
                    alt={h.alt}
                    className="w-[calc(100%+23.2px)] h-[calc(100%+14.1px)] max-w-none object-cover -ml-[11.6px] -mt-[7.05px]"
                  />
                </div>
                {/* Subtítulo */}
                <p className="font-['Roboto'] text-[18px] md:text-[20px] lg:text-[25px] leading-[1.2] lg:leading-[30px] tracking-[-0.525px] text-[#a57255]">
                  {h.subtitle}
                </p>
                {/* Corpo */}
                <p className="font-['Noto_Sans'] text-[13px] leading-[18px] tracking-[-0.195px] text-white">
                  {h.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[60px] lg:gap-[80px]">
          <FadeIn>
            <div className="lg:sticky lg:top-[100px]">
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] tracking-[-0.516px] text-white">
                FAQ
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Accordion items={faqItems} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[52px] tracking-[-0.516px] text-white mb-[40px] md:mb-[60px]">
            Quem se informa, se protege
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px]">
          {articles.map((art, i) => (
            <FadeIn key={art.id} delay={i * 0.1}>
              <article className="group cursor-pointer">
                <div className="relative overflow-hidden mb-[16px]" style={{ paddingBottom: '60%' }}>
                  <img src={art.image} alt={art.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-0 left-0 backdrop-blur-[2px] bg-white/45 px-[8px] py-[6px] text-center min-w-[62px]">
                    <p className="font-['Lora'] text-[18px] leading-[23px] text-white">{art.date.split(' ')[0]}</p>
                    <p className="font-['Lora'] text-[13px] leading-[23px] text-white">{art.date.split(' ')[1]}</p>
                  </div>
                </div>
                <p className="font-['Noto_Sans'] text-[12px] leading-[18px] tracking-[-0.195px] text-[#a57255] mb-[10px]">{art.category}</p>
                <h3 className="font-['Noto_Sans'] text-[20px] leading-[28px] tracking-[-0.3px] text-white mb-[14px]">{art.title}</h3>
                <Link to="/blog" className="inline-flex items-center gap-2 font-['Noto_Sans'] font-medium text-[14px] text-white hover:text-[#a57255] transition-colors">
                  Ler Artigo
                  <svg className="w-[10px] h-[10px]" fill="none" viewBox="0 0 10 10">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomologacaoPage() {
  return (
    <>
      <PageHero />
      <TrustSection />
      <ParallaxSection />
      <MetodoSaaSection />
      <ScenariosSection />
      <OnlineBanner />
      <ComoFuncionaSection />
      <RiscoCtaBanner />
      <ObjecoesSection />
      <CostCtaBanner />
      <WhyTrustSection />
      <HistoriasSection />
      <FaqSection />
      <Contact />
    </>
  );
}