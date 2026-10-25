import { getProjects } from "@/lib/projects";
import WorkList from "./WorkList";

export default async function Work() {
  const projects = await getProjects();

  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-accent-soft">Work</p>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">Selected projects</h2>
      <WorkList projects={projects} />
    </section>
  );
}