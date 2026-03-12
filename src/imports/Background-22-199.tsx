import clsx from "clsx";
import svgPaths from "./svg-jaymxarxn1";
type Group1Props = {
  additionalClassNames?: string;
};

function Group1({ children, additionalClassNames = "" }: React.PropsWithChildren<Group1Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-1.48%_-0.79%_-1.48%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.8863 33.9848">
          {children}
        </svg>
      </div>
    </div>
  );
}
type GroupProps = {
  additionalClassNames?: string;
};

function Group({ children, additionalClassNames = "" }: React.PropsWithChildren<GroupProps>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-1.48%_0_-1.48%_-0.8%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.8868 33.9848">
          {children}
        </svg>
      </div>
    </div>
  );
}
type SvgProps = {
  additionalClassNames?: string;
};

function Svg({ additionalClassNames = "" }: SvgProps) {
  return (
    <div className={clsx("absolute size-[17px] top-[158px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g clipPath="url(#clip0_22_208)" id="SVG">
          <path d={svgPaths.p2b1b0a80} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_22_208">
            <rect fill="white" height="17" width="17" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#452b1e] relative size-full" data-name="Background">
      <div className="absolute h-[328px] left-[170px] overflow-clip right-[170px] top-[135px]" data-name="Container">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+447.5px)] overflow-clip size-[35px] top-[calc(50%+82px)]" data-name="Button - Previous slide → SVG">
          <Group additionalClassNames="inset-[3.01%_1.97%_2.68%_1.97%]">
            <g id="Group">
              <path d="M33.8868 16.9333H0.267438" id="Vector" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
              <path d={svgPaths.p22c616c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
              <path d={svgPaths.p282a4d00} id="Vector_3" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
            </g>
          </Group>
          <Group additionalClassNames="inset-[3.01%_-108.03%_2.68%_111.97%]">
            <g id="Group" opacity="0.5">
              <path d="M33.8868 16.9333H0.267436" id="Vector" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
              <path d={svgPaths.p22c616c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
              <path d={svgPaths.p282a4d00} id="Vector_3" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
            </g>
          </Group>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+522.5px)] overflow-clip size-[35px] top-[calc(50%+82px)]" data-name="Button - Next slide → SVG">
          <Group1 additionalClassNames="inset-[3.01%_1.97%_2.68%_1.97%]">
            <g id="Group">
              <path d="M0 16.9333H33.6193" id="Vector" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
              <path d={svgPaths.p1bc46b00} id="Vector_2" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
              <path d={svgPaths.p2967f380} id="Vector_3" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
            </g>
          </Group1>
          <Group1 additionalClassNames="inset-[3.01%_111.97%_2.68%_-108.03%]">
            <g id="Group" opacity="0.5">
              <path d="M0 16.9333H33.6193" id="Vector" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
              <path d={svgPaths.p1bc46b00} id="Vector_2" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
              <path d={svgPaths.p2967f380} id="Vector_3" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.38067" />
            </g>
          </Group1>
        </div>
        <div className="absolute h-[275px] left-0 right-0 top-[11px]" data-name="Group - 2 / 4">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[85px] justify-center leading-[0] left-[94px] not-italic text-[32px] text-white top-[61.5px] tracking-[-0.832px] w-[862px]">
            <p className="leading-[42px]">{`"Fui atendida com um cuidado que não esperava encontrar em um escritório de advocacia. Tudo foi explicado com clareza, cada etapa comunicada no prazo e o processo resolvido sem surpresas. Me senti segura do início ao fim."`}</p>
          </div>
          <Svg additionalClassNames="left-[93.5px]" />
          <Svg additionalClassNames="left-[116.5px]" />
          <Svg additionalClassNames="left-[139.5px]" />
          <Svg additionalClassNames="left-[162.5px]" />
          <Svg additionalClassNames="left-[185.5px]" />
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[29px] justify-center leading-[0] left-[93.5px] not-italic text-[21px] text-white top-[207.5px] tracking-[-0.42px] w-[94.923px]">
            <p className="leading-[30px]">M.S</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[93.5px] not-italic text-[13px] text-white top-[237px] tracking-[-0.195px] w-[74.224px]">
            <p className="leading-[18px]">Cliente</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Regular',sans-serif] font-normal h-[279px] justify-center leading-[0] left-0 text-[245px] text-[rgba(153,164,165,0.1)] top-[139.5px] tracking-[-0.225px] w-[103.883px]">
            <p className="leading-[245px]">“</p>
          </div>
        </div>
      </div>
    </div>
  );
}