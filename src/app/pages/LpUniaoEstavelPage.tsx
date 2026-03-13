/**
 * UniaoEstavelPage — Página de União Estável
 */
import { ServiceTemplate, type ServiceData } from '../components/LpTemplate';

import imgHero from 'figma:asset/6c627bf6bc0511aa5872bd0ed7a7d5df4a890ba9.png';
import imgSticky from 'figma:asset/4a36bb11fdcdbb05a48be1bedc1e4dcfd7d3dee4.png';
import imgLidiane from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgArticle1 from 'figma:asset/8939e27c373d2667cd5b70a5d8b055a4fd2fa218.png';
import imgArticle2 from 'figma:asset/7172e73658649742fdd5acab43293d31612372af.png';
import imgArticle3 from 'figma:asset/17ddbc7d87780fe3b96f8aa23873484672413186.png';
import imgParallax from 'figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png';
import imgMetodo from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgCtaBg from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';

export const uniaoData: ServiceData = {
  hero: {
    title: 'União Estável em Brasília DF. Reconhecimento, Dissolução e Proteção Patrimonial',
    subtitle: 'União estável gera direitos e deveres patrimoniais que muitas pessoas desconhecem. Na SA Advocacia em Brasília DF, orientamos sobre reconhecimento, contrato de convivência, dissolução e proteção do seu patrimônio — com clareza e sigilo.',
    image: imgHero,
    maxWidth: '920px',
  },
  trust: {
    features: [
      'Atendimento presencial e online com agilidade',
      'Organização documental completa antes do protocolo',
      '14+ anos de experiência em Direito de Família',
    ],
    title: 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
    body: 'Com 14+ anos de atuação em Brasília/DF, a Sousa Araújo Advocacia conduz cada caso de união estável com o Método SAA: S: Seleção do caminho correto, A: Arquitetura documental rigorosa e A: Acompanhamento transparente. Nosso compromisso é com a organização prévia, a clareza em cada etapa e o sigilo absoluto.',
  },
  parallaxImage: imgParallax,
  metodo: {
    title: 'Método SAA (Sousa Araújo Advocacia) Aplicado a União Estável e Proteção Patrimonial',
    steps: [
      { label: 'S: Seleção do Caminho Correto', desc: 'Analisamos a situação do casal — reconhecimento, contrato de convivência, dissolução ou conversão em casamento — e definimos a melhor rota processual.' },
      { label: 'A: Arquitetura Documental', desc: 'Elaboramos contrato de convivência personalizado, declaração de união estável ou petição de dissolução. Organizamos toda a documentação necessária para cartório ou fórum.' },
      { label: 'A: Acompanhamento Transparente', desc: 'Conduzimos o processo com atualizações periódicas, negociação entre as partes e comunicação clara até a conclusão — seja no cartório ou no fórum.' },
    ],
    image: imgMetodo,
  },
  scenarios: {
    title: 'Você Se Reconhece em Algum Desses Cenários?',
    items: [
      'Mora com alguém há anos, mas nunca formalizou a união estável',
      'Quer fazer um contrato de convivência para proteger bens pessoais',
      'Precisa reconhecer a união estável para fins previdenciários ou de herança',
      'O relacionamento acabou e precisa dissolver a união com partilha de bens',
      'Quer converter a união estável em casamento',
      'Não sabe quais são seus direitos patrimoniais na união estável',
    ],
    ctaSubtitle: 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
    risksTitle: 'Os Principais Pontos de Atenção Nesse Processo',
    risks: [
      'União estável sem contrato aplica comunhão parcial: todos os bens adquiridos na constância são compartilhados',
      'Sem formalização, provar a existência da união em caso de separação ou morte é difícil e oneroso',
      'Direitos previdenciários e sucessórios podem ser negados sem comprovação formal',
      'Dissolução sem assistência jurídica pode resultar em partilha injusta',
    ],
    deepDives: [
      { title: 'Contrato de convivência: o que é e por que fazer', text: 'O contrato define o regime de bens entre os companheiros. Sem ele, aplica-se a comunhão parcial. Na Consulta de Viabilidade, orientamos sobre a melhor opção para o seu caso.' },
      { title: 'Reconhecimento de união estável: quando é necessário', text: 'Para fins previdenciários, bancários, de plano de saúde e sucessórios. Pode ser feito em cartório (declaração) ou judicialmente (quando há contestação).' },
      { title: 'Dissolução de união estável: como funciona', text: 'Semelhante ao divórcio. Pode ser feita em cartório (quando há acordo e sem filhos menores) ou no fórum. Inclui partilha de bens, guarda e alimentos.' },
    ],
    stickyImage: imgSticky,
    stickyAlt: 'Casal em escritório — união estável em Brasília',
  },
  onlineBanner: 'União estável gera direitos patrimoniais. Proteja o que é seu com orientação adequada.',
  passoAPasso: [
    { id: 1, number: '01', title: 'Consulta de Viabilidade', subtitle: 'Consulta de Viabilidade', description: 'Analisamos a situação do casal e definimos a melhor rota: reconhecimento, contrato de convivência, dissolução ou conversão em casamento.' },
    { id: 2, number: '02', title: 'Elaboração do Contrato ou Petição', subtitle: 'Elaboração Documental', description: 'Redigimos contrato de convivência personalizado ou petição de reconhecimento/dissolução com toda a fundamentação necessária.' },
    { id: 3, number: '03', title: 'Protocolo no Cartório ou Fórum', subtitle: 'Protocolo', description: 'Protocolamos no cartório ou no fórum e acompanhamos cada etapa do processo até a conclusão.' },
    { id: 4, number: '04', title: 'Registro e Providências Finais', subtitle: 'Registro', description: 'Após a conclusão, providenciamos o registro da escritura, atualizações cadastrais e demais providências necessárias.' },
  ],
  riscoBanner: 'O maior risco não é formalizar. É não saber o que você pode perder sem proteção.',
  objecoes: [
    { q: 'Qual a diferença entre união estável e casamento?', a: 'A principal diferença é a forma de constituição. O casamento exige habilitação e cerimônia civil. A união estável se constitui pela convivência pública, contínua e duradoura com objetivo de formar família. Os direitos patrimoniais e sucessórios são semelhantes.' },
    { q: 'Preciso morar junto para ter união estável?', a: 'Não necessariamente. O STF já reconheceu união estável sem coabitação. O que importa é a convivência pública, contínua e duradoura com objetivo de formar família.' },
    { q: 'O contrato de convivência pode ser feito depois?', a: 'Sim. Pode ser feito a qualquer momento durante a união. Porém, quanto mais cedo, melhor para proteger bens já adquiridos e futuros.' },
    { q: 'Quais são os regimes de bens na união estável?', a: 'Sem contrato, aplica-se a comunhão parcial. Com contrato, é possível escolher separação total, comunhão universal ou participação final nos aquestos.' },
    { q: 'Como provar a união estável se não tem documento?', a: 'Por testemunhas, fotos, contas bancárias conjuntas, plano de saúde, correspondências e outros elementos que demonstrem a convivência. A prova pode ser judicial.' },
    { q: 'Companheiro tem direito à herança?', a: 'Sim. O companheiro em união estável tem direitos sucessórios sobre os bens adquiridos na constância da união, concorrendo com descendentes e ascendentes.' },
  ],
  costCta: {
    title: 'Quem formaliza a união, protege o patrimônio e os direitos de ambos',
    bgImage: imgCtaBg,
  },
  whyTrust: {
    trustItems: [
      '14+ anos de experiência em Direito de Família',
      'Contratos de convivência personalizados e detalhados',
      'Método SAA: Seleção, Arquitetura Documental e Acompanhamento',
      'Reconhecimento e dissolução em cartório ou fórum',
      'Orientação sobre regime de bens e proteção patrimonial',
      'Experiência com casos complexos (bens no exterior, direitos previdenciários)',
      'Sigilo e comunicação transparente como valores inegociáveis',
    ],
    consultaItems: [
      'Análise preliminar da situação do casal',
      'Definição da melhor rota (contrato, reconhecimento, dissolução)',
      'Orientação sobre regime de bens',
      'Estimativa de prazos e custos',
      'Plano de ação claro com próximos passos',
    ],
    lidianeImage: imgLidiane,
  },
  historias: {
    title: 'Histórias Reais de Quem Já Passou por Isso',
    items: [
      { id: 1, img: imgArticle1, alt: 'Casal assinando documentos', subtitle: 'Casal em Brasília — contrato de convivência com separação total de bens', body: 'Casal com patrimônios individuais significativos queria proteger bens pessoais. A Sousa Araújo Advocacia elaborou contrato de convivência com separação total, registrado em cartório em 15 dias.' },
      { id: 2, img: imgArticle2, alt: 'Família em escritório', subtitle: 'Reconhecimento de união estável para fins previdenciários — pensão garantida', body: 'Companheira precisava comprovar a união para receber pensão por morte do INSS. A Sousa Araújo Advocacia conduziu o reconhecimento judicial com provas documentais e testemunhais. Pensão concedida em 4 meses.' },
      { id: 3, img: imgArticle3, alt: 'Documentos sobre mesa', subtitle: 'Dissolução de união estável com partilha — acordo no cartório em 30 dias', body: 'Casal sem filhos menores decidiu encerrar a união de forma consensual. A Sousa Araújo Advocacia mediou a partilha de bens e conduziu a dissolução em cartório. Escritura lavrada em 30 dias.' },
    ],
  },
  faqItems: [
    { q: 'O que caracteriza a união estável?', a: 'Convivência pública, contínua e duradoura entre duas pessoas com o objetivo de constituir família. Não é necessário prazo mínimo nem coabitação.' },
    { q: 'Quanto tempo de convivência é necessário?', a: 'A lei não exige prazo mínimo. O que importa é a intenção de constituir família e a estabilidade da relação. A análise é feita caso a caso.' },
    { q: 'Como formalizar a união estável?', a: 'Por escritura pública em cartório (declaração de união estável) ou por ação judicial de reconhecimento. A escritura é mais rápida e simples.' },
    { q: 'União estável dá direito a pensão por morte?', a: 'Sim. O companheiro em união estável tem direito à pensão por morte do INSS e de regimes próprios, desde que comprove a existência da união.' },
    { q: 'Posso converter a união estável em casamento?', a: 'Sim. A conversão pode ser feita judicialmente ou em cartório, e não exige nova cerimônia. Os efeitos do casamento retroagem à data da união.' },
    { q: 'A união estável pode ser reconhecida após o falecimento?', a: 'Sim. O reconhecimento post mortem é possível por via judicial, com produção de provas da convivência. É essencial para garantir direitos sucessórios.' },
  ],
};

export function UniaoEstavelPage() {
  return <ServiceTemplate data={uniaoData} panelId="lp-uniao" />;
}