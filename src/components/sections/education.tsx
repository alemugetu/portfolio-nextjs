import {
  GraduationCap,
  Languages,
  Calendar,
  MapPin,
  Award,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { education, languages } from "@/data/education";

export function EducationSection() {
  return (
    <section
      id="education"
      className="border-t border-black/5 py-24 dark:border-white/5"
    >
      <Container>
        <SectionHeading
          eyebrow="05 // EDUCATION & LANGUAGES"
          title="Academic Degree & Communication"
          description="Formal university education in Computer Science and spoken language proficiencies."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Degree Card */}
          <div className="md:col-span-7">
            <div className="bg-card flex h-full flex-col justify-between rounded-2xl border border-black/10 p-6 shadow-xs sm:p-8 dark:border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    4th Year Undergrad
                  </span>
                </div>

                {education.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-foreground text-xl font-bold sm:text-2xl">
                      {item.degree}
                    </h3>
                    <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.institution}
                    </p>

                    <div className="text-foreground/60 flex flex-wrap items-center gap-4 pt-1 font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="text-foreground/50 h-3.5 w-3.5" />
                        <span>{item.location}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="text-foreground/50 h-3.5 w-3.5" />
                        <span>
                          {item.startDate} – {item.endDate}
                        </span>
                      </div>
                    </div>

                    {item.notes && (
                      <p className="text-foreground/75 pt-2 text-sm leading-relaxed">
                        {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-foreground/60 mt-6 flex items-center gap-2 border-t border-black/5 pt-4 text-xs dark:border-white/5">
                <Award className="h-4 w-4 text-amber-500" />
                <span>
                  Comprehensive coursework in algorithms, operating systems, and
                  distributed web platforms
                </span>
              </div>
            </div>
          </div>

          {/* Languages Card */}
          <div className="md:col-span-5">
            <div className="bg-card flex h-full flex-col justify-between rounded-2xl border border-black/10 p-6 shadow-xs sm:p-8 dark:border-white/10">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Languages className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-foreground text-xl font-bold">
                    Languages
                  </h3>
                  <p className="text-foreground/70 mt-1 text-sm">
                    Spoken and written language fluency for international
                    teamwork.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {languages.map((item) => (
                    <div
                      key={item.language}
                      className="bg-muted/40 flex items-center justify-between rounded-xl border border-black/5 p-3.5 dark:border-white/10"
                    >
                      <span className="text-foreground text-sm font-semibold">
                        {item.language}
                      </span>
                      <span className="bg-foreground/10 text-foreground rounded-md px-2.5 py-1 font-mono text-xs font-medium">
                        {item.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-foreground/50 mt-6 font-mono text-xs">
                Ready for cross-functional English-speaking and local Amharic
                collaboration.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
