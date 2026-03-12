# Painel Administrativo — Checklist de Implementacao

> Documento de referencia para garantir cobertura total de todas as paginas,
> secoes e campos editaveis do site Sousa Araujo Advocacia.

---

## 1. INFORMACOES GERAIS DO SITE

| Campo | Fonte | Status |
|---|---|---|
| Nome do site | `content.ts > site.name` | [ ] |
| Tagline / descricao curta | `content.ts > site.tagline` | [ ] |
| Descricao longa | `content.ts > site.description` | [ ] |
| Telefone | `content.ts > site.phone` | [ ] |
| E-mail | `content.ts > site.email` | [ ] |
| Endereco completo | `content.ts > site.address.full` | [ ] |
| Endereco curto | `content.ts > site.address.short` | [ ] |
| Rua | `content.ts > site.address.street` | [ ] |
| Bairro | `content.ts > site.address.neighborhood` | [ ] |
| Cidade | `content.ts > site.address.city` | [ ] |
| Estado | `content.ts > site.address.state` | [ ] |
| CEP | `content.ts > site.address.zipCode` | [ ] |
| Horario dias uteis | `content.ts > site.businessHours.weekdays` | [ ] |
| Horario sabado | `content.ts > site.businessHours.saturday` | [ ] |
| Link Facebook | `content.ts > site.social.facebook` | [ ] |
| Link Instagram | `content.ts > site.social.instagram` | [ ] |
| Link LinkedIn | `content.ts > site.social.linkedin` | [ ] |
| Link TikTok | `content.ts > site.social.tiktok` | [ ] |
| Link YouTube | `content.ts > site.social.youtube` | [ ] |

---

## 2. NAVBAR

| Campo | Fonte | Status |
|---|---|---|
| Itens de menu (label + href) x6 | `Navbar.tsx > menuItems` | [ ] |
| CTA "Agendar Atendimento" texto | `Navbar.tsx` | [ ] |
| CTA "Agendar Atendimento" link | `Navbar.tsx` | [ ] |
| Itens dropdown LPs (label + href) x9 | `Navbar.tsx > lpItems` | [ ] |

---

## 3. HOME PAGE (11 secoes)

### 3.1 Hero
| Campo | Fonte | Status |
|---|---|---|
| Imagem de fundo | `content.ts > hero.backgroundImage` | [ ] |
| Subtitulo | `content.ts > hero.subtitle` | [ ] |
| Titulo H1 (keyword SEO) | `content.ts > hero.title` | [ ] |
| Assinatura (Allura font) | `content.ts > hero.signature` | [ ] |

### 3.2 Quem Somos (About)
| Campo | Fonte | Status |
|---|---|---|
| Titulo | `content.ts > about.title` | [ ] |
| Paragrafo 1 (HTML) | `content.ts > about.paragraphs[0]` | [ ] |
| Paragrafo 2 (HTML) | `content.ts > about.paragraphs[1]` | [ ] |
| Texto do link "Saiba Mais" | `content.ts > about.link.text` | [ ] |
| Href do link | `content.ts > about.link.href` | [ ] |
| Quote 1 (texto + cor) | `content.ts > about.quotes[0]` | [ ] |
| Quote 2 (texto + cor) | `content.ts > about.quotes[1]` | [ ] |
| Imagem principal | `content.ts > about.image` | [ ] |

### 3.3 Carrossel de Servicos (ServicesGrid)
| Campo | Fonte | Status |
|---|---|---|
| Card 1: titulo, descricao, imagem | `ServicesGrid.tsx > services[0]` | [ ] |
| Card 2: titulo, descricao, imagem | `ServicesGrid.tsx > services[1]` | [ ] |
| Card 3: titulo, descricao, imagem | `ServicesGrid.tsx > services[2]` | [ ] |
| Card 4: titulo, descricao, imagem | `ServicesGrid.tsx > services[3]` | [ ] |
| Card 5: titulo, descricao, imagem | `ServicesGrid.tsx > services[4]` | [ ] |
| Card 6: titulo, descricao, imagem | `ServicesGrid.tsx > services[5]` | [ ] |

