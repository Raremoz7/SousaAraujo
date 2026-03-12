import clsx from "clsx";
import imgA from "figma:asset/7d9d48b17642bfd1560d9af963da50ca64597cae.png";
import imgA1 from "figma:asset/ebaadb496e0dd332168326162898a0dc2625533e.png";
import imgA2 from "figma:asset/bba9b98207af961142aa7b6fdc3f47e7b6d4a280.png";
import imgA3 from "figma:asset/a378ec088b55bf9acb776964f361fc10b84fde64.png";
import imgA4 from "figma:asset/c384f55beb405894d8404b0e48841ea92161b830.png";
import imgA5 from "figma:asset/4e0368effa05e19184d3051ff856b436790a646f.png";

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 overflow-hidden">{children}</div>
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)" }} />
    </div>
  );
}
type BackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText1({ text, additionalClassNames = "" }: BackgroundImageAndText1Props) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[14.703px] justify-center leading-[0] left-[28.59px] text-[10.619px] text-white tracking-[-0.1593px] w-[347.982px]", additionalClassNames)}>
      <p className="leading-[14.703px]">{text}</p>
    </div>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium h-[16.337px] justify-center leading-[0] left-[28.59px] text-[12.253px] text-white tracking-[-0.1838px] w-[236.072px]", additionalClassNames)}>
      <p className="leading-[20.421px]">{text}</p>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[#a57255] bottom-[321.45px] opacity-60 right-[909.16px] top-0 w-[0.817px]" data-name="Vertical Divider" />
      <div className="absolute bg-[#a57255] bottom-[2.45px] opacity-60 right-[909.16px] top-[319px] w-[0.817px]" data-name="Vertical Divider" />
      <div className="absolute contents left-0 top-0">
        <div className="absolute aspect-[496/316.3299865722656] left-0 overflow-clip right-[941.84px] top-0" data-name="a">
          <BackgroundImage>
            <img alt="" className="absolute h-[113.99%] left-[-15.08%] max-w-none top-[-7.16%] w-[130.25%]" src={imgA} />
          </BackgroundImage>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[237px] text-[32px] text-[red] top-[160px] tracking-[-0.516px] w-[48px]">
            <p className="leading-[32px]">H2</p>
          </div>
        </div>
        <BackgroundImageAndText text="Homologação de Sentença Estrangeira" additionalClassNames="top-[183.38px]" />
        <BackgroundImageAndText1 text="Validamos no Brasil decisões obtidas no exterior: divórcio, guarda de filhos, pensão alimentícia e outros acordos judiciais. Atendemos brasileiros nos EUA, Europa, Canadá e em todo o mundo." additionalClassNames="top-[225.04px]" />
      </div>
      <div className="absolute contents left-0 top-[319px]">
        <div className="absolute aspect-[496/316.3299865722656] left-0 overflow-clip right-[941.84px] top-[319px]" data-name="a">
          <BackgroundImage>
            <img alt="" className="absolute h-[113.99%] left-[-15.08%] max-w-none top-[-7.16%] w-[130.25%]" src={imgA1} />
          </BackgroundImage>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[274px] text-[32px] text-[red] top-[160px] tracking-[-0.516px] w-[48px]">
            <p className="leading-[32px]">H2</p>
          </div>
        </div>
        <BackgroundImageAndText text="Homologação de Sentença Estrangeira" additionalClassNames="top-[502.38px]" />
        <BackgroundImageAndText1 text="Validamos no Brasil decisões obtidas no exterior: divórcio, guarda de filhos, pensão alimentícia e outros acordos judiciais. Atendemos brasileiros nos EUA, Europa, Canadá e em todo o mundo." additionalClassNames="top-[544.04px]" />
      </div>
      <div className="absolute aspect-[496/316.3299865722656] left-[470.51px] overflow-clip right-[471.33px] top-0" data-name="a">
        <BackgroundImage>
          <img alt="" className="absolute h-[129.72%] left-[-12.56%] max-w-none top-[-29.87%] w-[148.22%]" src={imgA2} />
        </BackgroundImage>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[309.49px] text-[32px] text-[red] top-[160px] tracking-[-0.516px] w-[48px]">
          <p className="leading-[32px]">H2</p>
        </div>
      </div>
      <div className="absolute bg-[#a57255] bottom-[321.45px] opacity-60 right-[438.65px] top-0 w-[0.817px]" data-name="Vertical Divider" />
      <div className="absolute aspect-[496/316.3299865722656] left-[470.51px] overflow-clip right-[471.33px] top-[319px]" data-name="a">
        <BackgroundImage>
          <img alt="" className="absolute h-[154.09%] left-[-6.21%] max-w-none top-[-33.66%] w-[176.08%]" src={imgA3} />
        </BackgroundImage>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[317.49px] text-[32px] text-[red] top-[129px] tracking-[-0.516px] w-[48px]">
          <p className="leading-[32px]">H2</p>
        </div>
      </div>
      <div className="absolute bg-[#a57255] bottom-[2.45px] opacity-60 right-[438.65px] top-[319px] w-[0.817px]" data-name="Vertical Divider" />
      <div className="absolute contents left-[941.84px] top-[2.45px]">
        <div className="absolute aspect-[496/316.3299865722656] left-[941.84px] overflow-clip right-0 top-[2.45px]" data-name="a">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <img alt="" className="absolute max-w-none object-cover size-full" src={imgA4} />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180.625deg, rgba(102, 102, 102, 0) 14.869%, rgba(0, 0, 0, 0.7) 99.159%), linear-gradient(90deg, rgba(22, 19, 18, 0.15) 0%, rgba(22, 19, 18, 0.15) 100%)" }} />
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[238.16px] text-[32px] text-[red] top-[145.55px] tracking-[-0.516px] w-[48px]">
            <p className="leading-[32px]">H2</p>
          </div>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[16.337px] justify-center leading-[0] left-[970.43px] not-italic text-[12.253px] text-white top-[174.4px] tracking-[-0.1838px] w-[305.505px]">
          <p className="leading-[20.421px]">Divórcio Consensual e Litigioso</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[14.703px] justify-center leading-[0] left-[970.43px] not-italic text-[10.619px] text-white top-[218.51px] tracking-[-0.1593px] w-[357.784px]">
          <p className="leading-[14.703px]">Condução objetiva do divórcio, priorizando acordos bem estruturados quando possível e estratégia firme quando não há consenso. Organização de documentos, definição de riscos e proteção patrimonial para evitar prejuízos na partilha e acelerar o desfecho.</p>
        </div>
      </div>
      <div className="absolute contents left-[941.84px] top-[321.45px]">
        <div className="absolute aspect-[496/316.3299865722656] left-[941.84px] right-0 top-[321.45px]" data-name="a">
          <BackgroundImage>
            <img alt="" className="absolute h-[134.11%] left-[-26.65%] max-w-none top-[-6.83%] w-[153.24%]" src={imgA5} />
          </BackgroundImage>
        </div>
        <div className="absolute contents leading-[0] left-[970.43px] top-[421px]">
          <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center left-[1156px] text-[32px] text-[red] top-[452px] tracking-[-0.516px] w-[48px]">
            <p className="leading-[32px]">H2</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Medium',sans-serif] h-[16.337px] justify-center left-[970.43px] not-italic text-[12.253px] text-white top-[493.4px] tracking-[-0.1838px] w-[305.505px]">
            <p className="leading-[20.421px]">Divórcio Consensual e Litigioso</p>
          </div>
          <div className="-translate-y-1/2 absolute flex flex-col font-['Noto_Sans:Regular',sans-serif] h-[14.703px] justify-center left-[970.43px] not-italic text-[10.619px] text-white top-[537.51px] tracking-[-0.1593px] w-[357.784px]">
            <p className="leading-[14.703px]">Condução objetiva do divórcio, priorizando acordos bem estruturados quando possível e estratégia firme quando não há consenso. Organização de documentos, definição de riscos e proteção patrimonial para evitar prejuízos na partilha e acelerar o desfecho.</p>
          </div>
        </div>
      </div>
    </div>
  );
}