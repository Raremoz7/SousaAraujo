Você está trabalhando no projeto Sousa Araújo Advocacia, uma React SPA com react-helmet-async@3.0.0 e Supabase KV store.

NÃO altere: App.tsx, Layout.tsx, PainelPage.tsx, usePanelContent.ts.

TAREFA: Corrigir a lacuna onde SeoHead.tsx usa usePanel('seo.home.title', '') com fallback vazio, fazendo com que o site vá ao ar sem description nem keywords se o admin nunca salvou no painel.

PASSO 1 — Adicionar ao final de src/data/panelDefaults.ts:

export interface SeoPageDefaults {
  title: string;
  description: string;
  keyword: string;
}

export const SEO_DEFAULTS: Record<string, SeoPageDefaults> = {
  home: {
    title: 'Sousa Araújo Advocacia | Escritório em Brasília com Atuação Nacional',
    description: 'Escritório de advocacia em Brasília especializado em direito de família, inventário, registro de marcas e imóveis. Atendimento humanizado e resultados comprovados.',
    keyword: 'advocacia brasília',
  },
  sobre: {
    title: 'Sobre o Escritório | Sousa Araújo Advocacia',
    description: 'Conheça a história, os valores e os advogados do escritório Sousa Araújo em Brasília. Mais de 10 anos de atuação com foco em resultados.',
    keyword: 'escritório advocacia brasília sobre',
  },
  areas: {
    title: 'Áreas de Atuação | Sousa Araújo Advocacia',
    description: 'Atuamos em direito de família, inventário, registro de marcas, imóveis e mais. Consulte nossas especialidades e agende uma consultoria.',
    keyword: 'áreas atuação advocacia',
  },
  blog: {
    title: 'Blog Jurídico | Sousa Araújo Advocacia',
    description: 'Artigos sobre direito de família, inventário, marcas e imóveis. Informação jurídica acessível para cidadãos e empresas.',
    keyword: 'blog jurídico advocacia',
  },
  faq: {
    title: 'Dúvidas Frequentes | Sousa Araújo Advocacia',
    description: 'Respostas para as principais dúvidas sobre divórcio, guarda, inventário, pensão e registro de marcas. Consulte nosso FAQ jurídico.',
    keyword: 'dúvidas frequentes advocacia',
  },
  contato: {
    title: 'Contato | Sousa Araújo Advocacia',
    description: 'Entre em contato com o escritório Sousa Araújo em Brasília. Atendimento por WhatsApp, e-mail ou presencialmente no SCS.',
    keyword: 'contato advocacia brasília',
  },
  parceiros: {
    title: 'Parceiros | Sousa Araújo Advocacia',
    description: 'Conheça os parceiros estratégicos do escritório Sousa Araújo. Rede de colaboração para oferecer o melhor atendimento jurídico.',
    keyword: 'parceiros advocacia',
  },
  videos: {
    title: 'Vídeos Jurídicos | Sousa Araújo Advocacia',
    description: 'Assista a vídeos educativos sobre direito de família, inventário e marcas produzidos pelos advogados do escritório Sousa Araújo.',
    keyword: 'vídeos jurídicos advocacia',
  },
  imoveis: {
    title: 'Direito Imobiliário | Sousa Araújo Advocacia',
    description: 'Assessoria jurídica em compra, venda, regularização e disputas de imóveis em Brasília e todo o Brasil.',
    keyword: 'direito imobiliário advocacia brasília',
  },
  homologacao: {
    title: 'Homologação de Divórcio Estrangeiro | Sousa Araújo',
    description: 'Serviço especializado em homologação de sentenças estrangeiras de divórcio no STJ. Atendimento ágil e seguro.',
    keyword: 'homologação divórcio estrangeiro STJ',
  },
  divorcio: {
    title: 'Divórcio | Sousa Araújo Advocacia',
    description: 'Assessoria completa em divórcio consensual e litigioso. Proteja seus direitos com apoio jurídico especializado em Brasília.',
    keyword: 'divórcio advocacia brasília',
  },
  guarda: {
    title: 'Guarda de Filhos | Sousa Araújo Advocacia',
    description: 'Orientação jurídica em guarda compartilhada, unilateral e regulamentação de visitas. Foco no melhor interesse da criança.',
    keyword: 'guarda filhos advocacia',
  },
  pensao: {
    title: 'Pensão Alimentícia | Sousa Araújo Advocacia',
    description: 'Ação de alimentos, revisão e execução de pensão alimentícia. Defenda seus direitos com suporte jurídico especializado.',
    keyword: 'pensão alimentícia advocacia',
  },
  inventario: {
    title: 'Inventário e Herança | Sousa Araújo Advocacia',
    description: 'Inventário judicial e extrajudicial, partilha de bens e planejamento sucessório. Agilize o processo com auxílio especializado.',
    keyword: 'inventário herança advocacia brasília',
  },
  uniao: {
    title: 'União Estável | Sousa Araújo Advocacia',
    description: 'Reconhecimento, dissolução e direitos na união estável. Assessoria jurídica completa para casais em Brasília.',
    keyword: 'união estável advocacia',
  },
  pmes: {
    title: 'Advocacia para PMEs | Sousa Araújo Advocacia',
    description: 'Soluções jurídicas para pequenas e médias empresas: contratos, trabalhista, societário e compliance. Parceiro jurídico do seu negócio.',
    keyword: 'advocacia empresas PME brasília',
  },
  inpi: {
    title: 'Registro de Marcas INPI | Sousa Araújo Advocacia',
    description: 'Registro e proteção de marcas junto ao INPI. Cuide do seu patrimônio intangível com especialistas em propriedade intelectual.',
    keyword: 'registro marcas INPI advocacia',
  },
};

PASSO 2 — Modificar src/app/components/SeoHead.tsx:

Adicionar o import no topo:
import { SEO_DEFAULTS } from '@/data/panelDefaults';

Dentro do componente, após resolver o seoId da rota, adicionar:
const pageDefaults = SEO_DEFAULTS[seoId] ?? {};

Substituir as três linhas de leitura de title, description e keyword por:
const title       = usePanel(`seo.${seoId}.title`,       pageDefaults.title       ?? '');
const description = usePanel(`seo.${seoId}.description`, pageDefaults.description ?? '');
const keyword     = usePanel(`seo.${seoId}.keyword`,     pageDefaults.keyword     ?? '');

Os demais campos (canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, twitterTitle, twitterDescription, robots) mantêm fallback '' pois não possuem default pré-definido.

VALIDAÇÃO ESPERADA:
- Com KV store vazio: title, description e keyword renderizam com os valores do SEO_DEFAULTS
- Após admin salvar no painel: valor do Supabase sobrescreve o default
- Nenhum outro comportamento do SeoHead deve mudar