### 3.4 Diferenciais (Differentials)
| Campo | Fonte | Status |
|---|---|---|
| Titulo da secao | `content.ts > differentials.title` | [ ] |
| Descricao da secao | `content.ts > differentials.description` | [ ] |
| Imagem principal | `content.ts > differentials.image` | [ ] |
| Imagem da equipe | `content.ts > differentials.teamImage` | [ ] |
| Diferencial 1: titulo, descricao, link | `content.ts > differentials.items[0]` | [ ] |
| Diferencial 2: titulo, descricao, link | `content.ts > differentials.items[1]` | [ ] |
| Diferencial 3: titulo, descricao, link | `content.ts > differentials.items[2]` | [ ] |
| Diferencial 4: titulo, descricao, link | `content.ts > differentials.items[3]` | [ ] |
| Galeria imagem 1 | `content.ts > differentials.gallery[0]` | [ ] |
| Galeria imagem 2 | `content.ts > differentials.gallery[1]` | [ ] |
| Galeria imagem 3 | `content.ts > differentials.gallery[2]` | [ ] |

### 3.5 Estatisticas (Stats)
| Campo | Fonte | Status |
|---|---|---|
| Stat 1: numero + label | `content.ts > stats[0]` | [ ] |
| Stat 2: numero + label | `content.ts > stats[1]` | [ ] |
| Stat 3: numero + label | `content.ts > stats[2]` | [ ] |
| Stat 4: numero + label | `content.ts > stats[3]` | [ ] |

### 3.6 Areas de Atuacao (PracticeAreas)
| Campo | Fonte | Status |
|---|---|---|
| Area 1: titulo, subtitle, descricao, imagem, numero, href | `PracticeAreas.tsx` | [ ] |
| Area 2: titulo, subtitle, descricao, imagem, numero, href | `PracticeAreas.tsx` | [ ] |
| Area 3: titulo, subtitle, descricao, imagem, numero, href | `PracticeAreas.tsx` | [ ] |
| Area 4: titulo, subtitle, descricao, imagem, numero, href | `PracticeAreas.tsx` | [ ] |

### 3.7 CTA Banner
| Campo | Fonte | Status |
|---|---|---|
| Titulo | `content.ts > ctaBanner.title` | [ ] |
| Texto do botao | `content.ts > ctaBanner.buttonText` | [ ] |
| Link do botao | `content.ts > ctaBanner.buttonHref` | [ ] |
| Imagem de fundo | `content.ts > ctaBanner.backgroundImage` | [ ] |

### 3.8 Videos
| Campo | Fonte | Status |
|---|---|---|
| Titulo da secao | `content.ts > videos.title` | [ ] |
| Texto "ver todos" | `content.ts > videos.viewAllText` | [ ] |
| Link "ver todos" | `content.ts > videos.viewAllHref` | [ ] |
| Video 1: titulo, descricao, imagem | `Videos.tsx / content.ts` | [ ] |
| Video 2: titulo, descricao, imagem | `Videos.tsx / content.ts` | [ ] |
| Video 3: titulo, descricao, imagem | `Videos.tsx / content.ts` | [ ] |

### 3.9 Blog / Artigos
| Campo | Fonte | Status |
|---|---|---|
| Titulo da secao | `content.ts > articles.title` | [ ] |
| Texto "ver todos" | `content.ts > articles.viewAllLink.text` | [ ] |
| Link "ver todos" | `content.ts > articles.viewAllLink.href` | [ ] |
| Artigo 1: dia, mes, categoria, titulo, imagem, href | `Blog.tsx / content.ts` | [ ] |
| Artigo 2: dia, mes, categoria, titulo, imagem, href | `Blog.tsx / content.ts` | [ ] |
| Artigo 3: dia, mes, categoria, titulo, imagem, href | `Blog.tsx / content.ts` | [ ] |

### 3.10 Contato
| Campo | Fonte | Status |
|---|---|---|
| Titulo | `content.ts > contact.title` | [ ] |
| Endereco | `content.ts > contact.address` | [ ] |
| Telefone | `content.ts > contact.phone` | [ ] |
| Campos do formulario (name, email, message) | `content.ts > contact.form` | [ ] |
| Texto do botao submit | `content.ts > contact.form.submitButton` | [ ] |
| Imagem de fundo | `Contact.tsx` | [ ] |

