---
name: Stringline
description: A contractor's project portfolio. Neutral grounds, graphite type, photographs carry the colour, one string-orange accent.
colors:
  white: "#ffffff"
  stone: "#f3f1ed"
  stone-2: "#e7e3dc"
  line: "#d9d4cb"
  ink: "#1c1d1f"
  muted: "#55585c"
  accent: "#c2410c"
  accent-hover: "#a8380f"
  accent-ink: "#ffffff"
  error: "#b3261e"
  error-tint: "#fbefee"
  field-line: "#8a857c"
  field-line-hover: "#5f5b55"
  placeholder: "#6b6e72"
typography:
  display:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  statement:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 1.7vw, 1.6rem)"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.45
  caption:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
  wordmark:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 750
    letterSpacing: "-0.035em"
  display-phone:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 7.4vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  control:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
  footer-wordmark:
    fontFamily: "Schibsted Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 12vw, 10rem)"
    fontWeight: 750
    lineHeight: 0.9
    letterSpacing: "-0.05em"
rounded:
  none: "0px"
  bubble: "16px"
  bubble-tail: "4px"
spacing:
  margin: "clamp(20px, 4vw, 56px)"
  container: "1280px"
  section: "clamp(96px, 12vw, 176px)"
  column-gap: "clamp(40px, 6vw, 96px)"
  panel: "clamp(24px, 4vw, 56px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.accent-ink}"
  button-small:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-big:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "60px"
  field-input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "52px"
  photo-label:
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "7px 12px"
  range-chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  fragment-panel:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.panel}"
  bubble-out:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.bubble}"
    padding: "10px 14px"
  bubble-in:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.bubble}"
    padding: "10px 14px"
---

# Design System: Stringline

## Overview

**Creative North Star: "The Project Portfolio"**

Stringline looks like a top contractor's portfolio, not a software site. White and pale stone grounds, graphite type set tight and heavy in one grotesk, and large square-cornered photographs that carry nearly all the colour on the page. A single string-orange accent marks what you can act on and what Stringline itself produces; everything else stays neutral.

Density is low and deliberate. Each screen holds one idea and, where there is an image, one dominant image. Sections are separated by large vertical air, not by rules, cards or tinted bands; the one tinted band is the stone join section. Product evidence appears as small, true-to-life fragments (a text thread, a calendar, a consult brief) set on stone panels, each labeled as an example.

Motion is short and finite: rises and fades on entrance, one sweep of the reveal handle on load, nothing looping. With reduced motion, everything is static and visible.

**Key Characteristics:**
- Neutral grounds (white, stone); colour comes from photographs.
- One accent, used on actions, the reveal handle, focus, and Stringline's own output inside fragments.
- One typeface (Schibsted Grotesk) across every role, heavy and tightly tracked at display sizes.
- Square corners on every surface, photo and control; rounding only where a real-world object is round (message bubbles, the drag grip).
- Flat: depth from photographs and tone, one soft shadow on the grip only.
- Short, one-shot motion on a single ease-out curve.

## Colors

A warm-neutral paper-and-stone palette with graphite type and one saturated orange held in reserve.

### Primary
- **String Orange** (`accent`): the colour of the hardscaper's stringline. Fills every button, the reveal grip, the text caret and selection, the focus outline, checkbox ticks, and the calendar slots Stringline booked inside the product fragments. Never a background field or a section tint. White type on it measures 5.2:1, so it holds small button and slot text at WCAG AA.
- **Fired Orange** (`accent-hover`): the hover state of String Orange on buttons, and the hover colour of FAQ questions.
- **Accent Ink** (`accent-ink`): white type on the accent.

### Neutral
- **Paper White** (`white`): the page ground, input fields, the range chip, and outgoing message bubbles.
- **Pale Stone** (`stone`): fragment panels and the full-bleed join band. The only tinted ground.
- **Deep Stone** (`stone-2`): the placeholder ground behind the reveal photograph while it loads.
- **Mortar Line** (`line`): 1px hairlines: input borders, FAQ and brief row dividers, calendar rows, the footer rule.
- **Graphite** (`ink`): all headings and body text, incoming message bubbles, and (at 72% alpha) the photo labels.
- **Weathered Graphite** (`muted`): nav links, secondary notes, captions, definition terms, FAQ answers.

