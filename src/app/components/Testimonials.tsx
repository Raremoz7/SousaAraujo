import { imgLogo1, imgLogo2, imgLogo3, imgLogo4 } from '../../imports/images';

/**
 * Testimonials Component
 * Seção "Quem já confiou no trabalho"
 */
export function Testimonials() {
  const logos = [
    { src: imgLogo1, alt: 'Cliente 1' },
    { src: imgLogo2, alt: 'Cliente 2' },
    { src: imgLogo3, alt: 'Cliente 3' },
    { src: imgLogo4, alt: 'Cliente 4' },
  ];

  return (
    <section className="bg-[#161312] py-[80px] border-t border-[#a57255]/20">
      <div className="max-w-[1440px] mx-auto px-[80px]">
        <h2 className="font-['Marcellus'] text-[36px] leading-[44px] tracking-[-0.632px] text-white mb-12 text-center">
          Quem já confiou no trabalho
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <img 
                src={logo.src}
                alt={logo.alt}
                className="max-w-full h-auto max-h-[60px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}