/**
 * panelDefaults.ts — Valores default de todos os campos do Painel Admin
 * 
 * Mapeamento flat: chave do painel → valor default extraido de content.ts e das paginas
 * Usado para popular o painel na primeira vez e como fallback visual.
 */

import { siteContent } from './content';
import type { ServiceData } from '../app/components/LpTemplate';

/* ─── Helper: flatten ServiceData into panel key-value pairs ─── */
function flattenServiceData(id: string, d: ServiceData): Record<string, string> {
  const out: Record<string, string> = {};
  const set = (key: string, val: string | undefined) => { if (val) out[`${id}.${key}`] = val; };

  // Hero
  set('hero.title', d.hero.title);
  if (d.hero.highlightedTitle) set('hero.highlightedTitle', d.hero.highlightedTitle);
  set('hero.subtitle', d.hero.subtitle);
  set('hero.image', d.hero.image);
  if (d.hero.ctaText) set('hero.ctaText', d.hero.ctaText);
  if (d.hero.maxWidth) set('hero.maxWidth', d.hero.maxWidth);

  // Trust
  d.trust.features.forEach((f, i) => set(`trust.feature${i + 1}`, f));
  set('trust.title', d.trust.title);
  set('trust.body', d.trust.body);

  // Parallax
  set('parallax.image', d.parallaxImage);

  // Metodo
  set('metodo.title', d.metodo.title);
  set('metodo.image', d.metodo.image);
  d.metodo.steps.forEach((s, i) => {
    set(`metodo.step${i + 1}.label`, s.label);
    set(`metodo.step${i + 1}.desc`, s.desc);
  });

  // Scenarios
  set('scenarios.title', d.scenarios.title);
  d.scenarios.items.forEach((s, i) => set(`scenarios.item${i + 1}`, s));
  set('scenarios.ctaSubtitle', d.scenarios.ctaSubtitle);
  set('scenarios.risksTitle', d.scenarios.risksTitle);
  d.scenarios.risks.forEach((r, i) => set(`scenarios.risk${i + 1}`, r));
  d.scenarios.deepDives.forEach((dd, i) => {
    set(`scenarios.deep${i + 1}.title`, dd.title);
    set(`scenarios.deep${i + 1}.text`, dd.text);
  });
  set('scenarios.stickyImage', d.scenarios.stickyImage);

  // Banners
  set('onlineBanner', d.onlineBanner);
  set('riscoBanner', d.riscoBanner);

  // Passo a Passo
  d.passoAPasso.forEach((s, i) => {
    set(`passo${i + 1}.title`, s.title);
    set(`passo${i + 1}.subtitle`, s.subtitle);
    set(`passo${i + 1}.desc`, s.description);
  });

  // Objecoes
  d.objecoes.forEach((o, i) => {
    set(`objecao${i + 1}.q`, o.q);
    set(`objecao${i + 1}.a`, o.a);
  });

  // CostCta
  set('costCta.title', d.costCta.title);
  set('costCta.bgImage', d.costCta.bgImage);

  // WhyTrust
  d.whyTrust.trustItems.forEach((t, i) => set(`whyTrust.trust${i + 1}`, t));
  d.whyTrust.consultaItems.forEach((c, i) => set(`whyTrust.consulta${i + 1}`, c));
  set('whyTrust.lidianeImage', d.whyTrust.lidianeImage);

  // Historias
  set('historias.title', d.historias.title);
  d.historias.items.forEach((h, i) => {
    set(`historias.item${i + 1}.img`, h.img);
    set(`historias.item${i + 1}.subtitle`, h.subtitle);
    set(`historias.item${i + 1}.body`, h.body);
  });

  // FAQ final
  d.faqItems.forEach((f, i) => {
    set(`faq${i + 1}.q`, f.q);
    set(`faq${i + 1}.a`, f.a);
  });

  if (d.ctaText) set('ctaText', d.ctaText);

  return out;
}

/* ─── Import LP data objects ─── */
import { divorcioData } from '../app/pages/LpDivorcioPage';
import { guardaData } from '../app/pages/LpGuardaPage';
import { pensaoData } from '../app/pages/LpPensaoPage';
import { inventarioData } from '../app/pages/LpInventarioPage';
import { uniaoData } from '../app/pages/LpUniaoEstavelPage';
import { pmesData } from '../app/pages/LpPmesPage';
import { inpiData } from '../app/pages/LpInpiPage';
import { imoveisData } from '../app/pages/ImoveisPage';

