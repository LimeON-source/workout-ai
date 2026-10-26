# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Workout AI generates a workout from the user's needs and the equipment they have available.

Planned stack: a Next.js web app deployed on Vercel, an API on Cloudflare Workers, and Claude for workout generation.

## Repository layout

This is a monorepo with no root `package.json` and no workspace tooling. Each app is its own npm project, so run commands from inside the app directory.

- `apps/web`: the Next.js App Router frontend. This is the only app with code so far.
- `apps/api`: the Cloudflare Workers API. It has a placeholder README only. `.dev.vars` is gitignored at the root, which matches Wrangler's local secrets file.

## Web app (`apps/web`)

Commands (run in `apps/web`):

```bash
npm install
npm run dev      # next dev on http://localhost:3000
npm run build
npm run lint     # ESLint 9 flat config: next core-web-vitals + typescript
```

There is no test runner or test script yet.

### The Next.js version here is newer than your training data

`apps/web` uses Next.js 16.4 and React 19.3. `apps/web/AGENTS.md` says APIs and conventions may differ from what you know. Before you write Next.js code, read the relevant guide in `apps/web/node_modules/next/dist/docs/` (`01-app`, `03-architecture`, …) and follow its deprecation notices. `next dev` re-adds the AGENTS.md block, so commit it rather than reverting it.

Settings in `next.config.ts` that affect how you write code:
- `cacheComponents: true` turns on the Cache Components model, so data fetching and caching follow its rules.
- `partialPrefetching: true` and `experimental.agentFeedback: true` are also set.
- Tailwind CSS v4 runs through the `@tailwindcss/turbopack` loader configured in `turbopack.rules`. There is no PostCSS config. Theme tokens live in `app/globals.css` under `@theme inline`.

Other conventions:
- Layouts and pages use Next's globally generated route types, such as `LayoutProps<"/">`, which are emitted into `.next/types`.
- The path alias `@/*` maps to the `apps/web` root.

## Rules
- Never commit secrets or .env / .dev.vars files
- Never push to main; always work on a branch
- Commit messages follow Conventional Commits
- Web app: Next.js App Router + TypeScript + Tailwind in apps/web, mobile-first
- API: Cloudflare Workers + Hono in apps/api