# Schema and Microdata Field Specification

This document fixes the field contract required to generate structured data for `someticket.com`.

The site uses JSON-LD rather than inline microdata attributes, but the data requirements are the same. These fields should exist in Markdown front matter so templates can generate consistent schema.org output.

## Universal fields for all pages

These fields support `WebPage`, `CollectionPage`, `MusicGroup`, `Place`, `FAQPage`, and `BreadcrumbList`.

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | string | yes | Public page name and schema `name` |
| `slug` | string | yes | URL identity |
| `url` | string | yes | Final output URL when explicitly controlled |
| `page_type` | string | yes | Template and page logic selector |
| `entity_type` | string | yes | Schema mapping selector |
| `status` | string | yes | Publication state |
| `description_short` | string | yes | Fallback visible intro and schema description |
| `seo.title` | string | yes | Search title |
| `seo.description` | string | yes | Search description |
| `seo.canonical` | string | yes | Canonical URL |
| `seo.image` | string | recommended | Open Graph and schema image |
| `seo.noindex` | boolean | yes | Indexing control |
| `schema.type` | string | yes | Schema.org output type |
| `schema.description` | string | recommended | Schema description override |
| `breadcrumbs[]` | array | recommended | Breadcrumb and `BreadcrumbList` data |

## Event fields

These are the core fields needed for valid event structured data.

| Field | Type | Required | Schema target |
| --- | --- | --- | --- |
| `event.start_date` | ISO 8601 string | yes | `startDate` |
| `event.end_date` | ISO 8601 string | recommended | `endDate` |
| `event.door_time` | ISO 8601 string | optional | supporting display data |
| `event.status` | string | yes | local event state |
| `event.age_restriction` | string | optional | visible event detail |
| `schema.attendance_mode` | URL string | yes | `eventAttendanceMode` |
| `schema.event_status` | URL string | yes | `eventStatus` |
| `schema.images[]` | array | recommended | `image` |
| `performers[]` | array of strings | yes | `performer` |
| `organizer.name` | string | recommended | `organizer.name` |
| `organizer.url` | string | optional | `organizer.url` |

## Place and address fields

Required when the page represents a venue or event.

| Field | Type | Required | Schema target |
| --- | --- | --- | --- |
| `location.name` | string | yes | `location.name` |
| `location.city` | string | recommended | visible context |
| `location.region` | string | optional | visible context |
| `location.address.street` | string | recommended | `streetAddress` |
| `location.address.city` | string | yes for events | `addressLocality` |
| `location.address.region` | string | recommended | `addressRegion` |
| `location.address.postal_code` | string | optional | `postalCode` |
| `location.address.country` | string | yes for events | `addressCountry` |
| `location.geo.latitude` | string | optional | `GeoCoordinates.latitude` |
| `location.geo.longitude` | string | optional | `GeoCoordinates.longitude` |

## Offer fields

Required for ticket offer markup and aggregator comparisons.

| Field | Type | Required | Schema target |
| --- | --- | --- | --- |
| `offers.currency` | string | yes | `priceCurrency` |
| `offers.price_from` | string or number | yes | `price` |
| `offers.price_to` | string or number | optional | visible range |
| `offers.ticket_url` | string | yes | `offers.url` |
| `offers.schema_availability` | URL string | yes | `availability` |
| `offers.sources[]` | array | optional | visible comparison cards |
| `offers.sources[].name` | string | optional | source label |
| `offers.sources[].availability` | string | optional | visible availability |
| `offers.sources[].notes` | string | optional | visible source notes |

## Entity-specific fields

### Artist pages

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `artist.name` | string | recommended | explicit artist identity |
| `artist.genre[]` | array | optional | visible genre context |
| `artist.same_as[]` | array | optional | external identity references |

### City pages

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `location.city` | string | yes | city identity |
| `location.region` | string | recommended | regional grouping |
| `location.country` | string | recommended | geo context |

### Venue pages

Use the place and address fields above. Venue pages should map to `Place`-oriented schema if they are primarily venue identity pages.

### Category, region, and landing pages

These pages usually map to `CollectionPage` and need strong relationship fields more than object-level schema fields.

## Relationship fields

These are not always directly emitted into schema, but they are required to build related links, breadcrumbs, and future item lists.

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `relationships.city` | string | conditional | connect to city hub |
| `relationships.region` | string | conditional | connect to region hub |
| `relationships.category` | string | conditional | connect to category hub |
| `relationships.artist` | string | conditional | connect to artist hub |
| `relationships.venue` | string | conditional | connect to venue hub |
| `relationships.cities[]` | array | optional | list relationships |
| `relationships.categories[]` | array | optional | list relationships |
| `relationships.artists[]` | array | optional | list relationships |
| `relationships.venues[]` | array | optional | list relationships |

## Media fields

These fields are used for visual rendering. They are independent from structured data but should be included in the content contract so pages render well when artwork exists and still degrade gracefully when it does not.

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `media.hero.src` | string | optional | primary hero image |
| `media.hero.alt` | string | recommended | accessible hero alt text |
| `media.card.src` | string | optional | card image override |
| `media.card.alt` | string | recommended | accessible card alt text |

If `media.hero.src` and `media.card.src` are both absent, templates should render a placeholder visual instead of leaving an empty space.

## FAQ fields

FAQ data supports both visible content and `FAQPage` schema if enabled later.

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `faq[]` | array | optional | FAQ block source |
| `faq[].question` | string | yes when FAQ exists | question text |
| `faq[].answer` | string | yes when FAQ exists | answer text |

## Recommended publishing rule

Do not publish an indexable event page unless at least these fields exist:

- `title`
- `slug`
- `url`
- `page_type: event`
- `entity_type: event`
- `seo.title`
- `seo.description`
- `seo.canonical`
- `schema.type`
- `schema.attendance_mode`
- `schema.event_status`
- `event.start_date`
- `location.name`
- `location.address.city`
- `location.address.country`
- `offers.currency`
- `offers.price_from`
- `offers.ticket_url`
- `offers.schema_availability`

## Example source files using this contract

- `/Users/vvm/someticket.com/content/hubs/rock.md`
- `/Users/vvm/someticket.com/content/hubs/new-york.md`
- `/Users/vvm/someticket.com/content/hubs/beatles.md`
- `/Users/vvm/someticket.com/content/landings/new-york-rock.md`
- `/Users/vvm/someticket.com/content/events/beatles-at-msg-june-12-2026.md`
