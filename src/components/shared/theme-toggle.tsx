"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("portfolio-theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("portfolio-theme-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

function getServerSnapshot(): "dark" | "light" {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const root = document.documentElement;
    const isLight = root.classList.contains("light");
    const nextTheme = isLight ? "dark" : "light";
    localStorage.setItem("portfolio-theme", nextTheme);
    root.classList.remove("light", "dark");
    root.classList.add(nextTheme);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Toggle theme: Currently ${theme} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="text-foreground flex h-9 items-center gap-1.5 rounded-lg border border-black/15 bg-black/5 px-2.5 text-xs font-medium transition-all hover:bg-black/10 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/15"
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4 text-amber-400" />
          <span className="hidden font-mono text-xs text-amber-300 sm:inline">
            Theme
          </span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-sky-600" />
          <span className="hidden font-mono text-xs text-slate-700 sm:inline">
            Theme
          </span>
        </>
      )}
    </button>
  );
}
