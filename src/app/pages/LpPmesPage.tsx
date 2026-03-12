/**
 * PmesPage — Página de Consultoria Empresarial para PMEs
 */
import { ServiceTemplate, type ServiceData } from '../components/LpTemplate';

import imgHero from 'figma:asset/940e862066ee1fd2bbaffb4e7abc4b2193f6f969.png';
import imgParallax from 'figma:asset/648132f30cb3a6dc36f017f2d0ae7ec9a3962e7e.png';
import imgSticky from 'figma:asset/450aedca3402de02043943ecf3ed827a3414f5e9.png';
import imgMetodo from 'figma:asset/d549692c425a1be1f547495a00b3374ff2fc8534.png';
import imgLidiane from 'figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png';
import imgCtaBg from 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png';
import imgArticle1 from 'figma:asset/88c113a877330ea2af7372ca49eb5ab214f5b1f2.png';
import imgArticle2 from 'figma:asset/ddf4d2d6da5bdbb964d20cfba9a79270f6724b62.png';
import imgArticle3 from 'figma:asset/66a9ad79647b2507495a119235faca289bed9341.png';

export const pmesData: ServiceData = {
  hero: {
    title: 'Advogado Empresarial em Brasília DF. Contratos e Consultoria para PMEs',
    subtitle: 'Empresário que cresce sem suporte jurídico está construindo sobre risco. Na SA Advocacia em Brasília DF, oferecemos consultoria preventiva para PMEs: contratos bem feitos, societário em dia e proteção da marca. Tudo com linguagem clara e resultados práticos.',
    image: imgHero,
    maxWidth: '920px',
  },
  trust: {
    features: [
      'Atendimento presencial e online com linguagem clara',
      'Organização documental completa para sua empresa',
      'Consultoria preventiva recorrente (retainer mensal)',
    ],
    title: 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
    body: 'Com 14+ anos de atuação em Brasília/DF, a Sousa Araújo Advocacia conduz cada caso de consultoria empresarial para PMEs com o Método SAA: S: Seleção do caminho correto, A: Arquitetura documental rigorosa e A: Acompanhamento transparente. Nosso compromisso é com a organização prévia, a clareza em cada etapa e o sigilo absoluto. Você sabe exatamente onde está o seu processo.',
  },
  parallaxImage: imgParallax,
  metodo: {
    title: 'Método SAA (Sousa Araújo Advocacia) Aplicado a Consultoria Empresarial para PMEs',
    steps: [
      { label: 'S: Seleção do Caminho Correto', desc: 'Diagnóstico jurídico da empresa: análise do contrato social, contratos com clientes e fornecedores, situação trabalhista, compliance e proteção de marca. Identificamos vulnerabilidades e oportunidades.' },
      { label: 'A: Arquitetura Documental', desc: 'Elaboração e revisão de contratos, adequação do contrato social, registro de marca no INPI, termos de uso e políticas de privacidade. Tudo sob medida para o porte e o segmento da empresa.' },
      { label: 'A: Acompanhamento Transparente', desc: 'Consultoria recorrente com retainer mensal, análise de novos contratos, suporte em negociações e acompanhamento de processos administrativos. Comunicação direta e resposta ágil.' },
    ],
    image: imgMetodo,
  },
  scenarios: {
    title: 'Você Se Reconhece em Algum Desses Cenários?',
    items: [
      'Sua empresa não tem contratos formais com clientes e fornecedores',
      'O contrato social está desatualizado ou não reflete a realidade da empresa',
      'Precisa registrar a marca da empresa no INPI',
      'Quer consultoria jurídica recorrente sem manter um departamento jurídico',
      'Tem sócios e precisa de acordo de sócios para prevenir conflitos',
      'Recebeu notificação ou auto de infração e não sabe como responder',
    ],
    ctaSubtitle: 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
    risksTitle: 'Os Principais Pontos de Atenção para PMEs',
    risks: [
      'Contratos genéricos ou inexistentes deixam a empresa vulnerável a disputas',
      'Contrato social desatualizado pode gerar responsabilidade pessoal dos sócios',
      'Marca não registrada pode ser usada por concorrentes legalmente',
      'Ausência de compliance expõe a empresa a autuações e multas',
    ],
    deepDives: [
      { title: 'Contratos empresariais: por que sua PME precisa deles', text: 'Contrato de prestação de serviço, NDA, termos de uso e acordo de sócios são essenciais. Na Consulta de Viabilidade, mapeamos as necessidades da sua empresa.' },
      { title: 'Registro de marca no INPI: proteja o nome da sua empresa', text: 'Sem registro, você não tem exclusividade sobre o nome ou logo. A Sousa Araújo Advocacia cuida de todo o processo: busca prévia, protocolo e acompanhamento.' },
      { title: 'Consultoria jurídica recorrente: o retainer mensal', text: 'PMEs que crescem precisam de suporte jurídico contínuo. O retainer mensal garante acesso prioritário, análise de contratos e orientação estratégica a custo previsível.' },
    ],
    stickyImage: imgSticky,
    stickyAlt: 'Empresários em reunião — consultoria empresarial em Brasília',
  },
  onlineBanner: 'Empresa que cresce sem suporte jurídico está construindo sobre risco.',
  passoAPasso: [
    { id: 1, number: '01', title: 'Consulta de Viabilidade', subtitle: 'Consulta de Viabilidade', description: 'Analisamos seu caso, definimos a melhor rota e apresentamos plano de ação com prazos e custos estimados.' },
    { id: 2, number: '02', title: 'Organização Documental', subtitle: 'Organização Documental', description: 'Elaboramos e revisamos contratos, adequamos o contrato social e organizamos toda a documentação necessária.' },
    { id: 3, number: '03', title: 'Protocolo e Acompanhamento', subtitle: 'Protocolo e Acompanhamento', description: 'Protocolamos registros, respondemos a notificações e acompanhamos processos administrativos com comunicação transparente.' },
    { id: 4, number: '04', title: 'Conclusão e Providências Finais', subtitle: 'Conclusão', description: 'Entregamos os documentos finalizados, orientamos sobre próximos passos e oferecemos retainer mensal para suporte contínuo.' },
  ],
  riscoBanner: 'O maior risco para uma PME não é a concorrência. É operar sem proteção jurídica.',
  objecoes: [
    { q: 'Quais contratos uma PME precisa ter?', a: 'No mínimo: contrato social atualizado, contrato de prestação de serviço, termos de uso (se atuar online), NDA para informações confidenciais e acordo de sócios (se aplicável).' },
    { q: 'Quanto custa a consultoria empresarial?', a: 'O custo varia conforme a demanda. Oferecemos consultoria por demanda (projeto específico) ou retainer mensal (acesso contínuo). O valor é informado na Consulta de Viabilidade.' },
    { q: 'Preciso registrar a marca se já uso há anos?', a: 'Sim. O registro no INPI é constitutivo — ou seja, quem registra primeiro tem o direito exclusivo, independentemente de quem usou antes. Proteja-se.' },
    { q: 'O que é um acordo de sócios?', a: 'Documento que define regras de convivência societária: entrada e saída de sócios, distribuição de lucros, tomada de decisões, cláusula de não concorrência e resolução de conflitos.' },
    { q: 'Minha empresa é MEI, preciso de advogado?', a: 'Sim. MEI também precisa de contratos, termos de uso e proteção de marca. À medida que cresce, as exigências jurídicas aumentam proporcionalmente.' },
    { q: 'Posso usar modelos de contrato da internet?', a: 'Não recomendamos. Contratos genéricos não cobrem as especificidades do seu negócio e podem ser invalidados judicialmente. Invista em contratos sob medida.' },
  ],
  costCta: {
    title: 'Quem protege a empresa com estratégia, cresce com segurança',
    bgImage: imgCtaBg,
  },
  whyTrust: {
    trustItems: [
      '14+ anos de experiência em consultoria empresarial',
      'Contratos sob medida para o porte e segmento da empresa',
      'Método SAA: Seleção, Arquitetura Documental e Acompanhamento',
      'Registro de marca no INPI com busca prévia e acompanhamento',
      'Retainer mensal com acesso prioritário e custo previsível',
      'Experiência com startups, PMEs e empresas familiares',
      'Sigilo e comunicação transparente como valores inegociáveis',
    ],
    consultaItems: [
      'Diagnóstico jurídico da empresa',
      'Mapeamento de contratos necessários',
      'Orientação sobre registro de marca',
      'Estimativa de prazos e custos',
      'Plano de ação claro com próximos passos',
    ],
    lidianeImage: imgLidiane,
  },
  historias: {
    title: 'Histórias Reais de Quem Já Passou por Isso',
    items: [
      { id: 1, img: imgArticle1, alt: 'Empresários em escritório', subtitle: 'PME sem contratos — 3 disputas simultâneas com clientes', body: 'Empresa de serviços em Brasília operava há 5 anos sem contratos formais. Quando 3 clientes contestaram cobranças ao mesmo tempo, não havia respaldo jurídico. A Sousa Araújo Advocacia resolveu as disputas e implantou pacote completo de contratos preventivos — prestação de serviço, termos de uso e NDA.' },
      { id: 2, img: imgArticle2, alt: 'Sócios em negociação', subtitle: 'Sócio queria sair da empresa — saída conduzida sem conflito', body: 'Um dos 3 sócios de uma startup em Brasília decidiu sair. Não havia previsão contratual para essa situação. A Sousa Araújo Advocacia mediou a negociação, elaborou o distrato societário e conduziu a alteração contratual na Junta Comercial, sem litígio.' },
      { id: 3, img: imgArticle3, alt: 'Marca em computador', subtitle: 'Marca usada há 7 anos — concorrente registrou primeiro', body: 'Empresa utilizava o nome comercial há 7 anos sem registro no INPI. Um concorrente registrou marca semelhante e enviou notificação para cessar o uso. A Sousa Araújo Advocacia contestou o registro e orientou o cliente sobre as medidas cabíveis para proteger a identidade da empresa.' },
    ],
  },
  faqItems: [
    { q: 'O que é consultoria jurídica preventiva?', a: 'É o trabalho de identificar e mitigar riscos jurídicos antes que se tornem problemas. Inclui revisão de contratos, adequação societária, compliance e orientação estratégica.' },
    { q: 'O retainer mensal substitui um departamento jurídico?', a: 'Para PMEs, sim. O retainer oferece acesso a advogado especializado com custo muito menor que um departamento jurídico interno, cobrindo as demandas mais comuns.' },
    { q: 'Quanto tempo demora para registrar uma marca no INPI?', a: 'O pedido é protocolado em dias. O deferimento completo leva de 6 a 18 meses, dependendo da complexidade e de eventuais oposições.' },
    { q: 'O que acontece se eu não tiver contrato social atualizado?', a: 'O contrato social desatualizado pode gerar responsabilidade pessoal dos sócios, dificultar operações bancárias e comprometer a participação em licitações.' },
    { q: 'Empresa individual precisa de acordo de sócios?', a: 'Não. Mas se houver dois ou mais sócios, o acordo é essencial para prevenir conflitos e definir regras claras de convivência societária.' },
    { q: 'A consultoria atende empresas de outros estados?', a: 'Sim. A consultoria empresarial pode ser conduzida 100% online, com atendimento para empresas de qualquer estado do Brasil.' },
  ],
};

export function PmesPage() {
  return <ServiceTemplate data={pmesData} panelId="lp-pmes" />;
}