# Alemu Getu Adane — Portfolio

Production-grade personal portfolio for **Alemu Getu Adane**, Junior Full-Stack Developer and 4th-year Computer Science student at the University of Gondar, Ethiopia. Built with Next.js (App Router), React 19, TypeScript strict mode, and Tailwind CSS v4.

## Features

- **Kinetic Hero Entrance & Interactive Text Animation**: Waving hand welcome animation (`👋`), dynamic typewriter arrival effect with glowing terminal caret, shimmering gradient typography, and interactive character-bounce physics on hover and click.
- **Interactive 3D Motion Design**: Physics-based 3D card tilt ([Card3DTilt](file:///home/alex/Documents/portfolio/src/components/shared/card-3d-tilt.tsx)) with specular glare, orbital perspective rings, and spatial parallax depth on both the Hero profile photo and credentials card.
- **Pure CSS Image Carousel**: Custom scroll-snap carousel with desktop mouse-drag velocity, smooth keyboard controls, and accessible touch swiping.
- **Data-Driven Architecture**: Sourced strictly from verified resume data: Store.ethio, PulseDesk, Blood Bank Management, BSc Computer Science degree, and technical stack.
- **Tailwind CSS v4 & Theming**: Custom `@theme` design tokens with system-aware light and dark mode toggles with zero layout shift or flash.
- **Contact API with Honeypot**: Secure `/api/contact` endpoint with bot mitigation and direct mailto fallback.

## Tech Stack

- **Framework**: Next.js 16.3.5 (App Router, Turbopack)
- **UI Library**: React 19.2.8
- **Styling**: Tailwind CSS v4 with CSS `@theme` tokens
- **Animations & 3D**: Hardware-accelerated CSS 3D perspective transforms & Framer Motion
- **Icons**: Lucide React
- **Typography**: Google Fonts Geist Sans & Geist Mono

## Continuous Integration & Deployment (CI/CD)

This repository includes an automated GitHub Actions CI/CD pipeline at `.github/workflows/ci-cd.yml`:

- **Automated Quality Checks**: Every `push` and `pull_request` to `main` runs:
  1. `npm run typecheck` (strict TypeScript validation)
  2. `npm run lint` (ESLint 9 checks)
  3. `npm run format:check` (Prettier code style verification)
  4. `npm run build` (Next.js production compilation)
- **Continuous Deployment**: When code is merged to `main`, the workflow can automatically trigger zero-downtime deployment to Vercel (or your hosting platform of choice).

### Setting up Vercel Deployment

To enable automatic continuous deployment via the GitHub Actions workflow, add the following secrets to your GitHub repository under **Settings > Secrets and variables > Actions**:

| Secret Name         | Description                       |
| ------------------- | --------------------------------- |
| `VERCEL_TOKEN`      | Your Vercel Personal Access Token |
| `VERCEL_ORG_ID`     | Your Vercel Team/User ID          |
| `VERCEL_PROJECT_ID` | Your Vercel Project ID            |

## Available Scripts

| Script         | Command                | Purpose                                        |
| -------------- | ---------------------- | ---------------------------------------------- |
| `dev`          | `npm run dev`          | Starts local Next.js dev server on port 3000   |
| `build`        | `npm run build`        | Compiles optimized production bundle           |
| `start`        | `npm run start`        | Serves production build                        |
| `lint`         | `npm run lint`         | Runs ESLint check across codebase              |
| `typecheck`    | `npm run typecheck`    | Validates TypeScript types with `tsc --noEmit` |
| `format`       | `npm run format`       | Formats all files using Prettier               |
| `format:check` | `npm run format:check` | Verifies code formatting against Prettier      |

## License

© 2026 Alemu Getu Adane. All rights reserved.
