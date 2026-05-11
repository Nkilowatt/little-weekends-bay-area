# UX Spec v1

## Product Posture

The app should feel like a practical decision tool for tired parents, not a broad event marketplace. The first screen should answer "what can we do soon?" with minimal configuration.

## MVP Navigation

Primary views:

- Home discovery.
- List/map results.
- Detail panel.
- Admin review.

For MVP, home and results can live on one screen: parents set location/date, browse results, then switch between list, map, or split view.

## Home Discovery

Required components:

- Location input.
- Optional search input for story time, parks, indoor play, and venues.
- Quick date chips: today, this week, weekend, anytime.
- Compact filters: distance, type, indoor/outdoor, price.
- Advanced filters behind a secondary filter control.
- Recommendation summary.
- List/map toggle.

Default state:

- Use a remembered location when available.
- Default date should be "today."
- Default distance should be broad enough to avoid an empty first screen.

## Result Cards

Each card should show:

- Name.
- Time or "always available."
- Distance.
- City.
- Free/paid.
- Age fit.
- Indoor/outdoor.
- Reservation status.
- Freshness or confidence status.
- One parent-useful reason to go.

The reason line matters because parents are not just comparing events. They are deciding if the outing fits a toddler's energy, nap window, and logistics.

## Map View

Map pins should use stable category markers:

- Storytime.
- Park/playground.
- Indoor play.
- Museum.
- Seasonal event.

Selecting a pin should open the same detail panel as selecting a list card.

## Detail Panel

The detail page should answer "is this worth the effort?"

Show:

- Official source link.
- Last updated or verification status.
- Time/hours.
- Address.
- Age fit.
- Price.
- Reservation requirement.
- Parking notes.
- Bathroom notes.
- Stroller notes.
- Parent tips.
- Nearby alternatives, especially when the current event is imported or stale.

## Empty States

Empty result copy should suggest the next useful action:

- Expand distance.
- Change date.
- Include both indoor and outdoor.
- Show anytime places.

For no events today, the product should automatically surface good anytime places rather than leaving the screen empty.

## Admin Review

Admin should support:

- Imported queue.
- Duplicate warnings.
- Manual edit.
- Source freshness.
- Confidence status.
- Missing required fields.

The data quality workflow is part of the UX because stale events will quickly break parent trust.

## MVP Defaults

Recommended visible filters for the first mobile release:

- Today.
- Distance.
- Indoor.
- Free.

Advanced filters:

- Age.
- Type.
- Reservation.
- Bathrooms known.
- Stroller-friendly.

Saved items can start in local storage unless weekly email, SMS digest, or cross-device sync is required at launch.
