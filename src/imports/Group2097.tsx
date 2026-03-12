import clsx from "clsx";
import svgPaths from "./svg-qipwgp3ad8";
import imgRectangle30 from "figma:asset/f93fab1ef1d5d123bb5e3c544b05533319fc528f.png";
import imgRectangle31 from "figma:asset/0a2c4b4b53a6b852695e6a0c347b2fd603ee66f2.png";
import imgRectangle32 from "figma:asset/9972a3ecc156d325ee1f67a9bdb5e6e98cd03776.png";
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
      <div className="absolute bg-[#452b1e] h-[849px] left-0 top-0 w-[1440px]" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[42px] justify-center leading-[0] left-[80px] not-italic text-[32px] text-white top-[243px] tracking-[-0.832px] w-[306.434px]">
        <p className="leading-[42px]">Rede de Parceiros Qualificados</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[51px] justify-center leading-[0] left-[80px] text-[18px] text-white top-[364.5px] tracking-[-0.27px] w-[333px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[25px]">Atuamos em rede com advogados e especialistas selecionados para garantir cobertura nacional e expertise complementar em cada área de demanda.</p>
      </div>
      <div className="absolute h-[22px] left-[80px] top-[451px] w-[187px]" data-name="Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] left-0 text-[15px] text-white top-[11px] tracking-[-0.225px] w-[136px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[25px]">Trabalhe Conosco</p>
        </div>
        <div className="absolute left-[103.81px] overflow-clip size-[10px] top-[7px]" data-name="SVG">
          <Group additionalClassNames="inset-[104.78%_115.05%_-95.74%_-106.43%]">
            <g id="Group" opacity="0.5">
              <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
            </g>
          </Group>
        </div>
        <Group additionalClassNames="inset-[36.36%_27.2%_22.29%_67.91%]">
          <g id="Group">
            <path d={svgPaths.p1238f200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.02093" />
          </g>
        </Group>
      </div>
      <div className="absolute h-[424px] left-[501px] top-[196px] w-[261.198px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[112.79%] left-[-135.53%] max-w-none top-[-3.12%] w-[328.03%]" src={imgRectangle30} />
        </div>
      </div>
      <div className="absolute h-[424px] left-[780.09px] top-[196px] w-[261.198px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[154.45%] left-[-269.4%] max-w-none top-[-37.18%] w-[449.21%]" src={imgRectangle31} />
        </div>
      </div>
      <div className="absolute h-[424px] left-[1059.18px] top-[196px] w-[261.198px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[127.82%] left-[-144.66%] max-w-none top-[-20.24%] w-[371.74%]" src={imgRectangle32} />
        </div>
      </div>
    </div>
  );
}