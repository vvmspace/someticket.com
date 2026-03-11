# Prompt: schema-complete page generation

Generate a production-oriented Markdown page for `someticket.com` from structured source event data.

Requirements:

- The site uses static page generation.
- The page must be valid for the site's front matter contract.
- The page must include all fields required for schema.org generation according to `/Users/vvm/someticket.com/docs/schema-fields.md`.
- Use `page_type` and `entity_type` correctly.
- The result must be indexable only if it has enough unique, complete data.
- Prefer concise, useful copy over filler text.

Expected input:

- event title
- date and time
- performer or show name
- venue
- full address
- city
- region
- country
- category
- ticket source data
- price data
- organizer data
- optional FAQ

Deliverables:

1. Proposed file path.
2. Complete Markdown file with front matter and body.
3. Related page suggestions for internal linking.
4. Any noindex recommendation if the data is incomplete.
