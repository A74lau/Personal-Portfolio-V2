import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "ABOUT ME", href: "#about-me" },
  { label: "SKILLS", href: "#skills" },
  { label: "WORK EXPERIENCE", href: "#work-experience" },
  { label: "PROJECTS", href: "#projects" },
];

export default function Navbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", { hour12: false });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-steel bg-obsidian/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 md:px-8 h-14">
        <a href="#about-me" className="flex items-center gap-2 group">
          <span className="w-2 h-2 bg-bull animate-pulse-dot rounded-full" />
          <span className="font-mono font-bold text-frosted text-sm tracking-wider">
            $ANSON
          </span>
        </a>

        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2 py-1.5 text-[15px] font-mono font-medium text-steel-muted hover:text-bull transition-colors tracking-widest border border-transparent hover:border-steel rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[10px] font-mono text-steel-muted">{timeStr} EST</span>
          <div className="flex items-center gap-1.5 px-2 py-1 border border-bull/30 bg-bull/5 rounded-sm">
            <span className="w-1.5 h-1.5 bg-bull animate-pulse-dot rounded-full" />
            <span className="text-[10px] font-mono font-bold text-bull tracking-widest">OPEN</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
