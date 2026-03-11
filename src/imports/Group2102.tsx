import svgPaths from "./svg-bjuf4v4syt";
import imgRectangle4 from "figma:asset/1bde68b0434e033834687b9e219a2315c5e30659.png";

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="-translate-x-1/2 absolute h-[1005px] left-1/2 top-0 w-[1440px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgRectangle4} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(210.536deg, rgba(22, 19, 18, 0) 33.101%, rgba(22, 19, 18, 0.7) 82.021%), linear-gradient(182.823deg, rgba(22, 19, 18, 0) 49.957%, rgb(22, 19, 18) 86.803%)" }} />
        </div>
      </div>
      <p className="absolute font-['Marcellus:Regular',sans-serif] h-[191px] leading-[0] left-[80px] not-italic text-[54px] text-white top-[437px] tracking-[-0.87px] w-[736px]">
        <span className="leading-[62px]">{`Escritório de advocacia em Brasília com `}</span>
        <span className="leading-[62px]">atuação nacional e para brasileiros no exterior</span>
      </p>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[52px] justify-center leading-[0] left-[81px] text-[20px] text-white top-[384px] tracking-[-0.95px] w-[257.669px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[26px]">A solução mais inteligente começa antes do processo</p>
      </div>
      <div className="absolute left-[1049.78px] size-[103.444px] top-[482.78px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103.444 103.444">
          <circle cx="51.7222" cy="51.7222" data-figma-bg-blur-radius="3.11111" fill="var(--fill-0, white)" fillOpacity="0.3" id="Ellipse 1" r="51.7222" />
          <defs>
            <clipPath id="bgblur_0_1_590_clip_path" transform="translate(3.11111 3.11111)">
              <circle cx="51.7222" cy="51.7222" r="51.7222" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="absolute left-[1035px] size-[133px] top-[468px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 133">
          <circle cx="66.5" cy="66.5" data-figma-bg-blur-radius="3.11111" id="Ellipse 2" r="65" stroke="var(--stroke-0, #AC795F)" strokeOpacity="0.4" strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute flex items-center justify-center left-[1082px] size-[39px] top-[517px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="relative size-[39px]">
            <div className="absolute bottom-1/4 left-[13.98%] right-[13.98%] top-[9.97%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0929 25.3611">
                <path d={svgPaths.p184ba280} fill="var(--fill-0, white)" id="Polygon 1" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-y-full absolute flex flex-col font-['Signaturex_Demo:Regular',sans-serif] h-[42px] justify-end leading-[0] left-[81px] not-italic text-[15.667px] text-white top-[710px] w-[230px]">
        <p className="leading-[21.933px]">Lidiane Sousa Araújo</p>
      </div>
      <div className="-translate-y-full absolute flex flex-col font-['Signaturex_Demo:Regular',sans-serif] h-[50px] justify-end leading-[0] left-[291px] not-italic text-[15.667px] text-white top-[710px] w-[9px]">
        <p className="leading-[21.933px]">´</p>
      </div>
    </div>
  );
}