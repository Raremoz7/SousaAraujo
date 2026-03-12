/**
 * Videos Component
 * Secao "Videos educativos: entenda antes de decidir"
 * 3 cards com thumbnails, play button, titulo e descricao
 * Conteudo centralizado em /src/data/content.ts
 */

import imgA from "figma:asset/9346a42e7477eb1ee3bca02820f0bd1d03362e6a.png";
import imgA1 from "figma:asset/b6d4d8fd5a23bfafd55ed737639515ae2a9678d6.png";
import imgA2 from "figma:asset/f919780634dcebfb98522182d1a622a904e92e1c.png";
import svgPaths from "../../imports/svg-od596xq1d5";

interface VideoCard {
  id: number;
  image: string;
  title: string;
  description: string;
}

const defaultVideos: VideoCard[] = [
  {
    id: 1,
    image: imgA,
    title: 'O risco de não homologar sua sentença internacional: Imóveis e Herança',
    description:
      'Entenda quando uma decisão obtida no exterior precisa ser validada no Brasil para produzir efeitos — e como a falta de homologação pode travar divórcio, guarda, pensão e até questões patrimoniais.',
  },
  {
    id: 2,
    image: imgA1,
    title: 'Seu imóvel não tem escritura? Veja o que você pode fazer',
    description:
      'Imóvel sem registro ou documentação em dia não pode ser vendido, financiado ou deixado em herança com segurança. Neste vídeo mostramos os caminhos disponíveis — usucapião extrajudicial no cartório ou ação judicial — e como saber qual é o melhor para o seu caso.',
  },
  {
    id: 3,
    image: imgA2,
    title: 'Conflitos familiares: quando um acordo bem feito evita um processo longo',
    description:
      'Divórcio, guarda e inventário não precisam virar batalha judicial. Neste vídeo explicamos como acordos bem estruturados protegem todas as partes, reduzem custo, tempo e desgaste emocional — especialmente quando há filhos envolvidos.',
  },
];

function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-[105px] bg-[rgba(75,37,36,0.1)] backdrop-blur-[3.5px] flex items-center justify-center cursor-pointer hover:bg-[rgba(75,37,36,0.2)] transition-colors">
        <svg className="w-[18px] h-[24px] ml-1" fill="none" viewBox="0 0 18 24">
          <path d="M18 12L0 24V0L18 12Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export function Videos(props?: {
  title?: string;
  items?: VideoCard[];
  viewAllText?: string;
  viewAllHref?: string;
}) {
  const content = {
    title: props?.title || 'Vídeos educativos: entenda antes de decidir',
    items: props?.items || defaultVideos,
    viewAllText: props?.viewAllText || 'Ver todos os vídeos',
    viewAllHref: props?.viewAllHref || '#todos-videos',
  };

  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        {/* Title */}
        <h2 className="font-['Marcellus'] text-[26px] md:text-[34px] lg:text-[43px] leading-[1.25] md:leading-[1.2] lg:leading-[52px] tracking-[-0.516px] text-white mb-[40px] md:mb-[50px] lg:mb-[60px] max-w-[493px]">
          {content.title.split(':')[0]}:{' '}
          <br className="hidden md:block" />
          {content.title.split(':')[1]?.trim()}
        </h2>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[24px] lg:gap-[30px]">
          {content.items.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              {/* Thumbnail */}
              <div className="relative w-full h-[200px] md:h-[238px] overflow-hidden mb-[16px] md:mb-[20px]">
                <img
                  src={video.image}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <PlayButton />
              </div>

              {/* Title */}
              <h3
                className="font-['Roboto'] font-medium text-[17px] md:text-[21px] leading-[26px] md:leading-[30px] tracking-[-0.42px] text-[#a57255] mb-[10px] md:mb-[12px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {video.title}
              </h3>

              {/* Description */}
              <p
                className="font-['Roboto'] font-normal text-[14px] md:text-[15px] leading-[22px] md:leading-[23px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {video.description}
              </p>
            </div>
          ))}
        </div>

        {/* Link - Ver todos os vídeos */}
        <div className="flex justify-center mt-[40px] md:mt-[60px] lg:mt-[80px]">
          <a
            href={content.viewAllHref}
            className="inline-flex items-center gap-2 font-['Roboto'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {content.viewAllText}
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