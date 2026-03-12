import imgBackground from "figma:asset/71f13aaa0ca504c09e2ef8743773ab6d8f0274fa.png";

export default function Background() {
  return (
    <div className="relative size-full" data-name="Background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[154.86%] left-[-2.97%] max-w-none top-[-39.03%] w-[105.97%]" src={imgBackground} />
        </div>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(209.495deg, rgba(102, 102, 102, 0) 23.398%, rgba(0, 0, 0, 0.4) 76.602%)" }} />
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[69px] justify-center leading-[0] left-[80px] not-italic text-[25px] text-white top-[454.5px] tracking-[-0.525px] w-[265.062px]">
        <p className="leading-[35px]">A solução mais inteligente começa antes do processo</p>
      </div>
    </div>
  );
}