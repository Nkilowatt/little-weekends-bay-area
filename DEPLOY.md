# Deployment Guide

Last updated: 2026-07-12

## Primary Production Service

OpenAI Sites is the canonical production service:

- URL: https://little-weekends-bay-area.cashmire2.chatgpt.site
- Access: public
- Project configuration: `.openai/hosting.json`
- Static Worker build: `scripts/build-sites-static.mjs`
- Event API: `/api/outings`
- Storage: OpenAI Sites D1 binding named `DB`

The Sites deployment serves the HTML, CSS, JavaScript, image assets, and same-origin event API. It is the only deployment that currently supports the automatic official-event refresh pipeline.

## Build

Use the Node version declared in `package.json`:

```bash
npm run build
```

The build writes the deployable Worker to `dist/server/index.js`, copies `worker/event-sync.js`, and includes `.openai/hosting.json` in the output. The Sites packaging helper also stages `drizzle/` migrations under `dist/.openai/drizzle/`.

Before deploying a new version:

1. Confirm the exact source state is committed and pushed.
2. Run the build and available tests.
3. Save a Sites version from that pushed commit.
4. Deploy the saved version.
5. Verify the home page, `/api/outings`, security headers, and public access.

## Netlify Legacy URL

The Netlify site is no longer the product source of truth. `netlify.toml` contains a temporary redirect to the OpenAI Sites URL so old shared links can continue to work after the current Git history is reconciled and pushed.

Use a temporary `302` redirect during the alpha period. Change it to `301` only after the canonical URL has remained stable through user testing.

## Git Prerequisite

Local `main` and GitHub `main` currently have divergent history. Do not deploy the current repository to Netlify or save a new Sites version from an unpushed local-only commit. Reconcile Git history first without discarding local product work.
