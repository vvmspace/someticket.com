# AGENTS Beta for someticket.com

This document is a working draft for a future `AGENTS.md`. It defines the current architectural direction for `someticket.com`, a static ticket aggregation website designed for scalable content generation and green-zone Lighthouse targets.

The file should be updated as the architecture evolves.

## Project intent

- Build a static ticket aggregation website.
- Support many event sources and aggregators.
- Keep the content model flexible enough for large-scale ingestion later.
- Prioritize metadata quality, internal linking, content quality, and performance from the start.
- Use English as the site language.

## Core architecture principles

### Flexible file structure

Content storage may be organized in whatever folder layout is most practical for operations, imports, and editorial work.

Folder location is not the source of truth for how a page behaves.

Page behavior is determined by front matter fields inside each Markdown file.

### Type-driven rendering

Each Markdown file must declare its role explicitly through front matter. The minimum required identity fields are:

```yaml
title: "New York Event Tickets"
slug: "new-york"
page_type: "hub"
entity_type: "city"
layout_key: "hub"
status: "published"
```

The rendering system should use these values to select:

- layout
- metadata logic
- schema.org type
- navigation context
- internal linking blocks
- related entities
- canonical rules
- indexability rules

### URL philosophy

The site should support short, strong hub URLs at the root level where appropriate.

Current active examples:

- `/new-york/`
- `/madison-square-garden/`

The site should also support deeper URLs for scalable event coverage:

- `/events/hadestown-walter-kerr-theatre-march-03-2026/`

Short URLs are preferred for evergreen hubs. Deeper URLs are preferred for large sets of specific events and long-tail combinations.

### Root-level hubs plus deeper listings

The intended model is hybrid:

- root-level hubs for major entities
- deeper landing pages only when current content depth justifies them
- event detail pages under a dedicated event namespace unless a later decision changes that

This preserves URL quality while keeping the system scalable.

## Primary content model

### Page types

The current baseline `page_type` values are:

- `home`
- `hub`
- `landing`
- `event`
- `guide`
- `faq`
- `static`

Definitions:

- `home`: site homepage
- `hub`: evergreen entity landing page
- `landing`: cross-entity landing page such as city + category or city + artist
- `event`: specific event detail page
- `guide`: editorial article
- `faq`: standalone FAQ page
- `static`: trust, legal, and other fixed pages

### Entity types

The current baseline `entity_type` values are:

- `city`
- `region`
- `category`
- `artist`
- `venue`
- `event`
- `intersection`
- `collection`
- `guide`
- `page`

Examples:

- `/new-york/` -> `page_type: hub`, `entity_type: city`
- `/madison-square-garden/` -> `page_type: hub`, `entity_type: venue`
- `/events/hadestown-walter-kerr-theatre-march-03-2026/` -> `page_type: event`, `entity_type: event`

### Featured-focus model: highlighted one + list

Each hub or landing page may (not should) promote a chosen primary focus item. This can be:

- a featured event
- a featured artist
- a featured venue
- a featured city
- a featured category
- a featured collection

This lets a broad page stay evergreen while still emphasizing a specific conversion target or topical priority.

## Quality priorities

The site architecture should always bias toward:

- indexable, useful landing pages
- strong internal linking between hubs, landings, and events
- schema.org coverage based on page and entity type
- canonical and noindex discipline
- low-JS, fast-rendering templates
- strong Core Web Vitals
- green-zone Lighthouse targets for Performance, Best Practices, and Accessibility

Thin, duplicate, or near-empty pages should not be indexable by default.

## Markdown contract direction

The architecture should move toward a universal front matter contract with:

- global fields shared across all pages
- page-type-specific fields
- entity-type-specific fields
- metadata fields
- relationship fields
- content block configuration

Minimum universal fields currently expected:

```yaml
title:
slug:
page_type:
entity_type:
status:
seo:
navigation:
relationships:
content_blocks:
```

At a minimum, every page must define:

- `title`
- `slug`
- `page_type`
- `entity_type`

## Planned content classes

The system should support the following major classes of content:

- homepage
- city hubs
- region hubs
- category hubs
- artist hubs
- venue hubs
- intersection landings
- event detail pages
- curated collections
- guides
- FAQ and trust pages

## Implementation direction

The project should be implemented around parameter-driven templates instead of folder-driven assumptions.

Expected implementation themes:

- layouts chosen by `page_type`
- component variations chosen by `entity_type`
- metadata partials driven by normalized front matter
- schema partials driven by type mapping
- structured content blocks configurable from Markdown

## Content operations direction

The repository should gradually include:

- examples of Markdown files for each major page type
- prompt templates for future content generation
- guidance for human or automated content ingestion
- validation rules for required fields
- metadata quality checks
- schema and microdata field specifications
- working template examples

## Implemented baseline

The current repository baseline now includes:

- a working static site configuration
- lightweight mobile-first templates
- CSS-only responsive layout with no client-side framework
- example hub pages
- an example intersection landing
- an example event detail page
- a schema field specification document at `docs/schema-fields.md`
- image-aware page rendering with graceful fallback placeholders

This file should keep reflecting the real implemented state, not only future intentions.

## Documentation maintenance rule

This file is not final. It is a living draft.

Whenever the architecture changes meaningfully, update:

- `AGENTS_beta.md`
- `README.md`
- relevant files in `./actions`

Keep those three documentation surfaces aligned.

## Adding event

- When adding an event, always verify the source event data first.
- Check all related pages and create or update them when needed.
- Related pages include city pages, venue pages, category pages, landing pages, and any featured sections affected by the new event.
- Save only the final processed image locally and apply the project watermark from `watermark.png`.
- Do not keep source image files in the repository.
- Use a clean public filename for the processed image without words like `watermark` in the file name.
- Connect the saved image through `media.hero` and `media.card`.
- Every event image must have meaningful `media.hero.alt` and `media.card.alt` text.
- Keep the existing internal purchase flow unless a different rule is approved later.
- Run a clean build after the event is added.
- Run Lighthouse for the new event page.
- Reflect this workflow in the relevant prompt files under `./actions`.


## Acceptance criteria

- No build errors. Run a build check after every meaningful change.
- No technical terms in visitor-facing page copy.
- Navigation must be correct and understandable for users.
- Do not use irrelevant promotional or search-oriented headers.
- No visual bugs such as broken spacing, uneven widths, or misaligned sections.
- Button "Buy tickets" should open link.
- Каждая страница должна быть "живая", а не техническая
