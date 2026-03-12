import clsx from "clsx";
import svgPaths from "./svg-ooetqark54";
type GroupProps = {
  additionalClassNames?: string;
};

function Group({ children, additionalClassNames = "" }: React.PropsWithChildren<GroupProps>) {
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

export default function Group1() {
  return (
    <div className="relative size-full">
      <div className="-translate-x-1/2 absolute bg-[#452b1e] h-[468px] left-1/2 top-0 w-[1440px]" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[105px] justify-center leading-[0] left-[calc(50%-0.5px)] not-italic text-[43px] text-center text-white top-[131.5px] tracking-[-0.516px] w-[511px]">
        <p className="leading-[52px]">Seja um Parceiro da Sousa Araújo Advocacia</p>
      </div>
      <div className="-translate-x-1/2 absolute h-[22px] left-1/2 top-[336px] w-[172px]" data-name="Link">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[75px] justify-center leading-[0] left-[calc(50%-0.5px)] not-italic text-[18px] text-center text-white top-[-78.5px] tracking-[-0.225px] w-[959px]">
          <p className="leading-[25px]">Se você é tradutor juramentado, correspondente jurídico, contador, consultor empresarial ou profissional técnico e deseja integrar nossa rede de parceiros, entre em contato. Valorizamos profissionais comprometidos com qualidade, ética, prazo e comunicação transparente.</p>
        </div>
        <div className="absolute contents left-[46px] top-[19px]">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[46px] not-italic text-[15px] text-white top-[29px] tracking-[-0.225px] w-[114px]">
            <p className="leading-[25px]">Seja parceiro</p>
          </div>
          <div className="absolute left-[146px] overflow-clip size-[10px] top-[25px]" data-name="SVG">
            <Group additionalClassNames="inset-[5.23%_5.05%_3.81%_3.57%]">
              <g id="Group">
                <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
              </g>
            </Group>
            <Group additionalClassNames="inset-[104.78%_115.05%_-95.74%_-106.43%]">
              <g id="Group" opacity="0.5">
                <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
              </g>
            </Group>
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[923px] text-[32px] text-[red] top-[172px] tracking-[-0.516px] w-[48px]">
        <p className="leading-[32px]">H3</p>
      </div>
    </div>
  );
}