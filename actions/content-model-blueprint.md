# Prompt: content model blueprint

Create a complete content-model blueprint for `someticket.com`, an English-language ticket aggregation website.

Requirements:

- Assume page behavior is determined by front matter fields, not folder structure alone.
- Use `page_type` and `entity_type` as the primary content identity fields.
- Support root-level hubs such as `/rock/`, `/new-york/`, `/beatles/`.
- Support deeper landing pages such as `/new-york/rock/`.
- Support event detail pages such as `/events/beatles-at-msg-june-12-2026/`.
- Design for aggregation from many external ticket sources.
- Optimize for strong metadata quality, scalable internal linking, and green-zone Lighthouse targets.

Deliverables:

1. Universal front matter contract for all pages.
2. Type-specific field sets for `hub`, `landing`, `event`, `guide`, `faq`, and `static`.
3. Entity-specific field sets for `city`, `region`, `category`, `artist`, `venue`, `event`, and `intersection`.
4. Required vs optional fields.
5. Field data types.
6. Validation rules.
7. Fallback logic when optional fields are missing.
8. Notes on how each field should affect metadata, schema, and internal linking.

Output format:

- Use clear sections.
- Prefer tables where useful.
- Include realistic examples.
- Write in English.
