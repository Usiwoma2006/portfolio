"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "ebelebewisdom@gmail.com"; // put your real email here

const LINKS = [
  { label: "GitHub", href: "https://github.com/Usiwoma2006", Icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wisdom-ebelebe-89975724a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    Icon: FaLinkedin,
  },
  { label: "WhatsApp", href: "https://wa.me/2347078435966", Icon: FaWhatsapp },
];

export default function Contact() {
  const root = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the mailto link still works
    }
  };

  return (
    <section
      id="contact"
      ref={root}
      className="relative px-6 py-20 text-center md:py-32"
    >
      {/* vertical icon rail: desktop only */}
      <ul className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-5 md:flex">
        {LINKS.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="block text-2xl opacity-70 transition hover:scale-110 hover:opacity-100"
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>

      <p
        data-reveal
        className="mb-3 text-sm uppercase tracking-widest opacity-60"
      >
        Contact
      </p>

      <h2 data-reveal className="mb-4 text-3xl font-bold md:text-6xl">
        Let&apos;s build something together
      </h2>

      <p data-reveal className="mx-auto mb-8 max-w-xl opacity-80 md:text-lg">
        Open to remote roles, collaborations and interesting problems. The
        fastest way to reach me is email.
      </p>

      <div data-reveal className="mb-10 flex flex-col items-center gap-3">
        <a
          href={`mailto:${EMAIL}`}
          className="break-all text-lg font-semibold underline underline-offset-4 md:text-3xl"
        >
          {EMAIL}
        </a>
        <button
          onClick={copyEmail}
          className="rounded-full border border-current/30 px-4 py-1.5 text-sm transition hover:bg-current/10"
        >
          {copied ? "Copied!" : "Copy email"}
        </button>
      </div>

      {/* text links: mobile only */}
      <ul
        data-reveal
        className="flex flex-wrap justify-center gap-6 md:hidden"
      >
        {LINKS.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition hover:opacity-100 hover:underline"
            >
              {l.label} ↗
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-16 text-xs opacity-50">
        © 2026 Wisdom Ebelebe Usiwoma
      </p>
    </section>
  );
}