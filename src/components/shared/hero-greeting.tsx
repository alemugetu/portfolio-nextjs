"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface HeroHeadingProps {
  className?: string;
}

const FULL_NAME = "Alemu Getu Adane";

export function HeroHeading({ className }: HeroHeadingProps) {
  const [, startTransition] = useTransition();
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Trigger typing effect on mount if reduced-motion is not preferred
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < FULL_NAME.length) {
          currentIndex++;
          const currentSub = FULL_NAME.slice(0, currentIndex);
          startTransition(() => {
            setDisplayText(currentSub);
          });
        } else {
          clearInterval(interval);
          startTransition(() => {
            setIsTyping(false);
            setHasCompleted(true);
          });
        }
      }, 55);

      return () => clearInterval(interval);
    }, 250);

    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  // Replay typewriter animation on user click
  const replayAnimation = useCallback(() => {
    if (prefersReducedMotion) return;
    setDisplayText("");
    setIsTyping(true);
    setHasCompleted(false);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < FULL_NAME.length) {
        currentIndex++;
        const currentSub = FULL_NAME.slice(0, currentIndex);
        startTransition(() => {
          setDisplayText(currentSub);
        });
      } else {
        clearInterval(interval);
        startTransition(() => {
          setIsTyping(false);
          setHasCompleted(true);
        });
      }
    }, 45);
  }, [prefersReducedMotion]);

  const showCompletedState = prefersReducedMotion || hasCompleted;

  return (
    <div
      className={cn("group/heading relative space-y-2 select-none", className)}
    >
      {/* Semantic H1 for SEO and Screen Readers */}
      <h1
        className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        aria-label="Hi, I'm Alemu Getu Adane"
      >
        {/* Animated Greeting Line */}
        <span className="text-foreground/90 mb-1 flex flex-wrap items-center gap-2 text-2xl font-bold tracking-normal sm:text-3xl lg:text-4xl">
          <span
            className="animate-wave inline-block text-3xl sm:text-4xl"
            role="img"
            aria-label="Waving hand"
          >
            👋
          </span>
          <span className="transition-colors duration-300 hover:text-emerald-500">
            Hi, I&apos;m
          </span>
        </span>

        {/* Name with Dynamic Typewriter, Shimmer Gradient & Interactive Letter Hover Physics */}
        <div
          onClick={replayAnimation}
          className="relative inline-flex cursor-pointer flex-wrap items-baseline transition-transform duration-200 active:scale-[0.99]"
          title="Click to replay name animation"
        >
          {/* Subtle Ambient Radial Glow on Complete */}
          {showCompletedState && (
            <div
              className="pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 opacity-0 blur-xl transition-opacity duration-700 group-hover/heading:opacity-100"
              aria-hidden="true"
            />
          )}

          {/* Letter Breakdown once typing completed (for individual interactive hover bounce) */}
          {showCompletedState ? (
            <span className="animate-gradient-shimmer relative z-10 inline-flex flex-wrap bg-gradient-to-r from-emerald-400 via-cyan-400 via-teal-300 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-xs">
              {FULL_NAME.split("").map((char, i) => (
                <span
                  key={i}
                  className={cn(
                    "inline-block transition-all duration-200 ease-out",
                    char === " "
                      ? "w-2.5 sm:w-3.5"
                      : "hover:-translate-y-2 hover:scale-110 hover:text-emerald-200"
                  )}
                  style={{
                    transitionDelay: `${i * 12}ms`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          ) : (
            <span className="relative z-10 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-xs">
              {displayText || FULL_NAME}
            </span>
          )}

          {/* Blinking Interactive Caret */}
          {!prefersReducedMotion && (
            <span
              className={cn(
                "ml-1 inline-block font-mono font-light text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]",
                isTyping
                  ? "animate-pulse opacity-100"
                  : hasCompleted
                    ? "animate-cursor-blink opacity-60 transition-opacity group-hover/heading:opacity-100"
                    : "opacity-0"
              )}
              aria-hidden="true"
            >
              |
            </span>
          )}
        </div>
      </h1>

      {/* Subtle Interactive Hint Pill on Complete */}
      {showCompletedState && (
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={replayAnimation}
            className="group/btn text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-black/5 px-2.5 py-0.5 font-mono text-[11px] font-medium transition-all hover:border-emerald-500/30 hover:bg-emerald-500/10 active:scale-95 dark:border-white/10 dark:bg-white/5"
            aria-label="Replay greeting text animation"
          >
            <RotateCcw className="h-3 w-3 text-emerald-500 transition-transform duration-500 group-hover/btn:-rotate-180" />
            <span>Interactive</span>
            <span className="text-[10px] opacity-70">
              • Hover letters or click to replay
            </span>
            <Sparkles className="h-2.5 w-2.5 text-cyan-400" />
          </button>
        </div>
      )}
    </div>
  );
}

// Export alias so existing imports remain fully compatible
export const HeroGreeting = HeroHeading;
