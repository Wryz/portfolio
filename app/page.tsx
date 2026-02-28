import { Hero } from '@/components/Hero';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { CareerProvider } from '@/lib/CareerContext';

export default function Home() {
  return (
    <CareerProvider>
      <main className="overflow-x-hidden min-w-0">
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </CareerProvider>
  );
}
