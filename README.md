# FlexPulse - Fitness & Gym Management Platform

FlexPulse is a full-stack fitness platform for members, trainers, and admins. Members can discover classes, book sessions, save favorites, and join forum discussions. Trainers can create and manage classes and publish forum posts. Admins moderate users, classes, trainer applications, transactions, and community content.

## Live URL

- Client: https://flex-pulse-fitness-gym.vercel.app/

## Project Purpose

- Provide a role-based gym management platform with a modern UX.
- Support a real booking flow with Stripe payment.
- Enable trainer and admin moderation workflows.
- Build an active fitness community through public forum content and private engagement.

## Main Features

### Unique and High-Demand Features

- Approval-gated publishing pipeline where only admin-approved classes and forum posts appear publicly, preventing low-quality or unsafe content exposure.
- End-to-end trainer application workflow with approve/reject decisions plus admin feedback, creating a transparent path from applicant to verified trainer.
- Transaction-linked booking lifecycle using Stripe checkout and history tracking so members can map payments directly to booking actions.
- Role-aware moderation dashboard that combines user block/unblock, role updates, content control, and application handling in one control surface.
- Community forum interactions with like/dislike, nested discussion flow (comments and replies), and ownership-safe edit/delete permissions.
- Server-side pagination on heavy public surfaces (All Classes and Community Forum) to keep performance stable as platform content scales.
- Private route hardening for detail pages and dashboards, including authenticated reload-safe behavior for better real-world session continuity.
- Member engagement tools that combine favorites, bookings, and personalized class exploration in one flow rather than isolated modules.

### Core Platform Features

- Better Auth based authentication with email/password and Google.
- Role-based dashboard for member, trainer, and admin.
- Protected private routes for class/forum details and dashboard pages.
- Class discovery with search by class name and category filter.
- Public listing shows approved classes/posts only.
- Global loading state and custom 404 page.
- Fully responsive design across mobile, tablet, and desktop.

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS, HeroUI, Framer Motion
- Backend: Node.js, Express, MongoDB
- Auth: Better Auth + JWT
- Payment: Stripe

## NPM Packages Used

### Client

- next
- react
- react-dom
- better-auth
- @better-auth/mongo-adapter
- mongodb
- @heroui/react
- framer-motion
- stripe
- recharts
- react-icons
- swiper

### Server

- express
- cors
- dotenv
- mongodb
- jose-cjs

## Deployment Checklist

- Use environment variables for all secrets and credentials.
- Ensure backend CORS allows only trusted origins.
- Ensure API routes do not return 404/504 in production.
- Verify private routes are reload-safe for authenticated users.
- Verify all dynamic routes render without runtime errors.
