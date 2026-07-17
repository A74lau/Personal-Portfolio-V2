import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const PROJECTS = [
  {
    name: "MelodyGram",
    symbol: "MLDG",
    description: "A Python script that uses the Instagram API to automate posts and monitor comments for song suggestions, integrates the Spotify API to search and select tracks, and stores user-selected songs in a local database.",
    stack: ["Python", "SQLite", "Spotify API", "Instagram API"],
    kpis: [{ label: "TYPE", value: "Automation" }, { label: "APIS", value: "2" }, { label: "STATUS", value: "ACTIVE" }],
  },
  {
    name: "MTG Commander Classifier",
    symbol: "MTG-CC",
    description: "A supervised learning model that predicts optimal Magic: The Gathering deck themes for new commanders by analyzing card features and theme frequencies.",
    stack: ["Python", "TensorFlow", "Scikit-learn", "NumPy", "Pandas", "Sryfall API"],
    kpis: [{ label: "TYPE", value: "ML Model" }, { label: "APIS", value: "1" }, { label: "STATUS", value: "ACTIVE" }],
  },
  {
    name: "PokeSet Tracker",
    symbol: "POKET",
    description: "A web application that pulls real-time Pokémon TCG card data from the TCGdex API, featuring set filtering, card search, and responsive UI for collectors.",
    stack: ["Java", "Spring Boot", "HTML/CSS", "Thymeleaf", "Maven", "TCGdex API"],
    kpis: [{ label: "TYPE", value: "Web App" }, { label: "APIS", value: "1" }, { label: "STATUS", value: "ACTIVE" }],
  },
  {
    name: "ChatterAI",
    symbol: "CHAI",
    description: "A real-time chat application with an AI chatbot and Firebase back-end for storing conversations and responses, built with a modern web framework.",
    stack: ["TypeScript", "React", "CSS", "Firebase", "Next.js", "OpenAI API"],
    kpis: [{ label: "TYPE", value: "Full-stack" }, { label: "APIS", value: "2" }, { label: "STATUS", value: "ACTIVE" }],
  },
  {
    name: "Travel Advisor",
    symbol: "TRVL",
    description: "A travel advisor web app that helps users discover destinations, plan trips, and explore points of interest with interactive features like maps, weather, and recommendations.",
    stack: ["JavaScript", "HTML", "CSS"],
    kpis: [{ label: "TYPE", value: "Web App" }, { label: "APIS", value: "3+" }, { label: "STATUS", value: "ACTIVE" }],
  },
];

function TradeSlip({ project }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[340px] h-[440px] border border-steel bg-obsidian-light/40 hover:border-bull/50 hover:bg-obsidian-light/60 transition-all has-nodes group flex flex-col">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-steel bg-obsidian/40">
        <div className="flex items-center gap-2">
          <span className="text-bull font-mono text-sm font-bold">${project.symbol}</span>
          <span className="text-bull text-xs">▲</span>
        </div>
        <span className="text-xs font-mono text-bull bg-bull/10 px-2 py-0.5 border border-bull/20">{project.kpis[2].value}</span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-mono font-bold text-frosted group-hover:text-bull transition-colors">{project.name}</h3>
        <p className="mt-2 text-sm text-frosted/70 leading-relaxed font-body flex-1">{project.description}</p>

        <div className="mt-4 pt-3 border-t border-steel space-y-2">
          {project.kpis.map((kpi) => (
            <div key={kpi.label} className="flex items-center justify-between">
              <span className="text-xs font-mono text-steel-muted tracking-widest">{kpi.label}</span>
              <span className="text-xs font-mono text-frosted">{kpi.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-steel">
          {project.stack.map((tech) => (
            <span key={tech} className="px-1.5 py-0.5 text-xs font-mono text-steel-muted border border-steel bg-obsidian/50 rounded-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 360, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="relative px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-4">
          
          <div className="[&_span]:text-sm [&_span]:md:text-xl">
            <SectionHeader
              index="03"
              label="Asset Portfolio"
              title="Projects"
            />
          </div>
          
          <div className="hidden md:flex gap-2 mb-12 flex-shrink-0">
            <button
              onClick={() => scroll(-1)}
              className="w-9 h-9 flex items-center justify-center border border-steel text-steel-muted hover:border-bull hover:text-bull transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-9 h-9 flex items-center justify-center border border-steel text-steel-muted hover:border-bull hover:text-bull transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x scroll-pl-0 max-w-full">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="snap-start"
            >
              <TradeSlip project={project} />
            </motion.div>
          ))}
          <div className="flex-shrink-0 w-4" />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-mono text-steel-muted">
            <ArrowUpRight className="w-3 h-3 text-bull" />
            <span>Swipe / scroll to browse all positions</span>
          </div>
        </div>
      </div>
    </section>
  );
}
