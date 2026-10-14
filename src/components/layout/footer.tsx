"use client";

import { ArrowUp, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/data/social";

const iconMap = {
  Github,
  Linkedin,
  Mail,
  Phone,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-muted/20 border-t border-black/5 py-12 transition-colors dark:border-white/10">
      <Container className="space-y-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-foreground text-base font-bold tracking-tight">
              {siteConfig.author.name}
            </p>
            <p className="text-foreground/60 text-xs">
              Junior Full-Stack Developer • {siteConfig.location}
            </p>
          </div>

          {/* Social Links with Accessible Icons */}
          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Mail;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-foreground/80 hover:text-foreground flex h-10 items-center gap-2 rounded-lg border border-black/10 px-3.5 text-xs font-medium transition-all hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                  aria-label={item.label}
                >
                  <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="text-foreground/60 flex flex-col-reverse items-start justify-between gap-4 border-t border-black/5 pt-8 text-xs sm:flex-row sm:items-center dark:border-white/5">
          <p>
            © {currentYear} {siteConfig.author.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="text-foreground/75 hover:text-foreground inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium transition-all hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
