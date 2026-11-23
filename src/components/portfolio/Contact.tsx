import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Clock, Loader2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { contact, profile } from "@/content/portfolio";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Socials } from "./Socials";
import { onContactPrefill } from "./contactPrefill";

const fieldClass =
  "w-full rounded-[10px] border-2 border-border-strong bg-transparent px-5 text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">
      {message}
    </p>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", subject: "", message: "" },
  });

  useEffect(() => onContactPrefill((subject) => setValue("subject", subject)), [setValue]);

  const onSubmit = async (values: ContactInput) => {
    const { error } = await supabase.from("contact_messages").insert({
      full_name: values.fullName,
      email: values.email,
      subject: values.subject,
      message: values.message,
    });
    if (error) {
      toast.error("Your message couldn't be sent. Please try again in a moment.");
      return;
    }
    toast.success("Thanks! Your message has been sent.");
    setSent(true);
    reset();
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 rounded-[30px] bg-card px-6 py-12 sm:px-10 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-[60px] lg:py-20">
          <div className="flex flex-col justify-center">
            <Reveal>
              <span className="eyebrow">{contact.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-3 text-[34px] leading-[1.2] sm:text-[44px]">{contact.heading}</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-base leading-[1.75]">{contact.description}</p>
              <ul className="mt-8 space-y-4">
                <li>
                  <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 text-foreground">
                    <span className="grid size-11 place-items-center rounded-full bg-card-raised transition-colors group-hover:bg-primary">
                      <Mail className="size-[18px]" />
                    </span>
                    <span className="break-all transition-colors group-hover:text-primary">{profile.email}</span>
                  </a>
                </li>
                <li>
                  <a href={profile.phoneHref} className="group flex items-center gap-4 text-foreground">
                    <span className="grid size-11 place-items-center rounded-full bg-card-raised transition-colors group-hover:bg-primary">
                      <Phone className="size-[18px]" />
                    </span>
                    <span className="transition-colors group-hover:text-primary">{profile.phone}</span>
                  </a>
                </li>
                <li className="flex items-center gap-4 text-foreground">
                  <span className="grid size-11 place-items-center rounded-full bg-card-raised">
                    <Clock className="size-[18px]" />
                  </span>
                  <span className="inline-flex items-center gap-2.5">
                    <span className="size-2.5 rounded-full bg-success animate-pulse-ring" aria-hidden />
                    {profile.availability}
                  </span>
                </li>
              </ul>
              <Socials className="mt-8" />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2 sm:gap-x-[30px] sm:gap-y-6">
              <div>
                <label htmlFor="fullName" className="sr-only">Full Name</label>
                <input
                  id="fullName"
                  autoComplete="name"
                  placeholder="Full Name"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  className={cn(fieldClass, "h-[60px]", errors.fullName && "border-destructive")}
                  {...register("fullName")}
                />
                <FieldError id="fullName-error" message={errors.fullName?.message} />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(fieldClass, "h-[60px]", errors.email && "border-destructive")}
                  {...register("email")}
                />
                <FieldError id="email-error" message={errors.email?.message} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  id="subject"
                  placeholder="Subject"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={cn(fieldClass, "h-[60px]", errors.subject && "border-destructive")}
                  {...register("subject")}
                />
                <FieldError id="subject-error" message={errors.subject?.message} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="sr-only">Project Details</label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Project Details"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(fieldClass, "resize-y py-4", errors.message && "border-destructive")}
                  {...register("message")}
                />
                <FieldError id="message-error" message={errors.message?.message} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" variant="hero" size="pill" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight />
                    </>
                  )}
                </Button>
                {sent ? (
                  <p role="status" className="mt-4 text-center text-sm text-success">
                    Message received — I'll get back to you soon.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
