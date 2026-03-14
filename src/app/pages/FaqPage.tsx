import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Contact } from '../components/Contact';
import { PlayButton } from '../components/ui/PlayButton';
import { readPanel, usePanel } from '../hooks/usePanelContent';

/* ─── Images from Figma ─── */
import imgHero from 'figma:asset/165c2fa2b945b6d767d5ca0d5ceae23b97f95901.png';

/* ─── Fade-in wrapper ─── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <>{children}</>;
}

/* ─── FAQ Data ─── */
interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'Onde fica o escritório?',
    answer:
      'O escritório da Sousa Araújo Advocacia está localizado em Brasília/DF, com atendimento presencial e online para todo o Brasil e brasileiros no exterior. Endereço: Edifício Varig — Setor Comercial Norte, quadra 04, bloco B, sala 702, 7º andar — Asa Norte, Brasília/DF.',
    category: 'Atendimento',
  },
  {
    id: 2,
    question: 'Vocês atendem online?',
    answer:
      'Sim. Realizamos atendimento 100% online para clientes em qualquer cidade do Brasil e para brasileiros no exterior. Utilizamos videoconferência, e-mail e WhatsApp para garantir um atendimento próximo e eficiente, independentemente da localização do cliente.',
    category: 'Atendimento',
  },
  {
    id: 3,
    question: 'O que é a Consulta de Viabilidade?',
    answer:
      'A Consulta de Viabilidade é o ponto de entrada do nosso Método SAA. Em até 72 horas após o envio da documentação inicial, o cliente recebe um relatório escrito com o diagnóstico do caso, os caminhos jurídicos disponíveis, prazo estimado e custo previsto para cada opção. Não há compromisso de contratação — apenas clareza para a tomada de decisão.',
    category: 'Método',
  },
  {
    id: 4,
    question: 'Alliance Of Legal Experts — o que é?',
    answer:
      'A Alliance of Legal Experts é uma rede internacional de escritórios e advogados parceiros presente em mais de 30 países. A Sousa Araújo Advocacia integra essa rede, o que nos permite atender casos que envolvam questões jurídicas transfronteiriças — como homologação de sentença estrangeira, herança internacional, divórcio com bens no exterior e assessoria a brasileiros expatriados.',
    category: 'Rede',
  },
  {
    id: 5,
    question: 'O que é o Método SAA?',
    answer:
      'O Método SAA é a metodologia proprietária do escritório para condução de casos complexos. Baseia-se em três pilares: (1) Diagnóstico preciso — identificação exata do problema jurídico e documentação necessária; (2) Rota clara — sequência de etapas, prazos estimados e custos baseados em dados históricos; (3) Execução monitorada — atualizações periódicas e acesso transparente ao andamento do caso. O método reduz em média 40% o tempo de resolução.',
    category: 'Método',
  },
  {
    id: 6,
    question: 'Quanto custa uma consulta?',
    answer:
      'Os honorários variam de acordo com a complexidade do caso e o tipo de serviço. A Consulta de Viabilidade tem um valor fixo acessível e não implica contratação. Para cases de Homologação de Sentença Estrangeira, Regularização de Imóveis e Divórcio, trabalhamos com honorários fixos ou por êxito, dependendo da modalidade. Entre em contato para receber uma proposta personalizada.',
    category: 'Honorários',
  },
  {
    id: 7,
    question: 'Vocês garantem resultado?',
    answer:
      'Nenhum advogado sério pode garantir resultado — e o Código de Ética da OAB proíbe expressamente essa prática. O que garantimos é rigor no diagnóstico, clareza na estratégia, transparência na comunicação e comprometimento total com a resolução do seu caso. Nossa taxa de sucesso em casos de homologação e regularização imobiliária é superior a 95%.',
    category: 'Resultados',
  },
  {
    id: 8,
    question: 'Meu imóvel não tem escritura. O que fazer?',
    answer:
      'Imóveis sem escritura não podem ser vendidos, financiados ou transmitidos com segurança. O caminho mais indicado depende da situação específica: (1) Usucapião extrajudicial — mais rápido, feito direto no cartório, para quem possui todos os documentos; (2) Usucapião judicial — quando há litígio ou documentação incompleta; (3) Inventário imobiliário — quando o imóvel está no nome de pessoa falecida. Agende uma Consulta de Viabilidade para identificar o melhor caminho para o seu caso.',
    category: 'Imóveis',
  },
  {
    id: 9,
    question: 'Quanto tempo demora uma homologação de sentença estrangeira?',
    answer:
      'O prazo médio de homologação no STJ varia entre 4 e 8 meses, contados do protocolo até a decisão final. O prazo pode ser menor se toda a documentação estiver correta desde o início (apostilamento de Haia, tradução juramentada completa e petição bem fundamentada). Casos com documentação incompleta ou que exijam diligências adicionais podem levar mais tempo.',
    category: 'Homologação',
  },
  {
    id: 10,
    question: 'Preciso de advogado para fazer divórcio?',
    answer:
      'Se o divórcio for consensual (ambos concordam com partilha e guarda) e não houver filhos menores, é possível fazer direto no cartório, sem advogado. Mas se houver discordância, patrimônio complexo ou filhos, é necessário contratar advogado e realizar o divórcio judicial. Mesmo no consensual, contar com assessoria jurídica evita erros na partilha e garante proteção aos seus direitos.',
    category: 'Divórcio',
  },
  {
    id: 11,
    question: 'Posso regularizar meu imóvel sem ir ao cartório presencialmente?',
    answer:
      'Em muitos casos, sim. Para usucapião extrajudicial, alguns cartórios já aceitam procuração pública com poderes específicos, permitindo que um representante conduza todo o processo. A Sousa Araújo Advocacia oferece atendimento 100% remoto para regularização imobiliária, inclusive com suporte na obtenção de procurações e envio de documentos digitalizados.',
    category: 'Imóveis',
  },
  {
    id: 12,
    question: 'O que acontece se eu não homologar meu divórcio estrangeiro no Brasil?',
    answer:
      'Se você obteve divórcio no exterior e não homologar no Brasil, a sentença não tem validade aqui. Isso significa que você continua legalmente casado(a) perante a lei brasileira, o que impede novo casamento, venda ou partilha de bens, atualização de documentos e pode gerar problemas em inventário, pensão alimentícia e guarda de filhos. A homologação é obrigatória para que a decisão estrangeira tenha efeito jurídico no Brasil.',
    category: 'Homologação',
  },
];

