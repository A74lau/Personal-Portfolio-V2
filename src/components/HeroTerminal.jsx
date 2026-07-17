import { useState, useEffect, useRef } from "react";

const LINES = [
  { text: "$ init portfolio --user=anson", type: "cmd" },
  { text: "> Authenticating... OK", type: "out" },
  { text: "> Loading career data...", type: "out" },
  { text: "> Status: OPERATIONAL", type: "success" },
  { text: "", type: "spacer" },
  { text: "ANSON LAU // SOFTWARE DEVELOPER", type: "header" },
  { text: "B.ASc Computer Engineering @ UWaterloo", type: "out" },
  { text: "", type: "spacer" },
  { text: "Welcome to my stock themed portfolio :)", type: "out" },
  { text: "> 2 years of experience", type: "out" },
  { text: "> Full-stack | Cloud APIs | AI/ML", type: "out" },
  { text: "> Based in Toronto, ON [YYZ]", type: "out" },
  { text: "", type: "spacer" },
  { text: "$ ready_to_build --connect", type: "cmd" },
];

export default function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const lineIdxRef = useRef(0);
  const charIdxRef = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisibleLines(LINES);
      return;
    }

    const typeNext = () => {
      if (lineIdxRef.current >= LINES.length) return;
      const line = LINES[lineIdxRef.current];

      if (line.type === "spacer") {
        setVisibleLines((prev) => [...prev, line]);
        lineIdxRef.current++;
        charIdxRef.current = 0;
        setTimeout(typeNext, 150);
        return;
      }

      if (charIdxRef.current <= line.text.length) {
        setCurrentText(line.text.slice(0, charIdxRef.current));
        charIdxRef.current++;
        setTimeout(typeNext, 25 + Math.random() * 30);
      } else {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentText("");
        lineIdxRef.current++;
        charIdxRef.current = 0;
        setTimeout(typeNext, 200);
      }
    };

    const timer = setTimeout(typeNext, 600);
    return () => clearTimeout(timer);
  }, []);

  const colorMap = {
    cmd: "text-frosted",
    out: "text-steel-muted",
    success: "text-bull",
    header: "text-bull font-bold",
    spacer: "",
  };

  const isTyping = lineIdxRef.current < LINES.length;

  return (
    <div className="border border-steel bg-obsidian-light/80 backdrop-blur-sm has-nodes overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-steel bg-obsidian/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-steel-muted/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-frosted/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-bull/70" />
        </div>
        <span className="text-xs font-mono text-steel-muted tracking-widest">ANSON@TERMINAL: ~</span>
        <span className="text-xs font-mono text-bull">●</span>
      </div>
      <div className="p-4 h-[340px] md:h-[360px] overflow-hidden font-mono text-sm leading-relaxed">
        {visibleLines.map((line, i) => (
          <div key={i} className={colorMap[line.type] || ""}>
            {line.type === "spacer" ? "\u00A0" : line.text}
          </div>
        ))}
        {isTyping && currentText && (
          <div className={colorMap[LINES[lineIdxRef.current]?.type] || "text-frosted"}>
            {currentText}
            <span className="animate-blink text-bull">▊</span>
          </div>
        )}
        {isTyping && !currentText && (
          <div className="text-bull">
            <span className="animate-blink">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}
