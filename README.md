# EkoKintsugi

EkoKintsugi is a full-stack TypeScript web app for showcasing circular-fashion products and tracking ESG impact.

- Frontend: React + Vite + Tailwind CSS
- Backend: Express (serves API + Vite app)
- Database: Supabase (PostgreSQL + RLS)

## Tech Stack

- React 19
- Vite 6
- TypeScript
- Express 4
- Supabase JS
- Tailwind CSS 4
- Motion + Lucide React

## Project Structure

```text
.
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ lib/
│  ├─ App.tsx
│  └─ main.tsx
├─ public/
│  ├─ logo.png
│  └─ images/
├─ server.ts
├─ supabase_schema.sql
├─ .env.example
├─ package.json
└─ vite.config.ts
```

## Environment Variables

Create a `.env` file in project root.

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional compatibility keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# App
APP_URL=http://localhost:3000
GEMINI_API_KEY=placeholder
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Initialize database:
- Open Supabase SQL editor
- Run `supabase_schema.sql`

3. Start development server:
```bash
npm run dev
```

4. Open:
`http://localhost:3000`

## Available Scripts

- `npm run dev`  
  Runs the Express server (`server.ts`) with Vite middleware in development.

- `npm run build`  
  Builds frontend with Vite into `dist/`.

- `npm run preview`  
  Previews built frontend.

- `npm run lint`  
  Type-check only (`tsc --noEmit`).

## API Endpoints

- `GET /api/health`  
  Health status for backend + Supabase config state.

- `GET /api/catalog`  
  Returns product catalog. Falls back to local sample data if DB is unavailable/empty.

- `GET /api/impact/:userId`  
  Returns ESG metrics and timeline. Falls back to generated demo records if needed.

- `POST /api/orders/create`  
  Creates order, assigns tree, writes ESG record, and updates carbon ledger.

- `POST /api/admin/seed`  
  Seeds demo impact data for placeholder user.

## Notes

- The app currently uses a placeholder user ID for impact dashboards in UI.
- Product and section images are served locally from `public/images` and logo from `public/logo.png`.
- If port `3000` is busy, stop the running process and restart.

## Deployment

Production mode serves static files from `dist/` via Express.

Typical steps:

1. Set production env vars
2. Run:
```bash
npm run build
```
3. Start server with `NODE_ENV=production` and run `server.ts` via your process manager.

## License

Private project. Add your preferred license if needed.
