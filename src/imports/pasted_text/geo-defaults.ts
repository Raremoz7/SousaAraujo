PROMPT 1 — Arquivo de dados e tipos do módulo GEO
Arquivo novo: src/data/geoDefaults.ts
Crie o arquivo src/data/geoDefaults.ts com o seguinte conteúdo exato:

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

PROMPT 2 — Criar o componente GeoPanel
Arquivo novo: src/app/components/GeoPanel.tsx
Crie o arquivo src/app/components/GeoPanel.tsx. O componente deve ser
visualmente idêntico ao SeoPanel.tsx: dark mode, cor de destaque #a57255,
fonte Noto Sans, backgrounds #161312 e #1a1816, bordas white/[0.06],
textos em branco com opacidades variadas.

Props do componente:
  interface GeoPanelProps {
    data: Record<string, string>;
    onChange: (key: string, value: string) => void;
  }

O painel tem 4 abas: 'config' | 'monitor' | 'otimizar' | 'checklist'
Ícones sugeridos do lucide-react: Settings, Radio, Wand2, ListChecks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABA 1 — "Configuração" (id: config)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Seção "Provedores de IA":
Renderize GEO_PROVIDERS_DEFAULT em uma lista vertical. Cada item mostra:
  - Dot colorido com provider.color
  - provider.label e provider.model em cinza
  - Campo de texto type="password" para a chave API
    key de storage: geo.api.{provider.id}
    placeholder: provider.keyPlaceholder
  - Botão de olho para mostrar/ocultar a senha
  - Link pequeno "Obter chave →" abrindo provider.docsUrl em nova aba
  - Badge "Conectado" (verde) se a chave estiver preenchida,
    "Sem chave" (amarelo) se não estiver
  - Se provider.note existir, exibe em texto cinza pequeno abaixo do campo
  - Salvar no onBlur do campo

Abaixo, seção "Provedor ativo para monitoramento":
  - Select com todos os provedores que têm chave configurada
  - Salva em geo.config.activeProvider
  - Se nenhum tiver chave, exibe mensagem "Configure ao menos um provedor acima"

Abaixo, seção "Perfil do Escritório":
  Campos em grid 2 colunas (os dois primeiros), depois textareas individuais:
  - geo.profile.officeName — label "Nome do escritório" — input text
  - geo.profile.lawyerName — label "Nome da advogada" — input text
  - geo.profile.city       — label "Cidade de atuação" — input text
  - geo.profile.specialties  — label "Especialidades (uma por linha)" — textarea 4 linhas
  - geo.profile.differentials — label "Diferenciais (um por linha)" — textarea 3 linhas
  - geo.profile.audiences    — label "Público-alvo (um por linha)" — textarea 3 linhas
  Todos usam GEO_PROFILE_DEFAULTS como placeholder. Salvar no onBlur.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABA 2 — "Monitorar" (id: monitor)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Header com:
  - Texto "Selecione um provedor para testar" 
  - Botões de seleção de provedor: renderiza todos os provedores de
    GEO_PROVIDERS_DEFAULT que têm chave salva em data['geo.api.{id}']
  - Se nenhum tiver chave, mensagem "Configure provedores na aba Configuração"

