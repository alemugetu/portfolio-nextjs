import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "store-ethio",
    title: "STORE.ETHIO",
    subtitle: "Full-Stack E-Commerce Marketplace Platform",
    description:
      "A production-ready e-commerce marketplace enabling hierarchical product browsing, cart & wishlist management, dual checkout (Chapa & Stripe), live order tracking, and role-based admin controls.",
    highlights: [
      "Built a production-ready, full-stack e-commerce marketplace enabling hierarchical product browsing, cart and wishlist management, secure checkout, live order tracking, and self-service user profiles.",
      "Designed role-based admin dashboards for managing products, inventory, categories, and financial transaction reviews.",
      "Solved local checkout friction by integrating Ethiopia's Chapa payment gateway (mobile money & bank transfers) alongside Stripe, using server-to-server webhook verification and race-condition-protected inventory fulfillment with PostgreSQL's select_for_update().",
    ],
    images: [
      "/images/projects/Ecommerce/Store.ethio Marketplace Hero Banner.png",
      "/images/projects/Ecommerce/Pasted image.png",
      "/images/projects/Ecommerce/Pasted image (2).png",
      "/images/projects/Ecommerce/Pasted image (3).png",
      "/images/projects/Ecommerce/Pasted image (4).png",
      "/images/projects/Ecommerce/Pasted image (5).png",
    ],
    tags: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "Django 5",
      "Django REST Framework",
      "PostgreSQL",
      "Chapa API",
      "Stripe",
      "Cloudinary",
    ],
    repoUrl: "https://github.com/alemugetu/E-commerce",
    featured: true,
  },
  {
    slug: "pulsedesk",
    title: "PulseDesk",
    subtitle: "Multi-Tenant Incident & Escalation Operations Platform",
    description:
      "A multi-tenant incident management and escalation platform with organization-level RBAC, SLA policies, and real-time collaboration via WebSockets and Celery.",
    highlights: [
      "Developed a multi-tenant incident management platform allowing teams to create, assign, track, escalate, and resolve operational incidents end-to-end.",
      "Implemented organization-level role-based access control (RBAC), SLA management, escalation policies, real-time updates, and audit logging.",
      "Built real-time collaboration and notifications using Django Channels (WebSockets), Celery, and Redis, with API documentation via drf-spectacular (OpenAPI/Swagger).",
    ],
    images: [
      "/images/projects/Pulsedesk/Screenshot From 2026-09-15 16-16-39.png",
      "/images/projects/Pulsedesk/Pasted image.png",
      "/images/projects/Pulsedesk/Pasted image (2).png",
      "/images/projects/Pulsedesk/Pasted image (3).png",
      "/images/projects/Pulsedesk/Pasted image (4).png",
    ],
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Django",
      "PostgreSQL",
      "Django Channels",
      "Celery",
      "Redis",
    ],
    liveUrl: "https://pulsedesk-flax.vercel.app",
    featured: true,
  },
  {
    slug: "blood-bank-management",
    title: "Blood Bank Management System",
    subtitle: "Healthcare Inventory & Request Management",
    description:
      "A full-stack system streamlining donor records, blood inventory levels, and emergency hospital requests with automated low-stock alerts.",
    highlights: [
      "Developed a full-stack system to streamline donor records, blood inventory, and request management, reducing data entry time by 20% through robust CRUD operations.",
      "Built secure RESTful APIs with JWT authentication and logging middleware to ensure data integrity and access control, tested via Postman.",
      "Integrated real-time low-stock notification alerts, improving response times by 15%, with a MongoDB schema supporting complex donor–blood type–hospital relationships.",
    ],
    images: ["/images/projects/Booldbank/Pasted image.png"],
    tags: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Postman"],
    repoUrl: "https://github.com/alemugetu/BooldBankManagement",
    featured: false,
  },
  {
    slug: "note-taking-app",
    title: "Note-Taking Application",
    subtitle: "Responsive MERN Productivity App",
    description:
      "A responsive note-taking application enabling users to create, edit, and organize notes with secure, authenticated access and clean UI architecture.",
    highlights: [
      "Built a responsive note-taking application enabling users to create, edit, and organize notes with secure, authenticated access.",
      "Integrated a React frontend with an Express.js backend for seamless data flow, applying clean, component-based UI design and robust API error handling.",
    ],
    // Note: No images provided in public/images/projects/ for this project.
    images: [],
    tags: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
    repoUrl: "https://github.com/alemugetu/Note_Taking-_App",
    featured: false,
  },
];
