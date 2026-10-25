import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/projects";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <Link href="/#work" className="text-accent-soft hover:underline">
        ← Back to work
      </Link>

      <Suspense fallback={<p className="mt-10 text-muted">Loading project…</p>}>
        <ProjectContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProjectContent({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const { title, summary, category, media, technologies, liveUrl, sourceUrl, details } = project;

  const sections = [
    { label: "The problem", text: details.problem },
    { label: "The solution", text: details.solution },
    { label: "Key decisions", text: details.decisions },
    { label: "Outcome", text: details.outcome },
  ].filter((s) => s.text);

  return (
    <>
      <p className="mt-8 text-sm uppercase tracking-widest text-accent-soft">{category}</p>
      <h1 className="mt-2 text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-lg text-muted">{summary}</p>

      <div className="mt-10 overflow-hidden rounded-xl border border-border">
        {media.type === "video" ? (
          <video src={media.src} controls muted playsInline className="w-full" />
        ) : (
          <img src={media.src} alt={media.alt ?? title} className="w-full" />
        )}
      </div>

      {technologies.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-accent/40 px-3 py-1 text-sm text-accent-soft"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      {(liveUrl || sourceUrl) && (
        <div className="mt-8 flex gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-accent px-5 py-2 font-medium text-on-accent hover:bg-accent-hover"
            >
              Live site
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-5 py-2"
            >
              Source code
            </a>
          )}
        </div>
      )}

      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.label}>
            <h2 className="text-2xl font-semibold">{s.label}</h2>
            <p className="mt-3 text-muted">{s.text}</p>
          </section>
        ))}
      </div>
    </>
  );
}