<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Technical decisions
- Skill logos removed from the Simple Icons CDN (Microsoft Azure, AWS, Azure DevOps, Argo CD — removed for trademark reasons) are bundled locally in `src/assets/logos/` and mapped in `localLogos` in `src/routes/index.tsx`. Never reintroduce CDN links for these four; keep using local assets. Why: the CDN 404s show broken icons.
- The mobile bottom capsule navigation covers all widths below `lg` (1024px); the desktop top pill nav renders only at `lg` and up. Why: at tablet widths the top nav's 7 links plus toggle and buttons overlap.
