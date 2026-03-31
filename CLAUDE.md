# Design System Strategy: UVA Data Science for Sustainable Development (DSSD)

## 1. Overview & Creative North Star

### Creative North Star: "The Academic Brutalist"
This design system rejects the "softness" of generic tech startups in favor of a bold, structured, and authoritative editorial aesthetic. It is inspired by the intersection of rigid data structures and high-end educational publishing. We move beyond the "template" look by using **intentional asymmetry**, **thick structural strokes**, and **stark tonal shifts**. 

The goal is to make UVA DSSD feel like a prestigious research institution that has been infused with modern, high-energy data culture. By utilizing a "Boxy Modern" approach, we create a UI that feels physically constructed—where every element has a weight, a boundary, and a clear purpose.

---

## 2. Colors

The color strategy is built on high-contrast foundations punctuated by vibrant "Data Accents."

### Foundation & Surfaces
- **Surface (`#fff5eb`)**: Our primary "Cream" background. Use this to provide a warm, academic feel that is easier on the eyes than pure white.
- **On-Background (`#332e28`)**: Our "Deep Ink." Used for primary body text to ensure maximum legibility against the cream.
- **Inverse Surface (`#110e08`)**: Our "Deep Navy/Black." Use this for high-impact sections (like the Hero or specialized data visualizations) to create dramatic visual pacing.

### Data Accents
- **Primary (`#00a3ff`)**: "Light Blue." Use for main actions (Start, Sign Up) and key interactive states.
- **Secondary (`#fef9c3`) / Secondary Container (`#fef9c3`)**: "Muted Yellow." Use for highlighting critical information, labels, or secondary CTA highlights.

### The "No-Line" Rule
Prohibit the use of standard 1px grey borders for sectioning. Boundaries must be defined by:
1.  **Background Shifts**: Transition from `surface` to `surface-container-low` (`#f9efe4`).
2.  **Structural Borders**: If a line is used, it must be "intentional"—either the `outline` token (`#7d766e`) at a 2px width or a thick offset shadow.

### Signature Textures
Apply a subtle linear gradient to Hero CTA buttons (Transitioning from `primary` to `primary-container`). This adds a "lithographic" quality to the digital interface, preventing the flat, "default" look.

---

## 3. Typography

The typography system is designed to communicate authority through scale and clarity.

*   **Display (Plus Jakarta Sans)**: Bold, oversized, and tightly tracked. These are your "Post-Brutalist" headers. Use `display-lg` (3.5rem) for main impact statements.
*   **Headline (Plus Jakarta Sans)**: Strong and clean. `headline-md` (1.75rem) should be used for section titles to maintain the boxy, structural feel.
*   **Body (Inter)**: The workhorse. `body-lg` (1rem) provides high legibility for dense data descriptions and academic content.
*   **Label (Space Grotesk)**: Our "Technical Monospace." Use `label-md` for data points, tags, and small metadata. This font introduces a "coded" feel that aligns with Data Science.

---

## 4. Elevation & Depth

This system ignores traditional soft shadows in favor of **Tonal Layering** and **Boxy Offsets**.

### The Layering Principle
Depth is achieved by "stacking" the surface-container tiers.
*   **Base**: `surface` (`#fff5eb`)
*   **Nested Content**: `surface-container` (`#f1e6db`)
*   **Raised Content**: `surface-container-highest` (`#e6dbcf`)

### Boxy Offset (The "Hard Shadow")
Instead of soft Gaussian blurs, use an offset border-shadow to mimic the Codecademy reference. 
*   **Style**: 4px offset, 0px blur. 
*   **Color**: Use `on-surface` at 20% opacity for a subtle look, or `on-primary-fixed` at 100% for high-contrast "Brutalist" cards.

### Glassmorphism & Depth
For floating navigation bars or data overlays, use `surface` at 80% opacity with a `20px` backdrop-blur. This softens the rigid grid without breaking the "Academic" feel.

---

## 5. Components

### Buttons
*   **Primary**: Rigid 0px corners. Background: `primary`. Text: `on-primary`. Border: 2px `on-primary-fixed`. 
*   **Secondary**: Rigid 0px corners. Background: `secondary_container`. Text: `on-secondary_container`. 
*   **State Change**: On hover, shift the "Boxy Offset" from 4px to 0px to simulate the button being physically pressed into the page.

### Cards & Containers
*   **Constraint**: Forbid the use of divider lines within cards.
*   **Separation**: Use vertical white space (Spacing `8` or `10`) or a background shift to `surface-container-low`.
*   **The "Dotted" Sidebar**: Mimic the reference images by using a dotted or hatched pattern on the left or right of a container to denote "supplementary data" or "course sidebar" content.

### Input Fields
*   **Style**: 2px solid `outline`. No rounded corners. 
*   **Active State**: Border changes to `primary` with a 4px `primary_container` offset shadow.

### Technical Chips (Labels)
*   **Style**: Use `label-md` in `Space Grotesk`. 
*   **Visual**: Solid `inverse_surface` background with `surface` text. These should look like small, physical labels stuck onto the UI.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use 0px border radius for everything. The system relies on "Boxy" geometry.
*   **Do** use the Spacing Scale strictly. Gaps between sections should be significant (e.g., `16` or `20`) to allow the high-contrast elements to breathe.
*   **Do** overlap elements. Place a `surface-container-highest` card so it slightly overlaps two different background sections to break the "grid" feel.

### Don't:
*   **Don't** use 1px light grey borders. They feel "cheap" and "default." If you need a border, make it thick and intentional.
*   **Don't** use standard shadows. If an element needs to "pop," use a hard-edged offset or a tonal background shift.
*   **Don't** use "Soft" colors. Stick to the high-contrast palette. If the background is Cream, the text must be Deep Ink. Avoid mid-tones for text.

### Accessibility Note:
Ensure that when using the `primary` Light Blue on `surface` Cream, you maintain a contrast ratio of at least 4.5:1. For the `secondary` Yellow, use it primarily for containers with `on-secondary-container` (Dark Brown) text to ensure readability for all users.
