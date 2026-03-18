import { Outlet, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SeoHead } from './SeoHead';
import { readPanel } from '../hooks/usePanelContent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/* ─── Floating WhatsApp Button (mobile) ─── */
function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  const phone = readPanel('footer.contact.phone', '+55 61 99599-1322').replace(/\D/g, '');
  const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta.');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${phone}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a Sousa Araújo Advocacia pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-[24px] right-[20px] z-50 md:hidden flex items-center justify-center w-[56px] h-[56px] rounded-full shadow-lg"
          style={{ background: '#25D366' }}
        >
          <svg className="w-[30px] h-[30px]" fill="white" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

const EASE = [0.4, 0, 0.2, 1] as const;

/**
 * Layout Component
 * Wrapper for all pages: Navbar + page content (via Outlet) + Footer
 * ScrollToTop ensures page scrolls to top on every route change
 * AnimatePresence handles smooth page transitions
 */
export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#161312]">
      <SeoHead />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}