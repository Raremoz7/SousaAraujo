/**
 * Componentes de animacao reutilizaveis
 * - ScrollReveal: anima elementos ao entrar no viewport (scroll)
 * - PageTransition: anima transicao entre paginas
 * 
 * Padrao: fade-up com 0.8s, ease customizado, once: true
 */

import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router';

/* ─── Easing padrao do projeto ─── */
const EASE = [0.4, 0, 0.2, 1] as const;

/* ─── ScrollReveal ─── */
type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Direcao do slide: 'up' | 'down' | 'left' | 'right' | 'none' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distancia em px do slide (default 30) */
  distance?: number;
  /** Duracao em segundos (default 0.8) */
  duration?: number;
  /** Delay em segundos (default 0) */
  delay?: number;
  /** Tag HTML do wrapper (default 'div') */
  as?: keyof JSX.IntrinsicElements;
  /** Margem do viewport para trigger (default '-80px') */
  viewportMargin?: string;
  /** Animar apenas uma vez (default true) */
  once?: boolean;
};

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  distance = 30,
  duration = 0.8,
  delay = 0,
  as = 'div',
  viewportMargin = '-80px',
  once = true,
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (direction) {
      case 'up':    return { opacity: 0, y: distance };
      case 'down':  return { opacity: 0, y: -distance };
      case 'left':  return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
      case 'none':  return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case 'up':
      case 'down':  return { opacity: 1, y: 0 };
      case 'left':
      case 'right': return { opacity: 1, x: 0 };
      case 'none':  return { opacity: 1 };
    }
  };

  const MotionComponent = motion.create(as as any);

  return (
    <MotionComponent
      className={className}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: viewportMargin }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionComponent>
  );
}

/* ─── ScrollReveal para itens staggered (lista/grid) ─── */
type StaggerChildProps = {
  children: ReactNode;
  className?: string;
  index: number;
  /** Delay base entre cada item (default 0.1s) */
  staggerDelay?: number;
  direction?: 'up' | 'left' | 'none';
  distance?: number;
  duration?: number;
};

export function StaggerChild({
  children,
  className = '',
  index,
  staggerDelay = 0.1,
  direction = 'up',
  distance = 25,
  duration = 0.7,
}: StaggerChildProps) {
  return (
    <ScrollReveal
      className={className}
      direction={direction}
      distance={distance}
      duration={duration}
      delay={index * staggerDelay}
      viewportMargin="-60px"
    >
      {children}
    </ScrollReveal>
  );
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
        transition={{ duration: 0.4, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
