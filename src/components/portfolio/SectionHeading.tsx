import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", className }: Props) {
  const centered = align === "center";
  return (
    <div className={cn(centered && "mx-auto max-w-[680px] text-center", "mb-12 md:mb-16", className)}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-3 text-[34px] leading-[1.15] sm:text-[44px] lg:text-[54px]">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-[1.75] sm:text-[17px]">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
