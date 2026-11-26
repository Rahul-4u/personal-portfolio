import { services } from "@/content/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { GsapTilt } from "./GsapTilt";

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="My Services"
          title="Development Services Built Around Your Goals"
          description="From a single landing page to complex custom functionality — here is how I can help your business grow online."
        />
        <div className="grid gap-5 md:grid-cols-2 md:gap-[30px]">
          {services.map(({ title, description, icon: Icon }, i) => (
            <Reveal key={title} delay={(i % 2) * 0.08}>
              <GsapTilt maxTilt={5} className="h-full rounded-[20px]">
                <article className="group relative h-full overflow-hidden rounded-[20px] border border-transparent bg-card p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow md:p-10">
                  <span
                    aria-hidden
                    className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/0 blur-2xl transition-colors duration-500 group-hover:bg-primary/25"
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <h3 className="text-[22px] leading-snug sm:text-2xl">
                      <span className="mr-2.5">{String(i + 1).padStart(2, "0")}.</span>
                      {title}
                    </h3>
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-card-raised text-primary transition-all duration-500 group-hover:rotate-[8deg] group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                  </div>
                  <p className="relative mt-5 text-base leading-[1.75] sm:text-[17px]">{description}</p>
                </article>
              </GsapTilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
