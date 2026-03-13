PROMPT 1 — Análise de conteúdo via IA + Simulador de SERP
Arquivo modificado: src/app/components/SeoPanel.tsx
No arquivo SeoPanel.tsx, faça as seguintes adições:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 1 — Nova aba "IA" no SeoPanel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. No tipo SeoTab, adicione o valor 'ia':
   type SeoTab = 'dashboard' | 'metatags' | 'analise' | 'checklist' | 'jsonld' | 'ia';

2. No array de tabs, adicione ao final:
   { id: 'ia', label: 'Análise IA', icon: <Sparkles size={14} /> }
   Importe Sparkles de lucide-react.

3. No bloco de renderização condicional das abas, adicione:
   {activeTab === 'ia' && (
     <IaAnalysisTab
       data={data}
       getSeoVal={getSeoVal}
       selectedPage={selectedPage}
       setSelectedPage={setSelectedPage}
       pageAnalysis={pageAnalysis}
     />
   )}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 2 — Simulador de SERP na aba Meta Tags
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Na aba 'metatags', localize o bloco de preview que já existe
(o card "Preview Redes Sociais (OG)") e adicione ANTES dele um
novo card "Preview Google (SERP)".

O card mostra exatamente como a página aparecerá nos resultados
do Google, com as seguintes regras visuais:

Container do card: bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px]

