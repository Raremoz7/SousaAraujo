/**
 * CTA Banner Component
 * WordPress Block: sousa-araujo/cta-banner
 * "Quem entende o processo, controla o resultado"
 * Banner full-width com imagem de fundo e overlay escuro
 * 
 * WP Migration: Props podem vir do WordPress block attributes.
 * backgroundImage deve ser mapeada para WP Media Library URL.
 */

import imgBackground from "figma:asset/fcf68d553754923b39d9072139ccfeb443b32d57.png";

export function CtaBanner(props?: {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
}) {
  const content = {
    title: props?.title || 'Quem entende o processo, controla o resultado',
    buttonText: props?.buttonText || 'Agendar Consulta de Viabilidade',
    buttonHref: props?.buttonHref || '#contato',
    backgroundImage: props?.backgroundImage || imgBackground,
  };

  return (
    <section className="relative w-full h-[360px] md:h-[420px] lg:h-[520px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          className="absolute max-w-none object-cover size-full"
          src={content.backgroundImage}
        />
        <div className="absolute inset-0 bg-[rgba(22,19,18,0.4)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-[20px]">
        <h2 className="font-['Lora'] font-normal text-[26px] md:text-[34px] lg:text-[43px] leading-[1.25] md:leading-[1.2] lg:leading-[52px] tracking-[-0.516px] text-white text-center max-w-[567px] mb-6 md:mb-8">
          {content.title}
        </h2>
        <a
          href={content.buttonHref}
          className="inline-flex items-center justify-center bg-[#a57255] hover:bg-[#8f6146] transition-colors h-[44px] md:h-[46px] px-[28px] md:px-[41px] font-['Noto_Sans'] font-medium text-[14px] md:text-[15px] leading-[25px] tracking-[-0.225px] text-white"
        >
          {content.buttonText}
        </a>
      </div>
    </section>
  );
}