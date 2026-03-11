import clsx from "clsx";
import svgPaths from "./svg-cu394ws32g";
import imgBackground from "figma:asset/5ef7c5358541da50c7d84d33ae870248235d1b9f.png";
import imgA from "figma:asset/3e71c6d61aa0e57d1a665be82b28cb9ea6a34e93.png";
import imgA1 from "figma:asset/39e61b656ddd5fe3d719f00ef6da22c2fe461e03.png";
import imgA2 from "figma:asset/bb375343044c3a51e65f183f442085b46aeafbe0.png";
import imgA3 from "figma:asset/44b3c30774c7c54729d9b4a4354bcac599746a0b.png";
import imgLogoMain from "figma:asset/92d1c8f198b7c135696dbc46470fa983e29992a7.png";
type Group9Vector2Props = {
  additionalClassNames?: string;
};

function Group9Vector2({ children, additionalClassNames = "" }: React.PropsWithChildren<Group9Vector2Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        {children}
      </svg>
    </div>
  );
}
type Group9Vector1Props = {
  additionalClassNames?: string;
};

function Group9Vector1({ children, additionalClassNames = "" }: React.PropsWithChildren<Group9Vector1Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 8">
        {children}
      </svg>
    </div>
  );
}
type Group8Vector1Props = {
  additionalClassNames?: string;
};

function Group8Vector1({ children, additionalClassNames = "" }: React.PropsWithChildren<Group8Vector1Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 28">
        {children}
      </svg>
    </div>
  );
}
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] text-[15px] text-white tracking-[-0.225px]", additionalClassNames)}>
      <p className="leading-[21px]">{children}</p>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[23px] justify-center leading-[0] text-[15px] text-white top-[11.5px] tracking-[-0.225px]", additionalClassNames)}>
      <p className="leading-[23px]">{children}</p>
    </div>
  );
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 8">
        {children}
      </svg>
    </div>
  );
}
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
type Group9VectorProps = {
  additionalClassNames?: string;
};

function Group9Vector({ additionalClassNames = "" }: Group9VectorProps) {
  return (
    <Wrapper1 additionalClassNames={additionalClassNames}>
      <path d={svgPaths.p33739180} fill="var(--fill-0, white)" id="Vector" />
    </Wrapper1>
  );
}
type Group8VectorProps = {
  additionalClassNames?: string;
};

function Group8Vector({ additionalClassNames = "" }: Group8VectorProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 27">
        <path d={svgPaths.p127fa800} fill="var(--fill-0, white)" id="Vector" />
      </svg>
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
type GroupProps = {
  additionalClassNames?: string;
};

function Group({ additionalClassNames = "" }: GroupProps) {
  return (
    <Wrapper additionalClassNames={additionalClassNames}>
      <g id="Group">
        <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
      </g>
    </Wrapper>
  );
}
type AImageProps = {
  additionalClassNames?: string;
};

function AImage({ additionalClassNames = "" }: AImageProps) {
  return (
    <div className={clsx("-translate-y-1/2 absolute h-[17px] w-[12px]", additionalClassNames)}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgA} />
      </div>
    </div>
  );
}

