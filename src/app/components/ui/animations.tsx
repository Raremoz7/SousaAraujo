/**
 * Componentes de animacao reutilizaveis
 * - ScrollReveal: wrapper passthrough (animacoes de scroll desativadas)
 * - PageTransition: anima transicao entre paginas
 */

import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router';

/* ─── ScrollReveal — sem animação de scroll ─── */
type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  viewportMargin?: string;
  once?: boolean;
};

export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}

/* ─── StaggerChild — sem animação de scroll ─── */
type StaggerChildProps = {
  children: ReactNode;
  className?: string;
  index: number;
  staggerDelay?: number;
  direction?: 'up' | 'left' | 'none';
  distance?: number;
  duration?: number;
};

export function StaggerChild({ children, className = '' }: StaggerChildProps) {
  return <div className={className}>{children}</div>;
}

/* ─── PageTransition ─── */
type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}