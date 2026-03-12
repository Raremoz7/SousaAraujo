import clsx from "clsx";
import imgLinkA from "figma:asset/34ce5436e08c758c7caf264d1f898def9d74aca4.png";
import imgLinkA1 from "figma:asset/d7fe1dfe4f2ee3429afecf2779e1c80cb1fe325d.png";
import imgLinkA2 from "figma:asset/a5580c23af3b216a8a3f848b2925b7a923ff7361.png";
type BackgroundHelperProps = {
  additionalClassNames?: string;
};

function BackgroundHelper({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundHelperProps>) {
  return (
    <div style={{ fontVariationSettings: "'wdth' 100" }} className={clsx("-translate-y-1/2 absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[69px] justify-center leading-[0] text-[#a57255] text-[25px] top-[534.5px] tracking-[-0.525px] w-[411px]", additionalClassNames)}>
      <p className="leading-[30px]">{children}</p>
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#452b1e] relative size-full" data-name="Background">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Marcellus:Regular',sans-serif] h-[105px] justify-center leading-[0] left-[calc(50%-640px)] not-italic text-[43px] text-white top-[105.5px] tracking-[-0.516px] w-[456px]">
        <p className="leading-[52px]">Histórias Reais de Quem Já Passou por Isso</p>
      </div>
      <div className="absolute h-[235.03px] left-[80px] overflow-clip right-[973.34px] top-[232px]" data-name="Container">
        <div className="absolute aspect-[409.8599853515625/249.1300048828125] left-[-11.6px] right-[-11.6px] top-[-7.05px]" data-name="Link → a">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLinkA} />
        </div>
      </div>
      <BackgroundHelper additionalClassNames="left-[80px]">Brasileira nos EUA, divorciada há 3 anos, estado civil bloqueado no Brasil</BackgroundHelper>
      <BackgroundHelper additionalClassNames="left-[527px]">Casal binacional com guarda definida na Alemanha — decisão sem validade no Brasil</BackgroundHelper>
      <BackgroundHelper additionalClassNames="left-[973px]">Pedido indeferido no STJ por erro documental — recuperado com nova instrução</BackgroundHelper>
      <p className="absolute font-['Noto_Sans:Regular',sans-serif] h-[140px] leading-[18px] left-[80px] not-italic text-[13px] text-white top-[588px] tracking-[-0.195px] w-[411px]">{`Cliente residia nos Estados Unidos há 8 anos e obteve o divórcio em tribunal americano. Ao tentar vender um imóvel no Brasil, descobriu que seu estado civil continuava como 'casada' no registro civil brasileiro. Procurou a Sousa Araújo Advocacia, que organizou toda a documentação à distância — tradução juramentada, apostilamento e petição ao STJ. Em 4 meses, a sentença foi homologada e o estado civil atualizado. O imóvel foi vendido sem impedimentos.`}</p>
      <p className="absolute font-['Noto_Sans:Regular',sans-serif] h-[140px] leading-[18px] left-[527px] not-italic text-[13px] text-white top-[588px] tracking-[-0.195px] w-[411px]">Brasileiro casado com alemã obteve decisão de guarda compartilhada em tribunal alemão. Ao retornar ao Brasil com os filhos, percebeu que a decisão não tinha validade aqui. A Sousa Araújo Advocacia conduziu a homologação no STJ com atendimento 100% online, incluindo tradução juramentada e apostila de Haia. A decisão foi homologada em 5 meses e a guarda passou a ter força executória no Brasil.</p>
      <p className="absolute font-['Noto_Sans:Regular',sans-serif] h-[140px] leading-[18px] left-[973px] not-italic text-[13px] text-white top-[588px] tracking-[-0.195px] w-[411px]">Cliente havia contratado outro profissional para homologar divórcio feito em Portugal. O pedido foi indeferido pelo STJ por falha na tradução e ausência de apostilamento. A Sousa Araújo Advocacia analisou o motivo do indeferimento, refez toda a instrução documental e protocolou novo pedido. Em 3 meses, a homologação foi deferida.</p>
      <div className="absolute h-[235.03px] left-[526.66px] overflow-clip right-[526.67px] top-[232px]" data-name="Container">
        <div className="absolute aspect-[409.8699951171875/249.1300048828125] left-[-11.6px] right-[-11.6px] top-[-7.05px]" data-name="Link → a">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLinkA1} />
        </div>
      </div>
      <div className="absolute h-[235.03px] left-[973px] overflow-clip right-[80.34px] top-[232px]" data-name="Container">
        <div className="absolute aspect-[409.8599853515625/249.1300048828125] left-[-11.6px] right-[-11.6px] top-[-7.05px]" data-name="Link → a">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLinkA2} />
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[20px] text-[32px] text-[red] top-[516px] tracking-[-0.516px] w-[48px]">
        <p className="leading-[32px]">H4</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[488px] text-[32px] text-[red] top-[497px] tracking-[-0.516px] w-[48px]">
        <p className="leading-[32px]">H4</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Lora:Bold',sans-serif] font-bold h-[62px] justify-center leading-[0] left-[935px] text-[32px] text-[red] top-[488px] tracking-[-0.516px] w-[48px]">
        <p className="leading-[32px]">H4</p>
      </div>
    </div>
  );
}