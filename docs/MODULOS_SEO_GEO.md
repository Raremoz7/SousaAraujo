# Documentacao Completa: Modulos SEO e GEO
## Painel Administrativo — Sousa Araujo Advocacia

> Referencia tecnica para reimplementacao em outro painel admin.
> Ultima atualizacao: 13/03/2026

---

## Sumario

1. [Visao Geral da Arquitetura](#1-visao-geral-da-arquitetura)
2. [Modulo SEO — SeoPanel.tsx](#2-modulo-seo)
3. [Modulo GEO — GeoPanel.tsx](#3-modulo-geo)
4. [SeoHead.tsx — Renderizacao no Frontend](#4-seohead)
5. [SiteSeoEditor.tsx — Editor de Dados Estruturados](#5-siteseoeditor)
6. [geoDefaults.ts — Dados e Configuracoes GEO](#6-geodefaults)
7. [Rotas do Servidor (Backend)](#7-rotas-do-servidor)
8. [Padrao de Dados (Chaves KV)](#8-padrao-de-dados)
9. [Integracao com o Painel Principal](#9-integracao-com-o-painel)
10. [Guia de Reimplementacao](#10-guia-de-reimplementacao)

---

## 1. Visao Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PAINEL ADMIN (/painel)                      │
│                                                                     │
│  ┌─────────────┐   ┌──────────────┐   ┌───────────────────────┐    │
│  │  SeoPanel    │   │  GeoPanel    │   │  PainelPage (host)    │    │
│  │  7 abas      │   │  4 abas      │   │  data + onChange      │    │
│  └──────┬───────┘   └──────┬───────┘   └───────────┬───────────┘    │
│         │                  │                       │                 │
│         └──────────┬───────┘                       │                 │
│                    ▼                               ▼                 │
│         ┌──────────────────┐            ┌──────────────────┐        │
│         │  Supabase KV     │            │  localStorage    │        │
│         │  (seo.*, geo.*,  │            │  (SEO history)   │        │
│         │   site.*)        │            │                  │        │
│         └────────┬─────────┘            └──────────────────┘        │
└──────────────────┼──────────────────────────────────────────────────┘
                   │
┌──────────────────┼──────────────────────────────────────────────────┐
│  FRONTEND PUBLICO (cada pagina)                                     │
│                  ▼                                                   │
│         ┌──────────────────┐                                        │
│         │  SeoHead.tsx     │ ← le seo.* e site.* via usePanelContent│
│         │  (react-helmet)  │                                        │
│         │  Injeta:         │                                        │
│         │  - <title>       │                                        │
│         │  - meta tags     │                                        │
│         │  - OG tags       │                                        │
│         │  - Twitter Card  │                                        │
│         │  - JSON-LD       │                                        │
│         │  - hreflang      │                                        │
│         └──────────────────┘                                        │
└─────────────────────────────────────────────────────────────────────┘
                   │
┌──────────────────┼──────────────────────────────────────────────────┐
│  SERVIDOR (Hono / Supabase Edge Functions)                          │
│                  ▼                                                   │
│  /panel          → GET/POST dados KV (seo.*, site.*, etc.)          │
│  /geo-history    → GET/POST/DELETE historico de monitoramento GEO    │
└─────────────────────────────────────────────────────────────────────┘
```

### Dependencias

| Pacote | Uso |
|--------|-----|
| `react-helmet-async` | Injecao de meta tags no `<head>` |
| `recharts` | Graficos de evolucao no GeoPanel |
| `lucide-react` | Icones em ambos os modulos |

### Design System

- **Font**: `Noto Sans` (body), `Marcellus` (titulos)
- **Accent**: `#a57255` (copper)
- **Background**: `#0e0d0c` (deep dark), `#1a1816` (cards), `#151311` (sidebar)
- **Score colors**: `#22c55e` (verde ≥80), `#eab308` (amarelo ≥50), `#ef4444` (vermelho <50)

---

## 2. Modulo SEO

### Arquivo: `/src/app/components/SeoPanel.tsx`

### Props

```typescript
interface SeoPanelProps {
  data: Record<string, string>;  // Todos os dados do painel (KV)
  onChange: (key: string, value: string) => void;  // Callback de edicao
}
```

### 7 Abas

| Aba | ID | Descricao |
|-----|----|-----------|
| Dashboard | `dashboard` | Score geral circular, grid 3 colunas com score por pagina, painel de issues |
| Meta Tags | `metatags` | Editor por pagina: title, description, keyword, canonical, robots, OG, Twitter Card |
| Analise | `analise` | Tabela de conteudo por pagina + legibilidade (client-side, sem API) |
| Checklist | `checklist` | Verificacoes tecnicas automaticas (26 items, 5 categorias) |
| Schema.org | `jsonld` | Gerador visual de JSON-LD: LocalBusiness, BreadcrumbList, FAQPage, custom |
| Analise IA | `ia` | Analise por IA (usa provedores do GEO) com sugestoes de title/description |
| Historico | `historico` | Timeline de alteracoes SEO salvas em localStorage |

---

### 2.1 Dashboard

**Score geral** = media aritmetica dos scores de todas as 17 paginas.

**Score por pagina** = media dos 6 checks:

```typescript
const checks = [
  analyzeTitleLength(title),       // 0-100 baseado em chars (ideal 50-60)
  analyzeDescriptionLength(desc),  // 0-100 baseado em chars (ideal 150-160)
  analyzeCanonical(canonical),     // 100 se HTTPS, 40 se vazio
  analyzeOgImage(ogImage),         // 100 se definida, 30 se vazia
  analyzeRobots(robots),           // 100 se indexavel, 50 se noindex
  analyzeKeywords(title, desc, keyword),  // 100 se em ambos, 15 se ausente
];
```

**Funcoes de analise**:

```typescript
// Title: 0 chars → fail(0), <30 → warning(40), 50-60 → pass(100), >70 → fail(30)
function analyzeTitleLength(title: string): SeoCheckResult

// Description: 0 → fail(0), <70 → warning(35), 120-160 → pass(100), >200 → fail(25)
function analyzeDescriptionLength(desc: string): SeoCheckResult

// Canonical: vazio → warning(40), https → pass(100), sem https → warning(60)
function analyzeCanonical(url: string): SeoCheckResult

// OG Image: vazio → warning(30), presente → pass(100)
function analyzeOgImage(url: string): SeoCheckResult

// Robots: index,follow → pass(100), noindex → warning(50)
function analyzeRobots(robots: string): SeoCheckResult

// Keywords: em titulo+desc → pass(100), so titulo → warning(65), ausente → fail(15)
function analyzeKeywords(title, desc, keyword): SeoCheckResult
```

**Quick Stats** (cards horizontais):
- Paginas analisadas: 17
- Meta tags preenchidas: X/17
- Erros criticos: N
- Avisos otimizaveis: N

**Issues Panel**: Lista ordenada (erros primeiro) com botao "Copiar" que gera relatorio formatado em texto plano.

---

### 2.2 Meta Tags Editor

**Campos editaveis por pagina** (17 paginas):

| Campo | Chave KV | Tipo | Validacao |
|-------|----------|------|-----------|
| Title | `seo.{pageId}.title` | text | 50-60 chars ideal, barra de progresso |
| Description | `seo.{pageId}.description` | textarea | 150-160 chars ideal |
| Keyword | `seo.{pageId}.keyword` | text | Presenca no title/desc |
| Canonical | `seo.{pageId}.canonical` | text | HTTPS check |
| Robots | `seo.{pageId}.robots` | select | index/noindex + follow/nofollow |
| OG Title | `seo.{pageId}.ogTitle` | text | Fallback: title |
| OG Description | `seo.{pageId}.ogDescription` | textarea | Fallback: description |
| OG Image | `seo.{pageId}.ogImage` | text | URL da imagem 1200x630 |
| OG Type | `seo.{pageId}.ogType` | text | Default: "website" |
| Twitter Card | `seo.{pageId}.twitterCard` | select | summary / summary_large_image |
| Twitter Title | `seo.{pageId}.twitterTitle` | text | Fallback: OG Title |
| Twitter Desc | `seo.{pageId}.twitterDescription` | text | Fallback: OG Description |

**Previews (lado direito, sticky)**:
1. **Google SERP Preview** — simula resultado de busca com truncamento real, metricas title/desc/keyword
2. **Social Preview (OG)** — simula card Facebook/LinkedIn/WhatsApp
3. **Diagnostico** — 6 checks com icone pass/warning/fail e score individual

**Page Selector**: Dropdown custom com mini-score circular e status dots para cada check.

---

### 2.3 Analise de Conteudo

Tabela automatica que analisa conteudo dos campos do painel:

| Metrica | Como calcula |
|---------|-------------|
| Conteudo (chars) | Soma todos os campos text do prefix da pagina |
| Imagens | Conta campos com "image/img/photo" no nome |
| Keyword count | RegExp da keyword no conteudo agregado |
| H1 presente | Algum campo "title/heading" com >10 chars |

**Legibilidade** (analyzeReadability):
- Media de palavras por frase (ideal <20)
- Media de chars por palavra
- Tempo estimado de leitura
- Frases longas (>25 palavras)
- Score 0-100 com nivel facil/medio/dificil
- Checks detalhados por pagina (colapsavel)

---

### 2.4 Checklist Tecnico

26 verificacoes automaticas em 5 categorias:

| Categoria | Exemplos de checks |
|-----------|--------------------|
| Meta Tags | Title preenchido, description presente, canonicals definidas |
| Indexacao | Robots sem noindex indevido, sitemap.xml presente |
| Open Graph | OG Image definida, OG tags em todas as paginas |
| Performance | HTTPS ativo, URLs amigaveis |
| Dados Estruturados | JSON-LD LegalService, FAQPage, BreadcrumbList |

Cada check retorna `pass`, `warning` ou `fail` com detalhe descritivo.

---

### 2.5 Schema.org (JSON-LD)

**Componente `SiteSeoEditor`** (inline na aba): edita campos `site.*` que alimentam o JSON-LD.

**3 schemas gerados automaticamente**:

#### LocalBusiness / LegalService
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "site.name",
  "description": "seo.home.description",
  "url": "https://sousaaraujo.adv.br",
  "telephone": "site.phone",
  "email": "site.email",
  "address": { "@type": "PostalAddress", "..." },
  "openingHoursSpecification": [ "..." ],
  "sameAs": ["site.social.*"]
}
```

#### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [ { "position": 1, "name": "Home" }, ... ]
}
```

#### FAQPage
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [ { "@type": "Question", "name": "faq.item1.q", "acceptedAnswer": {...} } ]
}
```

Botao "Copiar" para cada schema (copia com `<script type="application/ld+json">`).

Campo textarea para **JSON-LD customizado** (chave `seo.global.jsonld.custom`).

---

### 2.6 Analise IA

Usa os provedores de IA configurados no modulo GEO (chaves `geo.api.*`).

**Analise individual**: Envia title, description, keyword e canonical para a IA e recebe JSON estruturado:

```typescript
interface IaAnalysisResult {
  score: number;          // 0-100
  resumo: string;         // frase avaliativa
  title: { avaliacao, detalhe, sugestao };
  description: { avaliacao, detalhe, sugestao };
  keyword: { avaliacao, detalhe };
  prioridade: "title" | "description" | "keyword" | "nenhuma";
  quick_wins: string[];   // 3 acoes rapidas
}
```

**Analise em lote**: Roda todas as 17 paginas sequencialmente com barra de progresso.

Botao "Aplicar sugestao" em cada campo para copiar a sugestao da IA direto para o campo SEO.

---

### 2.7 Historico SEO

**Armazenamento**: `localStorage` (chave `seo_history_v1`, max 30 entradas).

**Estrutura de cada entrada**:
```typescript
interface SeoHistoryEntry {
  timestamp: number;
  label: string;          // ex: "Salvar manual"
  changes: Array<{ key: string; from: string; to: string }>;
  snapshot: Record<string, string>;  // todas as chaves seo.* naquele momento
}
```

**Funcao exportada** (usada pelo PainelPage ao salvar):
```typescript
export function saveSeoHistoryEntry(
  previousData: Record<string, string>,
  newData: Record<string, string>,
  label: string
): void
```

**Features do historico**:
- Timeline visual com diff de cada alteracao
- Botao "Restaurar" para voltar a qualquer snapshot
- Confirmacao antes de restaurar

---

## 3. Modulo GEO

### Arquivo: `/src/app/components/GeoPanel.tsx`

### Props

```typescript
interface GeoPanelProps {
  data: Record<string, string>;
  onChange: (key: string, value: string) => void;
  getToken?: () => Promise<string | null>;  // Token de auth para rotas protegidas
}
```

### 4 Abas

| Aba | ID | Descricao |
|-----|----|-----------|
| Configuracao | `config` | Chaves de API dos provedores de IA + perfil do escritorio |
| Monitorar | `monitor` | Executa queries nas IAs e verifica se o escritorio e mencionado |
| Otimizar | `otimizar` | Gera `llms.txt` e system prompt otimizado |
| Checklist | `checklist` | Checklist tecnico GEO com scoring |

---

### 3.1 Configuracao

**Provedores de IA** (7 pre-configurados):

| ID | Label | Modelo | Tipo |
|----|-------|--------|------|
| `openai` | OpenAI | gpt-4o | openai-compatible |
| `gemini` | Google Gemini | gemini-2.0-flash | gemini |
| `anthropic` | Anthropic Claude | claude-3-5-sonnet-20241022 | anthropic |
| `mistral` | Mistral AI | mistral-large-latest | openai-compatible |
| `groq` | Groq | llama-3.3-70b-versatile | openai-compatible |
| `perplexity` | Perplexity | llama-3.1-sonar-large-128k-online | openai-compatible |
| `cohere` | Cohere | command-r-plus | openai-compatible |

**Chaves KV**:
- `geo.api.{providerId}` — API key de cada provedor
- `geo.config.activeProvider` — provedor ativo selecionado

**Perfil do escritorio** (editavel, com defaults):
- `geo.profile.officeName` — Nome do escritorio
- `geo.profile.lawyerName` — Nome da advogada
- `geo.profile.city` — Cidade
- `geo.profile.specialties` — Especialidades (textarea, uma por linha)
- `geo.profile.differentials` — Diferenciais
- `geo.profile.audiences` — Publico-alvo

---

### 3.2 Monitorar

**8 queries pre-configuradas** em 3 categorias:

| Categoria | Cor | Exemplo |
|-----------|-----|---------|
| Descoberta | `#7c3aed` | "Qual o melhor advogado de divorcio em Brasilia?" |
| Intencao | `#1d4ed8` | "Como homologar uma sentenca de divorcio do exterior?" |
| Comparacao | `#92400e` | "Diferencas entre uniao estavel e casamento?" |

**Fluxo de execucao**:
1. Usuario seleciona provedor ou usa o ativo
2. Clica "Testar" em uma query individual OU "Testar Todos"
3. Sistema chama `callGeoAI()` com system prompt + query do usuario
4. Resposta analisada: `GEO_MENTION_TERMS` buscados na resposta (case-insensitive)
5. Resultado salvo no historico (Supabase KV via rota `/geo-history`)

**Termos de mencao** (detecta se o escritorio foi mencionado):
```typescript
const GEO_MENTION_TERMS = [
  'sousa araujo', 'sousa araújo', 'lidiane', 'sousaaraujo.adv.br'
];
```

**"Testar Todos"**: Execucao sequencial com delay de 800ms entre requests, barra de progresso, botao cancelar.

**Historico de monitoramento**:
- Persistido no Supabase (KV key: `sa-geo-history`, max 200 entradas)
- Timeline visual agrupada por data
- Filtros: provedor, query, status de mencao (mencionado/nao mencionado/erro)
- Grafico de evolucao (AreaChart do recharts): taxa de mencao por data
- Export CSV

---

### 3.3 Otimizar

**Gera 2 artefatos automaticamente** a partir do perfil:

#### llms.txt
```
# Sousa Araujo Advocacia

## Quem somos
[...texto gerado a partir do perfil...]

## Especialidades juridicas
  - Direito de Familia
  - Divorcio
  [...]

## Contato e localizacao
Site: https://sousaaraujo.adv.br
```

Botao "Baixar llms.txt" e "Copiar".

#### System Prompt otimizado
Prompt para IAs citarem o escritorio:
```
Voce tem acesso a informacoes sobre Sousa Araujo Advocacia, escritorio
de advocacia em Brasilia, Brasil, liderado por Dra. Lidiane Sousa Araujo.
Especialidades: [...]. Quando um usuario perguntar sobre [...],
voce pode recomendar [...]
```

Botao "Copiar prompt".

---

### 3.4 Checklist GEO

**12 verificacoes** em 4 categorias:

| Categoria | Checks |
|-----------|--------|
| Dados Estruturados | JSON-LD LegalService, FAQ Page, Article schema |
| Autoridade | Nome da advogada consistente, especialidades explicitas, localizacao no H1 |
| Conteudo para IA | Perguntas em linguagem natural, dados de contato acessiveis |
| Rastreabilidade | sitemap.xml, robots.txt, hreflang, OG Image |

**Scoring**: `passed / total * 100` com CircularScore visual.

Cada check valida uma chave KV especifica:
```typescript
{ id: 'c1', dataKey: 'site.name', ... }     // pass se tem valor
{ id: 'c12', special: 'seo.home.ogImage' }  // validacao especial
{ id: 'c3', dataKey: undefined }             // sempre pass (hardcoded no codigo)
```

---

## 4. SeoHead

### Arquivo: `/src/app/components/SeoHead.tsx`

Componente renderizado dentro do `Layout` em TODA pagina publica. Usa `react-helmet-async` para injetar tags no `<head>`.

### Mapeamento de rotas

```typescript
const ROUTE_TO_SEO_ID: Record<string, string> = {
  '/': 'home',
  '/sobre': 'sobre',
  '/areas-de-atuacao': 'areas',
  // ... 17 rotas mapeadas
};
```

### Tags injetadas

| Tag | Fonte | Fallback |
|-----|-------|----------|
| `<title>` | `seo.{id}.title` | `site.name` |
| `<meta name="description">` | `seo.{id}.description` | — |
| `<meta name="keywords">` | `seo.{id}.keyword` | — |
| `<meta name="robots">` | `seo.{id}.robots` | `index, follow, max-snippet:-1, ...` |
| `<link rel="canonical">` | `seo.{id}.canonical` | URL atual |
| `<meta property="og:title">` | `seo.{id}.ogTitle` | title |
| `<meta property="og:description">` | `seo.{id}.ogDescription` | description |
| `<meta property="og:image">` | `seo.{id}.ogImage` | — |
| `<meta property="og:type">` | `seo.{id}.ogType` | "website" |
| `<meta property="og:locale">` | hardcoded | "pt_BR" |
| `<meta name="twitter:card">` | `seo.{id}.twitterCard` | "summary_large_image" |
| `<link rel="alternate" hreflang>` | hardcoded | "pt-BR" + "x-default" |

### JSON-LD injetado

| Schema | Condicao | Dados |
|--------|----------|-------|
| LegalService | Somente homepage (`/`) | `site.*` (name, phone, email, address, social, hours) |
| BreadcrumbList | Todas exceto homepage | Home + pagina atual |
| FAQPage | Somente `/faq` | `faq.item{1-12}.q` e `.a` |
| Custom | Se `seo.global.jsonld.custom` tiver JSON valido | Conteudo do campo |

### Como le os dados

```typescript
// Hook reativo — rerenderiza quando o cache muda
const title = usePanel(`seo.${seoId}.title`, defaultValue);

// Leitura nao-reativa (para dados estruturados em useMemo)
const q = readPanel(`faq.item1.q`, '');
```

---

## 5. SiteSeoEditor

### Arquivo: `/src/app/components/SiteSeoEditor.tsx`

Editor visual para campos `site.*` que alimentam o JSON-LD LocalBusiness. Renderizado dentro da aba Schema.org do SeoPanel.

**3 grupos de campos**:

| Grupo | Campos |
|-------|--------|
| Dados do Escritorio | `site.name`, `site.phone`, `site.email` |
| Endereco | `site.address.street`, `site.address.city`, `site.address.state`, `site.address.zipCode` |
| Redes Sociais | `site.social.instagram`, `.facebook`, `.linkedin`, `.youtube` |

- Estado local para edicao fluida
- Sync bidirecional com dados externos
- Salva no `onBlur` de cada campo
- Tracking de campos dirty

---

## 6. geoDefaults

### Arquivo: `/src/data/geoDefaults.ts`

Arquivo central de dados e tipos do modulo GEO. Exporta:

### Tipos
```typescript
interface GeoProvider { id, label, model, color, docsUrl, keyPlaceholder, type, endpoint, note? }
interface GeoQuery { id, label, query, category }
interface GeoCheckItem { id, category, label, description, tip, dataKey? }
interface GeoProfile { officeName, lawyerName, city, specialties, differentials, audiences }
```

### Funcao de chamada universal
```typescript
export async function callGeoAI(
  provider: GeoProvider,
  apiKey: string,
  systemPrompt: string,
  userMessage: string
): Promise<string>
```

Suporta 3 tipos de API:
- **gemini**: `POST /v1beta/models/{model}:generateContent?key={apiKey}`
- **anthropic**: `POST /v1/messages` com headers `x-api-key` e `anthropic-version`
- **openai-compatible**: `POST /v1/chat/completions` com `Authorization: Bearer`

Todas usam `max_tokens: 600`.

### Constantes exportadas
- `GEO_PROVIDERS_DEFAULT` — Array de 7 provedores
- `GEO_QUERIES` — Array de 8 queries de monitoramento
- `GEO_CHECKLIST` — Array de 12 items do checklist
- `GEO_PROFILE_DEFAULTS` — Objeto com valores default do perfil
- `GEO_MENTION_TERMS` — Array de 4 termos de deteccao de mencao

---

## 7. Rotas do Servidor

### Arquivo: `/supabase/functions/server/index.tsx`

#### GET `/geo-history`
- **Auth**: Publica (anonKey)
- **Retorno**: `{ entries: HistoryEntry[] }`
- **KV Key**: `sa-geo-history`

#### POST `/geo-history`
- **Auth**: Requer token de usuario (header `X-User-Token`)
- **Body**: `{ entries: HistoryEntry[] }`
- **Logica**: Append + cap em 200 entradas
- **Retorno**: `{ success: true, total: number }`

#### DELETE `/geo-history`
- **Auth**: Requer token de usuario
- **Logica**: Reseta para `[]`
- **Retorno**: `{ success: true }`

### Autenticacao

```typescript
// Headers esperados:
'Authorization': `Bearer ${publicAnonKey}`   // sempre
'X-User-Token': token                        // em rotas protegidas (POST/DELETE)

// Validacao no servidor:
const { data: { user } } = await supabase.auth.getUser(token);
if (!user?.id) return 401;
```

---

## 8. Padrao de Dados (Chaves KV)

### SEO (prefixo `seo.`)

```
seo.{pageId}.title
seo.{pageId}.description
seo.{pageId}.keyword
seo.{pageId}.canonical
seo.{pageId}.robots
seo.{pageId}.ogTitle
seo.{pageId}.ogDescription
seo.{pageId}.ogImage
seo.{pageId}.ogType
seo.{pageId}.twitterCard
seo.{pageId}.twitterTitle
seo.{pageId}.twitterDescription
seo.global.jsonld.custom
```

**pageIds**: `home`, `sobre`, `areas`, `blog`, `faq`, `contato`, `parceiros`, `videos`, `imoveis`, `homologacao`, `divorcio`, `guarda`, `pensao`, `inventario`, `uniao`, `pmes`, `inpi`

### GEO (prefixo `geo.`)

```
geo.api.openai
geo.api.gemini
geo.api.anthropic
geo.api.mistral
geo.api.groq
geo.api.perplexity
geo.api.cohere
geo.config.activeProvider
geo.profile.officeName
geo.profile.lawyerName
geo.profile.city
geo.profile.specialties
geo.profile.differentials
geo.profile.audiences
```

### Site (prefixo `site.`)

```
site.name
site.tagline
site.description
site.phone
site.email
site.address.full
site.address.short
site.address.street
site.address.neighborhood
site.address.city
site.address.state
site.address.zipCode
site.hours.weekdays
site.hours.saturday
site.social.instagram
site.social.facebook
site.social.linkedin
site.social.tiktok
site.social.youtube
```

### Historico GEO (KV separado)

```
sa-geo-history → HistoryEntry[]  (max 200)
```

---

## 9. Integracao com o Painel

### Como o PainelPage.tsx integra os modulos

```typescript
// No PAGES config:
{ id: 'seo', label: 'SEO', icon: <SearchCheck />, sections: [...] }
{ id: 'geo', label: 'GEO', icon: <Cpu />, sections: [...] }

// Na renderizacao do conteudo principal:
{activePage === 'seo' && (
  <SeoPanel data={data} onChange={handleFieldChange} />
)}

{activePage === 'geo' && (
  <GeoPanel
    data={data}
    onChange={handleFieldChange}
    getToken={async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || null;
    }}
  />
)}
```

### Funcao `handleFieldChange`
```typescript
const handleFieldChange = (key: string, value: string) => {
  setData(prev => ({ ...prev, [key]: value }));
  setDirtyKeys(prev => new Set(prev).add(key));
};
```

Os dados so sao persistidos no Supabase quando o usuario clica "Salvar".

### Badge de issues no sidebar
```typescript
import { countAuditIssues } from './AuditPanel';
const auditBadgeCount = countAuditIssues(data);
// Renderizado como badge vermelho no item "Auditoria" da sidebar
```

---

## 10. Guia de Reimplementacao

### Passo a passo para portar para outro painel

#### 1. Copiar arquivos core

```
src/app/components/SeoPanel.tsx       → modulo SEO completo
src/app/components/GeoPanel.tsx       → modulo GEO completo
src/app/components/SeoHead.tsx        → injecao frontend
src/app/components/SiteSeoEditor.tsx  → editor site.*
src/data/geoDefaults.ts              → configs GEO
```

#### 2. Adaptar dados

Substituir:
- `SEO_PAGES` — lista de paginas do seu site
- `ROUTE_TO_SEO_ID` — mapeamento rota → ID
- `GEO_PROFILE_DEFAULTS` — dados do seu escritorio/empresa
- `GEO_QUERIES` — queries de monitoramento relevantes ao seu nicho
- `GEO_MENTION_TERMS` — termos que identificam sua marca
- `SEO_DEFAULTS` em `panelDefaults.ts` — defaults de title/description/keyword

#### 3. Adaptar storage

O sistema usa 3 camadas de storage:
- **Supabase KV** (principal): `seo.*`, `geo.*`, `site.*`
- **Supabase KV** (historico GEO): `sa-geo-history`
- **localStorage** (historico SEO): `seo_history_v1`

Para outro backend: implementar interface `{ get, set }` equivalente.

#### 4. Adaptar rotas do servidor

Minimo necessario:
```
GET  /panel          → retorna todos os pares KV
POST /panel          → salva pares KV
GET  /geo-history    → retorna array de entradas
POST /geo-history    → append entradas
DELETE /geo-history  → limpar historico
```

#### 5. Instalar dependencias

```bash
npm install react-helmet-async recharts lucide-react
```

#### 6. Integrar no Layout

```tsx
import { SeoHead } from './components/SeoHead';
import { HelmetProvider } from 'react-helmet-async';

// Wrap app em <HelmetProvider>
// Adicionar <SeoHead /> dentro do Layout (antes do <Outlet />)
```

#### 7. Adaptar estilo

Todas as classes usam Tailwind inline. Para mudar o tema:
- Buscar `#a57255` → sua cor accent
- Buscar `#1a1816` → seu bg de card
- Buscar `Noto_Sans` → sua font body
- Buscar `Marcellus` → sua font headings

#### 8. Pontos de atencao

- A aba "Analise IA" do SEO **reusa os provedores do GEO** (chaves `geo.api.*`). Se voce nao implementar o GEO, precisa fornecer as API keys de outra forma.
- O `SeoHead` usa `usePanelContent` hook customizado. Adapte para seu sistema de state management.
- O `callGeoAI` faz chamadas diretas do browser para as APIs de IA (CORS pode ser um problema com Anthropic — eles exigem header `anthropic-dangerous-direct-browser-access`). Em producao, considere proxy pelo seu backend.
- O historico SEO em localStorage nao sincroniza entre dispositivos. Para multi-usuario, migre para backend.

---

## Resumo de Exports

| Arquivo | Export | Tipo |
|---------|--------|------|
| `SeoPanel.tsx` | `SeoPanel` | Component |
| `SeoPanel.tsx` | `saveSeoHistoryEntry` | Function |
| `GeoPanel.tsx` | `GeoPanel` | Component |
| `SeoHead.tsx` | `SeoHead` | Component |
| `SiteSeoEditor.tsx` | `SiteSeoEditor` | Component |
| `geoDefaults.ts` | `GEO_PROVIDERS_DEFAULT` | Constant |
| `geoDefaults.ts` | `GEO_QUERIES` | Constant |
| `geoDefaults.ts` | `GEO_CHECKLIST` | Constant |
| `geoDefaults.ts` | `GEO_PROFILE_DEFAULTS` | Constant |
| `geoDefaults.ts` | `GEO_MENTION_TERMS` | Constant |
| `geoDefaults.ts` | `callGeoAI` | Function |
| `geoDefaults.ts` | `GeoProvider`, `GeoQuery` | Type |
