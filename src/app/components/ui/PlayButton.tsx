/**
 * PlayButton — botao circular play com efeito radial pulsante
 * Ondas expandindo tipo radar em loop
 * Circulo externo com stroke copper, circulo interno branco semi-transparente com blur, icone play
 */

import svgPaths from '../../../imports/svg-he7mfdirs7';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from './dialog';

interface PlayButtonProps {
  className?: string;
  size?: number;
  onClick?: () => void;
  videoUrl?: string;
}

export function PlayButton({ className = '', size = 133, onClick, videoUrl }: PlayButtonProps) {
  const pulseSize = size * 1.6; // pulse rings go beyond the button

  const ButtonContent = (
    <button
      onClick={onClick}
      aria-label="Assistir vídeo"
      className={`relative group cursor-pointer ${className}`}
      style={{ width: pulseSize, height: pulseSize }}
    >
      {/* ── Pulsing radial rings ── */}
      <span
        className="absolute rounded-full border border-[#AC795F]/40 animate-[heroPulse1_3s_ease-out_infinite]"
        style={{
          width: size,
          height: size,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
        }}
      />
      <span
        className="absolute rounded-full border border-[#AC795F]/25 animate-[heroPulse2_3s_ease-out_infinite_0.8s] pl-[200px] pr-[0px] py-[0px]"
        style={{
          width: size,
          height: size,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
        }}
      />
      <span
        className="absolute rounded-full border border-[#AC795F]/15 animate-[heroPulse3_3s_ease-out_infinite_1.6s]"
        style={{
          width: size,
          height: size,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
        }}
      />

      {/* ── Main button circle ── */}
      <svg
        className="absolute transition-transform duration-500 group-hover:scale-105"
        style={{
          width: size,
          height: size,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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
          strokeOpacity="0.4"
          strokeWidth="3"
        />
        {/* Inner filled circle with blur */}
        <circle
          cx="66.4996"
          cy="66.5"
          r="51.7222"
          fill="white"
          fillOpacity="0.3"
          filter="url(#playBlur)"
        />
        {/* Play triangle */}
        <path d={svgPaths.p1e6c1300} fill="white" />
      </svg>
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="playBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.11" />
          </filter>
        </defs>
      </svg>

      {/* ── Pulse keyframes (injected once) ── */}
      <style>{`
        @keyframes heroPulse1 {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.55); opacity: 0; }
        }
        @keyframes heroPulse2 {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.35; }
          100% { transform: translate(-50%, -50%) scale(1.55); opacity: 0; }
        }
        @keyframes heroPulse3 {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(1.55); opacity: 0; }
        }
      `}</style>
    </button>
  );

  if (videoUrl) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {ButtonContent}
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

  return ButtonContent;
}
