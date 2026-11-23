import { useState } from "react";
import { CalendarClock, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { blogPosts, profile, type BlogPost } from "@/content/portfolio";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Blog() {
  const [post, setPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Blog & Insights"
          title="Insights, Tutorials & Development Knowledge"
          description="Articles on WordPress, React, PHP, performance and more are on the way."
        />
        <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border-2 border-border bg-background transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40">
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt=""
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="aspect-[7/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute left-2.5 top-2.5 flex items-center gap-3 rounded-full bg-background px-4 py-1.5 text-sm text-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="size-3.5" /> {profile.firstName}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock className="size-3.5" /> Coming soon
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-sm font-medium text-primary">{p.category}</p>
                  <h3 className="mt-2 text-[22px] leading-snug sm:text-2xl">{p.title}</h3>
                  <button
                    type="button"
                    onClick={() => setPost(p)}
                    className="mt-auto inline-flex w-fit cursor-pointer items-center gap-1 pt-6 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  >
                    Read More <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={post !== null} onOpenChange={(o) => !o && setPost(null)}>
        <DialogContent className="max-w-lg rounded-[24px] border-border-strong bg-card p-6 sm:p-8">
          {post ? (
            <>
              <img src={post.image} alt="" className="aspect-[7/4] w-full rounded-[16px] object-cover" />
              <div>
                <p className="text-sm font-medium text-primary">{post.category}</p>
                <DialogTitle className="mt-1 font-heading text-2xl font-bold text-foreground">{post.title}</DialogTitle>
                <DialogDescription className="mt-3 text-base leading-[1.75] text-muted-foreground">
                  {post.excerpt} This article is being written and will be published here soon.
                </DialogDescription>
                <Button asChild variant="hero" size="pillSm" className="mt-6">
                  <a href="#contact" onClick={() => setPost(null)}>Ask Me About This Topic</a>
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
