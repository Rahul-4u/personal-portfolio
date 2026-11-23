import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { requestContactPrefill } from "./contactPrefill";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Collaboration"
          title="Flexible Ways to Work Together"
          description="Every project is different, so pricing is tailored to your scope. Pick the option closest to your needs and let's talk."
        />
        <div className="grid items-center gap-[30px] lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <article
                className={cn(
                  "rounded-[20px] bg-card p-8 transition-transform duration-500 hover:-translate-y-1.5 md:p-10",
                  plan.featured && "border border-primary/40 shadow-glow lg:py-14",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl">{plan.name}</h3>
                  {plan.featured ? (
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Popular</span>
                  ) : null}
                </div>
                <p className="mt-3 font-heading text-[38px] font-bold leading-[1.05] text-foreground">Let's Discuss</p>
                <p className="mt-1 font-heading text-lg font-bold text-foreground">Your Project</p>
                <p className="mt-2 text-sm">{plan.tagline}</p>
                <hr className="my-8 border-border-strong" />
                <ul className="space-y-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[17px]">
                      <CheckCircle2 className="size-[18px] shrink-0 fill-primary text-card" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={plan.featured ? "hero" : "ghostPill"}
                  size="pillSm"
                  className="mt-10"
                >
                  <a href="#contact" onClick={() => requestContactPrefill(`${plan.name} project inquiry`)}>
                    Let's Discuss Your Project <ArrowRight />
                  </a>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
