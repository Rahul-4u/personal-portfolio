import { whyMe } from "@/content/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function WhyMe() {
  return (
    <section id="why-me" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Work With Me"
          title="A Developer Who Cares About the Details"
        />
        <Reveal>
          <ul className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {whyMe.map(({ title, text, icon: Icon }) => (
              <li
                key={title}
                className="group relative border-b border-r border-border p-8 transition-colors duration-500 hover:bg-card md:p-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
                />
                <Icon className="size-9 text-primary transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.5} />
                <h3 className="mt-6 text-2xl leading-snug">{title}</h3>
                <p className="mt-3 text-base leading-[1.75]">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
