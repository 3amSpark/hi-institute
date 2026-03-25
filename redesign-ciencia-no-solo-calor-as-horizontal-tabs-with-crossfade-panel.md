# Redesign: "Ciencia, no solo calorías" → Horizontal Tabs with Crossfade Panel

## Overview
Replace the current pill-masked image card grid with a **segmented tab control** + a single **crossfading content panel**. Three compact tab buttons sit in a row; clicking one crossfades that topic's content below. Minimal surface area, interactive, visually distinct from the 3 phase cards below.

## Design

```
           [ Regulación metabólica ]  [ Hormonas bioidénticas ]  [ Tecnología médica ]

           ┌─────────────────────────────────────────────────────────────┐
           │                                                             │
           │   ┌────────────┐     ● Insulina  ● Diagnóstico  ● Terapia │
           │   │            │                                            │
           │   │   image    │     Más que contar calorías,              │
           │   │  (overlay) │     regulamos tu páncreas.                │
           │   │            │                                            │
           │   └────────────┘     Description text goes here...         │
           │                                                             │
           └─────────────────────────────────────────────────────────────┘
```

## File to Modify
**`/Users/adrian/code/hi-institute/sites/hi/src/pages/index.astro`**

## Changes

### 1. Keep existing heading + paragraph (lines 147–163) — no changes

### 2. Replace the `scienceCards.map()` grid (lines 166–210) with:

**Segmented control:**
- Container: `flex justify-center`
- Inner wrapper: `inline-flex gap-1 rounded-full bg-neutral-100 p-1` (pill-shaped backdrop)
- 3 buttons with `data-science-tab="0|1|2"` attributes
- Labels: **"Regulación metabólica"** · **"Hormonas bioidénticas"** · **"Tecnología médica"**
- Active: `bg-brand-blue text-white rounded-full shadow-sm`
- Inactive: `text-neutral-600 rounded-full hover:text-neutral-900`
- All: `px-5 py-2 text-sm font-medium transition-all duration-300`

**Content panels:**
- Container: `relative mt-12 mx-auto max-w-5xl` with a min-height to prevent layout shift
- 3 panels with `id="science-panel-0|1|2"`
- Each panel: `grid md:grid-cols-2 items-center gap-8 md:gap-12`
- Inactive panels: `absolute inset-0 pointer-events-none opacity-0 translate-y-4`
- Active panel: no absolute positioning, fully visible
- Transition: `transition-all duration-500`

**Image side (left column):**
- Rounded-lg container with `overflow-hidden`
- Brand gradient overlay (blue→green via transparent, `mix-blend-color`) — same pattern as hero
- Vignette overlay (dark bottom → transparent → light top, `mix-blend-multiply`) — same as hero
- `<img>` with `aspect-4/3 object-cover` and `rounded-lg`

**Text side (right column):**
- Tags as pill badges: `rounded-full px-3 py-1 text-sm font-medium` with each card's accent color
- Title: `text-xl md:text-2xl font-semibold text-neutral-900`
- Description: `text-base leading-7 text-neutral-600`

### 3. Add `<script>` block for tab switching
- Follow exact pattern from `treatment-areas.astro`
- Query `[data-science-tab]` buttons and `[id^="science-panel-"]` panels
- Toggle active/inactive classes on both buttons and panels
- Wire up `astro:after-swap` for view transitions

### 4. Clean up `<style>` block
- Remove `.science-pill-mask` CSS rule (no longer used)
- Keep `.bg-lines` if used elsewhere (it isn't — can also remove)

## Verification
- Run dev server, visit homepage
- First tab active by default with content visible
- Click each tab → smooth crossfade transition
- Check mobile: tabs should wrap or scroll, content stacks vertically
- Phase cards section below remains visually distinct
