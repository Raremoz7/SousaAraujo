import svgPaths from "./svg-52o6rdum1l";
import imgBackground from "figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png";

export default function Background() {
  return (
    <div className="relative size-full" data-name="Background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgBackground} />
        <div className="absolute bg-[rgba(22,19,18,0.4)] inset-0" />
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Lora:Regular',sans-serif] font-normal h-[107px] justify-center leading-[0] left-[calc(50%+0.5px)] text-[43px] text-center text-white top-[271.67px] tracking-[-0.516px] w-[567px]">
        <p className="leading-[52px]">Quem entende o processo, controla o resultado</p>
      </div>
      <div className="-translate-x-1/2 absolute contents left-1/2 top-[367px]">
        <div className="absolute bg-[#a57255] h-[49.314px] left-[562px] top-[367px] w-[316px]" />
        <div className="absolute left-[829.98px] size-[38.283px] top-[372.84px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.2834 38.2834">
            <circle cx="19.1417" cy="19.1417" fill="var(--fill-0, #A57255)" id="Ellipse 3" r="19.1417" />
          </svg>
        </div>
        <div className="absolute inset-[63.64%_40.38%_33.12%_58.27%]" data-name="Vector (Stroke)">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4661 19.4661">
            <path d={svgPaths.p353ec300} fill="var(--fill-0, white)" id="Vector (Stroke)" />
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] justify-center leading-[0] left-[584.06px] not-italic text-[15.184px] text-white top-[391.68px] tracking-[-0.2278px] whitespace-nowrap">
          <p className="leading-[25.306px]">Agendar Consulta de Viabilidade</p>
        </div>
      </div>
    </div>
  );
}