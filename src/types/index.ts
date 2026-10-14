export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // lucide-react icon name, e.g. "Github", "Linkedin", "Mail", "Phone"
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights: string[];
  images?: string[];
  image?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  startDate: string; // e.g. "2023-01"
  endDate?: string; // omit for "Present"
  summary: string;
  highlights?: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}
