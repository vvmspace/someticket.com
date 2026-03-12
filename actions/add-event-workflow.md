# Prompt: add event workflow

Add a new event page to `someticket.com` from a verified source listing.

Requirements:

- Verify the source event data before creating the page.
- Verify `offers.ticket_url` before writing it into front matter. The final URL must resolve to the exact same event title, event date, and venue as the page being created.
- Do not copy `ticket_url` from guesswork, search results, or pattern-based URL construction. Open the live event listing and confirm the match first.
- If the page does not clearly match the event title, date, and venue, stop and treat the URL as unverified until a correct event page is found.
- Create or update the event Markdown file in `/Users/vvm/someticket.com/content/events/`.
- Check all related pages and update them if needed:
  - tag page
  - city page
  - venue page
  - category page
  - related landing pages
  - homepage or featured sections when the new event should appear there
- Image: google image by event page
- apply the project watermark from `_root_/watermark.png` (bottom right corner) and fit size
- don't store original image
- Do not keep downloaded source image files in the repository after processing.
- Use a clean public filename for the final image without words like `watermark` in the file name.
- Connect the final image through `media.hero` and `media.card`.
- Add meaningful `media.hero.alt` and `media.card.alt` text.
- Keep all public copy useful for visitors. No technical terms.
- Preserve the internal purchase flow used by the site.
- tag, organizer, performers, venue and category pages should exist, be actual, and linked from events pages
- Run a clean site build after changes.

Expected input:

- verified source URL
- verified `ticket_url` that matches the exact event title, venue, and date
- event title
- event date and time
- venue and full address
- city and region
- category
- performers
- organizer
- image source
- SEO текст с ключевыми словами и разбавлением фактами
- price if available
- tags
- event type



Поля не должны быть однообразными. Прописывай их не технически, а прорабатывай каждый файл с душой.


Deliverables:

1. New or updated event Markdown file.
2. Any related page updates required by the new event.
3. Watermarked local image asset.
4. Build result.
