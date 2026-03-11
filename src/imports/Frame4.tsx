import clsx from "clsx";
import svgPaths from "./svg-rz6rc610sq";
import imgA from "figma:asset/4fee0ccd87db6dd900796a349711620cb85c2755.png";
import imgA1 from "figma:asset/6daa36a69df9600539a5261e4be774bd12f5fa67.png";
import imgH2AccImgPng from "figma:asset/b1f5c9d022e2869246b5bf9dee8631b24df008f4.png";
import imgHf202602272213478E69B767E28146C58Bdd4473B795B6F51 from "figma:asset/00a4572bf82ccce6f9160b5835a1cecc53e7ae4f.png";

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative text-[32px] text-white tracking-[-0.832px]", additionalClassNames)}>
      <p className="leading-[42px]">{children}</p>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
  additionalClassNames1?: string;
};

function Wrapper2({ children, additionalClassNames = "", additionalClassNames1 = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties} className={clsx("-translate-y-1/2 absolute flex items-center justify-center w-[43px]", additionalClassNames)}>
      <div className="-rotate-90 flex-none">
        <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative text-[32px] text-white tracking-[-0.832px]", additionalClassNames)}>
          <p className="leading-[42px]">{children}</p>
        </div>
      </div>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties} className={clsx("-translate-y-1/2 absolute flex items-center justify-center left-[64px] w-[71px]", additionalClassNames)}>
      <div className="-rotate-90 flex-none">{children}</div>
    </div>
  );
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

function Group1() {
  return (
    <Wrapper>
      <path d={svgPaths.p2f6ed40} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
      <path d="M0.994251 1.1632H50.4537" id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
      <path d="M50.4532 50.4085V0.949085" id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
    </Wrapper>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties} className={clsx("-translate-y-1/2 absolute flex h-[114px] items-center justify-center top-[500.67px] w-[71px]", additionalClassNames)}>
      <div className="-rotate-90 flex-none">
        <div className="flex flex-col font-['Lora:Regular',sans-serif] font-normal h-[71px] justify-center leading-[0] relative text-[70px] text-white tracking-[-0.832px] w-[114px]">
          <p className="leading-[42px]">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <Wrapper>
      <path d={svgPaths.p2f6ed40} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
      <path d="M0.99425 1.1632H50.4537" id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
      <path d="M50.4532 50.4085V0.949084" id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="2.0001" />
    </Wrapper>
  );
}
type LinkTextProps = {
  text: string;
};

