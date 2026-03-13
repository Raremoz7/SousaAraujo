PROMPT FINAL — Preview com iframe real + Análise IA + Histórico SEO
Parágrafo de contexto para o Figma Make
Este projeto é um painel administrativo em React 18 + TypeScript + Vite + 
Tailwind CSS para o site Sousa Araújo Advocacia. O painel gerencia o 
conteúdo do site via Supabase KV, com autenticação própria. O design 
segue um sistema dark mode consistente: background #161312, superfícies 
#1a1816, cor de destaque #a57255, bordas white/[0.06], fonte Noto Sans. 
O arquivo principal do painel é src/app/pages/PainelPage.tsx e o módulo 
de SEO vive em src/app/components/SeoPanel.tsx.

Serão feitas 3 modificações independentes nesta sessão:
1. Substituição do sistema de preview por iframe real no PainelPage.tsx
2. Nova aba "Análise IA" no SeoPanel.tsx com análise de conteúdo por IA
3. Nova aba "Histórico" no SeoPanel.tsx com log de alterações em localStorage

Aplique as 3 modificações em sequência, confirmando cada uma antes de 
passar para a próxima.

MODIFICAÇÃO 1 — Preview com iframe real
Arquivo: src/app/pages/PainelPage.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 1 — Substituir estados e refs do preview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Localize estes estados e refs existentes:
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewContainerSize, setPreviewContainerSize] = useState({ w: 0, h: 0 });

Substitua por:
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeLoading, setIframeLoading] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 2 — Remover useEffects obsoletos do preview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Remova o useEffect que observa resize do container de preview.
É o useEffect que contém:
  setPreviewContainerSize({ w: Math.round(width), h: Math.round(height) })

