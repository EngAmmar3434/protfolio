import { useEffect, useRef } from "react";

const DEFAULT_STAR_COLOR = "#56d7ff";
const MOBILE_QUERY = "(max-width: 767px)";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 86, g: 215, b: 255 };
}

export default function AnimatedBackground({
  count = 360,
  speed = 0.42,
  starColor = DEFAULT_STAR_COLOR,
  twinkle = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mobileQuery = window.matchMedia(MOBILE_QUERY);

    let width = 0;
    let height = 0;
    let animationId = 0;
    let tick = 0;
    let settings = {
      count,
      dprLimit: 2,
      isMobile: false,
      speed,
      twinkle,
    };

    const maxDepth = 1500;
    const rgb = hexToRgb(starColor);

    const createStar = (initialZ) => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: initialZ ?? Math.random() * maxDepth,
      twinkleSpeed: Math.random() * 0.018 + 0.006,
      twinkleOffset: Math.random() * Math.PI * 2,
    });

    let stars = [];

    const getSettings = () => {
      const isMobile = mobileQuery.matches;

      return {
        count: isMobile ? Math.min(count, 150) : count,
        dprLimit: isMobile ? 1.5 : 2,
        isMobile,
        speed: isMobile ? Math.min(speed, 0.24) : speed,
        twinkle: twinkle && !isMobile,
      };
    };

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect();
      settings = getSettings();
      const dpr = Math.min(window.devicePixelRatio || 1, settings.dprLimit);

      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: settings.count }, () => createStar());

      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);
    };

    const drawStarfield = () => {
      tick += 1;

      ctx.fillStyle = "rgba(2, 6, 23, 0.22)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      for (const star of stars) {
        star.z -= settings.speed * 2.2;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = maxDepth;
        }

        const scale = 420 / star.z;
        const x = centerX + star.x * scale;
        const y = centerY + star.y * scale;

        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
          continue;
        }

        const depth = 1 - star.z / maxDepth;
        const size = Math.max(0.35, depth * 2.45);
        let opacity = depth * 0.55 + 0.08;

        if (settings.twinkle && star.twinkleSpeed > 0.012) {
          opacity *=
            0.75 + 0.25 * Math.sin(tick * star.twinkleSpeed + star.twinkleOffset);
        }

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        ctx.shadowColor = starColor;
        ctx.shadowBlur = settings.isMobile ? (depth > 0.72 ? 3 : 0) : depth > 0.65 ? 10 : 2;
        ctx.globalAlpha = 1;
        ctx.fill();

        if (!settings.isMobile && star.z < maxDepth * 0.28 && settings.speed > 0.25) {
          const streakLength = depth * settings.speed * 12;
          const angle = Math.atan2(star.y, star.x);

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x - Math.cos(angle) * streakLength,
            y - Math.sin(angle) * streakLength
          );
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.22})`;
          ctx.lineWidth = Math.max(0.4, size * 0.42);
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(drawStarfield);
    };

    setupCanvas();

    const resizeObserver = new ResizeObserver(setupCanvas);
    resizeObserver.observe(container);
    mobileQuery.addEventListener("change", setupCanvas);

    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(drawStarfield);
    }

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      mobileQuery.removeEventListener("change", setupCanvas);
    };
  }, [count, speed, starColor, twinkle]);

  return (
    <div ref={containerRef} className="lab-animated-background" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.42] mix-blend-screen"
      />

      <div className="lab-bg-glow lab-bg-glow-primary" />
      <div className="lab-bg-glow lab-bg-glow-secondary" />
      <div className="lab-bg-beam lab-bg-beam-left" />
      <div className="lab-bg-beam lab-bg-beam-right" />
      <div className="lab-bg-scan" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(37,99,235,0.16), transparent 38%), radial-gradient(circle at 72% 58%, rgba(86,215,255,0.08), transparent 34%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(156,236,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(156,236,255,0.10) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 46%, rgba(2,6,23,0.82) 100%)",
        }}
      />
    </div>
  );
}