export const panelDefaults: Record<string, string> = {
  // ═══════════════════════════════════════════
  // ─── Geral do Site ───
  // ═══════════════════════════════════════════
  'site.name': siteContent.site.name,
  'site.tagline': siteContent.site.tagline,
  'site.description': siteContent.site.description,
  'site.phone': siteContent.site.phone,
  'site.email': siteContent.site.email,
  'site.address.full': siteContent.site.address.full,
  'site.address.short': siteContent.site.address.short,
  'site.address.street': siteContent.site.address.street,
  'site.address.neighborhood': siteContent.site.address.neighborhood,
  'site.address.city': siteContent.site.address.city,
  'site.address.state': siteContent.site.address.state,
  'site.address.zipCode': siteContent.site.address.zipCode,
  'site.hours.weekdays': siteContent.site.businessHours.weekdays,
  'site.hours.saturday': siteContent.site.businessHours.saturday,
  'site.social.instagram': siteContent.site.social.instagram,
  'site.social.facebook': siteContent.site.social.facebook,
  'site.social.linkedin': siteContent.site.social.linkedin,
  'site.social.tiktok': siteContent.site.social.tiktok,
  'site.social.youtube': siteContent.site.social.youtube,

  // ═══════════════════════════════════════════
  // ─── Navbar / Menu ───
  // ═══════════════════════════════════════════
  'navbar.item1.label': 'Home',
  'navbar.item2.label': 'Sobre',
  'navbar.item3.label': 'Áreas de Atuação',
  'navbar.item4.label': 'Blog',
  'navbar.item5.label': 'FAQ',
  'navbar.item6.label': 'Contato',
  'navbar.servicos.label': 'Serviços',
  'navbar.servico1.label': 'Homologação de Sentença',
  'navbar.servico2.label': 'Divórcio',
  'navbar.servico3.label': 'Imóveis',
  'navbar.servico4.label': 'Guarda e Convivência',
  'navbar.servico5.label': 'Pensão Alimentícia',
  'navbar.servico6.label': 'Inventário e Sucessões',
  'navbar.servico7.label': 'União Estável',
  'navbar.servico8.label': 'Consultoria PMEs',
  'navbar.servico9.label': 'Registro de Marca INPI',
  'navbar.extra1.label': 'Rede de Parceiros',
  'navbar.extra2.label': 'Vídeos Educativos',
  'navbar.cta.text': 'Agendar Atendimento',

  // ═══════════════════════════════════════════
  // ─── Home: Hero ───
  // ═══════════════════════════════════════════
  'home.hero.title': siteContent.hero.title,
  'home.hero.subtitle': siteContent.hero.subtitle,
  'home.hero.signature': siteContent.hero.signature,
  'home.hero.videoUrl': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'home.hero.ctaText': 'Agendar Consulta',
  'home.hero.ctaHref': '#contato',
  // NOTE: home.hero.bgImage is NOT included here because content.ts stores it
  // as a raw 'figma:asset/...' string, not a valid runtime URL. The Hero component
  // uses its own imported image as fallback.

  // ─── Home: About ───
  'home.about.title': siteContent.about.title,
  'home.about.paragraph1': siteContent.about.paragraphs[0],
  'home.about.paragraph2': siteContent.about.paragraphs[1],
  'home.about.linkText': siteContent.about.link.text,
  'home.about.linkHref': siteContent.about.link.href,
  'home.about.quote1': siteContent.about.quotes[0].text,
  'home.about.quote2': siteContent.about.quotes[1].text,

  // ─── Home: Diferenciais ───
  'home.diff.title': siteContent.differentials.title,
  'home.diff.desc': siteContent.differentials.description,
  ...Object.fromEntries(
    siteContent.differentials.items.flatMap((item, i) => [
      [`home.diff.item${i + 1}.title`, item.title],
      [`home.diff.item${i + 1}.desc`, item.description],
      [`home.diff.item${i + 1}.linkText`, item.link.text],
      [`home.diff.item${i + 1}.linkHref`, item.link.href],
    ])
  ),

  // ─── Home: Stats ───
  ...Object.fromEntries(
    siteContent.stats.flatMap((stat, i) => [
      [`home.stat${i + 1}.number`, stat.number],
      [`home.stat${i + 1}.label`, stat.label],
    ])
  ),

  // ─── Home: CTA Banner ───
  'home.cta.title': siteContent.ctaBanner.title,
  'home.cta.buttonText': siteContent.ctaBanner.buttonText,
  'home.cta.buttonHref': siteContent.ctaBanner.buttonHref,

  // ─── Home: Videos ───
  'home.videos.title': siteContent.videos.title,
  'home.videos.viewAllText': siteContent.videos.viewAllText,
  'home.videos.viewAllHref': siteContent.videos.viewAllHref,
  ...Object.fromEntries(
    siteContent.videos.items.flatMap((video, i) => [
      [`home.video${i + 1}.title`, video.title],
      [`home.video${i + 1}.desc`, video.description],
    ])
  ),

  // ─── Home: Blog/Artigos ───
  'home.articles.title': siteContent.articles.title,
  'home.articles.viewAllText': siteContent.articles.viewAllLink.text,
  'home.articles.viewAllHref': siteContent.articles.viewAllLink.href,
  ...Object.fromEntries(
    siteContent.articles.items.flatMap((article, i) => [
      [`home.article${i + 1}.day`, article.day],
      [`home.article${i + 1}.month`, article.month],
      [`home.article${i + 1}.category`, article.category],
      [`home.article${i + 1}.title`, article.title],
      [`home.article${i + 1}.href`, article.href],
    ])
  ),

  // ─── Home: Contato ───
  'home.contact.title': siteContent.contact.title,
  'home.contact.address': siteContent.contact.address,
  'home.contact.phone': siteContent.contact.phone,
  'home.contact.submitText': siteContent.contact.form.submitButton,

  // ─── Home: Servicos (Carrossel) ───
  'home.service1.title': 'Pensão Alimentícia e Execução',
  'home.service1.desc': 'Atuação completa para fixar, revisar ou cobrar alimentos com base em provas e estratégia processual. Orientação prática sobre documentos, prazos e medidas cabíveis — inclusive para situações urgentes e inadimplência recorrente.',
  'home.service2.title': 'Guarda e Plano de Convivência',
  'home.service2.desc': 'Estruturação de acordos e medidas para garantir previsibilidade, estabilidade e proteção dos vínculos familiares. Atuação com foco no melhor interesse da criança, com regras claras de convivência, férias, datas especiais e comunicação entre as partes.',
  'home.service3.title': 'Inventário e Sucessões',
  'home.service3.desc': 'Planejamento e condução do inventário com organização documental rigorosa e comunicação clara em cada etapa. Sempre que viável, prioriza-se a via extrajudicial para reduzir desgaste e tempo, preservando patrimônio e evitando conflitos familiares.',
  'home.service4.title': 'União Estável e Proteção Patrimonial',
  'home.service4.desc': 'Reconhecimento, dissolução e partilha com orientação clara sobre direitos, provas e riscos. Estruturação de acordos e medidas para evitar insegurança patrimonial e conflitos que se prolongam por falta de formalização.',
  'home.service5.title': 'Empresarial Consultivo para PMEs',
  'home.service5.desc': 'Suporte preventivo para empresários com foco em contratos, notificações e rotinas jurídicas essenciais. Modelo ideal para recorrência (retainer), reduzindo riscos e protegendo o negócio antes que o problema vire processo.',
  'home.service6.title': 'Registro de Marca no INPI',
  'home.service6.desc': 'Da busca de viabilidade ao protocolo e acompanhamento do processo, com orientação para reduzir riscos de indeferimento e conflitos. Proteja sua marca e organize sua base jurídica para crescer com mais segurança.',

  // ─── Home: Areas de Atuacao (accordion) ───
  'home.area1.number': '01',
  'home.area1.title': 'Homologacao de',
  'home.area1.subtitle': 'Sentenca Estrangeira',
  'home.area1.desc': 'Validamos no STJ decisoes judiciais obtidas no exterior, como divorcios e guardas. Atendimento agil e especializado para brasileiros em todo o mundo.',
  'home.area1.href': '/homologacao-de-sentenca-estrangeira',
  'home.area2.number': '02',
  'home.area2.title': 'Direito de Familia e',
  'home.area2.subtitle': 'Sucessoes',
  'home.area2.desc': 'Divorcio consensual ou litigioso, uniao estavel, partilha e protecao patrimonial. Estrategia clara para reduzir desgaste e evitar prejuizos na divisao de bens.',
  'home.area2.href': '/divorcio',
  'home.area3.number': '03',
  'home.area3.title': 'Imoveis e Usucapiao',
  'home.area3.desc': 'Regularizacao de imoveis sem escritura ou com documentacao irregular. Prioridade a via extrajudicial em cartorio — mais rapida e previsivel.',
  'home.area3.href': '/imoveis',
  'home.area4.number': '04',
  'home.area4.title': 'Empresarial',
  'home.area4.desc': 'Consultoria juridica para empresas: contratos, compliance, societario e protecao patrimonial. Prevencao de conflitos e suporte estrategico nas decisoes do negocio.',
  'home.area4.href': '/consultoria-empresarial-pmes',

  // ═══════════════════════════════════════════
  // ─── Footer ───
  // ═══════════════════════════════════════════
  'footer.description': siteContent.footer.description,
  'footer.newsletter.label': siteContent.footer.newsletter.label,
  'footer.newsletter.buttonText': siteContent.footer.newsletter.buttonText,
  'footer.contact.title': siteContent.footer.contact.title,
  'footer.contact.email': siteContent.footer.contact.email,
  'footer.contact.phone': siteContent.footer.contact.phone,
  'footer.location.title': siteContent.footer.location.title,
  'footer.location.address': siteContent.footer.location.address,
  ...Object.fromEntries(
    siteContent.footer.quickLinks.flatMap((link, i) => [
      [`footer.link${i + 1}.label`, link.label],
      [`footer.link${i + 1}.href`, link.href],
    ])
  ),
  'footer.ctaText': siteContent.footer.ctaLink.text,
  'footer.ctaHref': siteContent.footer.ctaLink.href,
  'footer.copyright': siteContent.footer.copyright,

  // ═══════════════════════════════════════════
  // ─── Sobre ───
  // ═══════════════════════════════════════════
  'sobre.hero.title': 'Mais de 14 anos de atuação. Experiência, estratégia e compromisso a longo prazo.',
  'sobre.hero.subtitle': 'Sobre o escritório',
  'sobre.quem.title': 'Lidiane Sousa Araújo — OAB/DF 34.876\nAdvogada Especialista em Família, Imóveis e Homologação Internacional',
  'sobre.quem.paragraph1': 'Lidiane Sousa Araújo é advogada inscrita na OAB do Distrito Federal sob o número 34.876, com registro expedido em 24 de agosto de 2011. Com mais de <strong>14 anos dedicados à advocacia</strong>, construiu uma trajetória marcada por especialidade real, método rigoroso e um atendimento que respeita profundamente a história de cada pessoa que chega ao escritório.',
  'sobre.quem.paragraph2': 'Fundadora da <strong>SA | Sousa Araújo Advocacia</strong>, com sede no Edifício Varig, Setor Comercial Norte, em Brasília, Distrito Federal, Lidiane criou o escritório com um propósito bem definido: ser a advogada que ela mesma gostaria de encontrar quando o assunto é sério, urgente e não admite erro.',
  'sobre.valores.title': 'Valores que Orientam Cada Caso',
  'sobre.valor1.title': 'Sigilo absoluto',
  'sobre.valor1.desc': 'Proteção total das informações dos clientes em todas as etapas.',
  'sobre.valor2.title': 'Discrição total',
  'sobre.valor2.desc': 'Atendimento reservado e comunicação segura.',
  'sobre.valor3.title': 'Organização rigorosa',
  'sobre.valor3.desc': 'Checklist, relatórios e comunicação em cada etapa.',
  'sobre.valor4.title': 'Atendimento humanizado',
  'sobre.valor4.desc': 'Respeito por cada história e compromisso com resultado.',
  'sobre.parceiros.title': 'Rede de Parceiros Qualificados',
  'sobre.parceiros.desc': 'Atuamos em rede com advogados e especialistas selecionados para garantir cobertura nacional e expertise complementar em cada área de demanda.',

  // Stats da Sobre
  'sobre.stat1.number': '14+',
  'sobre.stat1.label': 'Anos de\nExperiência',
  'sobre.stat2.number': '4',
  'sobre.stat2.label': 'Áreas de\nAtuação Especializada',
  'sobre.stat3.number': '30+',
  'sobre.stat3.label': 'Países\nAtendidos',
  'sobre.stat4.number': '2',
  'sobre.stat4.label': 'Modalidades de\nAtendimento',

  // Bio sub-seções (títulos)
  'sobre.bio.trajetoria.title': 'Uma Trajetória Construída Caso a Caso',
  'sobre.bio.areas.title': 'Áreas que se Conectam na Vida Real',
  'sobre.bio.metodo.title': 'Método de Trabalho',
  'sobre.bio.presencial.title': 'Presencial em Brasília. Online para o Mundo.',
  'sobre.bio.rede.title': 'Atuação em Rede',
  'sobre.bio.valores.title': 'Valores que Orientam Cada Caso',

  // Depoimentos
  'sobre.testimonial1.quote': '"Fui atendida com um cuidado que não esperava encontrar em um escritório de advocacia. Tudo foi explicado com clareza, cada etapa comunicada no prazo e o processo resolvido sem surpresas. Me senti segura do início ao fim."',
  'sobre.testimonial1.author': 'M.S',
  'sobre.testimonial1.role': 'Cliente',
  'sobre.testimonial2.quote': '"A Dra. Lidiane resolveu em poucos meses um processo de homologação que eu achei que levaria anos. Atendimento impecável, sempre disponível para tirar dúvidas e explicar cada detalhe. Recomendo com toda confiança."',
  'sobre.testimonial2.author': 'R.C',
  'sobre.testimonial2.role': 'Cliente — Homologação Internacional',
  'sobre.testimonial3.quote': '"Precisei regularizar um imóvel com situação bem complicada. A Dra. Lidiane conduziu todo o processo com muita competência e transparência. Finalmente resolvi algo que carregava há mais de 10 anos."',
  'sobre.testimonial3.author': 'A.F',
  'sobre.testimonial3.role': 'Cliente — Direito Imobiliário',
  'sobre.testimonial4.quote': '"Passei por um divórcio difícil e o suporte da Dra. Lidiane foi fundamental. Além de extremamente competente, ela demonstrou empatia e sensibilidade em cada momento. Sou muito grata por ter tido esse acompanhamento."',
  'sobre.testimonial4.author': 'C.M',
  'sobre.testimonial4.role': 'Cliente — Direito de Família',

  // Banner do escritório
  'sobre.banner.caption': 'A solução mais inteligente começa antes do processo',

  // Serviços da Sobre (14 items)
  'sobre.service1.title': 'Homologação Internacional',
  'sobre.service1.desc': 'Validamos no Brasil divórcios, guardas e decisões judiciais obtidas no exterior.',
  'sobre.service2.title': 'Divórcio Consensual e Litigioso',
  'sobre.service2.desc': 'Condução objetiva com foco em acordo, proteção patrimonial e agilidade.',
  'sobre.service3.title': 'Pensão Alimentícia',
  'sobre.service3.desc': 'Fixação, revisão e execução de alimentos com estratégia e respaldo processual.',
  'sobre.service4.title': 'Guarda e Convivência',
  'sobre.service4.desc': 'Acordos claros que protegem os filhos e garantem estabilidade para todos.',
  'sobre.service5.title': 'Inventário e Sucessões',
  'sobre.service5.desc': 'Planejamento e condução do inventário com foco em agilidade e harmonia familiar.',
  'sobre.service6.title': 'União Estável',
  'sobre.service6.desc': 'Reconhecimento, dissolução e proteção patrimonial com orientação clara sobre direitos.',
  'sobre.service7.title': 'Regularização de Imóveis',
  'sobre.service7.desc': 'Usucapião extrajudicial no cartório para regularizar sua propriedade com segurança.',
  'sobre.service8.title': 'Consultoria Empresarial',
  'sobre.service8.desc': 'Suporte jurídico preventivo e recorrente para PMEs que querem crescer protegidas.',
  'sobre.service9.title': 'Registro de Marca no INPI',
  'sobre.service9.desc': 'Da busca ao protocolo — proteção exclusiva da sua marca com acompanhamento completo.',
  'sobre.service10.title': 'Notificações Extrajudiciais',
  'sobre.service10.desc': 'Instrumento estratégico para resolver conflitos antes que virem processos judiciais.',
  'sobre.service11.title': 'Partilha de Bens',
  'sobre.service11.desc': 'Divisão patrimonial estruturada para evitar prejuízos e acelerar o desfecho do divórcio.',
  'sobre.service12.title': 'Contratos Empresariais',
  'sobre.service12.desc': 'Elaboração de contratos seguros para prestação de serviço, parceria e confidencialidade.',
  'sobre.service13.title': 'Societário Básico',
  'sobre.service13.desc': 'Alteração contratual, entrada e saída de sócios com segurança jurídica e clareza.',
  'sobre.service14.title': 'Divórcio para Brasileiros no Exterior',
  'sobre.service14.desc': 'Condução completa do processo para quem vive fora e precisa regularizar sua situação no Brasil.',

  // Blog Preview na Sobre
  'sobre.blog.title': 'Quem se informa, se protege',
  'sobre.blog.viewAllText': 'Ver todos os artigos',
  'sobre.article1.href': '/blog/imovel-sem-escritura-caminhos-regularizar-brasilia',
  'sobre.article2.href': '/blog/posso-vender-imovel-brasil-divorcio-pendente-exterior',
  'sobre.article3.href': '/blog/uniao-estavel-x-casamento-diferencas-patrimonio',

  // Título dos serviços
  'sobre.servicos.heading': 'Serviços jurídicos especializados para cada momento da sua vida',

  // ═══════════════════════════════════════════
  // ─── Areas de Atuacao ───
  // ═══════════════════════════════════════════
  'areas.hero.title': 'Conheça nossas áreas de atuação',
  'areas.hero.desc': 'A Sousa Araújo Advocacia atua em quatro grandes áreas do Direito, com foco em estratégia, organização documental e atendimento humanizado. Cada área é conduzida com o Método SAA — garantindo transparência, previsibilidade e acompanhamento em todas as etapas.',
  'areas.hero.ctaText': 'Agendar Atendimento',

  // Accordion — Area 1
  'areas.area1.title': 'Homologação de',
  'areas.area1.subtitle': 'Sentença Estrangeira',
  'areas.area1.expandedSubtitle': 'Homologação de Sentença Estrangeira',
  'areas.area1.desc': 'Validamos no STJ decisões judiciais obtidas no exterior — divórcios, guardas, inventários, pensões, adoções e outras. Atendimento ágil e especializado para brasileiros em todo o mundo, com suporte de rede parceira em mais de 30 países.',
  'areas.area1.check1': 'Divórcio e separação internacionais',
  'areas.area1.check2': 'Guarda e adoção transnacional',
  'areas.area1.check3': 'Pensão alimentícia internacional',
  'areas.area1.check4': 'Inventário e herança no exterior',
  'areas.area1.href': '/homologacao-de-sentenca-estrangeira',

  // Accordion — Area 2
  'areas.area2.title': 'Imóveis e',
  'areas.area2.subtitle': 'Usucapião',
  'areas.area2.expandedSubtitle': 'Regularização de Imóveis e Usucapião',
  'areas.area2.desc': 'Regularização de imóveis sem escritura ou com documentação irregular. Prioridade à via extrajudicial em cartório — mais rápida e previsível.',
  'areas.area2.check1': 'Usucapião extrajudicial em cartório',
  'areas.area2.check2': 'Usucapião judicial',
  'areas.area2.check3': 'Regularização fundiária',
  'areas.area2.check4': 'Notificações extrajudiciais',
  'areas.area2.href': '/imoveis',

  // Accordion — Area 3
  'areas.area3.title': 'Família e',
  'areas.area3.subtitle': 'Sucessões',
  'areas.area3.expandedSubtitle': 'Direito de Família e Sucessões',
  'areas.area3.desc': 'Divórcio consensual ou litigioso, guarda e alimentos, inventário, testamento e planejamento sucessório. Estratégia para reduzir desgaste e evitar prejuízos na divisão de bens, com prioridade à solução extrajudicial.',
  'areas.area3.check1': 'Divórcio consensual e litigioso',
  'areas.area3.check2': 'Guarda e pensão alimentícia',
  'areas.area3.check3': 'Inventário e planejamento sucessório',
  'areas.area3.check4': 'Testamento e proteção patrimonial',
  'areas.area3.href': '/divorcio',

  // Accordion — Area 4
  'areas.area4.title': 'Empresarial',
  'areas.area4.expandedSubtitle': 'Direito Empresarial',
  'areas.area4.desc': 'Consultoria jurídica para empresas: contratos, compliance, societário, proteção patrimonial e assessoria para empresários brasileiros com operações no exterior. Prevenção de conflitos e suporte estratégico nas decisões do negócio.',
  'areas.area4.check1': 'Contratos e compliance empresarial',
  'areas.area4.check2': 'Constituição e reestruturação societária',
  'areas.area4.check3': 'Proteção patrimonial para empresários',
  'areas.area4.check4': 'Assessoria jurídica preventiva',
  'areas.area4.href': '/consultoria-empresarial-pmes',

  // ServicesPanel — heading + 14 serviços
  'areas.services.heading': 'Serviços jurídicos especializados para cada momento da sua vida',
  'areas.svc1.title': 'Homologação Internacional',
  'areas.svc1.desc': 'Validamos no Brasil divórcios, guardas e decisões judiciais obtidas no exterior.',
  'areas.svc1.href': '/homologacao-de-sentenca-estrangeira',
  'areas.svc2.title': 'Divórcio Consensual e Litigioso',
  'areas.svc2.desc': 'Condução objetiva com foco em acordo, proteção patrimonial e agilidade.',
  'areas.svc2.href': '/divorcio',
  'areas.svc3.title': 'Pensão Alimentícia',
  'areas.svc3.desc': 'Fixação, revisão e execução de alimentos com estratégia e respaldo processual.',
  'areas.svc3.href': '/pensao-alimenticia',
  'areas.svc4.title': 'Guarda e Convivência',
  'areas.svc4.desc': 'Acordos claros que protegem os filhos e garantem estabilidade para todos.',
  'areas.svc4.href': '/guarda-e-plano-de-convivencia',
  'areas.svc5.title': 'Inventário e Sucessões',
  'areas.svc5.desc': 'Planejamento e condução do inventário com foco em agilidade e harmonia familiar.',
  'areas.svc5.href': '/inventario-e-sucessoes',
  'areas.svc6.title': 'União Estável',
  'areas.svc6.desc': 'Reconhecimento, dissolução e proteção patrimonial com orientação clara sobre direitos.',
  'areas.svc6.href': '/uniao-estavel',
  'areas.svc7.title': 'Regularização de Imóveis',
  'areas.svc7.desc': 'Usucapião extrajudicial no cartório para regularizar sua propriedade com segurança.',
  'areas.svc7.href': '/imoveis',
  'areas.svc8.title': 'Consultoria Empresarial',
  'areas.svc8.desc': 'Suporte jurídico preventivo e recorrente para PMEs que querem crescer protegidas.',
  'areas.svc8.href': '/consultoria-empresarial-pmes',
  'areas.svc9.title': 'Registro de Marca no INPI',
  'areas.svc9.desc': 'Da busca ao protocolo — proteção exclusiva da sua marca com acompanhamento completo.',
  'areas.svc9.href': '/registro-de-marca-inpi',
  'areas.svc10.title': 'Notificações Extrajudiciais',
  'areas.svc10.desc': 'Instrumento estratégico para resolver conflitos antes que virem processos judiciais.',
  'areas.svc10.href': '/notificacoes-extrajudiciais',
  'areas.svc11.title': 'Partilha de Bens',
  'areas.svc11.desc': 'Divisão patrimonial estruturada para evitar prejuízos e acelerar o desfecho do divórcio.',
  'areas.svc11.href': '/divorcio',
  'areas.svc12.title': 'Contratos Empresariais',
  'areas.svc12.desc': 'Elaboração de contratos seguros para prestação de serviço, parceria e confidencialidade.',
  'areas.svc12.href': '/consultoria-empresarial-pmes',
  'areas.svc13.title': 'Societário Básico',
  'areas.svc13.desc': 'Alteração contratual, entrada e saída de sócios com segurança jurídica e clareza.',
  'areas.svc13.href': '/consultoria-empresarial-pmes',
  'areas.svc14.title': 'Divórcio para Brasileiros no Exterior',
  'areas.svc14.desc': 'Condução completa do processo para quem vive fora e precisa regularizar sua situação no Brasil.',
  'areas.svc14.href': '/homologacao-de-sentenca-estrangeira',

  // BlogPreview
  'areas.blog.heading': 'Quem se informa, se protege',
  'areas.blog.article1.title': 'Imóvel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento',
  'areas.blog.article1.category': 'Direito Imobiliário e Usucapião',
  'areas.blog.article1.day': '01',
  'areas.blog.article1.month': 'Nov',
  'areas.blog.article2.title': 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
  'areas.blog.article2.category': 'Homologação e Direito Internacional',
  'areas.blog.article2.day': '01',
  'areas.blog.article2.month': 'Nov',
  'areas.blog.article3.title': 'União Estável x Casamento: O que muda no seu patrimônio?',
  'areas.blog.article3.category': 'Direito de Família',
  'areas.blog.article3.day': '01',
  'areas.blog.article3.month': 'Nov',

  // ═══════════════════════════════════════════
  // ─── Blog ───
  // ═══════════════════════════════════════════
  'blog.hero.title': 'Blog',
  'blog.hero.subtitle': 'Quem se informa, se protege',

  // Artigos do blog (6)
  'blog.article1.title': 'Imóvel sem Escritura: 5 Caminhos Reais para Regularizar e Destravar Venda em 2026',
  'blog.article1.category': 'Direito Imobiliário e Usucapião',
  'blog.article1.desc': 'Imóvel sem escritura? Descubra os 5 caminhos reais para regularizar, incluindo usucapião extrajudicial, adjudicação compulsória e Reurb. Guia completo e atualizado para 2026.',
  'blog.article1.day': '01',
  'blog.article1.month': 'Mar',
  'blog.article1.fullDate': '1 de Março, 2026',
  'blog.article1.slug': 'imovel-sem-escritura-caminhos-regularizar-brasilia',
  'blog.article2.title': 'Posso Vender Imóvel no Brasil com Divórcio Pendente no Exterior? 5 Riscos Graves',
  'blog.article2.category': 'Homologação e Direito Internacional',
  'blog.article2.desc': 'Você fez seu divórcio no exterior e acha que está tudo resolvido — até tentar vender um imóvel no Brasil. Entenda os 5 riscos reais e como a homologação resolve.',
  'blog.article2.day': '01',
  'blog.article2.month': 'Mar',
  'blog.article2.fullDate': '1 de Março, 2026',
  'blog.article2.slug': 'posso-vender-imovel-brasil-divorcio-pendente-exterior',
  'blog.article3.title': 'União Estável x Casamento: 5 Diferenças Cruciais que Afetam Seu Patrimônio em 2026',
  'blog.article3.category': 'Direito de Família',
  'blog.article3.desc': 'Moram juntos há anos mas nunca casaram? Descubra as 5 diferenças cruciais entre união estável e casamento que impactam diretamente patrimônio, herança e direitos.',
  'blog.article3.day': '01',
  'blog.article3.month': 'Mar',
  'blog.article3.fullDate': '1 de Março, 2026',
  'blog.article3.slug': 'uniao-estavel-x-casamento-diferencas-patrimonio',
  'blog.article4.title': 'Contrato social: o que é e por que é tão importante para sua empresa',
  'blog.article4.category': 'Direito Empresarial',
  'blog.article4.desc': 'O contrato social é o documento mais fundamental de qualquer empresa. Ele define a estrutura, os sócios, as responsabilidades e as regras de funcionamento do negócio com segurança jurídica.',
  'blog.article4.day': '28',
  'blog.article4.month': 'Out',
  'blog.article4.fullDate': '28 de Outubro, 2025',
  'blog.article5.title': 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
  'blog.article5.category': 'Homologação e Direito Internacional',
  'blog.article5.desc': 'Uma dúvida frequente entre brasileiros que vivem fora do país: é possível realizar transações imobiliárias no Brasil enquanto o processo de divórcio ainda não foi concluído?',
  'blog.article5.day': '20',
  'blog.article5.month': 'Out',
  'blog.article5.fullDate': '20 de Outubro, 2025',
  'blog.article6.title': 'União Estável x Casamento: O que muda no seu patrimônio?',
  'blog.article6.category': 'Direito de Família',
  'blog.article6.desc': 'Muitos casais escolhem a união estável como alternativa ao casamento, mas nem sempre entendem as implicações patrimoniais dessa escolha.',
  'blog.article6.day': '12',
  'blog.article6.month': 'Out',
  'blog.article6.fullDate': '12 de Outubro, 2025',

  // Sidebar
  'blog.sidebar.ctaText': 'Agendar Consulta',
  'blog.sidebar.ctaName': 'Lidiane Sousa Araújo',
  'blog.sidebar.ctaDesc': 'OAB/DF 34.876 — Advogada especialista em Família, Imóveis e Homologação Internacional',

  // ═══════════════════════════════════════════
  // ─── FAQ ───
  // ═══════════════════════════════════════════
  'faq.hero.title': 'FAQ',
  'faq.section.title': 'Perguntas\nfrequentes',
  'faq.section.desc': 'Reunimos as dúvidas mais comuns dos nossos clientes, organizadas por tema. Se a sua pergunta não estiver aqui, entre em contato — a Sousa Araújo Advocacia responde com agilidade e transparência.',
  'faq.item1.q': 'Onde fica o escritório?',
  'faq.item1.a': 'O escritório da Sousa Araújo Advocacia está localizado em Brasília/DF, com atendimento presencial e online para todo o Brasil e brasileiros no exterior. Endereço: Edifício Varig — Setor Comercial Norte, quadra 04, bloco B, sala 702, 7º andar — Asa Norte, Brasília/DF.',
  'faq.item2.q': 'Vocês atendem online?',
  'faq.item2.a': 'Sim. Realizamos atendimento 100% online para clientes em qualquer cidade do Brasil e para brasileiros no exterior. Utilizamos videoconferência, e-mail e WhatsApp para garantir um atendimento próximo e eficiente, independentemente da localização do cliente.',
  'faq.item3.q': 'O que é a Consulta de Viabilidade?',
  'faq.item3.a': 'A Consulta de Viabilidade é o ponto de entrada do nosso Método SAA. Em até 72 horas após o envio da documentação inicial, o cliente recebe um relatório escrito com o diagnóstico do caso, os caminhos jurídicos disponíveis, prazo estimado e custo previsto para cada opção. Não há compromisso de contratação — apenas clareza para a tomada de decisão.',
  'faq.item4.q': 'Alliance Of Legal Experts — o que é?',
  'faq.item4.a': 'A Alliance of Legal Experts é uma rede internacional de escritórios e advogados parceiros presente em mais de 30 países. A Sousa Araújo Advocacia integra essa rede, o que nos permite atender casos que envolvam questões jurídicas transfronteiriças.',
  'faq.item5.q': 'O que é o Método SAA?',
  'faq.item5.a': 'O Método SAA é a metodologia proprietária do escritório para condução de casos complexos. Baseia-se em três pilares: (1) Diagnóstico preciso; (2) Rota clara; (3) Execução monitorada. O método reduz em média 40% o tempo de resolução.',
  'faq.item6.q': 'Quanto custa uma consulta?',
  'faq.item6.a': 'Os honorários variam de acordo com a complexidade do caso e o tipo de serviço. A Consulta de Viabilidade tem um valor fixo acessível e não implica contratação.',
  'faq.item7.q': 'Vocês garantem resultado?',
  'faq.item7.a': 'Nenhum advogado sério pode garantir resultado — e o Código de Ética da OAB proíbe expressamente essa prática. O que garantimos é rigor no diagnóstico, clareza na estratégia, transparência na comunicação e comprometimento total com a resolução do seu caso.',
  'faq.item8.q': 'Meu imóvel não tem escritura. O que fazer?',
  'faq.item8.a': 'Imóveis sem escritura não podem ser vendidos, financiados ou transmitidos com segurança. O caminho mais indicado depende da situação específica: usucapião extrajudicial, usucapião judicial ou inventário imobiliário. Agende uma Consulta de Viabilidade para identificar o melhor caminho.',

  // ═══════════════════════════════════════════
  // ─── Videos Educativos ───
  // ═══════════════════════════════════════════
  'vidpage.hero.title': 'Vídeos Educativos: Entenda Antes de Decidir',
  'vidpage.hero.desc': 'Conteúdo jurídico gratuito para ajudar você a tomar decisões mais seguras — antes mesmo de contratar um advogado.',
  'vidpage.video1.title': 'Homologação de Sentença Estrangeira',
  'vidpage.video1.desc': 'Vendeu no Brasil uma decisão obtida no exterior. Saiba como o Brasil reconhece sentenças estrangeiras e o que você precisa fazer para que valham aqui.',
  'vidpage.video2.title': 'Regularização de Imóvel sem Escritura — Usucapião',
  'vidpage.video2.desc': 'Muitos imóveis no Brasil não têm escritura, bloqueando financiamento, venda e herança. Entenda os caminhos para regularizar.',
  'vidpage.video3.title': 'Divórcio Consensual e Litigioso',
  'vidpage.video3.desc': 'Conheça as diferenças entre divórcio consensual e litigioso, os documentos necessários, prazos estimados e como proteger seus filhos e patrimônio.',
  'vidpage.video4.title': 'Homologação de Sentença Consular',
  'vidpage.video4.desc': 'Existe uma rota alternativa para homologar decisões em países com convênio com o Brasil.',
  'vidpage.video5.title': 'Regularização de Imóvel sem Escritura — Usucapião',
  'vidpage.video5.desc': 'Imóvel herdado sem registro, comprado "de boca" ou por contrato de gaveta? Mostramos como identificar o melhor caminho.',
  'vidpage.video6.title': 'Divórcio Consensual e Litigioso',
  'vidpage.video6.desc': 'Quando o casal não chega a um acordo, o divórcio litigioso pode se tornar longo e custoso. Conheça as estratégias.',
  'vidpage.video7.title': 'Planejamento Patrimonial antes do Casamento',
  'vidpage.video7.desc': 'O regime de bens escolhido no casamento define o que acontece com seu patrimônio em caso de separação ou falecimento.',
  'vidpage.video8.title': 'Inventário Imobiliário: como destravar a herança',
  'vidpage.video8.desc': 'Imóvel sem inventário não pode ser vendido ou transferido. Veja o passo a passo do inventário extrajudicial.',
  'vidpage.video9.title': 'Proteção Patrimonial para Empresários',
  'vidpage.video9.desc': 'Como estruturar seu patrimônio pessoal de forma a protegê-lo de riscos empresariais?',

  // ═══════════════════════════════════════════
  // ─── Contato ───
  // ══════════════════════════════════════════
  'contato.map.alt': 'Localização do Escritório Sousa Araújo Advocacia',

  // Contato — formulário (usado pelo componente Contact.tsx)
  'contato.title': 'Fale Conosco\nAgende sua Consulta',
  'contato.address': 'Edifício Varig - Asa Norte, Brasília - DF, 70714-020',
  'contato.phone': '+55 61 99599-1322',
  'contato.email': 'contato@sousaaraujo.adv.br',
  'contato.submitText': 'Enviar Mensagem',
  'contato.successMessage': 'Mensagem enviada com sucesso! Entraremos em contato em breve.',

  // ═══════════════════════════════════════════
  // ─── Rede de Parceiros ───
  // ═══════════════════════════════════════════
  'parceiros.hero.title': 'Rede de Parceiros da Sousa Araújo Advocacia',
  'parceiros.hero.subtitle': 'A Sousa Araújo Advocacia trabalha com uma rede qualificada de parceiros para oferecer atendimento completo e integrado. Tradutores juramentados, correspondentes jurídicos, contadores e consultores empresariais fazem parte do nosso ecossistema de confiança — sempre com identificação profissional e alinhamento ao nosso padrão de qualidade.',
  'parceiros.stat1.number': '14+',
  'parceiros.stat1.label': 'Anos de\nExperiência',
  'parceiros.stat2.number': '4',
  'parceiros.stat2.label': 'Áreas de Atuação\nEspecializada',
  'parceiros.stat3.number': '30+',
  'parceiros.stat3.label': 'Países\nAtendidos',
  'parceiros.stat4.number': '2',
  'parceiros.stat4.label': 'Modalidades de\nAtendimento',

  // Bio section headings
  'parceiros.bio.heading': 'Lidiane Sousa Araújo — OAB/DF 34.876\nFundadora da SA | Sousa Araújo Advocacia',
  'parceiros.bio.allianceTitle': 'Alliance of Legal Experts',
  'parceiros.bio.metodoTitle': 'O Método SAA como Base da Parceria',
  'parceiros.bio.perfilTitle': 'Perfil do Parceiro Ideal',
  'parceiros.bio.comoTitle': 'Como Funciona a Parceria',
  'parceiros.bio.ctaText': 'Iniciar contato como parceiro',

  // FAQ
  'parceiros.faq.title': 'Perguntas\nfrequentes',
  'parceiros.faq.desc': 'Reunimos as dúvidas mais comuns dos nossos clientes. Se a sua pergunta não estiver aqui, entre em contato — a Sousa Araújo Advocacia responde com agilidade e transparência.',
  'parceiros.faq1.q': 'Onde fica o escritório?',
  'parceiros.faq1.a': 'O escritório da Sousa Araújo Advocacia está localizado em Brasília/DF — Edifício Varig, Setor Comercial Norte, quadra 04, bloco B, sala 702, 7º andar — Asa Norte, Brasília/DF. Atendemos presencialmente e online para todo o Brasil e brasileiros no exterior.',
  'parceiros.faq2.q': 'Vocês atendem online?',
  'parceiros.faq2.a': 'Sim. Realizamos atendimento 100% online para clientes em qualquer cidade do Brasil e para brasileiros no exterior. Utilizamos videoconferência, e-mail e WhatsApp para garantir um atendimento próximo e eficiente, independentemente da localização do cliente.',
  'parceiros.faq3.q': 'O que é a Consulta de Viabilidade?',
  'parceiros.faq3.a': 'A Consulta de Viabilidade é o ponto de entrada do nosso Método SAA. Em até 72 horas após o envio da documentação inicial, o cliente recebe um relatório escrito com o diagnóstico do caso, os caminhos jurídicos disponíveis, prazo estimado e custo previsto para cada opção.',
  'parceiros.faq4.q': 'Alliance Of Legal Experts — o que é?',
  'parceiros.faq4.a': 'A Alliance of Legal Experts é uma rede internacional de escritórios e advogados parceiros presente em mais de 30 países. A Sousa Araújo Advocacia integra essa rede, permitindo atender casos que envolvam questões jurídicas transfronteiriças.',
  'parceiros.faq5.q': 'O que é o Método SAA?',
  'parceiros.faq5.a': 'O Método SAA é a metodologia proprietária do escritório para condução de casos complexos. Baseia-se em três pilares: (1) Diagnóstico preciso; (2) Rota clara — sequência de etapas e prazos; (3) Execução monitorada — atualizações periódicas e acesso transparente ao andamento.',
  'parceiros.faq6.q': 'Quanto custa uma consulta?',
  'parceiros.faq6.a': 'O investimento na Consulta de Viabilidade é fixo e informado previamente. Ao final, você recebe um relatório detalhado com os caminhos jurídicos, custos estimados e prazos — sem compromisso de contratação.',
  'parceiros.faq7.q': 'Vocês garantem resultado?',
  'parceiros.faq7.a': 'Nenhum advogado ético garante resultado, pois o desfecho depende do Poder Judiciário. O que garantimos é organização, estratégia, comunicação transparente e dedicação máxima ao seu caso.',
  'parceiros.faq8.q': 'Meu imóvel não tem escritura. O que fazer?',
  'parceiros.faq8.a': 'Existem diferentes caminhos para regularização: usucapião extrajudicial no cartório, usucapião judicial, adjudicação compulsória ou regularização fundiária. O caminho certo depende da sua situação específica — a Consulta de Viabilidade vai indicar a melhor rota.',

  // CTA
  'parceiros.cta.title': 'Seja um Parceiro da Sousa Araújo Advocacia',
  'parceiros.cta.desc': 'Se você é tradutor juramentado, correspondente jurídico, contador, consultor empresarial ou profissional técnico e deseja integrar nossa rede de parceiros, entre em contato. Valorizamos profissionais comprometidos com qualidade, ética, prazo e comunicação transparente.',
  'parceiros.cta.buttonText': 'Seja parceiro',

  // Blog Preview
  'parceiros.blog.heading': 'Quem se informa, se protege',
  'parceiros.blog.article1.title': 'Imóvel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento',
  'parceiros.blog.article1.category': 'Direito Imobiliário e Usucapião',
  'parceiros.blog.article1.date': '01 Nov',
  'parceiros.blog.article2.title': 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
  'parceiros.blog.article2.category': 'Homologação e Direito Internacional',
  'parceiros.blog.article2.date': '01 Nov',
  'parceiros.blog.article3.title': 'União Estável x Casamento: O que muda no seu patrimônio?',
  'parceiros.blog.article3.category': 'Direito de Família',
  'parceiros.blog.article3.date': '01 Nov',

  // ═══════════════════════════════════════════
  // ─── Service Pages (via flattenServiceData) ───
  // ═══════════════════════════════════════════
  ...flattenServiceData('lp-divorcio', divorcioData),
  ...flattenServiceData('lp-guarda', guardaData),
  ...flattenServiceData('lp-pensao', pensaoData),
  ...flattenServiceData('lp-inventario', inventarioData),
  ...flattenServiceData('lp-uniao', uniaoData),
  ...flattenServiceData('lp-pmes', pmesData),
  ...flattenServiceData('lp-inpi', inpiData),
  ...flattenServiceData('lp-imoveis', imoveisData),

  // ═══════════════════════════════════════════
  // ─── LP Homologação (layout proprio) ───
  // ═══════════════════════════════════════════
  'lp-homologacao.hero.title': 'Homologação de Sentença Estrangeira em Brasília DF.',
  'lp-homologacao.hero.highlightedTitle': 'Atendimento Online Mundial',
  'lp-homologacao.hero.subtitle': 'Seu divórcio, guarda ou decisão judicial obtida no exterior só tem validade no Brasil após homologação pelo STJ. Na SA Advocacia, cuidamos de todo o processo com organização documental rigorosa e atendimento online para brasileiros em qualquer lugar do mundo.',
  'lp-homologacao.trust.feature1': 'Atendimento 100% online, de qualquer país, com segurança',
  'lp-homologacao.trust.feature2': 'Organização documental completa antes do protocolo',
  'lp-homologacao.trust.feature3': '14+ anos de experiência em Família e Direito Internacional',
  'lp-homologacao.trust.title': 'Por Que Confiar na Sousa Araújo Advocacia em Brasília',
  'lp-homologacao.trust.body': 'Com 14 anos de atuação em Direito de Família e experiência consolidada em processos internacionais, a SA | Sousa Araújo Advocacia desenvolveu um fluxo próprio para homologação de sentença estrangeira em Brasília DF.',
  'lp-homologacao.metodo.title': 'Método SAA (Sousa Araújo Advocacia) Aplicado a Homologação de Sentença Estrangeira (STJ)',
  'lp-homologacao.metodo.step1.label': 'S: Seleção do Caminho Correto',
  'lp-homologacao.metodo.step1.desc': 'Analisamos sua sentença estrangeira, identificamos o tipo de decisão (divórcio, guarda, alimentos), verificamos se há necessidade de apostilamento ou consularização e definimos a melhor rota processual.',
  'lp-homologacao.metodo.step2.label': 'A: Arquitetura Documental',
  'lp-homologacao.metodo.step2.desc': 'Montamos o dossiê completo: tradução juramentada, apostila de Haia, procuração, petição ao STJ. Você não precisa ter tudo pronto. Nós guiamos documento por documento.',
  'lp-homologacao.metodo.step3.label': 'A: Acompanhamento e Ação Técnica',
  'lp-homologacao.metodo.step3.desc': 'Protocolo no STJ, acompanhamento processual com relatórios periódicos, resposta a eventuais exigências do MP e do relator, até a decisão final.',
  'lp-homologacao.scenarios.title': 'Você Se Reconhece em Algum Desses Cenários?',
  'lp-homologacao.scenarios.item1': 'Divorciou-se nos EUA, Europa ou outro país e não sabe se o divórcio vale no Brasil',
  'lp-homologacao.scenarios.item2': 'Precisa atualizar o estado civil no registro brasileiro, mas a sentença é estrangeira',
  'lp-homologacao.scenarios.item3': 'Tem filhos e a decisão de guarda foi feita no exterior — precisa que valha aqui',
  'lp-homologacao.scenarios.item4': 'Quer vender ou partilhar bens no Brasil, mas o divórcio foi feito fora',
  'lp-homologacao.scenarios.item5': 'Já tentou resolver sozinho no STJ e o processo foi indeferido por erro documental',
  'lp-homologacao.scenarios.item6': 'Mora no exterior e não sabe como conduzir o processo à distância',
  'lp-homologacao.scenarios.ctaSubtitle': 'Se você se identificou, a Consulta de Viabilidade é o primeiro passo.',
  'lp-homologacao.scenarios.risksTitle': 'Os Principais Pontos de Atenção Nesse Processo',
  'lp-homologacao.scenarios.risk1': 'Estado civil desatualizado no Brasil: você continua legalmente casado(a), o que impede novo casamento e gera complicações patrimoniais',
  'lp-homologacao.scenarios.risk2': 'Impossibilidade de partilhar bens no Brasil: imóveis e contas ficam bloqueados',
  'lp-homologacao.scenarios.risk3': 'Decisão de guarda sem validade: a regulamentação definida no exterior não tem força executória no Brasil',
  'lp-homologacao.scenarios.risk4': 'Risco de indeferimento por vício documental: petições mal instruídas geram perda de tempo',
  'lp-homologacao.scenarios.deep1.title': 'Homologação de divórcio feito no exterior no Brasil',
  'lp-homologacao.scenarios.deep1.text': 'Esse é um dos temas mais frequentes entre nossos clientes. Na Consulta de Viabilidade, esclarecemos dúvidas e apresentamos plano de ação claro.',
  'lp-homologacao.scenarios.deep2.title': 'Como homologar sentença estrangeira no STJ',
  'lp-homologacao.scenarios.deep2.text': 'Na Consulta de Viabilidade, a Sousa Araújo Advocacia define a melhor estratégia e apresenta plano de ação organizado.',
  'lp-homologacao.scenarios.deep3.title': 'Documentos necessários para homologação de sentença estrangeira',
  'lp-homologacao.scenarios.deep3.text': 'A lista pode parecer extensa, mas você não precisa ter tudo pronto. Entregamos checklist personalizado e orientamos a obtenção por etapas.',
  'lp-homologacao.onlineBanner': 'Atendimento 100% online de qualquer país, com a mesma segurança de um escritório presencial.',
  'lp-homologacao.riscoBanner': 'O maior risco não é o custo do processo. É o custo de não resolver.',
  'lp-homologacao.passo1.title': 'Consulta de Viabilidade',
  'lp-homologacao.passo1.subtitle': 'Consulta de Viabilidade',
  'lp-homologacao.passo1.desc': 'Analisamos sua sentença estrangeira, verificamos os requisitos do STJ e definimos a rota processual mais adequada ao seu caso.',
  'lp-homologacao.passo2.title': 'Organização Documental',
  'lp-homologacao.passo2.subtitle': 'Organização Documental',
  'lp-homologacao.passo2.desc': 'Montamos o dossiê completo: tradução juramentada, apostila de Haia, procuração e demais documentos exigidos pelo STJ.',
  'lp-homologacao.passo3.title': 'Protocolo no STJ',
  'lp-homologacao.passo3.subtitle': 'Protocolo no STJ',
  'lp-homologacao.passo3.desc': 'Com a documentação completa e revisada, protocolamos a petição de homologação no Superior Tribunal de Justiça.',
  'lp-homologacao.passo4.title': 'Acompanhamento até a Decisão',
  'lp-homologacao.passo4.subtitle': 'Acompanhamento até a Decisão',
  'lp-homologacao.passo4.desc': 'Monitoramos o andamento processual, respondemos às diligências do MP e do relator, e mantemos você informado.',
  'lp-homologacao.passo5.title': 'Carta de Sentença e Execução no STJ',
  'lp-homologacao.passo5.subtitle': 'Carta de Sentença e Execução',
  'lp-homologacao.passo5.desc': 'Após a decisão favorável, providenciamos a carta de sentença e orientamos os próximos passos.',
  'lp-homologacao.objecao1.q': 'Meu divórcio foi feito no exterior, não preciso fazer nada no Brasil?',
  'lp-homologacao.objecao1.a': 'Mito. Sem a homologação, seu estado civil permanece inalterado no registro brasileiro.',
  'lp-homologacao.objecao2.q': 'O processo é muito demorado?',
  'lp-homologacao.objecao2.a': 'Com a documentação correta, o prazo médio no STJ é de 6 a 18 meses.',
  'lp-homologacao.objecao3.q': 'Documentos Necessários',
  'lp-homologacao.objecao3.a': 'Sentença estrangeira com apostilamento, tradução juramentada, certidão de trânsito em julgado, documentos de ID e procuração.',
  'lp-homologacao.objecao4.q': 'Qualquer advogado pode fazer?',
  'lp-homologacao.objecao4.a': 'Tecnicamente sim, mas exige conhecimento específico das exigências do STJ e fluência em documentação internacional.',
  'lp-homologacao.objecao5.q': 'Posso fazer sozinho no STJ?',
  'lp-homologacao.objecao5.a': 'A representação por advogado é obrigatória no STJ.',
  'lp-homologacao.objecao6.q': 'Moro no exterior e não consigo ir ao Brasil',
  'lp-homologacao.objecao6.a': 'Todo o processo pode ser conduzido 100% online. Procuração via Consulado ou apostilamento.',
  'lp-homologacao.costCta.title': 'Quem entende o processo, controla o resultado',
  'lp-homologacao.whyTrust.trust1': '14+ anos de experiência em Direito de Família e processos internacionais',
  'lp-homologacao.whyTrust.trust2': 'Atuação em Brasília/DF com alcance nacional e atendimento a brasileiros no exterior',
  'lp-homologacao.whyTrust.trust3': 'Método SAA: Seleção, Arquitetura Documental e Acompanhamento por etapas',
  'lp-homologacao.whyTrust.trust4': 'Checklist personalizado entregue na consulta de viabilidade',
  'lp-homologacao.whyTrust.trust5': 'Relatórios periódicos de acompanhamento do caso',
  'lp-homologacao.whyTrust.consulta1': 'Análise preliminar do seu caso',
  'lp-homologacao.whyTrust.consulta2': 'Definição da rota processual (cartório ou judicial)',
  'lp-homologacao.whyTrust.consulta3': 'Checklist documental personalizado',
  'lp-homologacao.historias.title': 'Histórias Reais de Quem Já Passou por Isso',
  'lp-homologacao.historias.item1.subtitle': 'Brasileira nos EUA, divorciada há 3 anos, estado civil bloqueado no Brasil',
  'lp-homologacao.historias.item1.body': 'Cliente residia nos EUA há 8 anos e obteve o divórcio em tribunal americano. Em 4 meses, a sentença foi homologada e o estado civil atualizado.',
  'lp-homologacao.historias.item2.subtitle': 'Casal binacional com guarda definida na Alemanha — decisão sem validade no Brasil',
  'lp-homologacao.historias.item2.body': 'Brasileiro casado com alemã obteve decisão de guarda compartilhada em tribunal alemão. Homologada em 5 meses.',
  'lp-homologacao.historias.item3.subtitle': 'Pedido indeferido no STJ por erro documental — recuperado com nova instrução',
  'lp-homologacao.historias.item3.body': 'Pedido indeferido por falha na tradução e ausência de apostilamento. Refizemos toda a instrução e em 3 meses a homologação foi deferida.',
  'lp-homologacao.faq1.q': 'O que é homologação de sentença estrangeira?',
  'lp-homologacao.faq1.a': 'É o procedimento pelo qual o STJ reconhece e valida uma decisão judicial estrangeira para que produza efeitos legais no Brasil.',
  'lp-homologacao.faq2.q': 'Quanto tempo demora a homologação no STJ?',
  'lp-homologacao.faq2.a': 'O prazo médio é de 6 a 18 meses, dependendo da complexidade documental.',
  'lp-homologacao.faq3.q': 'Quanto custa o processo de homologação?',
  'lp-homologacao.faq3.a': 'Honorários, custas do STJ, tradução e apostilamento. Valor informado na Consulta de Viabilidade.',
  'lp-homologacao.faq4.q': 'Preciso de advogado para homologar sentença estrangeira?',
  'lp-homologacao.faq4.a': 'Sim. A representação por advogado habilitado é obrigatória nos processos no STJ.',
  'lp-homologacao.faq5.q': 'Divórcio consensual feito no exterior precisa de homologação?',
  'lp-homologacao.faq5.a': 'Sim, independentemente de como o divórcio foi realizado no exterior.',
  'lp-homologacao.faq6.q': 'Posso homologar sentença morando fora do Brasil?',
  'lp-homologacao.faq6.a': 'Sim. Todo o processo pode ser conduzido remotamente.',
  'lp-homologacao.blog.heading': 'Quem se informa, se protege',
  'lp-homologacao.blog.article1.title': 'O que acontece se você não homologar seu divórcio estrangeiro no Brasil',
  'lp-homologacao.blog.article1.category': 'Homologação de Sentença Estrangeira',
  'lp-homologacao.blog.article1.date': '01 Nov',
  'lp-homologacao.blog.article2.title': 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?',
  'lp-homologacao.blog.article2.category': 'Direito Internacional',
  'lp-homologacao.blog.article2.date': '01 Nov',
  'lp-homologacao.blog.article3.title': 'Guarda de filhos decidida no exterior: como fazer valer no Brasil?',
  'lp-homologacao.blog.article3.category': 'Direito de Família',
  'lp-homologacao.blog.article3.date': '01 Nov',

  // ═══════════════════════════════════════════
  // ─── SEO / Meta Tags (defaults) ───
  // ═══════════════════════════════════════════
  'seo.home.title': 'Sousa Araújo Advocacia | Escritório em Brasília com Atuação Nacional',
  'seo.home.description': 'Escritório de advocacia em Brasília especializado em direito de família, imobiliário, empresarial e homologação de sentença estrangeira. Atendimento presencial e online para brasileiros no Brasil e exterior.',
  'seo.home.keyword': 'advocacia brasília',
  'seo.sobre.title': 'Sobre a Dra. Lidiane Sousa Araújo | Sousa Araújo Advocacia',
  'seo.sobre.description': 'Conheça a trajetória da Dra. Lidiane Sousa Araújo, advogada em Brasília com experiência em direito de família, sucessões e direito internacional privado.',
  'seo.sobre.keyword': 'advogada brasília',
  'seo.areas.title': 'Áreas de Atuação | Sousa Araújo Advocacia',
  'seo.areas.description': 'Conheça nossas áreas de atuação: direito de família, divórcio, guarda, pensão alimentícia, inventário, direito imobiliário, empresarial e homologação de sentença estrangeira.',
  'seo.areas.keyword': 'áreas de atuação advocacia',
  'seo.blog.title': 'Blog Jurídico | Sousa Araújo Advocacia',
  'seo.blog.description': 'Artigos, dicas e orientações jurídicas sobre direito de família, divórcio, inventário, direito imobiliário e mais. Conteúdo atualizado pela Dra. Lidiane Sousa Araújo.',
  'seo.blog.keyword': 'blog jurídico',
  'seo.faq.title': 'Perguntas Frequentes (FAQ) | Sousa Araújo Advocacia',
  'seo.faq.description': 'Tire suas dúvidas sobre divórcio, guarda de filhos, pensão alimentícia, inventário, homologação de sentença estrangeira e outros temas jurídicos.',
  'seo.faq.keyword': 'perguntas frequentes advocacia',
  'seo.contato.title': 'Contato | Sousa Araújo Advocacia — Agende sua Consulta',
  'seo.contato.description': 'Entre em contato com o escritório Sousa Araújo Advocacia em Brasília. Atendimento presencial e online. Agende sua consulta pelo WhatsApp ou formulário.',
  'seo.contato.keyword': 'contato advogado brasília',
  'seo.parceiros.title': 'Rede de Parceiros | Sousa Araújo Advocacia',
  'seo.parceiros.description': 'Conheça a rede de parceiros estratégicos do escritório Sousa Araújo Advocacia para oferecer soluções jurídicas completas aos nossos clientes.',
  'seo.parceiros.keyword': 'parceiros advocacia',
  'seo.homologacao.title': 'Homologação de Sentença Estrangeira no Brasil | Sousa Araújo Advocacia',
  'seo.homologacao.description': 'Precisa homologar uma sentença estrangeira no Brasil? Especialistas em homologação pelo STJ. Divórcio, guarda, alimentos e decisões judiciais do exterior.',
  'seo.homologacao.keyword': 'homologação sentença estrangeira',
  'seo.divorcio.title': 'Advogado de Divórcio em Brasília | Sousa Araújo Advocacia',
  'seo.divorcio.description': 'Assessoria jurídica completa em divórcio consensual e litigioso em Brasília. Partilha de bens, guarda dos filhos e pensão alimentícia.',
  'seo.divorcio.keyword': 'advogado divórcio brasília',
  'seo.guarda.title': 'Guarda de Filhos e Plano de Convivência | Sousa Araújo Advocacia',
  'seo.guarda.description': 'Especialistas em guarda compartilhada, unilateral e plano de convivência em Brasília. Proteja os direitos dos seus filhos com orientação jurídica especializada.',
  'seo.guarda.keyword': 'guarda de filhos brasília',
  'seo.pensao.title': 'Pensão Alimentícia | Sousa Araújo Advocacia em Brasília',
  'seo.pensao.description': 'Ação de alimentos, revisão e execução de pensão alimentícia em Brasília. Advogada especialista em direito de família para garantir seus direitos.',
  'seo.pensao.keyword': 'pensão alimentícia brasília',
  'seo.inventario.title': 'Inventário e Sucessões | Sousa Araújo Advocacia',
  'seo.inventario.description': 'Assessoria em inventário judicial e extrajudicial, partilha de bens e planejamento sucessório em Brasília. Resolva a sucessão com segurança jurídica.',
  'seo.inventario.keyword': 'inventário brasília',
  'seo.uniao.title': 'União Estável | Reconhecimento e Dissolução | Sousa Araújo Advocacia',
  'seo.uniao.description': 'Contrato de união estável, reconhecimento judicial e dissolução em Brasília. Proteja seus direitos patrimoniais e familiares com assessoria especializada.',
  'seo.uniao.keyword': 'união estável brasília',
  'seo.pmes.title': 'Consultoria Jurídica para PMEs | Sousa Araújo Advocacia',
  'seo.pmes.description': 'Consultoria empresarial para pequenas e médias empresas em Brasília. Contratos, societário, compliance e proteção jurídica para o seu negócio.',
  'seo.pmes.keyword': 'consultoria jurídica PME',
  'seo.inpi.title': 'Registro de Marca no INPI | Sousa Araújo Advocacia',
  'seo.inpi.description': 'Registro de marca no INPI com acompanhamento completo. Proteja sua marca com assessoria jurídica especializada em propriedade intelectual.',
  'seo.inpi.keyword': 'registro marca INPI',
  'seo.imoveis.title': 'Direito Imobiliário em Brasília | Sousa Araújo Advocacia',
  'seo.imoveis.description': 'Assessoria jurídica em compra, venda, locação, usucapião e regularização de imóveis em Brasília. Segurança nas suas transações imobiliárias.',
  'seo.imoveis.keyword': 'advogado imobiliário brasília',
  'seo.videos.title': 'Vídeos Educativos | Sousa Araújo Advocacia',
  'seo.videos.description': 'Vídeos educativos sobre direito de família, divórcio, inventário e outros temas jurídicos. Conteúdo informativo pela Dra. Lidiane Sousa Araújo.',
  'seo.videos.keyword': 'vídeos direito de família',
};

