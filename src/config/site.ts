export const siteConfig = {
  name: "Alemu Getu Adane",
  title: "Alemu Getu Adane — Junior Full-Stack Developer",
  description:
    "Portfolio of Alemu Getu Adane: Junior Full-Stack Developer & 4th-year Computer Science student at University of Gondar building real-world web applications with React, Next.js, Django, Node.js, and PostgreSQL.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://alemugetu.vercel.app",
  ogImage: "/images/profile/me.jpeg",
  resumeUrl: "/resume/Alemu_Getu_Adane_Resume.md",
  location: "Gondar, Ethiopia",
  author: {
    name: "Alemu Getu Adane",
    email: "alemugetu78@gmail.com",
    phone: "+251 984948785",
  },
  links: {
    github: "https://github.com/alemugetu",
    linkedin: "https://www.linkedin.com/in/alemu-getu/",
    twitter: "https://github.com/alemugetu",
  },
  features: {
    threeD: false, // Flag for optional 3D hero scene
  },
} as const;
