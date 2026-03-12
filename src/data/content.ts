/**
 * Arquivo de Conteudo Central
 * 
 * Este arquivo centraliza todo o conteudo do site para facilitar:
 * - Edicao de conteudo sem tocar nos componentes
 * - Traducao e multilingue
 * - Rebuild rapido antes de re-upload ao WordPress
 * 
 * ═══════════════════════════════════════════════════════
 * INTEGRACAO COM WORDPRESS — CENARIO REAL
 * ═══════════════════════════════════════════════════════
 * 
 * Este projeto React NAO se converte automaticamente em blocos
 * editaveis do Gutenberg. A aplicacao e construida (build) e
 * embutida "fechada" dentro de uma pagina do WordPress usando
 * um dos plugins reais abaixo:
 * 
 * PLUGINS REAIS PARA EMBED:
 * 
 * 1. ReactPress (mais maduro)
 *    - Pega a pasta de build finalizada e encapsula dentro de
 *      uma pagina WP
 *    - Nao converte componentes em blocos editaveis
 *    - https://developer.wordpress.org/plugins/reactpress/
 * 
 * 2. Embed React Build
 *    - Le o asset-manifest.json gerado pelo build
 *    - Usa shortcode simples para carregar no front-end
 * 
 * 3. Embed React App
 *    - Upload manual dos arquivos finais (.js, .css)
 *    - Shortcode: [reactapp id="root" js="caminho.js" css="caminho.css"]
 * 
 * FLUXO DE TRABALHO:
 * 
 * 1. Editar conteudo neste arquivo (content.ts)
 * 2. Substituir imagens figma:asset por URLs reais (ver secao IMAGENS)
 * 3. Rodar `npm run build` para gerar a pasta dist/
 * 4. Fazer upload da pasta dist/ no WordPress via plugin escolhido
 * 5. Para atualizar conteudo: repetir passos 1-4
 * 
 * IMAGENS:
 * Os imports `figma:asset/...` sao um esquema virtual do Figma Make.
 * Antes do build para producao, substituir por:
 * - URLs absolutas de imagens hospedadas (ex: CDN, WP Media Library)
 * - Ou importar imagens locais da pasta /public ou /src/assets
 * 
 * FORMULARIO DE CONTATO:
 * O handleSubmit atual e simulado. Para producao, substituir por:
 * - Servico externo: Formspree, Getform, EmailJS
 * - API propria: endpoint POST no seu servidor
 * - Se usando Headless WP: WP REST API + plugin de email
 * 
 * ALTERNATIVA HEADLESS (mais flexivel):
 * Se quiser conteudo editavel pelo painel WP:
 * - WordPress como backend (CMS) via REST API
 * - Este React app como frontend (Next.js ou Vite)
 * - Buscar dados de content.ts via fetch ao WP REST API
 * - Requer mais infra mas da controle editorial total
 * ═══════════════════════════════════════════════════════
 */

