import { projects } from "@/data/projects";

const PLACEHOLDER_MEDIA = {
  type: "image",
  src: "/projects/placeholder.jpg",
  alt: "Project preview",
};

// Fills safe defaults so an incomplete entry never breaks a page.
function normalize(project) {
  return {
    slug: project.slug,
    title: project.title ?? "Untitled project",
    summary: project.summary ?? "",
    category: project.category ?? "Other",
    media: project.media ?? PLACEHOLDER_MEDIA,
    technologies: project.technologies ?? [],
    liveUrl: project.liveUrl ?? "",
    sourceUrl: project.sourceUrl ?? "",
    order: project.order ?? 999,
    details: {
      problem: "",
      solution: "",
      decisions: "",
      outcome: "",
      ...project.details,
    },
  };
}

// Async on purpose: swapping to a REST API later won't change any caller.
export async function getProjects() {
  return projects
    .filter((p) => p.slug)
    .map(normalize)
    .sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug) {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}
