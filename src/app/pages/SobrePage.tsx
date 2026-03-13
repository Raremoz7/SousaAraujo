import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Contact } from '../components/Contact';
import { CtaBanner } from '../components/CtaBanner';
import svgPaths from '../../imports/svg-jaymxarxn1';
import svgArrow from '../../imports/svg-od596xq1d5';
import svgIcons from '../../imports/svg-7ep6oounx2';
import { readPanel, usePanel } from '../hooks/usePanelContent';
import { trackCtaClick } from '../components/PainelDashboard';

/* ─── Images from Figma ─── */
import imgHeroBg       from 'figma:asset/5e3c0735c07c017f159c71adef667c328c8ad129.png';
import imgBioPortrait  from 'figma:asset/9011c1e99e5527fd880212ae959a9024a698f1b3.png';
import imgServicesPhoto from 'figma:asset/2b85fa036dea8b3032c27b752074d867c5fe1f17.png';
import imgOfficeBanner from 'figma:asset/71f13aaa0ca504c09e2ef8743773ab6d8f0274fa.png';
import imgGallery1     from 'figma:asset/f93fab1ef1d5d123bb5e3c544b05533319fc528f.png';
import imgGallery2     from 'figma:asset/0a2c4b4b53a6b852695e6a0c347b2fd603ee66f2.png';
import imgGallery3     from 'figma:asset/9972a3ecc156d325ee1f67a9bdb5e6e98cd03776.png';
import imgArticle1     from 'figma:asset/8f998da633bb92dcab13a208c71a97e2986d6c06.png';
import imgArticle2     from 'figma:asset/a6246b350004d1d692b469864824af4843190e94.png';
import imgArticle3     from 'figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png';

