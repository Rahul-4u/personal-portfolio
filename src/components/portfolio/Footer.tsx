import { Mail, Phone } from "lucide-react";
import { footerServices, navItems, profile } from "@/content/portfolio";
import { Socials } from "./Socials";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 bg-card">
      <div className="container-page grid gap-12 pt-20 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1.15fr] lg:gap-10">
        <div>
          <a href="#home" className="inline-flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-primary font-heading text-xl font-bold text-primary-foreground">
              {profile.initials}
            </span>
            <span className="font-heading text-[28px] font-bold text-foreground">{profile.name}</span>
          </a>
          <p className="mt-2 text-sm font-medium text-primary">{profile.title}</p>
          <p className="mt-6 font-heading text-[38px] leading-[1.15] text-foreground sm:text-[46px]">
            <span className="font-bold">Let's Build</span> <span className="font-normal">Something Great</span>
          </p>
          <p className="mt-5 max-w-[380px] text-base leading-[1.75]">{profile.shortIntro}</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-2xl">Quick Links</h3>
          <ul className="mt-6 space-y-3">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-foreground/90 transition-colors hover:text-primary">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-2xl">Services</h3>
          <ul className="mt-6 space-y-3">
            {footerServices.map((s) => (
              <li key={s}>
                <a href="#services" className="text-foreground/90 transition-colors hover:text-primary">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl">Contact</h3>
          <a href={`mailto:${profile.email}`} className="group mt-6 flex items-center gap-3 text-foreground">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border-strong transition-colors group-hover:border-primary group-hover:bg-primary">
              <Mail className="size-4" />
            </span>
            <span className="min-w-0 text-[15px] [overflow-wrap:anywhere] transition-colors group-hover:text-primary">{profile.email}</span>
          </a>
          <a href={profile.phoneHref} className="group mt-4 flex items-center gap-3 text-foreground">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border-strong transition-colors group-hover:border-primary group-hover:bg-primary">
              <Phone className="size-4" />
            </span>
            <span className="text-[15px] transition-colors group-hover:text-primary">{profile.phone}</span>
          </a>
          <p className="mt-4 inline-flex items-center gap-2.5 text-sm text-foreground">
            <span className="size-2.5 rounded-full bg-success" aria-hidden />
            {profile.availability}
          </p>
          <Socials className="mt-6" />
        </div>
      </div>
      <div className="container-page">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border-strong py-7 text-sm sm:flex-row sm:pr-20">
          <p>
            © {year} <span className="text-foreground">{profile.name}</span> | All Rights Reserved
          </p>
          <p>Designed & developed by {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}