/* ─── Accordion Item ─── */
function FaqAccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#a57255]/30">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-[20px] md:py-[24px] text-left group"
      >
        <h3
          className="font-['Roboto'] font-normal text-[18px] md:text-[21px] leading-[1.4] tracking-[-0.315px] text-white group-hover:text-[#a57255] transition-colors pr-6"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          {item.question}
        </h3>
        <div className={`flex-shrink-0 w-[22px] h-[22px] flex items-center justify-center border border-[#a57255]/60 transition-all duration-300 ${isOpen ? 'bg-[#a57255] border-[#a57255]' : 'group-hover:border-[#a57255]'}`}>
          <motion.span
            className="text-white text-[16px] leading-none"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }, opacity: { duration: 0.35 } }}
            className="overflow-hidden"
          >
            <div className="pb-[24px] pr-[40px]">
              <p
                className="font-['Roboto'] font-normal text-[15px] leading-[24px] tracking-[-0.225px] text-white/80"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page Hero ─── */
function PageHero() {
  const heroTitle = readPanel('faq.hero.title', 'FAQ');
  const heroBgImage = readPanel('faq.hero.bgImage', imgHero);
  const resolvedBgImage = heroBgImage.startsWith('figma:asset/') ? imgHero : heroBgImage;

  return (
    <section className="relative w-full h-[300px] md:h-[380px] lg:h-[440px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img alt="Perguntas frequentes — FAQ Sousa Araújo Advocacia" className="absolute inset-0 w-full h-full object-cover object-center" src={resolvedBgImage} />
        {/* Leve escurecimento geral */}
        <div className="absolute inset-0 bg-[#161312]/40" />
        {/* Gradiente do topo (semi-transparente para navbar) */}
        <div
          className="absolute inset-x-0 top-0 h-[120px]"
          style={{ background: 'linear-gradient(to bottom, rgba(22,19,18,0.55) 0%, transparent 100%)' }}
        />
        {/* Gradiente de transição para cor sólida na base */}
        <div
          className="absolute inset-x-0 bottom-0 h-[220px] md:h-[260px]"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(22,19,18,0.75) 40%, rgb(22,19,18) 100%)' }}
        />
      </div>
      <div className="relative max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] h-full flex flex-col justify-end pb-[50px] md:pb-[64px] pt-[100px]">
        <FadeIn>
          <h1 className="font-['Marcellus'] text-[48px] sm:text-[60px] md:text-[72px] lg:text-[80px] leading-[1.0] tracking-[-0.832px] text-white">{heroTitle}</h1>
        </FadeIn>

        {/* Play Button */}
        <div className="hidden lg:block absolute right-[110px] bottom-[64px]">
          <PlayButton size={100} />
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Section ─── */
function FaqSection() {
  const [openId, setOpenId] = useState<number>(1);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? -1 : id));
  };

  /* Build FAQ items from panel, falling back to hardcoded defaults */
  const panelFaqs: FaqItem[] = faqs.map((f, i) => ({
    id: f.id,
    question: readPanel(`faq.item${i + 1}.q`, f.question),
    answer: readPanel(`faq.item${i + 1}.a`, f.answer),
    category: readPanel(`faq.item${i + 1}.category`, f.category),
  }));

  const sectionTitle = readPanel('faq.section.title', 'Perguntas\nfrequentes');
  const sectionDesc = readPanel('faq.section.desc', 'Reunimos as dúvidas mais comuns dos nossos clientes, organizadas por tema. Se a sua pergunta não estiver aqui, entre em contato — a Sousa Araújo Advocacia responde com agilidade e transparência.');

  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[60px] lg:gap-[80px]">

          {/* Left: title + description */}
          <div className="lg:sticky lg:top-[100px] self-start">
            <FadeIn>
              <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[43px] leading-[1.2] tracking-[-0.832px] text-white mb-[20px] md:mb-[28px] whitespace-pre-line">
                {sectionTitle}
              </h2>
              <p
                className="font-['Roboto'] font-normal text-[15px] leading-[24px] tracking-[-0.225px] text-white/70"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {sectionDesc}
              </p>
            </FadeIn>
          </div>

          {/* Right: accordion */}
          <FadeIn delay={0.1}>
            <div className="border-t border-[#a57255]/30">
              {panelFaqs.map((item) => (
                <FaqAccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export function FaqPage() {
  const orderJson = usePanel('faq.sectionOrder', '');

  const SECTION_REGISTRY: Record<string, { Component: React.FC }> = {
    'faq-hero': { Component: PageHero },
    'faq-section': { Component: FaqSection },
    'faq-contact': { Component: Contact },
  };

  const DEFAULT_ORDER = ['faq-hero', 'faq-section', 'faq-contact'];

  const orderedIds = useMemo(() => {
    if (!orderJson) return DEFAULT_ORDER;
    try {
      const parsed = JSON.parse(orderJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const set = new Set(parsed as string[]);
        const result = [...parsed];
        for (const id of DEFAULT_ORDER) {
          if (!set.has(id)) result.push(id);
        }
        return result;
      }
    } catch { /* fall through */ }
    return DEFAULT_ORDER;
  }, [orderJson]);

  return (
    <>
      {orderedIds.map(id => {
        const entry = SECTION_REGISTRY[id];
        if (!entry) return null;
        const { Component } = entry;
        return <Component key={id} />;
      })}
    </>
  );
}