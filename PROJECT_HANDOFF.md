# Project Handoff

Last updated: 2026-07-16

## Product

Little Weekends Bay Area is a prototype for parents of 1-3 year olds in the Bay Area who want a quick, trustworthy way to find toddler-friendly outings.

The core experience is:

- Browse a curated list of storytimes, parks, indoor play, museums, and seasonal outings.
- Switch between list, map, and split views.
- Filter by date, distance, region, age, category, indoor/outdoor, price, event time, reservation burden, and known bathroom or stroller information.
- Open a detail panel with practical parent notes such as parking, bathrooms, stroller fit, age range, reservation status, and official source link.

## Current Deployment

- Canonical public site: https://little-weekends-bay-area.cashmire2.chatgpt.site
- OpenAI Sites access: public as verified on 2026-07-12
- Legacy Netlify URL: https://little-weekends-bay-area.netlify.app
- GitHub repo: https://github.com/Nkilowatt/little-weekends-bay-area
- Primary runtime: OpenAI Sites Worker
- Event API: `/api/outings`
- Database: D1 binding `DB`
- Refresh schedule: 26 official sources every six hours

The user interface is lightweight HTML, CSS, and JavaScript, but the primary service now includes a Worker backend and D1 database for automatic official-event updates.

OpenAI Sites support is configured through `.openai/hosting.json` plus a small static Worker build script at `scripts/build-sites-static.mjs`. The Sites build wraps the same `index.html`, `styles.css`, `app.js`, and map SVG into `dist/server/index.js` for deployment.

## Current Map Baseline

The map is still dependency-free and does not call a live map API. `app.js` stores outing coordinates as `location: { lat, lng }`, then projects those coordinates into the downloaded static Bay Area SVG basemap at `assets/bay-area-location-map.svg`.

The current basemap is intentionally lightweight:

- No API keys.
- No third-party browser-side API calls.
- The browser calls only the same-origin `/api/outings` endpoint.
- Static Wikimedia Commons Bay Area location map asset with in-app attribution.
- City labels and nearby-pin offsets for readability on mobile.

## Current P0 Decision Baseline

- Results default to activities overlapping the 12-47 month range.
- Parents can filter specifically for age 1, 2, or 3.
- Location can be set to San Mateo, Redwood City, San Francisco, Palo Alto, Menlo Park, Mountain View, Cupertino, Santa Clara, Campbell, Los Gatos, San Jose, or Oakland without storing an exact address.
- Distances, distance filtering, map origin, and nearest sorting recalculate from the selected location.
- Recommended sorting scores age specificity, distance, time, source confidence, cost, and reservation burden while pushing repeated series below unique options.
- Trust is structured as `human_verified`, `source_confirmed`, `recheck`, or `stale`; automatic source parsing is not presented as human verification.
- The evergreen catalog contains 46 human-reviewed places across five Bay Area regions.
- Automatic events include `endAt`; API and client checks remove completed programs. Missing end times use 90 minutes, date-only events remain through the Pacific calendar day, and the visible list is re-evaluated on tab return and every 60 seconds.
- Redwood City 11:59 PM placeholder endings are normalized to 120 minutes for music, performances, and movies or 90 minutes for other single programs. `SOURCE_DATA_REVISION` is 6 so existing D1 rows are refreshed for the expanded source set.
- Source status is current only when that source has a recent successful sync and active future events. Partial coverage is shown as `partial`, and stale-source events become `recheck`.
- On-demand recovery has a 30-second cooldown and records `syncing` before network fetches to limit repeated external calls and abuse.
- On-demand recovery retries only unhealthy sources; scheduled refreshes still verify all 26 sources.

## San Francisco Coverage

- SFPL's official early-childhood audience filter is collected across a 45-day range in 50-event pages, with a 12-page envelope so high-volume central branches do not hide neighborhood programs.
- Each imported SFPL event keeps its exact official event URL, branch name, branch coordinates, structured start/end time, and age-specific label. Canceled, virtual, and older-audience events are excluded.
- San Francisco Recreation and Parks remains a separate automatic source for toddler programs, concerts, festivals, and other family-friendly outdoor events.
- Main, Mission Bay, Noe Valley, Glen Park, Richmond, and Sunset libraries are also available as human-reviewed anytime places.

## Redwood City Coverage

- The official City of Redwood City calendar RSS feed is one of 26 automatic sources.
- The parser keeps toddler storytimes, Tiny Tales, bilingual storytimes, music and movement, puppet shows, and selected family programs while excluding cancellations and unrelated city events.
- Schaberg, Redwood Shores, Downtown Library, Magical Bridge, and Stafford Park receive location-specific coordinates and parent logistics when the event title identifies the venue.
- The city RSS feed is capped to the next 50 citywide events. Verified weekly library series are extended through the 45-day window, while the six-hour refresh keeps one-off programs current.

## Central Peninsula Coverage

- Belmont, Foster City, San Carlos, and Millbrae use branch-specific official San Mateo County Libraries feeds so citywide feed limits cannot hide their programs.
- Stable weekly storytimes from those feeds extend through the 45-day window; one-off maker, performance, and seasonal programs remain tied to their official event records.
- Burlingame uses the official city library calendar for the current and following month, including Main Library and Easton Branch family programs.
- All five libraries are also available as human-reviewed anytime places.

## South Peninsula And West Valley Coverage