---

## 4. PAGINA SOBRE (/sobre)

| Campo | Fonte | Status |
|---|---|---|
| Hero: imagem de fundo | `SobrePage.tsx > imgHeroPortrait` | [ ] |
| Hero: titulo H1 | `SobrePage.tsx` | [ ] |
| Hero: subtitulo | `SobrePage.tsx` | [ ] |
| Secao "Quem Somos": titulo | `SobrePage.tsx` | [ ] |
| Secao "Quem Somos": paragrafos (x2+) | `SobrePage.tsx` | [ ] |
| Foto Dra. Lidiane | `SobrePage.tsx > imgLidiane` | [ ] |
| Foto equipe | `SobrePage.tsx > imgTeamPhoto` | [ ] |
| Galeria escritorio (3 imagens) | `SobrePage.tsx` | [ ] |
| Secao Valores/Diferenciais: titulo | `SobrePage.tsx` | [ ] |
| Secao Valores: itens (titulo + desc) | `SobrePage.tsx` | [ ] |
| Secao Parceiros: titulo | `SobrePage.tsx` | [ ] |
| Secao Parceiros: fotos | `SobrePage.tsx` | [ ] |
| Banner CTA: titulo, texto botao | `SobrePage.tsx` | [ ] |
| Artigos/Blog section | `SobrePage.tsx` | [ ] |

---

## 5. PAGINA AREAS DE ATUACAO (/areas-de-atuacao)

| Campo | Fonte | Status |
|---|---|---|
| Hero: imagem, titulo H1 | `AreasDeAtuacaoPage.tsx` | [ ] |
| Grid de areas: titulo, descricao, imagem, link (x4) | `AreasDeAtuacaoPage.tsx` | [ ] |
| Secao detalhamento: titulo, paragrafos | `AreasDeAtuacaoPage.tsx` | [ ] |
| Sub-areas: titulo, descricao, link para LP (x9+) | `AreasDeAtuacaoPage.tsx` | [ ] |
| Imagem escritorio | `AreasDeAtuacaoPage.tsx` | [ ] |
| CTA Banner integrado | `AreasDeAtuacaoPage.tsx` | [ ] |

---

## 6. PAGINA BLOG (/blog)

| Campo | Fonte | Status |
|---|---|---|
| Hero: imagem de fundo | `BlogPage.tsx > imgHeroBg` | [ ] |
| Hero: titulo H1 | `BlogPage.tsx` | [ ] |
| Artigos (x6): titulo, categoria, data, imagem, descricao | `BlogPage.tsx` | [ ] |
| Sidebar: imagem, texto CTA | `BlogPage.tsx` | [ ] |
| CTA Banner | `BlogPage.tsx` | [ ] |

---

## 7. PAGINA FAQ (/faq)

| Campo | Fonte | Status |
|---|---|---|
| Hero: imagem de fundo | `FaqPage.tsx > imgHero` | [ ] |
| Hero: titulo H1 | `FaqPage.tsx` | [ ] |
| Categorias de FAQ | `FaqPage.tsx` | [ ] |
| Perguntas e Respostas (q + a) por categoria | `FaqPage.tsx` | [ ] |

---

## 8. PAGINA VIDEOS EDUCATIVOS (/videos-educativos)

| Campo | Fonte | Status |
|---|---|---|
| Hero: imagem de fundo | `VideosEducativosPage.tsx > imgHeroBg` | [ ] |
| Hero: titulo H1 | `VideosEducativosPage.tsx` | [ ] |
| Videos (x9): titulo, descricao, thumbnail, link YouTube | `VideosEducativosPage.tsx` | [ ] |

---

## 9. PAGINA CONTATO (/contato)

| Campo | Fonte | Status |
|---|---|---|
| Componente Contact (reutilizado) | `Contact.tsx` | [ ] |
| Mapa: imagem estatica | `ContatoPage.tsx > imgMap` | [ ] |
| Mapa: link Google Maps | `ContatoPage.tsx` | [ ] |
| Info cards: endereco, telefone, email | `ContatoPage.tsx` | [ ] |

