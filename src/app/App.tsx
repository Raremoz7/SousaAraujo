import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { ServicesGrid } from './components/ServicesGrid';
import { Differentials } from './components/Differentials';
import { PracticeAreas } from './components/PracticeAreas';
import { CtaBanner } from './components/CtaBanner';
import { Videos } from './components/Videos';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#161312]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <ServicesGrid />
        <Differentials />
        <Stats />
        <PracticeAreas />
        <CtaBanner />
        <Videos />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
