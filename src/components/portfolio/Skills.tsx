import { motion } from "motion/react";
import { skillGroups, techBadges } from "@/content/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { GsapTilt } from "./GsapTilt";

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Technologies & Strengths I Bring to Every Project"
          description="A full toolkit across modern frontend frameworks, PHP backends and the most popular website platforms."
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-[30px] 2xl:grid-cols-3">
          {skillGroups.map(({ title, icon: Icon, skills }, gi) => (
            <Reveal key={title} delay={(gi % 3) * 0.08}>
              <GsapTilt maxTilt={4} className="h-full rounded-[20px]">
                <article className="group h-full rounded-[20px] bg-card p-8 transition-transform duration-500 hover:-translate-y-1 md:p-10">
                  <header className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-xl bg-primary/12 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-2xl leading-tight">{title}</h3>
                      <p className="text-sm">{skills.length} skills</p>
                    </div>
                  </header>
                  <ul className="mt-7 space-y-4">
                    {skills.map((skill, si) => (
                      <li key={skill}>
                        <span className="text-[15px] font-medium text-foreground">{skill}</span>
                        <span className="mt-2 block h-[3px] overflow-hidden rounded-full bg-card-raised">
                          <motion.span
                            className="block h-full origin-left rounded-full bg-primary"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                            transition={{ duration: 1.1, delay: 0.1 + si * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </GsapTilt>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <ul className="mt-16 grid grid-cols-2 border-l border-t border-border sm:grid-cols-3 lg:grid-cols-4">
            {techBadges.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className="group flex items-center justify-center gap-3 border-b border-r border-border px-3 py-8 text-muted-foreground transition-colors duration-300 hover:bg-card hover:text-foreground sm:py-10"
              >
                <Icon className="size-7 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary sm:size-8" strokeWidth={1.75} />
                <span className="font-heading text-xl font-bold sm:text-[28px]">{name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
