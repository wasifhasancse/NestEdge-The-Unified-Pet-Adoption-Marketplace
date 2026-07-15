# NestEdge - Pet Adoption Platform

NestEdge is a full-stack pet adoption platform where users can browse available pets, submit adoption requests, and manage their own pet listings. Owners can post pets for adoption, review incoming requests, and update or remove their listings through a personal dashboard.

## Live URL

- Client: https://nest-edge-pet-adoption.vercel.app/

## Project Purpose

- Provide a clean, user-friendly platform for connecting pets with new owners.
- Support a full adoption request lifecycle from submission to approval.
- Enable pet owners to manage their listings and respond to adoption inquiries.
- Build trust through transparency with pet details, owner info, and request tracking.

## Main Features

### Unique and High-Demand Features

- End-to-end adoption request flow where users submit requests with a pickup date and message, and owners review and manage each one from their dashboard.
- Owner-specific listing management that lets users add, update, and delete their own pet listings without affecting others' content.
- Incoming adoption requests manager that shows owners all requests per listing with requester details and status controls.
- Public pet detail pages accessible to unauthenticated users so anyone can discover pets without being forced to sign in.
- Dashboard analytics chart giving owners a visual summary of listing and request activity over time.
- Server-side search and filtering on the All Pets page so users can narrow results by species, breed, or keyword without client-side performance hits.
- Adoption request status tracking so both the requester and the owner can follow the state of each request in real time.
- Fully protected dashboard routes with reload-safe authenticated session handling using Better Auth JWT cookies.

### Core Platform Features

- Better Auth based authentication with email/password and Google OAuth.
- JWT session strategy with cookie caching for secure, persistent sessions.
- Role-aware private dashboard for listing owners and adopters.
- Pet search and filter on the public All Pets listing page.
- Featured pets, success stories, blogs, and pet care content on the home page.
- Global loading state, custom error page, and custom 404 page.
- Fully responsive design across mobile, tablet, and desktop.
- Dark/light theme toggle.

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS, HeroUI, Framer Motion
- Backend: Node.js, Express, MongoDB
- Auth: Better Auth + JWT

## NPM Packages Used

### Client

- next
- react
- react-dom
- better-auth
- @better-auth/mongo-adapter
- mongodb
- @heroui/react
- @gravity-ui/icons
- framer-motion
- motion
- next-themes
- react-hot-toast
- react-icons
- recharts
- swiper
- lucide-react

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
- Keep GET /pets/:id public so pet detail pages load for unauthenticated visitors.
