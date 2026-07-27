# Roadmap

Last updated: 2026-07-26

This roadmap is organized as small, handoff-friendly tasks for future chat sessions.

## Now

OpenAI Sites is now the primary service. Time-trust recovery, mobile decision-speed work, and a tiered actual-place photography system are complete locally; the next product gates are enabling the Google provider, deployment verification, and parent testing.

### P0.5 Stabilization Completed

- Results default to the inclusive 12-47 month range.
- 57 human-reviewed evergreen places cover San Francisco, Peninsula, South Bay, East Bay, and North Bay.
- Scheduled events carry an end time so completed programs leave today's results.
- Source health requires a recent successful sync and active future events for every source.
- Partial syncs are shown honestly and stale-source events are downgraded to recheck.
- External event text is escaped and official links use an HTTPS host allowlist.
- Regression fixtures cover all 28 automatic sources, including Redwood City, San Francisco, and Sunnyvale.

### P1 Discovery Polish Completed

- Full filters now cover tomorrow, Bay Area region, event time, reservation burden, and known bathroom or stroller information.
- Cards distinguish scheduled events from anytime places and show no more than two concise recommendation reasons.
- Reservation status is visible before opening a detail panel.
- Empty results preserve selected constraints while offering distance expansion, anytime places, or a full reset.
- Detail panels include share actions and three deduplicated nearby alternatives.
- Today and weekend results separate scheduled events from flexible places and progressively reveal groups after five items.
- Mobile search is always visible, the hero is compact through 768px, and detail actions prioritize directions and official information.
- Activity-example imagery and confirmed/unknown amenity states prevent stock imagery or missing logistics from being mistaken for verified facts.
- Fourteen named destinations use manually matched Wikimedia Commons photos with creator, reusable-license, and original-source attribution; all other places retain the clearly labeled category fallback.
- Actual photos match by curated place ID first and exact venue alias second, avoiding fuzzy matches between similarly named branches or parks.
- Curated licensed photos now fall through to server-side Google Places photos, then Street View, and finally the labeled category image.
- Remote requests are lazy-loaded near the viewport, matched against catalog coordinates and addresses, and store only the Google Place ID in D1.

### Time Trust Recovery Completed

- Redwood City 11:59 PM placeholder endings are replaced with practical 90- or 120-minute durations while normal explicit and all-day endings are preserved.
- API and client time guards remove ended events, retain date-only events through the Pacific day, and re-evaluate visible results on focus and every 60 seconds.
- Source data revision 7 forces existing D1 events through the corrected parser and expanded 28-source coverage.
- Palo Alto, Menlo Park, Mountain View, Sunnyvale, Cupertino, Santa Clara, Campbell, Los Gatos, and San Francisco now have dedicated official library or city-family feeds plus human-reviewed library destinations.
- The regression suite contains 40 passing Node tests covering parser normalization, API omission, client status, grouping, licensed place imagery, amenity rendering, and regional source coverage.

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

### 2. Improve Mobile Usability (Completed)

Goal: make the first-screen mobile experience faster and calmer.

Tasks:

- Verified 390×844, 768px, and desktop layouts.
- Grouped filters into `언제와 어디` and `아이와 준비`.
- Kept the first result title within the initial 390×844 viewport and made chips visibly horizontally scrollable.
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
