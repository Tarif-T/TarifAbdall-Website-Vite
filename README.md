# TarifAbdall Website Vite

Portfolio website for Tarif Abdalla, built with a Vite React frontend and an
Express/MongoDB backend API.

## Local Development

Frontend:

```bash
cd tarif-abdalla-frontend
npm install
npm run dev
```

Backend:

```bash
cd tarif-abdalla-backend
npm install
cp .env.example .env
npm run dev
```

The frontend uses `http://localhost:3000/api` by default during development.
For deployed environments, set `VITE_API_BASE_URL` to the live API base URL.

## Vercel Deployment

This repository includes a root `vercel.json`, so Vercel can build the frontend
even though it lives in `tarif-abdalla-frontend`.

Recommended Vercel settings:

- Framework preset: `Vite`
- Build command: `npm run build --prefix tarif-abdalla-frontend`
- Output directory: `tarif-abdalla-frontend/dist`
- Install command: `npm install --prefix tarif-abdalla-frontend`

Environment variable for the frontend:

```text
VITE_API_BASE_URL=https://your-backend-host.example.com/api
```

If the API is not connected during a presentation, the public projects and
services pages show presentation-ready fallback content instead of a broken
empty state.
