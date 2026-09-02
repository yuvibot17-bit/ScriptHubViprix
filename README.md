# VipriX Hub

A Nexx-Ware-inspired, self-hosted Lua script library built with Next.js and Neon Postgres.

## Setup

Copy `.env.example` to `.env.local`, set `DATABASE_URL`, `LOADER_PASSWORD_3`, and `NEXT_PUBLIC_BASE_URL`, then run `npm install` and `npm run dev`.

The public library exposes metadata only. The unlinked `/loader` route is password protected for administration. The raw loader endpoint should be used only for scripts you own or are authorized to distribute; executor-specific exploit tooling is intentionally not included.

## Deploy

Import the repository into Vercel, set the environment variables in Project Settings, and use `npm run build` as the build command.
