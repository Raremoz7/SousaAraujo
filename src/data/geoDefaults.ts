/**
 * geoDefaults.ts — Dados e tipos do módulo GEO (Generative Engine Optimization)
 */

/* ─── Provedores de IA — extensível, sem limite de quantidade ─── */
export interface GeoProvider {
  id: string;
  label: string;
  model: string;
  color: string;
  docsUrl: string;
  keyPlaceholder: string;
  type: 'openai-compatible' | 'gemini' | 'anthropic' | 'custom';
  endpoint: string;
  note?: string;
}

export const GEO_PROVIDERS_DEFAULT: GeoProvider[] = [
  {
    id: 'openai',
    label: 'OpenAI',
    model: 'gpt-4o',
    color: '#10a37f',
    docsUrl: 'https://platform.openai.com/api-keys',
    keyPlaceholder: 'sk-...',
    type: 'openai-compatible',
    endpoint: 'https://api.openai.com/v1/chat/completions',
  },
  {
    id: 'gemini',
    label: 'Google Gemini',
    model: 'gemini-2.0-flash',
    color: '#4285f4',
    docsUrl: 'https://aistudio.google.com/app/apikey',
    keyPlaceholder: 'AIza...',
    type: 'gemini',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  },
  {
    id: 'anthropic',
    label: 'Anthropic Claude',
    model: 'claude-3-5-sonnet-20241022',
    color: '#cc785c',
    docsUrl: 'https://console.anthropic.com/settings/keys',
    keyPlaceholder: 'sk-ant-...',
    type: 'anthropic',
    endpoint: 'https://api.anthropic.com/v1/messages',
  },
  {
    id: 'mistral',
    label: 'Mistral AI',
    model: 'mistral-large-latest',
    color: '#ff7000',
    docsUrl: 'https://console.mistral.ai/api-keys',
    keyPlaceholder: '...',
    type: 'openai-compatible',
    endpoint: 'https://api.mistral.ai/v1/chat/completions',
  },
  {
    id: 'groq',
    label: 'Groq',
    model: 'llama-3.3-70b-versatile',
    color: '#f55036',
    docsUrl: 'https://console.groq.com/keys',
    keyPlaceholder: 'gsk_...',
    type: 'openai-compatible',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    note: 'Llama 3.3 70B via Groq',
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    model: 'llama-3.1-sonar-large-128k-online',
    color: '#20808d',
    docsUrl: 'https://www.perplexity.ai/settings/api',
    keyPlaceholder: 'pplx-...',
    type: 'openai-compatible',
    endpoint: 'https://api.perplexity.ai/chat/completions',
    note: 'Modelo com acesso à web em tempo real',
  },
  {
    id: 'cohere',
    label: 'Cohere',
    model: 'command-r-plus',
    color: '#39594d',
    docsUrl: 'https://dashboard.cohere.com/api-keys',
    keyPlaceholder: '...',
    type: 'openai-compatible',
    endpoint: 'https://api.cohere.ai/v1/chat',
  },
];

