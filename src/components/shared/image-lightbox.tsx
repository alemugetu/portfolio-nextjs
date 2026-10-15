"use client";

import { useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  projectTitle: string;
}

// Client-safe mounting subscriber for React 19 / Next.js SSR
function subscribe() {
  return () => {};
}

export function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  projectTitle,
}: ImageLightboxProps) {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    onIndexChange(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, images.length, onIndexChange]);

  // Keyboard navigation: Escape to close, Arrows to cycle
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isMounted || !isOpen || images.length === 0) {
    return null;
  }

  const safeIndex = Math.max(0, Math.min(images.length - 1, currentIndex));
  const currentImage = images[safeIndex];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} fullscreen image viewer`}
      className="animate-in fade-in fixed inset-0 z-[100] flex flex-col justify-between bg-black/92 p-3 backdrop-blur-xl duration-200 select-none sm:p-6"
      onClick={(e) => {
        // Close if clicked directly on outer container (outside image and buttons)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Bar: Title, Counter & Action Controls */}
      <div className="relative z-20 flex items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-3 truncate">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <h4 className="truncate text-sm font-semibold text-white sm:text-base">
            {projectTitle}
          </h4>
          <span className="shrink-0 rounded-md border border-white/15 bg-white/10 px-2 py-0.5 font-mono text-xs text-white/80">
            {safeIndex + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Open Raw Image in New Tab */}
          <a
            href={currentImage}
            target="_blank"
            rel="noopener noreferrer"
            title="Open original image in new tab"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/80 transition-all hover:bg-white/20 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            title="Close viewer (Esc)"
            className="group flex h-9 items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 text-xs font-semibold text-white transition-all hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-300"
          >
            <X className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Close</span>
            <span className="font-mono text-[10px] text-white/50">[Esc]</span>
          </button>
        </div>
      </div>

      {/* Main Image Stage (100% Uncropped Full View) */}
      <div className="relative my-auto flex h-full max-h-[76vh] w-full items-center justify-center overflow-hidden py-2">
        <div className="relative h-full w-full max-w-6xl">
          <Image
            key={currentImage}
            src={currentImage}
            alt={`${projectTitle} - screenshot ${safeIndex + 1}`}
            fill
            sizes="100vw"
            priority
            className="animate-in fade-in zoom-in-95 object-contain transition-transform duration-300"
          />
        </div>

        {/* Previous Image Arrow */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous screenshot"
            className="absolute top-1/2 left-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:bg-black/90 active:scale-95 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Next Image Arrow */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next screenshot"
            className="absolute top-1/2 right-2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:bg-black/90 active:scale-95 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip for Multi-Image Projects */}
      {images.length > 1 && (
        <div className="relative z-20 flex w-full flex-col items-center gap-2 border-t border-white/10 pt-3">
          <div className="flex max-w-full scrollbar-none items-center gap-2 overflow-x-auto px-2 py-1">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => onIndexChange(i)}
                className={cn(
                  "relative h-12 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all sm:h-14 sm:w-24",
                  i === safeIndex
                    ? "scale-105 border-emerald-400 shadow-md shadow-emerald-500/20"
                    : "border-white/20 opacity-50 hover:border-white/50 hover:opacity-100"
                )}
                aria-label={`Jump to screenshot ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <p className="hidden font-mono text-[11px] text-white/50 sm:block">
            Use <kbd className="rounded bg-white/10 px-1 py-0.5">←</kbd> and{" "}
            <kbd className="rounded bg-white/10 px-1 py-0.5">→</kbd> keys to
            browse • Click anywhere outside to close
          </p>
        </div>
      )}
    </div>,
    document.body
  );
}
