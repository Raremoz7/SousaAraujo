/**
 * DivorcioPage — Página de Divórcio
 */
import { ServiceTemplate, type ServiceData } from '../components/LpTemplate';

import imgHero from 'figma:asset/11627a0f7cbebab29a5647bd973e67f9cc9a0654.png';
import imgSticky from 'figma:asset/733ce6c13194bb682858fd23d2dcca4e6789912f.png';
import imgLidiane from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgArticle1 from 'figma:asset/ce6aece832e47f333118a5c11ab31e0ee5115569.png';
import imgArticle2 from 'figma:asset/2f9a6e1b49afafb90c5a46ebb3472a114f6f7392.png';
import imgArticle3 from 'figma:asset/b052cf6562d7fd270447d498d215173670a4422e.png';
import imgParallax from 'figma:asset/47863592a3b9dab2d2b44d1fb8023b032fd357ce.png';
import imgMetodo from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgCtaBg from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';

export const divorcioData: ServiceData = {
  hero: {
    title: 'Divórcio em Brasília DF. Consensual no Cartório ou Litigioso no Fórum',
    subtitle: 'Divórcio é uma decisão que muda vidas — e merece ser conduzido com estratégia, respeito e organização. Na SA Advocacia em Brasília DF, definimos a melhor rota para o seu caso: cartório quando possível, fórum quando necessário. Tudo com transparência, sigilo e acompanhamento em cada etapa.',
    image: imgHero,
    maxWidth: '660px',
  },
  trust: {
    features: [
      'Atendimento 100% online, de qualquer país, com segurança',
      'Organização documental completa antes do protocolo',
      '14+ anos de experiência em Direito de Família',
    ],
    title: 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
    body: 'Com 14+ anos de atuação em Brasília/DF, a Sousa Araújo Advocacia conduz cada caso de divórcio com o Método SAA: S: Seleção da rota adequada (cartório ou fórum), A: Arquitetura do acordo ou da estratégia litigiosa e A: Acompanhamento transparente até a decisão final. Nosso compromisso é com a organização prévia, a clareza em cada etapa e o sigilo absoluto.',
  },
  parallaxImage: imgParallax,
  metodo: {
    title: 'Método SAA (Sousa Araújo Advocacia) Aplicado ao Divórcio',
    steps: [
      { label: 'S: Seleção da Rota Adequada', desc: 'Diagnóstico do caso: consensual no cartório, consensual judicial, ou litigioso. Análise de bens, filhos e regime de casamento para definir a estratégia mais eficiente.' },
      { label: 'A: Arquitetura do Acordo', desc: 'Elaboração da minuta de acordo, definição de guarda, alimentos, partilha e nome. Para o litigioso: estratégia de defesa e pedidos, identificação de riscos patrimoniais.' },
      { label: 'A: Ação com Acompanhamento', desc: 'Condução do processo com atualizações periódicas, transparência total e acesso ao andamento. No litigioso, estratégia firme e proteção dos seus interesses em cada audiência.' },
    ],
    image: imgMetodo,
  },
  scenarios: {
    title: 'Você Se Reconhece em Algum Desses Cenários?',
    items: [
      'Quer se divorciar mas não sabe se é mais vantajoso fazer no cartório ou no fórum',
      'Tem filhos menores e precisa definir guarda, alimentos e regime de convivência',
      'O cônjuge não coopera e o divórcio precisa ser conduzido de forma litigiosa',
      'Tem bens em comum e quer garantir uma partilha justa e protegida',
      'Mora no exterior e precisa se divorciar no Brasil ou validar o divórcio aqui',
      'Já tentou resolver por conta própria e o processo travou ou foi mal conduzido',
    ],
    ctaSubtitle: 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
    risksTitle: 'Os Principais Pontos de Atenção Nesse Processo',
    risks: [
      'Divórcio mal conduzido pode resultar em partilha injusta e perda patrimonial',
      'Guarda e alimentos indefinidos geram insegurança para os filhos',
      'Processo litigioso sem estratégia pode se arrastar por anos',
      'Divórcio no exterior sem homologação não tem validade no Brasil',
    ],
    deepDives: [
      { title: 'Divórcio consensual no cartório: quando é possível', text: 'Quando não há filhos menores ou incapazes e ambos concordam com os termos. É mais rápido, mais barato e mais reservado. Na Consulta de Viabilidade, verificamos se o seu caso permite essa rota.' },
      { title: 'Divórcio litigioso: como funciona', text: 'Quando não há acordo sobre partilha, guarda, alimentos ou qualquer questão relevante. Conduzimos com estratégia firme e proteção dos seus interesses em cada etapa.' },
      { title: 'Divórcio para brasileiros no exterior', text: 'Se o casamento foi no Brasil, o divórcio pode ser feito no Brasil — mesmo morando fora. Se foi no exterior, pode ser necessária a homologação. Analisamos caso a caso.' },
    ],
    stickyImage: imgSticky,
    stickyAlt: 'Advogada em reunião — divórcio em Brasília',
  },
  onlineBanner: 'Divórcio com estratégia protege você, seus filhos e seu patrimônio.',
  passoAPasso: [
    { id: 1, number: '01', title: 'Consulta de Viabilidade', subtitle: 'Consulta de Viabilidade', description: 'Analisamos o seu caso, verificamos bens, filhos e regime de casamento para definir a melhor rota: cartório ou fórum, consensual ou litigioso.' },
    { id: 2, number: '02', title: 'Arquitetura do Acordo ou Estratégia', subtitle: 'Arquitetura', description: 'No consensual: elaboramos a minuta de acordo completa. No litigioso: definimos a estratégia processual com foco na proteção dos seus interesses.' },
    { id: 3, number: '03', title: 'Protocolo e Condução', subtitle: 'Protocolo', description: 'Protocolamos no cartório ou no fórum e conduzimos todas as etapas com transparência, participação em audiências e negociações.' },
    { id: 4, number: '04', title: 'Decisão e Providências Finais', subtitle: 'Decisão Final', description: 'Após a sentença ou escritura, providenciamos a atualização do estado civil, o registro da partilha e demais providências necessárias.' },
    { id: 5, number: '05', title: 'Acompanhamento Pós-Divórcio', subtitle: 'Pós-Divórcio', description: 'Orientamos sobre execução de alimentos, cumprimento do plano de convivência e demais desdobramentos que possam surgir após o divórcio.' },
  ],
  riscoBanner: 'O maior risco não é se divorciar. É fazer isso sem estratégia.',
  objecoes: [
    { q: 'Qual a diferença entre divórcio no cartório e no fórum?', a: 'O divórcio extrajudicial (cartório) é mais rápido, barato e reservado. Só é possível quando não há filhos menores ou incapazes e há acordo entre as partes. O judicial é obrigatório quando há filhos menores, bens contestados ou quando um dos cônjuges não coopera.' },
    { q: 'Preciso ir ao cartório pessoalmente?', a: 'No cartório, os dois cônjuges precisam comparecer (ou outorgar procuração pública). No processo judicial, é possível participar por procuração, inclusive de forma 100% online.' },
    { q: 'O que acontece com os bens?', a: 'Depende do regime de casamento. Na comunhão parcial (o mais comum), os bens adquiridos durante o casamento são divididos. Na separação total, cada um fica com o que é seu.' },
    { q: 'O que é pensão alimentícia?', a: 'É o valor pago por um cônjuge ao outro para garantir a manutenção após o divórcio, quando há dependência financeira comprovada. É diferente dos alimentos devidos aos filhos, que têm regime próprio.' },
    { q: 'Quanto tempo demora um divórcio no cartório?', a: 'Em média, de 30 a 60 dias após a assinatura da escritura, dependendo do cartório. O processo judicial consensual leva de 3 a 6 meses; o litigioso pode levar de 1 a 3 anos.' },
    { q: 'Posso mudar o regime de bens após o casamento?', a: 'Sim, por meio de ação judicial de alteração de regime de bens. É necessária autorização judicial e a mudança não afeta direitos de terceiros já constituídos.' },
  ],
  costCta: {
    title: 'Quem entende o processo, controla o resultado',
    bgImage: imgCtaBg,
  },
  whyTrust: {
    trustItems: [
      '14+ anos de experiência em Direito de Família',
      'Atuação em divórcios consensuais e litigiosos em Brasília/DF',
      'Método SAA: Seleção, Arquitetura e Acompanhamento',
      'Condução de partilhas complexas e proteção patrimonial',
      'Experiência com divórcios envolvendo brasileiros no exterior',
      'Relatórios periódicos de acompanhamento do caso',
      'Sigilo absoluto e comunicação transparente como valores inegociáveis',
    ],
    consultaItems: [
      'Análise preliminar do seu caso',
      'Definição da rota processual (cartório ou judicial)',
      'Orientação sobre regime de bens e partilha',
      'Estimativa de prazos e custos',
      'Plano de ação claro com próximos passos',
    ],
    lidianeImage: imgLidiane,
  },
  historias: {
    title: 'Histórias Reais de Quem Já Passou por Isso',
    items: [
      { id: 1, img: imgArticle1, alt: 'Casal assinando documentos', subtitle: 'Divórcio consensual no cartório em 30 dias — com partilha e guarda definidos', body: 'Casal em Brasília decidiu se divorciar de forma amigável. A Sousa Araújo Advocacia elaborou a minuta de acordo, incluindo partilha de bens e guarda compartilhada. A escritura foi lavrada em 30 dias.' },
      { id: 2, img: imgArticle2, alt: 'Família em reunião', subtitle: 'Divórcio litigioso com partilha de 3 imóveis — proteção patrimonial garantida', body: 'Cônjuge não cooperava e havia 3 imóveis em disputa. A Sousa Araújo Advocacia conduziu o processo litigioso com estratégia de proteção patrimonial e obteve partilha justa em 14 meses.' },
      { id: 3, img: imgArticle3, alt: 'Documentos jurídicos', subtitle: 'Brasileira nos EUA — divórcio no Brasil conduzido 100% online', body: 'Cliente residia nos Estados Unidos e precisava se divorciar no Brasil. A Sousa Araújo Advocacia conduziu todo o processo online, com procuração consularizada e acompanhamento remoto. Divórcio concluído em 5 meses.' },
    ],
  },
  faqItems: [
    { q: 'O que é divórcio litigioso?', a: 'É o divórcio conduzido via processo judicial quando não há acordo entre os cônjuges sobre partilha de bens, guarda dos filhos, alimentos ou qualquer outra questão relevante.' },
    { q: 'O divórcio pode ser feito sem advogado?', a: 'Não. No processo judicial, o advogado é obrigatório para ambas as partes. No cartório, é exigida a presença de advogado para a lavratura da escritura.' },
    { q: 'Filhos menores impedem o divórcio no cartório?', a: 'Sim. Quando há filhos menores ou incapazes, o divórcio deve ser feito via processo judicial, independentemente de haver acordo entre os cônjuges.' },
    { q: 'O nome pode ser mantido após o divórcio?', a: 'Sim. O cônjuge que adotou o sobrenome do outro pode optar por mantê-lo após o divórcio. A manutenção deve ser declarada no processo ou na escritura.' },
    { q: 'Como funciona a guarda compartilhada?', a: 'Na guarda compartilhada, ambos os pais participam das decisões sobre a vida dos filhos (saúde, educação, lazer). A residência pode ser fixada em um dos lares ou em regime de alternância.' },
    { q: 'Posso pedir alimentos para mim mesmo?', a: 'Sim. O cônjuge que depende financeiramente do outro pode pedir alimentos para si. O valor é fixado com base nas necessidades do requerente e na capacidade de pagamento do requerido.' },
  ],
};

export function DivorcioPage() {
  return <ServiceTemplate data={divorcioData} panelId="lp-divorcio" />;
}