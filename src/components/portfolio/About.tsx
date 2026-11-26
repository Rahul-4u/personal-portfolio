import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, images, profile } from "@/content/portfolio";
import { useScrollAnim, useCounterUp } from "@/hooks/useScrollAnim";
import { GsapTilt } from "./GsapTilt";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  // Elastic pop for the highlight list items
  const listRef = useScrollAnim({
    preset: "elasticPop",
    targets: "li",
    stagger: 0.09,
    start: "top 85%",
  });

  // Counter-up for years of experience
  const countRef = useCounterUp(3, "+");

  // Clip-reveal for the about image
  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: "inset(100% 0 0 0 round 24px)", opacity: 1 });
      gsap.to(el, {
        clipPath: "inset(0% 0 0 0 round 24px)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    }, imgRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image with bottom-up wipe reveal */}
        <div ref={imgRef} className="relative">
          <GsapTilt maxTilt={3} className="rounded-[30px]">
            <div className="group relative overflow-hidden rounded-[30px] border border-border bg-card p-3">
              <img
                src={images.aboutImage}
                alt="Developer workspace with code editor and website design"
                width={1000}
                height={1000}
                loading="lazy"
                className="aspect-square w-full rounded-[22px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </GsapTilt>
          {/* Animated counter badge */}
          <div className="absolute -bottom-6 right-4 rounded-[20px] border border-border bg-card px-6 py-4 shadow-card sm:right-8">
            <p ref={countRef as React.RefObject<HTMLParagraphElement>} className="font-heading text-4xl font-bold leading-none text-primary">
              0+
            </p>
            <p className="mt-1 text-sm text-foreground">Professional Experience</p>
          </div>
        </div>

        {/* Text block */}
        <div>
          <div className="eyebrow">{about.eyebrow}</div>
          <h2 className="mt-3 text-[34px] leading-[1.15] sm:text-[44px] lg:text-[50px]">{about.heading}</h2>
          <div className="mt-6 space-y-4 text-base leading-[1.8] sm:text-[17px]">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {/* Elastic-pop highlights list */}
          <ul
            ref={listRef as React.RefObject<HTMLUListElement>}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {about.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-foreground">
                <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
