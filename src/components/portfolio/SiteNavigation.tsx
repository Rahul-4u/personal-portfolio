import { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { images, navItems, profile } from "@/content/portfolio";
import { SidebarContent } from "./SidebarContent";
import { useActiveSection } from "./useActiveSection";
import { ThemeToggleIcon } from "@/components/theme/ThemeToggle";

const sectionIds = navItems.map((n) => n.id);

/** Fixed left sidebar on large screens, compact top bar with slide-in menu below. */
export function SiteNavigation() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-y-0 left-0 z-40 hidden w-[290px] overflow-y-auto border-r border-sidebar-border bg-sidebar/75 backdrop-blur-2xl shadow-2xl xl:block">
        <SidebarContent active={active} />
      </header>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl shadow-sm xl:hidden">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <a href="#home" className="flex items-center gap-3">
            <img
              src={images.avatar}
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full border-2 border-card-raised object-cover"
            />
            <span className="font-heading text-xl font-bold text-foreground">{profile.name}</span>
          </a>
          <div className="flex items-center gap-2">
            <Button asChild variant="hero" size="sm" className="hidden h-10 px-5 sm:inline-flex">
              <a href="#contact">
                Let's Talk <ArrowRight />
              </a>
            </Button>
            <ThemeToggleIcon />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="square" size="square" aria-label="Open menu" className="size-10">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] overflow-y-auto border-sidebar-border bg-sidebar-gradient p-0 text-foreground sm:max-w-[300px]"
              >
                <SheetTitle className="sr-only">Site menu</SheetTitle>
                <SidebarContent active={active} onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
