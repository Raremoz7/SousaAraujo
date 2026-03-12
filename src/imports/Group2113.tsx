import clsx from "clsx";
import svgPaths from "./svg-1zhneaq6z5";
type Group2113HelperProps = {
  additionalClassNames?: string;
};

function Group2113Helper({ children, additionalClassNames = "" }: React.PropsWithChildren<Group2113HelperProps>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "108" } as React.CSSProperties} className={clsx("absolute flex h-[150px] items-center justify-center left-0 w-[1188px]", additionalClassNames)}>
      {children}
    </div>
  );
}

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative text-[32px] text-white tracking-[-0.832px]", additionalClassNames)}>
      <p className="leading-[42px]">{children}</p>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties} className={additionalClassNames}>
      <div className="-rotate-90 flex-none">{children}</div>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
  additionalClassNames1?: string;
};

function Wrapper2({ children, additionalClassNames = "", additionalClassNames1 = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <Wrapper3 additionalClassNames={clsx("-translate-y-1/2 absolute flex items-center justify-center left-[92px] w-[43px]", additionalClassNames)}>
      <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative text-[32px] text-white tracking-[-0.832px]", additionalClassNames)}>
        <p className="leading-[42px]">{children}</p>
      </div>
    </Wrapper3>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return <Wrapper3 additionalClassNames={clsx("-translate-y-1/2 absolute flex items-center justify-center w-[71px]", additionalClassNames)}>{children}</Wrapper3>;
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[1.38%_1.42%_1.36%_1.37%]">
      <div className="absolute inset-[-1.41%_-1.49%_-1.41%_-1.41%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51.4533 51.4167">
          <g id="Group">{children}</g>
        </svg>
      </div>
    </div>
  );
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <Wrapper3 additionalClassNames={clsx("-translate-y-1/2 absolute flex h-[114px] items-center justify-center w-[71px]", additionalClassNames)}>
      <div className="flex flex-col font-['Lora:Regular',sans-serif] font-normal h-[71px] justify-center leading-[0] relative text-[70px] text-white tracking-[-0.832px] w-[114px]">
        <p className="leading-[42px]">{text}</p>
      </div>
    </Wrapper3>
  );
}

function Group1() {
  return (
    <Wrapper>
      <path d={svgPaths.p2f6ed40} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
      <path d="M0.99425 1.1632H50.4537" id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
      <path d="M50.4532 50.4085V0.949084" id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
    </Wrapper>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <Wrapper3 additionalClassNames={clsx("-translate-y-1/2 absolute flex h-[48px] items-center justify-center w-[62px]", additionalClassNames)}>
      <div className="flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] relative text-[32px] text-[red] tracking-[-0.516px] w-[48px]">
        <p className="leading-[32px]">{text}</p>
      </div>
    </Wrapper3>
  );
}

function Group() {
  return (
    <Wrapper>
      <path d={svgPaths.p2f6ed40} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
      <path d="M0.994251 1.1632H50.4537" id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
      <path d="M50.4532 50.4085V0.949085" id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
    </Wrapper>
  );
}

