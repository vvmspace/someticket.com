# someticket.com

Working repository for a ticket aggregation site with a strong quality and Lighthouse-first architecture.

## Current status

The project is in specification mode. The repository currently stores the architecture direction, content-model rules, and future content prompts before implementation begins.

The repository also now includes a first working implementation with sample pages, responsive templates, and schema-ready front matter.

## Current architectural direction

- English-language website
- static generation
- Flexible content storage
- Page behavior determined by front matter, not by folder alone
- Root-level hubs for major entities
- Deeper URLs for intersections and event detail pages
- Strong focus on scalable Markdown structures for aggregated event data

## Key documents

- [AGENTS_beta.md](/Users/vvm/someticket.com/AGENTS_beta.md): working draft of the future project agent instructions and architecture rules
- [AGENTS.md](/Users/vvm/someticket.com/AGENTS.md): reserved for the future finalized agent file
- [docs/schema-fields.md](/Users/vvm/someticket.com/docs/schema-fields.md): fixed field contract for schema.org and microdata-ready Markdown
- [actions/content-model-blueprint.md](/Users/vvm/someticket.com/actions/content-model-blueprint.md): prompt for building the full Markdown/front matter specification
- [actions/sample-pages.md](/Users/vvm/someticket.com/actions/sample-pages.md): prompt for generating representative example pages
- [actions/internal-linking.md](/Users/vvm/someticket.com/actions/internal-linking.md): prompt for designing internal linking and navigation logic
- [actions/page-blocks.md](/Users/vvm/someticket.com/actions/page-blocks.md): prompt for defining reusable page blocks and template assembly rules
- [actions/seo-lighthouse-qa.md](/Users/vvm/someticket.com/actions/seo-lighthouse-qa.md): prompt for defining metadata, accessibility, and performance quality gates
- [actions/schema-page-generation.md](/Users/vvm/someticket.com/actions/schema-page-generation.md): prompt for generating schema-complete Markdown pages from source event data
- [actions/add-event-workflow.md](/Users/vvm/someticket.com/actions/add-event-workflow.md): prompt for the required workflow when adding a new event page

## Direction for content modeling

The planned content model uses front matter fields such as:

- `page_type`
- `entity_type`
- `layout_key`
- `slug`
- `seo`
- `relationships`
- `content_blocks`

This will allow the site to render multiple content classes from a shared contract:

- current hubs like `/new-york/` and `/madison-square-garden/`
- events like `/events/hadestown-walter-kerr-theatre-march-03-2026/`

## Implemented baseline

- working `config.toml`
- page layouts in [layouts](/Users/vvm/someticket.com/layouts)
- mobile-first CSS in [assets/css/site.css](/Users/vvm/someticket.com/assets/css/site.css)
- sample homepage in [content/_index.md](/Users/vvm/someticket.com/content/_index.md)
- sample hubs in [content/hubs](/Users/vvm/someticket.com/content/hubs)
- sample event in [content/events/hadestown-walter-kerr-theatre-march-03-2026.md](/Users/vvm/someticket.com/content/events/hadestown-walter-kerr-theatre-march-03-2026.md)
- visual handling for pages with and without images
- automatic event lists on typological pages through relationship-based matching
- Google tag support and site interaction events
- local watermark asset at [watermark.png](/Users/vvm/someticket.com/watermark.png) for event artwork

## Immediate next steps

- expand the Markdown/front matter specification
- define example page files for major entity classes
- define the block system for templates
- define internal linking and schema rules
- add more example content clusters
- add image processing and richer list pages
- wire validation and Lighthouse QA automation

## Maintenance rule

Keep this README aligned with:

- [AGENTS_beta.md](/Users/vvm/someticket.com/AGENTS_beta.md)
- the prompt files in [actions](/Users/vvm/someticket.com/actions)

## Acceptance criteria

- No build errors. Run a build check after every meaningful change.
- No technical terms in visitor-facing page copy.
- Navigation must be correct and understandable for users.
- Do not use irrelevant promotional or search-oriented headers.
- No visual bugs such as broken spacing, uneven widths, or misaligned sections.

## Event workflow

- When adding an event, verify the source data first.
- Check whether related city, venue, category, landing, and featured pages must be created or updated.
- Save only the final processed event image locally and apply the watermark from [watermark.png](/Users/vvm/someticket.com/watermark.png).
- Do not keep source image files in the repository.
- Use a clean public filename for the processed image without words like `watermark` in the file name.
- Every event image must include meaningful `alt` text in `media.hero.alt` and `media.card.alt`.
- Run a clean build after the event is added.
- Run Lighthouse for the new event page.
