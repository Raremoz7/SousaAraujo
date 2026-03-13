/**
 * Contact Component - "Fale Conosco / Agende sua Consulta"
 * Full-width background image with blurred overlay form on the right
 * Mobile: form overlay covers full width, auto-height
 * 
 * PRODUCAO: Substituir handleSubmit simulado por servico real
 * (Formspree, EmailJS, ou endpoint proprio)
 */

import { useState } from 'react';
import imgBackground from "figma:asset/5ef7c5358541da50c7d84d33ae870248235d1b9f.png";
import imgPin from "figma:asset/3e71c6d61aa0e57d1a665be82b28cb9ea6a34e93.png";
import imgPhone from "figma:asset/39e61b656ddd5fe3d719f00ef6da22c2fe461e03.png";
import { usePanel } from '../hooks/usePanelContent';
import { trackCtaClick } from './PainelDashboard';

export function Contact() {
  const panelAddress = usePanel('contato.address', 'Edifício Varig - Asa Norte, Brasília - DF, 70714-020');
  const panelPhone = usePanel('contato.phone', '+55 61 99599-1322');
  const panelSubmitText = usePanel('contato.submitText', 'Enviar Mensagem');
  const panelTitle = usePanel('contato.title', 'Fale Conosco\nAgende sua Consulta');
  const panelBgImage = usePanel('contato.bgImage', imgBackground);
  const panelSuccessMsg = usePanel('contato.successMessage', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    trackCtaClick('contato');

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus({
        type: 'success',
        message: panelSuccessMsg,
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="relative w-full min-h-[600px] md:min-h-[700px] lg:h-[780px]">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          alt="Fachada do escritório Sousa Araújo Advocacia em Brasília — contato e localização"
          className="absolute inset-0 w-full h-full object-cover"
          src={panelBgImage.startsWith('figma:asset/') ? imgBackground : panelBgImage}
          width={1200}
          height={600}
          loading="lazy"
          decoding="async"
        />
        {/* Dark overlay for mobile readability */}
        <div className="absolute inset-0 bg-[#161312]/40 md:bg-transparent" />
      </div>

      {/* Mobile: full-width centered form / Desktop: right-aligned */}
      <div className="relative md:absolute md:top-[60px] lg:top-[80px] md:bottom-[60px] lg:bottom-[80px] md:right-[40px] lg:right-[80px] w-full md:w-[500px] lg:w-[650px] backdrop-blur-[9px] bg-[rgba(22,19,18,0.36)]">
        <div className="px-[20px] sm:px-[30px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[40px] lg:py-[50px] h-full flex flex-col">
          {/* Title */}
          <h2 className="font-['Lora'] text-[28px] sm:text-[32px] md:text-[38px] lg:text-[43px] leading-[1.2] lg:leading-[52px] tracking-[-0.516px] text-white mb-[16px] md:mb-[20px]">
            {panelTitle.split('\n').map((line, i) => (
              <span key={i}>{line}{i < panelTitle.split('\n').length - 1 && <br />}</span>
            ))}
          </h2>

          {/* Address & Phone */}
          <div className="space-y-[8px] mb-[30px] md:mb-[40px] lg:mb-[50px]">
            <div className="flex items-center gap-[10px]">
              <svg className="w-[12px] h-[17px] shrink-0" fill="none" viewBox="0 0 12 17">
                <path d="M6 0C2.69 0 0 2.69 0 6C0 10.5 6 17 6 17C6 17 12 10.5 12 6C12 2.69 9.31 0 6 0ZM6 8.15C4.81 8.15 3.85 7.19 3.85 6C3.85 4.81 4.81 3.85 6 3.85C7.19 3.85 8.15 4.81 8.15 6C8.15 7.19 7.19 8.15 6 8.15Z" fill="#a57255"/>
              </svg>
              <span
                className="font-['Roboto'] text-[14px] md:text-[15px] leading-[23px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {panelAddress}
              </span>
            </div>
            <div className="flex items-center gap-[10px]">
              <svg className="w-[15px] h-[15px] shrink-0" fill="none" viewBox="0 0 15 15">
                <path d="M13.5 15C11.85 15 10.238 14.629 8.663 13.887C7.088 13.145 5.688 12.138 4.463 10.863C3.238 9.588 2.275 8.163 1.575 6.588C0.875 5.013 0.5 3.375 0.45 1.675C0.45 1.425 0.538 1.213 0.713 1.038C0.888 0.862 1.1 0.775 1.35 0.775H4.275C4.475 0.775 4.65 0.85 4.8 1C4.95 1.15 5.038 1.325 5.063 1.525L5.475 4.025C5.5 4.225 5.494 4.406 5.456 4.569C5.419 4.731 5.35 4.875 5.25 5L3.525 6.775C4.175 7.925 4.975 8.975 5.925 9.925C6.875 10.875 7.925 11.675 9.075 12.325L10.8 10.55C10.95 10.4 11.131 10.294 11.344 10.231C11.556 10.169 11.763 10.15 11.963 10.175L14.35 10.625C14.55 10.675 14.719 10.775 14.856 10.925C14.994 11.075 15.063 11.25 15.063 11.45V14.3C15.063 14.55 14.975 14.762 14.8 14.938C14.625 15.112 14.413 15.2 14.163 15.2L13.5 15Z" fill="#a57255"/>
              </svg>
              <span
                className="font-['Roboto'] text-[14px] md:text-[15px] leading-[23px] tracking-[-0.225px] text-white"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {panelPhone}
              </span>
            </div>
          </div>

          {/* Status message */}
          {submitStatus && (
            <div
              className={`mb-4 p-3 text-[14px] ${
                submitStatus.type === 'success'
                  ? 'bg-green-500/20 text-green-100'
                  : 'bg-red-500/20 text-red-100'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px]">
              <div className="border-b border-white h-[38px] mb-[20px]">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full h-full bg-transparent font-['Noto_Sans'] text-[13px] text-white placeholder-white focus:outline-none disabled:opacity-50"
                />
              </div>
              <div className="border-b border-white h-[38px] mb-[20px]">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full h-full bg-transparent font-['Noto_Sans'] text-[13px] text-white placeholder-white focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="border-b border-white h-[100px] md:h-[115px] mb-[20px]">
              <textarea
                name="message"
                placeholder="Mensagem"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full h-full bg-transparent font-['Roboto'] text-[13px] text-white placeholder-white focus:outline-none resize-none pt-[10px] disabled:opacity-50"
                style={{ fontVariationSettings: "'wdth' 100" }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="self-start bg-[#452b1e] border border-transparent hover:bg-[#5a3a2a] transition-colors h-[46px] px-[25px] md:px-[35px] font-['Noto_Sans'] font-medium text-[15px] leading-[25px] tracking-[-0.225px] text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : panelSubmitText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}