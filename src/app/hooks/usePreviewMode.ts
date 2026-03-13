import { createContext, useContext } from 'react';

/**
 * PreviewModeContext — informa aos componentes se estão sendo renderizados
 * dentro do preview do painel admin e em qual modo (desktop/tablet/mobile).
 * Quando null, o componente está rodando normalmente no site.
 */
export const PreviewModeContext = createContext<'desktop' | 'tablet' | 'mobile' | null>(null);

/** Hook para ler o modo de preview atual */
export function usePreviewMode() {
  return useContext(PreviewModeContext);
}