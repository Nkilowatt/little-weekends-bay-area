# Project Handoff

Last updated: 2026-05-17

## Product

Little Weekends Bay Area is a prototype for parents of 1-3 year olds in the Bay Area who want a quick, trustworthy way to find toddler-friendly outings.

The core experience is:

- Browse a curated list of storytimes, parks, indoor play, museums, and seasonal outings.
- Switch between list, map, and split views.
- Filter by date, distance, category, indoor/outdoor, and price.
- Open a detail panel with practical parent notes such as parking, bathrooms, stroller fit, age range, reservation status, and official source link.

## Current Deployment

- Public site: https://little-weekends-bay-area.netlify.app
- GitHub repo: https://github.com/Nkilowatt/little-weekends-bay-area
- Hosting: Netlify connected to GitHub `main`
- Build command: none
- Publish directory: `.`

The current app is a dependency-free static site. It does not require npm, a backend, a database, or environment variables.

## Current Code Shape

Primary app files:

- `index.html`
- `styles.css`
- `app.js`

Planning and operations docs:

- `PRD.md`
- `UX_SPEC.md`
- `DATA_PLAN.md`
- `TECHNICAL_PLAN.md`
- `DEPLOY.md`
- `FRIEND_TESTING_MESSAGE.md`
- `PROJECT_HANDOFF.md`
- `ROADMAP.md`

## Security Baseline

Current security posture is intentionally simple:

- No API keys.
- No secrets.
- No backend endpoints.
- No auth.
- No payments.
- No database.
- No form submission.
- No cookies.
- No external API calls from the browser.

`netlify.toml` sets security headers for the public Netlify deployment:

- `Content-Security-Policy`
- `Permissions-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

The CSP currently uses `connect-src 'none'`, which means browser-side network calls are blocked by default. If future work adds real-time data, maps, analytics, fonts, or external APIs, update the CSP deliberately and document why.

External official-source links in `app.js` use `target="_blank"` with `rel="noopener noreferrer"`.

## Important Data Note

The current outing records are seed/sample records, not a fully verified live data feed. Before a real launch:

- Every public event needs an official source URL.
- Every public event needs freshness metadata.
- Imported events should not appear as verified until reviewed.
- Stale or ambiguous events should be hidden or clearly marked.
- User-submitted tips should be moderated before public display.

## Git And Deployment Note

There was one period where local Git history and GitHub web commits diverged because GitHub CLI credentials were not available locally and some updates were committed through the GitHub web UI.

For a new development session:

1. Treat GitHub `main` as the deployment source of truth.
2. Check `git status --short --branch`.
3. Fetch remote before making changes.
4. Avoid destructive Git commands unless the user explicitly asks.
5. Keep `app.js`, `netlify.toml`, and `vercel.json` security changes intact.

The security-relevant deployed files were verified to match local content after the Netlify hardening work:

- `app.js`
- `netlify.toml`
- `vercel.json`

## Recommended New Session Prompt

Use this when starting a fresh Codex chat:

```text
이 repo를 이어서 개선하고 싶어:
https://github.com/Nkilowatt/little-weekends-bay-area

먼저 PROJECT_HANDOFF.md, ROADMAP.md, README.md, PRD.md, UX_SPEC.md, DATA_PLAN.md, TECHNICAL_PLAN.md를 읽고 현재 상태를 파악해줘.

배포는 Netlify 자동 배포로 연결되어 있고 공개 URL은:
https://little-weekends-bay-area.netlify.app

중요:
- 현재는 dependency-free static prototype이야.
- GitHub main을 배포 기준으로 삼아줘.
- API key나 secret은 넣지 말 것.
- 외부 데이터/실시간 이벤트 기능을 추가할 때는 클라이언트에 secret을 노출하지 않는 구조로 설계할 것.
- netlify.toml의 보안 헤더와 CSP를 유지할 것.
- 먼저 짧은 계획을 말하고, 내가 승인하면 구현해줘.

오늘 하고 싶은 작업은: [여기에 작업 적기]
```

## Suggested Working Style

Keep improvements small and testable. For each session, prefer one focused outcome:

- One UX improvement.
- One data improvement.
- One documentation improvement.
- One deploy/security improvement.
- One architecture migration step.

Before ending a session, update this handoff if the product state, deployment setup, security model, or next-step priorities changed.
