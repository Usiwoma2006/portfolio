"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function WelcomeIntro() {
  const root = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const isMobile = window.innerWidth < 768;
    const startClip = isMobile
      ? "inset(38% 10% round 24px)"
      : "inset(36% 30% round 28px)";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // 1. small window blows out to fill the screen
      tl.fromTo(
        "[data-panel]",
        { clipPath: startClip },
        { clipPath: "inset(0% 0% round 0px)", ease: "power2.inOut", duration: 1 }
      )
        .to("[data-text]", { scale: 1.5, ease: "power2.in", duration: 1 }, 0)
        .to("[data-hint]", { opacity: 0, duration: 0.15 }, 0)
        .to("[data-text]", { opacity: 0, duration: 0.3 }, 0.7);
      // the old panel fade is removed
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          data-panel
          className="absolute inset-0 flex items-center justify-center bg-[#6a0c06]"
          style={{ clipPath: "inset(36% 30% round 28px)" }}
        >
          <div data-text className="px-4 text-center text-white">
            <h1 className="text-3xl font-semibold md:text-5xl">
              Hi, I&apos;m Wisdom
            </h1>
            <p className="mt-2 text-sm opacity-80 md:text-base">
              Welcome to my portfolio
            </p>
          </div>
        </div>

        <p
          data-hint
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm opacity-60"
        >
          Scroll ↓
        </p>
      </div>
    </section>
  );
}