"use client";

import { useRef, useEffect, useCallback, type ReactNode } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * One canvas: interactive dots from first child through last, visible on load.
 * Pointer attraction adds motion; idle state keeps gentle drift + visible dots.
 */
export default function HeroParticleField({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const rafRef = useRef(0);
  const reducedRef = useRef(false);
  const tickRef = useRef(0);

  const syncMouse = useCallback((clientX: number, clientY: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    mouseRef.current = {
      x: (clientX - r.left) / r.width,
      y: (clientY - r.top) / r.height,
      active: true,
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const onMove = (e: MouseEvent) => syncMouse(e.clientX, e.clientY);
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) syncMouse(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => {
      mouseRef.current.active = false;
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("touchmove", onTouch, { passive: true });
    wrap.addEventListener("touchend", onTouchEnd);

    let inited = false;

    const tick = () => {
      tickRef.current += 1;
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      if (W < 2 || H < 2) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (!inited || canvas.width !== Math.floor(W * dpr) || canvas.height !== Math.floor(H * dpr)) {
        canvas.width = Math.floor(W * dpr);
        canvas.height = Math.floor(H * dpr);
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const area = W * H;
        const n = Math.min(240, Math.max(72, Math.floor(area / 5500)));
        particlesRef.current = Array.from({ length: n }, () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 1.35 + 0.5,
        }));
        inited = true;
      }

      ctx.clearRect(0, 0, W, H);

      if (reducedRef.current) {
        const g = ctx.createLinearGradient(0, 0, W, H);
        g.addColorStop(0, "rgba(37, 99, 235, 0.1)");
        g.addColorStop(0.5, "rgba(59, 130, 246, 0.07)");
        g.addColorStop(1, "rgba(37, 99, 235, 0.08)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const t = tickRef.current * 0.008;
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;
      const pull = mouseRef.current.active ? 105 : 0;

      for (const p of particlesRef.current) {
        if (pull > 0) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d2 = dx * dx + dy * dy + 100;
          p.vx += (dx / d2) * pull * 0.014;
          p.vy += (dy / d2) * pull * 0.014;
        }
        // Idle “breathing” drift so dots feel alive before any pointer move
        p.vx += Math.sin(t + p.x * 0.01) * 0.012;
        p.vy += Math.cos(t * 0.9 + p.y * 0.01) * 0.012;
        p.vx += (Math.random() - 0.5) * 0.032;
        p.vy += (Math.random() - 0.5) * 0.032;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) {
          p.x = 0;
          p.vx *= -0.65;
        }
        if (p.x > W) {
          p.x = W;
          p.vx *= -0.65;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -0.65;
        }
        if (p.y > H) {
          p.y = H;
          p.vy *= -0.65;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.45)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("touchmove", onTouch);
      wrap.removeEventListener("touchend", onTouchEnd);
    };
  }, [syncMouse]);

  return (
    <div
      ref={wrapRef}
      className={`relative block w-full cursor-crosshair ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
