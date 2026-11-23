import { Button } from "@/components/ui/button";
import { socials } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function Socials({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {socials.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <Button asChild variant="social" size="social">
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}
