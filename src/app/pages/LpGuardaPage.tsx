/**
 * GuardaPage — Página de Guarda e Plano de Convivência
 */
import { ServiceTemplate, type ServiceData } from '../components/LpTemplate';

import imgHero from 'figma:asset/4e0368effa05e19184d3051ff856b436790a646f.png';
import imgSticky from 'figma:asset/fe31c56b206b46ccd45b92193e312d3f204a3004.png';
import imgLidiane from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgArticle1 from 'figma:asset/d8b8b9ab06b1e4e35d69c1e21c563f564a52db01.png';
import imgArticle2 from 'figma:asset/5ca336344371170b49c80ff31572f02cea56d1bd.png';
import imgArticle3 from 'figma:asset/f3ac85d60ca06c6c5d27967251b6c478f4898a2c.png';
import imgParallax from 'figma:asset/9562cf95d4534ca9712322239006072b5f19f9db.png';
import imgMetodo from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgCtaBg from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';

export const guardaData: ServiceData = {
  hero: {
    title: 'Guarda de Filhos em Brasília DF. Plano de Convivência com Foco na Criança',
    subtitle: 'A definição da guarda e do plano de convivência impacta diretamente a vida dos seus filhos. Na SA Advocacia em Brasília DF, conduzimos esse processo com sensibilidade, estratégia técnica e foco total no melhor interesse da criança — sempre com transparência e sigilo.',
    image: imgHero,
    maxWidth: '768px',
  },
  trust: {
    features: [
      'Atendimento presencial e online com sensibilidade',
      'Organização documental completa antes do protocolo',
      '14+ anos em Família, conhecimento das Varas do DF',
    ],
    title: 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
    body: 'Com 14+ anos de atuação em Brasília/DF, a Sousa Araújo Advocacia conduz cada caso de guarda e plano de convivência com o Método SAA: S: Seleção do caminho correto, A: Arquitetura documental rigorosa e A: Acompanhamento transparente. Nosso compromisso é com a organização prévia, a clareza em cada etapa e o sigilo absoluto. Você sabe exatamente onde está o seu processo.',
  },
  parallaxImage: imgParallax,
  metodo: {
    title: 'Método SAA (Sousa Araújo Advocacia) Aplicado a Guarda e Plano de Convivência',
    steps: [
      { label: 'S: Seleção do Caminho Correto', desc: 'Analisamos o contexto familiar, a rotina da criança e os interesses de ambos os genitores para definir a melhor modalidade de guarda (compartilhada ou unilateral) e a estratégia processual mais adequada.' },
      { label: 'A: Arquitetura Documental', desc: 'Elaboramos o plano de convivência detalhado, contemplando dias, horários, férias, feriados e datas comemorativas. Organizamos toda a documentação necessária e preparamos a petição com foco no melhor interesse da criança.' },
      { label: 'A: Acompanhamento Transparente', desc: 'Conduzimos o processo com atualizações periódicas, participação ativa em audiências e mediações, e comunicação clara em cada movimentação relevante até a decisão final.' },
    ],
    image: imgMetodo,
  },
  scenarios: {
    title: 'Você Se Reconhece em Algum Desses Cenários?',
    items: [
      'Está se divorciando e precisa definir a guarda e a convivência dos filhos',
      'O outro genitor não cumpre o regime de convivência atual',
      'Precisa alterar o plano de convivência por mudança de rotina ou cidade',
      'Quer formalizar a guarda compartilhada com regras claras e detalhadas',
      'A criança está sofrendo com o conflito entre os pais e precisa de estabilidade',
      'O genitor guardião dificulta o contato com o outro genitor (alienação parental)',
    ],
    ctaSubtitle: 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
    risksTitle: 'Os Principais Pontos de Atenção Nesse Processo',
    risks: [
      'Guarda indefinida gera insegurança jurídica e emocional para a criança',
      'Plano de convivência genérico causa conflitos recorrentes entre os genitores',
      'Descumprimento do regime pode gerar busca e apreensão e multa',
      'Alienação parental comprovada pode reverter a guarda',
    ],
    deepDives: [
      { title: 'Como funciona a guarda compartilhada em Brasília', text: 'A guarda compartilhada é a regra no Brasil desde 2014. Na Consulta de Viabilidade, a Sousa Araújo Advocacia esclarece todas as dúvidas, define a melhor estratégia e apresenta plano de ação claro.' },
      { title: 'Plano de convivência detalhado: por que é essencial', text: 'Um bom plano de convivência evita conflitos futuros. Detalhamos dias, horários, férias, feriados e datas especiais para garantir previsibilidade e estabilidade para a criança.' },
      { title: 'Alteração de guarda e convivência: quando é possível', text: 'Mudanças na rotina, cidade ou comportamento podem justificar revisão. Analisamos caso a caso na Consulta de Viabilidade e orientamos sobre as possibilidades.' },
    ],
    stickyImage: imgSticky,
    stickyAlt: 'Mãe e filho — guarda e plano de convivência em Brasília',
  },
  onlineBanner: 'A guarda e o plano de convivência devem proteger quem mais importa: a criança.',
  passoAPasso: [
    { id: 1, number: '01', title: 'Consulta de Viabilidade', subtitle: 'Consulta de Viabilidade', description: 'Analisamos o contexto familiar, a rotina da criança e os interesses dos genitores para definir a melhor estratégia de guarda e convivência.' },
    { id: 2, number: '02', title: 'Elaboração do Plano de Convivência', subtitle: 'Elaboração do Plano', description: 'Redigimos plano detalhado com dias, horários, férias e datas comemorativas, sempre com foco no melhor interesse da criança.' },
    { id: 3, number: '03', title: 'Protocolo e Mediação', subtitle: 'Protocolo e Mediação', description: 'Protocolamos a ação ou acordo e participamos ativamente de audiências e mediações para buscar a solução mais equilibrada.' },
    { id: 4, number: '04', title: 'Acompanhamento até a Decisão', subtitle: 'Acompanhamento', description: 'Monitoramos o andamento, respondemos a diligências e mantemos você informado em cada etapa com relatórios periódicos.' },
  ],
  riscoBanner: 'O maior risco não é o conflito. É não proteger a criança com um plano adequado.',
  objecoes: [
    { q: 'Qual a diferença entre guarda compartilhada e alternada?', a: 'Na guarda compartilhada, ambos os pais decidem juntos sobre a vida do filho, mas a residência pode ser fixa. Na alternada, a criança alterna entre as casas dos pais. A compartilhada é a regra no Brasil.' },
    { q: 'O plano de convivência pode ser alterado depois?', a: 'Sim. Sempre que houver mudança relevante nas circunstâncias (mudança de cidade, escola, rotina), é possível pedir revisão judicial do plano de convivência.' },
    { q: 'E se o outro genitor não cumprir o plano?', a: 'O descumprimento pode gerar multa, busca e apreensão e até reversão da guarda. É fundamental ter um plano detalhado e homologado judicialmente para ter respaldo.' },
    { q: 'Posso pedir guarda unilateral?', a: 'Sim, mas apenas em situações excepcionais (risco à integridade da criança, abandono, abuso). A guarda compartilhada é a regra e só é afastada com justificativa comprovada.' },
    { q: 'A criança pode escolher com quem morar?', a: 'A opinião da criança é considerada pelo juiz, especialmente a partir dos 12 anos, mas não é determinante. A decisão leva em conta o melhor interesse da criança de forma ampla.' },
    { q: 'Moro em outra cidade — posso ter guarda compartilhada?', a: 'A distância dificulta, mas não impede. O plano de convivência precisa ser adaptado à realidade geográfica, com períodos mais longos (férias, feriados prolongados).' },
  ],
  costCta: {
    title: 'Quem protege a criança com estratégia, protege o futuro',
    bgImage: imgCtaBg,
  },
  whyTrust: {
    trustItems: [
      '14+ anos de experiência em Direito de Família',
      'Atuação em Brasília/DF com conhecimento das Varas de Família',
      'Método SAA: Seleção, Arquitetura Documental e Acompanhamento',
      'Plano de convivência detalhado e personalizado',
      'Participação ativa em audiências e mediações',
      'Foco absoluto no melhor interesse da criança',
      'Sigilo e comunicação transparente como valores inegociáveis',
    ],
    consultaItems: [
      'Análise preliminar do caso e da rotina familiar',
      'Definição da modalidade de guarda mais adequada',
      'Orientação sobre o plano de convivência',
      'Estimativa de prazos e custos',
      'Plano de ação claro com próximos passos',
    ],
    lidianeImage: imgLidiane,
  },
  historias: {
    title: 'Histórias Reais de Quem Já Passou por Isso',
    items: [
      { id: 1, img: imgArticle1, alt: 'Mãe e filho em escritório', subtitle: 'Mãe em Brasília — guarda compartilhada formalizada com plano detalhado', body: 'Após divórcio consensual, os pais não conseguiam definir a rotina dos filhos. A Sousa Araújo Advocacia mediou a negociação e elaborou plano de convivência detalhado com dias, horários, férias e feriados. O acordo foi homologado judicialmente em 2 meses.' },
      { id: 2, img: imgArticle2, alt: 'Pai e filho em parque', subtitle: 'Pai que recuperou convivência após alienação parental comprovada', body: 'Genitor estava sendo impedido de ver os filhos há 6 meses. A Sousa Araújo Advocacia reuniu provas de alienação parental, entrou com ação de regulamentação de convivência e obteve decisão liminar restabelecendo o contato em 15 dias.' },
      { id: 3, img: imgArticle3, alt: 'Documentos jurídicos', subtitle: 'Revisão de convivência após mudança de cidade — ajuste sem conflito', body: 'Genitora precisou mudar de Brasília para São Paulo por motivo profissional. A Sousa Araújo Advocacia renegociou o plano de convivência, adaptando os períodos para férias e feriados prolongados. Acordo homologado sem litígio.' },
    ],
  },
  faqItems: [
    { q: 'O que é guarda compartilhada?', a: 'É a modalidade em que ambos os genitores participam das decisões sobre a vida do filho (saúde, educação, lazer). A residência pode ser fixa em um dos lares, mas as decisões são conjuntas.' },
    { q: 'Guarda compartilhada é obrigatória?', a: 'É a regra no Brasil desde 2014. Só pode ser afastada quando há risco comprovado à criança ou quando um dos genitores declara expressamente que não deseja exercê-la.' },
    { q: 'O que deve constar no plano de convivência?', a: 'Dias e horários de convivência com cada genitor, divisão de férias escolares, feriados, datas comemorativas, aniversários e regras para viagens.' },
    { q: 'Preciso de advogado para definir a guarda?', a: 'Sim. Seja por acordo ou por via judicial, a participação de advogado é obrigatória para homologação judicial do plano de guarda e convivência.' },
    { q: 'Quanto tempo demora o processo de guarda?', a: 'Quando há acordo, de 2 a 4 meses. Quando há litígio, de 6 meses a 2 anos, dependendo da complexidade e da pauta da Vara de Família.' },
    { q: 'A guarda pode ser revertida depois?', a: 'Sim. Se houver mudança relevante nas circunstâncias (risco à criança, descumprimento reiterado, alienação parental), é possível pedir revisão da guarda a qualquer tempo.' },
  ],
};

export function GuardaPage() {
  return <ServiceTemplate data={guardaData} panelId="lp-guarda" />;
}