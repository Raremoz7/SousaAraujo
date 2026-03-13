/**
 * Services Grid Component
 * Carrossel full width de cards de servicos com imagens de fundo e overlay
 * Desktop: react-slick carousel | Mobile: snap scroll horizontal
 * Conteudo centralizado em /src/data/content.ts
 */

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Importações corretas usando o esquema figma:asset
import imgPensao from "figma:asset/a8eaae6d35224ebcf5d425153dfbabf03391cd68.png";
import imgGuarda from "figma:asset/e131e0fb7fa0de846a06e6f0060eba49c87abac7.png";
import imgInventario from "figma:asset/0a485a946753f4d21e08d3ed3d8d9779909dd212.png";
import imgUniao from "figma:asset/4a36bb11fdcdbb05a48be1bedc1e4dcfd7d3dee4.png";
import imgEmpresarial from "figma:asset/b9e6fa721be691a0274735fd458f8e585f0501ff.png";
import imgMarca from "figma:asset/a6a19f7d74d4d71fe6c9f1d51fd5ad4a4f1a5b98.png";
import { readPanel } from '../hooks/usePanelContent';

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  image: string;
}

function panelImage(key: string, fallback: string): string {
  const val = readPanel(key, fallback);
  return val.startsWith('figma:asset/') ? fallback : val;
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: readPanel('home.service1.title', 'Pensão Alimentícia e Execução'),
    description: readPanel('home.service1.desc', 'Atuação completa para fixar, revisar ou cobrar alimentos com base em provas e estratégia processual. Orientação prática sobre documentos, prazos e medidas cabíveis — inclusive para situações urgentes e inadimplência recorrente.'),
    image: panelImage('home.service1.image', imgPensao),
  },
  {
    id: 2,
    title: readPanel('home.service2.title', 'Guarda e Plano de Convivência'),
    description: readPanel('home.service2.desc', 'Estruturação de acordos e medidas para garantir previsibilidade, estabilidade e proteção dos vínculos familiares. Atuação com foco no melhor interesse da criança, com regras claras de convivência, férias, datas especiais e comunicação entre as partes.'),
    image: panelImage('home.service2.image', imgGuarda),
  },
  {
    id: 3,
    title: readPanel('home.service3.title', 'Inventário e Sucessões'),
    description: readPanel('home.service3.desc', 'Planejamento e condução do inventário com organização documental rigorosa e comunicação clara em cada etapa. Sempre que viável, prioriza-se a via extrajudicial para reduzir desgaste e tempo, preservando patrimônio e evitando conflitos familiares.'),
    image: panelImage('home.service3.image', imgInventario),
  },
  {
    id: 4,
    title: readPanel('home.service4.title', 'União Estável e Proteção Patrimonial'),
    description: readPanel('home.service4.desc', 'Reconhecimento, dissolução e partilha com orientação clara sobre direitos, provas e riscos. Estruturação de acordos e medidas para evitar insegurança patrimonial e conflitos que se prolongam por falta de formalização.'),
    image: panelImage('home.service4.image', imgUniao),
  },
  {
    id: 5,
    title: readPanel('home.service5.title', 'Empresarial Consultivo para PMEs'),
    description: readPanel('home.service5.desc', 'Suporte preventivo para empresários com foco em contratos, notificações e rotinas jurídicas essenciais. Modelo ideal para recorrência (retainer), reduzindo riscos e protegendo o negócio antes que o problema vire processo.'),
    image: panelImage('home.service5.image', imgEmpresarial),
  },
  {
    id: 6,
    title: readPanel('home.service6.title', 'Registro de Marca no INPI'),
    description: readPanel('home.service6.desc', 'Da busca de viabilidade ao protocolo e acompanhamento do processo, com orientação para reduzir riscos de indeferimento e conflitos. Proteja sua marca e organize sua base jurídica para crescer com mais segurança.'),
    image: panelImage('home.service6.image', imgMarca),
  },
];

export function ServicesGrid() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    variableWidth: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          variableWidth: false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          variableWidth: false,
        }
      }
    ]
  };

  return (
    <section className="bg-[#161312] w-full py-[40px] md:py-[60px] lg:py-[80px] overflow-hidden">
      {/* SEO: h2 para hierarquia de títulos */}
      <h2 className="sr-only">Serviços Jurídicos Especializados</h2>

      {/* Desktop - Full Width Carousel */}
      <div className="hidden lg:block w-full">
        <Slider {...settings} className="services-carousel">
          {services.map((service) => (
            <div key={service.id} className="px-[8px]">
              <div className="relative w-[496px] h-[316.33px]">
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${service.image}?format=webp&w=400 400w, ${service.image}?format=webp&w=800 800w`}
                      sizes="(max-width: 768px) 400px, 800px"
                    />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={416}
                      height={520}
                    />
                  </picture>
                </div>

                {/* Gradient Overlays */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)',
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-[35px]">
                  <h3 className="font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white mb-[10px]">
                    {service.title}
                  </h3>
                  <p className="font-['Noto_Sans'] text-[13px] leading-[18px] tracking-[-0.195px] text-white">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile/Tablet - Grid */}
      <div className="lg:hidden overflow-hidden">
        <div className="flex gap-[12px] md:gap-[16px] overflow-x-auto snap-x snap-mandatory pl-[20px] md:pl-[40px] pr-[20px] md:pr-[40px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {services.map((service) => (
            <div
              key={service.id}
              className="relative shrink-0 w-[80vw] md:w-[46vw] h-[260px] md:h-[316.33px] snap-start"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${service.image}?format=webp&w=400 400w, ${service.image}?format=webp&w=800 800w`}
                    sizes="(max-width: 768px) 400px, 800px"
                  />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={416}
                    height={520}
                  />
                </picture>
              </div>

              {/* Gradient Overlays */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)',
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-[24px] md:p-[35px]">
                <h3 className="font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white mb-[10px]">
                  {service.title}
                </h3>
                <p className="font-['Noto_Sans'] text-[13px] leading-[18px] tracking-[-0.195px] text-white">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-carousel .slick-slide {
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .services-carousel .slick-track {
          display: flex !important;
        }
        
        .services-carousel .slick-list {
          overflow: visible !important;
          margin: 0 -8px !important;
        }
      `}</style>
    </section>
  );
}