### Functional
- **Brick Red** (`error`): form validation messages only.

### Named Rules
**The Photographs Carry the Colour Rule.** Grounds are white or pale stone; saturated colour arrives through photography. No coloured section fields, gradients or tinted cards.

**The One String Rule.** String Orange is the only hue in the interface. It marks action (buttons, focus, the grip) and Stringline's own output inside an example fragment, and nothing decorative.

## Typography

**Display Font:** Schibsted Grotesk (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Schibsted Grotesk (same family)

**Character:** One sturdy news grotesk does everything. Weight and tracking carry the hierarchy: 700 to 750 with tight negative tracking for display and the wordmark, 500 to 650 for statements and titles, 400 for reading.

### Hierarchy
- **Display** (700, `clamp(2.6rem, 5.4vw, 5.25rem)`, 1): the hero headline only, set as separate lines, balanced. Below 900px it steps down to `clamp(1.9rem, 8.2vw, 3.6rem)`.
- **Headline** (700, `clamp(2rem, 3.6vw, 3.4rem)`, 1.05): section headings, in the left column of each two-column section.
- **Statement** (500, `clamp(1.5rem, 2.6vw, 2.25rem)`, 1.3, max 34ch): a single standalone sentence given its own screen.
- **Title** (650, `clamp(1.35rem, 1.7vw, 1.6rem)`, 1.2): step titles and the form's second heading.
- **Lead** (400, `clamp(1.15rem, 1.4vw, 1.35rem)`, 1.5 to 1.55, max about 36 to 40rem): hero sentence, pricing and about bodies.
- **Body** (400, 1.0625rem, 1.6): running text; FAQ answers capped at 60ch.
- **Label** (600, 0.9375rem): field labels, photo labels, fragment headers. The same size at 400 serves nav links and notes.
- **Caption** (400, 0.8125rem, muted): timestamps and event lines inside fragments; calendar headers at 600.
- **Footer name** (750, `clamp(3rem, 12vw, 10rem)`, 0.9, -0.05em): the wordmark set huge as the page's closing line.

### Named Rules
**The One Family Rule.** Every role uses Schibsted Grotesk. Hierarchy comes from weight, size and tracking, never from a second face.

## Layout

A single centred frame, `min(100% - 2 × margin, container)`, holds the nav, every section and the footer. Sections are spaced by the `section` step (96 to 176px) with no dividers between them.

The default section grammar is an asymmetric two-column grid, 5fr : 6fr, with the headline on the left and content on the right, column gap `column-gap` (40 to 96px). The hero uses 7fr : 5fr. Steps alternate text and visual sides on even rows. Every multi-column grid collapses to one column at 900px; nav links hide below 760px, leaving wordmark and Join button.

The reveal photograph spans the full content width at 16:9 (capped at 70svh). Below 700px it turns 4:5 and bleeds to the screen edges. The join section bleeds its stone ground to the viewport edges while keeping its content in the frame.

## Elevation & Depth

Flat. Depth comes from photographs and from the step between white and pale stone, not from shadows. The one shadow in the system sits under the reveal grip, so the handle reads as a physical object lifted off the photo.

### Shadow Vocabulary
- **Grip lift** (`box-shadow: 0 6px 20px rgb(0 0 0 / 0.22)`): the reveal grip only.

### Named Rules
**The Flat Page Rule.** Surfaces, panels, chips and buttons carry no shadow. If something needs to separate, change its ground (white on stone, stone on white) or draw a 1px Mortar Line.

## Shapes

Square corners everywhere (0px): buttons, inputs, selects, photographs, panels, the range chip and photo labels. The form language is cut stone and printed photographs. The only curves are where the real object is round: message bubbles (16px with a 4px corner on the sender's tail side) and the circular reveal grip. Lines are 1px Mortar Line hairlines; the reveal divider is a 3px white rule.

### Named Rules
**The Cut Stone Rule.** Interface surfaces are square-cornered. Rounding is reserved for depictions of objects that are round in life (a message bubble, a grip), never for a container or control.

## Components

### Buttons
Solid, square, confident. One shape in three sizes.
- **Shape:** square corners (0px), no border.
- **Primary:** String Orange fill, white type at 650 weight, 52px tall, 26px side padding.
- **Small:** 44px tall, 18px padding, label size. Used in the nav.
- **Big:** 60px tall, 32px padding, 1.125rem. Used in the join form.
- **Hover / Focus / Active:** hover deepens to Fired Orange over 180ms; press scales to 0.97; focus draws a 2px Graphite outline offset 3px. Disabled drops to 60% opacity with a progress cursor.

### Inputs / Fields
- **Style:** white field, 1px Mortar Line border, square, 52px tall, 14px side padding, 1rem text. Label above at label weight, 8px gap.
- **Hover:** border darkens to a warmer stone grey.
- **Focus:** 2px String Orange outline inset by 1px, border turns orange.
- **Checkboxes:** native, 20px, tinted with String Orange.
- **Error:** Brick Red message at label size and 600 weight below the field.

### Logo
The mark (B3, chosen Oct 26, 2026) is two graphite stakes angled 4° outward with the string tied off at each one: a String Orange band wraps each stake and the orange line runs between the ties. It sits left of the wordmark at about 1.25× the cap height, 10px gap. Reversed on Graphite it uses chalk stakes and a brighter orange (#ea5a1f). The favicon and app icon set the reversed mark in a Graphite rounded square (`src/app/icon.svg`). Source files: `src/components/Mark.tsx`, `public/stringline-mark.svg`.

### Navigation
Plain: mark plus wordmark left (750, tight), three muted links in label size with 36px gaps, a small primary button right. Links go from Weathered Graphite to Graphite on hover. No background, no border, no sticky bar.

### Before / After Reveal (signature)
A full-width, square-cornered photograph pair. The concept is clipped over the yard today; a 3px white divider and a 52px circular String Orange grip with a chevron pair mark the split. On load the grip sweeps once (1.6s, ease-out) and settles toward the concept side; dragging or keyboard input takes over. Hover scales the grip 1.08, press 0.96; keyboard focus draws a 3px white ring. Photo labels are white on 72% Graphite, square; the range chip is a white square block with a bold figure and muted notes, and fades out when the concept is mostly hidden.

### Fragment Panels
Pale stone panels holding small true-to-life fragments of product output: a text thread with bubbles, a calendar table with booked slots in String Orange, a consult brief with a photo and hairline-divided definition rows. Each header names the fragment and says "Example". Panels are square, unbordered and shadowless; the brief panel runs its photo edge to edge.

### FAQ
Native disclosure rows between 1px Mortar Line hairlines. Question at 1.125rem / 600 with a stroked chevron that rotates 180° when open; hover turns the question Fired Orange. Answer in muted body, max 60ch, fading in.

## Do's and Don'ts

### Do:
- **Do** keep grounds white or pale stone and let photographs supply the colour.
- **Do** reserve String Orange for actions, focus, the reveal grip and Stringline's own output inside an example fragment.
- **Do** use square corners on every container, photo and control.
- **Do** lay sections out as one asymmetric two-column grid (5fr : 6fr), headline left, separated by the section step rather than dividers.
- **Do** label every sample figure, render or name as an example or concept on the surface itself.
- **Do** keep motion one-shot: rises of 12 to 18px and fades on the `cubic-bezier(0.22, 1, 0.36, 1)` curve, 180ms for UI and 600ms for entrances, all disabled under reduced motion.

### Don't:
- **Don't** add coloured section fields, gradients or tinted cards; the stone join band is the only tinted ground.
- **Don't** round containers, buttons, inputs or photographs.
- **Don't** add shadows to panels, chips or buttons; the grip is the only lifted object.
- **Don't** introduce a second typeface or a second accent hue.
- **Don't** use cards, icon rows or dashboard screenshots to explain the product; show its output as a labeled fragment or a photograph.
