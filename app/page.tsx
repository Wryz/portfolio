import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { RevealButton } from '@/components/RevealButton';
import { CareerProvider } from '@/lib/CareerContext';
import { RevealProvider } from '@/lib/RevealContext';

export default function Home() {
  return (
    <CareerProvider>
      <RevealProvider>
        <Header />
        <main>
          <Hero />
          <RevealButton />
          <ProjectsSection />
          <ExperienceSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </RevealProvider>
    </CareerProvider>
  );
}
