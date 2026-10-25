import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-smoke bg-ink/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Wisdom<span className="text-blaze">.</span>
        </Link>

        <div className="flex items-center gap-6">
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

          <a
            href="/resume.pdf"
            download="Wisdom-Usiwoma-Resume.pdf"
            className="rounded-full border border-blaze px-4 py-1.5 text-sm text-blaze transition-colors hover:bg-blaze hover:text-ink"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}