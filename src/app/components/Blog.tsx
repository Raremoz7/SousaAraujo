/**
 * Blog Component - "Quem se informa, se protege"
 * Secao de artigos com grid de 3 cards
 * Conteudo centralizado em /src/data/content.ts
 */

import { useState } from 'react';
import imgArticle1 from "figma:asset/8f998da633bb92dcab13a208c71a97e2986d6c06.png";
import imgArticle2 from "figma:asset/a6246b350004d1d692b469864824af4843190e94.png";
import imgArticle3 from "figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png";
import svgPaths from "../../imports/svg-od596xq1d5";
import { readPanel, usePanel } from '../hooks/usePanelContent';

function panelImage(key: string, fallback: string): string {
  const val = readPanel(key, fallback);
  return val.startsWith('figma:asset/') ? fallback : val;
}

interface Article {
  id: number;
  day: string;
  month: string;
  category: string;
  title: string;
  image: string;
  href: string;
}

const articles: Article[] = [
  {
    id: 1,
    day: readPanel('home.article1.day', '01'),
    month: readPanel('home.article1.month', 'Nov'),
    category: readPanel('home.article1.category', 'Direito Imobiliário e Usucapião'),
    title: readPanel('home.article1.title', 'Imóvel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento'),
    image: panelImage('home.article1.image', imgArticle1),
    href: readPanel('home.article1.href', '/blog/imovel-sem-escritura-caminhos-regularizar-brasilia'),
  },
  {
    id: 2,
    day: readPanel('home.article2.day', '01'),
    month: readPanel('home.article2.month', 'Nov'),
    category: readPanel('home.article2.category', 'Homologação e Direito Internacional'),
    title: readPanel('home.article2.title', 'Posso vender um imóvel no Brasil com um divórcio pendente no exterior?'),
    image: panelImage('home.article2.image', imgArticle2),
    href: readPanel('home.article2.href', '/blog/posso-vender-imovel-brasil-divorcio-pendente-exterior'),
  },
  {
    id: 3,
    day: readPanel('home.article3.day', '01'),
    month: readPanel('home.article3.month', 'Nov'),
    category: readPanel('home.article3.category', 'Direito de Família'),
    title: readPanel('home.article3.title', 'União Estável x Casamento: O que muda no seu patrimônio?'),
    image: panelImage('home.article3.image', imgArticle3),
    href: readPanel('home.article3.href', '/blog/uniao-estavel-x-casamento-diferencas-patrimonio'),
  },
];

