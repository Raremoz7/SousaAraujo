import clsx from "clsx";
import svgPaths from "./svg-x9g8xp6res";
import imgImage from "figma:asset/1c5915f13f1286c3ef9a443f770e76f54396c6b2.png";
import imgA from "figma:asset/6c627bf6bc0511aa5872bd0ed7a7d5df4a890ba9.png";
type GroupBackgroundImageProps = {
  additionalClassNames?: string;
};

function GroupBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<GroupBackgroundImageProps>) {
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

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[460px] left-0 right-0 top-0" data-name="Image">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[262.8%] left-[-30.38%] max-w-none top-[-111.49%] w-[150.41%]" src={imgImage} />
          </div>
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(163.741deg, rgba(22, 19, 18, 0) 67.361%, rgb(22, 19, 18) 92.378%), linear-gradient(188.882deg, rgba(22, 19, 18, 0) 16.425%, rgb(22, 19, 18) 84.749%)" }} />
        </div>
      </div>
      <div className="absolute h-[321px] left-[803px] top-[253px] w-[502px]" data-name="a">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgA} />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute backdrop-blur-[3.5px] bg-[rgba(75,37,36,0.1)] left-[calc(50%+341px)] rounded-[52.5px] size-[90px] top-[calc(50%+120.5px)]" data-name="Link">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[24px] left-[calc(50%-0.5px)] top-[calc(50%-0.5px)] w-[18px]" data-name="SVG">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 24">
            <g clipPath="url(#clip0_23_1220)" id="SVG">
              <path d="M18 12L0 24V0L18 12Z" fill="var(--fill-0, white)" id="Vector" />
            </g>
            <defs>
              <clipPath id="clip0_23_1220">
                <rect fill="white" height="24" width="18" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[22px] left-[80px] top-[567px] w-[184.66px]" data-name="Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[10.66px] not-italic text-[15px] text-white top-[11.27px] tracking-[-0.225px] w-[172.994px]">
          <p className="leading-[25px]">Agendar Atendimento</p>
        </div>
        <div className="absolute left-[174.66px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
          <GroupBackgroundImage additionalClassNames="inset-[5.23%_5.05%_3.81%_3.57%]">
            <g id="Group">
              <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
            </g>
          </GroupBackgroundImage>
          <GroupBackgroundImage additionalClassNames="inset-[104.78%_115.05%_-95.74%_-106.43%]">
            <g id="Group" opacity="0.5">
              <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
            </g>
          </GroupBackgroundImage>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[111px] justify-center leading-[0] left-[80px] not-italic text-[#a57255] text-[58px] top-[352.5px] tracking-[-0.87px] w-[632px] whitespace-pre-wrap">
        <p className="mb-0">
          <span className="leading-[66px] text-white">Conheça nossas</span>
          <span className="leading-[66px]">{` `}</span>
        </p>
        <p className="leading-[66px]">áreas de atuação</p>
      </div>
      <p className="absolute font-['Roboto:Bold',sans-serif] font-bold h-[100px] leading-[25px] left-[86px] text-[18px] text-white top-[430px] w-[610px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        A Sousa Araújo Advocacia atua em quatro grandes áreas do Direito, com foco em estratégia, organização documental e atendimento humanizado. Cada área é conduzida com o Método SAA — garantindo transparência, previsibilidade e acompanhamento em todas as etapas.
      </p>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[485px] text-[32px] text-[red] top-[309px] tracking-[-0.516px] w-[48px]">
        <p className="leading-[32px]">H1</p>
      </div>
    </div>
  );
}