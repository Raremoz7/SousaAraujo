/**
 * PensaoPage — Página de Pensão Alimentícia
 */
import { ServiceTemplate, type ServiceData } from '../components/LpTemplate';

import imgHero from 'figma:asset/7d9d48b17642bfd1560d9af963da50ca64597cae.png';
import imgParallax from 'figma:asset/ae50b914a0d13b9db5c20f0b0a91afa37d425a6e.png';
import imgSticky from 'figma:asset/d016f45a560aeba6c99ee94e85fd7c78e541acb9.png';
import imgMetodo from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgLidiane from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgCtaBg from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';
import imgArticle1 from 'figma:asset/574bc20a845acb9058e835f9a2387fd5e5c42c54.png';
import imgArticle2 from 'figma:asset/009593579ff710de0c97486962e0b7c0c532523f.png';
import imgArticle3 from 'figma:asset/a2fa3a1a066343d7530dfae2a64afc45be3c4c5b.png';

export const pensaoData: ServiceData = {
  hero: {
    title: 'Pensão Alimentícia em Brasília DF. Fixação, Revisão e Execução com Estratégia',
    subtitle: 'Fixar, revisar ou cobrar pensão alimentícia exige conhecimento técnico e atuação estratégica. Na SA Advocacia em Brasília DF, definimos a melhor rota para proteger os direitos de quem precisa receber — ou adequar os valores para quem paga — com transparência e rigor.',
    image: imgHero,
    maxWidth: '813px',
  },
  trust: {
    features: [
      'Atendimento presencial e online com agilidade',
      'Organização documental completa antes do protocolo',
      '14+ anos de experiência em Direito de Família',
    ],
    title: 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
    body: 'Com 14+ anos de atuação em Brasília/DF, a Sousa Araújo Advocacia conduz cada caso de pensão alimentícia com o Método SAA: S: Seleção do caminho correto, A: Arquitetura documental rigorosa e A: Acompanhamento transparente. Nosso compromisso é com a organização prévia, a clareza em cada etapa e o sigilo absoluto. Você sabe exatamente onde está o seu processo.',
  },
  parallaxImage: imgParallax,
  metodo: {
    title: 'Método SAA (Sousa Araújo Advocacia) Aplicado a Pensão Alimentícia',
    steps: [
      { label: 'S: Seleção do Caminho Correto', desc: 'Analisamos a situação financeira de ambas as partes, as necessidades do alimentando e a capacidade do alimentante para definir a melhor estratégia: acordo extrajudicial, ação de fixação, revisão ou execução.' },
      { label: 'A: Arquitetura Documental', desc: 'Reunimos comprovantes de renda, despesas, declarações de IR e todos os documentos necessários. Elaboramos a petição com fundamentação técnica sólida para fixação ou revisão do valor.' },
      { label: 'A: Acompanhamento Transparente', desc: 'Conduzimos o processo com atualizações periódicas, participação em audiências e negociações, e comunicação transparente até a decisão final ou homologação do acordo.' },
    ],
    image: imgMetodo,
  },
  scenarios: {
    title: 'Você Se Reconhece em Algum Desses Cenários?',
    items: [
      'Precisa fixar pensão alimentícia para os filhos após a separação',
      'O valor atual da pensão não cobre as necessidades básicas da criança',
      'Sua renda diminuiu e o valor da pensão ficou desproporcional',
      'O alimentante não paga e você precisa executar a dívida',
      'Quer incluir despesas de saúde e educação no cálculo da pensão',
      'O filho completou 18 anos e você quer saber se a pensão continua',
    ],
    ctaSubtitle: 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
    risksTitle: 'Os Principais Pontos de Atenção Nesse Processo',
    risks: [
      'Pensão fixada sem análise técnica pode ser injusta para ambas as partes',
      'Inadimplência pode levar à prisão civil do alimentante',
      'Revisão sem fundamento gera custas processuais e perda de tempo',
      'Execução mal conduzida pode não recuperar os valores devidos',
    ],
    deepDives: [
      { title: 'Fixação de pensão alimentícia: como funciona', text: 'A pensão é fixada com base no binômio necessidade × possibilidade. Na Consulta de Viabilidade, analisamos a situação financeira de ambas as partes e definimos a melhor estratégia.' },
      { title: 'Revisão de alimentos: quando é possível', text: 'Sempre que houver mudança relevante na situação financeira (perda de emprego, aumento de despesas, novo filho), é possível pedir revisão. Analisamos caso a caso.' },
      { title: 'Execução de alimentos: como cobrar pensão atrasada', text: 'A execução pode resultar em penhora de bens, desconto em folha e até prisão civil. Conduzimos o processo com rigor técnico para máxima efetividade.' },
    ],
    stickyImage: imgSticky,
    stickyAlt: 'Família — pensão alimentícia em Brasília',
  },
  onlineBanner: 'Pensão alimentícia protege quem precisa. E cobrar é um direito, não um favor.',
  passoAPasso: [
    { id: 1, number: '01', title: 'Consulta de Viabilidade', subtitle: 'Consulta de Viabilidade', description: 'Analisamos a situação financeira, as necessidades e a capacidade contributiva para definir a melhor rota: acordo, fixação, revisão ou execução.' },
    { id: 2, number: '02', title: 'Organização Documental', subtitle: 'Organização Documental', description: 'Reunimos comprovantes de renda, despesas e documentação necessária. Elaboramos petição com fundamentação técnica sólida.' },
    { id: 3, number: '03', title: 'Protocolo e Negociação', subtitle: 'Protocolo e Negociação', description: 'Protocolamos a ação ou conduzimos a negociação extrajudicial. Participamos ativamente de audiências conciliatórias.' },
    { id: 4, number: '04', title: 'Acompanhamento até a Decisão', subtitle: 'Acompanhamento', description: 'Monitoramos o andamento, respondemos a diligências e mantemos você informado em cada movimentação relevante.' },
  ],
  riscoBanner: 'O maior risco não é pedir. É deixar de proteger quem depende de você.',
  objecoes: [
    { q: 'Como é calculado o valor da pensão?', a: 'O valor é baseado no binômio necessidade do alimentando × possibilidade do alimentante. Não existe percentual fixo em lei — o juiz analisa caso a caso, considerando despesas essenciais e renda disponível.' },
    { q: 'A pensão pode ser descontada em folha?', a: 'Sim. O desconto em folha é a forma mais segura e pode ser determinado pelo juiz. Garante regularidade no pagamento e evita inadimplência.' },
    { q: 'O que acontece se o alimentante não pagar?', a: 'A execução de alimentos pode resultar em penhora de bens, bloqueio de contas e prisão civil de 1 a 3 meses. É uma das poucas dívidas que autorizam prisão no Brasil.' },
    { q: 'A pensão continua depois dos 18 anos?', a: 'Não cessa automaticamente. Se o filho estiver estudando, pode ser mantida até 24 anos. A exoneração deve ser pedida judicialmente.' },
    { q: 'Posso pedir pensão para mim (ex-cônjuge)?', a: 'Sim, quando há dependência financeira comprovada. É fixada com base na necessidade e na capacidade de pagamento, e pode ser temporária ou definitiva.' },
    { q: 'Quanto tempo demora o processo?', a: 'Alimentos provisórios podem ser fixados em dias. O processo principal leva de 3 a 12 meses, dependendo da complexidade e da pauta da Vara.' },
  ],
  costCta: {
    title: 'Quem age com estratégia protege quem importa',
    bgImage: imgCtaBg,
  },
  whyTrust: {
    trustItems: [
      '14+ anos de experiência em Direito de Família',
      'Atuação estratégica em fixação, revisão e execução',
      'Método SAA: Seleção, Arquitetura Documental e Acompanhamento',
      'Análise financeira detalhada para fundamentação sólida',
      'Agilidade na obtenção de alimentos provisórios',
      'Experiência com execução e prisão civil por inadimplência',
      'Sigilo e comunicação transparente como valores inegociáveis',
    ],
    consultaItems: [
      'Análise preliminar da situação financeira',
      'Definição da melhor rota (acordo, fixação, revisão ou execução)',
      'Checklist documental personalizado',
      'Estimativa de prazos e custos',
      'Plano de ação claro com próximos passos',
    ],
    lidianeImage: imgLidiane,
  },
  historias: {
    title: 'Histórias Reais de Quem Já Passou por Isso',
    items: [
      { id: 1, img: imgArticle1, alt: 'Mãe com documentos', subtitle: 'Mãe em Brasília — pensão fixada em 15 dias com alimentos provisórios', body: 'Após a separação, o pai deixou de contribuir. A Sousa Araújo Advocacia obteve alimentos provisórios em 15 dias e a fixação definitiva em 4 meses, incluindo despesas de saúde e educação.' },
      { id: 2, img: imgArticle2, alt: 'Pai em reunião', subtitle: 'Pai que conseguiu revisão justa após perda de emprego', body: 'Alimentante perdeu o emprego e não conseguia pagar o valor fixado. A Sousa Araújo Advocacia conduziu a revisão com documentação completa e obteve redução proporcional à nova realidade financeira.' },
      { id: 3, img: imgArticle3, alt: 'Documentos sobre mesa', subtitle: 'Execução de alimentos com prisão civil — dívida de 8 meses quitada', body: 'Alimentante acumulava 8 meses de inadimplência. A Sousa Araújo Advocacia executou a dívida pelo rito da prisão civil. Em 30 dias, o devedor quitou integralmente os valores em atraso.' },
    ],
  },
  faqItems: [
    { q: 'O que são alimentos provisórios?', a: 'São valores fixados liminarmente pelo juiz no início do processo, antes da sentença definitiva. Garantem sustento imediato enquanto o processo tramita.' },
    { q: 'A pensão incide sobre o salário bruto ou líquido?', a: 'Geralmente sobre o salário líquido (após descontos obrigatórios como INSS e IR). Pode incluir 13º e férias, dependendo da decisão judicial.' },
    { q: 'Pensão in natura é aceita?', a: 'Sim. O juiz pode autorizar que parte da pensão seja paga diretamente em despesas (escola, plano de saúde), desde que haja controle e comprovação.' },
    { q: 'Posso pedir pensão para avós?', a: 'Sim. Os avós têm obrigação alimentar subsidiária. Se os pais não podem pagar, os avós podem ser acionados judicialmente.' },
    { q: 'A pensão pode ser retroativa?', a: 'Sim, é devida desde a data da citação do alimentante no processo. Valores anteriores ao ajuizamento da ação não são cobrados.' },
    { q: 'Acordo extrajudicial tem validade?', a: 'Sim, se homologado judicialmente. Sem homologação, o acordo tem valor contratual mas não permite execução pelo rito de prisão civil.' },
  ],
};

export function PensaoPage() {
  return <ServiceTemplate data={pensaoData} panelId="lp-pensao" />;
}