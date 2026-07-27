# Little Weekends Bay Area

Working alpha for a Bay Area toddler outings service. It helps parents of 1-3 year olds browse toddler-friendly story times, parks, indoor play, museums, and seasonal activities through list and map views.

## Primary Service

- Live site: https://little-weekends-bay-area.cashmire2.chatgpt.site
- Access: public
- Runtime: OpenAI Sites Worker with a D1-backed `/api/outings` endpoint
- Data refresh: 28 official event sources, refreshed on a six-hour schedule

The UI remains lightweight HTML, CSS, and JavaScript. OpenAI Sites serves those assets and the same-origin event API. A static fallback remains available when the API is delayed.

The current experience includes structured 1-3 age filtering, selectable Bay Area origin hubs including San Francisco, Redwood City, Menlo Park, Palo Alto, Mountain View, Sunnyvale, Cupertino, Santa Clara, Campbell, and Los Gatos, event-first date groups, a dedicated no-event-needed discovery mode, region/time/reservation/amenity filters, concise recommendation reasons, actionable empty states, nearby alternatives, sharing, and 128 human-reviewed evergreen places across the Bay Area. Fourteen named destinations now use manually matched, reusable-license actual-place photos with visible creator, license, and original-source attribution. Places without a verified match keep the existing category fallback and are explicitly labeled `활동 예시`. Mobile discovery keeps search visible, uses a compact hero, and prioritizes directions and official information in the detail action bar. A nine-scene contextual photo banner adds a warmer family moment without implying that generated activity imagery depicts a named venue; its scene stays stable for the same Pacific date, origin city, and discovery context.

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

The service combines automatically collected official events with 128 curated evergreen places, including 91 park and playground records across 26 Bay Area cities. San Francisco coverage combines SFPL's branch-level early-childhood calendar with Recreation and Parks family events, plus six human-reviewed SFPL branches. South Peninsula and West Valley coverage includes Palo Alto City Library, Menlo Park and Belle Haven libraries, Mountain View Public Library, Sunnyvale Public Library, Cupertino Library, all three Santa Clara City Library branches, Campbell Library, Los Gatos Library, city-level playground density in the same core cities, and separate city/town family calendars. Sunnyvale keeps its official kids calendar separate from the city calendar so storytimes and local family events remain complete without duplicates. Automatic collection is not the same as human verification, so every event retains its official source and per-source freshness status. Ended events are removed using a structured end time, Redwood City's 11:59 PM placeholder endings are normalized to practical program durations, and stale source records are downgraded to recheck status. Actual-place photos are assigned only through the reviewed ID and exact-venue alias registry in `place-images.js`; the remaining category imagery is labeled as an activity example.
