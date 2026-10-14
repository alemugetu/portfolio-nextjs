import { ExternalLink, Github, CheckCircle2 } from "lucide-react";
import type { Project } from "@/types";
import { ImageCarousel } from "@/components/shared/image-carousel";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group bg-card relative flex flex-col justify-between rounded-2xl border border-black/10 p-6 shadow-xs transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl dark:border-white/10 dark:hover:border-emerald-500/30",
        project.featured && "lg:col-span-2"
      )}
    >
      <div className="space-y-5">
        {/* Project Image Carousel */}
        <ImageCarousel
          images={project.images}
          projectTitle={project.title}
          projectSlug={project.slug}
          priority={priority}
        />

        {/* Card Header & Badges */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
                {project.title}
              </h3>
              {project.featured && (
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Featured
                </span>
              )}
            </div>
            {project.subtitle && (
              <span className="text-foreground/50 font-mono text-xs">
                {project.subtitle}
              </span>
            )}
          </div>

          <p className="text-foreground/80 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Architectural Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="text-foreground/75 space-y-2 border-t border-black/5 pt-4 text-xs sm:text-sm dark:border-white/5">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer: Tags and Action Links */}
      <div className="mt-6 space-y-4 border-t border-black/5 pt-4 dark:border-white/5">
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-muted text-foreground/80 rounded-md border border-black/5 px-2.5 py-1 font-mono text-xs dark:border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* External Links */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-foreground text-background inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Platform</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold transition-all hover:scale-[1.02] hover:bg-black/5 active:scale-[0.98] dark:border-white/15 dark:hover:bg-white/5"
            >
              <Github className="h-3.5 w-3.5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
