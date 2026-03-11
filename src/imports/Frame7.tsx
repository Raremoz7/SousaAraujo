import clsx from "clsx";
import svgPaths from "./svg-4kdsp0abgj";
import imgHf20260227222148E2Aae756824E4E7E8E3B71115270Ba251 from "figma:asset/b0ad1e928919f10afd49b02a4017b141853c7f3b.png";
type BackgroundVerticalBorderHelperProps = {
  additionalClassNames?: string;
};

function BackgroundVerticalBorderHelper({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundVerticalBorderHelperProps>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties} className={clsx("-translate-y-1/2 absolute flex items-center justify-center left-[64px] w-[71px]", additionalClassNames)}>
      <div className="-rotate-90 flex-none">{children}</div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[1.38%_1.42%_1.36%_1.37%]">
      <div className="absolute inset-[-1.41%_-1.49%_-1.41%_-1.41%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.4533 51.4167">
          <g id="Group">
            <path d={svgPaths.p2f6ed40} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
            <path d="M0.994251 1.1632H50.4537" id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
            <path d="M50.4532 50.4085V0.949085" id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#452b1e] border-[#b58468] border-r border-solid h-[600px] overflow-clip right-0 top-0 w-[150px]" data-name="Background+VerticalBorder">
        <BackgroundVerticalBorderHelper additionalClassNames="h-[243px] top-[299.67px]">
          <div className="flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[71px] justify-center leading-[0] relative text-[32px] text-white tracking-[-0.832px] w-[243px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[42px]">Família</p>
          </div>
        </BackgroundVerticalBorderHelper>
        <BackgroundVerticalBorderHelper additionalClassNames="h-[91px] top-[512.17px]">
          <div className="flex flex-col font-['Lora:Regular',sans-serif] font-normal h-[71px] justify-center leading-[0] relative text-[70px] text-white tracking-[-0.832px] w-[91px]">
            <p className="leading-[42px]">02</p>
          </div>
        </BackgroundVerticalBorderHelper>
        <div className="absolute flex h-[51.409px] items-center justify-center left-[63px] top-[13.99px] w-[51.44px]">
          <div className="flex-none rotate-180">
            <div className="h-[51.409px] overflow-clip relative w-[51.44px]" data-name="SVG">
              <Group />
              <Group />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#452b1e] inset-[0_150px_0_0]" data-name="Background">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[35px] justify-center leading-[35px] left-[42px] not-italic text-[25px] text-white top-[282.17px] tracking-[-0.525px] w-[458px] whitespace-pre-wrap">
          <p className="mb-0">{`Direito de Família e `}</p>
          <p>Sucessões</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[66px] justify-center leading-[0] left-[42px] not-italic text-[15px] text-white top-[367.67px] tracking-[-0.225px] w-[300.927px]">
          <p className="leading-[23px]">Divórcio consensual ou litigioso, união estável, partilha e proteção patrimonial. Estratégia clara para reduzir desgaste e evitar prejuízos na divisão de bens.</p>
        </div>
        <div className="absolute bg-[#b58468] h-[40px] left-[42px] top-[438px] w-[134.44px]" data-name="Link">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[29px] not-italic text-[15px] text-white top-[20.17px] tracking-[-0.225px] w-[75.756px]">
            <p className="leading-[25px]">Saiba Mais</p>
          </div>
        </div>
        <div className="absolute h-[496px] left-[390px] top-[52px] w-[400px]" data-name="hf_20260227_222148_e2aae756-824e-4e7e-8e3b-71115270ba25 1">
          <img alt="" className="absolute inset-0 max-w-none mix-blend-multiply object-cover pointer-events-none size-full" src={imgHf20260227222148E2Aae756824E4E7E8E3B71115270Ba251} />
        </div>
      </div>
    </div>
  );
}