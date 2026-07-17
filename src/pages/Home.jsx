import TerminalBackground from "@/components/TerminalBackground";
import TickerStream from "@/components/TickerStream";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-obsidian text-frosted grid-bg">
      <TerminalBackground />
      <Navbar />
      <main className="relative z-10 pt-14 pb-12">
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <TickerStream />
    </div>
  );
}