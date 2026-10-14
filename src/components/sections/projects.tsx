import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="bg-muted/10 border-t border-black/5 py-24 dark:border-white/5"
    >
      <Container>
        <SectionHeading
          eyebrow="04 // FEATURED PROJECTS"
          title="Engineered Web Applications"
          description="Production-style full-stack architectures, real-time collaboration engines, and regional payment integrations."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={idx === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