---

## 10. PAGINA REDE DE PARCEIROS (/rede-de-parceiros)

| Campo | Fonte | Status |
|---|---|---|
| Hero: imagem de fundo | `RedeDeParceirosPage.tsx > imgHero` | [ ] |
| Hero: titulo H1 | `RedeDeParceirosPage.tsx` | [ ] |
| Hero: subtitulo | `RedeDeParceirosPage.tsx` | [ ] |
| Stats (x4): numero + label | `RedeDeParceirosPage.tsx` | [ ] |
| FAQ parceiros: perguntas e respostas | `RedeDeParceirosPage.tsx` | [ ] |
| CTA parceiro: titulo, botao | `RedeDeParceirosPage.tsx` | [ ] |
| Sticky image | `RedeDeParceirosPage.tsx > imgSticky` | [ ] |
| Artigos reutilizados (x3) | `RedeDeParceirosPage.tsx` | [ ] |

---

## 11. LP HOMOLOGACAO (/homologacao-de-sentenca-estrangeira)

> Pagina com secoes inline (nao usa LpTemplate)

| Campo | Fonte | Status |
|---|---|---|
| Hero: titulo, subtitulo, imagem, CTA | `LpHomologacaoPage.tsx` | [ ] |
| Trust: features (x3), titulo, body | `LpHomologacaoPage.tsx` | [ ] |
| Parallax: imagem | `LpHomologacaoPage.tsx` | [ ] |
| Metodo SAA: titulo, steps (x3), imagem | `LpHomologacaoPage.tsx` | [ ] |
| Cenarios: titulo, items, CTA subtitle | `LpHomologacaoPage.tsx` | [ ] |
| Riscos: titulo, itens, deep dives | `LpHomologacaoPage.tsx` | [ ] |
| Sticky image + alt | `LpHomologacaoPage.tsx` | [ ] |
| Banner online: texto | `LpHomologacaoPage.tsx` | [ ] |
| Passo a passo (x5): numero, titulo, subtitulo, desc | `LpHomologacaoPage.tsx` | [ ] |
| Banner risco: texto | `LpHomologacaoPage.tsx` | [ ] |
| Objecoes/FAQ (x6): pergunta + resposta | `LpHomologacaoPage.tsx` | [ ] |
| CTA custo: titulo, imagem BG | `LpHomologacaoPage.tsx` | [ ] |
| Por que confiar: trust items, consulta items | `LpHomologacaoPage.tsx` | [ ] |
| Imagem Lidiane | `LpHomologacaoPage.tsx` | [ ] |
| Historias: titulo, items (x3): img, subtitle, body | `LpHomologacaoPage.tsx` | [ ] |
| FAQ final (x6+): pergunta + resposta | `LpHomologacaoPage.tsx` | [ ] |
| CTA text global | `LpHomologacaoPage.tsx` | [ ] |

---

## 12–19. LANDING PAGES (usam LpTemplate)

Cada LP abaixo segue a mesma estrutura `LpData`.
Campos identicos ao item 11, porem via `LpTemplate`.

### 12. LP Divorcio (/divorcio)
| Arquivo | Status |
|---|---|
| `LpDivorcioPage.tsx` — todos os campos LpData | [ ] |

### 13. LP Imoveis (/imoveis)
| Arquivo | Status |
|---|---|
| `ImoveisPage.tsx` — todos os campos LpData | [ ] |

### 14. LP Guarda (/guarda-e-plano-de-convivencia)
| Arquivo | Status |
|---|---|
| `LpGuardaPage.tsx` — todos os campos LpData | [ ] |

### 15. LP Pensao Alimenticia (/pensao-alimenticia)
| Arquivo | Status |
|---|---|
| `LpPensaoPage.tsx` — todos os campos LpData | [ ] |

### 16. LP Inventario (/inventario-e-sucessoes)
| Arquivo | Status |
|---|---|
| `LpInventarioPage.tsx` — todos os campos LpData | [ ] |

