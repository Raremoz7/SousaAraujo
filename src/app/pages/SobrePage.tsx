import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Contact } from '../components/Contact';
import { CtaBanner } from '../components/CtaBanner';
import { PlayButton } from '../components/ui/PlayButton';
import svgPaths from '../../imports/svg-jaymxarxn1';
import { readPanel } from '../hooks/usePanelContent';

/* ─── Images from Figma ─── */
import imgHeroPortrait from 'figma:asset/5e3c0735c07c017f159c71adef667c328c8ad129.png';
import LidianeSousaAraujo from '../../imports/LidianeSousaAraujo';
import imgTeamPhoto    from 'figma:asset/2b85fa036dea8b3032c27b752074d867c5fe1f17.png';
import imgGallery1     from 'figma:asset/f93fab1ef1d5d123bb5e3c544b05533319fc528f.png';
import imgGallery2     from 'figma:asset/0a2c4b4b53a6b852695e6a0c347b2fd603ee66f2.png';
import imgGallery3     from 'figma:asset/9972a3ecc156d325ee1f67a9bdb5e6e98cd03776.png';
import imgArticle1     from 'figma:asset/8f998da633bb92dcab13a208c71a97e2986d6c06.png';
import imgArticle2     from 'figma:asset/a6246b350004d1d692b469864824af4843190e94.png';
import imgArticle3     from 'figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png';
import svgArrow        from '../../imports/svg-od596xq1d5';
import imgOfficeBanner from 'figma:asset/71f13aaa0ca504c09e2ef8743773ab6d8f0274fa.png';
import svgIcons from '../../imports/svg-7ep6oounx2';

/* ─── Arrow Icon ─── */
function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[10px] h-[10px] ${className}`} fill="none" viewBox="0 0 10 10">
      <path d={svgArrow.p1238f200} stroke="currentColor" strokeWidth="1.02093" />
    </svg>
  );
}

/* ─── Star Icon (from Background-22-199 SVG paths) ─── */
function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[17px] h-[17px] ${className}`} fill="none" viewBox="0 0 17 17">
      <g clipPath="url(#star-clip)">
        <path d={svgPaths.p2b1b0a80} fill="white" />
      </g>
      <defs>
        <clipPath id="star-clip">
          <rect fill="white" height="17" width="17" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ─── Prev / Next arrow icons (from Background-22-199 SVG paths) ─── */
function PrevArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[34px] h-[34px] ${className}`} fill="none" viewBox="0 0 34 34">
      <path d="M33.8868 16.9333H0.267438" stroke="white" strokeMiterlimit="10" strokeWidth="1.38" />
      <path d={svgPaths.p22c616c0} stroke="white" strokeMiterlimit="10" strokeWidth="1.38" />
      <path d={svgPaths.p282a4d00} stroke="white" strokeMiterlimit="10" strokeWidth="1.38" />
    </svg>
  );
}

function NextArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[34px] h-[34px] ${className}`} fill="none" viewBox="0 0 34 34">
      <path d="M0 16.9333H33.6193" stroke="white" strokeMiterlimit="10" strokeWidth="1.38" />
      <path d={svgPaths.p1bc46b00} stroke="white" strokeMiterlimit="10" strokeWidth="1.38" />
      <path d={svgPaths.p2967f380} stroke="white" strokeMiterlimit="10" strokeWidth="1.38" />
    </svg>
  );
}

/* ─── Stats ─── */
const stats = [
  { number: '14+', label: 'Anos de\nExperiência' },
  { number: '4',   label: 'Áreas de\nAtuação Especializada' },
  { number: '30+', label: 'Países\nAtendidos' },
  { number: '2',   label: 'Modalidades de\nAtendimento' },
];

/* ─── Testimonials data ─── */
const testimonials = [
  {
    id: 1,
    quote: '"Fui atendida com um cuidado que não esperava encontrar em um escritório de advocacia. Tudo foi explicado com clareza, cada etapa comunicada no prazo e o processo resolvido sem surpresas. Me senti segura do início ao fim."',
    author: 'M.S',
    role: 'Cliente',
    stars: 5,
  },
  {
    id: 2,
    quote: '"A Dra. Lidiane resolveu em poucos meses um processo de homologação que eu achei que levaria anos. Atendimento impecável, sempre disponível para tirar dúvidas e explicar cada detalhe. Recomendo com toda confiança."',
    author: 'R.C',
    role: 'Cliente — Homologação Internacional',
    stars: 5,
  },
  {
    id: 3,
    quote: '"Precisei regularizar um imóvel com situação bem complicada. A Dra. Lidiane conduziu todo o processo com muita competência e transparência. Finalmente resolvi algo que carregava há mais de 10 anos."',
    author: 'A.F',
    role: 'Cliente — Direito Imobiliário',
    stars: 5,
  },
  {
    id: 4,
    quote: '"Passei por um divórcio difícil e o suporte da Dra. Lidiane foi fundamental. Além de extremamente competente, ela demonstrou empatia e sensibilidade em cada momento. Sou muito grata por ter tido esse acompanhamento."',
    author: 'C.M',
    role: 'Cliente — Direito de Família',
    stars: 5,
  },
];

