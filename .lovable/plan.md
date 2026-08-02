# Matte Black Dark Mode

## Goal
Make the dark-mode background a full matte black (zero chroma, near-zero lightness) instead of the current dark slate-blue `oklch(0.15 0.02 260)`, while keeping the glass-morphism cards and aurora accents legible against it.

## Changes — `src/styles.css` (`.dark` block only)
Update dark-mode tokens to a matte-black palette. Light mode is untouched.

- `--background`: `oklch(0 0 0)` — pure matte black, no blue tint.
- `--surface`: `oklch(0.04 0 0)` — barely-above-black for subtle surface lifts.
- `--surface-elevated`: `oklch(0.06 0 0)`.
- `--card`: `oklch(0.05 0 0)` — slightly above background so glass cards still read.
- `--popover`: `oklch(0.06 0 0)`.
- `--secondary`: `oklch(0.08 0 0)`.
- `--muted`: `oklch(0.08 0 0)`.
- `--border`: `oklch(0 0 0 / 10%)` (was white 8%) — neutral, no blue cast.
- `--input`: `oklch(0 0 0 / 14%)`.
- `--hero-glow`: keep current low-chroma value but drop chroma to 0 → `oklch(0.30 0 0)` so the hero radial glow stays neutral on matte black.

`--foreground`, `--muted-foreground`, `--primary`, `--aurora-*`, and glass tokens stay unchanged (they provide the only color in an otherwise black scheme and keep contrast accessible).

## Verification
- Run `bun run build` to confirm no CSS errors.
- Visually confirm in preview: background is true matte black, glass cards remain visible, aurora accents still read, and text contrast is preserved.

No light-mode changes. No component changes — everything keys off the semantic tokens.