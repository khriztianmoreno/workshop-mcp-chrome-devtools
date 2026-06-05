import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ProjectsGrid } from "@/components/projects-grid";
import { PitchSection } from "@/components/pitch-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProjectsGrid />
        <PitchSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
