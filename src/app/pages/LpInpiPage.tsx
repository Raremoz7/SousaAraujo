/**
 * InpiPage — Página de Registro de Marca no INPI
 */
import { ServiceTemplate, type ServiceData } from '../components/LpTemplate';

import imgHero from 'figma:asset/3391aaae30ed86069f38a5d48193a81c401b2c93.png';
import imgSticky from 'figma:asset/63e541ff81bdc7db6a1f4d0d3439bc7e61292b59.png';
import imgLidiane from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgArticle1 from 'figma:asset/6a3a654040bf7ff3ee87b4298a7a14a415c3a892.png';
import imgArticle2 from 'figma:asset/ab2e2968ea06bbaef25653a13c366099dd23d3b9.png';
import imgArticle3 from 'figma:asset/17cbbfeea7dfefc6c61a07cb3b5162defd6f6c10.png';
import imgParallax from 'figma:asset/a6a19f7d74d4d71fe6c9f1d51fd5ad4a4f1a5b98.png';
import imgMetodo from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgCtaBg from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';

export const inpiData: ServiceData = {
  hero: {
    title: 'Registro de Marca INPI em Brasília DF. Proteja o Nome da Sua Empresa',
    subtitle: 'Sua marca é o ativo mais visível da sua empresa — e sem registro no INPI, qualquer pessoa pode usá-la. Na SA Advocacia em Brasília DF, cuidamos de todo o processo: busca prévia, protocolo, acompanhamento e renovação. Proteja o que é seu.',
    image: imgHero,
    maxWidth: '920px',
  },
  trust: {
    features: [
      'Atendimento presencial e online com agilidade',
      'Busca prévia de viabilidade no INPI antes do protocolo',
      'Renovação e monitoramento de marca registrada',
    ],
    title: 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
    body: 'Com 14+ anos de atuação em Brasília/DF, a Sousa Araújo Advocacia conduz cada caso de registro de marca no INPI com o Método SAA: S: Seleção do caminho correto, A: Arquitetura documental rigorosa e A: Acompanhamento transparente. Nosso compromisso é com a organização prévia, a clareza em cada etapa e o sigilo absoluto. Você sabe exatamente onde está o seu processo.',
  },
  parallaxImage: imgParallax,
  metodo: {
    title: 'Método SAA (Sousa Araújo Advocacia) Aplicado a Registro de Marca no INPI',
    steps: [
      { label: 'S: Seleção do Caminho Correto', desc: 'Busca prévia de viabilidade no banco de dados do INPI, análise de marcas semelhantes, definição das classes de registro e avaliação da melhor estratégia para proteger o nome, logo ou slogan da empresa.' },
      { label: 'A: Arquitetura Documental', desc: 'Preparação do pedido de registro com toda a documentação necessária: formulários, descrição da marca, classificação Nice, procuração e comprovante de pagamento da taxa do INPI.' },
      { label: 'A: Acompanhamento Transparente', desc: 'Protocolo no INPI, monitoramento de publicações na Revista de Propriedade Industrial, resposta a exigências e oposições, e comunicação clara em cada etapa até o deferimento e expedição do certificado.' },
    ],
    image: imgMetodo,
  },
  scenarios: {
    title: 'Você Se Reconhece em Algum Desses Cenários?',
    items: [
      'Sua empresa usa um nome ou logo, mas nunca registrou no INPI',
      'Descobriu que alguém registrou uma marca parecida com a sua',
      'Quer proteger o nome antes de lançar um produto ou serviço',
      'Precisa renovar o registro de marca que está vencendo',
      'Quer monitorar tentativas de registro de marcas semelhantes',
      'Não sabe por onde começar o processo de registro',
    ],
    ctaSubtitle: 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
    risksTitle: 'Os Principais Pontos de Atenção Nesse Processo',
    risks: [
      'Sem registro, você não tem exclusividade — qualquer pessoa pode usar o mesmo nome legalmente',
      'Concorrente que registra primeiro pode exigir que você pare de usar sua própria marca',
      'Pedido mal classificado ou incompleto gera indeferimento e perda da taxa',
      'Marca não renovada dentro do prazo perde a proteção automaticamente',
    ],
    deepDives: [
      { title: 'Busca prévia de viabilidade: por que é essencial', text: 'Antes de protocolar, verificamos se já existe marca semelhante registrada ou em processo. Isso evita indeferimento e perda de investimento. Na Consulta de Viabilidade, apresentamos o resultado da busca.' },
      { title: 'Classificação Nice: como escolher as classes certas', text: 'O sistema Nice divide produtos e serviços em 45 classes. Registrar nas classes corretas garante proteção adequada ao seu negócio. Orientamos sobre a melhor estratégia de classificação.' },
      { title: 'Monitoramento e renovação: proteção contínua', text: 'Após o registro, monitoramos tentativas de registro de marcas semelhantes e alertamos sobre o prazo de renovação (a cada 10 anos). Proteção contínua para o seu ativo mais visível.' },
    ],
    stickyImage: imgSticky,
    stickyAlt: 'Empresário com computador — registro de marca INPI em Brasília',
  },
  onlineBanner: 'Sua marca é seu ativo mais visível. E sem registro, qualquer um pode usá-la.',
  passoAPasso: [
    { id: 1, number: '01', title: 'Consulta de Viabilidade', subtitle: 'Consulta de Viabilidade', description: 'Analisamos seu caso, definimos a melhor rota e apresentamos plano de ação com prazos e custos estimados.' },
    { id: 2, number: '02', title: 'Organização Documental', subtitle: 'Organização Documental', description: 'Preparamos o pedido de registro com formulários, classificação Nice, documentos e comprovante de pagamento da taxa do INPI.' },
    { id: 3, number: '03', title: 'Protocolo e Acompanhamento', subtitle: 'Protocolo e Acompanhamento', description: 'Protocolamos no INPI, monitoramos publicações e respondemos a exigências e oposições com argumentação técnica.' },
    { id: 4, number: '04', title: 'Conclusão e Providências Finais', subtitle: 'Conclusão', description: 'Após o deferimento, providenciamos o certificado de registro e oferecemos monitoramento contínuo e renovação.' },
  ],
  riscoBanner: 'O INPI não protege quem usa primeiro. Protege quem registra primeiro.',
  objecoes: [
    { q: 'O que pode ser registrado como marca?', a: 'Nomes, logos, slogans, combinações de cores e formas tridimensionais que identifiquem produtos ou serviços. Não é possível registrar termos genéricos ou descritivos.' },
    { q: 'Quanto custa registrar uma marca no INPI?', a: 'O custo inclui a taxa do INPI (que varia conforme o tipo de empresa) e os honorários advocatícios. O valor total é informado na Consulta de Viabilidade.' },
    { q: 'Quanto tempo demora o registro de marca?', a: 'O protocolo é feito em dias. O processo completo no INPI leva de 6 a 18 meses, dependendo da complexidade e de eventuais oposições ou exigências.' },
    { q: 'Preciso de advogado para registrar marca?', a: 'Não é obrigatório, mas altamente recomendado. Erros na classificação, na descrição ou na documentação geram indeferimento e perda da taxa. O advogado especializado evita esses problemas.' },
    { q: 'O registro vale para todo o Brasil?', a: 'Sim. O registro no INPI garante exclusividade em todo o território nacional, nas classes em que a marca foi registrada.' },
    { q: 'E se alguém se opuser ao meu pedido?', a: 'A Sousa Araújo Advocacia responde a oposições com argumentação técnica fundamentada, demonstrando a distintividade da sua marca e a ausência de conflito com marcas existentes.' },
  ],
  costCta: {
    title: 'Quem protege a marca com estratégia, protege o negócio inteiro',
    bgImage: imgCtaBg,
  },
  whyTrust: {
    trustItems: [
      '14+ anos de experiência em propriedade intelectual e marcas',
      'Busca prévia de viabilidade completa antes do protocolo',
      'Método SAA: Seleção, Arquitetura Documental e Acompanhamento',
      'Classificação Nice estratégica para máxima proteção',
      'Resposta a oposições e exigências com argumentação técnica',
      'Monitoramento contínuo e renovação no prazo',
      'Sigilo e comunicação transparente como valores inegociáveis',
    ],
    consultaItems: [
      'Busca prévia de viabilidade no INPI',
      'Definição das classes de registro',
      'Orientação sobre proteção de nome, logo e slogan',
      'Estimativa de prazos e custos',
      'Plano de ação claro com próximos passos',
    ],
    lidianeImage: imgLidiane,
  },
  historias: {
    title: 'Histórias Reais de Quem Já Passou por Isso',
    items: [
      { id: 1, img: imgArticle1, alt: 'Marca registrada', subtitle: 'Marca registrada em 9 meses — proteção nacional garantida', body: 'Empresa de tecnologia em Brasília precisava registrar o nome antes de lançar campanha nacional. A Sousa Araújo Advocacia fez busca prévia, ajustou a classificação e protocolou o pedido. Em 9 meses, o registro foi deferido sem exigências, garantindo proteção em todo o Brasil.' },
      { id: 2, img: imgArticle2, alt: 'Recurso no INPI', subtitle: 'Pedido indeferido no INPI — recurso deferido com argumentação técnica', body: 'Cliente teve o pedido de registro indeferido por semelhança com marca existente. A Sousa Araújo Advocacia analisou o caso, identificou diferenças suficientes e apresentou recurso com argumentação técnica detalhada. O INPI reconsiderou e deferiu o registro.' },
      { id: 3, img: imgArticle3, alt: 'Monitoramento de marca', subtitle: 'Monitoramento identificou cópia — ação impediu uso indevido', body: 'Após o registro, o serviço de monitoramento da Sousa Araújo Advocacia identificou tentativa de registro de marca praticamente idêntica por concorrente. Foi apresentada oposição ao INPI e o pedido do concorrente foi indeferido, protegendo a exclusividade do cliente.' },
    ],
  },
  faqItems: [
    { q: 'O que é o INPI?', a: 'Instituto Nacional da Propriedade Industrial — autarquia federal responsável pelo registro de marcas, patentes e desenhos industriais no Brasil.' },
    { q: 'Minha marca pode ser recusada?', a: 'Sim. Marcas genéricas, descritivas, que violem direitos de terceiros ou que sejam semelhantes a marcas já registradas podem ser recusadas. A busca prévia reduz esse risco.' },
    { q: 'Posso registrar marca sendo pessoa física?', a: 'Sim, desde que comprove atividade compatível com os produtos ou serviços da marca (como MEI, autônomo ou profissional liberal).' },
    { q: 'O registro de marca é definitivo?', a: 'Não. O registro tem validade de 10 anos, renovável por períodos iguais. A renovação deve ser feita no último ano de vigência ou nos 6 meses seguintes (com taxa adicional).' },
    { q: 'Posso usar ® antes do registro?', a: 'Não. O símbolo ® só pode ser usado após o deferimento do registro pelo INPI. Antes disso, você pode usar ™ (trademark) para indicar que está em processo.' },
    { q: 'O registro no Brasil protege em outros países?', a: 'Não. O registro no INPI protege apenas no Brasil. Para proteção internacional, é necessário registrar em cada país ou usar o Protocolo de Madrid.' },
  ],
};

export function InpiPage() {
  return <ServiceTemplate data={inpiData} panelId="lp-inpi" />;
}