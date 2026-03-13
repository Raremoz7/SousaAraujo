/**
 * Footer Component — matches Figma design exactly
 * Row 1: Logo + description
 * Row 2: Newsletter | Iniciar uma Conversa | Nossa Localizacao | Redes Sociais
 * Divider
 * Row 3: Navigation links | Agendar Atendimento
 * Row 4: Legal text
 */

import { Link } from 'react-router';
import svgLogoPaths from '../../imports/svg-r0rdaxikom';
import svgArrow from '../../imports/svg-od596xq1d5';
import VectorFooter from '../../imports/Vector-6-829';
import { usePanel } from '../hooks/usePanelContent';

/* ─── Arrow icon ─── */
function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`w-[10px] h-[10px] ${className}`} fill="none" viewBox="0 0 10 10">
      <path d={svgArrow.p1238f200} stroke="currentColor" strokeWidth="1.02093" />
    </svg>
  );
}

/* ─── Social Icons ─── */
function InstagramIcon() {
  return (
    <svg className="w-[17px] h-[17px]" fill="none" viewBox="0 0 16.7009 16.7009">
      <path d={svgLogoPaths.p39ee7a00} fill="currentColor" />
      <path d={svgLogoPaths.p39e383c0} fill="currentColor" />
      <path d={svgLogoPaths.p2ddc5300} fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-[10px] h-[18px]" fill="none" viewBox="0 0 10 18">
      <path d={svgLogoPaths.p1776280} fill="currentColor" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg className="w-[16px] h-[19px]" fill="none" viewBox="0 0 15.8879 18.5014">
      <path d={svgLogoPaths.p32897000} fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-[16px] h-[16px]" fill="none" viewBox="0 0 15.7645 15.7195">
      <path d={svgLogoPaths.p3e96f980} fill="currentColor" />
      <path d={svgLogoPaths.p27edb600} fill="currentColor" />
      <path d={svgLogoPaths.p6c16200} fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-[25px] h-[14px]" fill="none" viewBox="0 0 24.7666 13.3926">
      <path d={svgLogoPaths.p36ddb6c0} fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const footerDesc = usePanel('footer.description', 'Escritório de advocacia especializada em Brasília, fundado pela Dra. Lidiane Sousa Araújo, OAB/DF 34.876. Estrutura presencial no Distrito Federal e atendimento online para todo o Brasil e brasileiros no exterior, com apoio de uma rede de parceiros qualificados. Atuação estratégica em Direito de Família, Regularização de Imóveis, Homologação de Sentença Estrangeira e Consultoria Empresarial.');
  const footerEmail = usePanel('footer.contact.email', 'contato@sousaaraujo.adv.br');
  const footerPhone = usePanel('footer.contact.phone', '+55 61 99599-1322');
  const footerAddress = usePanel('footer.location.address', 'Edifício Varig - Setor Comercial Norte, quadra 04, bloco B, sala 702, 7 andar Pétala D - Asa Norte, Brasília - DF, 70714-020');
  const footerCopyright = usePanel('footer.copyright', 'Termos de Uso  ·  Política de Privacidade © 2026 SA | Sousa Araújo Advocacia · Todos os direitos reservados Comunicação em conformidade com o Provimento OAB 205/2021 – Desenvolvido por Mix7');

  const socialInstagram = usePanel('footer.social.instagram', '#');
  const socialFacebook = usePanel('footer.social.facebook', '#');
  const socialTiktok = usePanel('footer.social.tiktok', '#');
  const socialLinkedin = usePanel('footer.social.linkedin', '#');
  const socialYoutube = usePanel('footer.social.youtube', '#');

  const newsletterLabel = usePanel('footer.newsletter.label', 'Receba nossos conteúdos');
  const newsletterButton = usePanel('footer.newsletter.buttonText', 'Inscrever-se');
  const contactTitle = usePanel('footer.contact.title', 'Iniciar uma Conversa');
  const locationTitle = usePanel('footer.location.title', 'Nossa Localização');
  const ctaText = usePanel('footer.ctaText', 'Agendar Atendimento');
  const ctaHref = usePanel('footer.ctaHref', '/contato');

  // Footer navigation links - connected to panel
  const footerNav = [
    { label: usePanel('footer.link1.label', 'Home'),             href: usePanel('footer.link1.href', '/') },
    { label: usePanel('footer.link2.label', 'Sobre'),            href: usePanel('footer.link2.href', '/sobre') },
    { label: usePanel('footer.link3.label', 'Áreas de Atuação'), href: usePanel('footer.link3.href', '/areas-de-atuacao') },
    { label: usePanel('footer.link4.label', 'Blog'),             href: usePanel('footer.link4.href', '/blog') },
    { label: usePanel('footer.link5.label', 'FAQ'),              href: usePanel('footer.link5.href', '/faq') },
    { label: usePanel('footer.link6.label', 'Vídeos'),           href: usePanel('footer.link6.href', '/videos-educativos') },
  ];

  return (
    <footer className="bg-[#452b1e]">
      {/* ── Row 1: Logo + Description ── */}
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[80px] pt-[40px] md:pt-[50px] lg:pt-[60px] pb-[30px] md:pb-[35px] lg:pb-[45px]">
        <div className="flex flex-col lg:flex-row gap-[20px] md:gap-[30px] lg:gap-[80px] items-start">
          <div className="w-[200px] md:w-[280px] lg:w-[370px] h-[38px] md:h-[53px] lg:h-[70px] shrink-0">
            <VectorFooter />
          </div>
          <p className="font-['Noto_Sans'] text-[13px] md:text-[15px] leading-[20px] md:leading-[20px] tracking-[-0.525px] text-white max-w-[716px]">
            {footerDesc}
          </p>
        </div>
      </div>

      {/* ── Row 2: Newsletter + Info Columns ── */}
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[80px] pb-[30px] md:pb-[35px] lg:pb-[50px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[370px_1fr_1fr_auto] gap-x-[24px] lg:gap-x-[0px] gap-y-[28px] md:gap-y-[36px] items-start">

          {/* Newsletter */}
          <div className="flex flex-col justify-end h-full lg:pr-[80px]">
            <div className="flex items-center border-b border-[#c1bbbb]/60 pb-[6px]">
              <span className="font-['Noto_Sans'] text-[13px] text-white/80 whitespace-nowrap mr-[12px]">
                {newsletterLabel}
              </span>
              <a
                href="#newsletter"
                className="inline-flex items-center gap-[6px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors whitespace-nowrap group ml-auto"
              >
                {newsletterButton}
                <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Iniciar uma Conversa */}
          <div className="lg:pl-[0px]">
            <h3 className="font-['Noto_Sans'] font-medium text-[21px] leading-[30px] tracking-[-0.42px] text-[#c8956e] mb-[18px]">
              {contactTitle}
            </h3>
            <div className="space-y-[12px]">
              <a href={`mailto:${footerEmail}`} aria-label={`Enviar e-mail para ${footerEmail}`} className="flex items-center gap-[10px] text-white hover:text-[#a57255] transition-colors">
                <svg className="w-[18px] h-[14px] shrink-0" fill="none" viewBox="0 0 19 14">
                  <path d="M1.5 0C0.672 0 0 0.672 0 1.5V12.5C0 13.328 0.672 14 1.5 14H17.5C18.328 14 19 13.328 19 12.5V1.5C19 0.672 18.328 0 17.5 0H1.5ZM3.09 1.5H15.91L9.5 6.26L3.09 1.5ZM1.5 2.34L9.18 8.04C9.36 8.17 9.64 8.17 9.82 8.04L17.5 2.34V12.5H1.5V2.34Z" fill="currentColor" />
                </svg>
                <span className="font-['Noto_Sans'] text-[15px] leading-[23px] tracking-[-0.225px]">{footerEmail}</span>
              </a>
              <a href={`tel:${footerPhone}`} aria-label={`Ligar para ${footerPhone}`} className="flex items-center gap-[10px] text-white hover:text-[#a57255] transition-colors">
                <svg className="w-[15px] h-[15px] shrink-0" fill="none" viewBox="0 0 16 16">
                  <path d="M14 15.5C12.35 15.5 10.738 15.129 9.163 14.387C7.588 13.645 6.188 12.638 4.963 11.363C3.738 10.088 2.775 8.663 2.075 7.088C1.375 5.513 1 3.875 0.95 2.175C0.95 1.925 1.038 1.713 1.213 1.538C1.388 1.362 1.6 1.275 1.85 1.275H4.775C4.975 1.275 5.15 1.35 5.3 1.5C5.45 1.65 5.538 1.825 5.563 2.025L5.975 4.525C6 4.725 5.994 4.906 5.956 5.069C5.919 5.231 5.85 5.375 5.75 5.5L4.025 7.275C4.675 8.425 5.475 9.475 6.425 10.425C7.375 11.375 8.425 12.175 9.575 12.825L11.3 11.05C11.45 10.9 11.631 10.794 11.844 10.731C12.056 10.669 11.963 10.65 12.463 10.675L14.85 11.125C15.05 11.175 15.219 11.275 15.356 11.425C15.494 11.575 15.563 11.75 15.563 11.95V14.8C15.563 15.05 15.475 15.262 15.3 15.438C15.125 15.612 14.913 15.7 14.663 15.7L14 15.5Z" fill="currentColor" />
                </svg>
                <span className="font-['Noto_Sans'] text-[15px] leading-[23px] tracking-[-0.225px]">{footerPhone}</span>
              </a>
            </div>
          </div>

          {/* Nossa Localização */}
          <div>
            <h3 className="font-['Noto_Sans'] font-medium text-[21px] leading-[30px] tracking-[-0.42px] text-[#c8956e] mb-[18px]">
              {locationTitle}
            </h3>
            <div className="flex items-start gap-[10px]">
              <svg className="w-[12px] h-[17px] shrink-0 mt-[3px]" fill="none" viewBox="0 0 12 17">
                <path d="M6 0C2.69 0 0 2.69 0 6C0 10.5 6 17 6 17C6 17 12 10.5 12 6C12 2.69 9.31 0 6 0ZM6 8.15C4.81 8.15 3.85 7.19 3.85 6C3.85 4.81 4.81 3.85 6 3.85C7.19 3.85 8.15 4.81 8.15 6C8.15 7.19 7.19 8.15 6 8.15Z" fill="white" />
              </svg>
              <p className="font-['Noto_Sans'] text-[15px] leading-[23px] tracking-[-0.225px] text-white">
                {footerAddress}
              </p>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-['Noto_Sans'] font-medium text-[21px] leading-[30px] tracking-[-0.42px] text-[#c8956e] mb-[18px]">
              Redes Sociais
            </h3>
            <div className="flex items-center gap-[14px] text-white">
              <a href={socialInstagram} aria-label="Seguir no Instagram" className="hover:text-[#a57255] transition-colors"><InstagramIcon /></a>
              <a href={socialFacebook} aria-label="Seguir no Facebook" className="hover:text-[#a57255] transition-colors"><FacebookIcon /></a>
              <a href={socialTiktok} aria-label="Seguir no TikTok" className="hover:text-[#a57255] transition-colors"><TiktokIcon /></a>
              <a href={socialLinkedin} aria-label="Seguir no LinkedIn" className="hover:text-[#a57255] transition-colors"><LinkedInIcon /></a>
              <a href={socialYoutube} aria-label="Inscrever-se no YouTube" className="hover:text-[#a57255] transition-colors"><YouTubeIcon /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[80px]">
        <div className="h-[2px] bg-[#a57255]" />
      </div>

      {/* ── Row 3: Navigation ── */}
      <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[80px] py-[18px] md:py-[22px]">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-[12px] md:gap-[16px]">
          <nav className="flex flex-wrap items-center gap-[16px] md:gap-[20px] lg:gap-[44px]">
            {footerNav.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                aria-label={`Navegar para ${item.label}`}
                className="font-['Roboto'] font-medium text-[15px] leading-[21px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to={ctaHref}
            aria-label="Agendar atendimento com a Sousa Araújo Advocacia"
            className="inline-flex items-center gap-[8px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white hover:text-[#a57255] transition-colors group"
          >
            {ctaText}
            <ArrowIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Row 4: Legal / Copyright ── */}
      <div className="bg-[#452b1e]">
        <div className="max-w-[1440px] mx-auto px-[20px] md:px-[40px] lg:px-[80px] py-[30px] md:py-[40px]">
          <p className="font-['Noto_Sans'] text-[13px] leading-[23px] tracking-[-0.225px] text-white/60">
            {footerCopyright}
          </p>
        </div>
      </div>
    </footer>
  );
}