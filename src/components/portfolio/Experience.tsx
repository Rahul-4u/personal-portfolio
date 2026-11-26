import { CheckCircle2 } from "lucide-react";
import { experience, images } from "@/content/portfolio";
import { useScrollAnim } from "@/hooks/useScrollAnim";
import { SectionHeading } from "./SectionHeading";
import { GsapTilt } from "./GsapTilt";
import { Reveal } from "./Reveal";

function TitleWithLine({ children }: { children: string }) {
  return (
    <div className="mb-10 flex items-center gap-7">
      <h3 className="text-3xl sm:text-[34px]">{children}</h3>
      <span aria-hidden className="relative h-px w-20 bg-border-strong">
        <span className="absolute -left-0.5 -top-[3px] size-[7px] rounded-full bg-muted-foreground" />
        <span className="absolute -right-0.5 -top-[3px] size-[7px] rounded-full bg-muted-foreground" />
      </span>
    </div>
  );
}

export function Experience() {
  // Cascade slide for focus area cards
  const focusRef = useScrollAnim({
    preset: "cascadeSlide",
    targets: "article",
    stagger: 0.1,
    start: "top 83%",
  });

  // Spotlight fade for responsibilities list
  const respRef = useScrollAnim({
    preset: "spotlightFade",
    targets: "li",
    stagger: 0.08,
    start: "top 85%",
  });

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={experience.eyebrow} title={experience.heading} description={experience.intro} />

        <TitleWithLine>Focus Areas</TitleWithLine>
        <div
          ref={focusRef as React.RefObject<HTMLDivElement>}
          className="grid gap-5 md:grid-cols-2 md:gap-[30px]"
        >
          {experience.focusAreas.map((f) => (
            <GsapTilt key={f.title} maxTilt={4} className="h-full rounded-[20px]">
              <article className="h-full rounded-[20px] bg-card p-6 sm:p-8">
                <h4 className="font-sans text-lg font-normal text-foreground">{f.title}</h4>
                <p className="mt-2 font-heading text-base font-bold text-foreground">{f.tag}</p>
                <p className="mt-5 text-base leading-[1.85] sm:text-[17px]">{f.text}</p>
              </article>
            </GsapTilt>
          ))}
        </div>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-2 lg:gap-[50px]">
          <div ref={respRef as React.RefObject<HTMLDivElement>}>
            <TitleWithLine>Experience</TitleWithLine>
            <p className="text-lg text-primary">experience</p>
            <h4 className="mt-1 text-[26px]">{experience.role}</h4>
            <p className="mt-1 text-foreground">{experience.duration}</p>
            <ul className="mt-6 space-y-3.5">
              {experience.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3 text-base leading-[1.7] sm:text-[17px]">
                  <CheckCircle2 className="mt-1 size-[18px] shrink-0 text-primary" strokeWidth={2} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <Reveal x={30} y={0} className="lg:pt-24">
            <GsapTilt maxTilt={4} className="rounded-[20px]">
              <div className="group overflow-hidden rounded-[20px]">
                <img
                  src={images.workspaceImage}
                  alt="Developer writing code at a desk"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </GsapTilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
