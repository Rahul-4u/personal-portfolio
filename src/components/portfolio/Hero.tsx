import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { hero, images, profile } from "@/content/portfolio";
import { Socials } from "./Socials";
import { useIntroDone } from "./introStore";
import { GsapMagnetic } from "./GsapMagnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useTypewriter(words: string[], typeMs = 85, holdMs = 1700) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState<string>(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? typeMs / 2 : typeMs,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeMs, holdMs]);

  return text;
}

const squares = [
  "left-[8%] top-[18%] size-2",
  "left-[46%] top-[30%] size-1",
  "right-[6%] top-[6%] size-2.5",
  "right-[2%] top-[22%] size-2",
  "left-[40%] bottom-[14%] size-2",
  "right-[10%] bottom-[18%] size-2",
  "left-[22%] bottom-[30%] size-1.5",
];

const fadeUpFor = (show: boolean) => (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const typed = useTypewriter(hero.rotatingTitles);
  const introDone = useIntroDone();
  const fadeUp = fadeUpFor(introDone);

  const sectionRef = useRef<HTMLElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const textTopRef = useRef<HTMLParagraphElement>(null);
  const textBottomRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitWrapRef.current;
    const textTop = textTopRef.current;
    const textBottom = textBottomRef.current;
    if (!section || !portrait) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const ctx = gsap.context(() => {
      // ScrollTrigger scrub parallax on hero portrait
      gsap.to(portrait, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      if (canHover) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const mouseX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const mouseY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

          gsap.to(portrait, {
            x: mouseX * 22,
            y: mouseY * 16,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (textTop) {
            gsap.to(textTop, {
              x: -mouseX * 18,
              y: -mouseY * 12,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (textBottom) {
            gsap.to(textBottom, {
              x: -mouseX * 22,
              y: -mouseY * 15,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to([portrait, textTop, textBottom], {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          section.removeEventListener("mousemove", handleMouseMove);
          section.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 xl:pt-0 xl:pb-0"
    >
      {squares.map((pos, i) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute bg-foreground/25 animate-drift ${pos}`}
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div className="relative z-10 order-2 lg:order-1">
          <motion.p {...fadeUp(0.05)} className="font-heading text-2xl font-bold uppercase tracking-wide text-foreground">
            {hero.greeting}
          </motion.p>
          <motion.h1 {...fadeUp(0.15)} className="mt-2 text-[40px] leading-[1.2] sm:text-[54px]">
            I'm {profile.name}
          </motion.h1>
          <motion.p
            {...fadeUp(0.25)}
            className="mt-1 min-h-[1.3em] font-heading text-[34px] font-bold leading-[1.3] text-foreground sm:text-[50px]"
            aria-label={`A ${hero.rotatingTitles.join(", ")}`}
          >
            A <span className="text-primary">{typed}</span>
            <span aria-hidden className="ml-1 inline-block h-[0.95em] w-[2px] translate-y-[0.12em] bg-foreground animate-caret" />
          </motion.p>

          <motion.div {...fadeUp(0.32)} className="mt-4">
            <GsapMagnetic strength={0.2}>
              <span className="inline-flex items-center rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-foreground">
                {profile.title}
              </span>
            </GsapMagnetic>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="mt-6 max-w-[540px] space-y-3 text-base leading-[1.85] sm:text-lg">
            {hero.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-9 flex flex-wrap gap-4">
            <GsapMagnetic strength={0.35}>
              <Button asChild variant="hero" size="pill">
                <a href="#portfolio">
                  View My Projects <ArrowRight />
                </a>
              </Button>
            </GsapMagnetic>
            <GsapMagnetic strength={0.35}>
              <Button asChild variant="ghostPill" size="pill">
                <a href="https://github.com/Rahul-4u" target="_blank" rel="noopener noreferrer">
                  <Github className="size-4" />
                  GitHub Profile
                </a>
              </Button>
            </GsapMagnetic>
            <GsapMagnetic strength={0.35}>
              <Button asChild variant="ghostPill" size="pill">
                <a href="#contact">Let's Work Together</a>
              </Button>
            </GsapMagnetic>
          </motion.div>

          <motion.div {...fadeUp(0.6)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-foreground">
              <span className="size-2.5 rounded-full bg-success animate-pulse-ring" aria-hidden />
              {profile.availability}
            </span>
            <Socials />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto w-full max-w-[460px] lg:order-2"
        >
          <p
            ref={textTopRef}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[26%] z-0 text-center font-heading text-[56px] font-bold leading-none text-foreground sm:text-[78px] will-change-transform"
          >
            {hero.bigTextTop}
          </p>
          <div ref={portraitWrapRef} className="relative z-10 animate-float-y will-change-transform">
            <img
              src={images.heroPortrait}
              alt={`${profile.name}, ${profile.title}`}
              width={800}
              height={1200}
              fetchPriority="high"
              className="relative mx-auto w-[82%] select-none [mask-image:linear-gradient(180deg,black_70%,transparent_98%)]"
            />
          </div>
          <p
            ref={textBottomRef}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[8%] z-20 text-center font-heading text-[56px] font-bold leading-none text-outline sm:text-[78px] will-change-transform"
          >
            {hero.bigTextBottom}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
