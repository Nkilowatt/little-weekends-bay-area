# Data Plan v1

## Seed Strategy

Start with a curated database before relying on automation. The first data set should include 30-50 high-confidence places and 20-40 recurring event sources.

Recommended initial coverage:

- San Francisco.
- San Mateo County and Peninsula.
- South Bay libraries and museums.

Each seed record should include practical parent details, not only name and address.

## Source Categories

Primary source categories:

- Public library event calendars.
- City parks and recreation calendars.
- County park pages.
- Children's museums and science centers.
- Indoor play spaces.
- Seasonal farm and holiday event pages.
- Parent-submitted recommendations after MVP.

## Example Official Sources

Verified source examples to seed first:

- San Francisco Public Library early-childhood events: https://sfpl.org/events?field_event_audience_target_id=26
- San Francisco Public Library locations: https://sfpl.org/locations
- San Jose Public Library storytimes: https://www.sjpl.org/storytimes/
- Palo Alto City Library storytimes: https://library.cityofpaloalto.org/program-storytimes/
- Sunnyvale kids events: https://www.library.sunnyvale.ca.gov/events/kids-events
- Santa Clara City Library storytime: https://www.sclibrary.org/kids-teens/kids/storytime
- Santa Clara City Library official events RSS: https://www.santaclaraca.gov/Home/Components/RssFeeds/RssFeed/View?id=12
- Campbell Library events: https://sccl.bibliocommons.com/v2/events?locations=CA
- City of Campbell community calendar: https://www.campbellca.gov/calendar.aspx
- Los Gatos Library events: https://losgatosca.libcal.com/calendar?cid=11830
- Town of Los Gatos calendar: https://www.losgatosca.gov/calendar.aspx
- City of San Mateo children's programs and storytimes: https://www.cityofsanmateo.org/4256/Childrens-Programs-and-Storytimes
- South San Francisco Toddler Storytime: https://www.ssfca.gov/Events/0226-Toddler-Storytime
- Santa Clara County Library District location/event pages: https://sccld.org/
- Palo Alto Junior Museum & Zoo: https://www.paloaltozoo.org/
- CuriOdyssey: https://curiodyssey.org/
- San Mateo County Parks: https://www.smcgov.org/parks
- Children's Discovery Museum of San Jose events: https://www.cdm.org/events/
- Bay Area Discovery Museum programs: https://bayareadiscoverymuseum.org/programs/
- Filoli families and kids: https://filoli.org/visit/families-kids/
- Hidden Villa family programs: https://www.hiddenvilla.org/programs/individuals-families/

## Seed Data Fields

Minimum place fields:

- name
- category
- address
- city
- latitude
- longitude
- official_url
- recommended_min_age
- recommended_max_age
- indoor_outdoor
- price_level
- parking_notes
- bathroom_notes
- stroller_notes
- parent_tips
- last_reviewed_at

Minimum event fields:

- name
- place_id
- starts_at
- ends_at
- category
- recommended_min_age
- recommended_max_age
- price
- price_min
- price_max
- price_note
- reservation_required
- registration_url
- capacity_limited
- drop_in_allowed
- source_url
- source_name
- external_id
- age_label_raw
- confidence_status
- last_fetched_at
- last_seen_at
- last_verified_at
- status

Optional recurrence fields:

- recurrence_rule
- recurrence_exception_dates
- is_recurring_instance

## Ingestion Cautions

- Library calendars often have structured recurring events, but page formats vary by city.
- Some event pages are stale or reuse old URLs, so every imported event needs a freshness timestamp.
- Seasonal events can change hours and ticket rules quickly.
- Do not show unverified events as confirmed.
- Always expose the official source link.

## Recommended First Batch

First place batch:

- 10 libraries with strong toddler programming.
- 10 parks/playgrounds with toddler-friendly equipment.
- 5 indoor play spaces.
- 5 museums/science centers.
- 5 seasonal/nature outing categories.

First event batch:

- Storytime events from SFPL, San Mateo, South San Francisco, Redwood City, and Santa Clara County libraries.
- Museum toddler hours where official schedules are clear.
- A small set of seasonal weekend events that can be manually verified.

## Batch Order

1. 15-20 library systems, branches, or recurring storytime calendars.
2. 15-20 standing places such as toddler-friendly playgrounds, museums, zoos, and county parks.
3. 8-12 seasonal or nature sources.
4. 5-10 indoor or rainy-day venues, manually reviewed first.

Aggregators and parent blogs should be treated as discovery leads. Public listings should use the official venue, city, or library source whenever possible.
