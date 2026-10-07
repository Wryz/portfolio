import { Hero } from '@/components/Hero';
import { ProjectIndex } from '@/components/ProjectIndex';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden min-w-0">
        <Hero />
        <ProjectIndex />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
