import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { projectCategories, projects as baseProjects, type Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import deshlineImg from "../../assets/deshline-preview.jpg";

type ModalState = { project: Project; mode: "preview" | "details" } | null;

const deshlineProject = {
  title: "DeshLine — Bus Ticket Counter Management",
  category: "React & Next.js Applications",
  description:
    "Bangladesh intercity coach network and unified online & counter ticket inventory platform featuring live seat selection, instant PNR, and verified QR e-tickets.",
  image: deshlineImg,
  liveUrl: "https://bus-ticket-counter-management-p81l.vercel.app/",
  isSample: false,
  stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  details: [
    "Unified online and counter seat inventory with atomic 5-minute seat lock to prevent duplicate bookings.",
    "Route search across divisions, coach classes (AC Business, Double-Deck Royal Sleeper, Express), and live ticket tracking.",
    "Instant PNR generation, QR e-ticket verification, and 24/7 dispatch & dashboard workflows.",
  ],
} as unknown as Project;

export function Portfolio() {
  const [filter, setFilter] = useState<string>("All");
  const [modal, setModal] = useState<ModalState>(null);
  const filters = ["All", ...projectCategories];
  const projects = useMemo(() => [deshlineProject, ...baseProjects], []);
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  const openPreview = (project: Project) => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    } else {
      setModal({ project, mode: "preview" });
    }
  };

  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Latest Portfolio"
          title="Turning Ideas Into Powerful Digital Experiences"
          description="A look at the kinds of websites and applications I build across WordPress, React, PHP, Squarespace and Wix."
        />

        <div
          role="tablist"
          aria-label="Filter projects"
          className="-mx-1 mb-12 flex flex-wrap justify-center gap-2.5"
        >
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border-strong text-foreground/80 hover:border-primary hover:text-primary",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-x-[50px] gap-y-14 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setModal({ project, mode: "details" })}
                  className="block w-full cursor-pointer overflow-hidden rounded-[30px] border-2 border-border-strong bg-media-gradient p-4 text-left transition-colors duration-500 group-hover:border-primary/60 sm:p-6"
                  aria-label={`Open details for ${project.title}`}
                >
                  <div className="relative overflow-hidden rounded-[20px]">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    {project.isSample ? (
                      <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                        Sample project
                      </span>
                    ) : null}
                  </div>
                </button>

                <div className="mt-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-primary">{project.category}</p>
                    <h3 className="mt-1 text-2xl leading-snug sm:text-[26px]">{project.title}</h3>
                  </div>
                  <Button
                    variant="square"
                    size="square"
                    onClick={() => setModal({ project, mode: "details" })}
                    aria-label={`${project.title} details`}
                    className="shrink-0"
                  >
                    <ArrowUpRight />
                  </Button>
                </div>
                <p className="mt-3 text-base leading-[1.75]">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground/85"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="hero" size="pillSm" onClick={() => openPreview(project)}>
                    Live Preview <ExternalLink />
                  </Button>
                  <Button
                    variant="ghostPill"
                    size="pillSm"
                    onClick={() => setModal({ project, mode: "details" })}
                  >
                    Project Details <Info />
                  </Button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={modal !== null} onOpenChange={(o) => !o && setModal(null)}>
        <DialogContent className="max-h-[90svh] max-w-3xl overflow-y-auto rounded-[24px] border-border-strong bg-card p-5 sm:p-8">
          {modal ? (
            <>
              <img
                src={modal.project.image}
                alt={`${modal.project.title} screenshot`}
                className="aspect-[3/2] w-full rounded-[16px] object-cover"
              />
              <div>
                <p className="text-sm font-medium text-primary">{modal.project.category}</p>
                <DialogTitle className="mt-1 font-heading text-3xl font-bold text-foreground">
                  {modal.project.title}
                </DialogTitle>
                <DialogDescription className="mt-3 text-base leading-[1.75] text-muted-foreground">
                  {modal.mode === "preview" && !modal.project.liveUrl
                    ? "This is a sample showcase piece, so there is no live link yet. Real project links will appear here as they are added."
                    : modal.project.description}
                </DialogDescription>
                <ul className="mt-5 space-y-2.5">
                  {modal.project.details.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-foreground">
                      <Check className="mt-1 size-4 shrink-0 text-primary" strokeWidth={3} />
                      {d}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {modal.project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-card-raised px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild variant="hero" size="pillSm">
                    <a href="#contact" onClick={() => setModal(null)}>
                      Start a Similar Project <ArrowUpRight />
                    </a>
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