function ArrowLeft() {
  return (
    <svg className="w-[27px] h-[47px]" fill="none" viewBox="0 0 27 47">
      <path
        d="M26.3232 1.50088C25.1156 -0.138902 22.8067 -0.489056 21.167 0.718654C21.1723 0.737371 21.2738 0.718567 21.167 0.718654L21.165 0.71963C21.1643 0.720316 21.1632 0.721435 21.1621 0.72256C21.1591 0.724781 21.1547 0.727463 21.1494 0.731349C21.1386 0.739273 21.1225 0.750877 21.1025 0.765529C21.0625 0.795164 21.0047 0.838548 20.9297 0.894435C20.7797 1.0062 20.5617 1.16975 20.2861 1.37783C19.7352 1.79399 18.952 2.39192 18.0127 3.1249C16.1381 4.58787 13.6262 6.60262 11.1035 8.79287C8.59912 10.9673 5.99938 13.3871 3.99707 15.6532C2.99973 16.782 2.07282 17.9596 1.375 19.1171C0.77702 20.1074 0.0922081 21.4928 0.00878906 23.0419L0 23.3544L0.00878906 23.6659C0.0921493 25.2152 0.777955 26.6004 1.37402 27.5907C2.07188 28.7482 2.99965 29.9259 3.99707 31.0546C5.9994 33.3207 8.59908 35.7406 11.1035 37.9149C13.6262 40.1053 16.1381 42.1209 18.0127 43.5839C18.952 44.3169 19.7361 44.9148 20.2871 45.331C20.5627 45.5389 20.7797 45.7017 20.9297 45.8134C21.0047 45.8693 21.0625 45.9127 21.1025 45.9423C21.1225 45.957 21.1386 45.9685 21.1494 45.9765C21.1547 45.9805 21.1591 45.984 21.1621 45.9862C21.1636 45.9873 21.1651 45.9875 21.165 45.9882L21.167 45.9901C22.8067 47.1975 25.1155 46.8472 26.3232 45.2079C27.4933 43.6193 27.2009 41.4028 25.6904 40.1679L25.541 40.0517L25.5391 40.0507C25.5373 40.0494 25.5343 40.0468 25.5303 40.0438C25.5222 40.0379 25.5092 40.0283 25.4922 40.0155C25.4578 39.99 25.4056 39.9517 25.3369 39.9003C25.1988 39.7974 24.9935 39.6442 24.7314 39.4462C24.2069 39.05 23.4543 38.4753 22.5498 37.7694C20.737 36.3547 18.3323 34.4249 15.9385 32.3466C13.5263 30.2523 11.2086 28.0789 9.52344 26.1718C8.67714 25.214 8.06808 24.4096 7.69043 23.7831C7.57996 23.5999 7.50523 23.4576 7.45508 23.3534C7.50523 23.2493 7.58025 23.1075 7.69043 22.9247C8.06808 22.2983 8.67714 21.4948 9.52344 20.537C11.2086 18.6299 13.5262 16.4566 15.9385 14.3622C18.3323 12.2837 20.737 10.3532 22.5498 8.93838C23.4542 8.23251 24.2069 7.6588 24.7314 7.2626C24.9935 7.06483 25.1988 6.91141 25.3369 6.8085C25.4058 6.75703 25.4578 6.71778 25.4922 6.69229C25.5093 6.67957 25.5222 6.66994 25.5303 6.66397C25.5341 6.66106 25.5373 6.65935 25.5391 6.65811L25.541 6.65615C27.1806 5.44843 27.5308 3.14068 26.3232 1.50088Z"
        fill="white"
        fillOpacity="0.4"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="w-[27px] h-[47px]" fill="none" viewBox="0 0 27 47">
      <path
        d="M0.718657 1.50088C1.92638 -0.138902 4.23413 -0.489056 5.87393 0.718654L5.87588 0.71963C5.87681 0.720316 5.87826 0.721435 5.87979 0.72256C5.8828 0.724781 5.88722 0.727463 5.89249 0.731349C5.90321 0.739273 5.9186 0.750877 5.93838 0.765529C5.97839 0.795164 6.03722 0.838548 6.11221 0.894435C6.26217 1.0062 6.4793 1.16975 6.75479 1.37783C7.30576 1.79399 8.08998 2.39192 9.0292 3.1249C10.9038 4.58787 13.4158 6.60262 15.9384 8.79287C18.4428 10.9673 21.0425 13.3871 23.0448 15.6532C24.0422 16.782 24.9691 17.9596 25.6669 19.1171C26.3037 20.1734 27.0419 21.6796 27.0419 23.3544C27.0418 25.029 26.3037 26.5344 25.6669 27.5907C24.9691 28.7482 24.0421 29.9259 23.0448 31.0546C21.0426 33.3207 18.4427 35.7406 15.9384 37.9149C13.4157 40.1053 10.9038 42.1209 9.0292 43.5839C8.08994 44.3169 7.30576 44.9148 6.75479 45.331C6.47951 45.5389 6.26213 45.7017 6.11221 45.8134C6.03722 45.8693 5.97839 45.9127 5.93838 45.9423C5.91852 45.957 5.90325 45.9685 5.89249 45.9765C5.88708 45.9805 5.88284 45.984 5.87979 45.9862C5.87837 45.9873 5.87677 45.9875 5.87588 45.9882L5.87393 45.9901C4.23429 47.1975 1.92639 46.8472 0.718657 45.2079C-0.489032 43.5681 -0.13894 41.2593 1.50088 40.0517L1.50186 40.0507C1.50356 40.0494 1.50665 40.0468 1.51065 40.0438C1.51874 40.0379 1.53153 40.0283 1.54874 40.0155C1.58315 39.99 1.63595 39.9517 1.70499 39.9003C1.84311 39.7974 2.0483 39.6442 2.31045 39.4462C2.835 39.05 3.58766 38.4753 4.49209 37.7694C6.30492 36.3547 8.70965 34.4249 11.1034 32.3466C13.5156 30.2523 15.8323 28.0789 17.5175 26.1718C18.3638 25.214 18.9738 24.4096 19.3515 23.7831C19.4621 23.5996 19.5357 23.4566 19.5858 23.3524C19.5357 23.2485 19.4612 23.1068 19.3515 22.9247C18.9738 22.2983 18.3638 21.4948 17.5175 20.537C15.8324 18.6299 13.5156 16.4566 11.1034 14.3622C8.70957 12.2837 6.30494 10.3532 4.49209 8.93838C3.58761 8.23251 2.83403 7.6588 2.30948 7.2626C2.04764 7.06483 1.84307 6.91141 1.70499 6.8085C1.63593 6.75703 1.58315 6.71778 1.54874 6.69229C1.53157 6.67957 1.51873 6.66994 1.51065 6.66397C1.50671 6.66106 1.50354 6.65935 1.50186 6.65811L1.50088 6.65615C-0.138899 5.44843 -0.489052 3.14068 0.718657 1.50088Z"
        fill="white"
        fillOpacity="0.4"
      />
    </svg>
  );
}

