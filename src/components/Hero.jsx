import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, FileText, ArrowDown } from "lucide-react";
import HeroTerminal from "@/components/HeroTerminal";

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/A74lau/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anson-lau-9673641b8/" },
  { icon: Mail, label: "Email", href: "mailto:a74lau@gmail.com" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/anson___lau/" },
  { icon: FileText, label: "Resume", href: "/AL_Resume_2026.pdf?v=20260717-2" },
];

const STATS = [
  { label: "MARKET CAP", value: "2", sub: "YEARS OF EXPERIENCE" },
  { label: "VOLUME", value: "50K+", sub: "LINES OF CODE" },
  { label: "DIVIDEND", value: "10+", sub: "TECHNOLOGIES" },
];

const HERO_IMG = "/hero-bg.png";

export default function Hero() {
  return (
    <section id="about-me" className="relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-center px-4 md:px-8 py-12 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-1.5 h-1.5 bg-bull animate-pulse-dot rounded-full" />
          <span className="text-[15px] font-mono text-bull tracking-[0.25em] uppercase">Market Open · Initialize Session</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-bull font-mono text-sm font-bold">$ANSON</span>
              <span className="text-bull text-xs">▲</span>
              <span className="text-bull font-mono text-sm">+100.0%</span>
            </div>

            <h1 className="font-mono font-extrabold text-frosted tracking-tighter leading-[0.9] text-6xl sm:text-7xl md:text-8xl lg:text-8xl">
              ANSON
              <br />
              <span className="text-bull text-glow-bull" style={{ textShadow: "0 0 30px rgba(38,217,199,0.3)" }}>LAU</span>
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-bull/50 to-transparent" />
              <p className="text-sm md:text-base font-mono text-steel-muted">
                Software Developer <span className="text-steel">·</span> Toronto, ON
              </p>
            </div>

            <p className="mt-4 text-[15px] md:text-[17px] text-frosted/70 max-w-md leading-[1.8] font-body">
              Computer Engineering graduate from the University of Waterloo, turning complex problems into clean, functional code. Full-stack development, cloud APIs, and AI.
            </p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 max-w-lg">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="border border-steel bg-obsidian-light/40 p-2.5 has-nodes"
                >
                  <div className="text-[13px] font-mono font-mediumtext-steel-muted tracking-widest">{stat.label}</div>
                  <div className="text-lg font-mono font-bold text-bull tracking-tight">{stat.value}</div>
                  <div className="text-[12px] font-mono font-medium text-steel-muted">{stat.sub}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 border border-steel bg-obsidian-light/40 hover:border-bull hover:bg-bull/5 transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white group-hover:text-bull transition-colors" />
                  <span className="text-[15px] font-mono text-white group-hover:text-bull transition-colors tracking-wider">{social.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <HeroTerminal />
          </motion.div>
        </div>

        <motion.a
          href="#skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:flex absolute -bottom-32 left-1/2 -translate-x-1/2 flex-col items-center gap-2 group"
        >
          <span className="text-[13px] font-mono text-steel-muted tracking-widest group-hover:text-bull transition-colors">SCROLL DOWN</span>
          <ArrowDown className="w-5 h-5 text-steel-muted group-hover:text-bull transition-colors animate-float" />
        </motion.a>
      </div>
    </section>
  );
}
