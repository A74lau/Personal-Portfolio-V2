import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SKILLS = [
  { name: "Java", body: 96, wick: 99, details: ["Spring Boot", "Thymeleaf", "Maven", "OOP", "Data Structures"] },
  { name: "C#", body: 93, wick: 98, details: [".NET", "xUnit", "Moq", "Polly", "ASP.NET"] },
  { name: "JS / TS", body: 82, wick: 87, details: ["React", "Next.js", "Node.js", "Hooks", "Tailwind"] },
  { name: "Python", body: 80, wick: 86, details: ["TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Appium"] },
  { name: "SQL", body: 72, wick: 76, details: ["SQLite", "Superset", "Query Optimization", "PostgreSQL"] },
];

function Candle({ skill, onPreview, isPreviewed }) {
  const chartH = 280;
  const bodyH = (skill.body / 100) * chartH;
  const wickTop = ((100 - skill.wick) / 100) * chartH;
  const bodyTop = ((100 - skill.body) / 100) * chartH;

  return (
    <button
      onMouseEnter={onPreview}
      onFocus={onPreview}
      className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
      aria-label={`Skill: ${skill.name}, proficiency ${skill.body}%`}
    >
      <div className="relative flex flex-col items-center" style={{ height: chartH }}>
        <div
          className="absolute w-1 bg-bull/70 transition-colors"
          style={{ top: wickTop, height: chartH - wickTop }}
        />
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: bodyH }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className={`relative w-12 border-2 ${
            isPreviewed ? "bg-bull border-bull" : "bg-bull/80 border-bull"
          } transition-all`}
          style={{ marginTop: bodyTop, boxShadow: isPreviewed ? "0 0 20px rgba(38,217,199,0.6)" : "0 0 8px rgba(38,217,199,0.15)" }}
        />
      </div>
      <span className={`mt-3 text-sm md:text-base font-mono tracking-wide transition-colors whitespace-nowrap ${isPreviewed ? "text-bull font-bold" : "text-steel-muted group-hover:text-frosted"}`}>
        {skill.name}
      </span>
    </button>
  );
}

export default function CandlestickChart() {
  const [active, setActive] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3 text-xs font-mono text-steel-muted">
        <span>PROFICIENCY</span>
        <div className="flex gap-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-bull/30 border border-bull/50" /> RANGE</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-bull border border-bull" /> HELD</span>
        </div>
      </div>

      <div
        className="relative border border-steel bg-obsidian-light/50 p-6 has-nodes"
        onMouseEnter={() => setHasInteracted(true)}
        onTouchStart={() => setHasInteracted(true)}
      >
        <div className="flex items-end justify-between gap-6 overflow-x-auto pb-3 pt-2">
          {SKILLS.map((skill, i) => (
            <Candle
              key={skill.name}
              skill={skill}
              onPreview={() => {
                setActive(i);
                setHasInteracted(true);
              }}
              isPreviewed={active === i}
            />
          ))}
        </div>

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

      <div className="mt-4 border border-steel bg-obsidian-light/30 p-5 min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-bull font-mono text-base font-bold">${SKILLS[active].name.toUpperCase().replace(/ \/ /g, "/")}</span>
              </div>
              <span className="text-bull font-mono text-base font-bold">{SKILLS[active].body}%</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS[active].details.map((d) => (
                <span key={d} className="px-2 py-0.5 text-xs font-mono text-bull-dim border border-steel bg-steel/20 rounded-sm">
                  {d}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
