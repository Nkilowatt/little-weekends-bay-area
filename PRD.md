# Little Weekends 0–6 Family Outings PRD v2

## 1. Product Summary

Little Weekends is a local discovery service for parents and caregivers of children from birth through 6 years 11 months in the Bay Area. It helps them quickly find age-appropriate places and events such as library story times, seasonal events, parks, indoor play spaces, museums, farms, and community programs.

The core experience is simple: open the app, optionally add each child's age in years and months, see options that fit every child near you for today, this week, or an upcoming weekend, then switch between a list and map view to decide where to go.

## 2. Target Users

### Primary User

Parents of one or more children ages 0–6 living in the Bay Area who regularly need ideas for short, enriching outings.

Common traits:

- Has limited planning time.
- Wants safe, age-appropriate places.
- Often decides the same day or the night before.
- Cares about distance, parking, bathrooms, stroller access, nap timing, and whether an event is free.
- Finds current information scattered across library websites, city calendars, Instagram, parent groups, and venue pages.

### Secondary Users

- Nannies and grandparents.
- Parents visiting the Bay Area with babies, toddlers, and preschoolers.
- Parent groups planning weekday or weekend meetups.

## 3. Problem

Parents know there are many good toddler-friendly activities in the Bay Area, but discovery is fragmented and repetitive.

They often need to check many different sources:

- Library event calendars.
- City recreation pages.
- Park pages.
- Museum event pages.
- Indoor play space websites.
- Seasonal event listings.
- Social media posts.
- Word-of-mouth parent groups.

The result is decision fatigue. Parents spend valuable time searching instead of confidently choosing an outing.

## 4. Product Goal

Make it effortless for Bay Area parents of children ages 0–6 to answer:

- Where can I take my child today?
- What is happening this week near me?
- What is worth planning for this weekend?
- Which places are good even when there is no scheduled event?

## 5. MVP Scope

### MVP User Experience

The first version should support four primary flows:

1. Browse outings for babies, toddlers, and preschoolers near a selected location.
2. Filter by date, distance, age fit, indoor/outdoor, free/paid, and event/place type.
3. View results as a list or map.
4. Open a detail page with practical parent information.

### MVP Content Types

The MVP should support two types of records:

#### Event

A scheduled activity with a date and time.

Examples:

- Library story time.
- Toddler music class.
- Seasonal festival.
- Museum toddler hour.
- Community center activity.

#### Place

A standing location that is useful even without a scheduled event.

Examples:

- Park.
- Playground.
- Indoor play space.
- Children's museum.
- Farm or garden.
- Walkable waterfront or family-friendly public space.

### MVP Geography

Start with a focused Bay Area launch zone before expanding.

Recommended v1 coverage:

- San Francisco.
- Peninsula: Daly City through Palo Alto.
- South Bay: Mountain View, Sunnyvale, Santa Clara, San Jose.
- East Bay can be added once ingestion and moderation workflows are stable.

This keeps data quality manageable while still serving a large parent audience.

## 6. Key Features

### Home

The home screen should answer "what can we do soon?" without making the parent configure many settings.

Default modules:

- Today nearby.
- This week.
- Weekend picks.
- Good anytime places.
- Rainy day indoor options.

### List View

Each result card should show:

- Name.
- Type: story time, park, indoor play, seasonal event, museum, etc.
- Date and time if scheduled.
- Neighborhood or city.
- Distance from selected location.
- Recommended age range.
- Price indicator.
- Reservation requirement.
- Indoor/outdoor badge.
- A short parent-useful reason to go.

### Map View

Map pins should be easy to scan, with color or icon differences for:

- Events.
- Parks/playgrounds.
- Indoor spaces.
- Museums/classes.
- Seasonal activities.

The map should sync with the list. Selecting a pin opens a compact preview card.

### Detail Page

Each detail page should include:

- Name.
- Photos when available.
- Address.
- Date/time for events.
- Hours for places.
- Age fit.
- Price.
- Reservation or ticket link.
- Official source link.
- Last updated timestamp.
- Parking notes.
- Bathroom availability when known.
- Stroller friendliness when known.
- Indoor/outdoor.
- Parent tips.

### Filters

MVP filters:

- Date: today, tomorrow, this weekend, custom date.
- Distance: 1, 3, 5, 10, 25 miles.
- Family age: add up to eight children in years and months (0–83 months); with no ages selected show the whole 0–6 catalog, otherwise require every child to fit the activity range.
- Type: story time, park/playground, indoor play, museum, music, seasonal, outdoor nature.
- Price: free, paid, any.
- Indoor/outdoor.
- Reservation required.

### Saved Places And Events

Users should be able to save an outing for later.

MVP can store this locally or in a lightweight user account depending on launch strategy.

## 7. Differentiators

Most event discovery products are too broad. This service should win by being parent-specific and by handling the real constraints of 0–6 families, including siblings at different ages.

Strong differentiators:

- Month-level age curation for 0–6 year olds and strict multi-child fit.
- Practical outing context, not just event titles.
- Mixed event and place discovery.
- Real-time freshness signals.
- Parent-friendly filters such as nap-time window, indoor/rainy day, stroller access, and bathrooms.
- Map plus list, not one or the other.

## 8. Data Strategy

### Data Sources

Potential source categories:

- Public library calendars.
- City parks and recreation calendars.
- Museum and cultural institution calendars.
- Venue websites for indoor play spaces and toddler classes.
- Public event listing platforms.
- Manually curated parent recommendations.
- User submissions after launch.

### Data Ingestion Approach

