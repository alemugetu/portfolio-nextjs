import { Code2, Layout, Server, Database, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { skills } from "@/data/skills";

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Languages: Code2,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  "Tools & Platforms": Wrench,
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="bg-muted/15 border-t border-black/5 py-24 dark:border-white/5"
    >
      <Container>
        <SectionHeading
          eyebrow="02 // TECHNICAL SKILLS"
          title="Stack & Capabilities"
          description="Technologies, frameworks, and database architectures verified through production-style software development."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => {
            const Icon = categoryIcons[group.category] || Code2;
            return (
              <div
                key={group.category}
                className="bg-card flex flex-col justify-between rounded-2xl border border-black/10 p-6 shadow-xs transition-all hover:border-emerald-500/40 hover:shadow-md dark:border-white/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-foreground text-base font-bold">
                      {group.category}
                    </h3>
                  </div>

                  <ul
                    className="flex flex-wrap gap-2 pt-2"
                    aria-label={`${group.category} skills`}
                  >
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className="bg-muted/60 text-foreground rounded-lg border border-black/5 px-3 py-1.5 font-mono text-xs font-medium transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/5 dark:border-white/10"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
