import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DATA = [
  {
    date: "Sep '21",
    fullDate: "Sep 2021 — Dec 2021",
    company: "Company: Cabinet Office",
    symbol: "GOVT",
    role: "Executive IT Support Intern",
    location: "Toronto, ON",
    open: 12, high: 16, low: 10, close: 15,
    stack: ["IT Support", "Networking", "System Administration"],
    points: [
      "Provided IT support to the Premier of Ontario and Cabinet, ensuring seamless government system operations.",
      "Resolved software, network, and database issues, reducing downtime by 15%.",
      "Configured 100+ laptops and devices for government employees, accelerating onboarding by 30%.",
    ],
  },
  {
    date: "May '22",
    fullDate: "May 2022 — Aug 2022",
    company: "Company: Algal Engineering",
    symbol: "ALGL",
    role: "Electrical Engineer Intern",
    location: "Markham, ON",
    open: 15, high: 22, low: 14, close: 20,
    stack: ["JavaScript", "HTML", "CSS", "AutoCAD", "ETAP"],
    points: [
      "Developed the company's web application using JavaScript, HTML, and CSS.",
      "Designed electrical wiring diagrams for nuclear and building projects using AutoCAD.",
      "Conducted short circuit analysis and load calculations with ETAP across 10+ projects.",
    ],
  },
  {
    date: "Jan '23",
    fullDate: "Jan 2023 — Apr 2023",
    company: "Company: Brickeye",
    symbol: "BRCK",
    role: "Software Developer Intern",
    location: "Markham, ON",
    open: 20, high: 30, low: 19, close: 28,
    stack: ["Python", "TypeScript", "React", "Appium", "Docker", "Segment", "Mixpanel"],
    points: [
      "Built end-to-end automation testing for Android features using Python, Appium, and Docker.",
      "Implemented TypeScript, React, and Segment to track 5,000+ monthly user events via Mixpanel.",
      "Managed daily tasks in Jira and submitted pull requests via AWS CodeCommit.",
    ],
  },
  {
    date: "Jan '24",
    fullDate: "Jan 2024 — Apr 2024",
    company: "Company: Geotab",
    symbol: "GEO",
    role: "Software Developer Intern",
    location: "Waterloo, ON",
    open: 28, high: 45, low: 27, close: 42,
    stack: ["C#", ".NET", "Polly", "Superset", "SQL", "GCP", "Terraform", "Moq"],
    points: [
      "Implemented error-handling with C#, .NET, and Polly, reducing API errors by 20%.",
      "Built a real-time API dashboard with Superset and SQL to track 10,000+ daily calls.",
      "Led cloud API rate-limiting with GCP and Terraform, cutting excessive traffic by 35%.",
      "Created unit/integration tests using Moq and xUnit to ensure feature stability.",
    ],
  },
  {
    date: "Sep '24",
    fullDate: "Sep 2024 — Dec 2024",
    company: "Company: Magnet Forensics",
    symbol: "MAGNT",
    role: "Software Developer Intern",
    location: "Waterloo, ON",
    open: 42, high: 65, low: 40, close: 62,
    stack: ["C#", ".NET", "xUnit", "Jenkins", "SQLite", "NuGet"],
    points: [
      "Maintained platform compatibility by updating data extraction logic for 5+ platforms like Safari and Telegram.",
      "Optimized data processing workflows for SQLite databases, resolving performance bottlenecks.",
      "Developed tests with xUnit and automated builds/deployments using Jenkins CI/CD pipelines.",
    ],
  },
  {
    date: "Sep '25",
    fullDate: "Sep 2025 — Present",
    company: "Company: BrainRidge Consulting",
    symbol: "BRNR",
    role: "Software Developer/Consultant",
    location: "Toronto, ON",
    open: 62, high: 82, low: 60, close: 78,
    stack: ["Java", "Spring Boot", "Angular", "Node.js", "GitHub Actions", "GitHub Copilot", "AWS CloudWatch"],
    points: [
      "Spearheaded agentic AI adoption at BMO BBX by integrating GitHub Copilot and AI agents into developer workflows.",
      "Developed full-stack features with Java, Spring Boot, and Angular for BMO BBX applications.",
      "Remediated serverless vulnerabilities across 10+ BMO repositories, eliminating 300+ critical security issues.",
      "Diagnosed and resolved CI/CD pipeline failures using GitHub Actions, reducing deployment issues.",
      "Monitored deployments with AWS CloudWatch and performed root-cause analysis via log tracing.",
    ],
  },
];

