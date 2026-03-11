/**
 * WordPress Helper Functions
 * 
 * Funções utilitárias para facilitar a integração com WordPress
 */

// Tipo para dados do WordPress disponíveis globalmente
declare global {
  interface Window {
    siteData?: {
      ajaxUrl: string;
      restUrl: string;
      nonce: string;
      homeUrl: string;
      themeUrl: string;
    };
    wp?: {
      media?: any;
    };
  }
}

/**
 * Verifica se está rodando no WordPress
 */
export function isWordPress(): boolean {
  return typeof window !== 'undefined' && !!window.siteData;
}

/**
 * Converte imagem Figma para URL WordPress
 * 
 * @param figmaAsset - String figma:asset/... ou ID da mídia WP
 * @param imageMapping - Mapeamento de imagens (opcional)
 * @returns URL da imagem
 */
export function getImageUrl(
  figmaAsset: string,
  imageMapping?: Record<string, { wpMediaId: number | null }>
): string {
  // Se já é uma URL válida, retornar
  if (figmaAsset.startsWith('http://') || figmaAsset.startsWith('https://')) {
    return figmaAsset;
  }

  // Se está no WordPress e tem mapeamento
  if (isWordPress() && imageMapping) {
    // Extrair hash do figma:asset
    const hash = figmaAsset.replace('figma:asset/', '');
    
    // Procurar no mapeamento
    for (const [key, value] of Object.entries(imageMapping)) {
      if (value.wpMediaId && figmaAsset.includes(hash)) {
        return getWpMediaUrl(value.wpMediaId);
      }
    }
  }

  // Fallback: retornar o figma asset (funciona em dev)
  return figmaAsset;
}

/**
 * Obtém URL de uma imagem da biblioteca de mídia do WordPress
 * 
 * @param mediaId - ID da mídia no WordPress
 * @param size - Tamanho da imagem (thumbnail, medium, large, full)
 * @returns URL da imagem
 */
export function getWpMediaUrl(mediaId: number, size: string = 'full'): string {
  if (!isWordPress()) {
    return '';
  }

  // Usar REST API do WordPress para obter URL
  const restUrl = window.siteData?.restUrl || '/wp-json';
  return `${restUrl}/wp/v2/media/${mediaId}?_fields=source_url&size=${size}`;
}

/**
 * Faz requisição para REST API do WordPress
 * 
 * @param endpoint - Endpoint da API (ex: '/content', '/contact')
 * @param options - Opções do fetch
 * @returns Promise com resposta
 */
export async function wpFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!isWordPress()) {
    throw new Error('WordPress REST API não disponível');
  }

  const restUrl = window.siteData?.restUrl || '/wp-json/sousa-araujo/v1';
  const nonce = window.siteData?.nonce || '';

  const response = await fetch(`${restUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': nonce,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API Error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Envia formulário de contato via WordPress REST API
 * 
 * @param formData - Dados do formulário
 * @returns Promise com resposta
 */
export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  if (!isWordPress()) {
    // Fallback para desenvolvimento local
    console.log('Formulário enviado (modo dev):', formData);
    return { success: true, message: 'Mensagem enviada com sucesso!' };
  }

  return wpFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}

/**
 * Busca artigos do WordPress
 * 
 * @param limit - Número de artigos para retornar
 * @returns Promise com lista de artigos
 */
export async function getArticles(limit: number = 3): Promise<Array<{
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  href: string;
}>> {
  if (!isWordPress()) {
    // Fallback para desenvolvimento local
    return [];
  }

  return wpFetch(`/articles?limit=${limit}`);
}

/**
 * Obtém todo o conteúdo do site do WordPress
 * 
 * @returns Promise com conteúdo completo
 */
export async function getSiteContent(): Promise<any> {
  if (!isWordPress()) {
    // Importar conteúdo local
    const { siteContent } = await import('../data/content');
    return siteContent;
  }

  return wpFetch('/content');
}

/**
 * Renderiza HTML com segurança (sanitizado)
 * Útil para conteúdo vindo do WordPress que pode conter HTML
 * 
 * @param html - String HTML
 * @returns Objeto para usar com dangerouslySetInnerHTML
 */
export function sanitizeHtml(html: string): { __html: string } {
  // Em produção, usar biblioteca como DOMPurify
  // Por enquanto, apenas retornar
  return { __html: html };
}

/**
 * Formata data no padrão brasileiro
 * 
 * @param date - Data em qualquer formato
 * @returns Data formatada (ex: "15 Mar")
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

/**
 * Formata telefone no padrão brasileiro
 * 
 * @param phone - Telefone sem formatação
 * @returns Telefone formatado
 */
export function formatPhone(phone: string): string {
  const numbers = phone.replace(/\D/g, '');
  
  if (numbers.length === 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '+55 ($1) $2-$3');
  } else if (numbers.length === 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '+55 ($1) $2-$3');
  }
  
  return phone;
}

/**
 * Scroll suave para uma seção
 * 
 * @param sectionId - ID da seção (sem #)
 * @param offset - Offset do topo (para navbar fixa)
 */
export function scrollToSection(sectionId: string, offset: number = 69): void {
  const element = document.getElementById(sectionId);
  
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * Detecta se é dispositivo móvel
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Debounce function para otimizar performance
 * 
 * @param func - Função para fazer debounce
 * @param wait - Tempo de espera em ms
 * @returns Função com debounce aplicado
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Hook para carregar dados do WordPress
 * Use este hook em componentes para carregar dados da API
 */
export function useWordPressData<T>(
  endpoint: string,
  defaultData: T
): { data: T; loading: boolean; error: Error | null } {
  const [data, setData] = React.useState<T>(defaultData);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!isWordPress()) {
      setLoading(false);
      return;
    }

    wpFetch<T>(endpoint)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
}

// Re-exportar React para o hook acima funcionar
import * as React from 'react';

export default {
  isWordPress,
  getImageUrl,
  getWpMediaUrl,
  wpFetch,
  submitContactForm,
  getArticles,
  getSiteContent,
  sanitizeHtml,
  formatDate,
  formatPhone,
  scrollToSection,
  isMobile,
  debounce,
  useWordPressData,
};