export default function Background() {
  return (
    <div className="relative size-full" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[102.75%] left-[-7.02%] max-w-none top-[-1.55%] w-[107%]" src={imgBackground} />
      </div>
      <div className="absolute backdrop-blur-[9px] bg-[rgba(22,19,18,0.36)] bottom-[80px] right-[80px] top-[80px] w-[650px]" data-name="Overlay+OverlayBlur">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Regular',sans-serif] font-['Marcellus:Regular',sans-serif] font-normal justify-center leading-[52px] left-[60px] not-italic text-[43px] text-white top-[72px] tracking-[-0.516px] w-[480.384px]">
          <p className="mb-0">Fale Conosco</p>
          <p>Agende sua Consulta</p>
        </div>
        <div className="absolute h-[23px] left-[61px] top-[143.48px] w-[296.78px]" data-name="Link">
          <AImage additionalClassNames="left-0 top-1/2" />
          <Wrapper2 additionalClassNames="left-[22px] w-[482px]">Edifício Varig - Asa Norte, Brasília - DF, 70714-020</Wrapper2>
        </div>
        <div className="absolute h-[23px] left-[61px] top-[171.48px] w-[148.33px]" data-name="Link">
          <div className="-translate-y-1/2 absolute left-0 size-[15px] top-1/2" data-name="a">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgA1} />
            </div>
          </div>
          <Wrapper2 additionalClassNames="left-[25px] w-[166px]">+55 61 99599-1322</Wrapper2>
        </div>
        <div className="absolute h-[239px] left-[60px] right-[60px] top-[253px]" data-name="Form - Contact form">
          <div className="absolute border-b border-solid border-white h-[38px] left-0 overflow-clip right-[279px] top-0" data-name="Input">
            <div className="absolute h-[18px] left-0 overflow-clip right-0 top-[9.5px]" data-name="Container">
              <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[13px] text-white top-[8.98px] w-[53px]">
                <p className="leading-[normal]">Nome</p>
              </div>
            </div>
          </div>
          <div className="absolute border-b border-solid border-white h-[38px] left-[279px] overflow-clip right-0 top-0" data-name="Input">
            <div className="absolute h-[18px] left-0 overflow-clip right-0 top-[9.5px]" data-name="Container">
              <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-0 not-italic text-[13px] text-white top-[9px] w-[37.894px]">
                <p className="leading-[normal]">E-mail</p>
              </div>
            </div>
          </div>
          <div className="absolute border-b border-solid border-white h-[115px] left-0 overflow-auto right-0 top-[58px]" data-name="Textarea">
            <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[24px] justify-center leading-[0] left-0 text-[13px] text-white top-[12.48px] w-[82px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              <p className="leading-[24px]">Mensagem</p>
            </div>
          </div>
          <div className="absolute bg-[#452b1e] border border-[rgba(22,19,18,0)] border-solid h-[46px] left-0 top-[193px] w-[166.69px]" data-name="Button">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[calc(50%-0.35px)] not-italic text-[15px] text-center text-white top-[22.48px] tracking-[-0.225px] w-[130px]">
              <p className="leading-[25px]">Enviar Mensagem</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute contents left-1/2 top-[837px]">
        <div className="absolute bg-[#452b1e] h-[203px] left-0 right-0 top-[837px]" data-name="Background" />
        <div className="absolute bg-[#452b1e] h-[384px] left-0 right-0 top-[1040px]" data-name="Background" />
        <div className="absolute inset-[1098px_646px_-415px_557px]" data-name="Paragraph">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[23px] justify-center leading-[0] left-[-0.39px] not-italic text-[#a57255] text-[21px] top-[12.01px] tracking-[-0.42px] w-[223px]">
            <p className="leading-[30px]">Iniciar uma Conversa</p>
          </div>
          <div className="-translate-y-1/2 absolute h-[23px] left-0 top-[calc(50%-6.16px)] w-[181.86px]" data-name="Link">
            <div className="-translate-y-1/2 absolute h-[14px] left-0 top-1/2 w-[19px]" data-name="a">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgA2} />
              </div>
            </div>
            <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[29px] not-italic text-[15px] text-white top-1/2 tracking-[-0.225px] whitespace-nowrap">
              <p className="leading-[23px]">contato@sousaaraujo.adv.br</p>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute h-[23px] left-0 top-[calc(50%+30.84px)] w-[149.33px]" data-name="Link">
            <div className="-translate-y-1/2 absolute left-0 size-[16px] top-1/2" data-name="a">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgA3} />
              </div>
            </div>
            <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[23px] justify-center leading-[0] left-[29px] not-italic text-[15px] text-white top-[calc(50%+0.17px)] tracking-[-0.225px] w-[143px]">
              <p className="leading-[23px]">+55 61 99599-1322</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-[1098.17px_362.21px_-543.17px_840.59px]" data-name="Paragraph">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[30px] justify-center leading-[0] left-0 not-italic text-[#a57255] text-[21px] top-[15px] tracking-[-0.42px] w-[181.873px]">
            <p className="leading-[30px]">Nossa Localização</p>
          </div>
        </div>
        <div className="absolute inset-[1098px_82px_-415px_1121px]" data-name="Container">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[30px] justify-center leading-[0] left-0 not-italic text-[#a57255] text-[21px] top-[15.17px] tracking-[-0.42px] w-[139px]">
            <p className="leading-[30px]">Redes Sociais</p>
          </div>
          <div className="absolute inset-[42.65%_35.87%_48.66%_53.68%]" data-name="Group">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.7666 13.3926">
              <g id="Group">
                <path d={svgPaths.p36ddb6c0} fill="var(--fill-0, white)" id="Subtract" />
              </g>
            </svg>
          </div>
          <div className="absolute inset-[40.91%_67.58%_47.08%_25.71%]" data-name="Group">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8879 18.5014">
              <g id="Group">
                <path d={svgPaths.p32897000} fill="var(--fill-0, white)" id="Vector" />
              </g>
            </svg>
          </div>
          <div className="absolute inset-[41.78%_53.51%_48.01%_39.84%]" data-name="Group">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7645 15.7195">
              <g id="Group">
                <path d={svgPaths.p3e96f980} fill="var(--fill-0, #FDFDFD)" id="Vector" />
                <path d={svgPaths.p27edb600} fill="var(--fill-0, #FDFDFD)" id="Vector_2" />
                <path d={svgPaths.p6c16200} fill="var(--fill-0, #FDFDFD)" id="Vector_3" />
              </g>
            </svg>
          </div>
          <div className="absolute inset-[41.15%_81.43%_47.16%_14.35%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 18">
              <path d={svgPaths.p1776280} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[41.78%_92.95%_47.38%_0]" data-name="Group">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7009 16.7009">
              <g id="Group">
                <path d={svgPaths.p39ee7a00} fill="var(--fill-0, white)" id="Vector" />
                <path d={svgPaths.p39e383c0} fill="var(--fill-0, white)" id="Vector_2" />
                <path d={svgPaths.p2ddc5300} fill="var(--fill-0, white)" id="Vector_3" />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute h-[111px] left-[829px] top-[1150px] w-[237px]" data-name="Link">
          <AImage additionalClassNames="left-[12px] top-[calc(50%-36px)]" />
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[99px] justify-center leading-[0] left-[32px] not-italic text-[15px] text-white top-[52.5px] tracking-[-0.225px] w-[213px]">
            <p className="leading-[23px]">Edifício Varig - Setor Comercial Norte, quadra 04, bloco B, sala 702, 7 andar Pétala D - Asa Norte, Brasília - DF, 70714-020</p>
          </div>
        </div>
        <div className="absolute h-[30px] left-[63px] right-[941px] top-[1098px]" data-name="Form - Contact form">
          <div className="absolute border-[#c1bbbb] border-b border-solid h-[38px] left-[18px] overflow-clip right-[165px] top-0" data-name="Input">
            <div className="absolute h-[18px] left-0 overflow-clip right-0 top-[9.5px]" data-name="Container">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[80.5px] not-italic text-[#a57255] text-[13px] text-center top-[9.5px] w-[205px]">
                <p className="leading-[normal] whitespace-pre-wrap">{`Receba nossos  conteúdos`}</p>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[22px] left-[calc(50%+142.83px)] top-[calc(50%+8px)] w-[49.67px]" data-name="Button">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[calc(50%-33.83px)] not-italic text-[15px] text-center text-white top-[11px] tracking-[-0.225px] w-[88px]">
              <p className="leading-[25px]">Inscrever-se</p>
            </div>
            <div className="absolute left-[39.67px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
              <Group additionalClassNames="inset-[5.23%_5.05%_3.81%_3.57%]" />
              <Group1 />
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute h-[68px] left-[42px] top-[calc(50%+972px)] w-[248.95px]" data-name="Link">
          <div className="-translate-y-1/2 absolute h-[67.98px] left-0 opacity-0 top-[calc(50%-0.01px)] w-[248.95px]" data-name="logo main">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[100.03%] left-0 max-w-none top-[-0.01%] w-[100.01%]" src={imgLogoMain} />
            </div>
          </div>
          <div className="absolute aspect-[248.91000366210938/67.9800033569336] bottom-[0.01%] left-0 opacity-0 top-[0.01%]" data-name="logo dark">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[182.41%] left-[-41.2%] max-w-none top-[-41.2%] w-[182.4%]" src={imgLogoMain} />
            </div>
          </div>
        </div>
        <div className="absolute h-[22px] left-[1160px] top-[1349.23px] w-[184.66px]" data-name="Link">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[10.66px] not-italic text-[15px] text-white top-[11.27px] tracking-[-0.225px] w-[172.994px]">
            <p className="leading-[25px]">Agendar Atendimento</p>
          </div>
          <div className="absolute left-[174.66px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
            <Group additionalClassNames="inset-[5.22%_5.05%_3.81%_3.57%]" />
            <Group1 />
          </div>
        </div>
        <div className="absolute border-[#a57255] border-b border-solid bottom-[-558px] h-[2px] left-[81px] w-[1265px]" data-name="Horizontal Divider" />
        <div className="absolute bottom-[-512px] contents left-[170px] top-[1280px]">
          <div className="absolute bottom-[-512px] left-[170px] top-[1280px] w-[697px]" data-name="Navigation - Top Menu → List" />
        </div>
        <div className="-translate-y-1/2 absolute h-[21px] left-[81px] top-[calc(50%+940px)] w-[42.31px]" data-name="Item → Link">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] left-0 text-[15px] text-white top-[10px] tracking-[-0.225px] w-[42.639px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <p className="leading-[21px]">Home</p>
          </div>
        </div>
        <Wrapper3 additionalClassNames="left-[175px] top-[1358.5px] w-[42.138px]">Sobre</Wrapper3>
        <Wrapper3 additionalClassNames="left-[269px] top-[1359.5px] w-[120px]">Áreas de Atuação</Wrapper3>
        <Wrapper3 additionalClassNames="left-[441px] top-[1358.5px] w-[38px]">Blog</Wrapper3>
        <Wrapper3 additionalClassNames="left-[531px] top-[1359.5px] w-[30px]">FAQ</Wrapper3>
        <Wrapper3 additionalClassNames="left-[613px] top-[1359.5px] w-[66px]">Contato</Wrapper3>
        <div className="absolute bg-[#452b1e] h-[133px] left-0 right-0 top-[1408px]" data-name="Paragraph+Background">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[41px] justify-center leading-[0] left-[83px] not-italic opacity-60 text-[13px] text-white top-[61.5px] tracking-[-0.225px] w-[1187px]">
            <p className="leading-[23px] whitespace-pre-wrap">{`Termos de Uso  ·  Política de Privacidade © 2026 SA | Sousa Araújo Advocacia · Todos os direitos reservados Comunicação em conformidade com o Provimento OAB 205/2021 - Desenvolvido por Mix7`}</p>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[91px] justify-center leading-[0] left-[568px] not-italic text-[15px] text-white top-[947.5px] tracking-[-0.525px] w-[773px]">
          <p className="leading-[20px]">Escritório de advocacia especializada em Brasília, fundado pela Dra. Lidiane Sousa Araújo, OAB/DF 34.876. Estrutura presencial no Distrito Federal e atendimento online para todo o Brasil e brasileiros no exterior, com apoio de uma rede de parceiros qualificados. Atuação estratégica em Direito de Família, Regularização de Imóveis, Homologação de Sentença Estrangeira e Consultoria Empresarial.</p>
        </div>
        <div className="absolute contents inset-[108.62%_68.82%_-16.99%_5.56%]">
          <div className="absolute contents inset-[109.7%_68.82%_-14.72%_10.83%]" data-name="Group">
            <Group8Vector1 additionalClassNames="inset-[110.65%_87.43%_-14%_10.83%]">
              <path d={svgPaths.p17dc5480} fill="var(--fill-0, white)" id="Vector" />
            </Group8Vector1>
            <Group8Vector1 additionalClassNames="inset-[110.65%_85.49%_-14%_12.78%]">
              <path d={svgPaths.p17568e00} fill="var(--fill-0, white)" id="Vector" />
            </Group8Vector1>
            <div className="absolute inset-[110.77%_83.4%_-14%_14.72%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
                <path d={svgPaths.p129ffec0} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[110.65%_81.6%_-14%_16.74%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
                <path d={svgPaths.p325e3000} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[110.77%_79.65%_-14%_18.54%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 27">
                <path d={svgPaths.p16743ac0} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <Group8Vector additionalClassNames="inset-[110.77%_77.22%_-14%_21.04%]" />
            <div className="absolute inset-[110.77%_75.21%_-14%_22.78%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 27">
                <path d={svgPaths.p1cc1fa00} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <Group8Vector additionalClassNames="inset-[110.77%_73.54%_-14%_24.72%]" />
            <div className="absolute inset-[109.7%_71.74%_-14%_26.39%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 36">
                <path d={svgPaths.p10e63500} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[110.77%_70.63%_-14.72%_28.06%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 33">
                <path d={svgPaths.p3ba1f30} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <Group8Vector1 additionalClassNames="inset-[110.65%_68.82%_-14%_29.44%]">
              <path d={svgPaths.pcd23300} fill="var(--fill-0, white)" id="Vector" />
            </Group8Vector1>
          </div>
          <div className="absolute contents inset-[115.19%_76.04%_-16.15%_18.13%]" data-name="Group">
            <Group9Vector additionalClassNames="inset-[115.19%_81.25%_-16.15%_18.13%]" />
            <Wrapper1 additionalClassNames="inset-[115.19%_80.49%_-16.15%_18.89%]">
              <path d={svgPaths.p2e2eba00} fill="var(--fill-0, white)" id="Vector" />
            </Wrapper1>
            <Group9Vector1 additionalClassNames="inset-[115.19%_79.72%_-16.15%_19.51%]">
              <path d={svgPaths.pdbceb00} fill="var(--fill-0, white)" id="Vector" />
            </Group9Vector1>
            <Group9Vector1 additionalClassNames="inset-[115.19%_78.96%_-16.15%_20.28%]">
              <path d={svgPaths.p142e3800} fill="var(--fill-0, white)" id="Vector" />
            </Group9Vector1>
            <Group9Vector2 additionalClassNames="inset-[115.19%_78.33%_-16.15%_21.11%]">
              <path d={svgPaths.p3723ba80} fill="var(--fill-0, white)" id="Vector" />
            </Group9Vector2>
            <Group9Vector additionalClassNames="inset-[115.19%_77.64%_-16.15%_21.74%]" />
            <Group9Vector2 additionalClassNames="inset-[115.19%_77.01%_-16.15%_22.43%]">
              <path d={svgPaths.p1cad2b80} fill="var(--fill-0, white)" id="Vector" />
            </Group9Vector2>
            <div className="absolute inset-[115.19%_76.74%_-16.15%_23.13%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 8">
                <path d="M2 8H0V0H2V8Z" fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
            <Wrapper1 additionalClassNames="inset-[115.19%_76.04%_-16.15%_23.33%]">
              <path d={svgPaths.p2c705980} fill="var(--fill-0, white)" id="Vector" />
            </Wrapper1>
          </div>
          <div className="absolute contents inset-[108.62%_90.07%_-16.99%_5.56%]" data-name="Group">
            <div className="absolute inset-[108.62%_90.42%_-16.99%_5.56%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 58 70">
                <path d={svgPaths.pd9fc9f0} fill="var(--fill-0, #D1B9A7)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[108.86%_92.57%_-12.57%_6.18%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 31">
                <path d={svgPaths.p959f0f0} fill="var(--fill-0, #D1B9A7)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[108.86%_90.83%_-11.49%_8.06%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 22">
                <path d={svgPaths.p3b5c4e80} fill="var(--fill-0, #D1B9A7)" id="Vector" />
              </svg>
            </div>
            <div className="absolute inset-[115.91%_90.07%_-16.63%_9.03%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 6">
                <path d={svgPaths.p146bae00} fill="var(--fill-0, #D1B9A7)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}