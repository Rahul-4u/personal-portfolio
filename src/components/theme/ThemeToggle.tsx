import type { MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";

const originOf = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

/** Round icon button for compact bars. */
export function ThemeToggleIcon({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button
      variant="square"
      size="square"
      onClick={(e) => toggleTheme(originOf(e))}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn("relative size-10 overflow-hidden", className)}
    >
      <Sun className={cn("absolute transition-all duration-500", isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
      <Moon className={cn("absolute transition-all duration-500", isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
    </Button>
  );
}

const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "light", label: "Light", Icon: Sun },
];

/** Two-option pill switch for the sidebar. */
export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <div role="radiogroup" aria-label="Color theme" className={cn("relative grid grid-cols-2 rounded-full border border-border-strong bg-card-raised/60 p-1", className)}>
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-primary shadow-glow transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          theme === "light" && "translate-x-full",
        )}
      />
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={(e) => setTheme(value, originOf(e))}
            className={cn(
              "relative z-10 flex cursor-pointer items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-colors duration-300",
              active ? "text-primary-foreground" : "text-foreground/75 hover:text-foreground",
            )}
          >
            <Icon className="size-4" strokeWidth={1.9} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