### 17. LP Uniao Estavel (/uniao-estavel)
| Arquivo | Status |
|---|---|
| `LpUniaoEstavelPage.tsx` — todos os campos LpData | [ ] |

### 18. LP PMEs (/consultoria-empresarial-pmes)
| Arquivo | Status |
|---|---|
| `LpPmesPage.tsx` — todos os campos LpData | [ ] |

### 19. LP INPI (/registro-de-marca-inpi)
| Arquivo | Status |
|---|---|
| `LpInpiPage.tsx` — todos os campos LpData | [ ] |

---

## 20. FOOTER

| Campo | Fonte | Status |
|---|---|---|
| Logo (SVG) | `Footer.tsx > VectorFooter` | [ ] |
| Descricao do escritorio | `content.ts > footer.description` | [ ] |
| Newsletter: label + botao | `content.ts > footer.newsletter` | [ ] |
| Iniciar Conversa: titulo | `content.ts > footer.contact.title` | [ ] |
| Iniciar Conversa: email | `content.ts > footer.contact.email` | [ ] |
| Iniciar Conversa: telefone | `content.ts > footer.contact.phone` | [ ] |
| Localizacao: titulo | `content.ts > footer.location.title` | [ ] |
| Localizacao: endereco | `content.ts > footer.location.address` | [ ] |
| Redes Sociais: links (x5) | `content.ts > site.social` | [ ] |
| Links de navegacao (x6) | `content.ts > footer.quickLinks` | [ ] |
| CTA link: texto + href | `content.ts > footer.ctaLink` | [ ] |
| Copyright / termos legais | `content.ts > footer.copyright` | [ ] |

---

## 21. COMPONENTES GLOBAIS

| Componente | Campos Editaveis | Status |
|---|---|---|
| PlayButton | Tamanho (por pagina), link do video | [ ] |
| ScrollReveal / animations | Duracao, offset, easing (config global) | [ ] |
| PageTransition | Duracao fade (config global) | [ ] |

---

## RESUMO DE COBERTURA

| Categoria | Paginas/Secoes | Campos Estimados |
|---|---|---|
| Geral do site | 1 | ~19 campos |
| Navbar | 1 | ~20 campos |
| Home (11 secoes) | 11 | ~85 campos |
| Sobre | 1 | ~20 campos |
| Areas de Atuacao | 1 | ~25 campos |
| Blog | 1 | ~15 campos |
| FAQ | 1 | ~30 campos |
| Videos Educativos | 1 | ~20 campos |
| Contato | 1 | ~8 campos |
| Rede de Parceiros | 1 | ~20 campos |
| LP Homologacao | 1 | ~60 campos |
| 8 LPs (template) | 8 | ~60 campos cada = 480 |
| Footer | 1 | ~16 campos |
| Componentes globais | 3 | ~6 campos |
| **TOTAL** | **~32 paginas/secoes** | **~840+ campos** |

---

## NOTAS DE IMPLEMENTACAO

1. O painel usa localStorage para persistir alteracoes no navegador.
2. O hook `usePanelContent.ts` (`usePanel` e `readPanel`) faz a ponte entre o painel e os componentes.
3. Componentes da Home ja conectados: Hero, About, Stats, Differentials, ServicesGrid, PracticeAreas, CtaBanner, Videos, Blog, Contact.
4. Footer ja conectado: descricao, email, telefone, endereco, copyright.
5. Polling de 2s detecta mudancas do localStorage na mesma aba; `storage` event cobre cross-tab.
6. Para producao, migrar para API backend (WordPress REST, Supabase, etc).
7. Campos de imagem aceitam URL ou upload (preview ao lado).
8. Campos HTML (paragrafos do About) usam textarea com preview.
9. Cada secao tem botao "Salvar" e "Resetar ao Original".
10. Exportar/Importar JSON completo para backup/migracao.
11. Paginas internas (Sobre, Blog, FAQ, Videos, Contato, Parceiros, Areas) e LPs tem campos mapeados no painel — para conectar ao site, replicar o padrao `usePanel`/`readPanel` nessas paginas.