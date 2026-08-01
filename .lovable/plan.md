## Goal

Emit JSON-LD on the homepage that describes each role and client entry in the Experience timeline, generated from the existing `experiences` array so the markup can never drift from what's rendered.

## What gets added

In `src/routes/index.tsx`:

1. Parse the existing `period` string ("June 2022 – July 2025") into ISO dates (`2022-06`, `2025-07`) with a tiny month-map helper.
2. Build a `Person` graph node for Shakeer with `hasOccupation` and `worksFor`, plus one `OrganizationRole` node per client sub-entry:
   - `roleName`: e.g. "DevOps Engineer (Azure)"
   - `startDate` / `endDate` from the parsed period
   - `worksFor`: `Organization` = Tata Consultancy Services (TCS), with the client (`Follett Corporation`, `Wedbush Securities`) as a nested `Organization` under `member`/`description`
   - `description`: the highlights joined into one sentence-per-line string
   - `jobLocation`: PostalAddress Hyderabad, IN
   - `skills`: derived from the highlight keywords already present (Azure, CI/CD, Datadog, migration)
3. Also emit a `ProfilePage` wrapper with `mainEntity` pointing at the Person, and `@id` anchors so the root `Person` JSON-LD in `__root.tsx` and this one reference the same entity (`https://shakeer.online/#person`) rather than duplicating a second unrelated Person.
4. Attach it through the route's existing `head()` as an extra `scripts` entry (`type: "application/ld+json"`), the same pattern used in `azure-devops-vs-github-actions.tsx`.

To keep the head function clean, the graph builder lives in a small helper (`buildExperienceJsonLd`) in the same file, above the route definition, and reads from the `experiences` array.

## Notes

- No visual changes; the Experience section renders exactly as it does now.
- The root route keeps its existing Person/WebSite JSON-LD; this plan adds an `@id` to that node so the two link instead of conflict.
- Validate the output by pasting the rendered script into Google's Rich Results Test after implementation.
