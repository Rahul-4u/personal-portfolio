import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images, navItems, profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { Socials } from "./Socials";
import { ThemeSwitch } from "@/components/theme/ThemeToggle";

type Props = {
  active: string;
  onNavigate?: () => void;
};

export function SidebarContent({ active, onNavigate }: Props) {
  return (
    <div className="flex min-h-full flex-col px-10 py-5">
      <a href="#home" onClick={onNavigate} className="group mx-auto block" aria-label={`${profile.name} — back to top`}>
        <span className="block size-[208px] overflow-hidden rounded-full border-[6px] border-card-raised transition-transform duration-500 group-hover:scale-[1.03]">
          <img
            src={images.avatar}
            alt={`Portrait of ${profile.name}`}
            width={208}
            height={208}
            className="size-full object-cover"
          />
        </span>
      </a>

      <nav aria-label="Main" className="mt-6">
        <ul className="flex flex-col gap-1.5">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={onNavigate}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[10px] px-2.5 py-1.5 font-medium text-foreground/85 transition-all duration-300 hover:translate-x-1 hover:text-primary",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="size-[17px]" strokeWidth={1.75} />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 border-t border-border-strong pt-6">
        <p className="font-medium text-foreground/85">Find With Me</p>
        <Socials className="mt-4" />
      </div>

      <div className="mt-6">
        <p className="mb-3 font-medium text-foreground/85">Appearance</p>
        <ThemeSwitch />
      </div>

      <Button asChild variant="hero" size="pillSm" className="mt-8 w-full">
        <a href="#contact" onClick={onNavigate}>
          Let's Talk <ArrowRight />
        </a>
      </Button>
    </div>
  );
}
