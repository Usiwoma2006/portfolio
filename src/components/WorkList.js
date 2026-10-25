"use client";

import { useState } from "react";
import Link from "next/link";

function Media({ media, title, className = "" }) {
  if (media.type === "video") {
    return (
      <video
        key={media.src}
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        className={className}
      />
    );
  }
  return <img src={media.src} alt={media.alt ?? title} className={className} />;
}

export default function WorkList({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];

  if (!active) return null;

  return (
    <div className="mt-12 grid gap-12 md:grid-cols-2">
      <ul className="divide-y divide-border border-y border-border">
        {projects.map((p, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                className="group block py-6"
              >
                {/* mobile thumbnail (preview column is hidden on phones) */}
                <div className="mb-4 overflow-hidden rounded-lg border border-border md:hidden">
                  <Media media={p.media} title={p.title} className="w-full" />
                </div>

                <p className="text-xs uppercase tracking-widest text-accent-soft">
                  {p.category}
                </p>
                <h3
                  className={`mt-1 text-2xl font-semibold transition-colors ${
                    isActive ? "text-foreground" : "text-muted"
                  }`}
                >
                  {p.title}
                  <span
                    className={`ml-2 inline-block transition-transform ${
                      isActive ? "translate-x-1" : ""
                    }`}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </h3>
                {p.summary && (
                  <p className="mt-2 max-w-md text-muted">{p.summary}</p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden md:block">
        <div className="sticky top-24 overflow-hidden rounded-xl border border-border bg-surface">
          <Media
            media={active.media}
            title={active.title}
            className="aspect-video w-full object-cover"
          />
          {active.technologies.length > 0 && (
            <ul className="flex flex-wrap gap-2 p-4">
              {active.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-accent/40 px-3 py-1 text-sm text-accent-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}