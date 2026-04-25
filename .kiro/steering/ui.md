# UI Design System — Scaffold (Provoke)

## Aesthetic
Scholarly and focused — not generic SaaS. Paper textures, serif fonts, minimal chrome. The aesthetic reinforces the seriousness of the learning task.

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-paper` | `#F4EFE4` | Background (warm paper) |
| `--color-ink` | `#1B1A17` | Primary text |
| `--color-rust` | `#B54A1E` | Accent, CTAs, active states |
| `--color-lens-watch` | `#2D6A4F` | "What to Watch For" lens (forest green) |
| `--color-lens-prereq` | `#3D405B` | "Prerequisite Check" lens (indigo) |
| `--color-lens-misc` | `#8B3A3A` | "Common Misconceptions" lens (brick) |
| `--color-lens-explain` | `#7B5E2A` | "Explain It Back" lens (bronze) |
| `--color-muted` | `#6B6760` | Secondary text, labels |
| `--color-border` | `#D9D3C7` | Dividers, card borders |
| `--color-success` | `#2D6A4F` | "Strong reasoning" verdict |
| `--color-warning` | `#7B5E2A` | "Partial credit" verdict |
| `--color-error` | `#8B3A3A` | "Needs rigor" verdict |

## Typography

| Token | Value | Usage |
|---|---|---|
| `--font-display` | `'Fraunces', Georgia, serif` | Headings, logo |
| `--font-body` | `'Newsreader', Georgia, serif` | Document reading text |
| `--font-ui` | `'JetBrains Mono', monospace` | Labels, tabs, badges (ALL-CAPS) |

Google Fonts CDN:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=JetBrains+Mono:wght@400;500;700&family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&display=swap" rel="stylesheet">
```

## Layout

### Study Mode — Three-Column Grid
```
| 200px (Resources) | flex (Document + Lens panel) | 280px (Outline) |
```
- Document max-width: 680px, centered in the flex column
- Mobile (< 768px): single column, sidebars behind toggle buttons

### Battle Mode — Centered
- Max-width: 800px, centered
- Phase 1: two-column (author + pool sidebar)
- Phase 2: single question with answer textarea
- Phase 3: stacked reveal cards

## Component Patterns

### Promptions-Style Option Controls
Lens tabs behave like Promptions `SingleOptionControl`:
- Radio-button-like tabs (only one active at a time)
- Selecting a tab updates the lens panel content in-place
- No chat append, no page navigation
- Each tab colored with its lens accent color

### Provocation Card
- Paper background, rust border-left (4px)
- Appears inline beneath the clicked phrase
- Two actions: "Dismiss" | "I've thought about this"
- Focus trap while open, Escape key dismisses

### Battle Question Card
- Card with question text + textarea
- Word count badge: "12 / 15 words minimum"
- Submit button disabled until minimum met

### Reveal Card
- Three columns: question | your answer | peer answers
- Verdict badge: colored label (Strong/Partial/Needs rigor) + 1-sentence note

## Motion
Minimal. No decorative animations. Allowed:
- Fade-in (200ms) for lens panel content swap
- Slide-down (150ms) for provocation card open
- No parallax, no bounce, no skeleton loaders (use text "Loading..." only)

## Accessibility
- WCAG 2.1 AA color contrast (minimum 4.5:1 for normal text)
- All interactive elements keyboard-accessible
- Focus visible on all interactive elements
- aria-labels on icon-only buttons
- No viewport width under 375px produces horizontal scroll
