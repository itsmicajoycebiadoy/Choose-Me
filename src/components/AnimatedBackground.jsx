import { useEffect, useMemo, useRef } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const stateRef = useRef(null);

  const stars = useMemo(() => {
    const seed = 1337;
    const rnd = mulberry32(seed);
    return Array.from({ length: 90 }, (_, i) => {
      const z = rnd();
      return {
        id: i,
        x: rnd(),
        y: rnd(),
        r: 0.6 + z * 1.6,
        vx: (rnd() - 0.5) * 0.06,
        vy: 0.18 + rnd() * 0.35,
        tw: 0.4 + rnd() * 0.8,
        phase: rnd() * Math.PI * 2,
        hueShift: rnd() > 0.65 ? 1 : 0,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const setSize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stateRef.current = {
        w,
        h,
      };
    };

    setSize();
    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const start = performance.now();
    const tick = (t) => {
      const s = stateRef.current;
      if (!s) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const time = (t - start) / 1000;
      ctx.clearRect(0, 0, s.w, s.h);

      // subtle moving nebula overlay
      const grad = ctx.createRadialGradient(
        s.w * 0.22,
        s.h * 0.18,
        10,
        s.w * 0.22,
        s.h * 0.18,
        Math.max(s.w, s.h) * 0.7
      );
      grad.addColorStop(0, "rgba(165,94,234,0.18)");
      grad.addColorStop(0.45, "rgba(30,144,255,0.06)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s.w, s.h);

      for (const star of stars) {
        const speedFactor = 0.75 + star.r / 3;
        const x = star.x * s.w + Math.sin(time * 0.2 + star.phase) * 10 * speedFactor;
        const y = star.y * s.h + time * star.vy * 55 * speedFactor;

        // wrap
        const wy = ((y % (s.h + 30)) + (s.h + 30)) % (s.h + 30) - 15;

        const twinkle = 0.5 + 0.5 * Math.sin(time * star.tw + star.phase);
        const alpha = 0.08 + twinkle * 0.5;

        const hue = star.hueShift ? 46 : 260;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
        ctx.arc(x, wy, star.r * (0.75 + twinkle * 0.9), 0, Math.PI * 2);
        ctx.fill();
      }

      // connections
      ctx.lineWidth = 1;
      const maxDist = 140;
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        const ax = a.x * s.w + Math.sin(time * 0.2 + a.phase) * 10;
        const ay = ((a.y * s.h + time * a.vy * 55) % (s.h + 30)) - 15;

        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const bx = b.x * s.w + Math.sin(time * 0.2 + b.phase) * 10;
          const by = ((b.y * s.h + time * b.vy * 55) % (s.h + 30)) - 15;

          const dx = ax - bx;
          const dy = ay - by;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < maxDist) {
            const a2 = 0.08 + (1 - d / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(165,94,234,${clamp(a2, 0, 0.25)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        opacity: 0.9,
        filter: "saturate(1.05)",
      }}
    />
  );
}

