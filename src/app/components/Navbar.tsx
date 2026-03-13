import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import Vector from '../../imports/Vector';
import { readPanel } from '../hooks/usePanelContent';
import { usePreviewMode } from '../hooks/usePreviewMode';

/**
 * Navbar Component
 * Navegação fixa com React Router Links.
 * Menu: Home, Sobre, Áreas de Atuação, Serviços ▾, Blog, FAQ, Contato
 * Todos os labels são editáveis via painel admin.
 */

/* Default data — labels read from panel at render time */
function getMenuItems() {
  return [
    { label: readPanel('navbar.item1.label', 'Home'),             href: '/',                 ariaLabel: 'Ir para a página inicial' },
    { label: readPanel('navbar.item2.label', 'Sobre'),            href: '/sobre',            ariaLabel: 'Sobre a Sousa Araújo Advocacia' },
    { label: readPanel('navbar.item3.label', 'Áreas de Atuação'), href: '/areas-de-atuacao', ariaLabel: 'Áreas de atuação do escritório' },
  ];
}

function getMenuItemsAfter() {
  return [
    { label: readPanel('navbar.item4.label', 'Blog'),    href: '/blog',    ariaLabel: 'Artigos e conteúdo jurídico' },
    { label: readPanel('navbar.item5.label', 'FAQ'),     href: '/faq',     ariaLabel: 'Perguntas frequentes' },
    { label: readPanel('navbar.item6.label', 'Contato'), href: '/contato', ariaLabel: 'Entre em contato com o escritório' },
  ];
}

