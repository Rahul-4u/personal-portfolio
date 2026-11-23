import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hero, images, profile } from "@/content/portfolio";
import { Socials } from "./Socials";
import { useIntroDone } from "./introStore";

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

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 xl:pt-0 xl:pb-0">
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

          <motion.p {...fadeUp(0.32)} className="mt-4 inline-flex items-center rounded-full border border-border-strong px-4 py-1.5 text-sm font-medium text-foreground">
            {profile.title}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-6 max-w-[540px] space-y-3 text-base leading-[1.85] sm:text-lg">
            {hero.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="hero" size="pill">
              <a href="#portfolio">
                View My Projects <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="ghostPill" size="pill">
              <a href="#contact">Let's Work Together</a>
            </Button>
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
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[26%] z-0 text-center font-heading text-[56px] font-bold leading-none text-foreground sm:text-[78px]"
          >
            {hero.bigTextTop}
          </p>
          <div className="relative z-10 animate-float-y">
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
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[8%] z-20 text-center font-heading text-[56px] font-bold leading-none text-outline sm:text-[78px]"
          >
            {hero.bigTextBottom}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
