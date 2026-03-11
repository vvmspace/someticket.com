# Prompt: add event workflow

Add a new event page to `someticket.com` from a verified source listing.

Requirements:

- Verify the source event data before creating the page.
- Create or update the event Markdown file in `/Users/vvm/someticket.com/content/events/`.
- Check all related pages and update them if needed:
  - city page
  - venue page
  - category page
  - related landing pages
  - homepage or featured sections when the new event should appear there
- Save only the final processed event image locally and apply the project watermark from `_root_/watermark.png` (bottom right corner) and fit size.
- Do not keep downloaded source image files in the repository after processing.
- Use a clean public filename for the final image without words like `watermark` in the file name.
- Connect the final image through `media.hero` and `media.card`.
- Add meaningful `media.hero.alt` and `media.card.alt` text.
- Keep all public copy useful for visitors. No technical terms.
- Preserve the internal purchase flow used by the site.
- Run a clean site build after changes.
- Run Lighthouse for the new event page and record the result.

Expected input:

- verified source URL
- event title
- event date and time
- venue and full address
- city and region
- category
- performers
- organizer
- image source
- SEO текст с ключевыми словами и разбавлением фактами

Поля не должны быть однообразными. Прописывай их не технически, а прорабатывай каждый файл с душой.

Deliverables:

1. New or updated event Markdown file.
2. Any related page updates required by the new event.
3. Watermarked local image asset.
4. Build result.
5. Lighthouse result for the new event page.

