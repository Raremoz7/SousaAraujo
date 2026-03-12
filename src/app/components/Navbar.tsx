import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Vector from "../../imports/Vector";
import { siteContent } from '../../data/content';

/**
 * Navbar Component
 * Navegacao fixa com menu responsivo (hamburger no mobile)
 * Conteudo centralizado em /src/data/content.ts
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = siteContent.navigation.menuItems;
  const ctaButton = siteContent.navigation.ctaButton;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/70 via-black/30 to-transparent">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[56px] sm:h-[69px] border-b border-[#a57255]">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <div className="w-[130px] sm:w-[163px] h-[24px] sm:h-[30.6px]">
              <Vector />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={clsx(
                  "font-['Roboto'] font-medium text-white hover:text-[#a57255] transition-colors text-[15px] tracking-[-0.225px]",
                  index === 0 && "relative after:absolute after:bottom-[-21px] after:left-0 after:right-0 after:h-[2px] after:bg-[#a57255]"
                )}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href="#contato"
              className="inline-flex items-center gap-3 font-['Noto_Sans'] font-medium text-white hover:text-[#a57255] text-[15px] tracking-[-0.225px] transition-colors group"
            >
              Agendar Atendimento
              <div className="relative w-[10px] h-[10px]">
                <svg className="absolute inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0081 9.95829">
                  <g className="opacity-100 group-hover:opacity-70 transition-opacity">
                    <path d="M0.360346 9.59673L9.48745 0.500255M0.411392 0.510465H9.47724M9.49766 9.39255V0.500255" stroke="white" strokeWidth="1.02093" />
                  </g>
                </svg>
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#a57255] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-[#161312] border-t border-[#a57255]/20">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 font-['Roboto'] font-medium text-white hover:text-[#a57255] hover:bg-[#a57255]/10 transition-colors text-[15px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 font-['Noto_Sans'] font-medium text-[#a57255] hover:bg-[#a57255]/10 transition-colors text-[15px] mt-2"
            >
              Agendar Atendimento
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}