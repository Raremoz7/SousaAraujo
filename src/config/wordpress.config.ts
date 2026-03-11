/**
 * Configuração para WordPress com WP React Plugin
 * 
 * Este arquivo contém metadados e configurações que facilitam
 * a exportação e integração com WordPress
 */

export const wordpressConfig = {
  // Informações do Plugin
  plugin: {
    name: 'Sousa Araújo Advocacia React Components',
    version: '1.0.0',
    description: 'Componentes React do site Sousa Araújo Advocacia',
    author: 'Sousa Araújo Advocacia',
    textDomain: 'sousa-araujo',
  },

  // Mapeamento de Componentes para Blocos Gutenberg
  blocks: [
    {
      name: 'sousa-araujo/hero',
      title: 'Hero Section',
      category: 'sousa-araujo',
      icon: 'cover-image',
      description: 'Seção hero principal com imagem de fundo e texto',
      component: 'Hero',
      attributes: {
        backgroundImage: { type: 'string', default: '' },
        subtitle: { type: 'string', default: '' },
        title: { type: 'string', default: '' },
      },
    },
    {
      name: 'sousa-araujo/stats',
      title: 'Estatísticas',
      category: 'sousa-araujo',
      icon: 'chart-bar',
      description: 'Grid de estatísticas do escritório',
      component: 'Stats',
      attributes: {
        stats: { type: 'array', default: [] },
      },
    },
    {
      name: 'sousa-araujo/about',
      title: 'Quem Somos',
      category: 'sousa-araujo',
      icon: 'groups',
      description: 'Seção sobre o escritório',
      component: 'About',
      attributes: {
        image: { type: 'string', default: '' },
        title: { type: 'string', default: '' },
        content: { type: 'array', default: [] },
      },
    },
    {
      name: 'sousa-araujo/differentials',
      title: 'Diferenciais',
      category: 'sousa-araujo',
      icon: 'star-filled',
      description: 'Seção de diferenciais do escritório',
      component: 'Differentials',
      attributes: {
        items: { type: 'array', default: [] },
      },
    },
    {
      name: 'sousa-araujo/articles',
      title: 'Artigos',
      category: 'sousa-araujo',
      icon: 'media-text',
      description: 'Grid de artigos do blog',
      component: 'Articles',
      attributes: {
        articles: { type: 'array', default: [] },
      },
    },
    {
      name: 'sousa-araujo/contact',
      title: 'Formulário de Contato',
      category: 'sousa-araujo',
      icon: 'email',
      description: 'Formulário de contato com informações',
      component: 'Contact',
      attributes: {
        title: { type: 'string', default: '' },
        description: { type: 'string', default: '' },
      },
    },
  ],

  // Configuração de Widgets
  widgets: [
    {
      name: 'sousa-araujo-navbar',
      title: 'Navbar - Sousa Araújo',
      description: 'Menu de navegação principal',
      component: 'Navbar',
    },
    {
      name: 'sousa-araujo-footer',
      title: 'Footer - Sousa Araújo',
      description: 'Rodapé do site',
      component: 'Footer',
    },
  ],

  // Custom Post Types
  postTypes: [
    {
      name: 'artigo_juridico',
      labels: {
        singular: 'Artigo Jurídico',
        plural: 'Artigos Jurídicos',
      },
      supports: ['title', 'editor', 'thumbnail', 'excerpt'],
      taxonomies: ['categoria_juridica'],
      showInRest: true, // Para Gutenberg
    },
  ],

  // Taxonomies
  taxonomies: [
    {
      name: 'categoria_juridica',
      postType: 'artigo_juridico',
      labels: {
        singular: 'Categoria Jurídica',
        plural: 'Categorias Jurídicas',
      },
      hierarchical: true,
    },
  ],

  // Custom Fields (ACF ou similar)
  customFields: [
    {
      group: 'hero_settings',
      title: 'Configurações Hero',
      fields: [
        { name: 'hero_background_image', type: 'image', label: 'Imagem de Fundo' },
        { name: 'hero_subtitle', type: 'text', label: 'Subtítulo' },
        { name: 'hero_title', type: 'textarea', label: 'Título' },
      ],
    },
    {
      group: 'contact_info',
      title: 'Informações de Contato',
      fields: [
        { name: 'phone', type: 'text', label: 'Telefone' },
        { name: 'email', type: 'email', label: 'E-mail' },
        { name: 'address', type: 'textarea', label: 'Endereço' },
      ],
    },
  ],

  // REST API Endpoints
  restApi: {
    namespace: 'sousa-araujo/v1',
    endpoints: [
      {
        path: '/content',
        methods: 'GET',
        description: 'Retorna todo o conteúdo do site',
      },
      {
        path: '/contact',
        methods: 'POST',
        description: 'Envia formulário de contato',
      },
      {
        path: '/articles',
        methods: 'GET',
        description: 'Lista artigos jurídicos',
      },
    ],
  },

  // Enqueue Scripts e Styles
  enqueue: {
    styles: [
      {
        handle: 'sousa-araujo-fonts',
        src: 'fonts.css',
        deps: [],
      },
      {
        handle: 'sousa-araujo-theme',
        src: 'theme.css',
        deps: [],
      },
    ],
    scripts: [
      {
        handle: 'sousa-araujo-react',
        src: 'react-bundle.js',
        deps: ['wp-element', 'wp-components'],
        inFooter: true,
      },
    ],
  },

  // Theme Support
  themeSupport: [
    'custom-logo',
    'post-thumbnails',
    'html5',
    'title-tag',
    'custom-header',
    'custom-background',
  ],

  // Menu Locations
  menus: {
    'primary-menu': 'Menu Principal',
    'footer-menu': 'Menu Rodapé',
  },
};

export default wordpressConfig;
