import clsx from "clsx";
import svgPaths from "./svg-te743h69qh";
import imgImage from "figma:asset/8eecaa51fea8463a93c801f405e4ef1e452f0526.png";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <ul className={additionalClassNames}>
      <li className="list-disc ms-[27px] whitespace-pre-wrap">
        <span className="leading-[25px]">{children}</span>
      </li>
    </ul>
  );
}
type BackgroundTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundText({ text, additionalClassNames = "" }: BackgroundTextProps) {
  return <Wrapper additionalClassNames={additionalClassNames}>{text}</Wrapper>;
}
type VectorStrokeProps = {
  additionalClassNames?: string;
};

function VectorStroke({ additionalClassNames = "" }: VectorStrokeProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4661 19.4661">
        <path d={svgPaths.p353ec300} fill="var(--fill-0, white)" id="Vector (Stroke)" />
      </svg>
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={clsx("absolute left-[337.98px] size-[38.283px]", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2834 38.2834">
        <circle cx="19.1417" cy="19.1417" fill="var(--fill-0, #A57255)" id="Ellipse 3" r="19.1417" />
      </svg>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bottom-0 h-[1270px] left-0 pointer-events-none right-1/2 top-0">
        <div className="h-[900px] pointer-events-auto sticky top-0" data-name="Image">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-full left-[-70.19%] max-w-none top-0 w-[222.22%]" src={imgImage} />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#262626] bottom-0 left-1/2 right-0 top-0" data-name="Background">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[98px] justify-center leading-[0] left-[70px] not-italic text-[#a57255] text-[32px] top-[143px] tracking-[-0.516px] w-[563px]">
          <p className="leading-[32px]">Por Que Clientes Confiam na Sousa Araújo Advocacia</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[71px] justify-center leading-[0] left-[70px] not-italic text-[#a57255] text-[32px] top-[865.5px] tracking-[-0.516px] w-[563px]">
          <p className="leading-[32px]">O que você recebe na Consulta de Viabilidade:</p>
        </div>
        <div className="absolute font-['Noto_Sans:Regular',sans-serif] h-[464px] leading-[0] left-[70px] not-italic text-[18px] text-white top-[211px] tracking-[-0.27px] w-[522px]">
          <BackgroundText text="14+ anos de experiência em Direito de Família e processos internacionais" additionalClassNames="mb-0" />
          <p className="leading-[25px] mb-0 whitespace-pre-wrap">&nbsp;</p>
          <BackgroundText text="Atuação em Brasília/DF com alcance nacional e atendimento a brasileiros no exterior" additionalClassNames="mb-0" />
          <p className="leading-[25px] mb-0 whitespace-pre-wrap">&nbsp;</p>
          <BackgroundText text="Método SAA: Seleção, Arquitetura Documental e Acompanhamento por etapas" additionalClassNames="mb-0" />
          <p className="leading-[25px] mb-0 whitespace-pre-wrap">&nbsp;</p>
          <Wrapper additionalClassNames="mb-0">{`Checklist personalizado entregue na consulta de viabilidade `}</Wrapper>
          <p className="leading-[25px] mb-0 whitespace-pre-wrap">&nbsp;</p>
          <BackgroundText text="Relatórios periódicos de acompanhamento do caso" additionalClassNames="mb-0" />
          <p className="leading-[25px] mb-0 whitespace-pre-wrap">&nbsp;</p>
          <BackgroundText text="Parceria com tradutores juramentados e empresas de apostilamento" additionalClassNames="mb-0" />
          <p className="leading-[25px] mb-0 whitespace-pre-wrap">&nbsp;</p>
          <BackgroundText text="Sigilo absoluto e comunicação transparente como valores inegociáveis" />
        </div>
        <ul className="absolute block font-['Noto_Sans:Regular',sans-serif] h-[147px] leading-[0] left-[70px] list-disc not-italic text-[18px] text-white top-[921px] tracking-[-0.27px] w-[522px] whitespace-pre-wrap">
          <li className="mb-0 ms-[27px]">
            <span className="leading-[25px]">Análise preliminar do seu caso</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[25px]">Definição da rota processual (cartório ou judicial)</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[25px]">Checklist documental personalizado</span>
          </li>
          <li className="mb-0 ms-[27px]">
            <span className="leading-[25px]">Estimativa de prazos e custos</span>
          </li>
          <li className="ms-[27px]">
            <span className="leading-[25px]">Plano de ação claro com próximos passos</span>
          </li>
        </ul>
        <div className="-translate-x-1/2 absolute contents left-[calc(50%-132px)] top-[728px]">
          <div className="absolute bg-[#a57255] h-[49.314px] left-[70px] top-[728px] w-[316px]" />
          <Helper additionalClassNames="top-[733.84px]" />
          <VectorStroke additionalClassNames="inset-[58.49%_49.1%_39.98%_48.2%]" />
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] justify-center leading-[0] left-[92.06px] not-italic text-[15.184px] text-white top-[752.68px] tracking-[-0.2278px] whitespace-nowrap">
            <p className="leading-[25.306px]">Agendar Consulta de Viabilidade</p>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute contents left-[calc(50%-132px)] top-[1087px]">
          <div className="absolute bg-[#a57255] h-[49.314px] left-[70px] top-[1087px] w-[316px]" />
          <Helper additionalClassNames="top-[1092.84px]" />
          <VectorStroke additionalClassNames="inset-[86.76%_49.1%_11.71%_48.2%]" />
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] justify-center leading-[0] left-[92.06px] not-italic text-[15.184px] text-white top-[1111.68px] tracking-[-0.2278px] whitespace-nowrap">
            <p className="leading-[25.306px]">Agendar Consulta de Viabilidade</p>
          </div>
        </div>
      </div>
    </div>
  );
}