- Palo Alto City Library's official BiblioCommons feed covers Children's, Mitchell Park, Rinconada, Downtown, and College Terrace library programs in addition to the existing city family calendar.
- Menlo Park combines its official children-and-family event directory with the published weekly storytime schedule, including Menlo Park Library and Belle Haven Library.
- Mountain View Public Library uses its official public LibCal JSON with baby, toddler, preschool, family, storytime, STEAM, music, and park programs filtered for in-person use.
- Cupertino combines the branch-filtered Santa Clara County Library BiblioCommons feed with the City of Cupertino `Kids & family` event directory.
- Santa Clara combines separate official library-event and city-event RSS feeds. Central Park, Northside, and Mission prefixes map to their own branches so programs are not collapsed into a single city point.
- Campbell combines the branch-filtered Santa Clara County Library BiblioCommons feed with current-and-next-month City of Campbell community and recreation calendars.
- Los Gatos combines the official Library LibCal JSON feed with the current-and-next-month Town of Los Gatos calendar, keeping storytimes and town events independent.
- Menlo Park, Mountain View, Cupertino, Santa Clara, Campbell, and Los Gatos are selectable distance origins. Fourteen library locations across Palo Alto, Menlo Park, Mountain View, Cupertino, Santa Clara, Campbell, and Los Gatos are available as human-reviewed anytime places.

## Current P1 Discovery Baseline

- The date filter includes tomorrow while retaining anytime places as flexible alternatives.
- Region filtering covers San Francisco, Peninsula, South Bay, East Bay, and North Bay.
- Event-time, reservation, bathroom-information, and stroller-information filters support practical parent decisions.
- Result cards distinguish scheduled events from anytime places, show reservation status, and surface at most two concise recommendation reasons.
- Today and weekend recommendations put scheduled events in their own first group and show flexible nearby places second, with five-item progressive disclosure per group.
- Empty states can expand distance, include anytime places, or reset all conditions.
- Detail panels provide native sharing with clipboard fallback and three deduplicated nearby alternatives.
- Images support optional actual/context provenance, while fallback category art is labeled `활동 예시`. Parking, bathroom, changing-table, and stroller notes use the same confirmed/unknown status model.
- At 768px and below the hero is compact, search is always visible, filter fields are grouped by decision stage, and the sticky detail action area leads with directions and official information without hiding save/share/calendar actions.
- Mobile places a text-free contextual photo moment between the compact hero title and discovery controls. Nine generated scenes are selected deterministically from Pacific date, origin city, date tab, search, and activity filters, so the image does not jump on refresh. Accessible alt text describes each anonymous activity scene without presenting it as a named venue photo.
- The first save exposes a `계획 보기` action, and the saved view explains date grouping, nap and schedule conflict checks, calendar export, and family sharing.

## Current Code Shape

Primary app files:

- `index.html`
- `styles.css`
- `app.js`
- `evergreen-outings.js`
- `assets/bay-area-location-map.svg`

OpenAI Sites support files:

- `.openai/hosting.json`
- `scripts/build-sites-static.mjs`
- `app/`
- `public/`
- `package.json`

Planning and operations docs:

- `PRD.md`
- `UX_SPEC.md`
- `DATA_PLAN.md`
- `TECHNICAL_PLAN.md`
- `DEPLOY.md`
- `FRIEND_TESTING_MESSAGE.md`
- `PROJECT_HANDOFF.md`
- `ROADMAP.md`
- `tests/rendered-html.test.mjs`
- `tests/event-sync.test.mjs`
- `tests/evergreen-data.test.mjs`

## Security Baseline

Current security posture is intentionally simple:

- No API keys.
- No secrets.
- No auth.
- No payments.
- No form submission.
- No cookies.
- One same-origin read-only public endpoint: `/api/outings`.
- D1 stores normalized event and source-sync state.
- Event rows include structured start and end times. Source metadata includes active-event counts and current/stale state.

The OpenAI Sites build and `netlify.toml` set security headers including:

- `Content-Security-Policy`
- `Permissions-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

OpenAI Sites uses `connect-src 'self'` for `/api/outings`. The Netlify legacy configuration remains restrictive because it redirects to the canonical service instead of hosting the event API.

External official-source links in `app.js` use `target="_blank"` with `rel="noopener noreferrer"`.

Imported text is normalized and escaped before HTML rendering. Official source links must use HTTPS and match the client allowlist before they are shown.

## Important Data Note

The service combines automatically collected official events with 46 human-reviewed evergreen places. Automatic source parsing is not the same as human verification. Before a broader launch:

- Every public event needs an official source URL.
- Every public event needs freshness metadata.
- Imported events should not appear as verified until reviewed.
- Stale or ambiguous events should be hidden or clearly marked.
- User-submitted tips should be moderated before public display.

## Git And Deployment Note

There was one period where local Git history and GitHub web commits diverged because GitHub CLI credentials were not available locally and some updates were committed through the GitHub web UI.

For a new development session:

1. Treat the current OpenAI Sites deployment as the public product source of truth.
2. Check `git status --short --branch`.
3. Inspect both local and remote history before changing branches; they are currently divergent.
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

대표 배포는 OpenAI Sites이고 공개 URL은:
https://little-weekends-bay-area.cashmire2.chatgpt.site

중요:
- 현재 UI는 가벼운 정적 구조지만 OpenAI Sites Worker, D1, /api/outings를 사용해.
- OpenAI Sites를 대표 서비스로 유지해줘.
- 로컬 main과 GitHub main이 갈라져 있으니 Git 작업 전에 반드시 상태를 확인해줘.
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
