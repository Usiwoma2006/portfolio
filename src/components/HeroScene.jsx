"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = ({ figureX, figureY, figureScale, isMobile }) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        // desktop: labels slide sideways; mobile: top one up, bottom one down
        const axis = isMobile ? "yPercent" : "xPercent";

        tl.to(
          "[data-label-left]",
          { [axis]: isMobile ? -60 : -40, opacity: 0, duration: 1 },
          0
        )
          .to(
            "[data-label-right]",
            { [axis]: isMobile ? 60 : 40, opacity: 0, duration: 1 },
            0
          )
          .to("[data-standing]", { opacity: 0, duration: 0.6 }, 0.2)
          .fromTo(
            "[data-sitting]",
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            0.4
          )
          .to(
            "[data-figure]",
            {
              xPercent: figureX,
              yPercent: figureY,
              scale: figureScale,
              ease: "power2.inOut",
              duration: 1,
            },
            0.2
          )
          .fromTo(
            "[data-about]",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.9
          );
      };

      mm.add("(min-width: 768px)", () =>
        build({ figureX: -60, figureY: 0, figureScale: 1, isMobile: false })
      );
      mm.add("(max-width: 767px)", () =>
        build({ figureX: 0, figureY: -45, figureScale: 0.8, isMobile: true })
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[260svh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-[var(--background)]">
        {/* labels: top/bottom on phone, left/right on desktop */}
        <h2
          data-label-left
          className="absolute inset-x-0 top-[12%] text-center text-2xl font-semibold md:inset-x-auto md:left-[6%] md:top-1/2 md:-translate-y-1/2 md:text-left md:text-5xl"
        >
          AI Engineer
        </h2>
        <h2
          data-label-right
          className="absolute inset-x-0 bottom-[12%] text-center text-2xl font-semibold md:inset-x-auto md:bottom-auto md:right-[6%] md:top-1/2 md:-translate-y-1/2 md:text-right md:text-5xl"
        >
          Software Engineer
        </h2>

        {/* figure */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            data-figure
            className="relative aspect-[3/4] w-[min(55vw,380px)]"
          >
            <Image
              data-standing
              src="/hero/standing.png"
              alt="Wisdom standing"
              fill
              priority
              className="object-contain"
              sizes="(min-width: 768px) 380px, 55vw"
            />
            <Image
              data-sitting
              src="/hero/sitting.png"
              alt="Wisdom typing on a laptop"
              fill
              className="object-contain opacity-0"
              sizes="(min-width: 768px) 380px, 55vw"
            />
          </div>
        </div>

        {/* about: sits right under the figure on phone, right side on desktop */}
        <div
          data-about
          className="absolute inset-x-0 top-[52%] px-6 text-center opacity-0 md:inset-x-auto md:right-[6%] md:top-1/2 md:w-[38%] md:-translate-y-1/2 md:px-0 md:text-left"
        >
          <h3 className="mb-2 text-2xl font-semibold md:mb-3 md:text-4xl">
            About me
          </h3>
          <p className="text-sm leading-relaxed opacity-80 md:text-lg">
            I&apos;m a self-taught software engineer from Nigeria, building
            AI-powered products and clean, thoughtful interfaces. I love turning
            real problems into working software.
          </p>
        </div>
      </div>
    </section>
  );
}