import { createFileRoute } from "@tanstack/react-router";
import { SiteNavigation } from "@/components/portfolio/SiteNavigation";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Skills } from "@/components/portfolio/Skills";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Experience } from "@/components/portfolio/Experience";
import { WhyMe } from "@/components/portfolio/WhyMe";
import { Pricing } from "@/components/portfolio/Pricing";
import { Blog } from "@/components/portfolio/Blog";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { HackerLoader } from "@/components/portfolio/HackerLoader";

const title = "Rahul Baishnab — Senior Full-Stack Web Developer";
const description =
  "Rahul Baishnab builds modern websites, custom WordPress plugins and themes, and web applications with React, Next.js, PHP, Squarespace and Wix.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "google-site-verification", content: "PmnmM5rBOTHyTDKVhCdhPegl3ELSHriJ6kx6eV6t9AQ" },
      { name: "keywords", content: "Rahul Baishnab, Full Stack Web Developer Bangladesh, WordPress Developer Bangladesh, WordPress Plugin Developer, Next.js React Developer, Freelance Web Developer" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HackerLoader />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      {/* Ambient Liquid Glass Background Glow Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] left-[10%] size-[620px] rounded-full bg-primary/14 blur-[140px] animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute top-[30%] -right-[10%] size-[700px] rounded-full bg-[oklch(0.6_0.2_240)]/12 blur-[160px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[58%] left-[5%] size-[600px] rounded-full bg-[oklch(0.65_0.22_310)]/10 blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[80%] right-[15%] size-[640px] rounded-full bg-primary/12 blur-[150px] animate-pulse" style={{ animationDuration: '11s' }} />
      </div>

      <SiteNavigation />
      <div className="relative z-10 overflow-x-clip xl:pl-[290px]">
        <main id="main">
          <Hero />
          <About />
          <Services />
          <Skills />
          <Portfolio />
          <Experience />
          <WhyMe />
          <Pricing />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}
