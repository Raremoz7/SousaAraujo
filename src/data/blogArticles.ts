/**
 * blogArticles.ts — Conteúdo completo dos 3 artigos do blog
 * SEO-otimizado conforme documento do cliente (Março 2026 v1.0)
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TableRow {
  cells: string[];
}

export interface ContentBlock {
  type: 'paragraph' | 'heading2' | 'heading3' | 'quote' | 'list' | 'table' | 'cta';
  text?: string;        // paragraph, heading, quote, cta
  items?: string[];     // list
  headers?: string[];   // table
  rows?: TableRow[];    // table
  bold?: boolean;       // paragraph emphasis
}

export interface BlogArticle {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  category: string;
  day: string;
  month: string;
  fullDate: string;
  title: string;
  excerpt: string;
  imageIndex: number; // index into blogImages array (0-2)
  lpLink: string;
  externalLink: string;
  externalLinkLabel: string;
  content: ContentBlock[];
  faq: FaqItem[];
}

export const blogArticles: BlogArticle[] = [
  // ══════════════════════════════════════════════════════════════
  // ART-01 — Direito Imobiliário e Usucapião
  // ══════════════════════════════════════════════════════════════
  {
    slug: 'imovel-sem-escritura-caminhos-regularizar-brasilia',
    metaTitle: 'Imóvel sem Escritura: 5 Caminhos Reais para Regularizar e Destravar Venda em 2026',
    metaDescription: 'Imóvel sem escritura? Descubra os 5 caminhos reais para regularizar, incluindo usucapião extrajudicial, adjudicação compulsória e Reurb. Guia completo 2026.',
    keyword: 'imóvel sem escritura como regularizar',
    category: 'Direito Imobiliário e Usucapião',
    day: '01', month: 'Mar', fullDate: '1 de Março, 2026',
    title: 'Imóvel sem Escritura: 5 Caminhos Reais para Regularizar e Destravar Venda em 2026',
    excerpt: 'Imóvel sem escritura? Descubra os 5 caminhos reais para regularizar, incluindo usucapião extrajudicial, adjudicação compulsória e Reurb. Guia completo e atualizado para 2026.',
    imageIndex: 0,
    lpLink: '/imoveis',
    externalLink: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13465.htm',
    externalLinkLabel: 'Lei 13.465/2017 — Regularização Fundiária',
    content: [
      { type: 'paragraph', text: 'Se você mora em um imóvel há anos, paga IPTU, paga luz, paga água, mas não tem a escritura no seu nome, saiba que essa situação atinge milhões de brasileiros. No Brasil, estima-se que mais de 40 milhões de domicílios urbanos não possuem documentação regular. Isso significa que, na prática, o morador não é reconhecido como proprietário perante a lei.' },
      { type: 'paragraph', text: 'E as consequências são sérias: um imóvel sem escritura não pode ser vendido com segurança jurídica, não pode ser financiado, não pode ser dado como garantia e, em caso de falecimento do possuidor, gera complicações graves no inventário. Muita gente descobre esse problema tarde demais, quando tenta vender, herdar ou financiar o imóvel e descobre que a documentação simplesmente não existe.' },
      { type: 'paragraph', text: 'A boa notícia é que existem caminhos legais para resolver essa situação. Neste guia completo e atualizado para 2026, a Sousa Araújo Advocacia explica os 5 caminhos reais para regularizar um imóvel sem escritura em Brasília e em todo o Brasil, com linguagem clara, sem juridiquês e com orientação prática.' },

      { type: 'heading2', text: 'O que Significa Ter um Imóvel sem Escritura na Prática' },
      { type: 'paragraph', text: 'Primeiro, é importante entender a diferença entre três documentos que muita gente confunde: escritura, registro e IPTU.' },
      { type: 'paragraph', text: 'A escritura pública é o documento lavrado no Tabelionato de Notas que formaliza a transferência de propriedade entre as partes. Porém, a escritura sozinha não basta. Para que a propriedade seja efetivamente transferida, é necessário registrar essa escritura no Cartório de Registro de Imóveis. É o registro que gera a matrícula atualizada no nome do novo proprietário.' },
      { type: 'paragraph', text: 'Já o IPTU é apenas um imposto municipal. Pagar IPTU durante décadas não prova propriedade. Prova apenas que alguém está pagando um tributo sobre aquele imóvel. O carnê de IPTU no seu nome não substitui a escritura nem o registro.' },
      { type: 'paragraph', text: 'Quando dizemos "imóvel sem escritura", na maioria das vezes estamos falando de uma dessas situações: compra feita apenas por contrato particular (sem escritura pública), imóvel herdado sem inventário formalizado, posse exercida durante anos sem nenhum documento, ou loteamento irregular onde o loteador nunca providenciou a documentação.' },
      { type: 'quote', text: 'Um imóvel sem escritura vale menos no mercado, não pode ser financiado e pode ser perdido. A regularização é urgente.' },

      { type: 'heading2', text: '5 Riscos Reais de Manter um Imóvel sem Escritura' },
      { type: 'list', items: [
        'Impossibilidade de venda segura: sem matrícula atualizada, nenhum comprador prudente fecha negócio. Financiamento bancário é impossível.',
        'Impossibilidade de financiamento e garantia: o imóvel não pode ser usado como garantia de empréstimo, nem aceito em financiamento habitacional.',
        'Risco de perda: se outra pessoa comprovar posse qualificada ou se o verdadeiro proprietário registrado reivindicar o imóvel, você pode perder o bem.',
        'Complicações em inventário e herança: se o possuidor falecer, os herdeiros terão dificuldade extrema para incluir o imóvel no inventário.',
        'Desvalorização patrimonial: imóveis irregulares valem significativamente menos no mercado. A diferença pode chegar a 30% ou mais.',
      ]},
      { type: 'quote', text: 'O custo da regularização é uma fração do prejuízo de manter o imóvel irregular. Cada ano de espera é patrimônio perdido.' },

      { type: 'heading2', text: 'Caminho 1 — Usucapião Extrajudicial em Cartório (o Mais Comum em 2026)' },
      { type: 'paragraph', text: 'A usucapião extrajudicial é, hoje, o caminho mais utilizado para regularizar imóveis sem escritura no Brasil. Prevista no Código de Processo Civil (art. 216-A) e regulamentada pelo Provimento CNJ 65/2017, ela permite que a regularização seja feita diretamente no Cartório de Registro de Imóveis, sem necessidade de processo judicial.' },
      { type: 'heading3', text: 'Para Quem Serve' },
      { type: 'paragraph', text: 'A usucapião extrajudicial é indicada para quem exerce posse mansa, pacífica e ininterrupta sobre o imóvel pelo tempo exigido por lei. Os prazos variam conforme a modalidade: 5 anos para usucapião especial urbana (imóvel de até 250m², moradia própria), 10 anos para usucapião ordinária (com justo título e boa-fé), ou 15 anos para usucapião extraordinária (independe de justo título).' },
      { type: 'heading3', text: 'Como Funciona — Passo a Passo' },
      { type: 'list', items: [
        'Passo 1 — Consulta de Viabilidade: a Sousa Araújo Advocacia analisa a situação do imóvel, verifica tempo de posse, documentos existentes e define se a via extrajudicial é adequada.',
        'Passo 2 — Ata Notarial: documento lavrado pelo tabelião que atesta a posse. Inclui depoimento do possuidor e testemunhas, fotos do imóvel e comprovantes de ocupação.',
        'Passo 3 — Planta e Memorial Descritivo: elaborados por profissional habilitado (engenheiro ou arquiteto), com ART/RRT, descrevendo as dimensões e confrontações do imóvel.',
        'Passo 4 — Montagem do Dossiê: reunião de todas as certidões, comprovantes de pagamento de IPTU, contas de água e luz, contratos de compra e venda, declarações de vizinhos e demais documentos.',
        'Passo 5 — Protocolo no Cartório de Registro: o pedido é protocolado com toda a documentação. O cartório notifica os confrontantes (vizinhos), o proprietário registrado e os entes públicos.',
        'Passo 6 — Registro: se não houver impugnação, o cartório registra a propriedade em nome do requerente. Pronto: o imóvel está regularizado.',
      ]},
      { type: 'heading3', text: 'Novas Regras de 2026' },
      { type: 'paragraph', text: 'As atualizações legislativas de 2026 trouxeram avanços importantes: o silêncio do notificado passou a ser interpretado como concordância em mais situações, facilitando o processamento. Além disso, os prazos de análise foram reduzidos e o fluxo cartorário ficou mais ágil. Com isso, muitos processos que antes levavam 12 a 24 meses agora podem ser concluídos em 6 a 12 meses.' },

      { type: 'heading2', text: 'Caminho 2 — Usucapião Judicial (Quando Há Conflito)' },
      { type: 'paragraph', text: 'Quando a via extrajudicial não é possível — seja porque houve impugnação de um confrontante, porque o proprietário registrado se opôs, ou porque a situação é mais complexa — o caminho é a usucapião judicial.' },
      { type: 'paragraph', text: 'O procedimento é semelhante, mas tramita no Poder Judiciário. O prazo costuma ser maior (1 a 5 anos, dependendo da comarca), mas o resultado é o mesmo: sentença judicial que é levada ao cartório para registro da propriedade.' },

      { type: 'heading2', text: 'Caminho 3 — Adjudicação Compulsória (Quando o Vendedor Some ou Se Recusa)' },
      { type: 'paragraph', text: 'A adjudicação compulsória é o caminho para quem comprou um imóvel, pagou integralmente, mas o vendedor se recusa ou desapareceu sem outorgar a escritura. Desde a Lei 14.382/2022, pode ser feita extrajudicialmente, diretamente no cartório, quando não houver litígio.' },

      { type: 'heading2', text: 'Caminho 4 — Regularização Fundiária (Reurb)' },
      { type: 'paragraph', text: 'A Regularização Fundiária Urbana (Reurb), prevista na Lei 13.465/2017, é o caminho para regularizar núcleos urbanos informais inteiros. Existem duas modalidades: Reurb-S (interesse social), voltada para famílias de baixa renda, e Reurb-E (interesse específico), para os demais casos.' },

      { type: 'heading2', text: 'Caminho 5 — Retificação de Registro (Quando o Problema É Documental)' },
      { type: 'paragraph', text: 'Nem sempre a ausência de escritura é o problema. Em alguns casos, o imóvel tem matrícula, mas os dados estão incorretos. A retificação de registro corrige essas inconsistências diretamente no Cartório de Registro de Imóveis.' },

      { type: 'heading2', text: 'Como Saber Qual Caminho É o Certo para o Seu Caso' },
      { type: 'paragraph', text: 'Com 5 caminhos possíveis, a dúvida mais comum é: qual se aplica à minha situação? A resposta depende de vários fatores: há quanto tempo você ocupa o imóvel, como foi a aquisição, se existe ou não matrícula, se há conflito com vizinhos ou com o proprietário registrado, e qual é o objetivo.' },
      { type: 'quote', text: 'Cada situação exige uma análise específica. A Consulta de Viabilidade com a Sousa Araújo Advocacia define qual dos 5 caminhos é o mais adequado para o seu caso.' },

      { type: 'table', headers: ['Caminho', 'Prazo Estimado', 'Custo Relativo', 'Quando Usar'], rows: [
        { cells: ['Usucapião Extrajudicial', '6 a 18 meses', 'Médio', 'Posse longa, sem conflito'] },
        { cells: ['Usucapião Judicial', '1 a 5 anos', 'Médio-Alto', 'Posse longa, com conflito'] },
        { cells: ['Adjudicação Compulsória', '3 a 12 meses', 'Médio', 'Compra paga, vendedor ausente'] },
        { cells: ['Reurb', 'Variável', 'Baixo-Médio', 'Loteamento irregular, área coletiva'] },
        { cells: ['Retificação de Registro', '1 a 6 meses', 'Baixo', 'Erro documental, área divergente'] },
      ]},

      { type: 'cta', text: 'Agendar Consulta de Viabilidade' },

      { type: 'heading2', text: 'Conclusão — Não Deixe para Depois' },
      { type: 'paragraph', text: 'Se você se identificou com alguma das situações descritas neste artigo, o primeiro passo é a Consulta de Viabilidade com a Sousa Araújo Advocacia. Analisamos seu caso, definimos a melhor estratégia e apresentamos um plano de ação claro — com total sigilo e transparência.' },
    ],
    faq: [
      { question: 'Posso vender um imóvel sem escritura?', answer: 'Na prática, é possível vender por contrato particular (cessão de posse), mas o comprador não terá segurança jurídica. Bancos não financiam e cartórios não transferem sem matrícula regular. O ideal é regularizar antes de vender.' },
      { question: 'IPTU no meu nome prova que o imóvel é meu?', answer: 'Não. O IPTU é um imposto municipal que qualquer pessoa pode pagar. Ele pode ser usado como prova complementar de posse, mas não substitui a escritura nem o registro de propriedade.' },
      { question: 'Quanto tempo preciso morar no imóvel para pedir usucapião?', answer: 'Depende da modalidade: 5 anos para usucapião especial urbana (imóvel de até 250m², moradia própria), 10 anos para ordinária (com justo título) ou 15 anos para extraordinária. A Consulta de Viabilidade define qual modalidade se aplica.' },
      { question: 'Usucapião extrajudicial é mais rápida que a judicial?', answer: 'Sim. A via extrajudicial em cartório costuma levar de 6 a 18 meses, enquanto a judicial pode levar de 1 a 5 anos, dependendo da comarca e da complexidade.' },
      { question: 'Preciso de advogado para fazer usucapião em cartório?', answer: 'Sim. A legislação exige representação por advogado inscrito na OAB tanto na via extrajudicial quanto na judicial.' },
      { question: 'Posso financiar um imóvel sem escritura?', answer: 'Não. Bancos e instituições financeiras exigem matrícula atualizada no Cartório de Registro de Imóveis como condição para financiamento.' },
      { question: 'O que é ata notarial?', answer: 'É um documento lavrado pelo tabelião de notas que atesta fatos. Na usucapião, a ata notarial registra o tempo de posse, a forma de ocupação, depoimentos de testemunhas e fotos do imóvel.' },
      { question: 'Imóvel herdado sem inventário pode ser regularizado?', answer: 'Sim. Os direitos possessórios podem ser incluídos no inventário, e a regularização pode ser feita antes, durante ou após o processo de sucessão.' },
      { question: 'Quanto custa regularizar um imóvel por usucapião?', answer: 'Os custos variam conforme a complexidade, mas incluem honorários, ata notarial, planta/memorial descritivo e emolumentos do cartório. Na Consulta de Viabilidade, apresentamos estimativa detalhada.' },
      { question: 'As novas regras de 2026 facilitam a usucapião?', answer: 'Sim. As atualizações de 2026 simplificaram requisitos, agilizaram notificações e reduziram prazos no cartório. O momento é favorável para regularizar.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ART-02 — Homologação e Direito Internacional
  // ══════════════════════════════════════════════════════════════
  {
    slug: 'posso-vender-imovel-brasil-divorcio-pendente-exterior',
    metaTitle: 'Posso Vender Imóvel no Brasil com Divórcio Pendente no Exterior? 5 Riscos Graves',
    metaDescription: 'Posso vender imóvel no Brasil com divórcio feito no exterior? Entenda os 5 riscos, a homologação de sentença estrangeira no STJ e como resolver.',
    keyword: 'vender imóvel no Brasil divórcio no exterior',
    category: 'Homologação e Direito Internacional',
    day: '01', month: 'Mar', fullDate: '1 de Março, 2026',
    title: 'Posso Vender Imóvel no Brasil com Divórcio Pendente no Exterior? 5 Riscos Graves',
    excerpt: 'Você fez seu divórcio no exterior e acha que está tudo resolvido — até tentar vender um imóvel no Brasil. Entenda os 5 riscos reais e como a homologação de sentença estrangeira resolve.',
    imageIndex: 1,
    lpLink: '/homologacao-de-sentenca-estrangeira',
    externalLink: 'https://www.stj.jus.br',
    externalLinkLabel: 'Superior Tribunal de Justiça (STJ)',
    content: [
      { type: 'paragraph', text: 'Você fez seu divórcio nos Estados Unidos, na Europa ou em qualquer outro país. Está tudo resolvido por lá: sentença assinada, documentos entregues, vida seguindo. Até que você decide vender um imóvel no Brasil. Vai ao cartório, apresenta a documentação e recebe a notícia que ninguém quer ouvir: "Não podemos prosseguir. Seu estado civil consta como casado(a)."' },
      { type: 'paragraph', text: 'Essa situação é mais comum do que parece. Milhares de brasileiros que vivem ou viveram no exterior passam por isso todos os anos. O motivo é simples, mas as consequências são graves: o divórcio feito fora do Brasil não tem validade automática no território nacional. Para que produza efeitos aqui, é necessário homologar a sentença estrangeira junto ao Superior Tribunal de Justiça (STJ).' },
      { type: 'paragraph', text: 'Neste artigo, a Sousa Araújo Advocacia explica em detalhes por que isso acontece, quais são os riscos reais de tentar vender um imóvel nessa situação, e o que você precisa fazer para resolver de forma definitiva.' },

      { type: 'heading2', text: 'Por Que o Divórcio Feito no Exterior Não Vale Automaticamente no Brasil' },
      { type: 'paragraph', text: 'O sistema jurídico brasileiro exige que decisões judiciais estrangeiras passem por um processo de reconhecimento para que tenham força executória no país. Esse processo chama-se homologação de sentença estrangeira e é de competência exclusiva do STJ (Superior Tribunal de Justiça), conforme o artigo 105 da Constituição Federal.' },
      { type: 'paragraph', text: 'A lógica é de soberania nacional: o Brasil não pode simplesmente aceitar qualquer decisão de outro país sem verificar se ela atende aos requisitos mínimos de compatibilidade com a ordem jurídica brasileira. O STJ não reavalia o mérito da decisão, mas verifica requisitos formais como: se houve citação regular das partes, se a sentença transitou em julgado, se não ofende a soberania ou a ordem pública brasileira.' },
      { type: 'heading3', text: 'A Exceção do Divórcio Consensual Simples' },
      { type: 'paragraph', text: 'Existe uma exceção prevista no artigo 961, §5º do Código de Processo Civil: o divórcio consensual que trate apenas da dissolução do casamento (sem partilha de bens, sem guarda de filhos, sem pensão alimentícia) pode, em tese, ser levado diretamente ao cartório de registro civil para averbação, sem necessidade de homologação no STJ.' },
      { type: 'paragraph', text: 'Na prática, porém, a maioria dos divórcios envolve pelo menos um desses temas adicionais. E muitos cartórios, por cautela, recusam a averbação direta mesmo em casos aparentemente simples.' },
      { type: 'quote', text: 'Na dúvida, é sempre mais seguro homologar. A consulta de viabilidade define se o seu caso se encaixa na exceção ou se precisa passar pelo STJ.' },

      { type: 'heading2', text: 'O que Acontece Quando Você Tenta Vender um Imóvel Nessa Situação' },
      { type: 'paragraph', text: 'Quando você vai ao cartório de registro de imóveis para formalizar uma venda, o tabelião verifica sua certidão de estado civil. Se consta "casado(a)" porque o divórcio feito no exterior não foi averbado no Brasil, o cartório bloqueia a transação.' },

      { type: 'heading3', text: 'Os 5 Riscos Reais' },
      { type: 'list', items: [
        'Estado civil bloqueado: enquanto o divórcio não for homologado e averbado, você permanece como "casado(a)" em todos os registros brasileiros. Isso afeta a possibilidade de casar novamente no Brasil.',
        'Venda impossibilitada: o cartório não lavrará a escritura de venda sem a regularização do estado civil.',
        'Partilha de bens comprometida: se houve partilha na sentença de divórcio estrangeira, essa partilha só terá efeito no Brasil após a homologação.',
        'Herança e inventário complicados: se você falecer enquanto consta como "casado(a)", o ex-cônjuge pode ter direitos sobre seus bens no Brasil.',
        'Financiamento bancário recusado: bancos consultam a matrícula do imóvel e o estado civil do vendedor. Qualquer inconsistência impede o financiamento.',
      ]},
      { type: 'quote', text: 'O cartório bloqueia. O comprador desiste. E aí vira corrida contra o tempo. Se você tem bens no Brasil e se divorciou fora, resolva antes de precisar.' },

      { type: 'heading2', text: 'Homologação de Sentença Estrangeira — o Caminho para Resolver' },
      { type: 'paragraph', text: 'A solução é a homologação de sentença estrangeira no STJ. O procedimento, quando bem instruído, é relativamente simples e pode ser conduzido inteiramente à distância.' },
      { type: 'heading3', text: 'Documentos Necessários' },
      { type: 'list', items: [
        'Sentença estrangeira original (com comprovação de trânsito em julgado)',
        'Tradução juramentada para o português',
        'Apostilamento de Haia (para países signatários) ou consularização',
        'Procuração para advogado no Brasil',
        'Petição de homologação',
      ]},

      { type: 'heading2', text: 'Passo a Passo Completo para Resolver a Situação' },
      { type: 'list', items: [
        'Passo 1 — Consulta de Viabilidade: análise da sentença e definição se é necessária homologação no STJ ou se o caso se encaixa na exceção.',
        'Passo 2 — Organização Documental (Método SAA — Arquitetura): montagem do dossiê completo: tradução juramentada, apostilamento, procuração, certidões.',
        'Passo 3 — Protocolo no STJ: petição de homologação protocolada com toda a documentação.',
        'Passo 4 — Acompanhamento (Método SAA — Acompanhamento): monitoramento processual, resposta a exigências, relatórios periódicos ao cliente.',
        'Passo 5 — Decisão e Providências Finais: após a homologação, expedição da carta de sentença e averbação no cartório de registro civil brasileiro.',
      ]},
      { type: 'paragraph', text: 'O prazo médio para homologação de sentença estrangeira no STJ é de 2 a 6 meses quando o processo está bem instruído. O principal fator de atraso são exigências documentais não atendidas, o que o Método SAA busca prevenir com a organização documental prévia.' },

      { type: 'heading2', text: 'Atendimento 100% Online para Brasileiros no Exterior' },
      { type: 'paragraph', text: 'Na Sousa Araújo Advocacia, o atendimento para casos de homologação é 100% online: reuniões por videoconferência, assinatura digital de procuração, envio seguro de documentos e relatórios periódicos de acompanhamento. Já atendemos brasileiros nos Estados Unidos, Portugal, Alemanha, Canadá, Japão e diversos outros países.' },
      { type: 'quote', text: 'Atendimento 100% online. Você não precisa vir ao Brasil para resolver. A Sousa Araújo Advocacia conduz todo o processo à distância.' },

      { type: 'cta', text: 'Agendar Consulta de Viabilidade' },

      { type: 'heading2', text: 'Conclusão — Não Deixe para Depois' },
      { type: 'paragraph', text: 'Se você se identificou com alguma das situações descritas neste artigo, o primeiro passo é a Consulta de Viabilidade com a Sousa Araújo Advocacia. Analisamos seu caso, definimos a melhor estratégia e apresentamos um plano de ação claro — com total sigilo e transparência.' },
    ],
    faq: [
      { question: 'Meu divórcio feito nos EUA vale no Brasil?', answer: 'Não automaticamente. Para ter validade, a sentença de divórcio americana precisa ser homologada pelo STJ, salvo exceção para divórcio consensual simples sem bens, filhos ou pensão.' },
      { question: 'Posso vender meu imóvel enquanto o processo de homologação está em andamento?', answer: 'Na prática, não. O cartório exige que o estado civil esteja regularizado para lavrar a escritura de venda.' },
      { question: 'Quanto tempo demora a homologação no STJ?', answer: 'De 2 a 6 meses, quando o processo está bem instruído. Exigências não atendidas podem prolongar o prazo.' },
      { question: 'Posso fazer tudo à distância?', answer: 'Sim. A Sousa Araújo Advocacia oferece atendimento 100% online: videoconferência, assinatura digital e envio seguro de documentos.' },
      { question: 'Meu ex-cônjuge precisa concordar?', answer: 'Depende. Se o divórcio transitou em julgado (decisão final), a concordância do ex-cônjuge não é necessária. Se houver contestação, o STJ notifica a outra parte.' },
      { question: 'A homologação tem custo alto?', answer: 'Os custos incluem honorários, tradução juramentada, apostilamento e custas do STJ. Na Consulta de Viabilidade, apresentamos estimativa detalhada.' },
      { question: 'Divórcio de Portugal precisa de homologação?', answer: 'Sim, segue as mesmas regras. Portugal é signatário da Convenção de Haia, o que facilita o apostilamento dos documentos.' },
      { question: 'O que acontece com a partilha de bens da sentença estrangeira?', answer: 'A partilha definida na sentença estrangeira só produz efeitos no Brasil após a homologação. Até lá, o regime de bens do casamento permanece vigente.' },
      { question: 'Já tentei e foi indeferido. Posso tentar de novo?', answer: 'Sim. Na maioria dos casos, o indeferimento é por falha documental, que pode ser corrigida. A Sousa Araújo Advocacia analisa o motivo e reapresenta o pedido.' },
      { question: 'Preciso ir ao Brasil para resolver?', answer: 'Não. Todo o processo pode ser conduzido online, desde a consulta até a conclusão.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // ART-03 — Direito de Família
  // ══════════════════════════════════════════════════════════════
  {
    slug: 'uniao-estavel-x-casamento-diferencas-patrimonio',
    metaTitle: 'União Estável x Casamento: 5 Diferenças Cruciais que Afetam Seu Patrimônio em 2026',
    metaDescription: 'União estável x casamento: descubra as 5 diferenças que impactam seu patrimônio, herança e direitos. Contrato de convivência e proteção patrimonial.',
    keyword: 'união estável x casamento diferenças',
    category: 'Direito de Família',
    day: '01', month: 'Mar', fullDate: '1 de Março, 2026',
    title: 'União Estável x Casamento: 5 Diferenças Cruciais que Afetam Seu Patrimônio em 2026',
    excerpt: 'Moram juntos há anos mas nunca casaram? Descubra as 5 diferenças cruciais entre união estável e casamento que impactam diretamente patrimônio, herança e direitos.',
    imageIndex: 2,
    lpLink: '/uniao-estavel',
    externalLink: 'https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm',
    externalLinkLabel: 'Código Civil Brasileiro — Lei 10.406/2002',
    content: [
      { type: 'paragraph', text: '"A gente mora junto há anos, mas nunca casou. Precisa de alguma coisa?" Essa é uma das perguntas mais frequentes que a Sousa Araújo Advocacia recebe. E a resposta é: depende. Mas, na maioria dos casos, precisa sim.' },
      { type: 'paragraph', text: 'A união estável e o casamento geram direitos e deveres muito semelhantes perante a lei brasileira. A diferença é que o casamento é formalizado por um ato solene (cerimônia e registro), enquanto a união estável nasce de um fato da vida: a convivência pública, contínua e duradoura com o objetivo de constituir família.' },
      { type: 'paragraph', text: 'O problema é que muita gente não sabe que a união estável gera consequências patrimoniais automáticas. Sem um contrato de convivência, o regime de bens aplicável é a comunhão parcial. Isso significa que tudo o que for adquirido durante a convivência pertence aos dois, independentemente de quem pagou.' },

      { type: 'heading2', text: 'O que É União Estável e o que É Casamento — Definição Clara' },
      { type: 'paragraph', text: 'O casamento é um ato jurídico formal, celebrado perante um juiz de paz ou autoridade religiosa, com registro obrigatório no cartório de registro civil.' },
      { type: 'paragraph', text: 'A união estável é uma situação de fato reconhecida pela Constituição Federal (art. 226, §3º) e pelo Código Civil (art. 1.723). Para que exista, são necessários: convivência pública, contínua, duradoura e com objetivo de constituir família.' },
      { type: 'heading3', text: 'Mito — "Precisa Morar Junto por 2 Anos"' },
      { type: 'paragraph', text: 'Não existe prazo mínimo para configurar união estável. A lei não exige 2 anos nem nenhum outro período específico. O que importa é a qualidade da relação, não a quantidade de tempo. Inclusive, a coabitação não é requisito obrigatório.' },
      { type: 'heading3', text: 'Mito — "União Estável É Menos do que Casamento"' },
      { type: 'paragraph', text: 'Não. A Constituição Federal reconhece a união estável como entidade familiar, com proteção do Estado. Em termos de direitos patrimoniais, previdenciários e sucessórios, a união estável gera efeitos muito semelhantes ao casamento.' },
      { type: 'quote', text: 'União estável gera direitos e deveres iguais ao casamento. A diferença não está nos direitos. Está na forma.' },

      { type: 'heading2', text: '5 Diferenças Cruciais entre União Estável e Casamento que Afetam Seu Patrimônio' },

      { type: 'heading3', text: '1. Regime de Bens — o que Muda Sem Contrato' },
      { type: 'paragraph', text: 'No casamento, os noivos escolhem o regime de bens antes da cerimônia. Na união estável, se não houver contrato de convivência, aplica-se automaticamente a comunhão parcial de bens. Isso significa que todos os bens adquiridos durante a convivência pertencem a ambos, na proporção de 50% para cada um, independentemente de quem efetivamente pagou.' },

      { type: 'heading3', text: '2. Direito à Herança — Companheiro x Cônjuge' },
      { type: 'paragraph', text: 'No casamento, o cônjuge é herdeiro necessário. Na união estável, o companheiro também tem direitos sucessórios, mas a comprovação da união pode ser necessária e nem sempre é simples. No casamento, a certidão comprova tudo. Na união estável, pode ser necessário provar judicialmente a existência da relação.' },

      { type: 'heading3', text: '3. Dissolução — Cartório ou Fórum?' },
      { type: 'paragraph', text: 'O divórcio pode ser feito em cartório (consensual, sem filhos menores) ou no fórum. A dissolução da união estável segue regras semelhantes, mas pode ser necessário primeiro provar que a união existia.' },

      { type: 'heading3', text: '4. Prova da Relação — Casamento É Documento, União Estável É Fato' },
      { type: 'paragraph', text: 'O casamento existe a partir do registro. A união estável é um fato. Pode existir sem nenhum documento. Por isso, registrar a união estável em cartório é altamente recomendável.' },

      { type: 'heading3', text: '5. Conversão — de União Estável para Casamento' },
      { type: 'paragraph', text: 'É possível converter a união estável em casamento, tanto judicialmente quanto em cartório. A conversão formaliza a relação e aplica todas as regras do casamento a partir da data da conversão.' },

      { type: 'quote', text: 'Sem contrato de convivência, o regime é comunhão parcial. Mesmo que você não saiba. Mesmo que você não concorde. A lei aplica automaticamente.' },

      { type: 'heading2', text: 'Contrato de Convivência — a Proteção que Pouca Gente Conhece' },
      { type: 'paragraph', text: 'O contrato de convivência é o instrumento jurídico que permite aos companheiros definir o regime de bens da união estável. É o equivalente ao pacto antenupcial do casamento.' },
      { type: 'paragraph', text: 'O contrato pode definir: o regime de bens, a administração dos bens durante a relação, os direitos e deveres patrimoniais em caso de dissolução, e a forma de partilha em caso de término. Pode ser feito a qualquer momento: antes, durante ou mesmo na hora de dissolver.' },
      { type: 'quote', text: 'Proteção patrimonial não é desconfiança. É inteligência. O contrato protege ambas as partes.' },

      { type: 'heading2', text: 'Tabela Comparativa — União Estável x Casamento' },
      { type: 'table', headers: ['Aspecto', 'Casamento', 'União Estável'], rows: [
        { cells: ['Constituição', 'Cerimônia + registro', 'Fato da vida (convivência)'] },
        { cells: ['Prova', 'Certidão de casamento', 'Pode exigir ação judicial'] },
        { cells: ['Regime de bens padrão', 'Comunhão parcial', 'Comunhão parcial'] },
        { cells: ['Escolha de regime', 'Pacto antenupcial', 'Contrato de convivência'] },
        { cells: ['Direito à herança', 'Herdeiro necessário', 'Direitos reconhecidos pelo STF'] },
        { cells: ['Dissolução', 'Divórcio (cartório ou fórum)', 'Dissolução (cartório ou fórum)'] },
        { cells: ['Conversão', '—', 'Pode ser convertida em casamento'] },
        { cells: ['Registro obrigatório', 'Sim', 'Não (mas recomendado)'] },
      ]},

      { type: 'cta', text: 'Agendar Consulta de Viabilidade' },

      { type: 'heading2', text: 'Conclusão — Não Deixe para Depois' },
      { type: 'paragraph', text: 'Se você se identificou com alguma das situações descritas neste artigo, o primeiro passo é a Consulta de Viabilidade com a Sousa Araújo Advocacia. Analisamos seu caso, definimos a melhor estratégia e apresentamos um plano de ação claro — com total sigilo e transparência.' },
    ],
    faq: [
      { question: 'Morar junto configura automaticamente união estável?', answer: 'Não automaticamente. É necessário convivência pública, contínua e duradoura com objetivo de constituir família. A coabitação é um indício, mas outros elementos são analisados.' },
      { question: 'Sem contrato de convivência, qual o regime de bens?', answer: 'Comunhão parcial. Tudo adquirido durante a relação pertence aos dois, independentemente de quem pagou.' },
      { question: 'Companheiro tem direito a herança?', answer: 'Sim. O STF equiparou os direitos sucessórios do companheiro aos do cônjuge. Porém, a comprovação da união pode ser necessária.' },
      { question: 'Posso fazer contrato de convivência depois de anos juntos?', answer: 'Sim. O contrato pode ser feito a qualquer momento, inclusive durante a relação. Porém, ele só rege os bens adquiridos a partir de sua celebração ou conforme pactuado.' },
      { question: 'União estável entre pessoas do mesmo sexo é reconhecida?', answer: 'Sim. O STF reconheceu a união estável homoafetiva como entidade familiar, com todos os direitos e deveres.' },
      { question: 'Posso ter união estável sem morar junto?', answer: 'Sim. A coabitação não é requisito obrigatório. O que importa é a convivência com objetivo de constituir família.' },
      { question: 'Quanto custa registrar união estável em cartório?', answer: 'Os custos variam por cartório, mas costumam ser acessíveis. Na consulta, informamos valores estimados.' },
      { question: 'Posso converter minha união estável em casamento?', answer: 'Sim. A conversão pode ser feita judicialmente ou em cartório, de forma simples e relativamente rápida.' },
    ],
  },
];

/** Helper to find article by slug */
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(a => a.slug === slug);
}
