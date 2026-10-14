import type { SocialLink } from "@/types";
import { siteConfig } from "@/config/site";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.links.github, icon: "Github" },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: "Linkedin" },
  { label: "Email", href: `mailto:${siteConfig.author.email}`, icon: "Mail" },
  {
    label: "Phone",
    href: `tel:${siteConfig.author.phone.replace(/\s+/g, "")}`,
    icon: "Phone",
  },
];
