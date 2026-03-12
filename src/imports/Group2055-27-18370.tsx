import clsx from "clsx";
import svgPaths from "./svg-of8jkfw5q6";
import imgA from "figma:asset/bb375343044c3a51e65f183f442085b46aeafbe0.png";
import imgA1 from "figma:asset/44b3c30774c7c54729d9b4a4354bcac599746a0b.png";
import imgA2 from "figma:asset/3e71c6d61aa0e57d1a665be82b28cb9ea6a34e93.png";
import imgLogoMain from "figma:asset/92d1c8f198b7c135696dbc46470fa983e29992a7.png";
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium h-[21px] justify-center leading-[0] text-[15px] text-white tracking-[-0.225px]", additionalClassNames)}>
      <p className="leading-[21px]">{children}</p>
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
    <Wrapper additionalClassNames="inset-[5.22%_5.05%_3.81%_3.57%]">
      <g id="Group">
        <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
      </g>
    </Wrapper>
  );
}

export default function Group2() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#452b1e] h-[203px] left-0 right-0 top-0" data-name="Background" />
      <div className="absolute bg-[#452b1e] h-[384px] left-0 right-0 top-[203px]" data-name="Background" />
      <div className="absolute inset-[261px_646px_289px_557px]" data-name="Paragraph">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[23px] justify-center leading-[0] left-[-0.39px] not-italic text-[#a57255] text-[21px] top-[12.01px] tracking-[-0.42px] w-[223px]">
          <p className="leading-[30px]">Iniciar uma Conversa</p>
        </div>
        <div className="-translate-y-1/2 absolute h-[23px] left-0 top-[calc(50%-6.16px)] w-[181.86px]" data-name="Link">
          <div className="-translate-y-1/2 absolute h-[14px] left-0 top-1/2 w-[19px]" data-name="a">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgA} />
            </div>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] justify-center leading-[0] left-[29px] not-italic text-[15px] text-white top-1/2 tracking-[-0.225px] whitespace-nowrap">
            <p className="leading-[23px]">contato@sousaaraujo.adv.br</p>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute h-[23px] left-0 top-[calc(50%+30.84px)] w-[149.33px]" data-name="Link">
          <div className="-translate-y-1/2 absolute left-0 size-[16px] top-1/2" data-name="a">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgA1} />
            </div>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[23px] justify-center leading-[0] left-[29px] not-italic text-[15px] text-white top-[calc(50%+0.17px)] tracking-[-0.225px] w-[143px]">
            <p className="leading-[23px]">+55 61 99599-1322</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-[261.17px_362.21px_160.83px_840.59px]" data-name="Paragraph">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[30px] justify-center leading-[0] left-0 not-italic text-[#a57255] text-[21px] top-[15px] tracking-[-0.42px] w-[181.873px]">
          <p className="leading-[30px]">Nossa Localização</p>
        </div>
      </div>
      <div className="absolute inset-[261px_82px_289px_1121px]" data-name="Container">
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
      <div className="absolute h-[111px] left-[829px] top-[313px] w-[237px]" data-name="Link">
        <div className="-translate-y-1/2 absolute h-[17px] left-[12px] top-[calc(50%-36px)] w-[12px]" data-name="a">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgA2} />
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[99px] justify-center leading-[0] left-[32px] not-italic text-[15px] text-white top-[52.5px] tracking-[-0.225px] w-[213px]">
          <p className="leading-[23px]">Edifício Varig - Setor Comercial Norte, quadra 04, bloco B, sala 702, 7 andar Pétala D - Asa Norte, Brasília - DF, 70714-020</p>
        </div>
      </div>
      <div className="absolute h-[30px] left-[83px] right-[921px] top-[261px]" data-name="Form - Contact form">
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
            <Group />
            <Group1 />
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute h-[68px] left-[42px] top-[calc(50%+201.5px)] w-[248.95px]" data-name="Link">
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
      <div className="absolute h-[22px] left-[1160px] top-[512.23px] w-[184.66px]" data-name="Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[10.66px] not-italic text-[15px] text-white top-[11.27px] tracking-[-0.225px] w-[172.994px]">
          <p className="leading-[25px]">Agendar Atendimento</p>
        </div>
        <div className="absolute left-[174.66px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
          <Group />
          <Group1 />
        </div>
      </div>
      <div className="absolute border-[#a57255] border-b border-solid bottom-[146px] h-[2px] left-[81px] w-[1265px]" data-name="Horizontal Divider" />
      <div className="absolute bottom-[192px] contents left-[170px] top-[443px]">
        <div className="absolute bottom-[192px] left-[170px] top-[443px] w-[697px]" data-name="Navigation - Top Menu → List" />
      </div>
      <div className="-translate-y-1/2 absolute h-[21px] left-[81px] top-[calc(50%+169.5px)] w-[42.31px]" data-name="Item → Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] left-0 text-[15px] text-white top-[10px] tracking-[-0.225px] w-[42.639px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[21px]">Home</p>
        </div>
      </div>
      <Wrapper1 additionalClassNames="left-[175px] top-[521.5px] w-[42.138px]">Sobre</Wrapper1>
      <Wrapper1 additionalClassNames="left-[269px] top-[522.5px] w-[120px]">Áreas de Atuação</Wrapper1>
      <Wrapper1 additionalClassNames="left-[441px] top-[521.5px] w-[38px]">Blog</Wrapper1>
      <Wrapper1 additionalClassNames="left-[531px] top-[522.5px] w-[30px]">FAQ</Wrapper1>
      <Wrapper1 additionalClassNames="left-[613px] top-[522.5px] w-[66px]">Contato</Wrapper1>
      <div className="absolute bg-[#452b1e] h-[133px] left-0 right-0 top-[571px]" data-name="Paragraph+Background">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[41px] justify-center leading-[0] left-[83px] not-italic opacity-60 text-[13px] text-white top-[61.5px] tracking-[-0.225px] w-[1187px]">
          <p className="leading-[23px] whitespace-pre-wrap">{`Termos de Uso  ·  Política de Privacidade © 2026 SA | Sousa Araújo Advocacia · Todos os direitos reservados Comunicação em conformidade com o Provimento OAB 205/2021 - Desenvolvido por Mix7`}</p>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[91px] justify-center leading-[0] left-[557px] not-italic text-[15px] text-white top-[110.5px] tracking-[-0.525px] w-[716px]">
        <p className="leading-[20px]">Escritório de advocacia especializada em Brasília, fundado pela Dra. Lidiane Sousa Araújo, OAB/DF 34.876. Estrutura presencial no Distrito Federal e atendimento online para todo o Brasil e brasileiros no exterior, com apoio de uma rede de parceiros qualificados. Atuação estratégica em Direito de Família, Regularização de Imóveis, Homologação de Sentença Estrangeira e Consultoria Empresarial.</p>
      </div>
      <div className="absolute inset-[10.25%_68.61%_79.81%_5.76%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 369 70">
          <g id="Vector">
            <path d={svgPaths.p1ff51200} fill="white" />
            <path d={svgPaths.p3aabb800} fill="white" />
            <path d={svgPaths.p15dd9100} fill="white" />
            <path d={svgPaths.p311bc600} fill="white" />
            <path d={svgPaths.p3c07f200} fill="white" />
            <path d={svgPaths.p71cd80} fill="white" />
            <path d={svgPaths.ped6e400} fill="white" />
            <path d={svgPaths.p60ade00} fill="white" />
            <path d={svgPaths.p8b6ce00} fill="white" />
            <path d={svgPaths.pd50e800} fill="white" />
            <path d={svgPaths.p19305c00} fill="white" />
            <path d={svgPaths.pd80d900} fill="white" />
            <path d={svgPaths.pdcd45f0} fill="white" />
            <path d={svgPaths.p39168500} fill="white" />
            <path d={svgPaths.pe411980} fill="white" />
            <path d={svgPaths.p3565fa00} fill="white" />
            <path d={svgPaths.p16973580} fill="white" />
            <path d={svgPaths.p2ab60800} fill="white" />
            <path d={svgPaths.p1ac1acb0} fill="white" />
            <path d={svgPaths.p15b75b00} fill="white" />
            <path d={svgPaths.p34c2cf00} fill="var(--fill-0, #D1B9A7)" />
            <path d={svgPaths.p14db9a00} fill="var(--fill-0, #D1B9A7)" />
            <path d={svgPaths.p1c7cc280} fill="var(--fill-0, #D1B9A7)" />
            <path d={svgPaths.p1a0dc800} fill="var(--fill-0, #D1B9A7)" />
          </g>
        </svg>
      </div>
    </div>
  );
}