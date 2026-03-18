/**
 * PlayButton — botao circular play com efeito radial pulsante
 * Ondas expandindo tipo radar em loop — versão com visibilidade amplificada
 */

import svgPaths from '../../../imports/svg-he7mfdirs7';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from './dialog';
import React from 'react';

interface PlayButtonProps {
  className?: string;
  size?: number;
  onClick?: () => void;
  videoUrl?: string;
}

/* Wrapper that strips Figma inspector props (_fg*) before they hit the DOM */
const SafeDiv = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>>(
  (props, ref) => {
    const clean: Record<string, unknown> = {};
    for (const k in props) {
      if (!k.startsWith('_fg')) clean[k] = props[k];
    }
    return <div ref={ref} {...(clean as React.HTMLAttributes<HTMLDivElement>)} />;
  }
);
SafeDiv.displayName = 'SafeDiv';

export function PlayButton({ className = '', size = 133, onClick, videoUrl }: PlayButtonProps) {
  const pulseSize = size * 2.2; // espaço extra para as ondas expandirem

  const innerContent = (
    <>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes heroPulse1 {
          0%   { transform: translate(-50%, -50%) scale(0.85); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.1);  opacity: 0; }
        }
        @keyframes heroPulse2 {
          0%   { transform: translate(-50%, -50%) scale(0.85); opacity: 0.85; }
          100% { transform: translate(-50%, -50%) scale(2.1);  opacity: 0; }
        }
        @keyframes heroPulse3 {
          0%   { transform: translate(-50%, -50%) scale(0.85); opacity: 0.65; }
          100% { transform: translate(-50%, -50%) scale(2.1);  opacity: 0; }
        }
        @keyframes playGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(172, 121, 95, 0); }
          50%       { box-shadow: 0 0 24px 6px rgba(172, 121, 95, 0.45); }
        }
      `}</style>

      {/* ── Pulsing radial rings ── */}
      <span
        className="absolute rounded-full animate-[heroPulse1_2.4s_ease-out_infinite]"
        style={{
          width: size,
          height: size,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(0.85)',
          border: '2px solid rgba(172, 121, 95, 0.9)',
          background: 'rgba(172, 121, 95, 0.08)',
        }}
      />
      <span
        className="absolute rounded-full animate-[heroPulse2_2.4s_ease-out_infinite_0.75s]"
        style={{
          width: size,
          height: size,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(0.85)',
          border: '1.5px solid rgba(172, 121, 95, 0.65)',
          background: 'rgba(172, 121, 95, 0.04)',
        }}
      />
      <span
        className="absolute rounded-full animate-[heroPulse3_2.4s_ease-out_infinite_1.5s]"
        style={{
          width: size,
          height: size,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(0.85)',
          border: '1px solid rgba(172, 121, 95, 0.4)',
        }}
      />

      {/* ── Main button circle ── */}
      <svg
        className="absolute transition-transform duration-400 group-hover:scale-110"
        style={{
          width: size,
          height: size,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 10px rgba(172,121,95,0.5))',
        }}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 133 133"
      >
        {/* Outer stroke circle */}
        <circle
          cx="66.5"
          cy="66.5"
          r="65"
          stroke="#AC795F"
          strokeOpacity="0.9"
          strokeWidth="2"
        />
        {/* Inner filled circle */}
        <circle
          cx="66.4996"
          cy="66.5"
          r="51.7222"
          fill="white"
          fillOpacity="0.18"
          filter="url(#playBlur)"
        />
        {/* Solid copper inner ring accent */}
        <circle
          cx="66.5"
          cy="66.5"
          r="51.7222"
          stroke="#AC795F"
          strokeOpacity="0.35"
          strokeWidth="1"
          fill="none"
        />
        {/* Play triangle */}
        <path d={svgPaths.p1e6c1300} fill="white" fillOpacity="0.95" />
      </svg>

      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="playBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
      </svg>
    </>
  );

  if (videoUrl) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <SafeDiv
            role="button"
            tabIndex={0}
            aria-label="Assistir vídeo"
            className={`relative group cursor-pointer ${className}`}
            style={{ width: pulseSize, height: pulseSize }}
          >
            {innerContent}
          </SafeDiv>
        </DialogTrigger>
        <DialogContent className="max-w-4xl bg-black border-none p-0 overflow-hidden w-[90vw]">
          <DialogTitle className="sr-only">Vídeo Institucional</DialogTitle>
          <DialogDescription className="sr-only">Assista ao vídeo institucional de Sousa Araújo Advocacia.</DialogDescription>
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={videoUrl.includes('youtube.com/watch?v=')
                ? videoUrl.replace('watch?v=', 'embed/') + '?autoplay=1'
                : videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label="Assistir vídeo"
      className={`relative group cursor-pointer ${className}`}
      style={{ width: pulseSize, height: pulseSize }}
    >
      {innerContent}
    </button>
  );
}
