/**
 * RedeDeParceirosPage
 * Hero com stats + FAQ + CTA parceiro + Blog + Contact
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Contact } from '../components/Contact';
import { PlayButton } from '../components/ui/PlayButton';
import { readPanel } from '../hooks/usePanelContent';

/* ─── SVG paths ─── */
import svgArrow from '../../imports/svg-ooetqark54';

/* ─── Images ─── */
import imgHero    from 'figma:asset/54cf6aca159f931dce5bb5fc9acf3688b3cb4291.png';
import imgSticky  from 'figma:asset/940e862066ee1fd2bbaffb4e7abc4b2193f6f969.png';
import imgArticle1 from 'figma:asset/8f998da633bb92dcab13a208c71a97e2986d6c06.png';
import imgArticle2 from 'figma:asset/a6246b350004d1d692b469864824af4843190e94.png';
import imgArticle3 from 'figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png';

/* ─── Fade-in ─── */
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

/* ─── Stats ─── */
const stats = [
  { number: '14+', label: 'Anos de\nExperiência' },
  { number: '4',   label: 'Áreas de Atuação\nEspecializada' },
  { number: '30+', label: 'Países\nAtendidos' },
  { number: '2',   label: 'Modalidades de\nAtendimento' },
];

/* ─── FAQ ─── */
const faqs = [
  {
    id: 1,
    q: 'Onde fica o escritório?',
    a: 'O escritório da Sousa Araújo Advocacia está localizado em Brasília/DF — Edifício Varig, Setor Comercial Norte, quadra 04, bloco B, sala 702, 7º andar — Asa Norte, Brasília/DF. Atendemos presencialmente e online para todo o Brasil e brasileiros no exterior.',
  },
  {
    id: 2,
    q: 'Vocês atendem online?',
    a: 'Sim. Realizamos atendimento 100% online para clientes em qualquer cidade do Brasil e para brasileiros no exterior. Utilizamos videoconferência, e-mail e WhatsApp para garantir um atendimento próximo e eficiente, independentemente da localização do cliente.',
  },
  {
    id: 3,
    q: 'O que é a Consulta de Viabilidade?',
    a: 'A Consulta de Viabilidade é o ponto de entrada do nosso Método SAA. Em até 72 horas após o envio da documentação inicial, o cliente recebe um relatório escrito com o diagnóstico do caso, os caminhos jurídicos disponíveis, prazo estimado e custo previsto para cada opção.',
  },
  {
    id: 4,
    q: 'Alliance Of Legal Experts — o que é?',
    a: 'A Alliance of Legal Experts é uma rede internacional de escritórios e advogados parceiros presente em mais de 30 países. A Sousa Araújo Advocacia integra essa rede, permitindo atender casos que envolvam questões jurídicas transfronteiriças.',
  },
  {
    id: 5,
    q: 'O que é o Método SAA?',
    a: 'O Método SAA é a metodologia proprietária do escritório para condução de casos complexos. Baseia-se em três pilares: (1) Diagnóstico preciso; (2) Rota clara — sequência de etapas e prazos; (3) Execução monitorada — atualizações periódicas e acesso transparente ao andamento.',
  },
  {
    id: 6,
    q: 'Quanto custa uma consulta?',
    a: 'O investimento na Consulta de Viabilidade é fixo e informado previamente. Ao final, você recebe um relatório detalhado com os caminhos jurídicos, custos estimados e prazos — sem compromisso de contratação.',
  },
  {
    id: 7,
    q: 'Vocês garantem resultado?',
    a: 'Nenhum advogado ético garante resultado, pois o desfecho depende do Poder Judiciário. O que garantimos é organização, estratégia, comunicação transparente e dedicação máxima ao seu caso.',
  },
  {
    id: 8,
    q: 'Meu imóvel não tem escritura. O que fazer?',
    a: 'Existem diferentes caminhos para regularização: usucapião extrajudicial no cartório, usucapião judicial, adjudicação compulsória ou regularização fundiária. O caminho certo depende da sua situação específica — a Consulta de Viabilidade vai indicar a melhor rota.',
  },
];

