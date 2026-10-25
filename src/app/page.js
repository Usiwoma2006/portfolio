import WorkSection from "@/components/WorkSection";
import { getProjects } from "@/lib/projects";
import Work from "@/components/Work";
import WelcomeIntro from "@/components/WelcomeIntro";
import HeroScene from "@/components/HeroScene";
import Contact from "@/components/Contact";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      <WelcomeIntro />
      <HeroScene />      
      <WorkSection projects={projects} />

      <section id="contact" className="flex min-h-screen items-center justify-center">
      <Contact />
      </section>
    </main>
  );
}