/* ─── Utility: arrow icon ─── */
function SmallArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[10px] h-[10px] ${className}`} fill="none" viewBox="0 0 10 10">
      <path d={svgArrow.p1238f200} stroke="currentColor" strokeWidth="1.02093" />
    </svg>
  );
}

/* ─── Star Icon (for testimonials) ─── */
function StarIcon() {
  return (
    <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 17 17">
      <g clipPath="url(#star-sobre)">
        <path d={svgPaths.p2b1b0a80} fill="white" />
      </g>
      <defs>
        <clipPath id="star-sobre"><rect fill="white" height="17" width="17" /></clipPath>
      </defs>
    </svg>
  );
}

/* ─── FadeIn animation wrapper ─── */
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

/* ═══════════════════════════════════════════════════════════════
   1. HERO — Full-screen with Lidiane background
   ═══════════════════════════════════════════════════════════════ */
function PageHero() {
  const heroTitle = readPanel('sobre.hero.title', 'Mais de 14 anos de atuação. Expertise que só o tempo constrói');
  const heroSubtitle = readPanel('sobre.hero.subtitle', 'A SA | Sousa Araújo Advocacia é o resultado de uma trajetória sólida em Direito de Família, Regularização de Imóveis e Homologação Internacional, com atendimento de Brasília para o mundo.');
  const heroBgImage = readPanel('sobre.hero.bgImage', imgHeroBg);
  const resolvedBgImage = heroBgImage.startsWith('figma:asset/') ? imgHeroBg : heroBgImage;

  return (
    <section
      className="relative w-full bg-[#161312] overflow-hidden"
      style={{ height: 'clamp(600px, 80vh, 900px)' }}
    >
      {/* Background image + gradients */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={resolvedBgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(218.989deg, rgba(22,19,18,0) 45.72%, rgba(22,19,18,0.5) 84.624%), linear-gradient(182.477deg, rgba(22,19,18,0) 49.98%, rgb(22,19,18) 92.834%)',
          }}
        />
      </div>

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 px-[20px] md:px-[40px] lg:px-[80px] pb-[40px] md:pb-[60px] lg:pb-[80px]">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="font-['Marcellus'] text-[32px] sm:text-[44px] md:text-[52px] lg:text-[58px] leading-[1.14] tracking-[-0.87px] text-white max-w-[900px] mb-[16px] md:mb-[22px] line-clamp-3"
        >
          {heroTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-[580px]"
        >
          <span
            className="font-['Roboto'] font-bold text-[16px] md:text-[18px] leading-[25px] text-white"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            A SA | Sousa Araújo Advocacia
          </span>
          <span
            className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {' '}
            {heroSubtitle.replace('A SA | Sousa Araújo Advocacia ', '')}
          </span>
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. STATS BAR
   ═══════════════════════════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { number: readPanel('sobre.stat1.number', '14+'), label: readPanel('sobre.stat1.label', 'Anos de Experiência') },
    { number: readPanel('sobre.stat2.number', '4'), label: readPanel('sobre.stat2.label', 'Áreas de Atuação Especializada') },
    { number: readPanel('sobre.stat3.number', '30+'), label: readPanel('sobre.stat3.label', 'Países Atendidos') },
    { number: readPanel('sobre.stat4.number', '2'), label: readPanel('sobre.stat4.label', 'Modalidades de Atendimento') },
  ];

  return (
    <section className="bg-[#161312] py-[40px] md:py-[60px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[32px] md:gap-[24px]">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className={`${i > 0 ? 'md:border-l md:border-white/10 md:pl-[24px] lg:pl-[36px]' : ''}`}>
                <p className="font-['Lora'] text-[48px] md:text-[56px] lg:text-[64px] leading-[1] text-[#a57255]">
                  {stat.number}
                </p>
                <p className="font-['Noto_Sans'] font-medium text-[16px] md:text-[18px] lg:text-[21px] leading-[30px] tracking-[-0.42px] text-white mt-[8px] max-w-[160px]">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. BIO — Split sticky scroll
   ═══════════════════════════════════════════════════════════════ */
function BioSection() {
  const bioTitle = readPanel(
    'sobre.bio.title',
    'Lidiane Sousa Araújo - OAB/DF 34.876 Advogada Especialista em Família, Imóveis e Homologação Internacional',
  );

  const imgLidiane = readPanel('sobre.quem.imgLidiane', imgBioPortrait);
  const resolvedImgLidiane = imgLidiane.startsWith('figma:asset/') ? imgBioPortrait : imgLidiane;

  const bioSubtitles = {
    trajetoria: readPanel('sobre.bio.trajetoria.title', 'Uma Trajetória Construída Caso a Caso'),
    areas: readPanel('sobre.bio.areas.title', 'Áreas que se Conectam na Vida Real'),
    metodo: readPanel('sobre.bio.metodo.title', 'Método de Trabalho'),
    presencial: readPanel('sobre.bio.presencial.title', 'Presencial em Brasília. Online para o Mundo.'),
    rede: readPanel('sobre.bio.rede.title', 'Atuação em Rede'),
    valores: readPanel('sobre.bio.valores.title', 'Valores que Orientam Cada Caso'),
    areasAtuacao: readPanel('sobre.bio.areasAtuacao.title', 'Áreas de Atuação'),
    contato: readPanel('sobre.bio.contato.title', 'Contato'),
  };

  const bioIntro1 = readPanel(
    'sobre.quem.paragraph1',
    'Lidiane Sousa Araújo é advogada inscrita na OAB do Distrito Federal sob o número 34.876, com registro expedido em 24 de agosto de 2011. Com mais de <strong>14 anos dedicados à advocacia</strong>, construiu uma trajetória marcada por especialidade real, método rigoroso e um atendimento que respeita profundamente a história de cada pessoa que chega ao escritório.',
  );
  const bioIntro2 = readPanel(
    'sobre.quem.paragraph2',
    'Fundadora da <strong>SA | Sousa Araújo Advocacia</strong>, com sede no Edifício Varig, Setor Comercial Norte, em Brasília, Distrito Federal, Lidiane criou o escritório com um propósito bem definido: ser a advogada que ela mesma gostaria de encontrar quando o assunto é sério, urgente e não admite erro.',
  );

  const bioTrajetoria1 = readPanel(
    'sobre.bio.trajetoria.p1',
    'Lidiane começou sua carreira no <strong>Direito de Família</strong>, área que rapidamente se tornaria sua maior especialidade e o coração da Sousa Araújo Advocacia. Atender famílias em momentos de ruptura, reorganização e luto ensinou a ela algo que nenhuma pós-graduação ensina: que o direito, quando bem aplicado, tem o poder de devolver estabilidade à vida das pessoas.',
  );
  const bioTrajetoria2 = readPanel(
    'sobre.bio.trajetoria.p2',
    'Com o tempo, percebeu que muitos dos seus clientes de família também tinham imóveis irregulares, heranças mal resolvidas e negócios sem proteção jurídica adequada. Em vez de encaminhar esses casos para outros profissionais, aprofundou-se em cada uma dessas áreas, construindo uma atuação que <strong>acompanha o cliente de forma completa</strong>, sem fragmentar sua história entre diferentes escritórios.',
  );
  const bioTrajetoria3 = readPanel(
    'sobre.bio.trajetoria.p3',
    'A especialidade em <strong>Homologação de Sentença Estrangeira</strong> surgiu da escuta ativa. Brasileiros que viviam nos EUA, Europa e Canadá chegavam com divórcios feitos fora do Brasil sem saber que essas decisões precisavam ser validadas no STJ para produzir efeitos legais aqui. Lidiane passou a se dedicar a esse nicho com profundidade técnica e sensibilidade para as particularidades de quem vive longe do Brasil e precisa resolver questões jurídicas sérias à distância.',
  );
  const bioTrajetoria4 = readPanel(
    'sobre.bio.trajetoria.p4',
    'A <strong>atuação empresarial</strong> nasceu de forma igualmente orgânica. Empresários que já eram clientes de família começaram a trazer suas demandas de negócio: contratos mal redigidos, marcas sem registro, sociedades sem estrutura jurídica adequada. Lidiane estruturou um modelo de consultoria preventiva e recorrente que acompanha o crescimento das PMEs com a mesma atenção e rigor dedicados às demandas pessoais.',
  );

  const bioAreas1 = readPanel(
    'sobre.bio.areas.p1',
    'O que torna a Sousa Araújo Advocacia diferente de um escritório de nicho tradicional é a capacidade de <strong>enxergar o cliente de forma completa</strong>. As quatro áreas de atuação não foram escolhidas ao acaso. Elas se conectam de maneira natural e frequente na vida real das pessoas.',
  );
  const bioAreas2 = readPanel(
    'sobre.bio.areas.p2',
    'O empresário que precisa de contratos bem redigidos muitas vezes também está passando por um divórcio que pode impactar diretamente sua participação societária. A família que precisa fazer o inventário frequentemente descobre que o imóvel herdado não tem escritura e precisa ser regularizado antes de ser partilhado. O brasileiro que retorna do exterior após anos fora precisa não apenas homologar a sentença estrangeira, mas também regularizar bens, resolver questões de guarda e reorganizar sua vida jurídica por completo.',
  );
  const bioAreas3 = readPanel(
    'sobre.bio.areas.p3',
    'Essa sobreposição de demandas é a realidade da maioria dos clientes. E é exatamente aqui que a Sousa Araújo Advocacia entrega seu maior valor: <strong>não é necessário explicar sua história para diferentes especialistas em diferentes escritórios</strong>. A Dra. Lidiane conhece cada área com profundidade e enxerga o caso como um todo, identificando conexões, antecipando riscos e construindo uma estratégia que resolve não apenas o problema imediato, mas protege o cliente nas frentes que ele ainda não percebeu que precisam de atenção.',
  );
  const bioAreas4 = readPanel(
    'sobre.bio.areas.p4',
    '<strong>Família protege patrimônio. Patrimônio sustenta negócios. Negócios geram legado. Legado precisa de planejamento jurídico desde o início.</strong>',
  );

  const bioMetodo = readPanel(
    'sobre.bio.metodo.content',
    'Antes de qualquer protocolo ou ação, a Dra. Lidiane realiza uma <strong>avaliação rigorosa de cada caso</strong>. Identifica o melhor caminho, os riscos envolvidos e a estratégia mais eficiente para aquela situação específica. A prioridade é sempre a via extrajudicial: cartório, acordo, consultoria preventiva. Quando o caminho judicial é inevitável, a atuação é firme, organizada e orientada ao resultado.',
  );

  const bioPresencial = readPanel(
    'sobre.bio.presencial.content',
    'A Sousa Araújo Advocacia conta com espaço de atendimento presencial no <strong>Edifício Varig, Setor Comercial Norte, em Brasília.</strong> Um ambiente premium que reflete o padrão de qualidade do escritório. Para quem mora no Distrito Federal e prefere o contato pessoal, as portas estão sempre abertas. Um café, uma conversa olho no olho, especialmente quando o caso envolve família, tem um valor que nenhuma videochamada substitui completamente.',
  );

  const bioRede = readPanel(
    'sobre.bio.rede.content',
    'Casos complexos podem exigir expertise complementar. Por isso, a Dra. Lidiane construiu ao longo dos anos uma <strong>rede de parceiros qualificados</strong>, advogados especialistas em diferentes áreas e regiões do Brasil, que atuam em colaboração quando necessário. Sempre com identificação profissional, padrão de qualidade alinhado ao da Sousa Araújo Advocacia e comunicação transparente com o cliente em cada etapa.',
  );

  const bioValores = readPanel(
    'sobre.bio.valores.content',
    '<strong>Sigilo absoluto. Discrição total. Organização rigorosa. Atendimento que respeita cada história.</strong>\n\nEsses não são diferenciais de marketing. São compromissos assumidos desde o primeiro contato e mantidos até a resolução final de cada caso.\n\nLidiane Sousa Araújo não construiu o escritório para atender tudo. Construiu para atender muito bem o que escolheu dominar. E é essa escolha consciente que permite entregar, de forma consistente, o que cada cliente mais precisa: clareza, estratégia e resultado.',
  );

  const fontRoboto = { fontVariationSettings: "'wdth' 100" } as const;

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
        {/* Left: sticky portrait */}
        <div className="sticky top-0 w-full hidden lg:block" style={{ height: '100vh' }}>
          <img
            src={resolvedImgLidiane}
            alt="Dra. Lidiane Sousa Araújo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile portrait */}
        <div className="lg:hidden w-full h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={resolvedImgLidiane}
            alt="Dra. Lidiane Sousa Araújo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: dark panel with biography */}
        <div className="bg-[#262626] px-[24px] md:px-[50px] lg:px-[70px] py-[60px] md:py-[80px] lg:py-[100px]">
          {/* Title */}
          <FadeIn>
            <h2 className="font-['Marcellus'] text-[24px] md:text-[28px] lg:text-[32px] leading-[1.3] tracking-[-0.516px] text-[#a57255] mb-[40px] md:mb-[60px] max-w-[563px]">
              {bioTitle}
            </h2>
          </FadeIn>

          {/* Intro paragraphs */}
          <FadeIn delay={0.1}>
            <div className="space-y-[25px] mb-[40px] max-w-[575px]">
              <p
                className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white"
                style={fontRoboto}
                dangerouslySetInnerHTML={{ __html: bioIntro1 }}
              />
              <p
                className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white"
                style={fontRoboto}
                dangerouslySetInnerHTML={{ __html: bioIntro2 }}
              />
            </div>
          </FadeIn>

          {/* ─── Trajetória ─── */}
          <FadeIn>
            <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[16px]">
              {bioSubtitles.trajetoria}
            </h3>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="space-y-[25px] mb-[40px] max-w-[575px]">
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioTrajetoria1 }} />
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioTrajetoria2 }} />
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioTrajetoria3 }} />
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioTrajetoria4 }} />
            </div>
          </FadeIn>

          {/* ─── Áreas que se Conectam ─── */}
          <FadeIn>
            <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[16px]">
              {bioSubtitles.areas}
            </h3>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="space-y-[25px] mb-[40px] max-w-[575px]">
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioAreas1 }} />
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioAreas2 }} />
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioAreas3 }} />
              <p className="font-['Roboto'] font-bold text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioAreas4 }} />
            </div>
          </FadeIn>

          {/* ─── Método de Trabalho ─── */}
          <FadeIn>
            <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[16px]">
              {bioSubtitles.metodo}
            </h3>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="space-y-[25px] mb-[16px] max-w-[575px]">
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioMetodo }} />
            </div>
            <div className="mb-[40px] max-w-[575px]">
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white mb-[25px]" style={fontRoboto}>
                Cada cliente recebe:
              </p>
              <ul className="list-disc ml-[27px] space-y-0 mb-[25px]">
                <li className="font-['Roboto'] text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                  <strong>Checklist completo</strong> de documentos antes de qualquer protocolo
                </li>
                <li className="font-['Roboto'] text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                  <strong>Relatórios periódicos</strong> de acompanhamento do processo
                </li>
                <li className="font-['Roboto'] text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                  <strong>Comunicação clara</strong> em cada etapa, sem silêncio e sem surpresas
                </li>
              </ul>
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                Essa organização não é burocracia. É respeito pelo tempo, pelo dinheiro e pela tranquilidade de cada pessoa que confia seu caso ao escritório.
              </p>
            </div>
          </FadeIn>

          {/* ─── Presencial em Brasília ─── */}
          <FadeIn>
            <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[16px]">
              {bioSubtitles.presencial}
            </h3>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="space-y-[25px] mb-[16px] max-w-[575px]">
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioPresencial }} />
            </div>
            <div className="mb-[40px] max-w-[575px]">
              <ul className="list-disc ml-[27px] space-y-0 mb-[25px]">
                <li className="font-['Roboto'] text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                  <strong>Reuniões remotas seguras</strong> com qualidade de atendimento presencial
                </li>
                <li className="font-['Roboto'] text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                  <strong>Assinatura digital</strong> e envio protegido de documentos
                </li>
                <li className="font-['Roboto'] text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                  <strong>Registro detalhado</strong> de cada etapa, prazo e decisão do processo
                </li>
                <li className="font-['Roboto'] text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                  <strong>Comunicação estruturada</strong> que mantém o cliente informado sem que ele precise perguntar
                </li>
              </ul>
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                Enquanto muitos escritórios investem em estruturas físicas imponentes, o maior investimento da Sousa Araújo Advocacia está nos <strong>processos, na tecnologia e nas pessoas</strong>. O resultado é um atendimento mais ágil, mais organizado e mais eficiente, seja presencialmente em Brasília, online para todo o Brasil ou para brasileiros em qualquer parte do mundo.
              </p>
            </div>
          </FadeIn>

          {/* ─── Atuação em Rede ─── */}
          <FadeIn>
            <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[16px]">
              {bioSubtitles.rede}
            </h3>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="space-y-[25px] mb-[40px] max-w-[575px]">
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto} dangerouslySetInnerHTML={{ __html: bioRede }} />
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                Essa estrutura garante cobertura nacional sem abrir mão da especialidade e do cuidado que definem o trabalho do escritório.
              </p>
            </div>
          </FadeIn>

          {/* ─── Valores ─── */}
          <FadeIn>
            <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[16px]">
              {bioSubtitles.valores}
            </h3>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="space-y-[25px] mb-[40px] max-w-[575px]">
              {bioValores.split('\n\n').map((p, i) => (
                <p
                  key={i}
                  className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white"
                  style={fontRoboto}
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div>
          </FadeIn>

          {/* ─── Áreas de Atuação (lista) ─── */}
          <FadeIn>
            <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[16px]">
              {bioSubtitles.areasAtuacao}
            </h3>
          </FadeIn>
          <FadeIn delay={0.05}>
            <ul className="list-disc ml-[27px] mb-[40px] max-w-[575px] space-y-0">
              {[
                'Homologação de Sentença Estrangeira',
                'Regularização de Imóveis e Usucapião Extrajudicial',
                'Divórcio Consensual e Litigioso',
                'Guarda de Filhos e Plano de Convivência',
                'Pensão Alimentícia: Fixação, Revisão e Execução',
                'Inventário e Sucessões',
                'União Estável e Proteção Patrimonial',
                'Consultoria Empresarial para PMEs',
                'Registro de Marca no INPI',
                'Contratos e Societário',
              ].map((item, i) => (
                <li
                  key={i}
                  className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white"
                  style={fontRoboto}
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* ─── Contato ─── */}
          <FadeIn>
            <h3 className="font-['Marcellus'] text-[20px] md:text-[24px] leading-[52px] tracking-[-0.516px] text-[#a57255] mb-[16px]">
              {bioSubtitles.contato}
            </h3>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="max-w-[575px]">
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white" style={fontRoboto}>
                <strong>Sousa Araújo Advocacia</strong> Edifício Varig, Setor Comercial Norte, Quadra 04, Bloco B, Sala 702, 7o Andar, Asa Norte, Brasília, DF, CEP 70714-020 WhatsApp: +55 61 99599-1322 E-mail:{' '}
                <a href="mailto:contato@sousaaraujo.adv.br" className="underline hover:text-[#a57255] transition-colors">
                  contato@sousaaraujo.adv.br
                </a>{' '}
                OAB/DF 34.876
              </p>
              <p className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] text-white mt-[25px]" style={fontRoboto}>
                Comunicação em conformidade com o Provimento OAB 205/2021. Os resultados dependem das circunstâncias específicas de cada caso.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. TESTIMONIALS
   ═══════════════════════════════════════════════════════════════ */
function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const testimonials = Array.from({ length: 4 }, (_, i) => ({
    quote: readPanel(`sobre.testimonial${i + 1}.quote`, [
      '"Fui atendida com um cuidado que não esperava encontrar em um escritório de advocacia. Tudo foi explicado com clareza, cada etapa comunicada no prazo e o processo resolvido sem surpresas. Me senti segura do início ao fim."',
      '"A equipe nos deu toda a clareza necessária. A consulta de viabilidade já valeu o investimento."',
      '"Indicamos a Sousa Araújo para todos os clientes que precisam de advogado de família. Confiança total."',
      '"Minha homologação de sentença foi concluída em tempo recorde. Recomendo demais."',
    ][i]),
    author: readPanel(`sobre.testimonial${i + 1}.author`, ['M.S', 'Carlos P.', 'Ana R.', 'Roberto M.'][i]),
    role: readPanel(`sobre.testimonial${i + 1}.role`, ['Cliente', 'Cliente — Inventário', 'Advogada parceira', 'Cliente — Homologação'][i]),
  }));

  const handlePrev = () => setActiveIdx(p => (p === 0 ? testimonials.length - 1 : p - 1));
  const handleNext = () => setActiveIdx(p => (p === testimonials.length - 1 ? 0 : p + 1));

  return (
    <section className="bg-[#452b1e] py-[80px] md:py-[100px] lg:py-[135px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[170px]">
        <div className="relative">
          {/* Big quote mark */}
          <div className="absolute -left-[10px] md:left-0 top-[-40px] md:top-[-50px] font-['Lora'] text-[150px] md:text-[200px] lg:text-[245px] leading-[1] text-white/10 select-none pointer-events-none">
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Quote */}
              <blockquote className="relative z-10">
                <p className="font-['Noto_Sans'] font-normal text-[22px] md:text-[28px] lg:text-[32px] leading-[1.32] tracking-[-0.832px] text-white max-w-[860px] mb-[32px]">
                  {testimonials[activeIdx].quote}
                </p>

                {/* Stars */}
                <div className="flex gap-[6px] mb-[20px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>

                <footer>
                  <p className="font-['Noto_Sans'] font-medium text-[18px] md:text-[21px] leading-[30px] tracking-[-0.42px] text-white">
                    {testimonials[activeIdx].author}
                  </p>
                  <p className="font-['Noto_Sans'] text-[13px] leading-[18px] tracking-[-0.195px] text-white/70">
                    {testimonials[activeIdx].role}
                  </p>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex items-center gap-[12px] mt-[40px] md:mt-[50px]">
            <button
              onClick={handlePrev}
              className="w-[35px] h-[35px] border border-white/30 flex items-center justify-center text-white hover:border-white transition-colors"
              aria-label="Anterior"
            >
              <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 24 24">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-[35px] h-[35px] border border-white/30 flex items-center justify-center text-white hover:border-white transition-colors"
              aria-label="Próximo"
            >
              <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 24 24">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. OFFICE BANNER
   ═══════════════════════════════════════════════════════════════ */
function OfficeBanner() {
  const bannerText = readPanel('sobre.banner.caption', 'A solução mais inteligente começa antes do processo');

  return (
    <section className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={imgOfficeBanner}
          alt="Escritório Sousa Araújo — Edifício Varig, Brasília"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(209.5deg, rgba(102,102,102,0) 23.4%, rgba(0,0,0,0.4) 76.6%)' }}
        />
      </div>
      <div className="relative h-full max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[80px] flex items-end pb-[40px] md:pb-[60px]">
        <FadeIn>
          <p className="font-['Noto_Sans'] font-normal text-[20px] md:text-[22px] lg:text-[25px] leading-[35px] tracking-[-0.525px] text-white max-w-[265px]">
            {bannerText}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. SERVICES PANEL — Split sticky + icons grid
   ═══════════════════════════════════════════════════════════════ */
const servicesPanelData = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 60 52" fill="none" className="w-[48px] h-auto">
        <g clipPath="url(#sps1)">
          <path d={svgIcons.p309869c0} fill="#A57255" />
          <path d={svgIcons.pd747500} fill="#A57255" />
          <path d={svgIcons.p28623280} fill="#A57255" />
        </g>
        <defs><clipPath id="sps1"><rect width="60" height="52" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps2)">
          <path d={svgIcons.p2a8d0000} fill="#A57255" />
          <path d={svgIcons.p33279700} fill="#A57255" />
          <path d={svgIcons.pd4f5700} fill="#A57255" />
        </g>
        <defs><clipPath id="sps2"><rect width="53" height="51" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps3)">
          <path d={svgIcons.p110e7500} fill="#A57255" />
          <path d={svgIcons.p2affd980} fill="#A57255" />
          <path d={svgIcons.p36fa7100} fill="#A57255" />
          <path d={svgIcons.pe436f00} fill="#A57255" />
        </g>
        <defs><clipPath id="sps3"><rect width="56" height="55" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps4)">
          <path d={svgIcons.p28fa8500} fill="#A57255" />
          <path d={svgIcons.p23419280} fill="#A57255" />
          <path d={svgIcons.p3231c200} fill="#A57255" />
          <path d={svgIcons.p1aeae080} fill="#A57255" />
        </g>
        <defs><clipPath id="sps4"><rect width="40" height="42" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps5)">
          <path d={svgIcons.p22710880} fill="#A57255" />
          <path d={svgIcons.p22e3fb00} fill="#A57255" />
        </g>
        <defs><clipPath id="sps5"><rect width="60" height="30" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps6)">
          <path d={svgIcons.p7c54b00} fill="#A57255" />
          <path d={svgIcons.p46b6d00} fill="#A57255" />
          <path d={svgIcons.p16409780} fill="#A57255" />
          <path d={svgIcons.p13bf7870} fill="#A57255" />
          <path d={svgIcons.p217da700} fill="#A57255" />
        </g>
        <defs><clipPath id="sps6"><rect width="45" height="45" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps7)">
          <path d={svgIcons.p3972d380} fill="#A57255" />
          <path d={svgIcons.p6029780} fill="#A57255" />
          <path d={svgIcons.p2e300400} fill="#A57255" />
        </g>
        <defs><clipPath id="sps7"><rect width="54" height="50" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps8)">
          <path d={svgIcons.p29172800} fill="#A57255" />
          <path d={svgIcons.pf215680} fill="#A57255" />
          <path d={svgIcons.p212f1800} fill="#A57255" />
          <path d={svgIcons.p3e410d00} fill="#A57255" />
          <path d={svgIcons.p3df8300} fill="#A57255" />
          <path d={svgIcons.p10949100} fill="#A57255" />
        </g>
        <defs><clipPath id="sps8"><rect width="59" height="55" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps9)">
          <path d={svgIcons.p33fcf000} fill="#A57255" />
          <path d={svgIcons.p258a32c0} fill="#A57255" />
          <path d={svgIcons.p1da69d80} fill="#A57255" />
          <path d={svgIcons.p2e28a180} fill="#A57255" />
          <path d={svgIcons.p2659cd00} fill="#A57255" />
          <path d={svgIcons.p2a7c8780} fill="#A57255" />
          <path d={svgIcons.pf974700} fill="#A57255" />
          <path d={svgIcons.p37b41a00} fill="#A57255" />
        </g>
        <defs><clipPath id="sps9"><rect width="44" height="48" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps10)">
          <path d={svgIcons.p3a97d900} fill="#A57255" />
          <path d={svgIcons.p351a370} fill="#A57255" />
          <path d={svgIcons.p36d35080} fill="#A57255" />
          <path d={svgIcons.p1bf35872} fill="#A57255" />
        </g>
        <defs><clipPath id="sps10"><rect width="66" height="65" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps11)">
          <path d={svgIcons.p3135b3c0} fill="#A57255" />
          <path d={svgIcons.p1a0c7e0} fill="#A57255" />
          <path d={svgIcons.p236a9600} fill="#A57255" />
          <path d={svgIcons.p3e4b2b00} fill="#A57255" />
          <path d={svgIcons.p3eed8400} fill="#A57255" />
          <path d={svgIcons.p32d87700} fill="#A57255" />
        </g>
        <defs><clipPath id="sps11"><rect width="54" height="53" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps12)">
          <path d={svgIcons.p33fcf000} fill="#A57255" />
          <path d={svgIcons.p24f98d00} fill="#A57255" />
          <path d={svgIcons.p15265780} fill="#A57255" />
          <path d={svgIcons.p156c5200} fill="#A57255" />
        </g>
        <defs><clipPath id="sps12"><rect width="44" height="48" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps13)">
          <path d={svgIcons.p110e7500} fill="#A57255" />
          <path d={svgIcons.p13bf7870} fill="#A57255" />
          <path d={svgIcons.p217da700} fill="#A57255" />
        </g>
        <defs><clipPath id="sps13"><rect width="56" height="55" fill="white" /></clipPath></defs>
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
        <g clipPath="url(#sps14)">
          <path d={svgIcons.p2a8d0000} fill="#A57255" />
          <path d={svgIcons.p33279700} fill="#A57255" />
          <path d={svgIcons.p3972d380} fill="#A57255" />
        </g>
        <defs><clipPath id="sps14"><rect width="53" height="51" fill="white" /></clipPath></defs>
      </svg>
    ),
    title: 'Divórcio para Brasileiros no Exterior',
    description: 'Condução completa do processo para quem vive fora e precisa regularizar sua situação no Brasil.',
    href: '/homologacao-de-sentenca-estrangeira',
  },
];

function ServicesPanel() {
  const heading = readPanel('sobre.servicos.heading', 'Serviços jurídicos especializados para cada momento da sua vida');

  const imgTeam = readPanel('sobre.quem.imgTeam', imgServicesPhoto);
  const resolvedImgTeam = imgTeam.startsWith('figma:asset/') ? imgServicesPhoto : imgTeam;

  const panelServices = servicesPanelData.map((svc, i) => ({
    ...svc,
    title: readPanel(`sobre.service${i + 1}.title`, svc.title),
    description: readPanel(`sobre.service${i + 1}.desc`, svc.description),
  }));

  return (
    <section className="bg-[#161312]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
        {/* Left: sticky office photo */}
        <div className="sticky top-0 w-full order-last lg:order-first hidden lg:block" style={{ height: '100vh' }}>
          <img
            src={resolvedImgTeam}
            alt="Ambiente do escritório Sousa Araújo Advocacia"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Mobile image */}
        <div className="lg:hidden w-full h-[300px] md:h-[400px] overflow-hidden order-first">
          <img
            src={resolvedImgTeam}
            alt="Ambiente do escritório Sousa Araújo Advocacia"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right: dark panel with services grid */}
        <div className="bg-[#262626] px-[24px] md:px-[50px] lg:px-[70px] py-[60px] md:py-[80px] lg:py-[100px]">
          <FadeIn>
            <h2 className="font-['Lora'] text-[26px] md:text-[34px] lg:text-[43px] leading-[1.21] tracking-[-0.516px] text-[#a57255] mb-[48px] md:mb-[60px] lg:mb-[80px] max-w-[540px]">
              {heading}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[32px] md:gap-x-[40px] gap-y-[40px] md:gap-y-[52px]">
            {panelServices.map((service, i) => (
              <FadeIn key={service.id} delay={(i % 2) * 0.08}>
                {service.href ? (
                  <Link to={service.href} className="flex flex-col gap-[14px] group/svc">
                    <div className="flex items-start h-[52px]">{service.icon}</div>
                    <p className="font-['Noto_Sans'] font-medium text-[18px] md:text-[21px] leading-[30px] tracking-[-0.42px] text-white group-hover/svc:text-[#a57255] transition-colors">
                      {service.title}
                    </p>
                    <p className="font-['Noto_Sans'] font-normal text-[14px] md:text-[15px] leading-[23px] tracking-[-0.225px] text-white/70">
                      {service.description}
                    </p>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-[14px]">
                    <div className="flex items-start h-[52px]">{service.icon}</div>
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

/* ═══════════════════════════════════════════════════════════════
   7. PARTNERS SECTION
   ═══════════════════════════════════════════════════════════════ */
function PartnersSection() {
  const partTitle = readPanel('sobre.parceiros.title', 'Rede de Parceiros Qualificados');
  const partDesc = readPanel(
    'sobre.parceiros.desc',
    'Atuamos em rede com advogados e especialistas selecionados para garantir cobertura nacional e expertise complementar em cada área de demanda.',
  );

  const partImg1 = readPanel('sobre.parceiros.img1', imgGallery1);
  const partImg2 = readPanel('sobre.parceiros.img2', imgGallery2);
  const partImg3 = readPanel('sobre.parceiros.img3', imgGallery3);
  const resolvedImg1 = partImg1.startsWith('figma:asset/') ? imgGallery1 : partImg1;
  const resolvedImg2 = partImg2.startsWith('figma:asset/') ? imgGallery2 : partImg2;
  const resolvedImg3 = partImg3.startsWith('figma:asset/') ? imgGallery3 : partImg3;

  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[60px]">
          {/* Left: text */}
          <div className="lg:w-[35%] flex flex-col justify-center">
            <FadeIn>
              <h2 className="font-['Marcellus'] text-[26px] md:text-[28px] lg:text-[32px] leading-[42px] tracking-[-0.832px] text-white mb-[24px] md:mb-[32px]">
                {partTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={0.06}>
              <p
                className="font-['Roboto'] font-normal text-[16px] md:text-[18px] leading-[25px] tracking-[-0.27px] text-white mb-[24px] md:mb-[32px] max-w-[333px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {partDesc}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <a
                href="/contato"
                onClick={() => trackCtaClick('sobre')}
                className="inline-flex items-center gap-[8px] font-['Roboto'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Trabalhe Conosco
                <SmallArrow className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </FadeIn>
          </div>

          {/* Right: 3 gallery images */}
          <div className="lg:w-[65%] grid grid-cols-3 gap-[8px] md:gap-[16px] lg:gap-[18px]">
            {[resolvedImg1, resolvedImg2, resolvedImg3].map((img, i) => (
              <FadeIn key={i} delay={0.06 + i * 0.06}>
                <div className="overflow-hidden h-[280px] md:h-[360px] lg:h-[424px]">
                  <img
                    src={img}
                    alt={`Parceiro ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. BLOG PREVIEW
   ═══════════════════════════════════════════════════════════════ */
