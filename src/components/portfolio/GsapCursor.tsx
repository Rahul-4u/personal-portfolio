import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Fluid Micro-Glow Cursor Follower driven by GSAP quickTo */
export function GsapCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Check fine pointer support
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    cursor.style.display = "block";
    ring.style.display = "block";

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "rgba(255, 0, 85, 0.8)",
          backgroundColor: "rgba(255, 0, 85, 0.1)",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.3,
          overwrite: "auto",
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255, 0, 85, 0.35)",
          backgroundColor: "transparent",
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_rgba(255,0,85,0.9)]"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/35 transition-colors"
      />
    </>
  );
}
