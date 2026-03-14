/**
 * About Component - Secao Quem Somos
 * Layout com texto na esquerda, quotes na direita
 * Conteudo centralizado em /src/data/content.ts
 */

import { imgAboutOffice, imgGallery1, imgGallery2, imgGallery3 } from '../../imports/images';
import svgPaths from "../../imports/svg-pqlr98z98v";
import { siteContent } from '../../data/content';
import { usePanel } from '../hooks/usePanelContent';
import { usePreviewMode } from '../hooks/usePreviewMode';

export function About(props?: {
  title?: string;
  paragraphs?: string[];
  quotes?: Array<{ text: string; color: 'accent' | 'white' }>;
  linkText?: string;
  linkHref?: string;
}) {
  const content = {
    title: usePanel('home.about.title', props?.title || siteContent.about.title),
    paragraphs: [
      usePanel('home.about.paragraph1', props?.paragraphs?.[0] || siteContent.about.paragraphs[0]),
      usePanel('home.about.paragraph2', props?.paragraphs?.[1] || siteContent.about.paragraphs[1]),
    ],
    quotes: [
      { text: usePanel('home.about.quote1', props?.quotes?.[0]?.text || siteContent.about.quotes[0].text), color: (props?.quotes?.[0]?.color || siteContent.about.quotes[0].color) as 'accent' | 'white' },
      { text: usePanel('home.about.quote2', props?.quotes?.[1]?.text || siteContent.about.quotes[1].text), color: (props?.quotes?.[1]?.color || siteContent.about.quotes[1].color) as 'accent' | 'white' },
    ],
    linkText: usePanel('home.about.linkText', props?.linkText || siteContent.about.link.text),
    linkHref: usePanel('home.about.linkHref', props?.linkHref || siteContent.about.link.href),
  };

  const previewMode = usePreviewMode();
  const forceMobile = previewMode === 'mobile' || previewMode === 'tablet';

  return (
    <section id="quem-somos" className="bg-[#161312] w-full px-0 -my-px">
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[110px]" style={forceMobile ? { padding: '0 20px' } : undefined}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] lg:gap-[110px] mb-[60px] lg:mb-[80px]"
          style={forceMobile ? { gridTemplateColumns: '1fr', gap: 60, marginBottom: 60 } : undefined}
        >
          {/* Left Column - Title and Text */}
          <div>
            <h2
              className="font-['Marcellus'] text-[36px] md:text-[48px] lg:text-[64px] leading-[1.1] md:leading-[1.15] lg:leading-[66px] tracking-[-0.832px] text-white mb-[24px] md:mb-[32px] lg:mb-[40px]"
              style={forceMobile ? { fontSize: 36, lineHeight: 1.1, marginBottom: 24 } : undefined}
            >
              {content.title}
            </h2>
            
            <div
              className="font-['Roboto'] text-[16px] md:text-[18px] lg:text-[20px] leading-[24px] md:leading-[25px] tracking-[-0.27px] text-white mb-[30px] md:mb-[40px] space-y-[20px] md:space-y-[25px]"
              style={forceMobile ? { fontSize: 16, lineHeight: '24px', marginBottom: 30 } : undefined}
            >
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            <a 
              href={content.linkHref} 
              className="inline-flex items-center gap-[10px] font-['Roboto'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
            >
              <span>{content.linkText}</span>
              <svg 
                className="w-[10px] h-[10px] transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" 
                fill="none" 
                viewBox="0 0 10.0081 9.95829"
              >
                <path 
                  d={svgPaths.p1238f200} 
                  stroke="currentColor" 
                  strokeWidth="1.02093" 
                />
              </svg>
            </a>
          </div>

          {/* Right Column - Two Text Blocks */}
          <div className="space-y-[40px] md:space-y-[60px] lg:space-y-[100px]" style={forceMobile ? { marginTop: 0 } : undefined}>
            {content.quotes.map((quote, index) => (
              <div key={index}>
                <p
                  className={`font-['Marcellus'] text-[24px] md:text-[32px] lg:text-[43px] leading-[1.3] md:leading-[1.35] lg:leading-[52px] tracking-[-0.516px] ${quote.color === 'accent' ? 'text-[#a57255]' : 'text-white'}`}
                  style={forceMobile ? { fontSize: 24, lineHeight: 1.3 } : undefined}
                >
                  {quote.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery - 3 images */}
        
      </div>
    </section>
  );
}