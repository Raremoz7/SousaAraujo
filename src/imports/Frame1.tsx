import clsx from "clsx";
import imgA from "figma:asset/506fd5c9f808551bd85a20563ec29524a2772941.png";
import imgA1 from "figma:asset/4a36bb11fdcdbb05a48be1bedc1e4dcfd7d3dee4.png";
import imgA2 from "figma:asset/0a485a946753f4d21e08d3ed3d8d9779909dd212.png";
import imgA3 from "figma:asset/e131e0fb7fa0de846a06e6f0060eba49c87abac7.png";
import imgA4 from "figma:asset/a6a19f7d74d4d71fe6c9f1d51fd5ad4a4f1a5b98.png";
import imgA5 from "figma:asset/b9e6fa721be691a0274735fd458f8e585f0501ff.png";
import imgA6 from "figma:asset/a8eaae6d35224ebcf5d425153dfbabf03391cd68.png";
type ABackgroundImageProps = {
  additionalClassNames?: string;
};

function ABackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ABackgroundImageProps>) {
  return (
    <div className={clsx("absolute aspect-[496/316.3299865722656]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[316.33px] left-[1608px] right-[1072px] top-px" data-name="Group - 3 / 7">
        <div className="absolute contents left-0 top-0">
          <div className="absolute aspect-[496/316.3299865722656] left-0 right-0 top-0" data-name="a">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgA} />
            </div>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[35px] not-italic text-[15px] text-white top-[210.5px] tracking-[-0.225px] w-[374px]">
            <p className="leading-[25px]">União Estável e Proteção Patrimonial</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[35px] not-italic text-[13px] text-white top-[264.5px] tracking-[-0.195px] w-[438px]">
            <p className="leading-[18px]">Reconhecimento, dissolução e partilha com orientação clara sobre direitos, provas e riscos. Estruturação de acordos e medidas para evitar insegurança patrimonial e conflitos que se prolongam por falta de formalização.</p>
          </div>
          <ABackgroundImage additionalClassNames="left-0 right-0 top-0">
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute h-[118.92%] left-[-16.27%] max-w-none top-[-18.92%] w-[135.89%]" src={imgA1} />
            </div>
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)" }} />
          </ABackgroundImage>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[35px] not-italic text-[15px] text-white top-[210.5px] tracking-[-0.225px] w-[374px]">
            <p className="leading-[25px]">União Estável e Proteção Patrimonial</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[35px] not-italic text-[13px] text-white top-[264.5px] tracking-[-0.195px] w-[438px]">
            <p className="leading-[18px]">Reconhecimento, dissolução e partilha com orientação clara sobre direitos, provas e riscos. Estruturação de acordos e medidas para evitar insegurança patrimonial e conflitos que se prolongam por falta de formalização.</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[316.33px] left-[1072px] right-[1608px] top-px" data-name="Group - 3 / 6">
        <div className="absolute contents left-0 top-0">
          <ABackgroundImage additionalClassNames="left-0 right-0 top-0">
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgA2} />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)" }} />
          </ABackgroundImage>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[35px] not-italic text-[15px] text-white top-[210.5px] tracking-[-0.225px] w-[374px]">
            <p className="leading-[25px]">Inventário e Sucessões</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[35px] not-italic text-[13px] text-white top-[264.5px] tracking-[-0.195px] w-[438px]">
            <p className="leading-[18px]">Planejamento e condução do inventário com organização documental rigorosa e comunicação clara em cada etapa. Sempre que viável, prioriza-se a via extrajudicial para reduzir desgaste e tempo, preservando patrimônio e evitando conflitos familiares.</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[316.33px] left-[536px] right-[2144px] top-px" data-name="Group - 3 / 5">
        <div className="absolute contents left-0 top-0">
          <ABackgroundImage additionalClassNames="left-0 right-0 top-0">
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgA3} />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)" }} />
          </ABackgroundImage>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[35px] not-italic text-[15px] text-white top-[210.5px] tracking-[-0.225px] w-[374px]">
            <p className="leading-[25px]">Guarda e Plano de Convivência</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[35px] not-italic text-[13px] text-white top-[264.5px] tracking-[-0.195px] w-[438px]">
            <p className="leading-[18px]">Estruturação de acordos e medidas para garantir previsibilidade, estabilidade e proteção dos vínculos familiares. Atuação com foco no melhor interesse da criança, com regras claras de convivência, férias, datas especiais e comunicação entre as partes.</p>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[2680px] top-px">
        <ABackgroundImage additionalClassNames="left-[2680px] right-0 top-px">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgA4} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)" }} />
        </ABackgroundImage>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[2709px] not-italic text-[15px] text-white top-[211.5px] tracking-[-0.225px] w-[374px]">
          <p className="leading-[25px]">Registro de Marca no INPI</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[38px] justify-center leading-[0] left-[2709px] not-italic text-[13px] text-white top-[255.5px] tracking-[-0.195px] w-[438px]">
          <p className="leading-[18px]">Da busca de viabilidade ao protocolo e acompanhamento do processo, com orientação para reduzir riscos de indeferimento e conflitos. Proteja sua marca e organize sua base jurídica para crescer com mais segurança.</p>
        </div>
      </div>
      <div className="absolute contents left-[2144px] top-px">
        <ABackgroundImage additionalClassNames="left-[2144px] right-[536px] top-px">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgA5} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)" }} />
        </ABackgroundImage>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[2173px] not-italic text-[15px] text-white top-[212px] tracking-[-0.225px] w-[374px]">
          <p className="leading-[25px]">Empresarial Consultivo para PMEs</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[2173px] not-italic text-[13px] text-white top-[265.5px] tracking-[-0.195px] w-[438px]">
          <p className="leading-[18px]">Suporte preventivo para empresários com foco em contratos, notificações e rotinas jurídicas essenciais. Modelo ideal para recorrência (retainer), reduzindo riscos e protegendo o negócio antes que o problema vire processo.</p>
        </div>
      </div>
      <div className="absolute contents left-0 top-0">
        <ABackgroundImage additionalClassNames="left-0 right-[2680px] top-0">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgA6} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)" }} />
        </ABackgroundImage>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[35px] not-italic text-[15px] text-white top-[210.5px] tracking-[-0.225px] w-[374px]">
          <p className="leading-[25px]">Pensão Alimentícia e Execução</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[18px] justify-center leading-[0] left-[35px] not-italic text-[13px] text-white top-[264.5px] tracking-[-0.195px] w-[438px]">
          <p className="leading-[18px]">Atuação completa para fixar, revisar ou cobrar alimentos com base em provas e estratégia processual. Orientação prática sobre documentos, prazos e medidas cabíveis — inclusive para situações urgentes e inadimplência recorrente.</p>
        </div>
      </div>
    </div>
  );
}