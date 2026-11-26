import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";
import gsap from "gsap";

type GsapTiltProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  maxTilt?: number;
  perspective?: number;
  className?: string;
  glare?: boolean;
};

/** GSAP 3D Interactive Perspective Card Tilt on Hover */
export function GsapTilt({
  children,
  maxTilt = 6,
  perspective = 1000,
  className = "",
  glare = true,
  ...rest
}: GsapTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: perspective,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        gsap.to(glareRef.current, {
          opacity: 0.25,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 0, 85, 0.2) 0%, transparent 65%)`,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });

      if (glare && glareRef.current) {
        gsap.to(glareRef.current, {
          opacity: 0,
          duration: 0.5,
          overwrite: "auto",
        });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, perspective, glare]);

  return (
    <div
      ref={containerRef}
      className={`relative [perspective:1000px] ${className}`}
      {...rest}
    >
      <div
        ref={cardRef}
        className="relative h-full w-full will-change-transform [transform-style:preserve-3d]"
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 transition-opacity"
          />
        )}
      </div>
    </div>
  );
}
