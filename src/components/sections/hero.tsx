import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  Download,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  MapPin,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card3DTilt } from "@/components/shared/card-3d-tilt";
import { HeroGreeting } from "@/components/shared/hero-greeting";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="accent-glow-subtle relative overflow-hidden border-b border-black/5 py-16 sm:py-24 lg:py-28 dark:border-white/5"
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Hero Copy (Left) */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>Available for Full-Stack Software Engineering Roles</span>
              </div>
            </div>

            {/* Interactive Translated Greeting & Name */}
            <HeroGreeting />

            <div>
              <p className="font-mono text-lg font-semibold text-emerald-600 sm:text-xl dark:text-emerald-400">
                Junior Full-Stack Developer
              </p>
            </div>

            <div>
              <p className="text-foreground/80 max-w-xl text-base leading-relaxed sm:text-lg">
                4th-year Computer Science student at the University of Gondar
                with hands-on experience engineering production-style web
                applications. Passionate about scalable architectures, local
                payment integrations, and high-integrity user experiences.
              </p>
            </div>

            {/* Location & Quick Meta */}
            <div>
              <div className="text-foreground/60 flex flex-wrap items-center gap-4 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{siteConfig.location} (UTC+3)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                  <span>
                    React 19 • Next.js • Django • Node • PostgreSQL • MySQL
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="#projects"
                  className="bg-foreground text-background inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
                >
                  <span>Explore Projects</span>
                  <ArrowDown className="h-4 w-4" />
                </Link>

                <a
                  href={siteConfig.resumeUrl}
                  download="Alemu_Getu_Adane_Resume.pdf"
                  className="text-foreground inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/15 px-5 text-sm font-semibold transition-all hover:scale-[1.02] hover:bg-black/5 active:scale-[0.98] dark:border-white/15 dark:hover:bg-white/5"
                >
                  <Download className="h-4 w-4 text-emerald-500" />
                  <span>Download Resume</span>
                </a>

                <Link
                  href="#contact"
                  className="text-foreground/75 hover:text-foreground inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-transparent px-4 text-sm font-semibold transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-foreground/60 flex items-center gap-4 pt-2">
                <span className="font-mono text-xs">Connect:</span>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground rounded-lg p-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground rounded-lg p-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="hover:text-foreground rounded-lg p-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  aria-label="Send Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Photo with Interactive 3D Motion Design (Right) */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              {/* 3D Orbital Rings in Perspective Background */}
              <div
                className="pointer-events-none absolute -inset-6 flex items-center justify-center opacity-60 dark:opacity-40"
                aria-hidden="true"
              >
                <div className="animate-spin-slow h-72 w-72 rounded-full border border-dashed border-emerald-500/30" />
                <div className="animate-spin-slow absolute h-96 w-96 rounded-full border border-dotted border-cyan-500/20 [animation-direction:reverse]" />
              </div>

              {/* Glowing Dynamic Ambient Aura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/30 opacity-75 blur-2xl transition-all duration-700 hover:opacity-100" />

              {/* 3D Tilt Card */}
              <Card3DTilt
                maxTilt={12}
                glare={true}
                ambientFloat={true}
                className="relative z-10 w-full"
              >
                <div
                  className="bg-card relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-black/10 shadow-2xl backdrop-blur-xl dark:border-white/20"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Photo Layer */}
                  <Image
                    src={siteConfig.ogImage}
                    alt="Alemu Getu Adane - Junior Full-Stack Developer"
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 384px"
                    className="object-cover object-top transition-transform duration-500 ease-out"
                    style={{ transform: "translateZ(10px)" }}
                  />

                  {/* Gradient Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Floating 3D Badge: Top Right Chip */}
                  <div
                    className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[11px] font-medium text-emerald-300 shadow-xl backdrop-blur-md"
                    style={{ transform: "translateZ(32px)" }}
                  >
                    <Terminal className="h-3 w-3 text-emerald-400" />
                    <span>Full-Stack</span>
                  </div>

                  {/* Floating 3D Status Card: Bottom */}
                  <div
                    className="absolute right-4 bottom-4 left-4 z-20 rounded-2xl border border-white/20 bg-slate-950/75 p-3.5 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 hover:border-emerald-500/40"
                    style={{ transform: "translateZ(38px)" }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold tracking-tight text-white">
                        {siteConfig.author.name}
                      </p>
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                    </div>
                    <p className="mt-0.5 font-mono text-[11px] text-emerald-400">
                      Junior Full-Stack Developer
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-white/70">
                      React 19 • Next.js • Django • PostgreSQL
                    </p>
                  </div>
                </div>
              </Card3DTilt>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
