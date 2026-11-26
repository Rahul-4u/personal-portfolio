import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  className?: string;
};

/** GSAP ScrollTrigger-powered smooth reveal component */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  scale = 0.97,
  className,
}: RevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y,
          x,
          scale,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.85,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    }, elRef);

    return () => ctx.revert();
  }, [delay, y, x, scale]);

  return (
    <div ref={elRef} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
