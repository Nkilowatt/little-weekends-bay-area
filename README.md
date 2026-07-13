# Little Weekends Bay Area

Working alpha for a Bay Area toddler outings service. It helps parents of 1-3 year olds browse toddler-friendly story times, parks, indoor play, museums, and seasonal activities through list and map views.

## Primary Service

- Live site: https://little-weekends-bay-area.cashmire2.chatgpt.site
- Access: public
- Runtime: OpenAI Sites Worker with a D1-backed `/api/outings` endpoint
- Data refresh: six official event sources, refreshed on a six-hour schedule

The UI remains lightweight HTML, CSS, and JavaScript. OpenAI Sites serves those assets and the same-origin event API. A static fallback remains available when the API is delayed.

The current P0.5 experience includes structured 1-3 age filtering, selectable Bay Area origin hubs with recalculated distances, structured trust states, recommendation scoring that favors toddler-specific and practical options, and 21 human-reviewed evergreen places across the Bay Area.

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

The service combines automatically collected official events with 21 curated evergreen places. Automatic collection is not the same as human verification, so every event retains its official source and per-source freshness status. Ended events are removed using a structured end time, and stale source records are downgraded to recheck status.