MVP should use a hybrid approach:

1. Seed the database manually with high-quality places.
2. Add scheduled event ingestion from known reliable sources.
3. Add human review for imported events before showing them broadly.
4. Show source links and last-updated timestamps to build trust.

### Freshness Requirements

Events should include:

- Source URL.
- Last fetched timestamp.
- Last verified timestamp if manually checked.
- Confidence status: verified, imported, needs review.

Places should include:

- Last reviewed date.
- Official website or city page.
- Known amenities and parent notes.

## 9. Trust And Safety

The app must avoid implying that an event is definitely happening when the source is stale.

Rules:

- Show the official source link on every event.
- Surface "last updated" clearly.
- Mark uncertain details instead of hiding uncertainty.
- Avoid reviews that rank safety without evidence.
- Use parent tips as practical notes, not guarantees.

## 10. MVP Technical Architecture

### Frontend

Recommended:

- Next.js web app.
- Responsive mobile-first design.
- Mapbox or Google Maps for map view.
- Server-rendered or statically cached discovery pages where possible.

### Backend

Recommended:

- PostgreSQL with PostGIS for geospatial search.
- API layer for search, filters, event details, saved items, and admin moderation.
- Background jobs for source fetching and refresh checks.

### Admin

An internal admin view is important even for MVP.

Admin capabilities:

- Create/edit places.
- Create/edit events.
- Review imported events.
- Mark duplicates.
- Set confidence status.
- View stale sources.

### Search

MVP search should support:

- Location radius query.
- Date range query.
- Category filters.
- Text search by name, city, and type.

## 11. Core Data Model

### Place

- id
- name
- description
- address
- city
- neighborhood
- latitude
- longitude
- category
- recommended_min_age
- recommended_max_age
- indoor_outdoor
- price_level
- official_url
- reservation_url
- parking_notes
- bathroom_notes
- stroller_notes
- parent_tips
- last_reviewed_at
- created_at
- updated_at

### Event

- id
- place_id
- name
- description
- starts_at
- ends_at
- category
- recommended_min_age
- recommended_max_age
- price
- reservation_required
- official_url
- source_url
- source_name
- confidence_status
- last_fetched_at
- last_verified_at
- created_at
- updated_at

### SavedItem

- id
- user_id
- item_type
- item_id
- created_at

### Source

- id
- name
- source_type
- base_url
- fetch_strategy
- refresh_frequency
- last_success_at
- last_failure_at
- notes

## 12. UX Principles

1. Parents should get useful options within 10 seconds.
2. The app should avoid overwhelming users with too many filters up front.
3. List and map should feel like two views of the same decision, not separate modes.
4. Every listing should explain why it is relevant to the selected family ages.
5. Freshness and uncertainty should be visible.
6. The product should feel calm, practical, and trustworthy, not like a generic event marketplace.

## 13. MVP Screens

### Screen 1: Home Discovery

Purpose:

Help parents immediately see good options.

Primary components:

- Location selector.
- Date selector.
- Quick filters.
- Curated sections.
- Toggle between list and map.

### Screen 2: Search Results

Purpose:

Let parents compare options.

Primary components:

- Filter bar.
- Sort options: soonest, nearest, recommended.
- List cards.
- Map panel or map toggle.

### Screen 3: Detail

Purpose:

Answer "is this worth going to?"

Primary components:

- Event/place summary.
- Practical details.
- Official source link.
- Save/share actions.
- Nearby alternatives.

### Screen 4: Admin Review

Purpose:

Keep data quality high.

Primary components:

- Imported event queue.
- Duplicate detection.
- Source freshness status.
- Manual edit form.

## 14. Success Metrics

### MVP Metrics

- Weekly active users.
- Searches per user.
- Detail page opens.
- Save rate.
- Official source link clicks.
- Return usage within 7 days.
- Percentage of events with verified source links.
- Percentage of stale events.

### Qualitative Metrics

- Do parents trust the listings?
- Did the app help them decide faster?
- Are the recommendations age-appropriate?
- Which missing details most often block a decision?

## 15. Launch Plan

### Phase 0: Validation

- Interview 8-12 Bay Area parents of 1-3 year olds.
- Ask them to show how they currently find outings.
- Identify top cities and source types.
- Validate which filters matter most.

### Phase 1: Concierge MVP

- Build curated database for a narrow region.
- Publish list/map web app.
- Manually update weekly events.
- Collect parent feedback.

### Phase 2: Semi-Automated Data

- Add source ingestion for reliable calendars.
- Add admin review queue.
- Add freshness indicators.
- Expand city coverage.

### Phase 3: Personalization

- Add user accounts.
- Saved items.
- Weekly digest.
- Personalized recommendations by location, child age, and preferences.

### Phase 4: Community Layer

- Parent submissions.
- Practical tips.
- Verified corrections.
- Lightweight ratings for usefulness, not generic popularity.

## 16. Open Questions

- Should the first launch focus on SF/Peninsula or South Bay?
- Should saved items require accounts in MVP?
- Which map provider is preferred based on cost and UX?
- How much event ingestion should be automated before launch?
- Should there be a weekly email or SMS digest from day one?
- What is the moderation standard for parent-submitted tips?

## 17. Recommended Next Step

The next step is to produce three parallel workstreams:

1. UX concept: wireframes for home, list/map, and detail screens.
2. Data plan: first 30-50 seed places and first event source list.
3. Technical plan: repository scaffold, database schema, API design, and frontend stack.

Once PRD v1 is accepted, subagents can be assigned to these streams while the main implementation proceeds.
