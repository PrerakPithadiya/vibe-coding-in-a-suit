# Product Requirements Document
## "Agentic Coding Is Just Vibe Coding In A Suit" — Website Build

**Prepared for:** Build execution via Google Antigravity Coding Agent
**Source material:** `Vibe_Coding_in_a_Suit.pdf` (9-slide presentation)
**Doc owner:** Prerak
**Version:** 1.0

---

## 1. Project Summary

Convert a 9-slide presentation into a single-page scrolling website (or a 9-section site with anchor navigation) that is a **pixel-faithful visual translation** of the deck — not a "reimagined" version. Every section must preserve the original's layout logic, color relationships, iconography style, and tone of voice. Where the source uses hand-drawn arrows, marker-style highlights, or sticky-note textures, the website should recreate those as SVG/CSS assets, not as literal photographs of paper.

**Why this matters for the agent:** Antigravity (or any coding agent) will default to "modernizing" or "cleaning up" designs unless explicitly constrained. This PRD exists to remove that ambiguity — every section below gives the agent a literal spec, not a vibe.

---

## 2. Goals & Non-Goals

**Goals**
- Recreate all 9 slides as 9 distinct scrollable sections on one page.
- Preserve the presentation's specific compositions (split-screen layouts, Venn diagrams, iceberg diagram, comparison table, flowchart).
- Match the color system, typography pairing, and "annotated whiteboard" aesthetic (bold sans display type + hand-drawn marker accents + monospace code snippets).
- Ship fully responsive (desktop-first design, since the source is a 16:9 deck, but must degrade gracefully to mobile).
- Support smooth scroll-snap or scroll-triggered reveal animations between sections, echoing a "slide advance" feel.

