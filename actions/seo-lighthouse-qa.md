# Prompt: metadata and Lighthouse quality gates

Create a quality-gate specification for `someticket.com`, an English-language ticket aggregation website.

The goal is to support green-zone Lighthouse scores and strong technical quality.

Cover these areas:

1. Metadata requirements for all page types.
2. Meta title and meta description rules.
3. Canonical rules.
4. Index vs noindex rules.
5. Structured data requirements by page type.
6. Internal-linking quality checks.
7. Accessibility requirements.
8. Performance budget guidance.
9. Image rules.
10. JavaScript limits.
11. Third-party script policy.
12. Validation checks for Markdown/front matter completeness.

For each rule, specify:

- what to validate
- why it matters
- recommended threshold or rule
- whether it is blocking or non-blocking

Write the answer as a practical specification in English, suitable for later CI or manual QA use.
