/**
 * ContatoPage — Página de Contato completa
 * Seção de formulário (componente Contact) + Google Maps embed
 */

import { Contact } from '../components/Contact';
import { ScrollReveal } from '../components/ui/animations';
import imgMap from 'figma:asset/2c629276f9feab4d3f688fd29931dba6d0bef5b7.png';
import { readPanel, isValidPanelValue } from '../hooks/usePanelContent';

export function ContatoPage() {
  const mapAlt = readPanel('contato.map.alt', 'Localização do Escritório Sousa Araújo Advocacia');
  const mapImage = readPanel('contato.mapImage', '');
  const mapLink = readPanel('contato.mapLink', '');

  const mapSrc = (mapImage && isValidPanelValue(mapImage)) ? mapImage : imgMap;

  const mapContent = (
    <div>
      <img
        src={mapSrc}
        alt={mapAlt}
        className="w-full h-auto object-cover"
      />
    </div>
  );

  return (
    <>
      <Contact />

      {/* Google Maps / Static Map Section */}
      <section className="bg-[#161312] py-6">
        <ScrollReveal>
          {mapLink && isValidPanelValue(mapLink) ? (
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir localização no Google Maps"
              className="block hover:opacity-90 transition-opacity"
            >
              {mapContent}
            </a>
          ) : (
            mapContent
          )}
        </ScrollReveal>
      </section>
    </>
  );
}