**Non-Goals**
- No CMS or backend — this is a static, content-frozen site.
- No slide-editing UI for the end user.
- No dark/light mode toggle (the deck itself mixes a dark-ish accent panel with light panels intentionally per-slide; don't add a global theme switcher).

---

## 3. Design System (Design Tokens)

Extract and lock these as CSS custom properties before building any section. The agent should generate a `tokens.css` (or `:root` block) first and reference it everywhere — never hardcode colors/fonts inline.

### 3.1 Color Palette

| Token | Approx. Hex | Usage |
|---|---|---|
| `--color-cream` | `#EFE8DA` | Light paper/background panels (Slide 1 left, comparison table left column, boxes in Slide 9) |
| `--color-tan-gold` | `#D3A94E` | Underlines, highlight strokes, box borders |
| `--color-rust-orange` | `#C2542E` | Primary accent — arrows, highlight circles, "confession" box, iceberg base |
| `--color-slate-blue` | `#6D84A2` | Secondary accent — flowchart boxes, "Agentic Coding" column header, iceberg tip |
| `--color-ink-black` | `#1A1A1A` | Headline text, borders, diagram strokes |
| `--color-paper-white` | `#FFFFFF` | Base background for right-hand/diagram panels |
| `--color-sepia-brown` | `#4A3423` | Retro-computer illustration panel background (Slide 8 bottom half) |
| `--color-muted-gray` | `#888888` | Captions, small print, attribution text |

> Note: exact hex values should be sampled directly from the PDF pages using a color picker during implementation — the values above are close approximations for planning. Add a QA step (Section 8) to verify against source.

### 3.2 Typography

- **Display / Headline font:** A bold, high-contrast slab/grotesque serif-adjacent face — closely resembles **"PP Editorial New Ultrabold"**, **"Fraunces"** (black weight), or **"Georgia Bold"** as a fallback. Used for all large slide titles ("Agentic Coding Is Just Vibe Coding In A Suit," "The Confession," etc.) at very large scale (clamp between ~48px mobile and ~96–120px desktop).
- **Body / UI font:** A clean geometric sans for supporting text and boxed statements — **Inter** or **Helvetica Neue** works as substitute.
- **Code / monospace font:** **IBM Plex Mono** or **JetBrains Mono** for all code-snippet decorative elements (Slide 1 background code).
- **Hand-annotation font (optional):** for "Go on..." style sticky-note text, a casual/marker font like **Caveat** or **Kalam** can substitute for the handwritten annotations, OR keep it in the sans font if simplicity is preferred — flag this as a decision point for you to confirm before build.

### 3.3 Motifs to Recreate (Recurring Visual Language)

These recur across slides and should be built as **reusable components**, not redrawn per-section:

1. **Marker-stroke underline/highlight** — a loose, slightly rough SVG stroke in rust-orange or tan-gold, used to underline or circle key phrases.
2. **Torn paper sticky note** — used once (Slide 2, "Go on..."), can be a reusable `<StickyNote>` component with a jagged clip-path edge and subtle drop shadow.
3. **Grid/graph paper background** — faint light-gray grid line pattern appears behind Slides 1, 2, 3 titles — implement as a repeating CSS background pattern (`background-image` with SVG grid).
4. **Bold circle callout** — a hand-drawn-style filled circle (Slide 3) used to draw the eye to one key box; implement as an SVG ellipse with a wobbly path rather than a perfect circle.
5. **Directional arrows (hand-drawn style)** — connecting annotation text to code lines (Slide 1) and connecting workflow boxes (Slide 3). Build as a small SVG arrow set with slight curvature/imperfection, reusable and rotatable.

---

## 4. Global Layout & Navigation

- **Structure:** Single scrollable page, 9 `<section>` elements, one per slide, each `min-height: 100vh` (or `100dvh` for mobile).
- **Navigation:** A minimal fixed side-dot navigation (9 dots) indicating current section + allowing click-to-jump, similar to typical slide-deck web experiences. Keep this navigation element itself minimal/monochrome so it doesn't compete with each slide's own palette.
- **Scroll behavior:** CSS `scroll-snap-type: y mandatory` on the container, `scroll-snap-align: start` per section, so each section behaves like a "slide" when scrolling — reinforcing the presentation feel.
- **Footer/attribution:** Persist "Based on insights by Alex Dunlop" and a small site-level credit in the last section or a slim global footer — do not repeat it on every slide (only Slide 1 has it in the source).
- **Section background switching:** Each section's background color/pattern changes per the source (cream+white split, all-white, dark sepia, etc.) — the page background should transition per section, not stay static.

---

## 5. Section-by-Section Specification

### Section 1 — Title / Hero
**Source:** Slide 1
- Split composition: left ~45% width has cream/tan grid-paper background with 4 stacked decorative code snippets (Python `vibe_check.py`, JS `another_vibe.js`, a partial Rust/other snippet, and a 4th labeled snippet), each with a hand-drawn orange arrow pointing from an annotated line toward the central headline.
- Right ~55% width, white background, contains 3 stacked mini-diagrams:
  - A small flowchart: `INPUT_PROCESSOR` → `DECISION_ENGINE (Is agentic?)` → branches to `EXECUTE_PLAN` (dark box) and `REVISE_STRATEGY` (dark box).
  - A 2-row status table: `[1] Initialization / COMPLETE / 100%`, `[2] Optimization / PENDING / N/A`, `... / ... / ...`.
  - A 3-bar bar chart: Efficiency 92%, Accuracy 98%, Scalability 85%.
- Center-bottom (spanning both halves): the large bold headline **"Agentic Coding Is Just Vibe Coding In A Suit"** and subhead **"The psychological reality behind AI development's newest favorite buzzword."**
- Bottom-right corner: "Based on insights by Alex Dunlop" + small "NotebookLM" style logo credit (replace with your own site credit/logo).
- **Implementation note:** the code snippets and diagrams are decorative background elements — build them as static SVG/HTML, not functional. Keep them slightly desaturated/low-contrast relative to the headline so the headline remains the visual anchor.

### Section 2 — "The Confession"
**Source:** Slide 2
- Two-column layout: left = large bold title "The Confession" vertically centered against plain white/cream background.
- Right column, stacked top to bottom:
  1. A grid-paper-textured box with a thin dark border: *"I stopped vibe coding. Said it like he'd quit drinking."*
  2. A smaller torn-paper sticky note, slightly rotated: *"Go on..."*
  3. A bold solid rust-orange box with white text: *"I agentic code now."*
- Elements should slightly overlap/cascade downward (each box offset diagonally from the last) to mimic the deck's staggered arrangement.

### Section 3 — "The highly professional Agentic workflow."
**Source:** Slide 3
- Title at top.
- Horizontal 4-step flow: 3 slate-blue rounded-rectangle boxes connected by right-pointing arrows: "Open Claude Code." → "Type everything in plain words." → "Implement planning and let it run."
- 4th element is NOT a box in the flow line but a large rust-orange filled circle, positioned slightly below/right of the 3rd box, connected by a curved arrow: *"I merge things without reading most of it. I know it's bad."*
- Below the circle, a small annotation line: *"Exactly what you just said you quit doing."*
- On mobile: stack vertically, keep the arrow-to-circle relationship with a bent connector.

### Section 4 — "Here is what no one is admitting."
**Source:** Slide 4
- Left ~40%: a line-drawing illustration of a suit blazer, with 3 loose rust/gold marker brush-strokes crossing over it (diagonal, asymmetric — signaling "this is a costume/cover-up").
- Right ~60%: bold statement text *"Agentic coding is the exact same idea, just worded in a more engineery way."* followed by a horizontal row of 3 icon+caption pairs:
  - Gear icon → "A model writes the code."
  - Steering wheel icon → "You steer a bit."
  - Eye-with-slash icon → "You merge a lot of it without reading it."
- Icons should be simple line-style (outline, ~2px stroke, slate-blue or ink-black), consistent stroke weight across all three.

### Section 5 — Comparison Table
**Source:** Slide 5
- Title: "Yes, technical differences exist. Let's not pretend they don't."
- A 2-column, 3-row table:
  - Header row: "VIBE CODING" (tan/gold background, dark text) | "AGENTIC CODING" (white background, slate-blue text)
  - Row 1: "The original Karpathy version. Loosey-goosey." | "The Engineery version. Structured."
  - Row 2: "Reactive. Prompt → Look at screen → Prompt again." | "Proactive. Planning step → Autonomy."
  - Row 3: "Edits one file, maybe two." | "Touches eight files exactly the way you like it."
- Left column cells have a cream/tan tint background with a couple of hand-drawn orange underline/scribble accents over specific phrases ("Loosey-goosey," "Reactive," "Edits one file, maybe two").
- Table should be a real semantic `<table>` (not divs) for accessibility, styled to match — borders bold/black, generous cell padding.

### Section 6 — Venn Diagram
**Source:** Slide 6
- Title: "The reality behind the rebranding."
- Two large overlapping circle outlines (hand-drawn/wobbly stroke style): left circle labeled "Vibe Coding" (rust-orange stroke), right circle labeled "Agentic Coding" (slate-blue stroke).
- The overlapping intersection is a solid black filled shape containing white text: *"You describe your intent in English."* / *"You don't read most of the diffs."*
- Below, an arrow pointing down from the intersection to a boxed statement: *"The rest is just branding."*
- Build the circles as SVG paths (not perfect `<circle>` elements) to preserve the hand-drawn imperfection from the source.

### Section 7 — Iceberg Diagram
**Source:** Slide 7
- Title: "The psychology behind the new jargon."
- An iceberg illustration: visible tip above a dashed waterline (slate-blue/gray, faceted/geometric style) labeled via a leader line: *"I am deploying an autonomous agentic planning workflow."*
- Large submerged mass below the waterline (rust-orange/tan, larger and more jagged than the tip) labeled: *"Engineers find the word vibe embarrassing and unserious."*
- A separate boxed statement to the right/below: *"The word agentic exists solely to make us feel better about how we actually work now."*
- The tip-to-submerged size ratio should visually communicate "small surface justification, large underlying reason" — submerged portion should be noticeably larger than the tip.

### Section 8 — Split Illustration Panel
**Source:** Slide 8
- Title: "Hiding your vibe is an old tech tradition."
- Top half (white/light background): a stylized code-editor/IDE mockup (sidebar + tabs + redacted/greeked-out code lines shown as gray blocks rather than real text) with an annotation box: *"We are pretending it's rigid engineering in public."*
- Bottom half (dark sepia/brown background): a retro illustration of an old CRT monitor, keyboard, and floppy disks, styled like a vintage line-art poster. Overlaid text: *"It's exactly like when gaming wasn't cool yet, and everyone hid that part of themselves to seem professional."*
- A small handwritten-style side note (rotated slightly, right edge): *"Not me. I snuck out to play Left 4 Dead and CS."*
- This section has the strongest color contrast shift in the deck (light → dark) — preserve that hard cut, don't gradient-blend it.

### Section 9 — Closing / Manifesto
**Source:** Slide 9
- Title: "Don't be ashamed of the vibe."
- Three stacked horizontal boxes, cream/tan background, bold border, each with a lead-in word in rust-orange bold followed by regular black text:
  1. **Call it** whatever makes you comfortable in stand-up.
  2. **Appreciate** the planning and autonomy of new agents.
  3. **But admit** what you're doing: steering a model and crossing your fingers on the diff.
- Below the three boxes, a large bold pull-quote, underlined in rust-orange: *"I find it more embarrassing to be ashamed of it."*
- This is the final section — consider a subtle "end of scroll" affordance (e.g., fade-in only, no further scroll-snap forcing) so it doesn't feel like content is missing.

---

## 6. Interaction & Motion Requirements

- **Entrance animations:** Each section's elements should animate in on scroll-into-view (fade + slight upward translate, ~400–600ms, staggered per element) — mimicking a presenter "building" the slide. Use `IntersectionObserver`, not scroll-linked libraries that hurt performance.
- **Hand-drawn elements (arrows, circles, underlines):** consider an SVG "draw-on" stroke animation (`stroke-dasharray`/`stroke-dashoffset` technique) triggered on scroll-into-view, since these read as marker annotations in the source.
- **No autoplay carousels, no parallax gimmicks** — the source deck is static and confident; the site's motion should support that reading pace, not distract from it.
- **Reduced motion:** respect `prefers-reduced-motion` — disable entrance/draw animations and show final states immediately.

---

## 7. Technical Requirements (for the Antigravity Agent)

| Area | Requirement |
|---|---|
| **Stack** | Static site — plain HTML/CSS/JS, or a lightweight framework (Astro, or React/Vite) if the agent prefers component reuse for the repeating motifs in Section 3.3. No backend/server required. |
| **Assets** | All diagrams/illustrations (blazer, iceberg, Venn, flowchart, CRT computer) as hand-authored SVG — do not use raster/photographic stock imagery. |
| **Fonts** | Self-host or load via a font CDN (e.g., Google Fonts / Fontshare) for the chosen display, body, and mono faces from Section 3.2. |
| **Responsiveness** | Breakpoints at minimum: mobile (<640px), tablet (640–1024px), desktop (>1024px). Two-column slide layouts (Sections 1, 2, 4, 8) stack vertically below tablet width. |
| **Accessibility** | Semantic HTML landmarks per section (`<section aria-label="...">`), real `<table>` for Section 5, sufficient color contrast on all text (verify rust-orange-on-cream and white-on-slate-blue combinations meet WCAG AA for body text; headline sizes get more leeway). |
| **Performance** | SVGs inlined or sprite-sheeted to avoid excess requests; total page weight target <2MB; Lighthouse performance score target >90 on desktop. |
| **Browser support** | Latest 2 versions of Chrome, Firefox, Safari, Edge. No IE11 requirement. |

---

## 8. QA / Acceptance Criteria

A section is considered "done" only when:
1. Side-by-side screenshot comparison against the corresponding PDF page shows matching layout structure (element positions, proportions, alignment).
2. Color values are sampled and matched against the source PDF (not eyeballed) within reasonable tolerance.
3. All copy text is transcribed **verbatim** from the source slide (no paraphrasing of headlines, box text, or captions).
4. Responsive behavior at mobile width doesn't break the section's core visual metaphor (e.g., the Venn diagram must still read as two overlapping circles, not become illegibly small).
5. Motion respects `prefers-reduced-motion`.

---

## 9. Open Questions to Resolve Before Build

1. **Handwritten font decision:** Should sticky-note/annotation text (Section 2's "Go on...", Section 8's side note) use a script/marker font, or stay in the body sans for simplicity? *(Recommend: script font — it's part of the deck's visual identity.)*
2. **Navigation style:** Confirm whether you want the side-dot scroll navigation (Section 4) or prefer a simpler top progress bar, or no navigation chrome at all.
3. **Domain/hosting:** Static export target — is this going to a custom domain, GitHub Pages, Vercel/Netlify, or just run locally for now?
4. **Attribution line:** Decide what replaces "Based on insights by Alex Dunlop" / NotebookLM credit — keep as-is, replace with your own name, or remove.

---

## 10. Suggested Build Order (for the Agent)

1. Set up project scaffold + `tokens.css` design tokens (Section 3).
2. Build the 5 reusable motifs (Section 3.3): marker underline, sticky note, grid background, hand-drawn circle, hand-drawn arrow.
3. Build Section 5 (comparison table) and Section 9 (closing) first — they're the lowest-complexity, good for validating the type/color system end-to-end.
4. Build Sections 1, 2, 3, 4 (mixed layout + motif-heavy sections).
5. Build Sections 6, 7 (custom SVG diagrams — Venn, iceberg) — highest illustration effort, budget the most time here.
6. Build Section 8 (illustration + hard color-contrast section).
7. Wire up scroll-snap, navigation, and entrance animations globally.
8. QA pass against Section 8 acceptance criteria, section by section.

---

*End of PRD.*
