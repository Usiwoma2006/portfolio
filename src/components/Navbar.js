"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

const resumeClass =
  "rounded-full border border-blaze px-4 py-1.5 text-sm text-blaze transition-colors hover:bg-blaze hover:text-ink";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-smoke bg-ink/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Wisdom<span className="text-blaze">.</span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 text-sm text-warm-grey">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-blaze"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href="/resume.pdf" download="Wisdom-Usiwoma-Resume.pdf" className={resumeClass}>
            Resume
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-xl md:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-smoke px-6 py-5 md:hidden">
          <ul className="flex flex-col gap-4 text-warm-grey">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block transition-colors hover:text-blaze"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            download="Wisdom-Usiwoma-Resume.pdf"
            onClick={() => setOpen(false)}
            className={`${resumeClass} mt-5 inline-block`}
          >
            Resume
          </a>
        </div>
      )}
    </header>
  );
}