import { siteContent } from '../../data/content';

/**
 * Stats Component
 * Numeros e resultados do escritorio em grid 2x2 (mobile) / 4 colunas (desktop)
 * Conteudo centralizado em /src/data/content.ts
 */
export function Stats(props?: {
  stats?: Array<{ number: string; label: string }>;
}) {
  const stats = props?.stats || siteContent.stats;

  return (
    <section className="bg-[#161312] py-[60px] md:py-[80px] lg:py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]">
        {/* SEO: h2 para hierarquia de títulos */}
        <h2 className="sr-only">Números e Resultados do Escritório</h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="font-['Lora'] text-[40px] md:text-[52px] lg:text-[64px] leading-[1] text-[#a57255] opacity-70 mb-3 md:mb-4">
                {stat.number}
              </div>
              <div className="font-['Noto_Sans'] font-medium text-[16px] md:text-[18px] lg:text-[21px] leading-[1.4] md:leading-[30px] tracking-[-0.42px] text-white lg:max-w-[159px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}