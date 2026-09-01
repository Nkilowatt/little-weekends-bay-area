# Little Weekends Bay Area

Working alpha for Bay Area families with children from birth through age 6. It helps parents compare age-appropriate story times, parks, indoor play, museums, and seasonal activities through list and map views.

## Primary Service

- Live site: https://little-weekends-bay-area.cashmire2.chatgpt.site
- Access: public
- Runtime: OpenAI Sites Worker with a D1-backed `/api/outings` endpoint
- Data refresh: 30 official event sources with a six-hour freshness window and a daily production refresh check

The UI remains lightweight HTML, CSS, and JavaScript. OpenAI Sites serves those assets and the same-origin event API. A static fallback remains available when the API is delayed.

The current experience includes a prominent family-age profile with per-child year-and-month filtering for ages 0–6, strict all-children matching with clearly separated partial-fit alternatives, selectable Bay Area origin hubs, event-first date groups, a dedicated no-event-needed discovery mode, region/time/reservation/amenity filters, local-only private place notes, sharing, and 128 human-reviewed evergreen places. Approved visitor photos can augment the existing actual-place, Google Places, Street View, and clearly labelled activity-example image tiers. Visitor uploads accept JPEG, PNG, and WebP originals up to 30MB; large or high-resolution photos are automatically optimized in the browser, then decoded, resized to at most 1600px, and re-encoded as metadata-free WebP inside the Worker before moderation. Retries can recover the same submission and withdrawal token, and public reports enter a dedicated reviewer queue. The upload controls appear only when D1, R2, the reviewer allowlist, and the production feature flag are all ready.

The old Netlify URL is a legacy entry point. Once the current Git history is reconciled and pushed, Netlify will redirect visitors to the OpenAI Sites deployment.

## Run Locally

For the static UI fallback:

```bash
python3 -m http.server 4173
```

For the Sites build, use the Node version declared in `package.json` and run:

```bash
npm run build
```

The Google image tier is optional and disabled without a server-side key. Configure `GOOGLE_MAPS_API_KEY` only in the Sites runtime environment, restrict it to the Places API (New) and Street View Static API, set conservative quotas and billing alerts, and keep it out of client code and Git. If the hosting provider offers stable outbound IPs, add an IP application restriction; do not add a browser-referrer restriction to a server-side key.

## Share With Testers

Use the OpenAI Sites URL for all friend testing:

1. Send `https://little-weekends-bay-area.cashmire2.chatgpt.site` with the tester message in `FRIEND_TESTING_MESSAGE.md`.
2. Ask testers to try it on mobile first.
3. Collect feedback on whether they can decide where to go within 10 seconds.

## Product Docs

- `DESIGNER_BRIEF_KO.md`: Korean product and redesign brief for design collaborators
- `PRD.md`: product requirements
- `UX_SPEC.md`: UX recommendations
- `DATA_PLAN.md`: seed data and source strategy
- `TECHNICAL_PLAN.md`: production architecture direction
- `PROJECT_HANDOFF.md`: current state and new-session handoff
- `ROADMAP.md`: prioritized future work

## Important Prototype Note

The service combines automatically collected official events with 128 curated evergreen places, including 91 park and playground records across 26 Bay Area cities. San Francisco coverage combines SFPL's branch-level early-childhood calendar with Recreation and Parks family events, plus six human-reviewed SFPL branches. Redwood City combines its citywide and dedicated Library RSS feeds so recreation listings cannot crowd branch programs out of the capped city feed. San Mateo County Libraries are fetched by child audience and branch, including three exact-date pages each for Belmont, Foster City, San Carlos, and Millbrae plus two pages for nine additional Peninsula branches. South San Francisco supports the library's current branch-table schedule, and Menlo Park combines exact dated event cards with the published weekly storytime schedule. South Peninsula and West Valley coverage includes Palo Alto City Library, Mountain View Public Library, Sunnyvale Public Library, Cupertino Library, Santa Clara City Library, Campbell Library, Los Gatos Library, and separate city/town family calendars. San Jose Public Library and Oakland Public Library add child-audience exact-date feeds. A production monitor opens the API daily with a cache-busting request; the API refreshes stale or unhealthy sources on demand against a six-hour freshness window. Automatic collection is not the same as human verification, so every event retains its official source and per-source freshness status. Ended events are removed using a structured end time, Redwood City's 11:59 PM placeholder endings are normalized to practical program durations, and stale source records are downgraded to recheck status. Actual-place photos are assigned through the reviewed ID and exact-venue alias registry in `place-images.js` first. A server-side provider may then match a curated catalog place to Google Places or Street View using its name, address, and coordinates. Dynamic events inherit remote imagery only when they exactly match a curated venue and city or address. The remaining category imagery is labeled as an activity example.
