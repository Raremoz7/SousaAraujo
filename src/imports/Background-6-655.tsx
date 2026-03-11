import clsx from "clsx";
import svgPaths from "./svg-mdcsas6el5";
import imgLinkA from "figma:asset/8f998da633bb92dcab13a208c71a97e2986d6c06.png";
import imgLinkA1 from "figma:asset/a6246b350004d1d692b469864824af4843190e94.png";
import imgLinkA2 from "figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-5.5%_-5.59%_-3.97%_-3.94%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0081 9.95829">
          {children}
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <Wrapper additionalClassNames="inset-[104.78%_115.05%_-95.74%_-106.43%]">
      <g id="Group" opacity="0.5">
        <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
      </g>
    </Wrapper>
  );
}

function Group() {
  return (
    <Wrapper additionalClassNames="inset-[5.23%_5.05%_3.81%_3.57%]">
      <g id="Group">
        <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
      </g>
    </Wrapper>
  );
}
type LinkProps = {
  text: string;
  text1: string;
};

function Link({ text, text1 }: LinkProps) {
  return (
    <div className="absolute backdrop-blur-[2px] bg-[rgba(255,255,255,0.45)] font-['Lora:Regular',sans-serif] font-normal h-[77px] leading-[0] left-0 text-white top-0 tracking-[-0.225px] w-[62.89px]">
      <div className="-translate-y-1/2 absolute flex flex-col h-[23px] justify-center left-[21.81px] text-[20px] top-[25.5px] w-[19.564px]">
        <p className="leading-[23px]">{text}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col h-[23px] justify-center left-[18px] text-[15px] top-[50.5px] w-[27.252px]">
        <p className="leading-[23px]">{text1}</p>
      </div>
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#452b1e] relative size-full" data-name="Background">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[52px] justify-center leading-[0] left-[68px] not-italic text-[43px] text-white top-[107px] tracking-[-0.516px] w-[599px]">
        <p className="leading-[52px]">Quem se informa, se protege</p>
      </div>
      <div className="absolute h-[413.52px] left-[80px] right-[973.34px] top-[232px]" data-name="Article">
        <div className="absolute h-[235.03px] left-0 overflow-clip right-0 top-0" data-name="Container">
          <div className="absolute aspect-[409.8599853515625/249.1300048828125] left-[-11.6px] right-[-11.6px] top-[-7.05px]" data-name="Link → a">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLinkA} />
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] left-0 text-[#a57255] text-[13px] top-[271px] tracking-[-0.195px] w-[221px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[18px]">Direito Imobiliário e Usucapião</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[69px] justify-center leading-[0] left-0 text-[25px] text-white top-[332.53px] tracking-[-0.525px] w-[383.347px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[35px]">Imóvel sem escritura: 5 caminhos reais para regularizar e destravar venda/financiamento</p>
        </div>
        <Link text="01" text1="Nov" />
      </div>
      <div className="absolute h-[22px] left-[80px] top-[638px] w-[91.13px]" data-name="Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-0 not-italic text-[15px] text-white top-[11px] tracking-[-0.225px] w-[79.452px]">
          <p className="leading-[25px]">Ler Artigo</p>
        </div>
        <div className="absolute left-[81.13px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
          <Group />
          <Group1 />
        </div>
      </div>
      <div className="absolute h-[22px] left-[527px] top-[633px] w-[91.13px]" data-name="Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-0 not-italic text-[15px] text-white top-[11px] tracking-[-0.225px] w-[79.452px]">
          <p className="leading-[25px]">Ler Artigo</p>
        </div>
        <div className="absolute left-[81.13px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
          <Group />
          <Group1 />
        </div>
      </div>
      <div className="absolute h-[413.52px] left-[526.66px] right-[526.67px] top-[232px]" data-name="Article">
        <div className="absolute h-[235.03px] left-0 overflow-clip right-0 top-0" data-name="Container">
          <div className="absolute aspect-[409.8699951171875/249.1300048828125] left-[-11.6px] right-[-11.6px] top-[-7.05px]" data-name="Link → a">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLinkA1} />
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[0.34px] not-italic text-[#a57255] text-[13px] top-[271px] tracking-[-0.195px] w-[238px]">
          <p className="leading-[18px]">Homologação e Direito Internacional</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[69px] justify-center leading-[0] left-[0.34px] not-italic text-[25px] text-white top-[332.5px] tracking-[-0.525px] w-[386px]">
          <p className="leading-[35px]">Posso vender um imóvel no Brasil com um divórcio pendente no exterior?</p>
        </div>
        <Link text="01" text1="Nov" />
      </div>
      <div className="absolute h-[413.52px] left-[973px] right-[80.34px] top-[232px]" data-name="Article">
        <div className="absolute h-[235.03px] left-0 overflow-clip right-0 top-0" data-name="Container">
          <div className="absolute aspect-[409.8599853515625/249.1300048828125] left-[-11.6px] right-[-11.6px] top-[-7.05px]" data-name="Link → a">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLinkA2} />
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[#a57255] text-[13px] top-[271px] tracking-[-0.195px] w-[122px]">
          <p className="leading-[18px]">Direito de Família</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[69px] justify-center leading-[0] left-0 not-italic text-[25px] text-white top-[332.5px] tracking-[-0.525px] w-[387px]">
          <p className="leading-[35px]">União Estável x Casamento: O que muda no seu patrimônio?</p>
        </div>
        <Link text="01" text1="Nov" />
        <div className="absolute h-[22px] left-0 top-[385px] w-[91.13px]" data-name="Link">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-0 not-italic text-[15px] text-white top-[11px] tracking-[-0.225px] w-[79.452px]">
            <p className="leading-[25px]">Ler Artigo</p>
          </div>
          <div className="absolute left-[81.13px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
            <Group />
            <Group1 />
          </div>
        </div>
      </div>
      <div className="absolute h-[22px] left-[667px] top-[721px] w-[172px]" data-name="Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[4px] not-italic text-[15px] text-white top-[10px] tracking-[-0.225px] w-[156px]">
          <p className="leading-[25px]">Ver todos os artigos</p>
        </div>
        <div className="absolute left-[146px] overflow-clip size-[10px] top-[6px]" data-name="SVG">
          <Group />
          <Group1 />
        </div>
      </div>
      <div className="absolute inset-[45.52%_1.46%_48.82%_96.67%]" data-name="Vector (Stroke)">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0419 46.7085">
          <path d={svgPaths.p1b2f280} fill="var(--fill-0, white)" fillOpacity="0.4" id="Vector (Stroke)" />
        </svg>
      </div>
      <div className="absolute inset-[45.52%_96.66%_48.82%_1.46%]" data-name="Vector (Stroke)">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0418 46.7087">
          <path d={svgPaths.p189b2d00} fill="var(--fill-0, white)" fillOpacity="0.4" id="Vector (Stroke)" />
        </svg>
      </div>
    </div>
  );
}