import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SeoHead } from './SeoHead';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
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
    </div>
  );
}