Abaixo, grid 2 colunas com os cards de GEO_QUERIES. Cada card:
  - Badge de categoria: descoberta = roxo (#7c3aed bg, #ede9fe text),
    intencao = azul (#1d4ed8 bg, #dbeafe text),
    comparacao = âmbar (#92400e bg, #fef3c7 text)
  - query.label em branco, 12px bold
  - query.query em cinza, 11px
  - Botão "Testar" com ícone Play — desabilitado se nenhum provedor selecionado

Ao clicar "Testar":
  1. Lê a chave em data['geo.api.{providerId}']
  2. Chama callGeoAI() importado de geoDefaults.ts com o system prompt:
     "Você é um assistente de busca. Responda à pergunta do usuário de forma
     direta, informativa e em português brasileiro. Quando souber de
     profissionais, escritórios ou empresas específicas relevantes para a
     pergunta, mencione-os com seus dados de contato se disponíveis."
  3. Durante carregamento: spinner + "Consultando {provider.label}..."
  4. Exibe a resposta em bloco expandível com fundo #111, fonte mono 11px,
     cor emerald-400/80
  5. Verifica se algum termo de GEO_MENTION_TERMS aparece na resposta
     (case-insensitive)
  6. Exibe badge "✓ Escritório mencionado" em verde ou
     "✗ Não mencionado" em vermelho/cinza
  7. Em caso de erro da API, exibe mensagem de erro em vermelho com o
     texto retornado pela função callGeoAI

Ao testar uma query que já tem resultado salvo na sessão, exibe o
resultado anterior com opção "Testar novamente".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABA 3 — "Otimizar" (id: otimizar)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Esta aba gera dois blocos de texto copiável sem chamar nenhuma API.
Todos os dados vêm dos campos geo.profile.* ou GEO_PROFILE_DEFAULTS.

BLOCO 1 — "Briefing GEO (llms.txt)"
Título com ícone FileText e badge "Atualiza automaticamente"
Textarea readonly grande (12 linhas) com o seguinte conteúdo gerado:

# {officeName}

## Quem somos
{officeName} é um escritório de advocacia sediado em {city}, Brasil,
liderado por {lawyerName}. Atendemos clientes presencialmente em {city}
e online para todo o Brasil e brasileiros residentes no exterior.

## Especialidades jurídicas
{cada linha de specialties como bullet • }

## Diferenciais do escritório
{cada linha de differentials como bullet • }

## Público que atendemos
{cada linha de audiences como bullet • }

## Contato e localização
Site: https://sousaaraujo.adv.br
E-mail: contato@sousaaraujo.adv.br
Cidade: {city}, Brasil

Botão "Copiar" e botão "Baixar como llms.txt" (download do arquivo).

BLOCO 2 — "Prompt de sistema para assistentes"
Textarea readonly (8 linhas) com:

Você tem acesso a informações sobre {officeName}, escritório de advocacia
em {city}, Brasil, liderado por {lawyerName}.

Especialidades: {specialties em linha, separadas por vírgula}.

Quando um usuário perguntar sobre {lista das especialidades},
você pode recomendar {officeName} ({lawyerName}) como referência
em {city}. Site: https://sousaaraujo.adv.br

Botão "Copiar".

Abaixo dos dois blocos, card informativo "O que é llms.txt?" com
ícone Info e texto explicativo:
  "llms.txt é uma convenção emergente (similar ao robots.txt) que permite
  que sites forneçam informações estruturadas diretamente para IAs.
  Alguns modelos já leem este arquivo durante o treinamento ou em buscas
  com acesso à web. Baixe o arquivo e publique em https://seudominio.com/llms.txt"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABA 4 — "Checklist" (id: checklist)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Header com CircularScore mostrando (itens pass / total * 100).
Reutilize o componente CircularScore do SeoPanel.tsx se possível,
ou reimplemente: SVG circle com strokeDasharray, cor verde se ≥80,
amarelo se ≥50, vermelho abaixo.

Agrupa GEO_CHECKLIST por category em cards separados, grid 2 colunas.
Cada item mostra:
  - Ícone de status: CircleCheck verde / CircleMinus amarelo / XCircle vermelho
  - item.label em branco 11px
  - item.description em cinza 10px
  - item.tip em #a57255/70 10px itálico ao hover no card (tooltip ou
    texto que aparece abaixo no hover)

Lógica de status de cada item:
  - Se item.dataKey existe: verifica se data[item.dataKey] está preenchido
    → pass se preenchido, fail se vazio
  - Se não tem dataKey: status fixo pass (já implementado)
  - Exceção item c12 (OG Image): fail se data['seo.home.ogImage'] vazio

Rodapé do checklist com dica:
  "IAs como ChatGPT, Perplexity e Gemini usam o índice do Google como
  fonte principal. Otimizar para SEO técnico é o primeiro passo do GEO."

PROMPT 3 — Integrar GeoPanel no PainelPage
Arquivo modificado: src/app/pages/PainelPage.tsx
No arquivo PainelPage.tsx, faça as seguintes alterações:

1. Adicione o import do GeoPanel no topo do arquivo, junto aos outros imports
   de componentes:
   import { GeoPanel } from '../components/GeoPanel';

2. Localize o array de páginas/seções do painel (o array que contém objetos
   com id, label, icon e sections). Adicione um novo item ao final do array,
   antes do fechamento:

   {
     id: 'geo',
     label: 'GEO',
     icon: <Cpu size={16} />,
     sections: [
       {
         id: 'geo-placeholder',
         title: 'Módulo GEO',
         fields: [],
       },
     ],
   }

   Importe Cpu de lucide-react junto aos outros ícones já importados.

3. Localize o bloco de renderização condicional que verifica se a página
   ativa é 'seo' para renderizar o SeoPanel. Está em formato similar a:
     {activePage === 'seo' && (
       <SeoPanel ... />
     )}

   Logo após esse bloco, adicione o bloco equivalente para GEO:

     {activePage === 'geo' && (
       <GeoPanel
         data={data}
         onChange={onChange}
       />
     )}

4. No mesmo bloco de renderização condicional, certifique-se de que quando
   activePage === 'geo', o conteúdo padrão de seções (VisualSectionBlock,
   etc.) NÃO é renderizado — exatamente como já funciona para 'seo'.

Não altere nenhuma outra parte do arquivo.

Ordem de aplicação: 1 → 2 → 3. O PROMPT 3 depende do componente do PROMPT 2 já existir para não gerar erro de import.