import imgSr7MaskSr7BgImage from "figma:asset/5e3c0735c07c017f159c71adef667c328c8ad129.png";

export default function Sr7Slide() {
  return (
    <div className="relative size-full" data-name="sr7-slide">
      <div className="absolute h-[900px] left-0 overflow-clip top-0 w-[1440px]" data-name="sr7-mask → sr7-bg → image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgSr7MaskSr7BgImage} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(218.989deg, rgba(22, 19, 18, 0) 45.72%, rgba(22, 19, 18, 0.5) 84.624%), linear-gradient(182.477deg, rgba(22, 19, 18, 0) 49.98%, rgb(22, 19, 18) 92.834%)" }} />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[206px] justify-center leading-[0] left-[80px] not-italic text-[58px] text-white top-[553px] tracking-[-0.87px] w-[631.642px]">
        <p>
          <span className="leading-[66px]">{`Mais de `}</span>
          <span className="leading-[66px] text-white">14 anos de atuação.</span>
          <span className="leading-[66px]">{` Expertise que só o tempo constrói`}</span>
        </p>
      </div>
      <p className="absolute font-['Robonauts:Regular',sans-serif] h-[75px] leading-[0] left-[86px] not-italic text-[18px] text-white top-[671px] w-[581px]">
        <span className="font-['Roboto:Bold',sans-serif] font-bold leading-[25px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          A SA | Sousa Araújo Advocacia
        </span>
        <span className="font-['Roboto:Regular',sans-serif] font-normal leading-[25px]" style={{ fontVariationSettings: "'wdth' 100" }}>{` é o resultado de uma trajetória sólida em Direito de Família, Regularização de Imóveis e Homologação Internacional, com atendimento de Brasília para o mundo.`}</span>
      </p>
    </div>
  );
}