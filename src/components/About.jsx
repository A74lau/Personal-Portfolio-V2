import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import CandlestickChart from "@/components/CandlestickChart";

export default function About() {
  return (
    <section id="skills" className="relative px-4 md:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">

        <div className="[&_span]:text-sm [&_span]:md:text-xl">
          <SectionHeader
            index="01"
            label="Technical Analysis"
            title="Skills & Technologies"
            subtitle=""
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[15px] font-mono text-bull tracking-widest">// PROFILE SUMMARY</span>
              <div className="flex-1 h-px bg-steel" />
            </div>

            <p className="mt-4 text-[15px] md:text-[17px] text-frosted/70 max-w-md leading-[1.8] font-body">
              Hi, I'm <span className="text-bull font-medium">Anson</span> — a Computer Engineering graduate from the{" "}
              <span className="text-frosted font-medium">University of Waterloo</span> with a passion for the financial markets and building impactful software.
            </p>
            <p className="mt-4 text-[15px] md:text-[17px] text-frosted/70 max-w-md leading-[1.8] font-body">
              My experience spans full-stack development, cloud APIs, and AI, with internships at{" "}
              <span className="text-bull-dim">Magnet Forensics</span> and{" "}
              <span className="text-bull-dim">Geotab</span>. I thrive on solving complex problems — whether automating tests in Python, optimizing cloud infrastructure, or developing web applications.
            </p>
            <p className="mt-4 text-[15px] md:text-[17px] text-frosted/70 max-w-md leading-[1.8] font-body">
              When I'm not coding, you'll find me researching and performing technical analysis on different stocks or just playing badminton!
            </p>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="border border-steel bg-obsidian-light/40 p-3">
                <div className="text-med font-mono text-steel-muted tracking-widest mb-1">EDUCATION</div>
                <div className="text-base font-mono text-frosted">B.ASc Computer Engineering</div>
                <div className="text-sm font-mono text-steel-muted">University of Waterloo</div>
              </div>
              <div className="border border-steel bg-obsidian-light/40 p-3">
                <div className="text-med font-mono text-steel-muted tracking-widest mb-1">LOCATION</div>
                <div className="text-base font-mono text-frosted">Toronto, ON</div>
                <div className="text-sm font-mono text-steel-muted">Canada 🇨🇦</div>
              </div>
            </div>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[15px] font-mono text-bull tracking-widest">// LANGUAGES AND FRAMEWORKS</span>
              <div className="flex-1 h-px bg-steel" />
            </div>
            <CandlestickChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