/* ─── Articles ─── */
const articles = [
  {
    id: 1,
    day: '01', month: 'Nov',
    category: 'Direito Imobiliário e Usucapião',
    title: 'Imóvel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento',
    image: imgArticle1,
    href: '/blog/imovel-sem-escritura-caminhos-regularizar-brasilia',
  },
  {
    id: 2,
    day: '01', month: 'Nov',
    category: 'Homologação e Direito Internacional',
    title: 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
    image: imgArticle2,
    href: '/blog/posso-vender-imovel-brasil-divorcio-pendente-exterior',
  },
  {
    id: 3,
    day: '01', month: 'Nov',
    category: 'Direito de Família',
    title: 'União Estável x Casamento: O que muda no seu patrimônio?',
    image: imgArticle3,
    href: '/blog/uniao-estavel-x-casamento-diferencas-patrimonio',
  },
];

/* ─── Fade-in animation wrapper ─── */
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

/* ─── Page Hero ─── */
function PageHero() {
  const heroTitle = readPanel('sobre.hero.title', 'Mais de 14 anos de atuação. Experiência, estratégia e compromisso a longo prazo.');
  const heroSubtitle = readPanel('sobre.hero.subtitle', 'Sobre o escritório');

  return (
    <section className="relative w-full min-h-[520px] lg:h-[680px] overflow-hidden">
      {/* Background portrait image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          alt="Dra. Lidiane Sousa Araújo"
          className="absolute inset-0 w-full h-full object-cover object-top"
          src={imgHeroPortrait}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(210.536deg, rgba(22, 19, 18, 0) 33.101%, rgba(22, 19, 18, 0.7) 82.021%), linear-gradient(182.823deg, rgba(22, 19, 18, 0) 49.957%, rgb(22, 19, 18) 86.803%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] h-full flex flex-col justify-end pb-[60px] md:pb-[80px] pt-[120px]">
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

        {/* Play Button */}
        <div className="hidden lg:block absolute right-[110px] bottom-[80px]">
          <PlayButton size={100} />
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const panelStats = stats.map((s, i) => ({
    number: readPanel(`sobre.stat${i + 1}.number`, s.number),
    label: readPanel(`sobre.stat${i + 1}.label`, s.label),
  }));

  return (
    <section className="bg-[#161312] px-[0px] pt-[20px] pb-[70px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] pt-[10px] pb-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[24px] md:gap-[40px]">
          {panelStats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex flex-col gap-[8px]">
                <span className="font-['Lora'] text-[40px] md:text-[52px] lg:text-[64px] leading-[1] text-[#a57255] opacity-70">
                  {stat.number}
                </span>
                <span
                  className="font-['Roboto'] font-normal text-[14px] md:text-[15px] leading-[22px] tracking-[-0.225px] text-white/70 whitespace-pre-line"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {stat.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Bio Section — two columns, no sticky ─── */
function BioSection() {
  const bioHeading = readPanel('sobre.quem.title', 'Lidiane Sousa Araújo — OAB/DF 34.876\nAdvogada Especialista em Família, Imóveis e Homologação Internacional');
  const bioP1 = readPanel('sobre.quem.paragraph1', 'Lidiane Sousa Araújo é advogada inscrita na OAB do Distrito Federal sob o número 34.876...');
  const bioP2 = readPanel('sobre.quem.paragraph2', 'Fundadora da SA | Sousa Araújo Advocacia...');
  const trajetoriaTitle = readPanel('sobre.bio.trajetoria.title', 'Uma Trajetória Construída Caso a Caso');
  const areasTitle = readPanel('sobre.bio.areas.title', 'Áreas que se Conectam na Vida Real');
  const metodoTitle = readPanel('sobre.bio.metodo.title', 'Método de Trabalho');
  const presencialTitle = readPanel('sobre.bio.presencial.title', 'Presencial em Brasília. Online para o Mundo.');
  const redeTitle = readPanel('sobre.bio.rede.title', 'Atuação em Rede');
  const valoresTitle = readPanel('sobre.bio.valores.title', 'Valores que Orientam Cada Caso');

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

        {/* ── Left column: portrait, sticky ── */}
        <div className="sticky top-0 w-full">
          <img
            src={LidianeSousaAraujo}
            alt="Dra. Lidiane Sousa Araújo"
            className="w-full h-screen object-cover object-center"
          />
        </div>

        {/* ── Right column: gray bg, scrollable text ── */}
        <div className="bg-[#262626] px-[32px] md:px-[50px] lg:px-[70px] py-[60px] md:py-[80px] lg:py-[100px] space-y-[48px]">

          <FadeIn>
            <h2 className="font-['Marcellus'] text-[24px] md:text-[28px] lg:text-[32px] leading-[1.35] tracking-[-0.516px] text-[#a57255]"
              dangerouslySetInnerHTML={{ __html: bioHeading.replace(/\n/g, '<br />') }}
            />
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
              style={{ fontVariationSettings: "'wdth' 100" }}>
              <p dangerouslySetInnerHTML={{ __html: bioP1 }} />
              <p dangerouslySetInnerHTML={{ __html: bioP2 }} />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {trajetoriaTitle}
              </h3>
              <div className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}>
                <p>
                  Lidiane começou sua carreira no <strong className="font-bold">Direito de Família</strong>, área que rapidamente se tornaria sua maior especialidade e o coração da Sousa Araújo Advocacia. Atender famílias em momentos de ruptura, reorganização e luto ensinou a ela algo que nenhuma pós-graduação ensina: que o direito, quando bem aplicado, tem o poder de devolver estabilidade à vida das pessoas.
                </p>
                <p>
                  Com o tempo, percebeu que muitos dos seus clientes de família também tinham imóveis irregulares, heranças mal resolvidas e negócios sem proteção jurídica adequada. Em vez de encaminhar esses casos para outros profissionais, aprofundou-se em cada uma dessas áreas, construindo uma atuação que <strong className="font-bold">acompanha o cliente de forma completa</strong>, sem fragmentar sua história entre diferentes escritórios.
                </p>
                <p>
                  A especialidade em <strong className="font-bold">Homologação de Sentença Estrangeira</strong> surgiu da escuta ativa. Brasileiros que viviam nos EUA, Europa e Canadá chegavam com divórcios feitos fora do Brasil sem saber que essas decisões precisavam ser validadas no STJ para produzir efeitos legais aqui. Lidiane passou a se dedicar a esse nicho com profundidade técnica e sensibilidade para as particularidades de quem vive longe do Brasil e precisa resolver questões jurídicas sérias à distância.
                </p>
                <p>
                  A <strong className="font-bold">atuação empresarial</strong> nasceu de forma igualmente orgânica. Empresários que já eram clientes de família começaram a trazer suas demandas de negócio: contratos mal redigidos, marcas sem registro, sociedades sem estrutura jurídica adequada. Lidiane estruturou um modelo de consultoria preventiva e recorrente que acompanha o crescimento das PMEs com a mesma atenção e rigor dedicados às demandas pessoais.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {areasTitle}
              </h3>
              <div className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}>
                <p>
                  O que torna a Sousa Araújo Advocacia diferente de um escritório de nicho tradicional é a capacidade de <strong className="font-bold">enxergar o cliente de forma completa</strong>. As quatro áreas de atuação não foram escolhidas ao acaso. Elas se conectam de maneira natural e frequente na vida real das pessoas.
                </p>
                <p>
                  O empresário que precisa de contratos bem redigidos muitas vezes também está passando por um divórcio que pode impactar diretamente sua participação societária. A família que precisa fazer o inventário frequentemente descobre que o imóvel herdado não tem escritura e precisa ser regularizado antes de ser partilhado. O brasileiro que retorna do exterior após anos fora precisa não apenas homologar a sentença estrangeira, mas também regularizar bens, resolver questões de guarda e reorganizar sua vida jurídica por completo.
                </p>
                <p>
                  Essa sobreposição de demandas é a realidade da maioria dos clientes. E é exatamente aqui que a Sousa Araújo Advocacia entrega seu maior valor: <strong className="font-bold">não é necessário explicar sua história para diferentes especialistas em diferentes escritórios</strong>. A Dra. Lidiane conhece cada área com profundidade e enxerga o caso como um todo, identificando conexões, antecipando riscos e construindo uma estratégia que resolve não apenas o problema imediato, mas protege o cliente nas frentes que ele ainda não percebeu que precisam de atenção.
                </p>
                <p className="font-bold">
                  Família protege patrimônio. Patrimônio sustenta negócios. Negócios geram legado. Legado precisa de planejamento jurídico desde o início.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {metodoTitle}
              </h3>
              <div className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}>
                <p>
                  Antes de qualquer protocolo ou ação, a Dra. Lidiane realiza uma <strong className="font-bold">avaliação rigorosa de cada caso</strong>. Identifica o melhor caminho, os riscos envolvidos e a estratégia mais eficiente para aquela situação específica. A prioridade é sempre a via extrajudicial: cartório, acordo, consultoria preventiva. Quando o caminho judicial é inevitável, a atuação é firme, organizada e orientada ao resultado.
                </p>
                <p>Cada cliente recebe:</p>
                <ul className="list-none space-y-[8px] pl-[4px]">
                  {[
                    ['Checklist completo', ' de documentos antes de qualquer protocolo'],
                    ['Relatórios periódicos', ' de acompanhamento do processo'],
                    ['Comunicação clara', ' em cada etapa, sem silêncio e sem surpresas'],
                  ].map(([bold, rest]) => (
                    <li key={bold} className="flex items-start gap-[10px]">
                      <span className="mt-[9px] shrink-0 w-[5px] h-[5px] bg-[#a57255]" />
                      <span><strong className="font-bold">{bold}</strong>{rest}</span>
                    </li>
                  ))}
                </ul>
                <p>Essa organização não é burocracia. É respeito pelo tempo, pelo dinheiro e pela tranquilidade de cada pessoa que confia seu caso ao escritório.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {presencialTitle}
              </h3>
              <div className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}>
                <p>
                  A Sousa Araújo Advocacia conta com espaço de atendimento presencial no <strong className="font-bold">Edifício Varig, Setor Comercial Norte, em Brasília.</strong> Um ambiente premium que reflete o padrão de qualidade do escritório.
                </p>
                <p>
                  Mas ao longo dos anos, a Dra. Lidiane percebeu algo importante sobre seus clientes: <strong className="font-bold">o que eles mais valorizavam não era o tamanho do escritório. Era resultado e otimização do tempo.</strong>
                </p>
                <ul className="list-none space-y-[8px] pl-[4px]">
                  {[
                    ['Reuniões remotas seguras', ' com qualidade de atendimento presencial'],
                    ['Assinatura digital', ' e envio protegido de documentos'],
                    ['Registro detalhado', ' de cada etapa, prazo e decisão do processo'],
                    ['Comunicação estruturada', ' que mantém o cliente informado sem que ele precise perguntar'],
                  ].map(([bold, rest]) => (
                    <li key={bold} className="flex items-start gap-[10px]">
                      <span className="mt-[9px] shrink-0 w-[5px] h-[5px] bg-[#a57255]" />
                      <span><strong className="font-bold">{bold}</strong>{rest}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  O resultado é um atendimento mais ágil, mais organizado e mais eficiente, seja presencialmente em Brasília, online para todo o Brasil ou para brasileiros em qualquer parte do mundo.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {redeTitle}
              </h3>
              <div className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}>
                <p>
                  Casos complexos podem exigir expertise complementar. Por isso, a Dra. Lidiane construiu ao longo dos anos uma <strong className="font-bold">rede de parceiros qualificados</strong>, advogados especialistas em diferentes áreas e regiões do Brasil, que atuam em colaboração quando necessário. Sempre com identificação profissional, padrão de qualidade alinhado ao da Sousa Araújo Advocacia e comunicação transparente com o cliente em cada etapa.
                </p>
                <p>Essa estrutura garante cobertura nacional sem abrir mão da especialidade e do cuidado que definem o trabalho do escritório.</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-[16px]">
              <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.516px] text-[#a57255]">
                {valoresTitle}
              </h3>
              <div className="space-y-[16px] font-['Roboto'] font-normal text-[16px] leading-[26px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}>
                <p className="font-bold">
                  Sigilo absoluto. Discrição total. Organização rigorosa. Atendimento que respeita cada história.
                </p>
                <p>Esses não são diferenciais de marketing. São compromissos assumidos desde o primeiro contato e mantidos até a resolução final de cada caso.</p>
                <p>
                  Lidiane Sousa Araújo não construiu o escritório para atender tudo. Construiu para atender muito bem o que escolheu dominar. E é essa escolha consciente que permite entregar, de forma consistente, o que cada cliente mais precisa: clareza, estratégia e resultado.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Signature */}
          <FadeIn delay={0.08}>
            <div className="pt-[8px] border-t border-[#a57255]/30">
              <div className="w-[180px] h-[34px] text-[#a57255]" style={{ '--fill-0': '#a57255' } as React.CSSProperties}>
                <LidianeSousaAraujo />
              </div>
              <p className="font-['Roboto'] text-[13px] text-white/50 mt-[4px]"
                style={{ fontVariationSettings: "'wdth' 100" }}>OAB/DF 34.876</p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials Section — responsive carousel ─── */
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const panelTestimonials = testimonials.map((t, i) => ({
    ...t,
    quote: readPanel(`sobre.testimonial${i + 1}.quote`, t.quote),
    author: readPanel(`sobre.testimonial${i + 1}.author`, t.author),
    role: readPanel(`sobre.testimonial${i + 1}.role`, t.role),
  }));

  const total = panelTestimonials.length;

  function goTo(index: number, dir: 1 | -1) {
    setDirection(dir);
    setCurrent((index + total) % total);
  }

  const t = panelTestimonials[current];

  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="relative">

          {/* Decorative large quote mark */}
          <span
            aria-hidden
            className="absolute top-0 left-0 font-['Lora'] text-[180px] md:text-[245px] leading-none text-[rgba(153,164,165,0.10)] pointer-events-none select-none font-[Lora]"
            style={{ lineHeight: 1 }}
          >
            "
          </span>

          <div className="relative z-10 max-w-[862px] mx-auto">

            {/* Stars */}
            <div className="flex gap-[3px] mb-[28px] md:mb-[36px]">
              {Array.from({ length: t.stars }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Quote */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="font-['Noto_Sans'] font-normal text-[18px] md:text-[24px] lg:text-[32px] leading-[1.4] tracking-[-0.832px] text-white mb-[32px] md:mb-[48px] lg:mb-[80px]">
                  {t.quote}
                </p>

                {/* Author */}
                <div className="flex flex-col gap-[4px]">
                  <span className="font-['Noto_Sans'] font-medium text-[18px] md:text-[21px] leading-[30px] tracking-[-0.42px] text-white">
                    {t.author}
                  </span>
                  <span
                    className="font-['Roboto'] font-normal text-[13px] leading-[18px] tracking-[-0.195px] text-white/60"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {t.role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-[16px] mt-[40px] md:mt-[56px]">
              <button
                onClick={() => goTo(current - 1, -1)}
                aria-label="Depoimento anterior"
                className="opacity-100 hover:opacity-60 transition-opacity"
              >
                <PrevArrow />
              </button>
              <button
                onClick={() => goTo(current + 1, 1)}
                aria-label="Próximo depoimento"
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <NextArrow />
              </button>
              {/* Dot indicators */}
              <div className="flex items-center gap-[8px] ml-[8px]">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={`Ir para depoimento ${i + 1}`}
                    className={`w-[6px] h-[6px] transition-all duration-300 ${
                      i === current ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Office Image Banner (Background-22-376) ─── */
function OfficeImageBanner() {
  const caption = readPanel('sobre.banner.caption', 'A solução mais inteligente começa antes do processo');
  return (
    <section className="relative w-full h-[340px] sm:h-[420px] md:h-[500px] lg:h-[580px] overflow-hidden">
      {/* Background image */}
      <img
        src={imgOfficeBanner}
        alt="Escritório Sousa Araújo Advocacia"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(209.495deg, rgba(102,102,102,0) 23.398%, rgba(0,0,0,0.4) 76.602%)',
        }}
      />
      {/* Caption */}
      <div className="absolute bottom-[40px] md:bottom-[60px] lg:bottom-[80px] left-[20px] md:left-[40px] lg:left-[80px] max-w-[280px] md:max-w-[340px]">
        <p className="font-['Noto_Sans'] font-normal text-[20px] md:text-[25px] leading-[1.4] tracking-[-0.525px] text-white">
          {caption}
        </p>
      </div>
    </section>
  );
}

/* ─── Partners Section (Group2097 — Rede de Parceiros Qualificados) ─── */
function PartnersSection() {
  const partTitle = readPanel('sobre.parceiros.title', 'Rede de Parceiros Qualificados');
  const partDesc = readPanel('sobre.parceiros.desc', 'Atuamos em rede com advogados e especialistas selecionados para garantir cobertura nacional e expertise complementar em cada área de demanda.');

  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-[48px] lg:gap-[0]">

          {/* ── Left: text block ── */}
          <div className="lg:w-[35%] flex flex-col justify-center gap-[24px] lg:pr-[40px]">
            <FadeIn>
              <h2 className="font-['Marcellus'] text-[28px] md:text-[32px] leading-[1.3] tracking-[-0.832px] text-white">
                {partTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.07}>
              <p
                className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white/80"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {partDesc}
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <a
                href="/contato"
                className="inline-flex items-center gap-[8px] font-['Roboto'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Trabalhe Conosco
                <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </FadeIn>
          </div>

          {/* ── Right: 3 portrait photos ── */}
          <div className="lg:w-[65%] grid grid-cols-3 gap-[8px] md:gap-[12px] lg:gap-[16px]">
            {[imgGallery1, imgGallery2, imgGallery3].map((img, i) => {
              const galleryAlts = [
                'Equipe Sousa Araújo Advocacia — reunião de planejamento',
                'Escritório Sousa Araújo — ambiente de atendimento em Brasília',
                'Dra. Lidiane Sousa Araújo com equipe jurídica',
              ];
              return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="overflow-hidden">
                  <img
                    src={img}
                    alt={galleryAlts[i]}
                    className="w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[424px] object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </FadeIn>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Services List Section (Background-22-677) — same layout as BioSection ─── */
const servicesList = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 60 52" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#svc1)">
          <path d={svgIcons.p309869c0} fill="#A57255" />
          <path d={svgIcons.pd747500}  fill="#A57255" />
          <path d={svgIcons.p28623280} fill="#A57255" />
        </g>
        <defs><clipPath id="svc1"><rect width="60" height="52" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Homologação Internacional',
    description: 'Validamos no Brasil divórcios, guardas e decisões judiciais obtidas no exterior.',
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 53 51" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#svc2)">
          <path d={svgIcons.p2a8d0000}  fill="#A57255" />
          <path d={svgIcons.p33279700}  fill="#A57255" />
          <path d={svgIcons.pd4f5700}   fill="#A57255" />
        </g>
        <defs><clipPath id="svc2"><rect width="53" height="51" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Divórcio Consensual e Litigioso',
    description: 'Condução objetiva com foco em acordo, proteção patrimonial e agilidade.',
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 56 55" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#svc3)">
          <path d={svgIcons.p110e7500}  fill="#A57255" />
          <path d={svgIcons.p2affd980}  fill="#A57255" />
          <path d={svgIcons.p36fa7100}  fill="#A57255" />
          <path d={svgIcons.pe436f00}   fill="#A57255" />
        </g>
        <defs><clipPath id="svc3"><rect width="56" height="55" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Pensão Alimentícia',
    description: 'Fixação, revisão e execução de alimentos com estratégia e respaldo processual.',
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 40 42" fill="none" className="w-[44px] h-auto">
        <g clipPath="url(#svc4)">
          <path d={svgIcons.p28fa8500}  fill="#A57255" />
          <path d={svgIcons.p23419280}  fill="#A57255" />
          <path d={svgIcons.p3231c200}  fill="#A57255" />
          <path d={svgIcons.p1aeae080}  fill="#A57255" />
        </g>
        <defs><clipPath id="svc4"><rect width="40" height="42" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Guarda e Convivência',
    description: 'Acordos claros que protegem os filhos e garantem estabilidade para todos.',
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 60 30" fill="none" className="w-[56px] h-auto">
        <g clipPath="url(#svc5)">
          <path d={svgIcons.p22710880} fill="#A57255" />
          <path d={svgIcons.p22e3fb00} fill="#A57255" />
        </g>
        <defs><clipPath id="svc5"><rect width="60" height="30" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Inventário e Sucessões',
    description: 'Planejamento e condução do inventário com foco em agilidade e harmonia familiar.',
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 45 45" fill="none" className="w-[44px] h-auto">
        <g clipPath="url(#svc6)">
          <path d={svgIcons.p7c54b00}   fill="#A57255" />
          <path d={svgIcons.p46b6d00}   fill="#A57255" />
          <path d={svgIcons.p16409780}  fill="#A57255" />
          <path d={svgIcons.p13bf7870}  fill="#A57255" />
          <path d={svgIcons.p217da700}  fill="#A57255" />
        </g>
        <defs><clipPath id="svc6"><rect width="45" height="45" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'União Estável',
    description: 'Reconhecimento, dissolução e proteção patrimonial com orientação clara sobre direitos.',
  },
  {
    id: 7,
    icon: (
      <svg viewBox="0 0 54 50" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#svc7)">
          <path d={svgIcons.p3972d380} fill="#A57255" />
          <path d={svgIcons.p6029780}  fill="#A57255" />
          <path d={svgIcons.p2e300400} fill="#A57255" />
        </g>
        <defs><clipPath id="svc7"><rect width="54" height="50" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Regularização de Imóveis',
    description: 'Usucapião extrajudicial no cartório para regularizar sua propriedade com segurança.',
  },
  {
    id: 8,
    icon: (
      <svg viewBox="0 0 59 55" fill="none" className="w-[52px] h-auto">
        <g clipPath="url(#svc8)">
          <path d={svgIcons.p29172800} fill="#A57255" />
          <path d={svgIcons.pf215680}  fill="#A57255" />
          <path d={svgIcons.p212f1800} fill="#A57255" />
          <path d={svgIcons.p3e410d00} fill="#A57255" />
          <path d={svgIcons.p3df8300}  fill="#A57255" />
          <path d={svgIcons.p10949100} fill="#A57255" />
        </g>
        <defs><clipPath id="svc8"><rect width="59" height="55" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Consultoria Empresarial',
    description: 'Suporte jurídico preventivo e recorrente para PMEs que querem crescer protegidas.',
  },
  {
    id: 9,
    icon: (
      <svg viewBox="0 0 44 48" fill="none" className="w-[44px] h-auto">
        <g clipPath="url(#svc9)">
          <path d={svgIcons.p33fcf000}  fill="#A57255" />
          <path d={svgIcons.p258a32c0}  fill="#A57255" />
          <path d={svgIcons.p1da69d80}  fill="#A57255" />
          <path d={svgIcons.p2e28a180}  fill="#A57255" />
          <path d={svgIcons.p2659cd00}  fill="#A57255" />
          <path d={svgIcons.p2a7c8780}  fill="#A57255" />
          <path d={svgIcons.pf974700}   fill="#A57255" />
          <path d={svgIcons.p37b41a00}  fill="#A57255" />
        </g>
        <defs><clipPath id="svc9"><rect width="44" height="48" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Registro de Marca no INPI',
    description: 'Da busca ao protocolo — proteção exclusiva da sua marca com acompanhamento completo.',
  },
  {
    id: 10,
    icon: (
      <svg viewBox="0 0 66 65" fill="none" className="w-[56px] h-auto">
        <g clipPath="url(#svc10)">
          <path d={svgIcons.p3a97d900}  fill="#A57255" />
          <path d={svgIcons.p351a370}   fill="#A57255" />
          <path d={svgIcons.p36d35080}  fill="#A57255" />
          <path d={svgIcons.p1bf35872}  fill="#A57255" />
        </g>
        <defs><clipPath id="svc10"><rect width="66" height="65" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Notificações Extrajudiciais',
    description: 'Instrumento estratégico para resolver conflitos antes que virem processos judiciais.',
  },
  {
    id: 11,
    icon: (
      <svg viewBox="0 0 54 53" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#svc11)">
          <path d={svgIcons.p3135b3c0}  fill="#A57255" />
          <path d={svgIcons.p1a0c7e0}   fill="#A57255" />
          <path d={svgIcons.p236a9600}  fill="#A57255" />
          <path d={svgIcons.p3e4b2b00}  fill="#A57255" />
          <path d={svgIcons.p3eed8400}  fill="#A57255" />
          <path d={svgIcons.p32d87700}  fill="#A57255" />
        </g>
        <defs><clipPath id="svc11"><rect width="54" height="53" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Partilha de Bens',
    description: 'Divisão patrimonial estruturada para evitar prejuízos e acelerar o desfecho do divórcio.',
  },
  {
    id: 12,
    icon: (
      <svg viewBox="0 0 44 48" fill="none" className="w-[44px] h-auto">
        <g clipPath="url(#svc12)">
          <path d={svgIcons.p33fcf000} fill="#A57255" />
          <path d={svgIcons.p24f98d00} fill="#A57255" />
          <path d={svgIcons.p15265780} fill="#A57255" />
          <path d={svgIcons.p156c5200} fill="#A57255" />
        </g>
        <defs><clipPath id="svc12"><rect width="44" height="48" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Contratos Empresariais',
    description: 'Elaboração de contratos seguros para prestação de serviço, parceria e confidencialidade.',
  },
  {
    id: 13,
    icon: (
      <svg viewBox="0 0 56 55" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#svc13)">
          <path d={svgIcons.p110e7500}  fill="#A57255" />
          <path d={svgIcons.p13bf7870}  fill="#A57255" />
          <path d={svgIcons.p217da700}  fill="#A57255" />
        </g>
        <defs><clipPath id="svc13"><rect width="56" height="55" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Societário Básico',
    description: 'Alteração contratual, entrada e saída de sócios com segurança jurídica e clareza.',
  },
  {
    id: 14,
    icon: (
      <svg viewBox="0 0 53 51" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#svc14)">
          <path d={svgIcons.p2a8d0000} fill="#A57255" />
          <path d={svgIcons.p33279700} fill="#A57255" />
          <path d={svgIcons.p3972d380} fill="#A57255" />
        </g>
        <defs><clipPath id="svc14"><rect width="53" height="51" fill="white"/></clipPath></defs>
      </svg>
    ),
    title: 'Divórcio para Brasileiros no Exterior',
    description: 'Condução completa do processo para quem vive fora e precisa regularizar sua situação no Brasil.',
  },
];

function ServicesListSection() {
  const heading = readPanel('sobre.servicos.heading', 'Serviços jurídicos especializados para cada momento da sua vida');
  const panelServices = servicesList.map((s, i) => ({
    ...s,
    title: readPanel(`sobre.service${i + 1}.title`, s.title),
    description: readPanel(`sobre.service${i + 1}.desc`, s.description),
  }));

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">

        {/* ── Left: sticky office lounge photo ── */}
        <div className="sticky top-0 w-full order-last lg:order-first">
          <img
            src={imgTeamPhoto}
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
                <div className="flex flex-col gap-[14px]">
                  {/* Icon */}
                  <div className="flex items-start h-[52px]">
                    {service.icon}
                  </div>
                  {/* Title */}
                  <p className="font-['Noto_Sans'] font-medium text-[18px] md:text-[21px] leading-[30px] tracking-[-0.42px] text-white">
                    {service.title}
                  </p>
                  {/* Description */}
                  <p className="font-['Noto_Sans'] font-normal text-[14px] md:text-[15px] leading-[23px] tracking-[-0.225px] text-white/70">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Blog Preview ─── */
function BlogPreview() {
  const blogTitle = readPanel('sobre.blog.title', 'Quem se informa, se protege');
  const panelArticles = articles.map((a, i) => ({
    ...a,
    href: readPanel(`sobre.article${i + 1}.href`, a.href),
  }));

  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[26px] md:text-[34px] lg:text-[43px] leading-[1.25] tracking-[-0.516px] text-white mb-[40px] md:mb-[50px] lg:mb-[70px]">
            {blogTitle}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[24px] lg:gap-[30px]">
          {panelArticles.map((article, i) => (
            <FadeIn key={article.id} delay={i * 0.1}>
              <article className="group">
                <div className="relative w-full h-[200px] md:h-[235px] overflow-hidden mb-[16px] md:mb-[20px]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 backdrop-blur-[2px] bg-white/45 w-[63px] h-[77px] flex flex-col items-center justify-center">
                    <span className="font-['Lora'] text-[20px] leading-[23px] tracking-[-0.225px] text-white">{article.day}</span>
                    <span className="font-['Lora'] text-[15px] leading-[23px] tracking-[-0.225px] text-white">{article.month}</span>
                  </div>
                </div>
                <p
                  className="font-['Roboto'] text-[13px] leading-[18px] tracking-[-0.195px] text-[#a57255] mb-[12px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {article.category}
                </p>
                <h3
                  className="font-['Roboto'] text-[19px] md:text-[21px] lg:text-[25px] leading-[1.4] tracking-[-0.525px] text-white mb-[16px] md:mb-[20px] group-hover:text-[#a57255] transition-colors"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {article.title}
                </h3>
                <a
                  href={article.href}
                  className="inline-flex items-center gap-2 font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group/link"
                >
                  Ler Artigo
                  <ArrowIcon className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-[40px] md:mt-[60px] lg:mt-[80px]">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
            >
              Ver todos os artigos
              <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export function SobrePage() {
  return (
    <>
      <PageHero />
      <StatsBar />
      <BioSection />
      <TestimonialsSection />
      <OfficeImageBanner />
      <PartnersSection />
      <ServicesListSection />
      <BlogPreview />
      <Contact />
    </>
  );
}