function getServicosItems() {
  return [
    { label: readPanel('navbar.servico1.label', 'Homologação de Sentença'), href: '/homologacao-de-sentenca-estrangeira', ariaLabel: 'Serviço de homologação de sentença estrangeira' },
    { label: readPanel('navbar.servico2.label', 'Divórcio'),                href: '/divorcio',                            ariaLabel: 'Serviço de divórcio e dissolução' },
    { label: readPanel('navbar.servico3.label', 'Imóveis'),                 href: '/imoveis',                             ariaLabel: 'Serviço de regularização de imóveis' },
    { label: readPanel('navbar.servico4.label', 'Guarda e Convivência'),    href: '/guarda-e-plano-de-convivencia',       ariaLabel: 'Serviço de guarda e plano de convivência' },
    { label: readPanel('navbar.servico5.label', 'Pensão Alimentícia'),      href: '/pensao-alimenticia',                  ariaLabel: 'Serviço de pensão alimentícia' },
    { label: readPanel('navbar.servico6.label', 'Inventário e Sucessões'),  href: '/inventario-e-sucessoes',              ariaLabel: 'Serviço de inventário e sucessões' },
    { label: readPanel('navbar.servico7.label', 'União Estável'),           href: '/uniao-estavel',                       ariaLabel: 'Serviço de união estável' },
    { label: readPanel('navbar.servico8.label', 'Consultoria PMEs'),        href: '/consultoria-empresarial-pmes',        ariaLabel: 'Consultoria empresarial para PMEs' },
    { label: readPanel('navbar.servico9.label', 'Registro de Marca INPI'), href: '/registro-de-marca-inpi',              ariaLabel: 'Serviço de registro de marca no INPI' },
  ];
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function NavItem({ item, scrolled }: { item: { label: string; href: string; ariaLabel: string }; scrolled?: boolean }) {
  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      aria-label={item.ariaLabel}
      className={({ isActive }) =>
        clsx(
          "font-['Roboto'] font-medium transition-colors text-[14px] xl:text-[15px] tracking-[-0.225px] relative",
          scrolled
            ? "text-white/80 hover:text-white"
            : "text-white hover:text-[#a57255]",
          isActive && scrolled &&
            "after:absolute after:bottom-[-21px] after:left-0 after:right-0 after:h-[2px] after:bg-white !text-white font-semibold",
          isActive && !scrolled &&
            "after:absolute after:bottom-[-21px] after:left-0 after:right-0 after:h-[2px] after:bg-[#a57255] !text-white font-semibold"
        )
      }
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {item.label}
    </NavLink>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicosOpen, setServicosOpen] = useState(false);
  const [servicosMobileOpen, setServicosMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicosRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const previewMode = usePreviewMode();
  const forceMobile = previewMode === 'mobile' || previewMode === 'tablet';

  // Read menu data from panel
  const menuItems = getMenuItems();
  const menuItemsAfter = getMenuItemsAfter();
  const servicosItems = getServicosItems();
  const servicosLabel = readPanel('navbar.servicos.label', 'Serviços');
  const ctaText = readPanel('navbar.cta.text', 'Agendar Atendimento');
  const extraLabel1 = readPanel('navbar.extra1.label', 'Rede de Parceiros');
  const extraLabel2 = readPanel('navbar.extra2.label', 'Vídeos Educativos');

  // Solid background on scroll
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setServicosOpen(false);
    setServicosMobileOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicosRef.current && !servicosRef.current.contains(e.target as Node)) {
        setServicosOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Check if any serviço page is active
  const isServicosActive = servicosItems.some(s => location.pathname === s.href);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled ? "bg-[#452b1e]" : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
      )}
      style={forceMobile ? { position: 'relative' } : undefined}
      aria-label="Navegação principal"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={clsx(
          "flex items-center justify-between h-[56px] sm:h-[69px] border-b transition-colors duration-300",
          scrolled ? "border-transparent" : "border-[#a57255]"
        )}>

          {/* Logo */}
          <Link to="/" aria-label="Sousa Araújo Advocacia — página inicial" className="flex items-center">
            <div className="w-[130px] sm:w-[163px] h-[24px] sm:h-[30.6px]">
              <Vector />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12" style={forceMobile ? { display: 'none' } : undefined}>
            {/* Home, Sobre, Áreas de Atuação */}
            {menuItems.map((item) => (
              <NavItem key={item.href} item={item} scrolled={scrolled} />
            ))}

            {/* Serviços Dropdown — 4ª posição */}
            <div ref={servicosRef} className="relative">
              <button
                onClick={() => setServicosOpen(!servicosOpen)}
                aria-expanded={servicosOpen}
                aria-haspopup="true"
                aria-label="Abrir menu de serviços"
                className={clsx(
                  "font-['Roboto'] font-medium transition-colors text-[14px] xl:text-[15px] tracking-[-0.225px] flex items-center gap-1 relative",
                  scrolled
                    ? ((servicosOpen || isServicosActive) ? "text-white font-semibold" : "text-white/80 hover:text-white")
                    : ((servicosOpen || isServicosActive) ? "!text-white font-semibold" : "text-white hover:text-[#a57255]"),
                  isServicosActive && scrolled && "after:absolute after:bottom-[-21px] after:left-0 after:right-0 after:h-[2px] after:bg-white",
                  isServicosActive && !scrolled && "after:absolute after:bottom-[-21px] after:left-0 after:right-0 after:h-[2px] after:bg-[#a57255]"
                )}
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {servicosLabel}
                <ChevronDown size={13} className={clsx("transition-transform duration-200", servicosOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {servicosOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-[calc(100%+21px)] right-0 w-[300px] z-50 overflow-hidden"
                    style={{
                      background: 'linear-gradient(180deg, rgba(22,19,18,0.97) 0%, rgba(30,26,24,0.98) 100%)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 25px 60px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(165,114,85,0.12)',
                    }}
                    role="menu"
                  >
                    {/* Top accent line */}
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#a57255]/40 to-transparent" />

                    <div className="py-[10px] px-[6px]">
                      {servicosItems.map((svc) => (
                        <Link
                          key={svc.href}
                          to={svc.href}
                          role="menuitem"
                          aria-label={svc.ariaLabel}
                          className="group/item flex items-center gap-[12px] px-[16px] py-[10px] mx-[2px] font-['Noto_Sans'] text-[13px] leading-[18px] tracking-[-0.195px] text-white/65 hover:text-[#a57255] transition-all duration-200 hover:bg-[#a57255]/[0.06] rounded-[2px]"
                        >
                          <span className="w-[3px] h-[3px] rounded-full bg-[#a57255]/30 group-hover/item:bg-[#a57255] transition-colors shrink-0" />
                          {svc.label}
                        </Link>
                      ))}
                    </div>

                    {/* Bottom section */}
                    <div className="border-t border-white/[0.06] py-[8px] px-[6px]">
                      <Link
                        to="/rede-de-parceiros"
                        role="menuitem"
                        aria-label="Rede de parceiros da Sousa Araújo Advocacia"
                        className="block px-[16px] py-[9px] mx-[2px] font-['Noto_Sans'] text-[12px] leading-[17px] tracking-[-0.18px] text-white/35 hover:text-[#a57255] hover:bg-[#a57255]/[0.06] transition-all duration-200 rounded-[2px]"
                      >
                        {extraLabel1}
                      </Link>
                      <Link
                        to="/videos-educativos"
                        role="menuitem"
                        aria-label="Vídeos educativos sobre direito"
                        className="block px-[16px] py-[9px] mx-[2px] font-['Noto_Sans'] text-[12px] leading-[17px] tracking-[-0.18px] text-white/35 hover:text-[#a57255] hover:bg-[#a57255]/[0.06] transition-all duration-200 rounded-[2px]"
                      >
                        {extraLabel2}
                      </Link>
                      <Link
                        to="/painel"
                        role="menuitem"
                        aria-label="Painel administrativo"
                        className="block px-[16px] py-[9px] mx-[2px] font-['Noto_Sans'] text-[11px] leading-[16px] tracking-[-0.165px] text-white/20 hover:text-[#a57255] hover:bg-[#a57255]/[0.06] transition-all duration-200 rounded-[2px]"
                      >
                        Painel Admin
                      </Link>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#a57255]/20 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog, FAQ, Contato */}
            {menuItemsAfter.map((item) => (
              <NavItem key={item.href} item={item} scrolled={scrolled} />
            ))}
          </div>

          {/* CTA Button — Desktop */}
          <div className="hidden lg:block" style={forceMobile ? { display: 'none' } : undefined}>
            <Link
              to="/contato"
              aria-label="Agendar atendimento com a Sousa Araújo Advocacia"
              className="inline-flex items-center gap-3 font-['Noto_Sans'] font-medium text-white hover:text-[#a57255] text-[15px] tracking-[-0.225px] transition-colors group"
            >
              {ctaText}
              <div className="relative w-[10px] h-[10px]">
                <svg className="absolute inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0081 9.95829">
                  <g className="opacity-100 group-hover:opacity-70 transition-opacity">
                    <path d="M0.360346 9.59673L9.48745 0.500255M0.411392 0.510465H9.47724M9.49766 9.39255V0.500255" stroke="white" strokeWidth="1.02093" />
                  </g>
                </svg>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden" style={forceMobile ? { display: 'block' } : undefined}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#a57255] transition-colors"
              aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-[#161312] border-t border-[#a57255]/20" style={forceMobile ? { display: 'block' } : undefined} role="navigation" aria-label="Menu mobile">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Home, Sobre, Áreas */}
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={() => setIsOpen(false)}
                aria-label={item.ariaLabel}
                className={({ isActive }) =>
                  clsx(
                    "block px-3 py-3 font-['Roboto'] font-medium hover:bg-[#a57255]/10 transition-colors text-[15px]",
                    isActive ? 'text-[#a57255]' : 'text-white hover:text-[#a57255]'
                  )
                }
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Serviços Accordion — Mobile */}
            <button
              onClick={() => setServicosMobileOpen(!servicosMobileOpen)}
              aria-expanded={servicosMobileOpen}
              aria-label="Abrir menu de serviços"
              className={clsx(
                "flex items-center justify-between w-full px-3 py-3 font-['Roboto'] font-medium hover:text-[#a57255] text-[15px] transition-colors",
                (servicosMobileOpen || isServicosActive) ? "text-[#a57255]" : "text-white"
              )}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {servicosLabel}
              <ChevronDown size={14} className={clsx("transition-transform duration-200", servicosMobileOpen && "rotate-180")} />
            </button>
            {servicosMobileOpen && (
              <div className="pl-4 space-y-0">
                {servicosItems.map((svc) => (
                  <Link
                    key={svc.href}
                    to={svc.href}
                    onClick={() => setIsOpen(false)}
                    aria-label={svc.ariaLabel}
                    className="block px-3 py-[10px] font-['Noto_Sans'] text-[13px] text-white/60 hover:text-[#a57255] transition-colors"
                  >
                    {svc.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Blog, FAQ, Contato */}
            {menuItemsAfter.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={() => setIsOpen(false)}
                aria-label={item.ariaLabel}
                className={({ isActive }) =>
                  clsx(
                    "block px-3 py-3 font-['Roboto'] font-medium hover:bg-[#a57255]/10 transition-colors text-[15px]",
                    isActive ? 'text-[#a57255]' : 'text-white hover:text-[#a57255]'
                  )
                }
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/contato"
              onClick={() => setIsOpen(false)}
              aria-label="Agendar atendimento com a Sousa Araújo Advocacia"
              className="block px-3 py-3 font-['Noto_Sans'] font-medium text-[#a57255] hover:bg-[#a57255]/10 transition-colors text-[15px] mt-2"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}