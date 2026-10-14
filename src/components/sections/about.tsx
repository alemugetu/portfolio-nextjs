import {
  GraduationCap,
  MapPin,
  Globe2,
  Code,
  Terminal,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card3DTilt } from "@/components/shared/card-3d-tilt";
import { siteConfig } from "@/config/site";
import { languages } from "@/data/education";

export function AboutSection() {
  const highlights = [
    {
      title: "Full-Stack System Design",
      desc: "Architecting end-to-end applications from responsive React frontends to robust Django/Node.js RESTful backends.",
      icon: Terminal,
    },
    {
      title: "Fintech & Payments Integration",
      desc: "Proven integration with Ethiopia's Chapa gateway and Stripe, incorporating server-to-server webhooks and race-condition safety.",
      icon: Code,
    },
    {
      title: "Real-Time Telemetry & WebSockets",
      desc: "Building multi-tenant escalation workflows with Django Channels, Celery tasks, and Redis event streams.",
      icon: CheckCircle,
    },
  ];

  return (
    <section
      id="about"
      className="border-t border-black/5 py-24 dark:border-white/5"
    >
      <Container>
        <SectionHeading
          eyebrow="01 // ABOUT ME"
          title="Engineering Solutions for Real-World Problems"
          description="A look into my academic background, technical focus, and engineering philosophy."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Biography */}
          <div className="space-y-6 lg:col-span-7">
            <div className="text-foreground/80 space-y-4 text-base leading-relaxed sm:text-lg">
              <p>
                I am a 4th-year Computer Science student at the{" "}
                <strong className="text-foreground font-semibold">
                  University of Gondar
                </strong>{" "}
                and a junior full-stack developer with hands-on experience
                engineering production-style web platforms.
              </p>
              <p>
                My engineering journey focuses on the intersection of intuitive
                interfaces and resilient back-end systems. Whether solving
                regional checkout friction with Ethiopia&apos;s Chapa gateway or
                orchestrating incident escalation with WebSockets and Celery, I
                prioritize data integrity, clean APIs, and maintainable
                codebases.
              </p>
              <p>
                I thrive when turning complex real-world requirements into
                streamlined, user-focused software solutions.
              </p>
            </div>

            {/* Core Capability Cards */}
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-card space-y-2 rounded-xl border border-black/10 p-4 transition-all hover:border-emerald-500/30 hover:shadow-xs dark:border-white/10"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-foreground text-xs font-bold sm:text-sm">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Facts Sidebar with 3D Tilt Motion */}
          <div className="lg:col-span-5">
            <Card3DTilt
              maxTilt={7}
              glare={true}
              ambientFloat={true}
              className="rounded-2xl"
            >
              <div
                className="bg-card space-y-6 rounded-2xl border border-black/10 p-6 shadow-xl backdrop-blur-md dark:border-white/10"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="flex items-center justify-between border-b border-black/5 pb-3 dark:border-white/5"
                  style={{ transform: "translateZ(18px)" }}
                >
                  <h3 className="text-foreground text-base font-bold">
                    Quick Facts & Credentials
                  </h3>
                  <Sparkles className="h-4 w-4 animate-pulse text-emerald-500/80" />
                </div>

                <div
                  className="space-y-4 text-sm"
                  style={{ transform: "translateZ(22px)" }}
                >
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                      <p className="text-foreground font-semibold">
                        BSc in Computer Science
                      </p>
                      <p className="text-foreground/70 text-xs">
                        University of Gondar • 2023 – 2027 (Expected)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-500" />
                    <div>
                      <p className="text-foreground font-semibold">
                        Location & Timezone
                      </p>
                      <p className="text-foreground/70 text-xs">
                        {siteConfig.location} (East Africa Time, UTC+3)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                      <p className="text-foreground font-semibold">Languages</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {languages.map((lang) => (
                          <span
                            key={lang.language}
                            className="bg-muted text-foreground/80 inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs"
                          >
                            {lang.language} — {lang.proficiency}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Current Availability Box with 3D Depth Elevation (No internship text) */}
                  <div
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-800 shadow-md transition-all hover:border-emerald-500/50 dark:text-emerald-300"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                      </span>
                      <p className="font-semibold">Current Availability:</p>
                    </div>
                    <p className="mt-1.5 leading-relaxed">
                      Actively seeking full-time junior full-stack developer
                      roles, software engineering positions, and impactful
                      career opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          </div>
        </div>
      </Container>
    </section>
  );
}
