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
      <div className="absolute bg-[#a57255] h-[46px] left-[561px] top-[361.17px] w-[319px]" data-name="Link">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[20px] justify-center leading-[0] left-[41px] not-italic text-[15px] text-white top-[23px] tracking-[-0.225px] w-[238px]">
          <p className="leading-[25px]">Agendar Consulta de Viabilidade</p>
        </div>
      </div>
    </div>
  );
}