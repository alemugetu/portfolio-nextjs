"use client";

import { useState, useEffect, useCallback } from "react";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

interface Greeting {
  prefix: string;
  lang: string;
  nativeName: string;
  pronunciation?: string;
  flag: string;
}

const greetings: Greeting[] = [
  { prefix: "Hi, I'm", lang: "English", nativeName: "English", flag: "🇺🇸" },
  {
    prefix: "ሰላም, እኔ",
    lang: "Amharic (Native)",
    nativeName: "አማርኛ",
    pronunciation: "Selam, ene",
    flag: "🇪🇹",
  },
  { prefix: "Hello, I'm", lang: "English", nativeName: "English", flag: "🌐" },
  {
    prefix: "እንኳን ደህና መጡ, እኔ",
    lang: "Amharic",
    nativeName: "አማርኛ",
    pronunciation: "Enkwan dehna metu",
    flag: "🇪🇹",
  },
  {
    prefix: "Bonjour, je suis",
    lang: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  { prefix: "Hola, soy", lang: "Spanish", nativeName: "Español", flag: "🇪🇸" },
];

export function HeroGreeting() {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const current = greetings[index];

  const nextGreeting = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
      setIsFading(false);
    }, 220);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextGreeting();
    }, 3200);
    return () => clearInterval(interval);
  }, [nextGreeting, isPaused]);

  return (
    <div className="space-y-3">
      {/* Interactive Translation Controller Badge */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={nextGreeting}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="group bg-muted/60 text-foreground/80 hover:text-foreground inline-flex items-center gap-2 rounded-full border border-black/10 px-3.5 py-1 font-mono text-xs shadow-xs transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 active:scale-95 dark:border-white/10"
          title="Click to cycle translation languages"
          aria-label={`Greeting translation: ${current.lang}. Click to translate`}
        >
          <Languages className="h-3.5 w-3.5 text-emerald-500 transition-transform duration-500 group-hover:rotate-180" />
          <span className="text-foreground font-semibold">
            {current.flag} {current.lang}
          </span>
          {current.pronunciation && (
            <span className="text-foreground/60 text-[11px] italic">
              ({current.pronunciation})
            </span>
          )}
          <span className="ml-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
            Translate ↻
          </span>
        </button>
      </div>

      {/* Main Heading with Animated Prefix & Gradient Name */}
      <h1 className="text-foreground min-h-[1.25em] text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        <span
          onClick={nextGreeting}
          className={cn(
            "inline-block cursor-pointer transition-all duration-300 select-none hover:text-emerald-500",
            isFading
              ? "-translate-y-2 scale-95 opacity-0 blur-xs"
              : "translate-y-0 scale-100 opacity-100 blur-none"
          )}
          title="Click to translate greeting"
        >
          {current.prefix}
        </span>{" "}
        <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-xs">
          Alemu Getu Adane
        </span>
      </h1>
    </div>
  );
}
