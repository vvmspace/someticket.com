# Prompt: page blocks and template assembly

Define the reusable page-block system for `someticket.com`, a ticket aggregation website.

Context:

- The site uses Markdown with front matter-driven rendering.
- `page_type` and `entity_type` determine how a page should be assembled.
- The site must support high-quality landing pages and green-zone Lighthouse performance.

Design a reusable block architecture for these page classes:

- home
- hub
- landing
- event
- guide
- faq
- static

For each class, define:

1. Required blocks.
2. Optional blocks.
3. Recommended block order.
4. Blocks driven by manual content vs generated relationships.
5. Blocks that should be hidden if required data is missing.
6. Blocks that should be optimized for conversion.
7. Blocks that should be optimized for internal linking.

Also define a reusable block inventory that may include:

- hero
- intro
- key facts
- event metadata
- featured focus
- offer cards
- city highlights
- venue highlights
- artist highlights
- category highlights
- FAQ
- breadcrumbs
- trust blocks
- related pages
- guides
- collections
- CTA sections

Write the answer as a technical blueprint in English with practical implementation guidance for static templates.
