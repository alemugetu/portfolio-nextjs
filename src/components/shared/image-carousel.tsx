"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import styles from "./image-carousel.module.css";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images?: string[];
  projectTitle: string;
  projectSlug?: string;
  priority?: boolean;
}

export function ImageCarousel({
  images = [],
  projectTitle,
  projectSlug = "project",
  priority = false,
}: ImageCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasMoved = useRef(false);

  // Synchronize active index on scroll
  const handleScroll = useCallback(() => {
    if (!scrollerRef.current || isDragging.current) return;
    const scroller = scrollerRef.current;
    const width = scroller.clientWidth;
    if (width > 0) {
      const idx = Math.round(scroller.scrollLeft / width);
      const clamped = Math.max(0, Math.min(images.length - 1, idx));
      setActiveIndex(clamped);
    }
  }, [images.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Navigate to slide using native scrollIntoView and fallback scrollTo
  const goToSlide = (idx: number) => {
    const targetIdx = Math.max(0, Math.min(images.length - 1, idx));
    setActiveIndex(targetIdx);

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const targetSlide = document.getElementById(
      `${projectSlug}-slide-${targetIdx}`
    );
    if (targetSlide) {
      targetSlide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    } else {
      scroller.scrollTo({
        left: targetIdx * scroller.clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Mouse drag handlers for desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollerRef.current || images.length <= 1) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX;
    startScrollLeft.current = scrollerRef.current.scrollLeft;
    scrollerRef.current.style.scrollSnapType = "none";
    scrollerRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollerRef.current) return;
    const dx = e.pageX - startX.current;
    if (Math.abs(dx) > 4) {
      hasMoved.current = true;
      scrollerRef.current.scrollLeft = startScrollLeft.current - dx;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current || !scrollerRef.current) return;
    isDragging.current = false;
    scrollerRef.current.style.scrollSnapType = "x mandatory";
    scrollerRef.current.style.scrollBehavior = "smooth";

    if (hasMoved.current) {
      const width = scrollerRef.current.clientWidth;
      if (width > 0) {
        const nextIdx = Math.round(scrollerRef.current.scrollLeft / width);
        goToSlide(nextIdx);
      }
    }
  };

  // 1. Fallback for projects with no screenshots
  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          styles.carouselRoot,
          "border-foreground/15 flex aspect-[16/10] w-full flex-col items-center justify-center border border-dashed p-6 text-center"
        )}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Layers className="h-6 w-6" />
        </div>
        <p className="text-foreground text-sm font-semibold">{projectTitle}</p>
        <p className="text-foreground/50 mt-1 text-xs">
          Full-stack software architecture
        </p>
      </div>
    );
  }

  // 2. Single image: render cleanly without carousel controls
  if (images.length === 1) {
    return (
      <div className={styles.carouselRoot}>
        <div className={styles.slide}>
          <Image
            src={images[0]}
            alt={`${projectTitle} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            priority={priority}
            className={styles.slideImage}
          />
        </div>
      </div>
    );
  }

  // 3. Multi-image carousel with pure CSS scroll-snap baseline & interactive controls
  return (
    <div className={cn(styles.carouselRoot, "group relative")}>
      {/* Scrollable Container with Pure CSS Scroll Snap & Mouse Drag */}
      <div
        ref={scrollerRef}
        className={styles.scroller}
        tabIndex={0}
        role="region"
        aria-label={`Screenshots of ${projectTitle}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goToSlide(activeIndex - 1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goToSlide(activeIndex + 1);
          }
        }}
      >
        {images.map((src, index) => (
          <div
            key={src}
            id={`${projectSlug}-slide-${index}`}
            className={styles.slide}
          >
            <Image
              src={src}
              alt={`${projectTitle} screenshot ${index + 1} of ${images.length}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              priority={priority && index === 0}
              loading={priority && index === 0 ? "eager" : "lazy"}
              className={styles.slideImage}
            />
          </div>
        ))}
      </div>

      {/* Prev Button - Always visible, dimmed when at beginning */}
      <button
        type="button"
        onClick={() => goToSlide(activeIndex - 1)}
        disabled={activeIndex === 0}
        aria-label="Previous screenshot"
        className={cn(
          "absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/85 text-white shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-95",
          activeIndex === 0
            ? "cursor-not-allowed opacity-30"
            : "opacity-90 hover:opacity-100"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next Button - Always visible, dimmed when at end */}
      <button
        type="button"
        onClick={() => goToSlide(activeIndex + 1)}
        disabled={activeIndex === images.length - 1}
        aria-label="Next screenshot"
        className={cn(
          "absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/85 text-white shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-95",
          activeIndex === images.length - 1
            ? "cursor-not-allowed opacity-30"
            : "opacity-90 hover:opacity-100"
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Pagination Dots */}
      <div
        className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-950/80 px-3.5 py-1.5 shadow-lg backdrop-blur-md"
        role="tablist"
        aria-label="Screenshots pagination"
      >
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goToSlide(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-6 bg-emerald-400 shadow-xs"
                : "w-2 bg-white/40 hover:bg-white/80"
            )}
          />
        ))}
      </div>

      {/* Counter Badge */}
      <div className="absolute top-3 right-3 z-20 rounded-md bg-slate-950/80 px-2.5 py-1 font-mono text-xs font-semibold text-white shadow-md backdrop-blur-md">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
