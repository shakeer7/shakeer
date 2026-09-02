# Liquid Glass Mobile Nav Bar

## Goal
Restyle the mobile bottom navigation capsule into a true "liquid glass" look — highly translucent, refractive, with specular highlights — matching the iOS-style liquid glass aesthetic and the site's existing glass design system. It must work in both light and dark themes.

## Changes (src/routes/index.tsx + src/styles.css)

1. **Add a `glass-liquid` utility in `src/styles.css`:**
   - Semi-transparent tinted background (adapts to light/dark via existing `--glass-*` tokens)
   - Heavy backdrop blur (~28px) with saturate boost
   - Specular top highlight (inset white line), subtle inner bottom shadow
   - Gradient border via existing `glass-edge` mask technique
   - Soft floating shadow with a hint of the primary color
   - Optional `glass-noise` texture for realism

2. **Apply it to the mobile bottom nav in `src/routes/index.tsx`:**
   - Replace the solid `bg-[#1a1a1a]/82 dark:bg-black/85` capsule with the new `glass-liquid` style
   - Active tab: glowing glass pill background (`bg-primary/15` tint + inner highlight) instead of flat white
   - Icons/labels switch from hardcoded `text-white` to theme-aware tokens so it reads correctly in light mode too

3. **Match the "More" popup menu:**
   - Same liquid-glass treatment on the expanded grid panel

4. **Verify** in the preview at a mobile viewport in both light and dark themes: legibility of icons, active-tab highlight, blur over page content behind the bar.

## Notes
- Desktop top pill nav stays as-is.
- No changes to nav behavior, links, or active-section highlighting.
