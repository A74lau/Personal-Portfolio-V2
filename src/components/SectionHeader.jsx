import { motion } from "framer-motion";

export default function SectionHeader({ label, title, subtitle, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 md:mb-14"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] font-mono text-steel-muted">{index}</span>
        <div className="w-1.5 h-1.5 bg-bull animate-pulse-dot rounded-full" />
        <span className="text-[11px] font-mono text-bull tracking-[0.2em] uppercase">{label}</span>
        <div className="flex-1 h-px bg-gradient-to-r from-steel to-transparent" />
      </div>
      <h2 className="text-2xl md:text-4xl font-mono font-bold text-frosted tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-steel-muted font-mono">{subtitle}</p>}
    </motion.div>
  );
}