/* ─── Articles ─── */
const articles = [
  {
    id: 1,
    image: imgArticle1,
    category: 'Direito Imobiliário e Usucapião',
    title: 'Imóvel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento',
    date: '01 Nov',
  },
  {
    id: 2,
    image: imgArticle2,
    category: 'Homologação e Direito Internacional',
    title: 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
    date: '01 Nov',
  },
  {
    id: 3,
    image: imgArticle3,
    category: 'Direito de Família',
    title: 'União Estável x Casamento: O que muda no seu patrimônio?',
    date: '01 Nov',
  },
];

/* ─── Hero ─── */
function PageHero() {
  const title = readPanel('parceiros.hero.title', 'Rede de Parceiros da Sousa Araújo Advocacia');
  const subtitle = readPanel('parceiros.hero.subtitle', 'A Sousa Araújo Advocacia trabalha com uma rede qualificada de parceiros para oferecer atendimento completo e integrado. Tradutores juramentados, correspondentes jurídicos, contadores e consultores empresariais fazem parte do nosso ecossistema de confiança — sempre com identificação profissional e alinhamento ao nosso padrão de qualidade.');

  return (
    <section className="relative w-full h-[560px] md:h-[680px] lg:h-[760px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={imgHero}
          alt="Rede de parceiros internacionais — Sousa Araújo Advocacia"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(153deg, rgba(22,19,18,0) 67%, rgb(22,19,18) 92%), linear-gradient(195deg, rgba(22,19,18,0) 16%, rgb(22,19,18) 85%)' }} />
        <div className="absolute inset-x-0 top-0 h-[120px]" style={{ background: 'linear-gradient(to bottom, rgba(22,19,18,0.55) 0%, transparent 100%)' }} />
      </div>

      <div className="absolute inset-0 max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] flex flex-col justify-end pb-[50px] md:pb-[64px] lg:pb-[72px]">
        <FadeIn>
          <h1 className="font-['Marcellus'] text-[36px] sm:text-[46px] md:text-[54px] lg:text-[58px] leading-[1.15] tracking-[-0.87px] text-white max-w-[780px] mb-[20px] md:mb-[26px]">
            {title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p
            className="font-['Roboto'] text-[16px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white max-w-[610px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {subtitle}
          </p>
        </FadeIn>

        <div className="hidden lg:block absolute right-[110px] bottom-[72px]">
          <PlayButton size={100} />
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatsSection() {
  const panelStats = stats.map((s, i) => ({
    number: readPanel(`parceiros.stat${i + 1}.number`, s.number),
    label: readPanel(`parceiros.stat${i + 1}.label`, s.label),
  }));

  return (
    <section className="bg-[#161312] py-[50px] md:py-[60px] lg:py-[70px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[40px] md:gap-[30px]">
          {panelStats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div>
                <p className="font-['Lora'] text-[52px] md:text-[64px] leading-[1] text-[#a57255] mb-[10px]">{s.number}</p>
                <p className="font-['Noto_Sans'] font-medium text-[17px] md:text-[21px] leading-[1.43] tracking-[-0.42px] text-white whitespace-pre-line">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Bio Section ─── */
function BioSection() {
  const allianceTitle = readPanel('parceiros.bio.allianceTitle', 'Alliance of Legal Experts');
  const metodoTitle = readPanel('parceiros.bio.metodoTitle', 'O Método SAA como Base da Parceria');
  const perfilTitle = readPanel('parceiros.bio.perfilTitle', 'Perfil do Parceiro Ideal');
  const comoTitle = readPanel('parceiros.bio.comoTitle', 'Como Funciona a Parceria');
  const bioCta = readPanel('parceiros.bio.ctaText', 'Iniciar contato como parceiro');

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

        {/* Left — sticky photo */}
        <div className="sticky top-0 w-full hidden lg:block">
          <img
            src={imgSticky}
            alt="Dra. Lidiane Sousa Araújo — Rede de Parceiros SA Advocacia"
            className="w-full h-screen object-cover object-center"
          />
        </div>

        {/* Mobile: imagem normal acima do texto */}
        <div className="lg:hidden w-full">
          <div className="relative w-full overflow-hidden" style={{ paddingBottom: '70%' }}>
            <img
              src={imgSticky}
              alt="Dra. Lidiane Sousa Araújo — Rede de Parceiros SA Advocacia"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right — scrollable content */}
        <div className="bg-[#262626] px-[32px] md:px-[50px] lg:px-[70px] py-[60px] md:py-[80px] lg:py-[100px] space-y-[48px]">

          <FadeIn>
            <h2 className="font-['Marcellus'] text-[22px] md:text-[26px] lg:text-[30px] leading-[1.35] tracking-[-0.516px] text-[#a57255]">
              Lidiane Sousa Araújo — OAB/DF 34.876<br />
              Fundadora da SA | Sousa Araújo Advocacia
            </h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div
              className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              <p>
                O escritório da Sousa Araújo Advocacia está localizado em Brasília/DF — Edifício Varig,
                Setor Comercial Norte — com atendimento presencial e{' '}
                <strong className="font-bold">100% online</strong> para todo o Brasil e brasileiros no exterior.
              </p>
              <p>
                Fundado pela Dra. Lidiane Sousa Araújo, a SA Advocacia atua há mais de 14 anos em{' '}
                <strong className="font-bold">Direito de Família, Regularização de Imóveis,
                Homologação de Sentença Estrangeira e Consultoria Empresarial</strong>, com estrutura
                profissional e padrão de qualidade que servem de base para toda a rede de parceiros.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {allianceTitle}
              </h3>
              <div
                className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                <p>
                  A Sousa Araújo Advocacia integra a{' '}
                  <strong className="font-bold">Alliance of Legal Experts</strong>, uma rede internacional
                  de escritórios e profissionais jurídicos presentes em mais de 30 países. Essa parceria
                  permite atender casos que envolvam questões transfronteiriças com suporte técnico local
                  em cada jurisdição.
                </p>
                <p>
                  Através da rede, conectamos clientes a tradutores juramentados, correspondentes jurídicos,
                  contadores internacionais e consultores em diferentes países — sempre com rigorosa
                  identificação profissional e alinhamento ao padrão de qualidade do escritório.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {metodoTitle}
              </h3>
              <div
                className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                <p>
                  O <strong className="font-bold">Método SAA</strong> é a metodologia proprietária que
                  orienta todos os casos do escritório. Baseado em três pilares —
                  <strong className="font-bold"> diagnóstico preciso</strong>,{' '}
                  <strong className="font-bold">rota clara</strong> e{' '}
                  <strong className="font-bold">execução monitorada</strong> —, garante que cada parceiro
                  saiba exatamente o que é esperado em cada etapa da colaboração.
                </p>
                <p>
                  Parceiros que atuam junto ao escritório recebem briefings objetivos, prazos claros e
                  comunicação estruturada em todas as fases do processo. Não existe trabalho informal ou
                  sem registro aqui.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {perfilTitle}
              </h3>
              <div
                className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                <p>Buscamos profissionais que compartilham dos mesmos valores:</p>
                <ul className="list-none space-y-[10px] pl-[4px]">
                  {[
                    ['Tradutores juramentados', ' com registro ativo e experiência em documentos jurídicos'],
                    ['Correspondentes jurídicos', ' em estados fora do DF para diligências presenciais'],
                    ['Contadores e consultores', ' com expertise em operações internacionais ou societárias'],
                    ['Profissionais técnicos', ' como engenheiros e arquitetos para laudos imobiliários'],
                    ['Advogados especialistas', ' em áreas complementares com quem possamos co-patrocinar casos'],
                  ].map(([bold, rest]) => (
                    <li key={String(bold)} className="flex items-start gap-[10px]">
                      <span className="mt-[10px] shrink-0 w-[5px] h-[5px] bg-[#a57255]" />
                      <span><strong className="font-bold">{bold}</strong>{rest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {comoTitle}
              </h3>
              <div
                className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                <p>
                  Quando um caso exige um serviço complementar, a Dra. Lidiane aciona o parceiro diretamente,
                  apresenta o escopo do trabalho e alinha prazo e condições antes de qualquer início de atividade.
                  O cliente é sempre informado sobre quem está envolvido no seu caso.
                </p>
                <p>
                  Qualidade, ética, prazo e comunicação transparente não são diferenciais — são
                  <strong className="font-bold"> condições mínimas</strong> para fazer parte da rede.
                </p>
                <div className="pt-[8px]">
                  <a
                    href="#contato"
                    className="inline-flex items-center gap-3 font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors"
                  >
                    {bioCta}
                    <svg className="w-[10px] h-[10px]" fill="none" viewBox="0 0 10 10">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Section ─── */
function FaqSection() {
  const [openId, setOpenId] = useState<number>(1);
  const faqTitle = readPanel('parceiros.faq.title', 'Perguntas\nfrequentes');
  const faqDesc = readPanel('parceiros.faq.desc', 'Reunimos as dúvidas mais comuns dos nossos clientes. Se a sua pergunta não estiver aqui, entre em contato — a Sousa Araújo Advocacia responde com agilidade e transparência.');
  const panelFaqs = faqs.map((faq, i) => ({
    ...faq,
    q: readPanel(`parceiros.faq${i + 1}.q`, faq.q),
    a: readPanel(`parceiros.faq${i + 1}.a`, faq.a),
  }));

  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[60px] lg:gap-[80px]">
          {/* Left */}
          <FadeIn>
            <div className="lg:sticky lg:top-[100px]">
              <h2 className="font-['Marcellus'] text-[36px] md:text-[43px] leading-[52px] tracking-[-0.516px] text-white mb-[16px] whitespace-pre-line">
                {faqTitle}
              </h2>
              <p className="font-['Noto_Sans'] text-[16px] md:text-[18px] leading-[25px] tracking-[-0.225px] text-white/70">
                {faqDesc}
              </p>
            </div>
          </FadeIn>

          {/* Right - accordion */}
          <div className="border-t border-[#e0dede]/30">
            {panelFaqs.map((faq, i) => (
              <FadeIn key={faq.id} delay={i * 0.05}>
                <div className="border-b border-[#e0dede]/30">
                  <button
                    onClick={() => setOpenId(openId === faq.id ? -1 : faq.id)}
                    className="w-full flex items-center justify-between py-[24px] md:py-[28px] text-left gap-4"
                  >
                    <span className="font-['Noto_Sans'] text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.3px] text-white">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-[14px] h-[14px] shrink-0 text-[#a57255] transition-transform duration-300 ${openId === faq.id ? 'rotate-45' : ''}`}
                      fill="none" viewBox="0 0 14 14"
                    >
                      <path d="M7 0.875V13.125M0.875 7H13.125" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="font-['Roboto'] text-[15px] leading-[23px] tracking-[-0.225px] text-white/70 pb-[24px]"
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Partner CTA ─── */
function PartnerCTASection() {
  const ctaTitle = readPanel('parceiros.cta.title', 'Seja um Parceiro da Sousa Araújo Advocacia');
  const ctaDesc = readPanel('parceiros.cta.desc', 'Se você é tradutor juramentado, correspondente jurídico, contador, consultor empresarial ou profissional técnico e deseja integrar nossa rede de parceiros, entre em contato. Valorizamos profissionais comprometidos com qualidade, ética, prazo e comunicação transparente.');
  const ctaBtn = readPanel('parceiros.cta.buttonText', 'Seja parceiro');

  return (
    <section className="bg-[#452b1e] py-[80px] md:py-[100px] lg:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] flex flex-col items-center text-center">

        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.25] lg:leading-[52px] tracking-[-0.516px] text-white max-w-[511px] mb-[28px] md:mb-[36px]">
            {ctaTitle}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="font-['Noto_Sans'] text-[16px] md:text-[18px] leading-[25px] tracking-[-0.225px] text-white max-w-[760px] mb-[40px] md:mb-[52px]">
            {ctaDesc}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a
            href="#contato"
            className="inline-flex items-center gap-[12px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:opacity-75 transition-opacity"
          >
            {ctaBtn}
            <svg className="w-[10px] h-[10px] shrink-0" fill="none" viewBox="0 0 10 10">
              <path d={svgArrow.p1238f200} stroke="white" strokeWidth="1.02093" />
            </svg>
          </a>
        </FadeIn>

      </div>
    </section>
  );
}

/* ─── Blog Articles ─── */
function BlogSection() {
  const blogHeading = readPanel('parceiros.blog.heading', 'Quem se informa, se protege');
  const panelArticles = articles.map((a, i) => ({
    ...a,
    title: readPanel(`parceiros.blog.article${i + 1}.title`, a.title),
    category: readPanel(`parceiros.blog.article${i + 1}.category`, a.category),
    date: readPanel(`parceiros.blog.article${i + 1}.date`, a.date),
  }));

  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[32px] md:text-[40px] lg:text-[43px] leading-[52px] tracking-[-0.516px] text-white mb-[40px] md:mb-[60px]">
            {blogHeading}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[24px] lg:gap-[28px]">
          {panelArticles.map((art, i) => (
            <FadeIn key={art.id} delay={i * 0.1}>
              <article className="group cursor-pointer">
                <div className="relative overflow-hidden mb-[16px]" style={{ paddingBottom: '60%' }}>
                  <img
                    src={art.image}
                    alt={art.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date badge */}
                  <div className="absolute top-0 left-0 backdrop-blur-[2px] bg-white/45 px-[8px] py-[6px] text-center min-w-[62px]">
                    <p className="font-['Lora'] text-[18px] leading-[23px] text-white">
                      {art.date.split(' ')[0]}
                    </p>
                    <p className="font-['Lora'] text-[13px] leading-[23px] text-white">
                      {art.date.split(' ')[1]}
                    </p>
                  </div>
                </div>
                <p
                  className="font-['Noto_Sans'] text-[12px] leading-[18px] tracking-[-0.195px] text-[#a57255] mb-[10px]"
                >
                  {art.category}
                </p>
                <h3 className="font-['Noto_Sans'] text-[20px] md:text-[22px] leading-[30px] tracking-[-0.33px] text-white mb-[16px]">
                  {art.title}
                </h3>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-['Noto_Sans'] font-medium text-[15px] text-white hover:text-[#a57255] transition-colors"
                >
                  Ler Artigo
                  <svg className="w-[10px] h-[10px]" fill="none" viewBox="0 0 10 10">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
        {/* Ver todos */}
        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-[50px] md:mt-[60px]">
            <Link
              to="/blog"
              className="inline-flex items-center gap-3 font-['Noto_Sans'] font-medium text-[15px] text-white hover:text-[#a57255] transition-colors"
            >
              Ver todos os artigos
              <svg className="w-[10px] h-[10px]" fill="none" viewBox="0 0 10 10">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function RedeDeParceirosPage() {
  return (
    <>
      <PageHero />
      <StatsSection />
      <BioSection />
      <FaqSection />
      <PartnerCTASection />
      <Contact />
    </>
  );
}