export const siteContent = {
  // Informacoes Gerais do Site
  site: {
    name: 'Sousa Araujo Advocacia',
    tagline: 'Escritorio de advocacia em Brasilia com atuacao nacional e para brasileiros no exterior',
    description: 'A solucao mais inteligente comeca antes do processo',
    phone: '+55 61 99599-1322',
    email: 'contato@sousaaraujo.adv.br',
    address: {
      full: 'Edificio Varig - Setor Comercial Norte, quadra 04, bloco B, sala 702, 7 andar Petala D - Asa Norte, Brasilia - DF, 70714-020',
      short: 'Edificio Varig - Asa Norte, Brasilia - DF, 70714-020',
      street: 'SGAN 601 - Modulo H',
      neighborhood: 'Asa Norte',
      city: 'Brasilia',
      state: 'DF',
      zipCode: '70714-020',
    },
    businessHours: {
      weekdays: 'Segunda a Sexta: 9h as 18h',
      saturday: 'Sabado: 9h as 13h',
    },
    social: {
      facebook: '#',
      instagram: '#',
      linkedin: '#',
      tiktok: '#',
      youtube: '#',
    },
  },

  // Navegacao
  navigation: {
    menuItems: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'sobre', label: 'Sobre', href: '#quem-somos' },
      { id: 'areas', label: 'Areas de Atuacao', href: '#areas' },
      { id: 'blog', label: 'Blog', href: '#artigos' },
      { id: 'contato', label: 'Contato', href: '#contato' },
    ],
    ctaButton: {
      label: 'Agendar Atendimento',
      href: '#contato',
    },
  },

  // Hero Section
  hero: {
    backgroundImage: 'figma:asset/4fee0ccd87db6dd900796a349711620cb85c2755.png',
    subtitle: 'A solucao mais inteligente comeca antes do processo',
    title: 'Escritorio de advocacia em Brasilia com atuacao nacional e para brasileiros no exterior',
    signature: 'Lidiane Sousa Araujo',
  },

  // Estatisticas
  stats: [
    { number: '14+', label: 'Anos de Experiencia' },
    { number: '4', label: 'Areas de Atuacao Especializada' },
    { number: '30+', label: 'Paises Atendidos' },
    { number: '100%', label: 'Clientes Satisfeitos' },
  ],

  // Quem Somos
  about: {
    image: 'figma:asset/4fee0ccd87db6dd900796a349711620cb85c2755.png',
    title: 'Quem Somos',
    paragraphs: [
      'A <strong>Sousa Araujo Advocacia</strong> e fundada e conduzida pela <strong>Dra. Lidiane Sousa Araujo, OAB/DF 34.876</strong>, com inscricao ativa desde 2011. Sao mais de 14 anos de atuacao construidos com uma premissa que nao muda: a estrategia certa vem antes de qualquer protocolo — com diagnostico honesto, checklist rigoroso antes de cada etapa e prioridade absoluta a via extrajudicial quando ela existe.',
      'Na pratica, o cliente recebe relatorios periodicos, sabe exatamente em que fase esta o seu caso e conta com atendimento estruturado presencial em Brasilia ou 100% online. Quando o caso exige expertise complementar, atuamos em <strong>rede com advogados e especialistas</strong> selecionados, sempre com identificacao e supervisao direta. Sigilo e discricao sao inegociaveis.',
    ],
    link: {
      text: 'Saiba Mais',
      href: '#contato',
    },
    quotes: [
      {
        text: 'Desenvolvemos a estrategia juridica mais inteligente para cada situacao — extrajudicial sempre que possivel, judicial quando necessario',
        color: 'accent' as const,
      },
      {
        text: 'Mais de 14 anos de atuacao, checklist rigoroso em cada etapa e comunicacao clara do inicio ao fim. Voce nunca fica sem saber o que esta acontecendo.',
        color: 'white' as const,
      },
    ],
  },

  // Diferenciais
  differentials: {
    image: 'figma:asset/6daa36a69df9600539a5261e4be774bd12f5fa67.png',
    teamImage: 'figma:asset/b1f5c9d022e2869246b5bf9dee8631b24df008f4.png',
    title: 'O que torna o nosso trabalho diferente',
    description: 'Mais do que resolver casos, construimos estrategias. Cada detalhe do nosso processo foi pensado para entregar clareza, agilidade e tranquilidade para o cliente.',
    items: [
      {
        title: 'Estrategia antes da acao',
        description: 'Avaliamos cada caso com rigor antes de qualquer protocolo. Definimos o melhor caminho — extrajudicial sempre que possivel — para reduzir tempo, custo e desgaste.',
        link: { text: 'Conheca o Metodo', href: '#contato' },
      },
      {
        title: 'Atendimento online estruturado',
        description: 'Assinatura digital, reunioes remotas seguras e envio protegido de documentos. Atendemos todo o Brasil e brasileiros em qualquer parte do mundo sem perda de qualidade.',
        link: { text: 'Saiba como funciona', href: '#contato' },
      },
      {
        title: 'Transparencia em cada etapa',
        description: 'Voce recebe relatorios periodicos e sabe exatamente em que fase esta o seu processo. Sem surpresas, sem silencio, sem achismos.',
        link: { text: 'Veja como acompanhamos', href: '#contato' },
      },
      {
        title: 'Sigilo e discricao absolutos',
        description: 'Seus dados, documentos e informacoes sao tratados com o mais alto nivel de confidencialidade. Um valor inegociavel em todos os casos, sem excecao.',
        link: { text: 'Fale Conosco', href: '#contato' },
      },
    ],
    gallery: [
      { image: 'figma:asset/8f998da633bb92dcab13a208c71a97e2986d6c06.png', alt: 'Escritorio' },
      { image: 'figma:asset/a6246b350004d1d692b469864824af4843190e94.png', alt: 'Escritorio' },
      { image: 'figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png', alt: 'Escritorio' },
    ],
  },

  // CTA Banner
  ctaBanner: {
    title: 'Quem entende o processo, controla o resultado',
    buttonText: 'Agendar Consulta de Viabilidade',
    buttonHref: '#contato',
    backgroundImage: 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png',
  },

  // Videos
  videos: {
    title: 'Videos educativos: entenda antes de decidir',
    viewAllText: 'Ver todos os videos',
    viewAllHref: '#todos-videos',
    items: [
      {
        id: 1,
        title: 'O risco de nao homologar sua sentenca internacional: Imoveis e Heranca',
        description: 'Entenda quando uma decisao obtida no exterior precisa ser validada no Brasil para produzir efeitos — e como a falta de homologacao pode travar divorcio, guarda, pensao e ate questoes patrimoniais.',
      },
      {
        id: 2,
        title: 'Seu imovel nao tem escritura? Veja o que voce pode fazer',
        description: 'Imovel sem registro ou documentacao em dia nao pode ser vendido, financiado ou deixado em heranca com seguranca. Neste video mostramos os caminhos disponiveis — usucapiao extrajudicial no cartorio ou acao judicial — e como saber qual e o melhor para o seu caso.',
      },
      {
        id: 3,
        title: 'Conflitos familiares: quando um acordo bem feito evita um processo longo',
        description: 'Divorcio, guarda e inventario nao precisam virar batalha judicial. Neste video explicamos como acordos bem estruturados protegem todas as partes, reduzem custo, tempo e desgaste emocional — especialmente quando ha filhos envolvidos.',
      },
    ],
  },

  // Artigos / Blog
  articles: {
    title: 'Quem se informa, se protege',
    viewAllLink: { text: 'Ver todos os artigos', href: '/blog' },
    items: [
      {
        id: 1,
        day: '01',
        month: 'Nov',
        category: 'Direito Imobiliario e Usucapiao',
        title: 'Imovel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento',
        href: '/blog/imovel-sem-escritura-caminhos-regularizar-brasilia',
      },
      {
        id: 2,
        day: '01',
        month: 'Nov',
        category: 'Homologacao e Direito Internacional',
        title: 'Posso vender um imovel no Brasil com um divorcio pendente no exterior?',
        href: '/blog/posso-vender-imovel-brasil-divorcio-pendente-exterior',
      },
      {
        id: 3,
        day: '01',
        month: 'Nov',
        category: 'Direito de Familia',
        title: 'Uniao Estavel x Casamento: O que muda no seu patrimonio?',
        href: '/blog/uniao-estavel-x-casamento-diferencas-patrimonio',
      },
    ],
  },

  // Contato
  contact: {
    title: 'Fale Conosco\nAgende sua Consulta',
    address: 'Edificio Varig - Asa Norte, Brasilia - DF, 70714-020',
    phone: '+55 61 99599-1322',
    form: {
      fields: [
        { name: 'name', type: 'text', placeholder: 'Nome', required: true },
        { name: 'email', type: 'email', placeholder: 'E-mail', required: true },
        { name: 'message', type: 'textarea', placeholder: 'Mensagem', required: true },
      ],
      submitButton: 'Enviar Mensagem',
    },
  },

  // Footer
  footer: {
    description: 'Escritorio de advocacia especializada em Brasilia, fundado pela Dra. Lidiane Sousa Araujo, OAB/DF 34.876. Estrutura presencial no Distrito Federal e atendimento online para todo o Brasil e brasileiros no exterior, com apoio de uma rede de parceiros qualificados. Atuacao estrategica em Direito de Familia, Regularizacao de Imoveis, Homologacao de Sentenca Estrangeira e Consultoria Empresarial.',
    newsletter: {
      label: 'Receba nossos conteudos',
      buttonText: 'Inscrever-se',
    },
    contact: {
      title: 'Iniciar uma Conversa',
      email: 'contato@sousaaraujo.adv.br',
      phone: '+55 61 99599-1322',
    },
    location: {
      title: 'Nossa Localizacao',
      address: 'Edificio Varig - Setor Comercial Norte, quadra 04, bloco B, sala 702, 7 andar Petala D - Asa Norte, Brasilia - DF, 70714-020',
    },
    socialTitle: 'Redes Sociais',
    quickLinks: [
      { label: 'Home', href: '#home' },
      { label: 'Sobre', href: '#quem-somos' },
      { label: 'Areas de Atuacao', href: '#areas' },
      { label: 'Blog', href: '#artigos' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contato', href: '#contato' },
    ],
    ctaLink: {
      text: 'Agendar Atendimento',
      href: '#contato',
    },
    copyright: 'Termos de Uso  ·  Politica de Privacidade © 2026 SA | Sousa Araujo Advocacia · Todos os direitos reservados Comunicacao em conformidade com o Provimento OAB 205/2021 – Desenvolvido por Mix7',
  },
};

// Type definitions para TypeScript
export type SiteContent = typeof siteContent;