/* ─── Structured SEO defaults by page ID (used by SeoHead.tsx as fallback) ─── */
export interface SeoPageDefaults {
  title: string;
  description: string;
  keyword: string;
}

export const SEO_DEFAULTS: Record<string, SeoPageDefaults> = {
  home: {
    title: 'Sousa Araújo Advocacia | Escritório em Brasília com Atuação Nacional',
    description: 'Escritório de advocacia em Brasília especializado em direito de família, imobiliário, empresarial e homologação de sentença estrangeira. Atendimento presencial e online para brasileiros no Brasil e exterior.',
    keyword: 'advocacia brasília',
  },
  sobre: {
    title: 'Sobre a Dra. Lidiane Sousa Araújo | Sousa Araújo Advocacia',
    description: 'Conheça a trajetória da Dra. Lidiane Sousa Araújo, advogada em Brasília com experiência em direito de família, sucessões e direito internacional privado.',
    keyword: 'advogada brasília',
  },
  areas: {
    title: 'Áreas de Atuação | Sousa Araújo Advocacia',
    description: 'Conheça nossas áreas de atuação: direito de família, divórcio, guarda, pensão alimentícia, inventário, direito imobiliário, empresarial e homologação de sentença estrangeira.',
    keyword: 'áreas de atuação advocacia',
  },
  blog: {
    title: 'Blog Jurídico | Sousa Araújo Advocacia',
    description: 'Artigos, dicas e orientações jurídicas sobre direito de família, divórcio, inventário, direito imobiliário e mais. Conteúdo atualizado pela Dra. Lidiane Sousa Araújo.',
    keyword: 'blog jurídico',
  },
  faq: {
    title: 'Perguntas Frequentes (FAQ) | Sousa Araújo Advocacia',
    description: 'Tire suas dúvidas sobre divórcio, guarda de filhos, pensão alimentícia, inventário, homologação de sentença estrangeira e outros temas jurídicos.',
    keyword: 'perguntas frequentes advocacia',
  },
  contato: {
    title: 'Contato | Sousa Araújo Advocacia — Agende sua Consulta',
    description: 'Entre em contato com o escritório Sousa Araújo Advocacia em Brasília. Atendimento presencial e online. Agende sua consulta pelo WhatsApp ou formulário.',
    keyword: 'contato advogado brasília',
  },
  parceiros: {
    title: 'Rede de Parceiros | Sousa Araújo Advocacia',
    description: 'Conheça a rede de parceiros estratégicos do escritório Sousa Araújo Advocacia para oferecer soluções jurídicas completas aos nossos clientes.',
    keyword: 'parceiros advocacia',
  },
  videos: {
    title: 'Vídeos Educativos | Sousa Araújo Advocacia',
    description: 'Vídeos educativos sobre direito de família, divórcio, inventário e outros temas jurídicos. Conteúdo informativo pela Dra. Lidiane Sousa Araújo.',
    keyword: 'vídeos direito de família',
  },
  imoveis: {
    title: 'Direito Imobiliário em Brasília | Sousa Araújo Advocacia',
    description: 'Assessoria jurídica em compra, venda, locação, usucapião e regularização de imóveis em Brasília. Segurança nas suas transações imobiliárias.',
    keyword: 'advogado imobiliário brasília',
  },
  homologacao: {
    title: 'Homologação de Sentença Estrangeira no Brasil | Sousa Araújo Advocacia',
    description: 'Precisa homologar uma sentença estrangeira no Brasil? Especialistas em homologação pelo STJ. Divórcio, guarda, alimentos e decisões judiciais do exterior.',
    keyword: 'homologação sentença estrangeira',
  },
  divorcio: {
    title: 'Advogado de Divórcio em Brasília | Sousa Araújo Advocacia',
    description: 'Assessoria jurídica completa em divórcio consensual e litigioso em Brasília. Partilha de bens, guarda dos filhos e pensão alimentícia.',
    keyword: 'advogado divórcio brasília',
  },
  guarda: {
    title: 'Guarda de Filhos e Plano de Convivência | Sousa Araújo Advocacia',
    description: 'Especialistas em guarda compartilhada, unilateral e plano de convivência em Brasília. Proteja os direitos dos seus filhos com orientação jurídica especializada.',
    keyword: 'guarda de filhos brasília',
  },
  pensao: {
    title: 'Pensão Alimentícia | Sousa Araújo Advocacia em Brasília',
    description: 'Ação de alimentos, revisão e execução de pensão alimentícia em Brasília. Advogada especialista em direito de família para garantir seus direitos.',
    keyword: 'pensão alimentícia brasília',
  },
  inventario: {
    title: 'Inventário e Sucessões | Sousa Araújo Advocacia',
    description: 'Assessoria em inventário judicial e extrajudicial, partilha de bens e planejamento sucessório em Brasília. Resolva a sucessão com segurança jurídica.',
    keyword: 'inventário brasília',
  },
  uniao: {
    title: 'União Estável | Reconhecimento e Dissolução | Sousa Araújo Advocacia',
    description: 'Contrato de união estável, reconhecimento judicial e dissolução em Brasília. Proteja seus direitos patrimoniais e familiares com assessoria especializada.',
    keyword: 'união estável brasília',
  },
  pmes: {
    title: 'Consultoria Jurídica para PMEs | Sousa Araújo Advocacia',
    description: 'Consultoria empresarial para pequenas e médias empresas em Brasília. Contratos, societário, compliance e proteção jurídica para o seu negócio.',
    keyword: 'consultoria jurídica PME',
  },
  inpi: {
    title: 'Registro de Marca no INPI | Sousa Araújo Advocacia',
    description: 'Registro de marca no INPI com acompanhamento completo. Proteja sua marca com assessoria jurídica especializada em propriedade intelectual.',
    keyword: 'registro marca INPI',
  },
};