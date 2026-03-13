PROMPT A — Status Dashboard das Páginas + Heatmap de CTAs
Contexto: Painel de controle visual que mostra o estado de completude de cada página (SEO preenchido, imagens, textos editados vs. default) e um contador de cliques nos CTAs armazenado no Supabase KV.
Arquivo modificado: src/app/pages/PainelPage.tsx
Adicione uma nova seção ao painel chamada "Dashboard" que aparece
quando o admin está na visão geral (antes de selecionar qualquer página).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 1 — Seção "Dashboard" no array PAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Localize o array PAGES (ou equivalente) que contém todos os objetos de
configuração das páginas. Adicione como PRIMEIRO item do array:

  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 size={18} />,
    route: undefined,
    sections: [
      { id: 'dashboard-placeholder', title: 'Dashboard', fields: [] }
    ],
  }

Importe BarChart3 de lucide-react se ainda não estiver importado.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 2 — Renderização condicional do Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

No bloco de renderização do conteúdo principal, adicione antes do
bloco de seções normais:

  {activePage === 'dashboard' && (
    <PainelDashboard data={data} />
  )}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 3 — Componente PainelDashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adicione antes do export default do componente principal:

// Lista de páginas para avaliação de completude
// Cada item define o pageId e quais chaves representam
// SEO, imagens e textos editáveis
const DASHBOARD_PAGES = [
  { id: 'home',        label: 'Home',              seoKey: 'seo.home.title',      imageKeys: ['home.hero.bgImage'], textKeys: ['home.hero.title', 'home.hero.subtitle'] },
  { id: 'sobre',       label: 'Sobre',             seoKey: 'seo.sobre.title',     imageKeys: ['sobre.hero.bgImage'], textKeys: ['sobre.hero.title', 'sobre.intro.text1'] },
  { id: 'areas',       label: 'Áreas de Atuação',  seoKey: 'seo.areas.title',     imageKeys: ['areas.hero.bgImage'], textKeys: ['areas.hero.title'] },
  { id: 'blog',        label: 'Blog',              seoKey: 'seo.blog.title',      imageKeys: ['blog.hero.bgImage'], textKeys: ['blog.article1.title', 'blog.article2.title', 'blog.article3.title'] },
  { id: 'faq',         label: 'FAQ',               seoKey: 'seo.faq.title',       imageKeys: ['faq.hero.bgImage'], textKeys: ['faq.item1.q', 'faq.item1.a'] },
  { id: 'contato',     label: 'Contato',           seoKey: 'seo.contato.title',   imageKeys: ['contato.bgImage'], textKeys: ['contato.title', 'contato.address'] },
  { id: 'divorcio',    label: 'LP Divórcio',       seoKey: 'seo.divorcio.title',  imageKeys: ['lp.divorcio.heroImage'], textKeys: ['lp.divorcio.hero.title', 'lp.divorcio.hero.subtitle'] },
  { id: 'guarda',      label: 'LP Guarda',         seoKey: 'seo.guarda.title',    imageKeys: ['lp.guarda.heroImage'], textKeys: ['lp.guarda.hero.title'] },
  { id: 'inventario',  label: 'LP Inventário',     seoKey: 'seo.inventario.title',imageKeys: ['lp.inventario.heroImage'], textKeys: ['lp.inventario.hero.title'] },
  { id: 'homologacao', label: 'LP Homologação',    seoKey: 'seo.homologacao.title',imageKeys: [], textKeys: ['lp.homologacao.hero.title'] },
  { id: 'imoveis',     label: 'Imóveis',           seoKey: 'seo.imoveis.title',   imageKeys: [], textKeys: ['lp.imoveis.hero.title'] },
  { id: 'inpi',        label: 'LP Registro Marca', seoKey: 'seo.inpi.title',      imageKeys: [], textKeys: ['lp.inpi.hero.title'] },
  { id: 'pmes',        label: 'LP PMEs',           seoKey: 'seo.pmes.title',      imageKeys: [], textKeys: ['lp.pmes.hero.title'] },
  { id: 'parceiros',   label: 'Parceiros',         seoKey: 'seo.parceiros.title', imageKeys: [], textKeys: ['parceiros.hero.title'] },
];

// Chaves que representam CTAs rastreáveis
const CTA_KEYS = [
  { key: 'cta.clicks.home',        label: 'CTA Home — Agendar' },
  { key: 'cta.clicks.divorcio',    label: 'CTA LP Divórcio' },
  { key: 'cta.clicks.guarda',      label: 'CTA LP Guarda' },
  { key: 'cta.clicks.inventario',  label: 'CTA LP Inventário' },
  { key: 'cta.clicks.homologacao', label: 'CTA LP Homologação' },
  { key: 'cta.clicks.inpi',        label: 'CTA LP Registro Marca' },
  { key: 'cta.clicks.pmes',        label: 'CTA LP PMEs' },
  { key: 'cta.clicks.contato',     label: 'Formulário de Contato' },
];

