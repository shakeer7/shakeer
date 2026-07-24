# Liquid Glass Theme

Refresh the portfolio's visual layer with an Apple-style "Liquid Glass" aesthetic — translucent frosted surfaces, soft aurora gradients behind them, and subtle depth. No content or structural changes; purely presentation.

## Look & feel

- Animated aurora background: soft blurred blue/cyan/violet blobs drifting behind everything, sitting on the current Cloud & Clean base.
- Cards, nav bar, theme toggle, projects, skills, experience, education, certifications, stats — all become frosted glass panels: semi-transparent surface, `backdrop-blur-xl`, 1px inner highlight border, soft shadow, generous rounded corners.
- Buttons (Contact, LinkedIn, GitHub, resume, theme toggle segments) get a glass pill treatment with a subtle specular highlight on hover.
- Hero portrait frame gets a thicker glass ring + glow.
- Dark mode: deeper indigo/slate base, glass panels tint cooler with brighter edge highlights so the frosted effect reads well.

## Technical changes

- `src/styles.css`
  - Add tokens: `--glass-bg`, `--glass-bg-strong`, `--glass-border`, `--glass-highlight`, `--glass-shadow`, `--aurora-1/2/3` (light + dark variants).
  - Add `@utility glass`, `@utility glass-strong`, `@utility glass-pill`, `@utility aurora-bg` using `background`, `backdrop-filter: blur() saturate()`, layered box-shadows for inner highlight + outer soft shadow. Standard `backdrop-filter` only (build handles prefixing).
  - Keyframes for slow aurora drift (`@keyframes aurora-drift`) + reduced-motion guard.
- `src/routes/index.tsx`
  - Wrap page in an `aurora-bg` container with 3 blurred gradient blobs.
  - Swap existing `bg-card`/`border` classes on nav, section cards, project cards, skill category cards, stats cards, theme toggle, and CTA buttons to the new `glass` / `glass-pill` utilities.
  - Keep all copy, links, section order, and semantic tokens intact.
- No changes to routing, data, MCP, SEO, or server code.

## Out of scope

- No new sections, copy edits, or feature work.
- No dependency additions.
- No changes to the color palette identity beyond adding glass/aurora tokens.
