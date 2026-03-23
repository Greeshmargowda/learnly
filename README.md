# Learnly — LMS Platform

A full-featured Learning Management System with sequential video-based courses, progress tracking, and role-based access.

## Tech Stack

- **React 18** + **Vite**
- No external UI libraries — fully custom CSS

## Features

- 🏠 Marketing homepage with course catalog, testimonials, how-it-works
- 🔐 Auth system — login, register, roles (student / instructor / admin)
- 📚 Course catalog with category filters
- 🎬 Sequential learning — lessons lock until previous is complete
- 📊 Progress tracking — per-lesson and per-course
- 👤 Profile dashboard with stats
- ⚙️ Admin panel — user and course management

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | alex@demo.com | demo123 |
| Instructor | elena@demo.com | demo123 |
| Admin | admin@demo.com | admin123 |

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm run build
```

Or connect the GitHub repo to Vercel — it will auto-detect Vite and deploy correctly.

> The `vercel.json` file handles SPA routing so page refreshes don't return 404.
