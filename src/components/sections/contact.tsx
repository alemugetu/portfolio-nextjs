"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/config/site";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botField: "", // honeypot
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", botField: "" });
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong. Please email directly.");
      }
    }
  };

  return (
    <section
      id="contact"
      className="bg-muted/10 border-t border-black/5 py-24 dark:border-white/5"
    >
      <Container>
        <SectionHeading
          eyebrow="06 // GET IN TOUCH"
          title="Let's Build Something Together"
          description="Have an opening, a full-stack project idea, or a question? Send me a message or connect directly."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Direct Contact Details */}
          <div className="space-y-6 lg:col-span-5">
            <div className="bg-card space-y-6 rounded-2xl border border-black/10 p-6 shadow-xs sm:p-8 dark:border-white/10">
              <div>
                <h3 className="text-foreground text-xl font-bold">
                  Contact Details
                </h3>
                <p className="text-foreground/70 mt-1 text-sm">
                  Feel free to reach out via email, phone, or direct inquiry.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="bg-muted/30 group flex items-center gap-3.5 rounded-xl border border-black/5 p-3.5 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:border-white/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-110 dark:text-emerald-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground/50 font-mono text-xs">
                      Email
                    </p>
                    <p className="text-foreground font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {siteConfig.author.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.author.phone.replace(/\s+/g, "")}`}
                  className="bg-muted/30 group flex items-center gap-3.5 rounded-xl border border-black/5 p-3.5 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:border-white/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-transform group-hover:scale-110 dark:text-emerald-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground/50 font-mono text-xs">
                      Phone / WhatsApp
                    </p>
                    <p className="text-foreground font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {siteConfig.author.phone}
                    </p>
                  </div>
                </a>

                <div className="bg-muted/30 flex items-center gap-3.5 rounded-xl border border-black/5 p-3.5 dark:border-white/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground/50 font-mono text-xs">
                      Location
                    </p>
                    <p className="text-foreground font-semibold">
                      {siteConfig.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 text-foreground/70 rounded-xl border border-black/5 p-4 text-xs dark:border-white/5">
                <p className="text-foreground font-semibold">
                  Response Expectation
                </p>
                <p className="mt-1">
                  I typically respond within 24 hours. For urgent inquiries,
                  reach out via direct phone or WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-2xl border border-black/10 p-6 shadow-xs sm:p-8 dark:border-white/10">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot field for bot suppression */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="botField">Leave this blank</label>
                  <input
                    type="text"
                    id="botField"
                    name="botField"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.botField}
                    onChange={(e) =>
                      setFormData({ ...formData, botField: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-foreground/80 block font-mono text-xs font-semibold tracking-wider uppercase"
                  >
                    Your Name <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={status === "loading"}
                    className="bg-background text-foreground placeholder:text-foreground/40 w-full rounded-xl border border-black/15 px-4 py-3 text-sm transition-colors focus:border-emerald-500 focus:outline-hidden dark:border-white/15"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-foreground/80 block font-mono text-xs font-semibold tracking-wider uppercase"
                  >
                    Email Address <span className="text-emerald-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={status === "loading"}
                    className="bg-background text-foreground placeholder:text-foreground/40 w-full rounded-xl border border-black/15 px-4 py-3 text-sm transition-colors focus:border-emerald-500 focus:outline-hidden dark:border-white/15"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-foreground/80 block font-mono text-xs font-semibold tracking-wider uppercase"
                  >
                    Your Message <span className="text-emerald-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell me about your project, team opening, or idea..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    disabled={status === "loading"}
                    className="bg-background text-foreground placeholder:text-foreground/40 w-full resize-y rounded-xl border border-black/15 px-4 py-3 text-sm transition-colors focus:border-emerald-500 focus:outline-hidden dark:border-white/15"
                  />
                </div>

                {/* Feedback Alerts */}
                {status === "success" && (
                  <div
                    role="alert"
                    className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-800 dark:text-emerald-300"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    <p>Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex flex-col gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-800 dark:text-rose-300"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
                      <p>{errorMessage}</p>
                    </div>
                    <a
                      href={`mailto:${siteConfig.author.email}?subject=Contact%20Inquiry&body=${encodeURIComponent(
                        formData.message
                      )}`}
                      className="mt-1 inline-flex text-xs font-semibold underline"
                    >
                      Click here to send directly via mail client
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-foreground text-background inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:scale-[1.01] hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
