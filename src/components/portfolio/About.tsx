import { Check } from "lucide-react";
import { about, images, profile } from "@/content/portfolio";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal x={-30} y={0} className="relative">
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
          <div className="absolute -bottom-6 right-4 rounded-[20px] border border-border bg-card px-6 py-4 shadow-card sm:right-8">
            <p className="font-heading text-4xl font-bold leading-none text-primary">{profile.experience}</p>
            <p className="mt-1 text-sm text-foreground">Professional Experience</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">{about.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 text-[34px] leading-[1.15] sm:text-[44px] lg:text-[50px]">{about.heading}</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 space-y-4 text-base leading-[1.8] sm:text-[17px]">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-foreground">
                  <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