export function Blog() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sectionTitle = usePanel('home.articles.title', 'Quem se informa, se protege');
  const viewAllText = usePanel('home.articles.viewAllText', 'Ver todos os artigos');
  const viewAllHref = usePanel('home.articles.viewAllHref', '/blog');

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="artigos" className="bg-[#452b1e] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        {/* Title */}
        <h2 className="font-['Marcellus'] text-[26px] md:text-[34px] lg:text-[43px] leading-[1.25] md:leading-[1.2] lg:leading-[52px] tracking-[-0.516px] text-white mb-[40px] md:mb-[50px] lg:mb-[70px]">
          {sectionTitle}
        </h2>

        {/* Cards with arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            className="hidden lg:flex absolute -left-[60px] top-[110px] z-10 items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Artigo anterior"
          >
            <ArrowLeft />
          </button>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            className="hidden lg:flex absolute -right-[60px] top-[110px] z-10 items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Próximo artigo"
          >
            <ArrowRight />
          </button>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[24px] lg:gap-[30px]">
            {articles.map((article) => (
              <article key={article.id} className="group">
                {/* Image with date badge */}
                <div className="relative w-full h-[200px] md:h-[235px] overflow-hidden mb-[16px] md:mb-[20px]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Date badge */}
                  <div className="absolute top-0 left-0 backdrop-blur-[2px] bg-white/45 w-[63px] h-[77px] flex flex-col items-center justify-center">
                    <span className="font-['Lora'] text-[20px] leading-[23px] tracking-[-0.225px] text-white">
                      {article.day}
                    </span>
                    <span className="font-['Lora'] text-[15px] leading-[23px] tracking-[-0.225px] text-white">
                      {article.month}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <p
                  className="font-['Roboto'] text-[13px] leading-[18px] tracking-[-0.195px] text-[#a57255] mb-[12px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {article.category}
                </p>

                {/* Title */}
                <h3
                  className="font-['Roboto'] text-[19px] md:text-[21px] lg:text-[25px] leading-[1.4] md:leading-[35px] tracking-[-0.525px] text-white mb-[16px] md:mb-[20px] group-hover:text-[#a57255] transition-colors"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {article.title}
                </h3>

                {/* Read more link */}
                <a
                  href={article.href}
                  className="inline-flex items-center gap-2 font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group/link"
                >
                  Ler Artigo
                  <svg
                    className="w-[10px] h-[10px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 10 10"
                  >
                    <path
                      d={svgPaths.p1238f200}
                      stroke="currentColor"
                      strokeWidth="1.02093"
                    />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* View all articles link */}
        <div className="flex justify-center mt-[40px] md:mt-[60px] lg:mt-[80px]">
          <a
            href={viewAllHref}
            className="inline-flex items-center gap-2 font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
          >
            {viewAllText}
            <svg
              className="w-[10px] h-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path
                d={svgPaths.p1238f200}
                stroke="currentColor"
                strokeWidth="1.02093"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}