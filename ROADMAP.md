# Roadmap

Last updated: 2026-05-17

This roadmap is organized as small, handoff-friendly tasks for future chat sessions.

## Now

These are the best next tasks while the product is still a static prototype.

### 1. Friend Testing Loop

Goal: learn whether parents can decide where to go within 10 seconds.

Tasks:

- Send the public Netlify URL with `FRIEND_TESTING_MESSAGE.md`.
- Ask testers to try the site on mobile first.
- Collect feedback on confusing filters, missing info, and trust concerns.
- Add the top 5 feedback themes to a new `TEST_FEEDBACK.md`.

Done when:

- At least 3-5 parents have tried it.
- There is a short list of repeated feedback themes.

### 2. Improve Mobile Usability

Goal: make the first-screen mobile experience faster and calmer.

Tasks:

- Review the app at mobile widths.
- Tighten filter layout if it feels crowded.
- Make cards easier to scan with one-handed scrolling.
- Confirm the map/list toggle is obvious.
- Check that dialog content fits without awkward overflow.

Done when:

- The app feels usable on a typical phone viewport.
- No button text or card content overlaps.

### 3. Better Seed Data

Goal: replace demo-ish entries with a stronger first curated set.

Tasks:

- Create a structured seed data file, such as `data/outings.json`.
- Move hardcoded outing records out of `app.js`.
- Add 20-30 high-confidence records from official sources.
- Add fields for `last_reviewed_at`, `confidence_status`, and `source_url`.

Done when:

- Cards render from structured data.
- Every record has an official source and freshness status.

### 4. Trust And Freshness UI

Goal: make parents understand whether a listing is reliable today.

Tasks:

- Add clear labels for verified, source-check-needed, and stale.
- Show official source and last reviewed date in the detail panel.
- Avoid making unverified events look confirmed.
- Add copy that distinguishes standing places from scheduled events.

Done when:

- A parent can tell whether they need to double-check the official page.

### 5. Local Git Cleanup

Goal: make future sessions easier by aligning local work with GitHub `main`.

Tasks:

- Inspect local and remote commit history.
- Decide whether to re-clone, rebase, or archive the local divergent history.
- Preserve any local-only files or notes before cleanup.
- Confirm `git status --short --branch` is clean afterward.

Done when:

- Local development starts from the same history as GitHub `main`.

## Next

These come after initial friend feedback.

### 6. Search And Sort Polish

Goal: make discovery feel sharper.

Tasks:

- Add neighborhood/city grouping.
- Add "rainy day", "free", and "near me" quick filters.
- Improve recommended sort logic.
- Add empty-state suggestions that feel helpful.

### 7. Real Map Foundation

Goal: prepare for a production map without exposing secrets.

Tasks:

- Decide whether to use Mapbox, Google Maps, or an open map stack.
- Document API key restrictions and allowed domains.
- Keep map tokens out of the repo when needed.
- Update CSP only for the chosen provider.

### 8. Admin Review Workflow Design

Goal: define how imported events become trusted public listings.

Tasks:

- Sketch admin review queue states.
- Define approve/edit/reject/merge actions.
- Document duplicate detection rules.
- Decide what fields are required before publishing.

### 9. Next.js Migration Plan

Goal: move only when the static prototype has proven the core UX.

Tasks:

- Scaffold Next.js.
- Preserve the current visual design and interaction model.
- Move seed data into JSON or a lightweight local data layer first.
- Add API routes only when needed.

### 10. Source Ingestion Prototype

Goal: test one official source before building a full ingestion system.

Tasks:

- Pick one library or city source with predictable data.
- Build a script that fetches and normalizes raw events.
- Store raw and normalized payloads separately.
- Require human review before display.

## Later

These are production-scale features.

- User accounts for saved outings across devices.
- Weekly digest emails.
- Parent-submitted tips with moderation.
- Personalized recommendations by age, nap schedule, distance, and weather.
- PostGIS-backed geospatial search.
- Event freshness monitoring.
- Admin dashboard for imported source review.
- Analytics focused on product learning, with privacy reviewed before launch.

## Guardrails

Keep these constraints unless the user explicitly chooses a new direction:

- Do not add secrets to the client.
- Do not add API keys to the repo.
- Do not weaken `netlify.toml` security headers casually.
- Do not show scraped/imported events as verified without review.
- Prefer official venue, city, library, museum, or park sources over aggregators.
- Keep each session's change small enough to test and explain.