function LinkText({ text }: LinkTextProps) {
  return (
    <div className="absolute bg-white border border-solid border-white h-[40px] left-[42px] opacity-0 top-[518px] w-[134.44px]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[28px] not-italic text-[15px] text-white top-[17px] tracking-[-0.225px] w-[75.756px]">
        <p className="leading-[25px]">{text}</p>
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#482419] inset-[0_150px_0_450px] opacity-0" data-name="Background">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[35px] justify-center leading-[0] left-[42px] not-italic opacity-0 text-[25px] text-white top-[389.5px] tracking-[-0.525px] w-[177.93px]">
          <p className="leading-[35px]">{`Stocks & Shares`}</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[66px] justify-center leading-[23px] left-[42px] not-italic opacity-0 text-[15px] text-white top-[451px] tracking-[-0.225px] w-[300.81px]">
          <p className="mb-0">Lorem ipsum dolor sit amet, consectetur</p>
          <p className="mb-0">adipiscing elit, sed do eiusmod tempor incid</p>
          <p>idunt ut labore et dolore</p>
        </div>
        <LinkText text="Read More" />
        <div className="absolute inset-[148.48px_16.8px_41.2px_436.8px] opacity-0" data-name="a">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[146.51%] left-0 max-w-none top-[-23.26%] w-full" src={imgA} />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#452b1e] h-[600px] overflow-clip right-0 top-0 w-[150px]" data-name="Background">
        <Wrapper2 additionalClassNames="h-[183px] left-[72px] top-[331.17px]" additionalClassNames1="h-[43px] w-[183px]">
          Empresarial
        </Wrapper2>
        <div className="absolute h-[51.409px] left-[64px] overflow-clip top-[14px] w-[51.44px]" data-name="SVG">
          <Group />
          <Group />
        </div>
        <Text text="04" additionalClassNames="left-[58px]" />
      </div>
      <div className="absolute bg-[#452b1e] border-[#a57255] border-r border-solid h-[600px] overflow-clip right-[150px] top-0 w-[150px]" data-name="Background+VerticalBorder">
        <Wrapper2 additionalClassNames="h-[205.139px] left-[92px] top-[317.24px]" additionalClassNames1="h-[43px] w-[205.139px]">
          Família
        </Wrapper2>
        <div className="absolute h-[51.409px] left-[63px] overflow-clip top-[14px] w-[51.44px]" data-name="SVG">
          <Group />
          <Group />
        </div>
        <Text text="03" additionalClassNames="left-[64px]" />
      </div>
      <div className="absolute bg-[#482419] inset-[0_300px] opacity-0" data-name="Background">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[35px] justify-center leading-[0] left-[42px] not-italic opacity-0 text-[25px] text-white top-[389.5px] tracking-[-0.525px] w-[180.01px]">
          <p className="leading-[35px]">General Liability</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[66px] justify-center leading-[23px] left-[42px] not-italic opacity-0 text-[15px] text-white top-[451px] tracking-[-0.225px] w-[300.81px]">
          <p className="mb-0">Lorem ipsum dolor sit amet, consectetur</p>
          <p className="mb-0">adipiscing elit, sed do eiusmod tempor incid</p>
          <p>idunt ut labore et dolore</p>
        </div>
        <LinkText text="Read More" />
        <div className="absolute inset-[148.48px_16.8px_41.2px_436.8px] opacity-0" data-name="a">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[146.51%] left-0 max-w-none top-[-23.26%] w-full" src={imgA1} />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#452b1e] border-[#a57255] border-r border-solid h-[600px] overflow-clip right-[300px] top-0 w-[150px]" data-name="Background+VerticalBorder">
        <div className="-translate-y-1/2 absolute flex h-[161.485px] items-center justify-center left-[95px] top-[336.41px] w-[42px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
          <div className="-rotate-90 flex-none">
            <Wrapper3 additionalClassNames="w-[161.485px]">{`Imóveis `}</Wrapper3>
          </div>
        </div>
        <div className="absolute h-[51.409px] left-[63px] overflow-clip top-[14px] w-[51.44px]" data-name="SVG">
          <Group />
          <Group />
        </div>
        <Text text="02" additionalClassNames="left-[67px]" />
      </div>
      <div className="absolute bg-[#482419] inset-[0_450px_0_150px] opacity-0" data-name="Background">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[35px] justify-center leading-[0] left-[42px] not-italic opacity-0 text-[25px] text-white top-[389.5px] tracking-[-0.525px] w-[140.09px]">
          <p className="leading-[35px]">Investmenst</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[66px] justify-center leading-[23px] left-[42px] not-italic opacity-0 text-[15px] text-white top-[451px] tracking-[-0.225px] w-[300.81px]">
          <p className="mb-0">Lorem ipsum dolor sit amet, consectetur</p>
          <p className="mb-0">adipiscing elit, sed do eiusmod tempor incid</p>
          <p>idunt ut labore et dolore</p>
        </div>
        <LinkText text="Read More" />
        <div className="absolute inset-[148.48px_16.8px_41.2px_436.8px] opacity-0" data-name="h2-acc-img.png">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[146.51%] left-0 max-w-none top-[-23.26%] w-full" src={imgH2AccImgPng} />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#452b1e] border-[#a57255] border-r border-solid h-[600px] overflow-clip right-[450px] top-0 w-[150px]" data-name="Background+VerticalBorder">
        <Wrapper1 additionalClassNames="h-[243px] top-[299.67px]">
          <Wrapper3 additionalClassNames="h-[71px] w-[243px]">Homologação</Wrapper3>
        </Wrapper1>
        <Wrapper1 additionalClassNames="h-[91px] top-[512.17px]">
          <div className="flex flex-col font-['Lora:Regular',sans-serif] font-normal h-[71px] justify-center leading-[0] relative text-[70px] text-white tracking-[-0.832px] w-[91px]">
            <p className="leading-[42px]">01</p>
          </div>
        </Wrapper1>
        <div className="absolute flex h-[51.409px] items-center justify-center left-[63px] top-[13.99px] w-[51.44px]">
          <div className="flex-none rotate-180">
            <div className="h-[51.409px] overflow-clip relative w-[51.44px]" data-name="SVG">
              <Group1 />
              <Group1 />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#452b1e] inset-[0_600px_0_0]" data-name="Background">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[35px] justify-center leading-[30px] left-[42px] text-[25px] text-white top-[282.17px] tracking-[-0.525px] w-[458px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="mb-0">{`Homologação de `}</p>
          <p>Sentença Estrangeira</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[66px] justify-center leading-[0] left-[42px] text-[15px] text-white top-[367.67px] tracking-[-0.225px] w-[300.927px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[23px]">Validamos no STJ decisões judiciais obtidas no exterior, como divórcios e guardas. Atendimento ágil e especializado para brasileiros em todo o mundo.</p>
        </div>
        <div className="absolute bg-[#a57255] h-[40px] left-[42px] top-[438px] w-[134.44px]" data-name="Link">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[29px] not-italic text-[15px] text-white top-[20.17px] tracking-[-0.225px] w-[75.756px]">
            <p className="leading-[25px]">Saiba Mais</p>
          </div>
        </div>
        <div className="absolute h-[516px] left-[425px] opacity-75 top-[6.67px] w-[415px]" data-name="hf_20260227_221347_8e69b767-e281-46c5-8bdd-4473b795b6f5 1">
          <img alt="" className="absolute inset-0 max-w-none mix-blend-multiply object-cover pointer-events-none size-full" src={imgHf202602272213478E69B767E28146C58Bdd4473B795B6F51} />
        </div>
      </div>
    </div>
  );
}