/* ─── Função central de chamada de IA — suporta todos os tipos ─── */
export async function callGeoAI(
  provider: GeoProvider,
  apiKey: string,
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  if (!apiKey.trim()) throw new Error('Chave de API não configurada.');

  if (provider.type === 'gemini') {
    const url = `${provider.endpoint}?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { maxOutputTokens: 600 },
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Erro ${res.status}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  if (provider.type === 'anthropic') {
    const res = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: provider.model,
        max_tokens: 600,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Erro ${res.status}`);
    }
    const data = await res.json();
    return data.content?.[0]?.text || '';
  }

  // openai-compatible (OpenAI, Mistral, Groq, Perplexity, Cohere, etc.)
  const res = await fetch(provider.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: provider.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 600,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Erro ${res.status}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

/* ─── Queries de monitoramento ─── */
export interface GeoQuery {
  id: string;
  label: string;
  query: string;
  category: 'descoberta' | 'comparacao' | 'intencao';
}

export const GEO_QUERIES: GeoQuery[] = [
  {
    id: 'q1',
    label: 'Advogado divórcio Brasília',
    query: 'Qual o melhor advogado de divórcio em Brasília?',
    category: 'descoberta',
  },
  {
    id: 'q2',
    label: 'Homologação sentença estrangeira',
    query: 'Como homologar uma sentença de divórcio do exterior no Brasil?',
    category: 'intencao',
  },
  {
    id: 'q3',
    label: 'Inventário Brasília',
    query: 'Quais escritórios de advocacia em Brasília são especializados em inventário e herança?',
    category: 'descoberta',
  },
  {
    id: 'q4',
    label: 'Registro de marca INPI',
    query: 'Como registrar uma marca no INPI? Preciso de advogado?',
    category: 'intencao',
  },
  {
    id: 'q5',
    label: 'Guarda compartilhada',
    query: 'Como funciona a guarda compartilhada no Brasil e quando é recomendada?',
    category: 'comparacao',
  },
  {
    id: 'q6',
    label: 'Advogado brasileiro no exterior',
    query: 'Preciso de advogado brasileiro morando no exterior, como encontrar?',
    category: 'intencao',
  },
  {
    id: 'q7',
    label: 'União estável vs casamento',
    query: 'Quais as diferenças jurídicas entre união estável e casamento no Brasil?',
    category: 'comparacao',
  },
  {
    id: 'q8',
    label: 'Pensão alimentícia',
    query: 'Como funciona a pensão alimentícia no Brasil? Quem tem direito?',
    category: 'intencao',
  },
];

/* ─── Checklist técnico GEO ─── */
export interface GeoCheckItem {
  id: string;
  category: string;
  label: string;
  description: string;
  tip: string;
  dataKey?: string;
}

export const GEO_CHECKLIST: GeoCheckItem[] = [
  {
    id: 'c1',
    category: 'Dados Estruturados',
    label: 'JSON-LD LegalService configurado',
    description: 'Schema.org com nome, endereço, telefone e áreas de atuação',
    tip: 'Configure na aba Schema.org do módulo SEO',
    dataKey: 'site.name',
  },
  {
    id: 'c2',
    category: 'Dados Estruturados',
    label: 'FAQ Page com perguntas reais',
    description: 'Mínimo 5 perguntas e respostas na página FAQ',
    tip: 'Edite as perguntas na seção FAQ do painel',
    dataKey: 'faq.item5.q',
  },
  {
    id: 'c3',
    category: 'Dados Estruturados',
    label: 'Article schema nos posts do blog',
    description: 'Cada artigo com author, datePublished e headline',
    tip: 'Já implementado via BlogArticlePage.tsx',
  },
  {
    id: 'c4',
    category: 'Autoridade',
    label: 'Nome da advogada mencionado consistentemente',
    description: '"Dra. Lidiane Sousa Araújo" aparece no About, Blog e rodapé',
    tip: 'IAs citam pessoas nomeadas com mais frequência que escritórios genéricos',
    dataKey: 'sobre.hero.name',
  },
  {
    id: 'c5',
    category: 'Autoridade',
    label: 'Especialidades explícitas no conteúdo',
    description: 'Cada área de atuação tem página dedicada com conteúdo próprio',
    tip: 'Já implementado — 17 páginas de serviço com conteúdo único',
  },
  {
    id: 'c6',
    category: 'Autoridade',
    label: 'Localização geográfica explícita em H1',
    description: '"Brasília" e "DF" aparecem em títulos das páginas principais',
    tip: 'IAs filtram por localização em buscas com intenção local',
    dataKey: 'home.hero.title',
  },
  {
    id: 'c7',
    category: 'Conteúdo para IA',
    label: 'Perguntas respondidas em linguagem natural',
    description: 'Blog responde perguntas completas, não só palavras-chave',
    tip: 'IAs preferem conteúdo que responde perguntas diretamente',
    dataKey: 'seo.blog.description',
  },
  {
    id: 'c8',
    category: 'Conteúdo para IA',
    label: 'Dados de contato acessíveis',
    description: 'Telefone, e-mail e endereço visíveis sem necessidade de navegação',
    tip: 'IAs incluem dados de contato nas respostas quando claramente disponíveis',
    dataKey: 'site.phone',
  },
  {
    id: 'c9',
    category: 'Rastreabilidade',
    label: 'sitemap.xml criado',
    description: 'Sitemap com todas as 20 URLs do site',
    tip: 'Já implementado em public/sitemap.xml',
  },
  {
    id: 'c10',
    category: 'Rastreabilidade',
    label: 'robots.txt sem bloqueios desnecessários',
    description: 'Apenas /painel bloqueado, todo o resto acessível',
    tip: 'Já implementado em public/robots.txt',
  },
  {
    id: 'c11',
    category: 'Rastreabilidade',
    label: 'hreflang pt-BR configurado',
    description: 'Tags de idioma/região no SeoHead para segmentação geográfica',
    tip: 'Já implementado no SeoHead.tsx',
  },
  {
    id: 'c12',
    category: 'Rastreabilidade',
    label: 'OG Image configurada',
    description: 'og-cover.jpg presente para compartilhamentos em redes sociais',
    tip: 'Crie og-cover.jpg (1200×630px) e coloque em /public',
  },
];

/* ─── Perfil padrão do escritório ─── */
export interface GeoProfile {
  officeName: string;
  lawyerName: string;
  city: string;
  specialties: string;
  differentials: string;
  audiences: string;
}

export const GEO_PROFILE_DEFAULTS: GeoProfile = {
  officeName: 'Sousa Araújo Advocacia',
  lawyerName: 'Dra. Lidiane Sousa Araújo',
  city: 'Brasília',
  specialties: [
    'Direito de Família',
    'Divórcio',
    'Guarda de Filhos',
    'Pensão Alimentícia',
    'Inventário e Sucessões',
    'União Estável',
    'Homologação de Sentença Estrangeira',
    'Registro de Marca INPI',
    'Direito Imobiliário',
    'Consultoria Empresarial para PMEs',
  ].join('\n'),
  differentials: [
    'Atendimento presencial em Brasília e online para todo o Brasil',
    'Especialista em brasileiros no exterior',
    'Mais de 10 anos de experiência',
    'Atendimento humanizado e personalizado',
  ].join('\n'),
  audiences: [
    'Brasileiros residentes no exterior',
    'Pessoas em processo de divórcio',
    'Empresas de pequeno e médio porte',
    'Famílias em processo de inventário',
  ].join('\n'),
};

/* ─── Termos para detectar menção do escritório nas respostas de IA ─── */
export const GEO_MENTION_TERMS = [
  'sousa araújo',
  'sousa araujo',
  'lidiane',
  'sousaaraujo.adv.br',
];