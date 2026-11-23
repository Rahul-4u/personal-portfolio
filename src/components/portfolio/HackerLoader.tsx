import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/content/portfolio";
import { markIntroDone } from "./introStore";

const LINES = [
  "ssh guest@rahul.dev --secure",
  "establishing encrypted tunnel",
  "bypassing firewall... just kidding",
  "loading modules: react · next · wordpress · php",
  "decrypting portfolio assets",
  "compiling interface",
];
const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFアカサタナハマヤラワ";
const MATRIX = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/{}$#";
const NAME = profile.name.toUpperCase();
const FULL_MS = 3200;
const QUICK_MS = 900;

function scramble(text: string, resolved: number) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i] ?? "";
    out += i < resolved || ch === " " ? ch : (GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "#");
  }
  return out;
}

function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const styles = getComputedStyle(canvas);
    const bg = styles.getPropertyValue("--background").trim() || "black";
    const fg = styles.getPropertyValue("--primary").trim() || "red";
    const size = 16;
    let drops: number[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / size) }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 45) return;
      last = t;
      ctx.globalAlpha = 0.14;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = fg;
      ctx.font = `${size - 2}px ui-monospace, monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(MATRIX[Math.floor(Math.random() * MATRIX.length)] ?? "0", i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 size-full opacity-35" />;
}

/** Full-screen "terminal boot" intro shown while the page loads. Skippable with any key or click. */
export function HackerLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState(() => NAME.replace(/\S/g, "_"));
  const [reduced, setReduced] = useState(false);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    setProgress(100);
    setTitle(NAME);
    setVisible(false);
    markIntroDone();
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    const total = reduce ? QUICK_MS : FULL_MS;
    const start = performance.now();
    let raf = 0;
    let lastScramble = 0;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / total) * 100);
      setProgress(p);
      if (now - lastScramble > 55) {
        lastScramble = now;
        setTitle(scramble(NAME, Math.floor((p / 75) * NAME.length)));
      }
      if (p < 100) raf = requestAnimationFrame(tick);
      else doneTimer = setTimeout(finish, reduce ? 150 : 650);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      if (doneTimer) clearTimeout(doneTimer);
      window.removeEventListener("keydown", skip);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  const seg = 82 / LINES.length;
  const granted = progress >= 90;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          onClick={finish}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="dark loader-failsafe fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-background px-5 font-mono text-foreground"
        >
          {!reduced && <MatrixRain />}
          <div aria-hidden className="scanlines pointer-events-none absolute inset-0" />
          <div aria-hidden className="pointer-events-none absolute inset-0 loader-vignette" />

          <div className="relative w-full max-w-[620px]">
            <p
              data-text={title}
              className="glitch mb-6 text-center font-heading text-[34px] font-bold leading-none tracking-[0.12em] text-foreground sm:text-[52px]"
            >
              {title}
            </p>

            <div className="overflow-hidden rounded-xl border border-primary/40 bg-card/85 shadow-glow backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border-strong px-4 py-2.5">
                <span className="size-3 rounded-full bg-primary" />
                <span className="size-3 rounded-full bg-chart-4" />
                <span className="size-3 rounded-full bg-success" />
                <span className="ml-3 truncate text-xs text-muted-foreground">root@rahul-dev: ~/portfolio</span>
              </div>

              <div className="min-h-[218px] space-y-1.5 px-4 py-4 text-[12.5px] leading-relaxed sm:text-sm">
                {LINES.map((line, i) => {
                  const frac = Math.max(0, Math.min(1, (progress - i * seg) / seg));
                  if (frac <= 0) return null;
                  const shown = line.slice(0, Math.ceil(frac * 1.35 * line.length));
                  const complete = frac >= 1;
                  return (
                    <p key={line} className="flex gap-2">
                      <span className="text-primary">{i === 0 ? "$" : ">"}</span>
                      <span className="flex-1 text-foreground/90">
                        {shown}
                        {!complete && <span className="ml-0.5 inline-block h-[1em] w-2 translate-y-[2px] bg-primary animate-caret" />}
                      </span>
                      {complete && i > 0 && <span className="text-success">[ OK ]</span>}
                    </p>
                  );
                })}
                {granted && (
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pt-2 font-bold tracking-[0.25em] text-success"
                  >
                    {">"} ACCESS GRANTED_ WELCOME.
                  </motion.p>
                )}
              </div>

              <div className="border-t border-border-strong px-4 py-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{granted ? "system ready" : "booting portfolio"}</span>
                  <span className="tabular-nums text-primary">{Math.floor(progress).toString().padStart(3, "0")}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary shadow-glow"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-xs tracking-[0.2em] text-muted-foreground">
              PRESS ANY KEY OR CLICK TO SKIP
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
