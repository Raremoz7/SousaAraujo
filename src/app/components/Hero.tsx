import { imgRectangle4 } from '../../imports/images';
import svgPaths from '../../imports/svg-hero-play';

/**
 * Hero Component
 * WordPress Block: sousa-araujo/hero
 * Full-screen hero com imagem de fundo e gradiente
 * Mobile-first: usa flexbox + padding em vez de absolute positioning
 */
export function Hero(props?: {
  backgroundImage?: string;
  subtitle?: string;
  title?: string;
  signature?: string;
}) {
  const content = {
    backgroundImage: props?.backgroundImage || imgRectangle4,
    subtitle: props?.subtitle || 'A solução mais inteligente começa antes do processo',
    title: props?.title || 'Escritório de advocacia em Brasília com atuação nacional e para brasileiros no exterior',
    signature: props?.signature || 'Lidiane Sousa Araújo',
  };

  return (
    <section id="home" className="relative w-full min-h-[520px] h-screen max-h-[850px] overflow-hidden">
      {/* Background Image with Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          alt="" 
          className="absolute max-w-none object-cover w-full h-full" 
          src={content.backgroundImage} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: "linear-gradient(210.536deg, rgba(22, 19, 18, 0) 33.101%, rgba(22, 19, 18, 0.7) 82.021%), linear-gradient(182.823deg, rgba(22, 19, 18, 0) 49.957%, rgb(22, 19, 18) 86.803%)" 
          }} 
        />
      </div>

      {/* Content Container — mobile-first com flexbox */}
      <div className="relative max-w-[1440px] mx-auto h-full flex flex-col justify-end px-[20px] md:px-[40px] lg:px-0 pb-[60px] md:pb-[80px] lg:pb-0 lg:block">
        
        {/* Desktop: absolute positioning preservado */}
        {/* Mobile/Tablet: flow normal via flexbox */}
        
        {/* Subtitle */}
        <div className="lg:absolute lg:left-[81px] lg:top-[384px] mb-[16px] lg:mb-0">
          <p 
            className="font-['Roboto'] font-normal text-[16px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[24px] lg:leading-[26px] tracking-[-0.95px] text-white max-w-[257px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {content.subtitle}
          </p>
        </div>

        {/* Main Title */}
        <div className="lg:absolute lg:left-[80px] lg:top-[437px] mb-[20px] lg:mb-0">
          <h1 className="font-['Marcellus'] text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] leading-[34px] sm:leading-[42px] md:leading-[52px] lg:leading-[62px] tracking-[-0.87px] text-white max-w-[736px]">
            {content.title}
          </h1>
        </div>

        {/* Signature */}
        <div className="lg:absolute lg:left-[81px] lg:top-[668px]">
          <p className="font-['Allura'] text-[20px] lg:text-[24px] leading-[22px] text-white">
            {content.signature}
          </p>
        </div>

        {/* Play Button — hidden on mobile, visible on desktop */}
        <div className="hidden lg:block absolute left-[1035px] top-[468px]">
          {/* Outer Circle with stroke */}
          <div className="relative w-[133px] h-[133px]">
            <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 133">
              <circle 
                cx="66.5" 
                cy="66.5" 
                r="65" 
                stroke="#AC795F" 
                strokeOpacity="0.4" 
                strokeWidth="3" 
              />
            </svg>

            {/* Inner Circle with blur */}
            <div className="absolute left-[14.78px] top-[14.78px] w-[103.444px] h-[103.444px]">
              <svg className="absolute block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103.444 103.444">
                <circle 
                  cx="51.7222" 
                  cy="51.7222" 
                  fill="white" 
                  fillOpacity="0.3" 
                  r="51.7222"
                  style={{ filter: 'blur(3.11111px)' }}
                />
              </svg>
            </div>

            {/* Play Icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[39px] h-[39px]">
              <div className="rotate-90 w-full h-full flex items-center justify-center">
                <svg className="w-[28.09px] h-[25.36px]" fill="none" viewBox="0 0 28.0929 25.3611">
                  <path 
                    d={svgPaths.p184ba280} 
                    fill="white" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
