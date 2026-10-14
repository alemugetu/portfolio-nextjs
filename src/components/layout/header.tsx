"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress and active section tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Track current active section
      const sectionIds = mainNav.map((n) => n.href.replace("#", ""));
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = id;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="bg-background/80 sticky top-0 z-40 w-full border-b border-black/5 backdrop-blur-md transition-colors dark:border-white/10">
        {/* Scroll Progress Indicator */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-emerald-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />

        <Container className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group text-foreground flex items-center gap-2 text-sm font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
              AG
            </span>
            <span className="text-foreground font-semibold">
              {siteConfig.author.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="bg-muted/40 hidden items-center gap-1 rounded-full border border-black/5 p-1 text-sm font-medium md:flex dark:border-white/10"
            aria-label="Main Navigation"
          >
            {mainNav.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs transition-all duration-200",
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-xs"
                      : "text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle + Resume Download */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <a
              href={siteConfig.resumeUrl}
              download="Alemu_Getu_Adane_Resume.md"
              className="hidden items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-700 hover:shadow-emerald-500/20 active:scale-95 sm:inline-flex dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 transition-colors hover:bg-black/5 md:hidden dark:border-white/10 dark:hover:bg-white/5"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </Container>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="bg-background/95 animate-in fade-in slide-in-from-top-4 fixed inset-x-0 top-16 z-50 border-b border-black/10 p-6 shadow-2xl backdrop-blur-xl duration-200 md:hidden dark:border-white/10"
          >
            <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="text-foreground/40 h-4 w-4" />
                </Link>
              ))}

              <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
                <a
                  href={siteConfig.resumeUrl}
                  download="Alemu_Getu_Adane_Resume.md"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md dark:bg-emerald-500 dark:text-slate-950"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume (Markdown)</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
