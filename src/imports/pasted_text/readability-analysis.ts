PROMPT 1 — Análise de Legibilidade no SeoPanel
Arquivo modificado: src/app/components/SeoPanel.tsx
Contexto: O SeoPanel já tem as abas dashboard, metatags, analise,
checklist, jsonld. A aba 'analise' já tem ContentAnalysisTab que
analisa contagem de texto e keywords. Vamos expandir essa aba
com um bloco de Legibilidade, calculado client-side sem API,
baseado nos textos salvos no KV store.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 1 — Função de análise de legibilidade
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adicione esta função pura antes dos componentes, logo após os
imports:

interface ReadabilityResult {
  score: number;           // 0-100
  level: 'facil' | 'medio' | 'dificil';
  avgWordsPerSentence: number;
  avgCharsPerWord: number;
  estimatedReadTime: number; // em minutos
  longSentences: number;     // frases acima de 25 palavras
  totalWords: number;
  checks: {
    label: string;
    status: 'pass' | 'warning' | 'fail';
    detail: string;
  }[];
}

function analyzeReadability(text: string): ReadabilityResult {
  if (!text.trim()) {
    return {
      score: 0, level: 'dificil', avgWordsPerSentence: 0,
      avgCharsPerWord: 0, estimatedReadTime: 0,
      longSentences: 0, totalWords: 0, checks: []
    };
  }

  // Normaliza e divide em frases
  const sentences = text
    .replace(/\n+/g, ' ')
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  const words = text
    .replace(/[^a-zA-ZÀ-ú\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);

  const totalWords = words.length;
  const totalSentences = Math.max(sentences.length, 1);
  const avgWordsPerSentence = Math.round(totalWords / totalSentences);
  const avgCharsPerWord = Math.round(
    words.reduce((acc, w) => acc + w.length, 0) / Math.max(words.length, 1)
  );
  const longSentences = sentences.filter(
    s => s.split(/\s+/).length > 25
  ).length;
  const estimatedReadTime = Math.max(1, Math.round(totalWords / 200));

  const checks: ReadabilityResult['checks'] = [];

  // Comprimento médio das frases
  if (avgWordsPerSentence <= 15) {
    checks.push({ label: 'Comprimento das frases', status: 'pass',
      detail: `Média de ${avgWordsPerSentence} palavras por frase — ótimo` });
  } else if (avgWordsPerSentence <= 22) {
    checks.push({ label: 'Comprimento das frases', status: 'warning',
      detail: `Média de ${avgWordsPerSentence} palavras por frase — ideal é abaixo de 15` });
  } else {
    checks.push({ label: 'Comprimento das frases', status: 'fail',
      detail: `Média de ${avgWordsPerSentence} palavras por frase — texto muito denso` });
  }

  // Frases longas
  if (longSentences === 0) {
    checks.push({ label: 'Frases longas (+25 palavras)', status: 'pass',
      detail: 'Nenhuma frase excessivamente longa detectada' });
  } else if (longSentences <= 2) {
    checks.push({ label: 'Frases longas (+25 palavras)', status: 'warning',
      detail: `${longSentences} frase(s) muito longa(s) — considere quebrar` });
  } else {
    checks.push({ label: 'Frases longas (+25 palavras)', status: 'fail',
      detail: `${longSentences} frases muito longas — dificulta leitura no mobile` });
  }

  // Volume de conteúdo
  if (totalWords >= 300) {
    checks.push({ label: 'Volume de conteúdo', status: 'pass',
      detail: `${totalWords} palavras — suficiente para indexação` });
  } else if (totalWords >= 150) {
    checks.push({ label: 'Volume de conteúdo', status: 'warning',
      detail: `${totalWords} palavras — recomendado mínimo 300` });
  } else {
    checks.push({ label: 'Volume de conteúdo', status: 'fail',
      detail: `${totalWords} palavras — conteúdo muito escasso para SEO` });
  }

  // Complexidade das palavras
  if (avgCharsPerWord <= 5) {
    checks.push({ label: 'Complexidade das palavras', status: 'pass',
      detail: 'Vocabulário acessível ao público geral' });
  } else if (avgCharsPerWord <= 7) {
    checks.push({ label: 'Complexidade das palavras', status: 'warning',
      detail: 'Vocabulário moderadamente técnico' });
  } else {
    checks.push({ label: 'Complexidade das palavras', status: 'fail',
      detail: 'Vocabulário muito técnico — pode afastar leitores leigos' });
  }

  const passCount = checks.filter(c => c.status === 'pass').length;
  const score = Math.round((passCount / checks.length) * 100);
  const level: ReadabilityResult['level'] =
    score >= 75 ? 'facil' : score >= 40 ? 'medio' : 'dificil';

  return {
    score, level, avgWordsPerSentence, avgCharsPerWord,
    estimatedReadTime, longSentences, totalWords, checks
  };
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 2 — Integrar no ContentAnalysisTab
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Localize o componente ContentAnalysisTab. Dentro do useMemo que
gera contentAudit, adicione ao objeto de resultado de cada página:

  const readability = analyzeReadability(textContent);

E inclua readability nos campos do objeto retornado:
  results.push({
    ...camposJáExistentes,
    readability,
  });

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 3 — Bloco de legibilidade no JSX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No JSX do ContentAnalysisTab, após a tabela de análise existente,
adicione um novo bloco:

{/* ── Análise de Legibilidade ── */}
<div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
  <div className="px-[14px] py-[10px] border-b border-white/[0.04] flex items-center gap-[6px]">
    <BookOpen size={12} className="text-[#a57255]" />
    <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white">
      Legibilidade por Página
    </h3>
    <span className="font-['Noto_Sans'] text-[10px] text-white/25 ml-auto">
      Calculado sobre textos editados no painel
    </span>
  </div>

  <div className="divide-y divide-white/[0.03]">
    {contentAudit.map(page => {
      const r = page.readability;
      const levelColor = {
        facil: '#22c55e',
        medio: '#eab308',
        dificil: '#ef4444',
      }[r.level];
      const levelLabel = {
        facil: 'Fácil', medio: 'Médio', dificil: 'Difícil'
      }[r.level];

      return (
        <details key={page.pageId} className="group">
          <summary className="flex items-center gap-[10px] px-[14px] py-[8px] cursor-pointer hover:bg-white/[0.01] transition-colors list-none">
            {/* Score */}
            <span
              className="font-['Noto_Sans'] text-[11px] font-bold w-[28px] text-right tabular-nums shrink-0"
              style={{ color: levelColor }}
            >
              {r.score}
            </span>
            {/* Barra */}
            <div className="w-[40px] h-[3px] bg-white/[0.06] rounded-full shrink-0">
              <div
                className="h-[3px] rounded-full"
                style={{ width: `${r.score}%`, background: levelColor }}
              />
            </div>
            {/* Label página */}
            <span className="font-['Noto_Sans'] text-[11px] text-white/70 flex-1 truncate">
              {page.label}
            </span>
            {/* Métricas inline */}
            <div className="flex items-center gap-[8px] shrink-0">
              <span className="font-['Noto_Sans'] text-[9px] text-white/25 tabular-nums">
                {r.totalWords} palavras
              </span>
              <span className="font-['Noto_Sans'] text-[9px] text-white/25 tabular-nums">
                ~{r.estimatedReadTime}min leitura
              </span>
              <span
                className="font-['Noto_Sans'] text-[9px] font-medium px-[5px] py-[1px] rounded"
                style={{
                  background: `${levelColor}20`,
                  color: levelColor,
                }}
              >
                {levelLabel}
              </span>
              <ChevronRight
                size={11}
                className="text-white/20 group-open:rotate-90 transition-transform"
              />
            </div>
          </summary>

          {/* Detalhes expandidos */}
          <div className="px-[14px] pb-[10px] space-y-[4px]">
            {r.checks.map((check, i) => (
              <div key={i} className="flex items-start gap-[8px]">
                {check.status === 'pass'
                  ? <CircleCheck size={11} className="text-emerald-400 mt-[1px] shrink-0" />
                  : check.status === 'warning'
                  ? <CircleMinus size={11} className="text-yellow-400 mt-[1px] shrink-0" />
                  : <CircleX size={11} className="text-red-400 mt-[1px] shrink-0" />
                }
                <div>
                  <span className="font-['Noto_Sans'] text-[10px] text-white/60 font-medium">
                    {check.label}
                  </span>
                  <span className="font-['Noto_Sans'] text-[10px] text-white/30 ml-[6px]">
                    {check.detail}
                  </span>
                </div>
              </div>
            ))}
            {r.totalWords < 50 && (
              <p className="font-['Noto_Sans'] text-[10px] text-white/20 italic mt-[4px]">
                Adicione mais conteúdo nos campos de texto desta página para análise completa.
              </p>
            )}
          </div>
        </details>
      );
    })}
  </div>
</div>

Adicione BookOpen aos imports do lucide-react.

PROMPT 2 — Gerenciador de Redirecionamentos 301
Arquivos modificados: src/app/pages/PainelPage.tsx e src/app/routes.tsx
Contexto: O site usa React Router v6 (createBrowserRouter) em
src/app/routes.tsx. O painel salva dados no Supabase KV via PUT.
O hook usePanelContent.ts expõe readPanel() para leitura síncrona
do cache. Vamos implementar redirecionamentos 301 gerenciáveis pelo
painel, sem backend adicional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 1 — Componente RedirectHandler em routes.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No arquivo src/app/routes.tsx, adicione após os imports existentes:

import { Navigate, useLocation } from 'react-router';
import { readPanel } from './hooks/usePanelContent';

// Lê redirects do KV: redirect.1.from, redirect.1.to, ..., até 20
function useRedirects(): { from: string; to: string }[] {
  const result: { from: string; to: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const from = readPanel(`redirect.${i}.from`, '').trim();
    const to   = readPanel(`redirect.${i}.to`,   '').trim();
    if (from && to && from !== to) {
      result.push({ from, to });
    }
  }
  return result;
}

// Wrapper que verifica redirects antes de renderizar qualquer rota
function RedirectHandler({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const redirects = useRedirects();
  
  const match = redirects.find(r => {
    const fromPath = r.from.startsWith('/') ? r.from : `/${r.from}`;
    return location.pathname === fromPath ||
           location.pathname === fromPath.replace(/\/$/, '');
  });

  if (match) {
    const toPath = match.to.startsWith('/') ? match.to : `/${match.to}`;
    return <Navigate to={toPath} replace />;
  }

  return <>{children}</>;
}

No objeto do router, envolva o Component: Layout com RedirectHandler:

Localize:
  {
    path: '/',
    Component: Layout,
    children: [...]
  }

Substitua por:
  {
    path: '/',
    element: (
      <RedirectHandler>
        <Layout />
      </RedirectHandler>
    ),
    children: [...]
  }

Importe Layout diretamente se necessário:
  import { Layout } from './components/Layout';

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 2 — Seção "Redirecionamentos" no PainelPage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No arquivo PainelPage.tsx, adicione ao array PAGES uma nova entrada
logo após 'geral' (ou como último item das seções globais):

  {
    id: 'redirects',
    label: 'Redirecionamentos',
    icon: <ArrowLeftRight size={18} />,
    route: undefined,
    sections: [{ id: 'redirects-placeholder', title: '', fields: [] }],
  }

Importe ArrowLeftRight de lucide-react.

No bloco de renderização condicional:
  {activePage === 'redirects' && (
    <RedirectsPanel data={data} onChange={onChange} />
  )}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 3 — Componente RedirectsPanel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adicione antes do export default do arquivo:

function RedirectsPanel({ data, onChange }: {
  data: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  // Detecta redirects existentes
  const redirects: { index: number; from: string; to: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const from = data[`redirect.${i}.from`] || '';
    const to   = data[`redirect.${i}.to`]   || '';
    if (from || to) redirects.push({ index: i, from, to });
  }
  const nextIndex = Math.max(...redirects.map(r => r.index), 0) + 1;

  const addRedirect = () => {
    onChange(`redirect.${nextIndex}.from`, '/url-antiga');
    onChange(`redirect.${nextIndex}.to`,   '/url-nova');
  };

  const removeRedirect = (index: number) => {
    if (!confirm('Remover este redirecionamento?')) return;
    onChange(`redirect.${index}.from`, '');
    onChange(`redirect.${index}.to`,   '');
  };

  return (
    <div className="space-y-[12px]">

      {/* Header */}
      <div>
        <h2 className="font-['Noto_Sans'] text-[16px] font-semibold text-white tracking-[-0.3px]">
          Redirecionamentos
        </h2>
        <p className="font-['Noto_Sans'] text-[11px] text-white/30 mt-[2px]">
          Redireciona URLs antigas para novas sem perder o SEO acumulado
        </p>
      </div>

      {/* Card informativo */}
      <div className="bg-[#1a1816] border border-[#a57255]/15 rounded-xl px-[14px] py-[10px] flex gap-[10px]">
        <Info size={13} className="text-[#a57255]/60 mt-[1px] shrink-0" />
        <div className="space-y-[3px]">
          <p className="font-['Noto_Sans'] text-[11px] text-white/60 font-medium">
            Como funciona
          </p>
          <p className="font-['Noto_Sans'] text-[10px] text-white/30 leading-[15px]">
            Os redirecionamentos são aplicados em tempo real no navegador do visitante.
            Use para preservar o ranqueamento de páginas que tiveram a URL alterada.
            Máximo de 20 redirecionamentos simultâneos.
          </p>
        </div>
      </div>

      {/* Lista de redirects */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <ArrowLeftRight size={12} className="text-[#a57255]" />
            <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white">
              {redirects.length} redirecionamento{redirects.length !== 1 ? 's' : ''} ativo{redirects.length !== 1 ? 's' : ''}
            </h3>
          </div>
          {redirects.length < 20 && (
            <button
              onClick={addRedirect}
              className="flex items-center gap-[5px] font-['Noto_Sans'] text-[10px] text-[#a57255] border border-[#a57255]/30 px-[8px] py-[3px] rounded-lg hover:bg-[#a57255]/10 transition-colors"
            >
              <Plus size={10} /> Adicionar
            </button>
          )}
        </div>

        {redirects.length === 0 ? (
          <div className="px-[14px] py-[32px] flex flex-col items-center text-center">
            <ArrowLeftRight size={28} className="text-white/10 mb-[10px]" />
            <p className="font-['Noto_Sans'] text-[12px] text-white/30 font-medium mb-[4px]">
              Nenhum redirecionamento cadastrado
            </p>
            <p className="font-['Noto_Sans'] text-[10px] text-white/20 max-w-[260px] leading-[15px] mb-[12px]">
              Útil quando você muda o slug de uma página e não quer perder o SEO acumulado.
            </p>
            <button
              onClick={addRedirect}
              className="font-['Noto_Sans'] text-[11px] text-[#a57255] border border-[#a57255]/30 px-[12px] py-[5px] rounded-lg hover:bg-[#a57255]/10 transition-colors"
            >
              Criar primeiro redirecionamento
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {/* Header da tabela */}
            <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-[8px] px-[14px] py-[6px]">
              <span className="font-['Noto_Sans'] text-[9px] text-white/20 uppercase tracking-[0.6px]">De (URL antiga)</span>
              <span className="w-[20px]" />
              <span className="font-['Noto_Sans'] text-[9px] text-white/20 uppercase tracking-[0.6px]">Para (URL nova)</span>
              <span className="w-[20px]" />
            </div>
            {redirects.map(r => (
              <div key={r.index} className="grid grid-cols-[1fr_auto_1fr_auto] gap-[8px] items-center px-[14px] py-[8px]">
                <input
                  type="text"
                  defaultValue={r.from}
                  onBlur={e => onChange(`redirect.${r.index}.from`, e.target.value.trim())}
                  placeholder="/url-antiga"
                  className="w-full h-[30px] bg-[#111] border border-white/[0.06] rounded-lg px-[8px] font-mono text-[11px] text-white/70 placeholder:text-white/15 focus:border-[#a57255]/40 focus:outline-none transition-colors"
                />
                <ArrowLeftRight size={12} className="text-white/20 shrink-0" />
                <input
                  type="text"
                  defaultValue={r.to}
                  onBlur={e => onChange(`redirect.${r.index}.to`, e.target.value.trim())}
                  placeholder="/url-nova"
                  className="w-full h-[30px] bg-[#111] border border-white/[0.06] rounded-lg px-[8px] font-mono text-[11px] text-emerald-400/70 placeholder:text-white/15 focus:border-[#a57255]/40 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => removeRedirect(r.index)}
                  className="p-[4px] text-white/15 hover:text-red-400/60 transition-colors shrink-0 rounded"
                  title="Remover"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Aviso importante */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-[14px] py-[10px] flex gap-[8px]">
        <AlertTriangle size={12} className="text-amber-400/60 mt-[1px] shrink-0" />
        <p className="font-['Noto_Sans'] text-[10px] text-white/30 leading-[15px]">
          Lembre de clicar em <strong className="text-white/50">Salvar</strong> após editar os redirecionamentos.
          Eles entram em vigor imediatamente após o save, sem precisar republicar o site.
        </p>
      </div>
    </div>
  );
}

Importe Plus e ArrowLeftRight de lucide-react caso não estejam.
AlertTriangle já está importado no arquivo.

PROMPT 3 — Sitemap Dinâmico via Supabase Edge Function
Arquivos modificados: public/robots.txt + nova Edge Function no Supabase
Contexto: O site tem um sitemap.xml estático em /public/sitemap.xml.
Quando novos artigos de blog são criados pelo painel (chaves
blog.article{N}.slug e blog.article{N}.published), eles não entram
automaticamente no sitemap. Vamos substituir o arquivo estático por
um endpoint dinâmico que lê o KV e gera o XML em tempo real.

O projeto já tem uma Edge Function no Supabase em:
  make-server-979eabbc (endpoint: /panel para GET/PUT de dados)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 1 — Criar a Edge Function de sitemap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No painel do Supabase (supabase.com), vá em Edge Functions e crie
uma nova função chamada "sitemap". Cole o seguinte código:

// supabase/functions/sitemap/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SITE_URL = 'https://sousaaraujo.adv.br';

// Rotas estáticas com prioridades
const STATIC_ROUTES = [
  { path: '/',                                    priority: '1.0', changefreq: 'weekly'  },
  { path: '/sobre',                               priority: '0.8', changefreq: 'monthly' },
  { path: '/areas-de-atuacao',                    priority: '0.9', changefreq: 'monthly' },
  { path: '/divorcio',                            priority: '0.9', changefreq: 'monthly' },
  { path: '/guarda-e-plano-de-convivencia',       priority: '0.9', changefreq: 'monthly' },
  { path: '/pensao-alimenticia',                  priority: '0.9', changefreq: 'monthly' },
  { path: '/inventario-e-sucessoes',              priority: '0.9', changefreq: 'monthly' },
  { path: '/uniao-estavel',                       priority: '0.9', changefreq: 'monthly' },
  { path: '/homologacao-de-sentenca-estrangeira', priority: '0.9', changefreq: 'monthly' },
  { path: '/imoveis',                             priority: '0.9', changefreq: 'monthly' },
  { path: '/consultoria-empresarial-pmes',        priority: '0.9', changefreq: 'monthly' },
  { path: '/registro-de-marca-inpi',              priority: '0.9', changefreq: 'monthly' },
  { path: '/faq',                                 priority: '0.8', changefreq: 'monthly' },
  { path: '/blog',                                priority: '0.8', changefreq: 'weekly'  },
  { path: '/contato',                             priority: '0.8', changefreq: 'yearly'  },
  { path: '/rede-de-parceiros',                   priority: '0.5', changefreq: 'monthly' },
  { path: '/videos-educativos',                   priority: '0.6', changefreq: 'weekly'  },
];

Deno.serve(async () => {
  // Lê dados do KV via API pública do painel
  const projectId = Deno.env.get('SUPABASE_PROJECT_ID') || '';
  const anonKey   = Deno.env.get('SUPABASE_ANON_KEY')   || '';
  
  let panelData: Record<string, string> = {};
  try {
    const res = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-979eabbc/panel`,
      { headers: { 'Authorization': `Bearer ${anonKey}` } }
    );
    if (res.ok) {
      const json = await res.json();
      panelData = json.data || {};
    }
  } catch { /* usa apenas rotas estáticas se falhar */ }

  // Coleta slugs de artigos publicados
  const blogRoutes: { path: string; priority: string; changefreq: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const slug      = panelData[`blog.article${i}.slug`]?.trim();
    const published = panelData[`blog.article${i}.published`]?.trim();
    if (slug && published === '1') {
      blogRoutes.push({
        path: `/blog/${slug}`,
        priority: '0.7',
        changefreq: 'monthly',
      });
    }
  }

  // Também inclui os 3 artigos hardcoded do blogArticles.ts
  const hardcodedSlugs = [
    'imovel-sem-escritura-caminhos-regularizar-brasilia',
    'divorcio-extrajudicial-cartorio-brasil-como-fazer',
    'homologacao-sentenca-divorcio-exterior-stj-brasil',
  ];
  for (const slug of hardcodedSlugs) {
    if (!blogRoutes.find(r => r.path === `/blog/${slug}`)) {
      blogRoutes.push({ path: `/blog/${slug}`, priority: '0.7', changefreq: 'monthly' });
    }
  }

  const today = new Date().toISOString().split('T')[0];
  const allRoutes = [...STATIC_ROUTES, ...blogRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
});

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 2 — Atualizar robots.txt
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Substitua o conteúdo de public/robots.txt por:

User-agent: *
Allow: /
Disallow: /painel

Sitemap: https://{SEU_PROJECT_ID}.supabase.co/functions/v1/sitemap

(Substitua {SEU_PROJECT_ID} pelo ID real do projeto Supabase,
visível na URL do dashboard: supabase.com/dashboard/project/{ID})

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 3 — Card de status do sitemap no SeoPanel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No arquivo SeoPanel.tsx, na aba 'checklist' (componente
TechnicalChecklist), localize o card do Google Search Console
que foi adicionado anteriormente.

Adicione ANTES desse card um novo card "Sitemap Dinâmico":

<div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px]">
  <div className="flex items-center gap-[6px] mb-[8px]">
    <Globe size={13} className="text-[#a57255]" />
    <h4 className="font-['Noto_Sans'] text-[12px] font-semibold text-white">
      Sitemap Dinâmico
    </h4>
    <span className="font-['Noto_Sans'] text-[9px] bg-emerald-500/15 text-emerald-400 px-[5px] py-[1px] rounded ml-auto">
      Automático
    </span>
  </div>
  <p className="font-['Noto_Sans'] text-[10px] text-white/35 leading-[15px] mb-[10px]">
    O sitemap é gerado automaticamente pela Edge Function do Supabase,
    incluindo todos os artigos de blog publicados pelo painel.
    Novos artigos entram no sitemap imediatamente após publicação.
  </p>
  <div className="flex gap-[6px]">
    
      href={`https://${data['site.supabaseProject'] || '{PROJECT_ID}'}.supabase.co/functions/v1/sitemap`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-[4px] font-['Noto_Sans'] text-[10px] text-[#a57255] border border-[#a57255]/30 px-[8px] py-[3px] rounded-lg hover:bg-[#a57255]/10 transition-colors"
    >
      <ExternalLink size={10} /> Ver sitemap
    </a>
    
      href="https://search.google.com/search-console/sitemaps"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-[4px] font-['Noto_Sans'] text-[10px] text-white/30 border border-white/[0.06] px-[8px] py-[3px] rounded-lg hover:text-white/50 transition-colors"
    >
      <ExternalLink size={10} /> Submeter ao GSC
    </a>
  </div>
</div>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTA IMPORTANTE PARA O DEPLOY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Após criar a Edge Function no Supabase, defina as variáveis de
ambiente dela no painel do Supabase em
Settings > Edge Functions > sitemap > Environment Variables:

  SUPABASE_PROJECT_ID = {seu project id}
  SUPABASE_ANON_KEY   = {sua anon key pública}

A função não precisa de autenticação — ela é pública por design,
assim como um sitemap.xml convencional.

Ordem de aplicação: 1 → 2 → 3. O PROMPT 3 (sitemap) tem uma etapa manual no painel do Supabase que precisa ser feita pelo Alexandre, já que envolve deploy de Edge Function — não é gerado pelo Figma Make.