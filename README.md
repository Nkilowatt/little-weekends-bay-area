# Little Weekends Bay Area

Prototype for a Bay Area toddler outings service. It helps parents of 1-3 year olds browse toddler-friendly story times, parks, indoor play, museums, and seasonal activities through a list and map-style view.

## Current Prototype

This version is a dependency-free static web app:

- `index.html`
- `styles.css`
- `app.js`

It does not need npm, Next.js, or a database yet.

## Run Locally

```bash
python3 -m http.server 4173
```

Then open:

```txt
http://localhost:4173
```

## Share With Testers

Best path for friend testing:

1. Deploy the static site with Netlify Drop, Vercel, or GitHub Pages.
2. Send the public URL with the tester message in `FRIEND_TESTING_MESSAGE.md`.
3. Ask testers to try it on mobile first.
4. Collect feedback on whether they can decide where to go within 10 seconds.

## Product Docs

- `PRD.md`: product requirements
- `UX_SPEC.md`: UX recommendations
- `DATA_PLAN.md`: seed data and source strategy
- `TECHNICAL_PLAN.md`: production architecture direction
- `PROJECT_HANDOFF.md`: current state and new-session handoff
- `ROADMAP.md`: prioritized future work

## Important Prototype Note

The listed outings are sample seed records. Before a real launch, every event should show an official source link, freshness status, and human-reviewed confidence state.
