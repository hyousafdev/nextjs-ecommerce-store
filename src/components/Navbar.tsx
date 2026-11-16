import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="border-b border-foreground/10">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-bold">
          {siteConfig.name}
        </Link>
        <ul className="flex flex-wrap items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}