/**
 * Arquivo de Conteudo Central
 * WordPress Integration: sousa-araujo-content
 * 
 * Este arquivo centraliza todo o conteudo do site para facilitar:
 * - Exportacao para WordPress via WP React Plugin
 * - Traducao e multilingue
 * - Edicao de conteudo sem tocar no codigo
 * 
 * ═══════════════════════════════════════════════════════
 * GUIA DE MIGRACAO PARA WORDPRESS (WP React Plugin)
 * ═══════════════════════════════════════════════════════
 * 
 * 1. IMAGENS:
 *    - Imports `figma:asset/...` devem ser substituidos por URLs
 *      da WP Media Library (wp_get_attachment_url)
 *    - Usar ACF Image Field ou Featured Image para cada bloco
 *    - Exemplo: imgRectangle4 → get_field('hero_background')
 * 
 * 2. COMPONENTES → BLOCOS WP:
 *    Cada componente React mapeia para um Gutenberg Block:
 *    - Hero        → sousa-araujo/hero
 *    - About       → sousa-araujo/about
 *    - ServicesGrid → sousa-araujo/services-grid
 *    - Differentials → sousa-araujo/differentials
 *    - Stats       → sousa-araujo/stats
 *    - PracticeAreas → sousa-araujo/practice-areas
 *    - CtaBanner   → sousa-araujo/cta-banner
 *    - Videos      → sousa-araujo/videos
 *    - Blog        → sousa-araujo/blog (usa WP_Query)
 *    - Contact     → sousa-araujo/contact (CF7 ou Gravity Forms)
 *    - Footer      → sousa-araujo/footer (Widget Area)
 *    - Navbar      → sousa-araujo/navbar (wp_nav_menu)
 * 
 * 3. DADOS DINAMICOS:
 *    - Blog: substituir array estatico por fetch ao WP REST API
 *      GET /wp-json/wp/v2/posts?categories=artigos&per_page=3
 *    - Contact: integrar com Contact Form 7 shortcode ou
 *      Gravity Forms REST API
 *    - Footer nav: usar wp_nav_menu('footer-menu')
 * 
 * 4. FORMULARIO DE CONTATO:
 *    - Substituir handleSubmit simulado por integracoes reais:
 *      a) Contact Form 7: [contact-form-7 id="123"]
 *      b) Gravity Forms: AJAX submission via gform_submit
 *      c) WP REST API: POST /wp-json/contact/v1/send
 * 
 * 5. FONTES:
 *    - Marcellus, Roboto, Lora, Noto Sans: Google Fonts via
 *      wp_enqueue_style ou theme.json fontFamily
 *    - Allura (substituto de Signaturex Demo): Google Fonts
 * 
 * 6. ANIMACOES:
 *    - Motion (Framer Motion) funciona no WP React Plugin
 *    - Alternativa leve: usar CSS animations + IntersectionObserver
 * 
 * 7. CARROSSÉIS:
 *    - react-slick funciona no WP React Plugin
 *    - Alternativa WP-native: Swiper.js ou Splide
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
    // WP: get_field('hero_background') ou Featured Image
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
    // WP: get_field('about_image')
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
        color: 'accent' as const, // #a57255
      },
      {
        text: 'Mais de 14 anos de atuacao, checklist rigoroso em cada etapa e comunicacao clara do inicio ao fim. Voce nunca fica sem saber o que esta acontecendo.',
        color: 'white' as const,
      },
    ],
  },

  // Diferenciais
  differentials: {
    // WP: get_field('differentials_image')
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
    // WP: get_field('cta_background')
    backgroundImage: 'figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png',
  },

  // Videos
  videos: {
    title: 'Videos educativos: entenda antes de decidir',
    viewAllText: 'Ver todos os videos',
    viewAllHref: '#todos-videos',
    // WP: Custom Post Type 'video' com ACF fields
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
  // WP: GET /wp-json/wp/v2/posts?categories=artigos&per_page=3
  articles: {
    title: 'Quem se informa, se protege',
    viewAllLink: { text: 'Ver todos os artigos', href: '#todos-artigos' },
    items: [
      {
        id: 1,
        day: '01',
        month: 'Nov',
        category: 'Direito Imobiliario e Usucapiao',
        title: 'Imovel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento',
        href: '#artigo-1',
      },
      {
        id: 2,
        day: '01',
        month: 'Nov',
        category: 'Homologacao e Direito Internacional',
        title: 'Posso vender um imovel no Brasil com um divorcio pendente no exterior?',
        href: '#artigo-2',
      },
      {
        id: 3,
        day: '01',
        month: 'Nov',
        category: 'Direito de Familia',
        title: 'Uniao Estavel x Casamento: O que muda no seu patrimonio?',
        href: '#artigo-3',
      },
    ],
  },

  // Contato
  // WP: Contact Form 7 ou Gravity Forms
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
  // WP: Widget Area + wp_nav_menu + ACF Options Page
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
