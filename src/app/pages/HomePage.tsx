import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Stats } from '../components/Stats';
import { ServicesGrid } from '../components/ServicesGrid';
import { Differentials } from '../components/Differentials';
import { PracticeAreas } from '../components/PracticeAreas';
import { CtaBanner } from '../components/CtaBanner';
import { Videos } from '../components/Videos';
import { Blog } from '../components/Blog';
import { Contact } from '../components/Contact';
import { ScrollReveal } from '../components/ui/animations';

/**
 * HomePage — all 11 sections of the main landing page
 * Cada secao envolvida em ScrollReveal para animacao padronizada ao scroll
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <ServicesGrid />
      </ScrollReveal>
      <ScrollReveal>
        <Differentials />
      </ScrollReveal>
      <ScrollReveal>
        <Stats />
      </ScrollReveal>
      <ScrollReveal>
        <PracticeAreas />
      </ScrollReveal>
      <ScrollReveal direction="none" duration={0.9}>
        <CtaBanner />
      </ScrollReveal>
      <ScrollReveal>
        <Videos />
      </ScrollReveal>
      <ScrollReveal>
        <Blog />
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </>
  );
}
