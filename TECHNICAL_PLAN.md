# Technical Plan v1

## Current Prototype

The first local prototype is a dependency-free static web app:

- `index.html`
- `styles.css`
- `app.js`

It validates the main UX loop: location, date, filters, list/map views, and detail panels.

## Production Direction

Recommended stack:

- Next.js for the web app.
- PostgreSQL with PostGIS for geospatial queries.
- Drizzle or Prisma for schema management. Drizzle is preferable if direct geospatial SQL control becomes important.
- Background workers for source ingestion.
- Mapbox or Google Maps for production map rendering.

## MVP Architecture

Frontend routes:

- `/` discovery home.
- `/outings` filtered list/map search.
- `/outings/[id]` detail page.
- `/admin/review` imported event review.
- `/admin/places` place management.

API routes:

- `GET /api/outings`
- `GET /api/outings/:id`
- `POST /api/saved`
- `DELETE /api/saved/:id`
- `GET /api/admin/imports`
- `PATCH /api/admin/imports/:id`
- `POST /api/admin/events`
- `POST /api/admin/places`

## Database

Core tables:

- places
- events
- event_locations
- sources
- imports
- saved_items
- users

Important indexes:

- PostGIS index on place location.
- Event start time index.
- Category index.
- Source freshness index.
- Duplicate helper indexes on normalized title, date, source URL, and place.

Public discovery should expose a unified outing read model that combines published events and evergreen places.

## Data Freshness

Every event should carry:

- source_url
- source_name
- external_id
- last_fetched_at
- last_seen_at
- last_verified_at
- confidence_status

Recommended confidence statuses:

- verified
- imported
- needs_review
- stale
- rejected

Public cards should show `last_verified_at` when present. If only fetched data exists, the UI should clearly say imported or source-check needed.

## Admin Flow

1. Fetch source data into `imports.raw_payload`.
2. Normalize into `imports.normalized_payload`.
3. Detect possible duplicates by source URL, normalized title, date/time, and nearby location.
4. Admin approves, edits, merges, rejects, or marks needs review.
5. Only published records appear publicly.
6. Stale or missing-date records are hidden or clearly marked.

## Implementation Order

1. Keep improving the static prototype until the first UX is agreed.
2. Add real seed data in JSON or SQLite for validation.
3. Scaffold Next.js once package tooling is available.
4. Add PostgreSQL/PostGIS schema.
5. Build search API.
6. Connect list/map UI to API.
7. Build admin review queue.
8. Add source ingestion one provider at a time.

For MVP, keep saved items in local storage unless accounts are required for weekly digest or cross-device sync.

## Risks

- Stale event data can destroy trust quickly.
- Automated scraping can be brittle across city/library websites.
- Map API costs should be watched early.
- Parent-submitted tips need moderation before public display.