function PainelDashboard({ data }: { data: Record<string, string> }) {

  // ── Cálculo de completude por página ──
  const pageScores = DASHBOARD_PAGES.map(page => {
    const hasSeo = !!(data[page.seoKey]?.trim());
    const hasImages = page.imageKeys.length === 0 ||
      page.imageKeys.some(k => data[k]?.trim());
    const editedTexts = page.textKeys.filter(k => data[k]?.trim()).length;
    const textPct = page.textKeys.length > 0
      ? Math.round((editedTexts / page.textKeys.length) * 100)
      : 100;
    const score = Math.round(
      (hasSeo ? 35 : 0) +
      (hasImages ? 25 : 0) +
      (textPct * 0.4)
    );
    return { ...page, hasSeo, hasImages, textPct, score };
  });

  const avgScore = Math.round(
    pageScores.reduce((acc, p) => acc + p.score, 0) / pageScores.length
  );
  const fullyReady = pageScores.filter(p => p.score >= 80).length;
  const needsWork = pageScores.filter(p => p.score < 50).length;

  // ── Dados de CTA clicks ──
  const ctaData = CTA_KEYS.map(c => ({
    ...c,
    count: parseInt(data[c.key] || '0', 10),
  })).sort((a, b) => b.count - a.count);

  const totalClicks = ctaData.reduce((acc, c) => acc + c.count, 0);
  const maxClicks = Math.max(...ctaData.map(c => c.count), 1);

  return (
    <div className="space-y-[16px]">

      {/* Header */}
      <div>
        <h2 className="font-['Noto_Sans'] text-[16px] font-semibold text-white tracking-[-0.3px]">
          Dashboard
        </h2>
        <p className="font-['Noto_Sans'] text-[11px] text-white/30 mt-[2px]">
          Visão geral do estado do site
        </p>
      </div>

      {/* Cards de resumo — 3 colunas */}
      <div className="grid grid-cols-3 gap-[8px]">
        {[
          {
            label: 'Score médio',
            value: `${avgScore}`,
            suffix: '/100',
            color: avgScore >= 80 ? '#22c55e' : avgScore >= 50 ? '#eab308' : '#ef4444',
            sub: 'completude geral do site',
          },
          {
            label: 'Páginas prontas',
            value: `${fullyReady}`,
            suffix: `/${DASHBOARD_PAGES.length}`,
            color: '#a57255',
            sub: 'score ≥ 80',
          },
          {
            label: 'Precisam atenção',
            value: `${needsWork}`,
            suffix: '',
            color: needsWork > 0 ? '#ef4444' : '#22c55e',
            sub: 'score < 50',
          },
        ].map(card => (
          <div key={card.label} className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[14px] py-[12px]">
            <p className="font-['Noto_Sans'] text-[10px] text-white/30 mb-[6px] uppercase tracking-[0.6px]">
              {card.label}
            </p>
            <div className="flex items-baseline gap-[2px]">
              <span className="font-['Noto_Sans'] text-[28px] font-bold tabular-nums leading-none" style={{ color: card.color }}>
                {card.value}
              </span>
              <span className="font-['Noto_Sans'] text-[13px] text-white/30">{card.suffix}</span>
            </div>
            <p className="font-['Noto_Sans'] text-[10px] text-white/20 mt-[4px]">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabela de status por página */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-white/[0.04] flex items-center gap-[6px]">
          <Layout size={12} className="text-[#a57255]" />
          <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white">
            Status por página
          </h3>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {pageScores.map(page => (
            <div key={page.id} className="flex items-center gap-[10px] px-[14px] py-[8px]">

              {/* Score bar */}
              <div className="w-[32px] shrink-0 text-right">
                <span
                  className="font-['Noto_Sans'] text-[11px] font-semibold tabular-nums"
                  style={{ color: page.score >= 80 ? '#22c55e' : page.score >= 50 ? '#eab308' : '#ef4444' }}
                >
                  {page.score}
                </span>
              </div>

              {/* Mini progress */}
              <div className="w-[48px] h-[3px] bg-white/[0.06] rounded-full shrink-0">
                <div
                  className="h-[3px] rounded-full transition-all"
                  style={{
                    width: `${page.score}%`,
                    background: page.score >= 80 ? '#22c55e' : page.score >= 50 ? '#eab308' : '#ef4444'
                  }}
                />
              </div>

              {/* Label */}
              <span className="font-['Noto_Sans'] text-[11px] text-white/70 flex-1 truncate">
                {page.label}
              </span>

              {/* Badges */}
              <div className="flex items-center gap-[4px] shrink-0">
                <span
                  className={`font-['Noto_Sans'] text-[9px] px-[5px] py-[1px] rounded ${
                    page.hasSeo
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-red-500/10 text-red-400/60'
                  }`}
                  title="SEO"
                >
                  SEO
                </span>
                <span
                  className={`font-['Noto_Sans'] text-[9px] px-[5px] py-[1px] rounded ${
                    page.hasImages
                      ? 'bg-blue-500/15 text-blue-400'
                      : 'bg-white/[0.04] text-white/20'
                  }`}
                  title="Imagem"
                >
                  IMG
                </span>
                <span
                  className={`font-['Noto_Sans'] text-[9px] px-[5px] py-[1px] rounded ${
                    page.textPct >= 80
                      ? 'bg-purple-500/15 text-purple-400'
                      : 'bg-white/[0.04] text-white/20'
                  }`}
                  title={`${page.textPct}% dos textos editados`}
                >
                  {page.textPct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap de CTAs */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="px-[14px] py-[10px] border-b border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <Zap size={12} className="text-[#a57255]" />
            <h3 className="font-['Noto_Sans'] text-[11px] font-semibold text-white">
              Cliques em CTAs
            </h3>
          </div>
          <span className="font-['Noto_Sans'] text-[10px] text-white/25">
            Total: {totalClicks.toLocaleString('pt-BR')}
          </span>
        </div>

        {totalClicks === 0 ? (
          <div className="px-[14px] py-[24px] text-center">
            <p className="font-['Noto_Sans'] text-[11px] text-white/25">
              Nenhum clique registrado ainda.
            </p>
            <p className="font-['Noto_Sans'] text-[10px] text-white/15 mt-[4px] max-w-[280px] mx-auto leading-[15px]">
              Para ativar o rastreamento, adicione a função
              <code className="text-[#a57255]/60 mx-[3px]">trackCta(key)</code>
              nos botões "Agendar Consulta" de cada LP.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.03]">
            {ctaData.map(cta => (
              <div key={cta.key} className="flex items-center gap-[10px] px-[14px] py-[7px]">
                <span className="font-['Noto_Sans'] text-[11px] text-white/60 flex-1 truncate">
                  {cta.label}
                </span>
                <div className="w-[80px] h-[3px] bg-white/[0.04] rounded-full shrink-0">
                  <div
                    className="h-[3px] rounded-full bg-[#a57255]"
                    style={{ width: `${(cta.count / maxClicks) * 100}%` }}
                  />
                </div>
                <span className="font-['Noto_Sans'] text-[11px] text-white/40 w-[28px] text-right tabular-nums shrink-0">
                  {cta.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nota de rodapé sobre GA4 */}
      <div className="bg-[#1a1816] border border-white/[0.06] rounded-xl px-[14px] py-[10px] flex items-start gap-[8px]">
        <Info size={12} className="text-white/20 mt-[1px] shrink-0" />
        <p className="font-['Noto_Sans'] text-[10px] text-white/25 leading-[15px]">
          Para métricas avançadas (sessões, conversões, origem do tráfego),
          configure o Google Analytics 4 e acesse o painel em
          <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-[#a57255]/60 hover:text-[#a57255] ml-[3px] transition-colors">
            analytics.google.com
          </a>.
        </p>
      </div>
    </div>
  );
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARTE 4 — Função de rastreamento de CTAs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adicione esta função utilitária exportada, que os componentes de CTA
do site podem importar para registrar cliques:

export function trackCtaClick(pageKey: string): void {
  try {
    const storageKey = `cta_pending_${pageKey}`;
    const current = parseInt(localStorage.getItem(storageKey) || '0', 10);
    localStorage.setItem(storageKey, String(current + 1));
    // O PainelPage deve ler esses valores pendentes ao carregar
    // e mesclar com os dados do KV store via onChange
  } catch { /* silencia */ }
}

No componente PainelPage, dentro do useEffect de carregamento dos dados,
após o setData, adicione a leitura dos CTAs pendentes do localStorage:

  // Mescla cliques pendentes de CTAs registrados pelo site
  const pendingKeys = Object.keys(localStorage).filter(k => k.startsWith('cta_pending_'));
  if (pendingKeys.length > 0) {
    const updates: Record<string, string> = {};
    pendingKeys.forEach(pk => {
      const pageKey = pk.replace('cta_pending_', '');
      const kvKey = `cta.clicks.${pageKey}`;
      const existing = parseInt(loadedData[kvKey] || '0', 10);
      const pending = parseInt(localStorage.getItem(pk) || '0', 10);
      if (pending > 0) {
        updates[kvKey] = String(existing + pending);
        localStorage.removeItem(pk);
      }
    });
    if (Object.keys(updates).length > 0) {
      setData(prev => ({ ...prev, ...updates }));
    }
  }