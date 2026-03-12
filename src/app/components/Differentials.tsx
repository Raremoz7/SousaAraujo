/**
 * Differentials Component
 * Secao "O que torna o nosso trabalho diferente"
 * Posicionada entre ServicesGrid e Stats
 * Conteudo centralizado em /src/data/content.ts
 */

import { usePanel, readPanel } from '../hooks/usePanelContent';
import { motion } from 'motion/react';
import { siteContent } from '../../data/content';
import imgDifferentials from 'figma:asset/e131e0fb7fa0de846a06e6f0060eba49c87abac7.png';

interface Differential {
  id: number;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

function ArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="inline-block ml-2"
    >
      <path
        d="M1 13L13 1M13 1H3M13 1V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Differentials(props?: {
  title?: string;
  subtitle?: string;
  items?: Differential[];
}) {
  const panelItems: Differential[] = siteContent.differentials.items.map((item, index) => ({
    id: index + 1,
    title: readPanel(`home.diff.item${index+1}.title`, item.title),
    description: readPanel(`home.diff.item${index+1}.desc`, item.description),
    linkText: readPanel(`home.diff.item${index+1}.linkText`, item.link.text),
    linkHref: readPanel(`home.diff.item${index+1}.linkHref`, item.link.href),
  }));

  const content = {
    title: usePanel('home.diff.title', props?.title || siteContent.differentials.title),
    subtitle: usePanel('home.diff.desc', props?.subtitle || siteContent.differentials.description),
    items: props?.items || panelItems,
  };

  const diffImage = usePanel('home.diff.image', imgDifferentials);
  const resolvedDiffImage = diffImage.startsWith('figma:asset/') ? imgDifferentials : diffImage;

  return (
    <section className="bg-[#161312] w-full">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px] py-[80px] lg:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] md:gap-[60px] lg:gap-[100px]">
          {/* Left Column — Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="font-['Marcellus'] text-[28px] md:text-[36px] lg:text-[48px] leading-[1.2] tracking-[-0.832px] text-white mb-4 md:mb-6">
              {content.title.split(' ').slice(0, 5).join(' ')}{' '}
              <br className="hidden lg:block" />
              {content.title.split(' ').slice(5).join(' ')}
            </h2>
            <p className="font-['Noto_Sans'] text-[14px] md:text-[15px] leading-[22px] md:leading-[23px] tracking-[-0.225px] text-white/70 max-w-[380px] mb-8 md:mb-10">
              {content.subtitle}
            </p>
            <div className="overflow-hidden">
              <img
                src={resolvedDiffImage}
                alt="Planejamento jurídico estratégico — Sousa Araújo Advocacia"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column — Differentials list */}
          <div className="flex flex-col">
            {content.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * 0.1,
                }}
                className={`py-[20px] md:py-[28px] ${
                  index !== content.items.length - 1
                    ? 'border-b border-[#a57255]/15'
                    : ''
                }`}
              >
                <h3 className="font-['Marcellus'] text-[18px] md:text-[20px] lg:text-[22px] leading-[1.3] text-[#a57255] mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="font-['Noto_Sans'] text-[13px] leading-[20px] tracking-[-0.195px] text-white/70 mb-4 max-w-[520px]">
                  {item.description}
                </p>
                <a
                  href={item.linkHref}
                  className="inline-flex items-center font-['Noto_Sans'] text-[13px] leading-[18px] tracking-[-0.195px] text-white/50 hover:text-[#a57255] transition-colors duration-300 group"
                >
                  {item.linkText}
                  <ArrowUpRight />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}