function BlogPreview() {
  const blogTitle = readPanel('sobre.blog.title', 'Quem se informa, se protege');
  const articleImages = [imgArticle1, imgArticle2, imgArticle3];

  const articles = [
    {
      id: 1,
      day: '01',
      month: 'Nov',
      category: 'Direito Imobiliário e Usucapião',
      title: 'Imóvel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento',
    },
    {
      id: 2,
      day: '01',
      month: 'Nov',
      category: 'Homologação e Direito Internacional',
      title: 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
    },
    {
      id: 3,
      day: '01',
      month: 'Nov',
      category: 'Direito de Família',
      title: 'União Estável x Casamento: O que muda no seu patrimônio?',
    },
  ];

  const panelArticles = articles.map((a, i) => ({
    ...a,
    title: readPanel(`sobre.article${i + 1}.title`, a.title),
    category: readPanel(`sobre.article${i + 1}.category`, a.category),
    day: readPanel(`sobre.article${i + 1}.day`, a.day),
    month: readPanel(`sobre.article${i + 1}.month`, a.month),
  }));

  return (
    <section className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[68px]">
        <FadeIn>
          <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[52px] tracking-[-0.516px] text-white mb-[40px] md:mb-[50px] lg:mb-[70px]">
            {blogTitle}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[24px] lg:gap-[30px]">
          {panelArticles.map((article, i) => (
            <FadeIn key={article.id} delay={i * 0.1}>
              <article className="group">
                <div className="relative w-full h-[200px] md:h-[235px] overflow-hidden mb-[16px] md:mb-[20px]">
                  <img
                    src={articleImages[i]}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-0 left-0 backdrop-blur-[2px] bg-white/45 w-[63px] h-[77px] flex flex-col items-center justify-center">
                    <span className="font-['Lora'] text-[20px] leading-[23px] text-white">{article.day}</span>
                    <span className="font-['Lora'] text-[15px] leading-[23px] text-white">{article.month}</span>
                  </div>
                </div>
                <p
                  className="font-['Roboto'] text-[13px] leading-[18px] tracking-[-0.195px] text-[#a57255] mb-[12px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {article.category}
                </p>
                <h3
                  className="font-['Roboto'] text-[19px] md:text-[21px] lg:text-[25px] leading-[35px] tracking-[-0.525px] text-white mb-[16px] group-hover:text-[#a57255] transition-colors"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {article.title}
                </h3>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 font-['Noto_Sans'] font-medium text-[15px] text-white hover:text-[#a57255] transition-colors group/link"
                >
                  Ler Artigo
                  <SmallArrow className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-[50px] md:mt-[60px]">
            <Link
              to="/blog"
              className="inline-flex items-center gap-3 font-['Noto_Sans'] font-medium text-[15px] text-white hover:text-[#a57255] transition-colors"
            >
              Ver todos os artigos
              <SmallArrow />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION REGISTRY & DYNAMIC ORDER
   ═══════════════════════════════════════════════════════════════ */
const SECTION_REGISTRY: Record<string, { Component: React.FC }> = {
  'sobre-hero': { Component: PageHero },
  'sobre-stats': { Component: StatsBar },
  'sobre-bio': { Component: BioSection },
  'sobre-depoimentos': { Component: TestimonialsSection },
  'sobre-banner': { Component: OfficeBanner },
  'sobre-servicos': { Component: ServicesPanel },
  'sobre-parceiros': { Component: PartnersSection },
  'sobre-blog': { Component: BlogPreview },
  'sobre-cta': { Component: CtaBanner },
  'sobre-contact': { Component: Contact },
};

const DEFAULT_ORDER = [
  'sobre-hero',
  'sobre-stats',
  'sobre-bio',
  'sobre-depoimentos',
  'sobre-banner',
  'sobre-servicos',
  'sobre-parceiros',
  'sobre-blog',
  'sobre-cta',
  'sobre-contact',
];

/* ─── Page ─── */
export function SobrePage() {
  const orderJson = usePanel('sobre.sectionOrder', '');

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
    } catch {
      /* fall through */
    }
    return DEFAULT_ORDER;
  }, [orderJson]);

  return (
    <>
      {orderedIds.map((id) => {
        const entry = SECTION_REGISTRY[id];
        if (!entry) return null;
        const { Component } = entry;
        return <Component key={id} />;
      })}
    </>
  );
}