export default function Group2() {
  return (
    <div className="relative size-full">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[107px] justify-center leading-[0] left-[7px] not-italic text-[#a57255] text-[43px] top-[53.5px] tracking-[-0.516px] w-[311.373px]">
        <p className="leading-[52px]">Como Funciona — Passo a Passo</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[113px] justify-center leading-[0] left-[7px] not-italic text-[22px] text-white top-[533.5px] tracking-[-0.225px] w-[1012px]">
        <p className="leading-[30px]">Analisamos sua sentença estrangeira, verificamos os requisitos do STJ e definimos a rota processual mais adequada ao seu caso.</p>
      </div>
      <Group2113Helper additionalClassNames="top-[640px]">
        <div className="flex-none rotate-90">
          <div className="border-[#a57255] border-r border-solid h-[1188px] overflow-clip relative w-[150px]" data-name="Background+VerticalBorder">
            <Wrapper1 additionalClassNames="h-[391px] left-[64px] top-[850.5px]">
              <Wrapper4 additionalClassNames="h-[71px] w-[391px]">Organização Documental</Wrapper4>
            </Wrapper1>
            <Wrapper1 additionalClassNames="h-[91px] left-[64px] top-[1136.5px]">
              <div className="flex flex-col font-['Lora:Regular',sans-serif] font-normal h-[71px] justify-center leading-[0] relative text-[70px] text-white tracking-[-0.832px] w-[91px]">
                <p className="leading-[42px]">02</p>
              </div>
            </Wrapper1>
            <div className="absolute flex h-[51.409px] items-center justify-center left-[63px] top-[-0.41px] w-[51.44px]">
              <div className="flex-none rotate-180">
                <div className="h-[51.409px] overflow-clip relative w-[51.44px]" data-name="SVG">
                  <Group />
                  <Group />
                </div>
              </div>
            </div>
            <Text text="H3" additionalClassNames="left-[27px] top-[655px]" />
          </div>
        </div>
      </Group2113Helper>
      <div className="absolute flex h-[150px] items-center justify-center left-0 top-[212px] w-[1188px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "87" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="border-[#a57255] border-r border-solid h-[1188px] overflow-clip relative w-[150px]" data-name="Background+VerticalBorder">
            <Wrapper1 additionalClassNames="h-[702px] left-[67px] top-[696px]">
              <Wrapper4 additionalClassNames="h-[71px] w-[702px]">Consulta de Viabilidade</Wrapper4>
            </Wrapper1>
            <Text1 text="01" additionalClassNames="left-[67px] top-[1131px]" />
            <div className="absolute h-[51.409px] left-[61px] overflow-clip top-[-0.41px] w-[51.44px]" data-name="SVG">
              <Group1 />
              <Group1 />
            </div>
          </div>
        </div>
      </div>
      <Group2113Helper additionalClassNames="top-[790px]">
        <div className="flex-none rotate-90">
          <div className="border-[#a57255] border-r border-solid h-[1188px] overflow-clip relative w-[150px]" data-name="Background+VerticalBorder">
            <Wrapper2 additionalClassNames="h-[321px] top-[883.5px]" additionalClassNames1="h-[43px] w-[321px]">
              Protocolo no STJ
            </Wrapper2>
            <div className="absolute h-[51.409px] left-[63px] overflow-clip top-[14px] w-[51.44px]" data-name="SVG">
              <Group1 />
              <Group1 />
            </div>
            <Text1 text="03" additionalClassNames="left-[64px] top-[1125px]" />
            <Text text="H3" additionalClassNames="left-[52px] top-[765px]" />
          </div>
        </div>
      </Group2113Helper>
      <Group2113Helper additionalClassNames="top-[953px]">
        <div className="flex-none rotate-90">
          <div className="border-[#a57255] border-r border-solid h-[1188px] overflow-clip relative w-[150px]" data-name="Background+VerticalBorder">
            <Wrapper2 additionalClassNames="h-[463px] top-[812.5px]" additionalClassNames1="h-[43px] w-[463px]">
              Acompanhamento até a Decisão
            </Wrapper2>
            <div className="absolute h-[51.409px] left-[63px] overflow-clip top-[14px] w-[51.44px]" data-name="SVG">
              <Group1 />
              <Group1 />
            </div>
            <Text1 text="04" additionalClassNames="left-[64px] top-[1125px]" />
            <Text text="H3" additionalClassNames="left-[49px] top-[594px]" />
          </div>
        </div>
      </Group2113Helper>
      <Group2113Helper additionalClassNames="top-[1116px]">
        <div className="flex-none rotate-90">
          <div className="border-[#a57255] border-r border-solid h-[1188px] overflow-clip relative w-[150px]" data-name="Background+VerticalBorder">
            <Wrapper2 additionalClassNames="h-[522px] top-[783px]" additionalClassNames1="h-[43px] w-[522px]">
              Carta de Sentença e Execução no STJ
            </Wrapper2>
            <div className="absolute h-[51.409px] left-[63px] overflow-clip top-[14px] w-[51.44px]" data-name="SVG">
              <Group1 />
              <Group1 />
            </div>
            <Text1 text="05" additionalClassNames="left-[64px] top-[1125px]" />
            <Text text="H3" additionalClassNames="left-[38px] top-[498px]" />
          </div>
        </div>
      </Group2113Helper>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[485px] text-[32px] text-[red] top-[279px] tracking-[-0.516px] w-[48px]">
        <p className="leading-[32px]">H3</p>
      </div>
    </div>
  );
}