const VB_W = 1000;
const VB_H = 900;
const PAD = { l: 55, r: 55, t: 35, b: 45 };
const CW = VB_W - PAD.l - PAD.r;
const CH = VB_H - PAD.t - PAD.b;
const Y_MAX = 90;
const N = DATA.length;
const CANDLE_W = 30;

const yScale = (v) => PAD.t + CH - (v / Y_MAX) * CH;
const xScale = (i) => PAD.l + (i + 0.5) * (CW / N);

const closePts = DATA.map((d, i) => ({ x: xScale(i), y: yScale(d.close) }));
const linePath = closePts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
const areaPath = `${linePath} L ${closePts[N - 1].x.toFixed(1)} ${yScale(0).toFixed(1)} L ${closePts[0].x.toFixed(1)} ${yScale(0).toFixed(1)} Z`;
const yTicks = [0, 20, 40, 60, 80];

const latestClose = DATA[N - 1].close;
const totalChange = ((latestClose - DATA[0].open) / DATA[0].open * 100).toFixed(1);


// $ANSON Trade History — interactive candlestick chart
export default function ExperienceChart() {
  const [active, setActive] = useState(N - 1);
  const [hasInteracted, setHasInteracted] = useState(false);

  const exp = DATA[active];

  return (
    <div>

      {/* Side by side: Detail (left) + Chart (right) */}
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-4 items-start">
        {/* Left: Position Detail */}
        <div className="border border-steel bg-obsidian-light/40 has-nodes">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-steel bg-obsidian/40">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-bull animate-pulse-dot rounded-full" />
              <span className="text-sm font-mono text-bull tracking-widest">// POSITION DETAIL</span>
            </div>
            <span className="text-sm font-mono text-steel-muted">ENTRY {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-5 md:p-6"
            >
              <span className="text-bull font-mono font-bold text-xl">${exp.symbol}</span>
              <h3 className="text-xl font-mono font-bold text-frosted leading-tight mt-1">{exp.role}</h3>
              <p className="text-base font-mono text-bull-dim mt-1">{exp.company}</p>
              <div className="mt-4 space-y-2 text-base font-mono text-steel-muted">
                <div className="flex items-center gap-2">{exp.fullDate}</div>
                <div className="flex items-center gap-2">{exp.location}</div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {exp.stack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-sm font-mono text-steel-muted border border-steel bg-obsidian/50 rounded-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-steel">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-mono text-steel-muted tracking-widest">// KEY ACTIVITIES</span>
                  <div className="flex-1 h-px bg-steel" />
                </div>
                <ul className="space-y-3">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex gap-2 text-base text-frosted/80 leading-relaxed font-body">
                      <span className="text-bull flex-shrink-0 mt-0.5">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Chart + Navigation */}
        <div className="flex flex-col gap-3">
          {/* Chart */}
          <div 
            className="relative border border-steel bg-obsidian-light/30 has-nodes p-1.5 md:p-3"
            onMouseEnter={() => setHasInteracted(true)}
            onTouchStart={() => setHasInteracted(true)}
          >
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" style={{ maxHeight: "900px" }}>
              <defs>
                <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#26D9C7" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#26D9C7" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Watermark */}
              <text x={VB_W / 2} y={VB_H / 2} textAnchor="middle" fill="#233334" fontSize="130" fontFamily="JetBrains Mono" fontWeight="bold" opacity="0.12">
                $ANSON
              </text>

              {/* Y Grid + Labels */}
              {yTicks.map((tick) => (
                <g key={tick}>
                  <line x1={PAD.l} y1={yScale(tick)} x2={VB_W - PAD.r} y2={yScale(tick)} stroke="#233334" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                  <text x={PAD.l - 10} y={yScale(tick) + 5} fill="#718684" fontSize="16" textAnchor="end" fontFamily="JetBrains Mono">
                    ${tick}
                  </text>
                </g>
              ))}

              {/* Current price line */}
              <line x1={PAD.l} y1={yScale(latestClose)} x2={VB_W - PAD.r} y2={yScale(latestClose)} stroke="#26D9C7" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.35" />
              <rect x={VB_W - PAD.r + 4} y={yScale(latestClose) - 13} width="52" height="26" fill="#26D9C7" rx="2" />
              <text x={VB_W - PAD.r + 30} y={yScale(latestClose) + 5} fill="#090C0D" fontSize="17" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">
                ${latestClose}
              </text>

              {/* Area + Trend line */}
              <path d={areaPath} fill="url(#chartArea)" />
              <path d={linePath} stroke="#26D9C7" strokeWidth="2" fill="none" opacity="0.35" />

              {/* Active vertical reference line */}
              <line x1={xScale(active)} x2={xScale(active)} y1={PAD.t} y2={PAD.t + CH} stroke="#26D9C7" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.3" />

              {/* X Labels */}
              {DATA.map((d, i) => (
                <text
                  key={i}
                  x={xScale(i)}
                  y={VB_H - PAD.b + 28}
                  fill={i === active ? "#26D9C7" : "#718684"}
                  fontSize="16"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono"
                  fontWeight={i === active ? "bold" : "normal"}
                >
                  {d.date}
                </text>
              ))}

              {/* Candlesticks */}
              {DATA.map((d, i) => {
                const x = xScale(i);
                const openY = yScale(d.open);
                const closeY = yScale(d.close);
                const highY = yScale(d.high);
                const lowY = yScale(d.low);
                const isActive = i === active;
                const bodyH = Math.max(Math.abs(closeY - openY), 4);
                const bodyY = Math.min(openY, closeY);

                return (
                  <g key={i} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} style={{ cursor: "pointer" }}>
                    <rect x={x - CW / N / 2} y={PAD.t} width={CW / N} height={CH} fill="transparent" />
                    <line x1={x} x2={x} y1={highY} y2={lowY} stroke="#26D9C7" strokeWidth={isActive ? 3 : 1.5} opacity={isActive ? 1 : 0.4} />
                    <rect
                      x={x - CANDLE_W / 2}
                      y={bodyY}
                      width={CANDLE_W}
                      height={bodyH}
                      fill={isActive ? "#26D9C7" : "rgba(38,217,199,0.2)"}
                      stroke="#26D9C7"
                      strokeWidth={isActive ? 2.5 : 1}
                      opacity={isActive ? 1 : 0.6}
                      style={isActive ? { filter: "drop-shadow(0 0 8px rgba(38,217,199,0.5))" } : {}}
                    />
                    {isActive && (
                      <g>
                        <rect x={x - 40} y={highY - 30} width="80" height="24" fill="#26D9C7" rx="3" />
                        <text x={x} y={highY - 13} fill="#090C0D" fontSize="14" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="bold">
                          ${d.symbol}
                        </text>
                        <polygon points={`${x - 6},${highY - 6} ${x + 6},${highY - 6} ${x},${highY}`} fill="#26D9C7" />
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
            
            <AnimatePresence>
              {!hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.5 } }}
                  transition={{ duration: 0.1, delay: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                >
                  <div className="flex items-center gap-3 bg-obsidian/90 border-2 border-bull/50 px-7 py-4 backdrop-blur-sm shadow-[0_0_24px_rgba(38,217,199,0.18)]">
                    <span className="text-lg md:text-xl font-mono font-bold text-bull tracking-widest">HOVER TO INSPECT</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-steel-muted border border-steel hover:border-bull hover:text-bull transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-widest"
            >
              <ChevronLeft className="w-3 h-3" /> PREV
            </button>
            <div className="flex gap-1.5">
              {DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-bull w-4" : "bg-steel hover:bg-steel-light"}`}
                  aria-label={`Go to experience ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive(Math.min(N - 1, active + 1))}
              disabled={active === N - 1}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-mono text-steel-muted border border-steel hover:border-bull hover:text-bull transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-widest"
            >
              NEXT <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
