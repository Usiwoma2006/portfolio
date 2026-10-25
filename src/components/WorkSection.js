"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Media({ media, active }) {
  const videoRef = useRef(null);

  // Play a video only while its project is active
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) video.play().catch(() => {});
    else video.pause();
  }, [active]);

  if (media.type === "video") {
    return (
      <video
        ref={videoRef}
        src={media.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt ?? ""}
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      className="object-cover"
    />
  );
}

export default function WorkSection({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [projects]);

  const active = projects[activeIndex];

  return (
    <section id="work" className="bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <p className="text-sm uppercase tracking-widest text-blaze">Selected work</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Things I&apos;ve built</h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        {/* Left: project list */}
        <div>
          {projects.map((project, i) => (
            <div
              key={project.slug}
              ref={(el) => (itemRefs.current[i] = el)}
              data-index={i}
              className="flex min-h-[70vh] items-center"
            >
              <Link
                href={`/work/${project.slug}`}
                className={`block w-full transition-opacity duration-500 ${
                  i === activeIndex ? "opacity-100" : "opacity-30"
                }`}
              >
                {/* Mobile only: media sits above the text */}
                <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-smoke md:hidden">
                  <Media media={project.media} active={true} />
                </div>

                <p className="text-sm uppercase tracking-widest text-blaze">
                  {project.category}
                </p>
                <h3 className="mt-2 text-4xl font-bold">{project.title}</h3>
                <p className="mt-3 max-w-md text-warm-grey">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-smoke px-3 py-1 text-xs text-warm-grey"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Right: sticky media (hidden on mobile) */}
        <div className="hidden md:block">
          <div className="sticky top-0 flex h-screen items-center">
            <Link
              href={`/work/${active.slug}`}
              className="relative block aspect-video w-full overflow-hidden rounded-2xl border border-smoke"
            >
              {projects.map((project, i) => (
                <div
                  key={project.slug}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    i === activeIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Media media={project.media} active={i === activeIndex} />
                </div>
              ))}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}