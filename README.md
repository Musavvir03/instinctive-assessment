# SecureSight Dashboard

A fullstack technical assessment for SecureSight CCTV monitoring software.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM (SQLite for easy deploy)

## Features
- Navbar
- Incident Player (left)
- Incident List (right)
- API routes: GET /api/incidents, PATCH /api/incidents/:id/resolve
- Seed script for cameras and incidents

## Setup & Deployment

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```
3. **Seed the database:**
   ```bash
   npm run prisma:seed
   ```
4. **Start the dev server:**
   ```bash
   npm run dev
   ```

### Deploying to Vercel
- This project is under 100MB and works with SQLite (file-based) for easy Vercel deploy.
- Add any required environment variables (see `.env`).

## Tech Decisions
- **Next.js App Router** for modern React and API routes.
- **Prisma + SQLite** for simple, file-based DB deployable on Vercel.
- **Tailwind CSS** for rapid, clean UI.
- **Optimistic UI** for resolving incidents.

## If I had more time...
- Add authentication and user roles.
- Implement the optional SVG/Canvas timeline.
- Add tests (unit, integration, e2e).
- Improve accessibility and mobile responsiveness.
- Add error handling and loading skeletons.
- Add 3D front-end (React Three Fiber) as per extra credit.

---

See the assessment prompt for more details.
