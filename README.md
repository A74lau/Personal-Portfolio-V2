# Anson Lau — Portfolio

A standalone React portfolio site built with Vite, Tailwind CSS, and Framer Motion. Originally created on Base44 and converted to run fully locally with no platform dependencies.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

## Production Build

```bash
npm run build
npm run preview
```

The static site output is written to `dist/` and can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Project Structure

```
src/
  components/   Portfolio sections (Hero, About, Experience, Projects, etc.)
  pages/        Route pages
  lib/          Shared utilities
  hooks/        React hooks
public/         Static assets (favicon, hero background image)
```

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start Vite dev server          |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview production build       |
| `npm run lint`    | Run ESLint                     |
| `npm run typecheck` | Run TypeScript checks on JS  |
