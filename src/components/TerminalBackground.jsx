import { useEffect, useRef } from "react";

export default function TerminalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w, h;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const oscillators = [
      { amp: 35, freq: 0.007, speed: 0.012, phase: 0, color: "rgba(38,217,199,0.07)", yRatio: 0.28 },
      { amp: 55, freq: 0.005, speed: -0.008, phase: 100, color: "rgba(38,217,199,0.05)", yRatio: 0.55 },
      { amp: 28, freq: 0.009, speed: 0.016, phase: 200, color: "rgba(141,155,153,0.04)", yRatio: 0.78 },
    ];

    let t = 0;
    let rafId;

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(38,73,73,0.13)";
      ctx.lineWidth = 1;
      const gs = 56;
      for (let x = 0; x < w; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    };

    const drawOscillators = () => {
      oscillators.forEach((osc) => {
        ctx.beginPath();
        ctx.strokeStyle = osc.color;
        ctx.lineWidth = 1.5;
        const baseY = h * osc.yRatio;
        for (let x = 0; x <= w; x += 2) {
          const y = baseY + Math.sin(x * osc.freq + t * osc.speed + osc.phase) * osc.amp;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();
      drawOscillators();
      if (!prefersReduced) {
        t += 1;
        rafId = requestAnimationFrame(render);
      }
    };

    render();
    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
