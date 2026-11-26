/**
 * useScrollAnim — GSAP ScrollTrigger animation presets
 *
 * Each preset returns a cleanup function.
 * All are SSR-safe (run only inside useEffect).
 *
 * Presets:
 *  clipReveal     — left-to-right curtain wipe (cards, images)
 *  flipCard       — 3-D Y-axis flip entrance
 *  elasticPop     — scale-bounce with rotation snap
 *  cascadeSlide   — staggered alternating left/right slide
 *  spotlightFade  — blur-clear + opacity with scale
 *  counterUp      — animated number count-up
 *  wordReveal     — word-by-word stagger for headings
 *  lineReveal     — gradient underline draw-on
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimPreset =
  | "clipReveal"
  | "flipCard"
  | "elasticPop"
  | "cascadeSlide"
  | "spotlightFade"
  | "lineReveal";

interface ScrollAnimOptions {
  preset: AnimPreset;
  targets: string;          // CSS selector relative to the ref container
  stagger?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

export function useScrollAnim(options: ScrollAnimOptions) {
  const containerRef = useRef<HTMLElement | HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const els = Array.from(el.querySelectorAll<HTMLElement>(options.targets));
      if (!els.length) return;

      const stagger = options.stagger ?? 0.1;
      const delay = options.delay ?? 0;
      const start = options.start ?? "top 85%";
      const toggleActions = "play none none none";

      switch (options.preset) {
        /* ── Curtain wipe: cards slide open from left ── */
        case "clipReveal": {
          gsap.set(els, { clipPath: "inset(0 100% 0 0 round 12px)", opacity: 1 });
          gsap.to(els, {
            clipPath: "inset(0 0% 0 0 round 12px)",
            duration: 0.9,
            ease: "power3.out",
            stagger,
            delay,
            scrollTrigger: { trigger: els[0], start, toggleActions },
          });
          break;
        }

        /* ── 3-D Y-axis flip — like turning a page ── */
        case "flipCard": {
          gsap.set(els, { rotationY: 85, opacity: 0, transformPerspective: 900 });
          gsap.to(els, {
            rotationY: 0,
            opacity: 1,
            duration: 0.85,
            ease: "back.out(1.5)",
            stagger,
            delay,
            scrollTrigger: { trigger: els[0], start, toggleActions },
          });
          break;
        }

        /* ── Scale-bounce elastic pop ── */
        case "elasticPop": {
          gsap.set(els, { scale: 0.6, opacity: 0, rotation: -8 });
          gsap.to(els, {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.55)",
            stagger,
            delay,
            scrollTrigger: { trigger: els[0], start, toggleActions },
          });
          break;
        }

        /* ── Alternating L/R slide stagger ── */
        case "cascadeSlide": {
          els.forEach((item, i) => {
            const dir = i % 2 === 0 ? -60 : 60;
            gsap.set(item, { x: dir, opacity: 0, scale: 0.95 });
            gsap.to(item, {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: delay + i * stagger,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start, toggleActions },
            });
          });
          break;
        }

        /* ── Blur-clear spotlight fade ── */
        case "spotlightFade": {
          gsap.set(els, { filter: "blur(18px)", opacity: 0, y: 24, scale: 0.96 });
          gsap.to(els, {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            stagger,
            delay,
            scrollTrigger: { trigger: els[0], start, toggleActions },
          });
          break;
        }

        /* ── Gradient underline draw-on (for eyebrow / headings) ── */
        case "lineReveal": {
          gsap.set(els, { backgroundSize: "0% 2px" });
          gsap.to(els, {
            backgroundSize: "100% 2px",
            duration: 0.9,
            ease: "power3.inOut",
            stagger,
            delay,
            scrollTrigger: { trigger: els[0], start, toggleActions },
          });
          break;
        }
      }
    }, containerRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}

/* ─────────────────────────────────────────────────────────
   Standalone counter-up hook (for stat numbers)
───────────────────────────────────────────────────────── */
export function useCounterUp(end: number, suffix = "+", duration = 1.8) {
  const elRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        onUpdate() {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
      });
    }, elRef);

    return () => ctx.revert();
  }, [end, suffix, duration]);

  return elRef;
}

/* ─────────────────────────────────────────────────────────
   Word-by-word heading reveal helper
───────────────────────────────────────────────────────── */
export function animateWordReveal(el: HTMLElement | null, delay = 0) {
  if (!el) return;
  const text = el.textContent ?? "";
  const words = text.split(" ");
  el.innerHTML = words
    .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block gsap-word">${w}</span></span>`)
    .join(" ");

  const wordEls = el.querySelectorAll(".gsap-word");
  gsap.set(wordEls, { y: "110%", opacity: 0 });
  gsap.to(wordEls, {
    y: "0%",
    opacity: 1,
    duration: 0.65,
    ease: "power3.out",
    stagger: 0.07,
    delay,
    scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
  });
}
