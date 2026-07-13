# Roadmap

Last updated: 2026-07-12

This roadmap is organized as small, handoff-friendly tasks for future chat sessions.

## Now

OpenAI Sites is now the primary service. P0.5 stabilization and P1 discovery polish are complete; the next product gate is friend testing and release-discipline cleanup.

### P0.5 Stabilization Completed

- Results default to the inclusive 12-47 month range.
- 21 human-reviewed evergreen places cover San Francisco, Peninsula, South Bay, East Bay, and North Bay.
- Scheduled events carry an end time so completed programs leave today's results.
- Source health requires a recent successful sync and active future events for every source.
- Partial syncs are shown honestly and stale-source events are downgraded to recheck.
- External event text is escaped and official links use an HTTPS host allowlist.
- Regression fixtures cover all seven automatic source parsers, including Redwood City.

### P1 Discovery Polish Completed

- Full filters now cover tomorrow, Bay Area region, event time, reservation burden, and known bathroom or stroller information.
- Cards distinguish scheduled events from anytime places and show no more than two concise recommendation reasons.
- Reservation status is visible before opening a detail panel.
- Empty results preserve selected constraints while offering distance expansion, anytime places, or a full reset.
- Detail panels include share actions and three deduplicated nearby alternatives.

### 0. Primary Deployment And Git Reconciliation

Goal: make the repository and canonical OpenAI Sites deployment traceable to the same source state.

Tasks:

- Preserve the current local product commits and uncommitted documents.
- Reconcile divergent local and GitHub histories without destructive resets.
- Push the exact source state used for the next Sites version.
- Keep Netlify as a temporary redirect-only legacy URL.
- Verify public access, `/api/outings`, and security headers after deployment.

Done when:

- A GitHub commit can be identified as the source of the current Sites deployment.
- Old Netlify links redirect to OpenAI Sites.

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

### 3. Toddler Relevance And Place Data

Goal: replace demo-ish entries with a stronger first curated set.

Tasks:

- Add structured minimum and maximum ages in months.
- Exclude activities that do not overlap the 12-47 month target by default.
- Add 20-30 high-confidence evergreen places from official sources.
- Add `last_reviewed_at`, structured confidence, address, and source fields.

Done when:

- Results are toddler-relevant by default.
- Every event and place has an official source and freshness status.

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

These come after initial friend feedback and Git reconciliation.

### 6. Search And Sort Polish (Completed In P1)

Goal: make discovery feel sharper.

Tasks:

- Added region filtering and region-aware result context.
- Retained the existing "rainy day", "free", and "near me" quick filters.
- Added visible recommendation reasons on top of the P0.5 recommendation score.
- Added contextual empty-state recovery actions.

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

### 10. Source Ingestion Quality And Monitoring

Goal: make the seven-source ingestion system observable and safe as source pages change.

Tasks:

- Maintain parser fixtures and regression tests for every source.
- Alert on failed sources, zero-event parses, and sudden count changes.
- Separate automatic source confirmation from human verification.
- Add a review path for ambiguous or age-inappropriate events.

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
