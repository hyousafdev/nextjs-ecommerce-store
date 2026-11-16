import { siteConfig } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-foreground/70">
        <p>
          {siteConfig.name} is a demo store built with Next.js, TypeScript,
          Tailwind CSS and Redux Toolkit.
        </p>
      </div>
    </footer>
  );
}