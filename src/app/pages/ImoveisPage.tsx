/**
 * ImoveisPage — Landing Page de Regularização de Imóveis e Usucapião
 */
import { ServiceTemplate, type ServiceData } from '../components/LpTemplate';

import imgHero from 'figma:asset/6c627bf6bc0511aa5872bd0ed7a7d5df4a890ba9.png';
import imgSticky from 'figma:asset/12a2ad658c98a75a68e754ec43b4428d5d09dbb9.png';
import imgLidiane from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgArticle1 from 'figma:asset/99845cac729cc816a36aeb2fbcdff900abb58d94.png';
import imgArticle2 from 'figma:asset/dfc3acbd307002bf1699fd526e5b93f0638f31f8.png';
import imgArticle3 from 'figma:asset/94589e7c5af09d789a178c202cd0050cf721aa15.png';
import imgParallax from 'figma:asset/e2649ec64292d89b6d8c078956b7ead05a803ef4.png';
import imgMetodo from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgCtaBg from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';

export const imoveisData: ServiceData = {
  hero: {
    title: 'Usucapião Extrajudicial em Brasília DF. Regularize Seu Imóvel no Cartório',
    subtitle: 'Seu imóvel não tem escritura? Mora há anos em um terreno sem registro? A usucapião extrajudicial em Brasília DF permite regularizar a situação diretamente no cartório, sem depender do judiciário. Na SA Advocacia, organizamos toda a documentação e conduzimos o processo com transparência em cada etapa.',
    image: imgHero,
    maxWidth: '732px',
  },
  trust: {
    features: [
      'Atendimento 100% online, de qualquer cidade ou estado',
      'Organização documental completa antes do protocolo',
      '14+ anos de experiência em Direito Imobiliário e Registral',
    ],
    title: 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
    body: 'Com 14+ anos de atuação em Brasília/DF, a Sousa Araújo Advocacia conduz cada processo de regularização imobiliária com o Método SAA: S: Seleção do caminho correto (usucapião extrajudicial, judicial, adjudicação compulsória ou regularização fundiária), A: Arquitetura documental rigorosa e A: Acompanhamento transparente até o registro definitivo.',
  },
  parallaxImage: imgParallax,
  metodo: {
    title: 'Método SAA (Sousa Araújo Advocacia) Aplicado à Regularização de Imóveis',
    steps: [
      { label: 'S: Seleção do Caminho Correto', desc: 'Diagnóstico completo da situação do imóvel: análise de matrícula, tempo de posse, documentação disponível e identificação do rito mais adequado (usucapião extrajudicial, judicial, adjudicação compulsória ou regularização fundiária).' },
      { label: 'A: Arquitetura Documental', desc: 'Levantamento e organização de toda a documentação necessária: certidões de cartório, planta, ART, declarações de vizinhança, testemunhas e comprovação de posse.' },
      { label: 'A: Ação com Acompanhamento', desc: 'Protocolo no cartório ou no fórum, acompanhamento de cada etapa do processo, resposta a exigências e comunicação transparente até o registro definitivo no nome do cliente.' },
    ],
    image: imgMetodo,
  },
  scenarios: {
    title: 'Você Se Reconhece em Algum Desses Cenários?',
    items: [
      'Comprou um imóvel há anos, mas nunca transferiu para o seu nome no cartório',
      'Herdou ou vai herdar um imóvel sem escritura e precisa regularizar antes de vender',
      'Mora em um terreno há mais de 5 anos sem oposição de ninguém e quer regularizar',
      'Tem um contrato de compra e venda informal (contrato de gaveta) e quer escritura',
      'Recebeu um imóvel como doação ou herança mas o inventário nunca foi feito',
      'Quer vender ou financiar o imóvel, mas o banco exige escritura e matrícula atualizada',
    ],
    ctaSubtitle: 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
    risksTitle: 'Os Principais Pontos de Atenção Nesse Processo',
    risks: [
      'Imóvel sem escritura não pode ser vendido, financiado ou dado em garantia',
      'Contrato de gaveta não garante a propriedade — apenas a posse',
      'Vizinho ou terceiro pode contestar a posse a qualquer momento',
      'Documentação incompleta gera indeferimento no cartório ou no fórum',
    ],
    deepDives: [
      { title: 'Usucapião extrajudicial: quando é possível fazer no cartório', text: 'Quando a posse é mansa, pacífica e ininterrupta pelo prazo legal. É mais rápida (3 a 12 meses) e mais barata que a via judicial. Na Consulta de Viabilidade, verificamos se o seu caso permite essa rota.' },
      { title: 'Adjudicação compulsória: quando o vendedor não assina', text: 'Quando o comprador pagou tudo mas o vendedor não assina a escritura. O juiz supre a vontade do vendedor e determina o registro em nome do comprador.' },
      { title: 'Regularização fundiária: imóveis em áreas urbanas irregulares', text: 'Para imóveis em loteamentos irregulares ou áreas sem registro formal. Existem procedimentos específicos previstos na Lei 13.465/2017.' },
    ],
    stickyImage: imgSticky,
    stickyAlt: 'Imóvel em Brasília — usucapião e regularização',
  },
  onlineBanner: 'Imóvel regularizado é patrimônio protegido. Sem escritura, é apenas posse.',
  passoAPasso: [
    { id: 1, number: '01', title: 'Consulta de Viabilidade', subtitle: 'Consulta de Viabilidade', description: 'Analisamos a situação do imóvel, verificamos matrícula, posse e documentação para definir o rito mais adequado.' },
    { id: 2, number: '02', title: 'Organização Documental', subtitle: 'Organização Documental', description: 'Levantamos certidões, planta, ART, declarações de vizinhança e comprovação de posse. Organizamos o dossiê completo.' },
    { id: 3, number: '03', title: 'Protocolo no Cartório ou Fórum', subtitle: 'Protocolo', description: 'Protocolamos o pedido de usucapião, adjudicação ou regularização. Acompanhamos notificações, exigências e manifestações.' },
    { id: 4, number: '04', title: 'Registro Definitivo', subtitle: 'Registro', description: 'Após a decisão favorável, providenciamos o registro do imóvel em nome do cliente no Cartório de Registro de Imóveis.' },
  ],
  riscoBanner: 'O maior risco não é o custo da regularização. É o valor do imóvel parado sem escritura.',
  objecoes: [
    { q: 'Qual a diferença entre usucapião extrajudicial e judicial?', a: 'A usucapião extrajudicial é feita diretamente no Cartório de Registro de Imóveis, sem necessidade de processo judicial. É mais rápida (3 a 12 meses) e mais barata. A judicial é necessária quando há oposição ou quando a documentação não permite o extrajudicial.' },
    { q: 'Preciso de advogado para a usucapião extrajudicial?', a: 'Sim. A lei exige a presença de advogado habilitado para protocolar o pedido no cartório. É o advogado quem organiza a documentação, requer as certidões e faz a petição ao oficial do cartório.' },
    { q: 'Quanto tempo leva a usucapião extrajudicial?', a: 'Em média, de 3 a 12 meses no cartório, dependendo da complexidade documental e da situação do imóvel. O maior fator de atraso são exigências documentais não antecipadas.' },
    { q: 'O imóvel precisa ter área definida?', a: 'Sim. É necessária a planta e memorial descritivo do imóvel, elaborados por profissional habilitado (engenheiro ou arquiteto), com ART ou RRT registrada.' },
    { q: 'O vizinho pode se opor?', a: 'Sim. No extrajudicial, os vizinhos confinantes são notificados e têm prazo para se manifestar. Se houver oposição, o processo vai para a via judicial.' },
    { q: 'Posso vender o imóvel durante a usucapião?', a: 'O ideal é aguardar o registro definitivo. Tecnicamente é possível ceder os direitos possessórios, mas isso pode complicar o processo.' },
  ],
  costCta: {
    title: 'Quem regulariza o imóvel, protege o patrimônio e destranca o valor',
    bgImage: imgCtaBg,
  },
  whyTrust: {
    trustItems: [
      '14+ anos de experiência em Direito Imobiliário e Registral',
      'Atuação em usucapião extrajudicial e judicial em Brasília/DF',
      'Método SAA: Seleção, Arquitetura Documental e Acompanhamento',
      'Experiência com adjudicação compulsória e regularização fundiária',
      'Parceria com engenheiros e topógrafos para planta e memorial descritivo',
      'Atendimento a clientes de todo o Brasil (100% online)',
      'Sigilo e comunicação transparente como valores inegociáveis',
    ],
    consultaItems: [
      'Análise da situação do imóvel e da documentação',
      'Definição do rito mais adequado',
      'Checklist documental personalizado',
      'Estimativa de prazos e custos',
      'Plano de ação claro com próximos passos',
    ],
    lidianeImage: imgLidiane,
  },
  historias: {
    title: 'Histórias Reais de Quem Já Passou por Isso',
    items: [
      { id: 1, img: imgArticle1, alt: 'Imóvel regularizado', subtitle: 'Usucapião extrajudicial em 6 meses — imóvel de 20 anos sem escritura', body: 'Cliente morava no imóvel há 20 anos com contrato de gaveta. A Sousa Araújo Advocacia organizou toda a documentação, obteve planta e ART, e protocolou a usucapião extrajudicial. Registro concluído em 6 meses.' },
      { id: 2, img: imgArticle2, alt: 'Cartório de registro', subtitle: 'Adjudicação compulsória — vendedor desaparecido, escritura obtida em 8 meses', body: 'Comprador pagou tudo mas o vendedor mudou de cidade e não assinou a escritura. A Sousa Araújo Advocacia entrou com adjudicação compulsória e o juiz determinou o registro em nome do comprador em 8 meses.' },
      { id: 3, img: imgArticle3, alt: 'Documentos de imóvel', subtitle: 'Regularização de herança sem inventário — 3 imóveis desbloqueados', body: 'Família herdou 3 imóveis mas nunca fez inventário. A Sousa Araújo Advocacia conduziu inventário extrajudicial e usucapião de um dos imóveis (sem escritura original). Todos regularizados em 5 meses.' },
    ],
  },
  faqItems: [
    { q: 'O que é usucapião?', a: 'É o modo de aquisição de propriedade por meio da posse prolongada, contínua e ininterrupta de um imóvel, com os requisitos definidos em lei.' },
    { q: 'Quanto tempo de posse é necessário?', a: 'Depende da modalidade: 5 anos para a especial urbana (até 250m²), 10 anos para a ordinária (com justo título e boa-fé), 15 anos para a extraordinária.' },
    { q: 'O imóvel pode ser em nome de outra pessoa?', a: 'Sim. O objetivo da usucapião é regularizar imóveis em situações irregulares, incluindo casos em que o imóvel está formalmente em nome de terceiros.' },
    { q: 'O que é adjudicação compulsória?', a: 'Ação judicial cabível quando o vendedor não assina a escritura definitiva após o pagamento integral. O juiz supre a vontade do vendedor e determina o registro.' },
    { q: 'Meu imóvel é público, posso usucapir?', a: 'Não. Imóveis públicos (da União, Estado ou Município) são imprescritíveis e não podem ser objeto de usucapião.' },
    { q: 'O que acontece com o IPTU durante o processo?', a: 'O IPTU continua sendo cobrado normalmente. O pagamento regular é, inclusive, um dos documentos que ajudam a comprovar a posse.' },
  ],
};

export function ImoveisPage() {
  return <ServiceTemplate data={imoveisData} panelId="lp-imoveis" />;
}