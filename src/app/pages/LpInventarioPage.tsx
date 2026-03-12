/**
 * InventarioPage — Página de Inventário e Sucessões
 */
import { ServiceTemplate, type ServiceData } from '../components/LpTemplate';

import imgHero from 'figma:asset/1722bd2dbe91e1c0c815f2de0aedaffca0634a21.png';
import imgParallax from 'figma:asset/d15774ad611683c79ca80bfe5a789dd7fd4f0889.png';
import imgSticky from 'figma:asset/7206336441ba5fb35ee382eca97ef8f032a96a35.png';
import imgMetodo from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgLidiane from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgCtaBg from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';
import imgArticle1 from 'figma:asset/dee48bb7153f8a2c30179b1f1bfbbb904dc0980b.png';
import imgArticle2 from 'figma:asset/fed1e9ab57bcb3ad1d5ef1f67e3c5f86900e2187.png';
import imgArticle3 from 'figma:asset/53b050a345887b90fab71b9c7bff0a7dd0230a77.png';

export const inventarioData: ServiceData = {
  hero: {
    title: 'Inventário em Brasília DF. Judicial e Extrajudicial com Organização e Transparência',
    subtitle: 'Perder alguém é difícil. Ter que lidar com burocracia e patrimônio nesse momento exige um profissional que organize tudo com sensibilidade e eficiência. Na SA Advocacia em Brasília DF, conduzimos inventários com método, transparência e respeito pelo seu momento.',
    image: imgHero,
    maxWidth: '920px',
  },
  trust: {
    features: [
      'Atendimento presencial e online com sensibilidade',
      'Organização documental completa antes do protocolo',
      '14+ anos de experiência em Direito de Família e Sucessões',
    ],
    title: 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
    body: 'Com 14+ anos de atuação em Brasília/DF, a Sousa Araújo Advocacia conduz cada inventário com o Método SAA: S: Seleção do caminho correto (cartório ou judicial), A: Arquitetura documental rigorosa e A: Acompanhamento transparente. Nosso compromisso é com a organização prévia, a clareza em cada etapa e o sigilo absoluto.',
  },
  parallaxImage: imgParallax,
  metodo: {
    title: 'Método SAA (Sousa Araújo Advocacia) Aplicado a Inventário e Sucessões',
    steps: [
      { label: 'S: Seleção do Caminho Correto', desc: 'Analisamos o patrimônio, os herdeiros e a situação documental para definir a melhor rota: inventário extrajudicial (cartório) quando possível, judicial quando necessário. Identificamos riscos e oportunidades antes de iniciar.' },
      { label: 'A: Arquitetura Documental', desc: 'Levantamos certidões, avaliações, documentos dos herdeiros e do falecido. Organizamos o dossiê completo, calculamos o ITCMD e preparamos a minuta de partilha ou a petição judicial.' },
      { label: 'A: Acompanhamento Transparente', desc: 'Conduzimos o processo no cartório ou no fórum com atualizações periódicas, resolução de exigências e comunicação clara até o registro dos bens em nome dos herdeiros.' },
    ],
    image: imgMetodo,
  },
  scenarios: {
    title: 'Você Se Reconhece em Algum Desses Cenários?',
    items: [
      'Um familiar faleceu e você não sabe por onde começar o inventário',
      'Há imóveis, veículos ou contas bancárias que precisam ser transferidos',
      'Os herdeiros não concordam sobre a divisão dos bens',
      'O prazo de 60 dias para abrir o inventário já passou e há multa',
      'Precisa fazer inventário extrajudicial no cartório (todos concordam)',
      'Há bens em mais de um estado ou país e a situação é complexa',
    ],
    ctaSubtitle: 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
    risksTitle: 'Os Principais Pontos de Atenção Nesse Processo',
    risks: [
      'Inventário não aberto impede transferência de bens e pode gerar multa de ITCMD',
      'Bens ficam indisponíveis: não é possível vender, financiar ou transferir',
      'Conflito entre herdeiros pode travar o processo por anos',
      'Documentação incompleta gera exigências e atrasos no cartório ou no fórum',
    ],
    deepDives: [
      { title: 'Inventário extrajudicial: quando é possível fazer no cartório', text: 'Quando todos os herdeiros são maiores, capazes e concordam com a partilha. É mais rápido, mais barato e mais prático. Na Consulta de Viabilidade, verificamos se o seu caso permite essa rota.' },
      { title: 'Inventário judicial: quando é obrigatório', text: 'Quando há herdeiros menores, incapazes, testamento ou conflito entre os herdeiros. Também é necessário quando há bens em situação irregular. Conduzimos com organização e agilidade.' },
      { title: 'ITCMD e custos do inventário', text: 'O ITCMD é o imposto sobre herança cobrado pelo estado. A alíquota varia por UF. Calculamos o valor correto e orientamos sobre o pagamento para evitar juros e multas.' },
    ],
    stickyImage: imgSticky,
    stickyAlt: 'Família em reunião — inventário e sucessões em Brasília',
  },
  onlineBanner: 'Inventário organizado protege o patrimônio da família e evita conflitos futuros.',
  passoAPasso: [
    { id: 1, number: '01', title: 'Consulta de Viabilidade', subtitle: 'Consulta de Viabilidade', description: 'Analisamos o patrimônio, os herdeiros e a documentação para definir a melhor rota: cartório ou judicial. Calculamos ITCMD e estimamos custos.' },
    { id: 2, number: '02', title: 'Organização Documental', subtitle: 'Organização Documental', description: 'Levantamos certidões, avaliações e documentos necessários. Preparamos a minuta de partilha ou petição judicial com toda a fundamentação.' },
    { id: 3, number: '03', title: 'Protocolo no Cartório ou Fórum', subtitle: 'Protocolo', description: 'Protocolamos o inventário na via escolhida. No cartório, acompanhamos até a escritura. No fórum, conduzimos todas as etapas processuais.' },
    { id: 4, number: '04', title: 'Partilha e Registro', subtitle: 'Partilha e Registro', description: 'Após a homologação, providenciamos o registro dos bens em nome dos herdeiros nos cartórios de imóveis, Detran e instituições financeiras.' },
  ],
  riscoBanner: 'O maior risco não é o custo do inventário. É o patrimônio parado sem solução.',
  objecoes: [
    { q: 'Qual o prazo para abrir o inventário?', a: '60 dias a partir do óbito. Após esse prazo, há incidência de multa sobre o ITCMD. Quanto mais cedo iniciar, menor o custo e mais rápida a resolução.' },
    { q: 'Quanto custa um inventário?', a: 'O custo inclui ITCMD (imposto estadual), emolumentos do cartório ou custas judiciais, certidões e honorários advocatícios. O valor varia conforme o patrimônio e a complexidade.' },
    { q: 'Todos os herdeiros precisam concordar?', a: 'Para o extrajudicial (cartório), sim. Se houver divergência, o inventário vai para a via judicial, onde o juiz decide a partilha.' },
    { q: 'Posso vender um imóvel antes de concluir o inventário?', a: 'Não é recomendado. Antes da partilha, o imóvel pertence ao espólio (conjunto de bens do falecido). Qualquer venda exige autorização judicial.' },
    { q: 'E se o falecido deixou testamento?', a: 'O inventário deve ser judicial quando há testamento. O testamento não dispensa o inventário — ele apenas orienta a partilha dentro dos limites legais.' },
    { q: 'Companheiro(a) tem direito à herança?', a: 'Sim. O companheiro em união estável tem direitos sucessórios semelhantes ao cônjuge, com variações conforme o regime de bens e a legislação aplicável.' },
  ],
  costCta: {
    title: 'Quem organiza o inventário com método, protege o patrimônio da família',
    bgImage: imgCtaBg,
  },
  whyTrust: {
    trustItems: [
      '14+ anos de experiência em Direito de Família e Sucessões',
      'Atuação em inventários extrajudiciais e judiciais em Brasília/DF',
      'Método SAA: Seleção, Arquitetura Documental e Acompanhamento',
      'Cálculo preciso de ITCMD e orientação tributária',
      'Mediação de conflitos entre herdeiros',
      'Experiência com patrimônios complexos e bens em múltiplos estados',
      'Sigilo e comunicação transparente como valores inegociáveis',
    ],
    consultaItems: [
      'Análise preliminar do patrimônio e dos herdeiros',
      'Definição da rota: cartório ou judicial',
      'Cálculo estimado do ITCMD',
      'Estimativa de prazos e custos totais',
      'Plano de ação claro com próximos passos',
    ],
    lidianeImage: imgLidiane,
  },
  historias: {
    title: 'Histórias Reais de Quem Já Passou por Isso',
    items: [
      { id: 1, img: imgArticle1, alt: 'Família em reunião', subtitle: 'Inventário extrajudicial concluído em 3 meses — 4 herdeiros em acordo', body: 'Família com 4 herdeiros e patrimônio de 3 imóveis em Brasília. A Sousa Araújo Advocacia organizou toda a documentação, calculou o ITCMD e conduziu o inventário no cartório. Escritura lavrada em 3 meses.' },
      { id: 2, img: imgArticle2, alt: 'Documentos de herança', subtitle: 'Inventário judicial com testamento — partilha definida em 8 meses', body: 'Falecido deixou testamento com cláusulas restritivas. Inventário obrigatoriamente judicial. A Sousa Araújo Advocacia conduziu o processo, resolveu divergências entre herdeiros e obteve homologação da partilha em 8 meses.' },
      { id: 3, img: imgArticle3, alt: 'Imóvel em escritura', subtitle: 'Inventário de bens em 3 estados — organização documental preventiva', body: 'Herdeiros em diferentes estados com bens no DF, SP e MG. A Sousa Araújo Advocacia centralizou a documentação, coordenou certidões em 3 estados e conduziu o inventário em Brasília com eficiência.' },
    ],
  },
  faqItems: [
    { q: 'O que é inventário extrajudicial?', a: 'É o inventário feito em cartório, sem necessidade de processo judicial. É mais rápido e mais barato, mas exige que todos os herdeiros sejam maiores, capazes e estejam de acordo com a partilha.' },
    { q: 'Quanto tempo demora o inventário?', a: 'Extrajudicial: 2 a 6 meses. Judicial consensual: 6 a 12 meses. Judicial litigioso: 1 a 3 anos ou mais, dependendo da complexidade.' },
    { q: 'O que é ITCMD?', a: 'Imposto de Transmissão Causa Mortis e Doação. É o imposto estadual cobrado sobre a herança. No DF, a alíquota é de 4% sobre o valor dos bens transmitidos.' },
    { q: 'Preciso de advogado para inventário no cartório?', a: 'Sim. A lei exige a presença de advogado tanto no inventário extrajudicial (cartório) quanto no judicial.' },
    { q: 'E se um herdeiro morar no exterior?', a: 'É possível participar por procuração outorgada no Consulado Brasileiro ou com apostilamento. O processo pode ser conduzido sem a presença física do herdeiro.' },
    { q: 'Bens sem escritura podem entrar no inventário?', a: 'Depende da situação. Bens com contrato de gaveta ou posse podem ser incluídos, mas podem exigir regularização paralela (usucapião ou adjudicação compulsória).' },
  ],
};

export function InventarioPage() {
  return <ServiceTemplate data={inventarioData} panelId="lp-inventario" />;
}