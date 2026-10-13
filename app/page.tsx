import { SiteNav } from '@/components/SiteNav';
import { Hero } from '@/components/Hero';
import { SectionLinks } from '@/components/SectionLinks';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

/** The landing page: who I am, then a way into each section of work. */
export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="overflow-x-hidden min-w-0">
        <Hero />
        <SectionLinks />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