Remova o useEffect que faz scroll do preview ao trocar página.
É o useEffect que contém:
  if (showPreview && previewScrollRef.current) {
    previewScrollRef.current.scrollTop = 0;
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 3 — Adicionar import do ícone Tablet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No bloco de imports do lucide-react, adicione Tablet.
O ícone RotateCcw já está importado — não duplique.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 4 — Substituir o bloco JSX do preview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Localize o bloco JSX que começa com o comentário:
  {/* Preview panel — renders actual page component (no iframe) */}

Substitua todo esse bloco (até o fechamento da div correspondente)
por este novo bloco:

{showPreview && (
  <div className="w-[50%] border-l border-white/[0.06] flex flex-col bg-[#0a0908] min-h-0">

    {/* Barra superior — estilo navegador */}
    <div className="shrink-0 bg-[#151311] border-b border-white/[0.06]">

      {/* Linha de controles */}
      <div className="h-[38px] flex items-center justify-between px-[12px]">
        <div className="flex items-center gap-[8px]">

          {/* Traffic lights */}
          <div className="flex items-center gap-[5px] mr-[4px]">
            <button
              onClick={() => setShowPreview(false)}
              className="w-[10px] h-[10px] rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer"
              title="Fechar preview"
            />
            <span className="w-[10px] h-[10px] rounded-full bg-yellow-500/70" />
            <span className="w-[10px] h-[10px] rounded-full bg-emerald-500/70 animate-pulse" title="Preview ao vivo" />
          </div>

          <div className="h-[16px] w-px bg-white/[0.06]" />

          {/* Seletor de dispositivo */}
          {([
            { id: 'desktop' as const, icon: <Monitor size={13} />, label: '1440px' },
            { id: 'tablet'  as const, icon: <Tablet  size={13} />, label: '768px'  },
            { id: 'mobile'  as const, icon: <Smartphone size={13} />, label: '390px' },
          ] as const).map(d => (
            <button
              key={d.id}
              onClick={() => setPreviewDevice(d.id)}
              className={`p-[3px] rounded transition-colors cursor-pointer ${
                previewDevice === d.id
                  ? 'text-[#a57255]'
                  : 'text-white/20 hover:text-white/40'
              }`}
              title={d.label}
            >
              {d.icon}
            </button>
          ))}

          <div className="h-[16px] w-px bg-white/[0.06]" />

          {/* Botão reload */}
          <button
            onClick={() => { setIframeLoading(true); setIframeKey(k => k + 1); }}
            className="p-[3px] text-white/20 hover:text-white/40 transition-colors rounded"
            title="Recarregar preview"
          >
            <RotateCcw size={12} />
          </button>
        </div>

        <div className="flex items-center gap-[6px]">
          <span className="font-['Noto_Sans'] text-[9px] text-white/20 bg-white/[0.04] px-[6px] py-[1px] rounded tabular-nums">
            {previewDevice === 'desktop' ? '1440px' : previewDevice === 'tablet' ? '768px' : '390px'}
          </span>
          {currentPage?.route && (
            
              href={currentPage.route}
              target="_blank"
              rel="noopener noreferrer"
              className="p-[3px] text-white/20 hover:text-white/40 transition-colors rounded"
              title="Abrir em nova aba"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Barra de URL */}
      <div className="px-[12px] pb-[8px]">
        <div className="flex items-center gap-[6px] bg-[#0e0d0c] rounded-md h-[28px] px-[10px] border border-white/[0.04]">
          {iframeLoading
            ? <div className="w-[10px] h-[10px] border border-[#a57255]/40 border-t-[#a57255] rounded-full animate-spin shrink-0" />
            : <Globe size={10} className="text-emerald-500/50 shrink-0" />
          }
          <span className="font-['Noto_Sans'] text-[11px] text-white/35 truncate flex-1 select-none">
            sousaaraujo.adv.br{currentPage?.route || '/'}
          </span>
          {!iframeLoading && (
            <span className="font-['Noto_Sans'] text-[9px] text-emerald-500/40 shrink-0">●</span>
          )}
        </div>
      </div>
    </div>

    {/* Área do iframe */}
    <div className="flex-1 overflow-auto bg-[#0a0908] flex items-start justify-center py-[16px] px-[12px] min-h-0">
      {(() => {
        if (!currentPage?.route) {
          return (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-[40px] h-full">
              <div className="w-[56px] h-[56px] rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-[16px]">
                <Eye size={24} className="text-white/15" />
              </div>
              <h3 className="font-['Noto_Sans'] text-[14px] text-white/40 font-medium mb-[6px]">
                Sem preview disponível
              </h3>
              <p className="font-['Noto_Sans'] text-[12px] text-white/20 max-w-[240px] leading-[18px]">
                Esta seção não possui uma página associada para preview.
              </p>
            </div>
          );
        }

        const iframeSrc = currentPage.route.startsWith('/')
          ? currentPage.route
          : `/${currentPage.route}`;

        const iframeEl = (
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src={iframeSrc}
            title={`Preview — ${currentPage.label}`}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block', background: '#fff' }}
            onLoadStart={() => setIframeLoading(true)}
            onLoad={() => setIframeLoading(false)}
          />
        );

        if (previewDevice === 'desktop') {
          return (
            <div className="w-full h-full rounded-lg overflow-hidden border border-white/[0.06] shadow-2xl">
              {iframeEl}
            </div>
          );
        }

        const isPhone = previewDevice === 'mobile';
        const frameW = isPhone ? 390 : 768;
        const frameH = isPhone ? 844 : 1024;

        return (
          <div
            className="relative flex flex-col shrink-0"
            style={{
              width: frameW + (isPhone ? 16 : 20),
              borderRadius: isPhone ? 36 : 20,
              background: '#1a1a1a',
              padding: isPhone ? '10px 8px' : '12px 10px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
            }}
          >
            {/* Dynamic Island (mobile only) */}
            {isPhone && (
              <div className="flex justify-center mb-[8px]">
                <div style={{ width: 100, height: 28, background: '#111', borderRadius: 20 }} />
              </div>
            )}

            {/* Status bar */}
            <div className="flex items-center justify-between px-[12px] mb-[4px]" style={{ height: 16 }}>
              <span className="font-['Noto_Sans'] text-[9px] text-white/50 tabular-nums">9:41</span>
              <div className="flex items-center gap-[4px]">
                <span className="font-['Noto_Sans'] text-[9px] text-white/50">●●●</span>
                <span className="font-['Noto_Sans'] text-[9px] text-white/50">WiFi</span>
                <span className="font-['Noto_Sans'] text-[9px] text-white/50">100%</span>
              </div>
            </div>

            {/* Tela */}
            <div style={{ width: frameW, height: frameH, borderRadius: isPhone ? 20 : 12, overflow: 'hidden', background: '#fff' }}>
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={iframeSrc}
                title={`Preview ${previewDevice} — ${currentPage.label}`}
                style={{ width: frameW, height: frameH, border: 'none', display: 'block' }}
                onLoadStart={() => setIframeLoading(true)}
                onLoad={() => setIframeLoading(false)}
              />
            </div>

            {/* Home indicator (mobile only) */}
            {isPhone && (
              <div className="flex justify-center mt-[8px]">
                <div style={{ width: 100, height: 4, background: 'rgba(255,255,255,0.3)', borderRadius: 4 }} />
              </div>
            )}
          </div>
        );
      })()}
    </div>
  </div>
)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 5 — Remover código que se torna desnecessário
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Remova as seguintes declarações que não são mais usadas após a troca:
- A constante PreviewLayout (lazy import com Promise.all de Navbar e Footer)
- O objeto PreviewPages (Record com todos os lazy imports das páginas)
- A função PreviewLoader
- A classe PreviewErrorBoundary

Antes de remover cada um, confirme que não aparecem em nenhum outro
trecho do arquivo.

MODIFICAÇÃO 2 — Aba "Análise IA" no SeoPanel
Arquivo: src/app/components/SeoPanel.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 1 — Atualizar imports
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No import do React, adicione useRef:
  import React, { useState, useMemo, useCallback, useRef } from 'react';

No bloco de imports do lucide-react, adicione:
  Sparkles, History, RotateCcw, RefreshCw, Wand2, ExternalLink,
  CheckCircle, XCircle as XCircleIcon

Os ícones já existentes no arquivo não devem ser duplicados.

Adicione ao final dos imports externos:
  import { callGeoAI, GEO_PROVIDERS_DEFAULT } from '../../data/geoDefaults';

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 2 — Adicionar 'ia' ao tipo SeoTab e à lista de abas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Substitua:
  type SeoTab = 'dashboard' | 'metatags' | 'analise' | 'checklist' | 'jsonld';
Por:
  type SeoTab = 'dashboard' | 'metatags' | 'analise' | 'checklist' | 'jsonld' | 'ia';

No array tabs, adicione ao final:
  { id: 'ia' as SeoTab, label: 'Análise IA', icon: <Sparkles size={14} /> }

No bloco de renderização das abas, adicione após o bloco do 'jsonld':
  {activeTab === 'ia' && (
    <IaAnalysisTab
      data={data}
      getSeoVal={getSeoVal}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
      onChange={onChange}
      pageAnalysis={pageAnalysis}
    />
  )}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 3 — Criar o componente IaAnalysisTab
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adicione antes do export default no final do arquivo:

interface IaPageResult {
  score: number;
  resumo: string;
  title: { avaliacao: string; detalhe: string; sugestao: string };
  description: { avaliacao: string; detalhe: string; sugestao: string };
  keyword: { avaliacao: string; detalhe: string };
  prioridade: string;
  quick_wins: string[];
}

function IaAnalysisTab({
  data, getSeoVal, selectedPage, setSelectedPage, onChange, pageAnalysis
}: {
  data: Record<string, string>;
  getSeoVal: (pageId: string, field: string) => string;
  selectedPage: string;
  setSelectedPage: (id: string) => void;
  onChange: (key: string, value: string) => void;
  pageAnalysis: Record<string, { checks: SeoCheckResult[]; score: number }>;
}) {
  const [activeProvider, setActiveProvider] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IaPageResult | null>(null);
  const [rawError, setRawError] = useState<string>('');
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number } | null>(null);
  const [batchResults, setBatchResults] = useState<{ pageId: string; label: string; score: number; titleStatus: string; descStatus: string }[]>([]);

  // Provedores que têm chave configurada
  const availableProviders = GEO_PROVIDERS_DEFAULT.filter(p =>
    data[`geo.api.${p.id}`]?.trim()
  );

  // Pré-seleciona o primeiro disponível
  const currentProvider = activeProvider || availableProviders[0]?.id || '';

  const analyze = async (pageId: string) => {
    const provider = GEO_PROVIDERS_DEFAULT.find(p => p.id === currentProvider);
    if (!provider) return;
    const apiKey = data[`geo.api.${currentProvider}`] || '';

    const pageLabel = SEO_PAGES.find(p => p.id === pageId)?.label || pageId;
    const titleVal = getSeoVal(pageId, 'title');
    const descVal = getSeoVal(pageId, 'description');
    const kwVal = getSeoVal(pageId, 'keyword');
    const canonicalVal = getSeoVal(pageId, 'canonical');

    const systemPrompt = `Você é um especialista em SEO técnico para escritórios de advocacia brasileiros.
Analise os dados fornecidos e retorne APENAS um objeto JSON válido, sem markdown, sem blocos de código, sem texto antes ou depois.`;

    const userPrompt = `Analise o SEO desta página e retorne JSON puro:

Dados da página:
- Página: ${pageLabel}
- Title: ${titleVal || '(não definido)'}
- Description: ${descVal || '(não definida)'}
- Keyword: ${kwVal || '(não definida)'}
- Canonical: ${canonicalVal || '(não definido)'}

Retorne exatamente este JSON preenchido:
{"score":0,"resumo":"","title":{"avaliacao":"","detalhe":"","sugestao":""},"description":{"avaliacao":"","detalhe":"","sugestao":""},"keyword":{"avaliacao":"","detalhe":""},"prioridade":"","quick_wins":["",""]}

Onde avaliacao é: "otimo" | "bom" | "fraco" | "ausente"
Prioridade é: "title" | "description" | "keyword" | "nenhuma"
Score de 0 a 100. Sugestões em português, adequadas para advocacia em Brasília.`;

    setLoading(true);
    setResult(null);
    setRawError('');

    try {
      const raw = await callGeoAI(provider, apiKey, systemPrompt, userPrompt);
      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed: IaPageResult = JSON.parse(cleaned);
      setResult(parsed);
    } catch (e: any) {
      setRawError(e.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const analyzeAll = async () => {
    const provider = GEO_PROVIDERS_DEFAULT.find(p => p.id === currentProvider);
    if (!provider) return;
    setBatchResults([]);
    setBatchProgress({ current: 0, total: SEO_PAGES.length });

    for (let i = 0; i < SEO_PAGES.length; i++) {
      const page = SEO_PAGES[i];
      setBatchProgress({ current: i + 1, total: SEO_PAGES.length });
      try {
        const apiKey = data[`geo.api.${currentProvider}`] || '';
        const titleVal = getSeoVal(page.id, 'title');
        const descVal = getSeoVal(page.id, 'description');
        const kwVal = getSeoVal(page.id, 'keyword');

        const raw = await callGeoAI(
          provider, apiKey,
          'Analise SEO e retorne JSON puro sem markdown.',
          `Página: ${page.label}. Title: ${titleVal || '(vazio)'}. Description: ${descVal || '(vazia)'}. Keyword: ${kwVal || '(vazia)'}. Retorne: {"score":0,"title":{"avaliacao":""},"description":{"avaliacao":""}}`
        );
        const cleaned = raw.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        setBatchResults(prev => [...prev, {
          pageId: page.id,
          label: page.label,
          score: parsed.score || 0,
          titleStatus: parsed.title?.avaliacao || '?',
          descStatus: parsed.description?.avaliacao || '?',
        }]);
      } catch {
        setBatchResults(prev => [...prev, {
          pageId: page.id, label: page.label, score: 0, titleStatus: 'erro', descStatus: 'erro'
        }]);
      }
      if (i < SEO_PAGES.length - 1) {
        await new Promise(r => setTimeout(r, 600));
      }
    }
    setBatchProgress(null);
  };

  const avaliacaoColor = (av: string) => ({
    otimo: 'text-emerald-400', bom: 'text-blue-400',
    fraco: 'text-yellow-400', ausente: 'text-red-400'
  }[av] || 'text-white/40');

  const avaliacaoBg = (av: string) => ({
    otimo: 'bg-emerald-500/15', bom: 'bg-blue-500/15',
    fraco: 'bg-yellow-500/15', ausente: 'bg-red-500/15'
  }[av] || 'bg-white/[0.06]');

  return (
    <div className="space-y-[10px]">

      {/* Sem provedores configurados */}
      {availableProviders.length === 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-[14px] py-[12px]">
          <p className="font-['Noto_Sans'] text-[11px] text-amber-400">
            Configure ao menos um provedor de IA na seção GEO do painel para usar a análise por IA.
          </p>
        </div>
      )}

      {/* Controles principais */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px] flex flex-wrap items-center gap-[10px]">

        {/* Seletor de página */}
        <select
          value={selectedPage}
          onChange={e => { setSelectedPage(e.target.value); setResult(null); }}
          className="bg-[#111] border border-white/[0.08] text-white font-['Noto_Sans'] text-[11px] h-[32px] px-[10px] rounded-lg focus:border-[#a57255]/40 focus:outline-none flex-1 min-w-[160px]"
        >
          {SEO_PAGES.map(p => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>

        {/* Seletor de provedor */}
        <div className="flex gap-[4px] flex-wrap">
          {availableProviders.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveProvider(p.id)}
              className={`px-[10px] h-[32px] rounded-lg font-['Noto_Sans'] text-[11px] font-medium transition-all border ${
                currentProvider === p.id
                  ? 'border-[#a57255] text-[#a57255] bg-[#a57255]/10'
                  : 'border-white/[0.08] text-white/40 hover:text-white/60'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Botão analisar */}
        <button
          onClick={() => analyze(selectedPage)}
          disabled={loading || !currentProvider}
          className="flex items-center gap-[6px] h-[32px] px-[14px] bg-[#a57255] hover:bg-[#8f6146] disabled:opacity-40 text-white rounded-lg font-['Noto_Sans'] text-[11px] font-medium transition-colors shrink-0"
        >
          {loading
            ? <><div className="w-[10px] h-[10px] border border-white/40 border-t-white rounded-full animate-spin" /> Analisando...</>
            : <><Sparkles size={12} /> Analisar página</>
          }
        </button>
      </div>

      {/* Erro raw */}
      {rawError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-[14px]">
          <p className="font-['Noto_Sans'] text-[11px] text-red-400 font-medium mb-[4px]">Erro na análise</p>
          <p className="font-['Noto_Sans'] text-[10px] text-red-300/60 font-mono">{rawError}</p>
        </div>
      )}

      {/* Resultado */}
      {result && (
        <div className="space-y-[8px]">

          {/* Score + resumo */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px] flex items-center gap-[14px]">
            <CircularScore score={result.score} size={52} />
            <div>
              <p className="font-['Noto_Sans'] text-[12px] text-white font-medium">
                {SEO_PAGES.find(p => p.id === selectedPage)?.label}
              </p>
              <p className="font-['Noto_Sans'] text-[11px] text-white/50 mt-[2px]">{result.resumo}</p>
              {result.prioridade !== 'nenhuma' && (
                <span className="inline-block mt-[6px] font-['Noto_Sans'] text-[9px] bg-[#a57255]/15 text-[#a57255] px-[6px] py-[2px] rounded font-medium uppercase tracking-wide">
                  Prioridade: {result.prioridade}
                </span>
              )}
            </div>
          </div>

          {/* Grid title + description */}
          <div className="grid grid-cols-2 gap-[8px]">
            {[
              { label: 'Title', field: 'title' as const, seoField: 'title' },
              { label: 'Description', field: 'description' as const, seoField: 'description' },
            ].map(({ label, field, seoField }) => {
              const f = result[field];
              return (
                <div key={field} className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[12px]">
                  <div className="flex items-center gap-[6px] mb-[8px]">
                    <span className="font-['Noto_Sans'] text-[11px] text-white font-semibold">{label}</span>
                    <span className={`font-['Noto_Sans'] text-[9px] font-medium px-[5px] py-[1px] rounded ${avaliacaoBg(f.avaliacao)} ${avaliacaoColor(f.avaliacao)}`}>
                      {f.avaliacao}
                    </span>
                  </div>
                  <p className="font-['Noto_Sans'] text-[10px] text-white/40 mb-[6px] leading-[14px]">{f.detalhe}</p>
                  {f.sugestao && (
                    <div className="bg-[#111] border border-[#a57255]/15 rounded-lg p-[8px]">
                      <p className="font-['Noto_Sans'] text-[10px] text-[#a57255]/80 mb-[6px] leading-[14px]">
                        Sugestão: {f.sugestao}
                      </p>
                      <button
                        onClick={() => onChange(`seo.${selectedPage}.${seoField}`, f.sugestao)}
                        className="font-['Noto_Sans'] text-[9px] text-[#a57255] border border-[#a57255]/30 px-[8px] py-[2px] rounded hover:bg-[#a57255]/10 transition-colors"
                      >
                        Aplicar sugestão
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Keyword */}
          <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[12px]">
            <div className="flex items-center gap-[6px] mb-[4px]">
              <span className="font-['Noto_Sans'] text-[11px] text-white font-semibold">Keyword</span>
              <span className={`font-['Noto_Sans'] text-[9px] font-medium px-[5px] py-[1px] rounded ${avaliacaoBg(result.keyword.avaliacao)} ${avaliacaoColor(result.keyword.avaliacao)}`}>
                {result.keyword.avaliacao}
              </span>
            </div>
            <p className="font-['Noto_Sans'] text-[10px] text-white/40 leading-[14px]">{result.keyword.detalhe}</p>
          </div>

          {/* Quick wins */}
          {result.quick_wins?.length > 0 && (
            <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[12px]">
              <h4 className="font-['Noto_Sans'] text-[11px] text-white font-semibold mb-[8px] flex items-center gap-[5px]">
                <Zap size={12} className="text-[#a57255]" />
                Próximos passos
              </h4>
              <div className="space-y-[4px]">
                {result.quick_wins.map((win, i) => (
                  <div key={i} className="flex items-start gap-[6px]">
                    <span className="font-['Noto_Sans'] text-[10px] text-[#a57255]/60 shrink-0 mt-[1px]">→</span>
                    <span className="font-['Noto_Sans'] text-[10px] text-white/50 leading-[14px]">{win}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Análise em lote */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[14px]">
        <div className="flex items-center justify-between mb-[10px]">
          <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white flex items-center gap-[5px]">
            <BarChart3 size={12} className="text-[#a57255]" />
            Analisar todas as páginas
          </h3>
          <button
            onClick={analyzeAll}
            disabled={!currentProvider || !!batchProgress}
            className="flex items-center gap-[5px] h-[28px] px-[10px] border border-white/[0.08] hover:border-[#a57255]/40 text-white/50 hover:text-[#a57255] disabled:opacity-30 rounded-lg font-['Noto_Sans'] text-[10px] transition-colors"
          >
            {batchProgress
              ? `${batchProgress.current}/${batchProgress.total} páginas...`
              : <><RefreshCw size={11} /> Iniciar análise em lote</>
            }
          </button>
        </div>

        {batchProgress && (
          <div className="w-full bg-white/[0.04] rounded-full h-[4px] mb-[10px]">
            <div
              className="bg-[#a57255] h-[4px] rounded-full transition-all duration-300"
              style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
            />
          </div>
        )}

        {batchResults.length > 0 && (
          <div className="divide-y divide-white/[0.03]">
            {batchResults.map(r => (
              <div
                key={r.pageId}
                className="flex items-center gap-[8px] py-[6px] cursor-pointer hover:bg-white/[0.01] transition-colors rounded px-[4px]"
                onClick={() => { setSelectedPage(r.pageId); setResult(null); }}
              >
                <span
                  className="font-['Noto_Sans'] text-[11px] font-semibold w-[32px] text-right tabular-nums shrink-0"
                  style={{ color: r.score >= 80 ? '#22c55e' : r.score >= 50 ? '#eab308' : '#ef4444' }}
                >
                  {r.score}
                </span>
                <span className="font-['Noto_Sans'] text-[11px] text-white/70 flex-1 truncate">{r.label}</span>
                <span className={`font-['Noto_Sans'] text-[9px] shrink-0 ${avaliacaoColor(r.titleStatus)}`}>T: {r.titleStatus}</span>
                <span className={`font-['Noto_Sans'] text-[9px] shrink-0 ${avaliacaoColor(r.descStatus)}`}>D: {r.descStatus}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

MODIFICAÇÃO 3 — Aba "Histórico SEO"
Arquivo: src/app/components/SeoPanel.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 1 — Adicionar utilitários de histórico
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Logo após os imports, antes de qualquer função ou tipo, adicione:

const SEO_HISTORY_KEY = 'seo_history_v1';
const SEO_HISTORY_MAX = 30;

interface SeoHistoryEntry {
  timestamp: number;
  label: string;
  changes: { key: string; from: string; to: string }[];
  snapshot: Record<string, string>;
}

function loadSeoHistory(): SeoHistoryEntry[] {
  try { return JSON.parse(localStorage.getItem(SEO_HISTORY_KEY) || '[]'); }
  catch { return []; }
}

export function saveSeoHistoryEntry(
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
    snapshot: Object.fromEntries(seoKeys.map(k => [k, newData[k] || ''])),
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
PASSO 2 — Adicionar 'historico' ao tipo SeoTab e lista de abas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Atualize o tipo SeoTab (já modificado na MODIFICAÇÃO 2) para incluir
'historico':
  type SeoTab = 'dashboard' | 'metatags' | 'analise' | 'checklist' | 'jsonld' | 'ia' | 'historico';

No array tabs, adicione ao final:
  { id: 'historico' as SeoTab, label: 'Histórico', icon: <History size={14} /> }

Importe History de lucide-react se ainda não estiver importado.

No bloco de renderização das abas, adicione após o bloco do 'ia':
  {activeTab === 'historico' && (
    <SeoHistoryTab data={data} onChange={onChange} />
  )}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 3 — Criar o componente SeoHistoryTab
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adicione antes do export default no final do arquivo:

function SeoHistoryTab({ data, onChange }: { data: Record<string, string>; onChange: (key: string, value: string) => void }) {
  const [history, setHistory] = useState<SeoHistoryEntry[]>(loadSeoHistory);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [confirmRestore, setConfirmRestore] = useState<number | null>(null);
  const [restoredId, setRestoredId] = useState<number | null>(null);

  const clearHistory = () => {
    if (!confirm('Limpar todo o histórico? Esta ação não pode ser desfeita.')) return;
    localStorage.removeItem(SEO_HISTORY_KEY);
    setHistory([]);
    setExpandedId(null);
  };

  const restore = (entry: SeoHistoryEntry) => {
    Object.entries(entry.snapshot).forEach(([key, value]) => onChange(key, value));
    setRestoredId(entry.timestamp);
    setConfirmRestore(null);
    setTimeout(() => setRestoredId(null), 2500);
  };

  const formatKey = (key: string) =>
    key.replace(/^seo\./, '').replace(/^site\./, 'site › ').replace(/\./g, ' › ');

  const truncate = (s: string, n = 42) =>
    s.length > n ? s.slice(0, n) + '…' : s || '(vazio)';

  return (
    <div className="space-y-[8px]">

      {/* Header */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[14px] py-[10px] flex items-center justify-between">
        <div>
          <span className="font-['Noto_Sans'] text-[12px] text-white font-medium">
            {history.length} registro{history.length !== 1 ? 's' : ''} salvos
          </span>
          <span className="font-['Noto_Sans'] text-[10px] text-white/25 ml-[8px]">
            Armazenado no navegador · máx. {SEO_HISTORY_MAX}
          </span>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="font-['Noto_Sans'] text-[10px] text-red-400/60 hover:text-red-400 transition-colors border border-red-400/20 hover:border-red-400/40 px-[8px] py-[3px] rounded"
          >
            Limpar histórico
          </button>
        )}
      </div>

      {/* Estado vazio */}
      {history.length === 0 && (
        <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl p-[40px] flex flex-col items-center text-center">
          <History size={32} className="text-white/10 mb-[12px]" />
          <p className="font-['Noto_Sans'] text-[12px] text-white/30 font-medium mb-[4px]">
            Nenhuma alteração registrada ainda
          </p>
          <p className="font-['Noto_Sans'] text-[10px] text-white/20 max-w-[260px] leading-[15px]">
            O histórico é gravado automaticamente cada vez que você salva alterações nos campos de SEO.
          </p>
        </div>
      )}

      {/* Lista de entradas */}
      {history.map(entry => (
        <div key={entry.timestamp} className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">

          {/* Header da entrada */}
          <button
            onClick={() => setExpandedId(expandedId === entry.timestamp ? null : entry.timestamp)}
            className="w-full flex items-center gap-[8px] px-[14px] py-[10px] hover:bg-white/[0.01] transition-colors text-left"
          >
            <Clock size={12} className="text-white/20 shrink-0" />
            <span className="font-['Noto_Sans'] text-[11px] text-white/60 shrink-0">
              {formatHistoryTimestamp(entry.timestamp)}
            </span>
            <span className="font-['Noto_Sans'] text-[10px] text-[#a57255]/70 flex-1 truncate">
              {entry.label}
            </span>
            <span className="font-['Noto_Sans'] text-[9px] text-white/25 bg-white/[0.04] px-[6px] py-[1px] rounded shrink-0">
              {entry.changes.length} campo{entry.changes.length !== 1 ? 's' : ''}
            </span>
            <ChevronRight
              size={12}
              className={`text-white/20 shrink-0 transition-transform ${expandedId === entry.timestamp ? 'rotate-90' : ''}`}
            />
          </button>

          {/* Corpo expandido */}
          {expandedId === entry.timestamp && (
            <div className="border-t border-white/[0.04] px-[14px] py-[10px] space-y-[6px]">

              {/* Tabela de changes */}
              <div className="space-y-[4px]">
                {entry.changes.map((c, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-[8px] items-center py-[3px]">
                    <span className="font-mono text-[9px] text-white/25 truncate">{formatKey(c.key)}</span>
                    <span className="text-white/15 text-[10px] shrink-0">→</span>
                    <div className="flex items-center gap-[4px] min-w-0">
                      <span className="font-['Noto_Sans'] text-[10px] text-red-400/50 truncate line-through">
                        {truncate(c.from)}
                      </span>
                      <span className="text-white/15 text-[9px] shrink-0">›</span>
                      <span className="font-['Noto_Sans'] text-[10px] text-emerald-400/70 truncate">
                        {truncate(c.to)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ações */}
              <div className="flex items-center gap-[8px] pt-[6px] border-t border-white/[0.04]">
                {restoredId === entry.timestamp ? (
                  <span className="font-['Noto_Sans'] text-[10px] text-emerald-400 flex items-center gap-[4px]">
                    <CheckCircle size={11} /> Estado restaurado
                  </span>
                ) : confirmRestore === entry.timestamp ? (
                  <>
                    <span className="font-['Noto_Sans'] text-[10px] text-white/40">Confirmar restauração?</span>
                    <button
                      onClick={() => restore(entry)}
                      className="font-['Noto_Sans'] text-[10px] text-red-400 border border-red-400/30 px-[8px] py-[2px] rounded hover:bg-red-400/10 transition-colors"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => setConfirmRestore(null)}
                      className="font-['Noto_Sans'] text-[10px] text-white/30 hover:text-white/50 transition-colors"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmRestore(entry.timestamp)}
                    className="flex items-center gap-[5px] font-['Noto_Sans'] text-[10px] text-white/30 hover:text-[#a57255] border border-white/[0.06] hover:border-[#a57255]/30 px-[8px] py-[2px] rounded transition-colors"
                  >
                    <RotateCcw size={10} /> Restaurar este estado
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASSO 4 — Integrar saveSeoHistoryEntry no PainelPage.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No arquivo PainelPage.tsx, faça as seguintes adições:

1. No bloco de imports, adicione:
   import { saveSeoHistoryEntry } from '../components/SeoPanel';

2. No componente PainelPage, adicione o ref:
   const previousDataRef = useRef<Record<string, string>>({});

3. No useEffect onde os dados são carregados do Supabase (o bloco que
   chama a API e faz setData com os dados carregados), após o setData,
   adicione:
   previousDataRef.current = { ...loadedData };
   (use o nome real da variável que contém os dados carregados nesse
   ponto do código)

4. Na função handleSave, logo ANTES da linha que faz o fetch PUT,
   adicione:
   saveSeoHistoryEntry(
     previousDataRef.current,
     data,
     `Salvo em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
   );
   previousDataRef.current = { ...data };