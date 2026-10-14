import Link from "next/link";
import {
  Briefcase,
  ArrowRight,
  Download,
  Calendar,
  Building2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { experience } from "@/data/experience";
import { siteConfig } from "@/config/site";

export function ExperienceSection() {
  const hasCorporateExperience = experience.length > 0;

  return (
    <section
      id="experience"
      className="border-t border-black/5 py-24 dark:border-white/5"
    >
      <Container>
        <SectionHeading
          eyebrow="03 // EXPERIENCE & BACKGROUND"
          title="Work History & Engineering Journey"
          description={
            hasCorporateExperience
              ? "Timeline of professional software engineering roles, responsibilities, and achievements."
              : "Academic software engineering track and practical project development background."
          }
        />

        {hasCorporateExperience ? (
          <div className="relative ml-4 space-y-12 border-l border-emerald-500/30 pl-6">
            {experience.map((item, idx) => (
              <div key={idx} className="relative">
                <span className="ring-background absolute top-1.5 -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-4" />
                <div className="bg-card rounded-2xl border border-black/10 p-6 shadow-xs dark:border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-foreground text-lg font-bold">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        <Building2 className="h-4 w-4" />
                        <span>{item.company}</span>
                      </div>
                    </div>
                    <div className="text-foreground/60 flex items-center gap-1.5 font-mono text-xs">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {item.startDate} — {item.endDate || "Present"}
                      </span>
                    </div>
                  </div>
                  <p className="text-foreground/80 mt-3 text-sm">
                    {item.summary}
                  </p>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="text-foreground/70 mt-4 list-inside list-disc space-y-1 text-xs">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="from-card via-card rounded-2xl border border-emerald-500/20 bg-gradient-to-br to-emerald-500/5 p-8 shadow-xs">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Project-Driven Engineering & Degree Track</span>
                  </div>
                  <h3 className="text-foreground text-xl font-bold sm:text-2xl">
                    Seeking Junior Full-Stack Developer Roles
                  </h3>
                  <p className="text-foreground/75 text-sm leading-relaxed">
                    As a 4th-year Computer Science student at the University of
                    Gondar, my experience has been centered on building
                    production-style, real-world systems — such as{" "}
                    <strong className="text-foreground">Store.ethio</strong>{" "}
                    (e-commerce with dual Chapa & Stripe gateways and inventory
                    concurrency locking) and{" "}
                    <strong className="text-foreground">PulseDesk</strong>{" "}
                    (multi-tenant incident escalation with WebSockets and
                    Celery).
                  </p>
                  <p className="text-foreground/60 font-mono text-xs">
                    Ready to bring full-stack TypeScript, React, Python/Django,
                    and PostgreSQL expertise to an engineering team.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
                  <Link
                    href="#projects"
                    className="bg-foreground text-background inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold transition-all hover:opacity-90"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href={siteConfig.resumeUrl}
                    download="Alemu_Getu_Adane_Resume.md"
                    className="text-foreground inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <Download className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