Dentro do card, um bloco de preview com fundo branco (#ffffff),
border-radius 8px, padding 16px, simulando a aparência do Google:

  - URL: exibe o canonical da página selecionada em verde (#006621),
    fonte sans-serif 14px. Formato: sousaaraujo.adv.br › {pathname}
    
  - Título clicável: exibe o title da página em azul (#1a0dab),
    fonte sans-serif 20px, sem sublinhado, max 600px de largura.
    Se o título ultrapassar 600px estimados (use ~60 caracteres como
    aproximação), corta com "..." e exibe badge amarelo "Cortado pelo Google"
    
  - Descrição: exibe a meta description em cinza (#545454), fonte
    sans-serif 14px, line-height 1.58, max 2 linhas.
    Se a description ultrapassar 160 caracteres, corta com "..." e
    exibe badge amarelo "Cortada pelo Google"
    
  - Se title ou description estiverem vazios, exibe em vermelho
    "(não definido)" no lugar do conteúdo

Abaixo do preview branco, exibe três métricas lado a lado:
  - Comprimento do title: X/60 chars — verde se 50-60, amarelo se 30-49
    ou 61-70, vermelho se <30 ou >70
  - Comprimento da description: X/160 chars — verde se 120-160,
    amarelo se 70-119, vermelho se <70 ou >160
  - Palavra-chave no title: "✓ Presente" verde ou "✗ Ausente" vermelho,
    verificando se getSeoVal(selectedPage, 'keyword') aparece no title

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 3 — Componente IaAnalysisTab (no mesmo arquivo)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Crie a função IaAnalysisTab com as seguintes props:
  { data, getSeoVal, selectedPage, setSelectedPage, pageAnalysis }

Este componente usa os provedores e chaves configurados no módulo GEO.
Leia as chaves de API via:
  data['geo.api.openai'], data['geo.api.gemini'],
  data['geo.api.anthropic'], etc.
  data['geo.config.activeProvider'] — provedor ativo selecionado no GEO

Importe callGeoAI e GEO_PROVIDERS_DEFAULT de '../../data/geoDefaults'.

SEÇÃO 1 — Seletor de página e provedor:
  - Dropdown para selecionar a página (usa SEO_PAGES já existente no arquivo)
  - Seletor de provedor: botões com os provedores que têm chave configurada
    em data['geo.api.{id}']. Pré-seleciona data['geo.config.activeProvider']
  - Se nenhum provedor tiver chave: card de aviso amarelo
    "Configure provedores na seção GEO do painel para usar análise por IA"
    com link que muda o activePage para 'geo' (receba setActivePage como prop
    adicional se necessário, ou apenas exiba o texto orientando)

SEÇÃO 2 — Botão "Analisar página com IA":
  - Botão primário com ícone Sparkles
  - Ao clicar, monta o seguinte prompt e chama callGeoAI:

  System prompt:
  "Você é um especialista em SEO técnico e copywriting para escritórios
  de advocacia brasileiros. Analise os dados de SEO fornecidos e retorne
  uma análise estruturada em JSON válido, sem markdown, sem blocos de código,
  apenas o objeto JSON puro."

  User prompt:
  "Analise o SEO desta página de escritório de advocacia e retorne JSON puro:
  {
    pagina: '{label da página selecionada}',
    title: '{valor do title}',
    description: '{valor da description}',
    keyword: '{valor do keyword}',
    canonical: '{valor do canonical}'
  }

  Retorne exatamente este JSON, preenchendo todos os campos:
  {
    score: número de 0 a 100,
    resumo: 'texto curto de 1 frase avaliando o SEO geral',
    title: {
      avaliacao: 'otimo' | 'bom' | 'fraco' | 'ausente',
      detalhe: 'observação específica sobre o title',
      sugestao: 'title alternativo otimizado para advocacia em Brasília'
    },
    description: {
      avaliacao: 'otimo' | 'bom' | 'fraco' | 'ausente',
      detalhe: 'observação sobre a description',
      sugestao: 'description alternativa entre 150-160 caracteres'
    },
    keyword: {
      avaliacao: 'otimo' | 'bom' | 'fraco' | 'ausente',
      detalhe: 'observação sobre uso da palavra-chave'
    },
    prioridade: 'title' | 'description' | 'keyword' | 'nenhuma',
    quick_wins: ['ação rápida 1', 'ação rápida 2', 'ação rápida 3']
  }"

  Durante a chamada: spinner com "Analisando {label da página} com {provider.label}..."

SEÇÃO 3 — Exibição do resultado:
  Após receber a resposta, faça JSON.parse() do texto.
  Exiba os resultados em cards:

  Card de score: CircularScore com o valor retornado + resumo em texto

  Card de Title:
    - Badge de avaliação colorido (otimo=verde, bom=azul, fraco=amarelo, ausente=vermelho)
    - Valor atual em cinza
    - detalhe em branco
    - Sugestão da IA em #a57255 com botão "Aplicar" que chama
      onChange('seo.{selectedPage}.title', sugestao)

  Card de Description:
    - Mesmo padrão do Title
    - Botão "Aplicar" que chama onChange('seo.{selectedPage}.description', sugestao)

  Card de Keyword:
    - Badge + detalhe (sem sugestão de substituição)

  Card de Quick Wins:
    - Lista dos 3 itens com ícone de raio (#a57255)
    - Título "Próximos passos recomendados"

  Em caso de erro no JSON.parse ou na chamada da API:
    - Exibe o texto bruto da resposta em bloco mono
    - Mensagem de erro em vermelho explicando o problema

SEÇÃO 4 — Botão "Analisar todas as páginas":
  - Botão secundário abaixo do resultado
  - Ao clicar, itera sobre SEO_PAGES fazendo callGeoAI para cada uma
    com intervalo de 500ms entre chamadas (para não sobrecarregar a API)
  - Exibe barra de progresso: "Analisando X/17 páginas..."
  - Ao finalizar, exibe tabela resumo com: página | score | title | description
    cada linha clicável muda selectedPage para aquela página

PROMPT 2 — Histórico de alterações SEO
Arquivo modificado: src/app/components/SeoPanel.tsx
No arquivo SeoPanel.tsx, adicione a funcionalidade de histórico de
alterações SEO. Todas as alterações são armazenadas em localStorage
— nenhuma modificação no Supabase ou no mecanismo de save existente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 1 — Utilitários de histórico (topo do arquivo, fora dos componentes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adicione logo após os imports:

const SEO_HISTORY_KEY = 'seo_history_v1';
const SEO_HISTORY_MAX = 30;

interface SeoHistoryEntry {
  timestamp: number;
  label: string;
  changes: { key: string; from: string; to: string }[];
  snapshot: Record<string, string>;
}

function loadSeoHistory(): SeoHistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(SEO_HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveSeoHistoryEntry(
  previousData: Record<string, string>,
  newData: Record<string, string>,
  label: string
): void {
  const seoKeys = Object.keys(newData).filter(k =>
    k.startsWith('seo.') || k.startsWith('site.')
  );

  const changes = seoKeys
    .filter(k => previousData[k] !== newData[k])
    .map(k => ({ key: k, from: previousData[k] || '', to: newData[k] || '' }));

  if (changes.length === 0) return;

  const entry: SeoHistoryEntry = {
    timestamp: Date.now(),
    label,
    changes,
    snapshot: Object.fromEntries(
      seoKeys.map(k => [k, newData[k] || ''])
    ),
  };

  const history = loadSeoHistory();
  history.unshift(entry);
  if (history.length > SEO_HISTORY_MAX) history.splice(SEO_HISTORY_MAX);
  localStorage.setItem(SEO_HISTORY_KEY, JSON.stringify(history));
}

function formatHistoryTimestamp(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString('pt-BR') + ' às ' +
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 2 — Nova aba "Histórico" no SeoPanel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. No tipo SeoTab, adicione 'historico':
   type SeoTab = 'dashboard' | 'metatags' | 'analise' | 'checklist' | 'jsonld' | 'ia' | 'historico';

2. No array de tabs, adicione ao final:
   { id: 'historico', label: 'Histórico', icon: <History size={14} /> }
   Importe History de lucide-react.

3. O componente SeoPanel recebe uma nova prop opcional:
   previousData?: Record<string, string>
   
   Se previousData não for passado, o painel funciona normalmente
   sem registrar histórico.

4. No bloco de renderização das abas, adicione:
   {activeTab === 'historico' && (
     <SeoHistoryTab data={data} onChange={onChange} />
   )}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 3 — Componente SeoHistoryTab (no mesmo arquivo)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Crie a função SeoHistoryTab com props: { data, onChange }

Estado local:
  const [history, setHistory] = useState<SeoHistoryEntry[]>(loadSeoHistory);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [confirmRestore, setConfirmRestore] = useState<number | null>(null);

Header do componente:
  - Texto "{history.length} registros salvos localmente"
  - Subtexto cinza "Salvo no navegador — até 30 entradas"
  - Botão "Limpar histórico" vermelho/suave que confirma antes de executar
    localStorage.removeItem(SEO_HISTORY_KEY) e reseta o estado

Se history.length === 0:
  - Estado vazio: ícone History grande + texto
    "Nenhuma alteração registrada ainda."
  - Subtexto: "O histórico é gravado automaticamente quando você salva
    alterações nos campos de SEO."

Lista de entradas (ordem cronológica inversa — mais recente no topo):
  Cada entry em card bg-[#1a1816] border border-white/[0.06] rounded-xl:

  Header clicável (expande/recolhe):
    - Ícone relógio pequeno + formatHistoryTimestamp(entry.timestamp)
      em branco 11px
    - entry.label em #a57255 11px
    - Badge "{entry.changes.length} campo(s) alterado(s)" cinza
    - Chevron right/down indicando estado expandido

  Corpo expandido (visível quando expandedId === entry.timestamp):

    Lista de changes em tabela compacta:
      - key formatada: remove prefixo 'seo.' ou 'site.' e exibe
        o restante em fonte mono 10px cinza
      - from: valor anterior em vermelho/suave, cortado em 40 chars
        (se vazio exibe "(vazio)")
      - to: valor novo em verde/suave, cortado em 40 chars
      - Seta → entre from e to

    Botão "Restaurar este estado":
      - Se confirmRestore === entry.timestamp: mostra dois botões
        "Confirmar restauração" (vermelho) e "Cancelar" (cinza)
      - Senão: mostra botão "Restaurar" com ícone RotateCcw
      - Ao confirmar: itera sobre entry.snapshot e chama
        onChange(key, value) para cada campo do snapshot
        Exibe toast interno "Estado restaurado"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 4 — Integração com o PainelPage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No arquivo PainelPage.tsx, localize a função handleSave.

Logo ANTES da linha que faz o fetch PUT para o Supabase, adicione:
  saveSeoHistoryEntry(
    previousDataRef.current,
    data,
    `Salvo em ${new Date().toLocaleDateString('pt-BR')}`
  );
  previousDataRef.current = { ...data };

Para isso funcionar, adicione no componente PainelPage:
  const previousDataRef = useRef<Record<string, string>>({});

E no bloco onde os dados são carregados do Supabase (o useEffect que
chama a API e faz setData), após o setData adicione:
  previousDataRef.current = { ...loadedData };

Importe saveSeoHistoryEntry de '../components/SeoPanel'
— certifique-se de que a função está exportada com export function.

PROMPT 3 — Card Google Search Console
Arquivo modificado: src/app/components/SeoPanel.tsx
No arquivo SeoPanel.tsx, dentro do componente TechnicalChecklist,
localize o bloco de rodapé que já existe com a dica de validação
(o card com ícone Info no final da aba Checklist).

Adicione APÓS esse card um novo card "Google Search Console":

<div className="bg-[#1a1816] border border-[#a57255]/20 rounded-xl p-[14px]">

  Header:
    - Ícone ExternalLink size={13} text-[#a57255]
    - Título "Google Search Console" text-[13px] font-semibold text-white
    - Badge "Gratuito" bg-emerald-500/15 text-emerald-400 text-[9px]

  Descrição:
    "Ferramenta gratuita do Google que mostra quais palavras-chave
    trazem visitantes, posição média nos resultados, cliques e
    impressões reais — dados que nenhum painel local consegue simular."

  Lista de benefícios (4 itens com ícone CircleCheck emerald):
    • Ver quais buscas levam ao site (palavras-chave reais)
    • Identificar páginas com queda de posição
    • Submeter o sitemap.xml para indexação imediata
    • Receber alertas de erros de rastreamento

  Instruções em 3 passos numerados, texto cinza 10px:
    1. Acesse search.google.com/search-console
    2. Clique em "Adicionar propriedade" e insira o domínio do site
    3. Adicione o arquivo de verificação na pasta /public e submeta

  Botão "Abrir Search Console →" que abre
  https://search.google.com/search-console em nova aba.
  Estilo: border border-[#a57255]/40 text-[#a57255] hover:bg-[#a57255]/10
  rounded-lg px-[12px] py-[7px] text-[11px] font-medium transition-colors

</div>

Importe ExternalLink de lucide-react se ainda não estiver importado.

Ordem de aplicação: 3 → 2 → 1. O card do Search Console é isolado e sem risco. O histórico vem antes porque o PROMPT 1 referencia a aba 'ia' no tipo SeoTab que precisa ser consistente com o que o PROMPT 2 já terá modificado.