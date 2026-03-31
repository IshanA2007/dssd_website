# DSSD Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page website (Home, Projects, Team, Join) for the UVA Data Science for Sustainable Development club using the "Academic Brutalist" design system defined in CLAUDE.md.

**Architecture:** React 19 SPA with react-router-dom for client-side routing. Plain CSS with CSS custom properties for design tokens — no utility framework, since the design system is highly prescriptive (0px border-radius, hard shadows, specific font pairings). Components are organized by responsibility: layout (Navbar/Footer), reusable UI primitives (Button, Card, Chip, etc.), and page-level compositions.

**Tech Stack:** React 19, TypeScript, Vite, react-router-dom v7, Google Fonts (Plus Jakarta Sans, Inter, Space Grotesk), plain CSS with custom properties.

**Tone:** All website copy must read as a welcoming school club — informative and straightforward, not persuasive startup marketing. "We're a student club that..." not "We bridge the gap between..."

---

## File Structure

```
src/
  styles/
    variables.css          — Design tokens: colors, typography, spacing, shadows
    global.css             — Font imports, resets, base styles
  components/
    Navbar.tsx             — Sticky top nav: DSSD logo, page links, Contact CTA
    Navbar.css
    Footer.tsx             — Site footer: links, org info, copyright
    Footer.css
    Button.tsx             — Primary/Secondary/Outline button variants
    Button.css
    Card.tsx               — Project card with image, title, description, chips
    Card.css
    StatCard.tsx           — Icon + number + label stat box
    StatCard.css
    Chip.tsx               — Technical label chips (Space Grotesk)
    Chip.css
    InputField.tsx         — Form input with label, 2px border, active state
    InputField.css
    TextArea.tsx           — Multi-line form input
    TextArea.css
    AccordionItem.tsx      — FAQ expand/collapse item
    AccordionItem.css
    TeamCard.tsx           — Team member photo + name + role card
    TeamCard.css
    SectionHeader.tsx      — Reusable section title + subtitle + optional link
    SectionHeader.css
  pages/
    Home.tsx               — Hero, stats, featured projects, join CTA
    Home.css
    Projects.tsx           — Filter bar, project grid, propose CTA
    Projects.css
    Team.tsx               — Hero, partnership, board, pillars, join CTA
    Team.css
    Join.tsx               — Hero, form, process, FAQ, newsletter
    Join.css
  data/
    projects.ts            — Project entries: title, description, category, status, tags, icon
    team.ts                — Team member entries: name, role, tag, image placeholder
    stats.ts               — Stat numbers for home page
  App.tsx                  — Router setup with layout wrapper
  App.css                  — Layout wrapper styles
  main.tsx                 — Entry point (exists)
  index.css                — Minimal reset (exists)
index.html                 — Add Google Fonts link (exists)
package.json               — Add react-router-dom (exists)
```

---

## Task 1: Install Dependencies & Configure Fonts

**Files:**
- Modify: `package.json` (add react-router-dom)
- Modify: `index.html` (add Google Fonts preconnect + stylesheet links)

- [ ] **Step 1: Install react-router-dom**

```bash
cd /Users/ishanajwani/Documents/dssd_website && npm install react-router-dom
```

- [ ] **Step 2: Add Google Fonts to index.html**

Add these links inside `<head>`, before the existing `<meta>` tags:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server starts without errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json index.html
git commit -m "chore: add react-router-dom and Google Fonts"
```

---

## Task 2: Design Tokens & Global Styles

**Files:**
- Create: `src/styles/variables.css`
- Create: `src/styles/global.css`
- Modify: `src/index.css` (import variables and global)

- [ ] **Step 1: Create design token variables**

Create `src/styles/variables.css`:

```css
:root {
  /* Foundation & Surfaces */
  --surface: #fff5eb;
  --surface-container-low: #f9efe4;
  --surface-container: #f1e6db;
  --surface-container-highest: #e6dbcf;
  --on-background: #332e28;
  --inverse-surface: #110e08;

  /* Data Accents */
  --primary: #00a3ff;
  --primary-container: #0077cc;
  --on-primary: #ffffff;
  --on-primary-fixed: #110e08;
  --secondary: #fef9c3;
  --secondary-container: #ffd308;
  --on-secondary-container: #332e28;

  /* Structural */
  --outline: #7d766e;

  /* Typography — Display */
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --display-lg: 3.5rem;
  --display-md: 2.75rem;
  --display-sm: 2rem;

  /* Typography — Headline */
  --font-headline: 'Plus Jakarta Sans', sans-serif;
  --headline-lg: 2.25rem;
  --headline-md: 1.75rem;
  --headline-sm: 1.25rem;

  /* Typography — Body */
  --font-body: 'Inter', sans-serif;
  --body-lg: 1rem;
  --body-md: 0.875rem;
  --body-sm: 0.75rem;

  /* Typography — Label */
  --font-label: 'Space Grotesk', monospace;
  --label-lg: 0.875rem;
  --label-md: 0.75rem;
  --label-sm: 0.625rem;

  /* Spacing scale (base 4px) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Shadows — Boxy Offset */
  --shadow-subtle: 4px 4px 0px rgba(51, 46, 40, 0.2);
  --shadow-hard: 4px 4px 0px var(--on-primary-fixed);

  /* Layout */
  --max-width: 1200px;
  --nav-height: 64px;
}
```

- [ ] **Step 2: Create global styles**

Create `src/styles/global.css`:

```css
body {
  font-family: var(--font-body);
  font-size: var(--body-lg);
  color: var(--on-background);
  background-color: var(--surface);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.1;
  margin: 0;
}

p {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

img {
  max-width: 100%;
  display: block;
}

/* Utility: container */
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Label font utility */
.label {
  font-family: var(--font-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

- [ ] **Step 3: Update index.css to import both**

Replace `src/index.css` contents with:

```css
@import './styles/variables.css';
@import './styles/global.css';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/styles/ src/index.css
git commit -m "feat: add design tokens and global styles"
```

---

## Task 3: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Navbar.css`

- [ ] **Step 1: Create Navbar component**

Create `src/components/Navbar.tsx`:

```tsx
import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__logo label">
          DSSD
        </NavLink>
        <ul className="navbar__links">
          <li>
            <NavLink to="/projects" className="navbar__link label">
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/team" className="navbar__link label">
              Team
            </NavLink>
          </li>
          <li>
            <NavLink to="/join" className="navbar__link label">
              Join
            </NavLink>
          </li>
        </ul>
        <NavLink to="/join" className="navbar__cta">
          Contact
        </NavLink>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Create Navbar styles**

Create `src/components/Navbar.css`:

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  background-color: rgba(255, 245, 235, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 2px solid var(--outline);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.navbar__logo {
  font-family: var(--font-label);
  font-size: var(--headline-sm);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.navbar__links {
  display: flex;
  gap: var(--space-8);
}

.navbar__link {
  font-family: var(--font-label);
  font-size: var(--label-lg);
  text-transform: capitalize;
  letter-spacing: 0.02em;
  padding: var(--space-2) 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

.navbar__link:hover,
.navbar__link.active {
  border-bottom-color: var(--on-background);
}

.navbar__cta {
  font-family: var(--font-label);
  font-size: var(--label-lg);
  font-weight: 600;
  padding: var(--space-2) var(--space-6);
  background-color: var(--primary);
  color: var(--on-primary);
  border: 2px solid var(--on-primary-fixed);
  cursor: pointer;
  transition: box-shadow 0.15s;
  box-shadow: var(--shadow-hard);
}

.navbar__cta:hover {
  box-shadow: 0 0 0 transparent;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx src/components/Navbar.css
git commit -m "feat: add Navbar component"
```

---

## Task 4: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Create: `src/components/Footer.css`

- [ ] **Step 1: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__accent" />
      <div className="footer__body">
        <div className="footer__inner container">
          <div className="footer__brand">
            <p className="footer__logo label">DSSD @ UVA</p>
            <p className="footer__tagline">
              The UVA chapter of Data Science for Sustainable Development.
              Engineering data for a better future.
            </p>
          </div>
          <div className="footer__links">
            <div className="footer__col">
              <Link to="/projects" className="footer__link label">Projects</Link>
              <Link to="/team" className="footer__link label">Team</Link>
              <Link to="/join" className="footer__link label">Join</Link>
            </div>
            <div className="footer__col">
              <span className="footer__link label">Contact</span>
              <span className="footer__link label">UVA Data Science</span>
              <span className="footer__link label">Privacy Policy</span>
            </div>
          </div>
          <div className="footer__copy">
            <p className="label">&copy; 2024 UVA Data Science for Sustainable Development. Built with Academic Brutalism.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Create Footer styles**

Create `src/components/Footer.css`:

```css
.footer__accent {
  height: 6px;
  background: linear-gradient(90deg, var(--primary), var(--secondary-container));
}

.footer__body {
  background-color: var(--inverse-surface);
  color: var(--surface);
  padding: var(--space-12) 0 var(--space-8);
}

.footer__inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: var(--space-8);
}

.footer__logo {
  font-size: var(--headline-sm);
  font-weight: 700;
  margin-bottom: var(--space-3);
}

.footer__tagline {
  font-size: var(--body-md);
  opacity: 0.7;
  line-height: 1.5;
  max-width: 280px;
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__link {
  font-size: var(--label-md);
  opacity: 0.7;
  transition: opacity 0.2s;
  cursor: pointer;
}

.footer__link:hover {
  opacity: 1;
}

.footer__copy {
  grid-column: 1 / -1;
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 2px solid rgba(255, 245, 235, 0.15);
  font-size: var(--label-sm);
  opacity: 0.5;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.css
git commit -m "feat: add Footer component"
```

---

## Task 5: Reusable UI Components (Button, Chip, StatCard, Card)

**Files:**
- Create: `src/components/Button.tsx` + `src/components/Button.css`
- Create: `src/components/Chip.tsx` + `src/components/Chip.css`
- Create: `src/components/StatCard.tsx` + `src/components/StatCard.css`
- Create: `src/components/Card.tsx` + `src/components/Card.css`

- [ ] **Step 1: Create Button**

Create `src/components/Button.tsx`:

```tsx
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  to?: string
  onClick?: () => void
}

export default function Button({ children, variant = 'primary', to, onClick }: ButtonProps) {
  const className = `btn btn--${variant}`

  if (to) {
    return <Link to={to} className={className}>{children}</Link>
  }

  return <button className={className} onClick={onClick}>{children}</button>
}
```

Create `src/components/Button.css`:

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-label);
  font-size: var(--label-lg);
  font-weight: 600;
  padding: var(--space-3) var(--space-6);
  border: 2px solid var(--on-primary-fixed);
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s;
  text-decoration: none;
}

.btn--primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-container));
  color: var(--on-primary);
  box-shadow: var(--shadow-hard);
}

.btn--primary:hover {
  box-shadow: 0 0 0 transparent;
  transform: translate(2px, 2px);
}

.btn--secondary {
  background-color: var(--secondary-container);
  color: var(--on-secondary-container);
  box-shadow: var(--shadow-hard);
}

.btn--secondary:hover {
  box-shadow: 0 0 0 transparent;
  transform: translate(2px, 2px);
}

.btn--outline {
  background-color: transparent;
  color: var(--on-background);
  box-shadow: var(--shadow-subtle);
}

.btn--outline:hover {
  box-shadow: 0 0 0 transparent;
  transform: translate(2px, 2px);
}
```

- [ ] **Step 2: Create Chip**

Create `src/components/Chip.tsx`:

```tsx
import './Chip.css'

interface ChipProps {
  label: string
  variant?: 'dark' | 'accent' | 'outline'
}

export default function Chip({ label, variant = 'dark' }: ChipProps) {
  return <span className={`chip chip--${variant} label`}>{label}</span>
}
```

Create `src/components/Chip.css`:

```css
.chip {
  display: inline-block;
  font-size: var(--label-md);
  padding: var(--space-1) var(--space-3);
  border: 2px solid var(--on-primary-fixed);
  white-space: nowrap;
}

.chip--dark {
  background-color: var(--inverse-surface);
  color: var(--surface);
}

.chip--accent {
  background-color: var(--secondary-container);
  color: var(--on-secondary-container);
}

.chip--outline {
  background-color: transparent;
  color: var(--on-background);
}
```

- [ ] **Step 3: Create StatCard**

Create `src/components/StatCard.tsx`:

```tsx
import './StatCard.css'

interface StatCardProps {
  icon: string
  value: string
  label: string
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-card__icon">{icon}</span>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label label">{label}</p>
    </div>
  )
}
```

Create `src/components/StatCard.css`:

```css
.stat-card {
  border: 2px solid var(--on-primary-fixed);
  padding: var(--space-6);
  background-color: var(--surface);
}

.stat-card__icon {
  font-size: 1.5rem;
  margin-bottom: var(--space-2);
  display: block;
}

.stat-card__value {
  font-family: var(--font-display);
  font-size: var(--display-sm);
  font-weight: 800;
  color: var(--primary);
}

.stat-card__label {
  font-size: var(--label-md);
  margin-top: var(--space-1);
  opacity: 0.7;
}
```

- [ ] **Step 4: Create Card (project card)**

Create `src/components/Card.tsx`:

```tsx
import Chip from './Chip'
import './Card.css'

interface CardProps {
  title: string
  description: string
  category: string
  status: 'Active' | 'Completed'
  tags: string[]
  icon?: string
}

export default function Card({ title, description, category, status, tags, icon }: CardProps) {
  return (
    <article className="card">
      <div className="card__image">
        <Chip
          label={status}
          variant={status === 'Active' ? 'accent' : 'dark'}
        />
      </div>
      <div className="card__body">
        <div className="card__title-row">
          <h3 className="card__title">{title}</h3>
          {icon && <span className="card__icon">{icon}</span>}
        </div>
        <p className="card__desc">{description}</p>
        <div className="card__footer">
          <span className="card__category label">{category}</span>
          <span className="card__link label">View Case Study &rarr;</span>
        </div>
        {tags.length > 0 && (
          <div className="card__tags">
            {tags.map(tag => <Chip key={tag} label={tag} variant="outline" />)}
          </div>
        )}
      </div>
    </article>
  )
}
```

Create `src/components/Card.css`:

```css
.card {
  border: 2px solid var(--on-primary-fixed);
  background-color: var(--surface);
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: var(--shadow-hard);
  transform: translate(-2px, -2px);
}

.card__image {
  height: 200px;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  position: relative;
  overflow: hidden;
  padding: var(--space-3);
}

.card__body {
  padding: var(--space-6);
}

.card__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.card__title {
  font-size: var(--headline-sm);
  font-weight: 700;
}

.card__icon {
  font-size: 1.25rem;
}

.card__desc {
  font-size: var(--body-md);
  color: var(--on-background);
  opacity: 0.8;
  line-height: 1.5;
  margin-bottom: var(--space-6);
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.card__category {
  font-size: var(--label-md);
  opacity: 0.6;
}

.card__link {
  font-size: var(--label-md);
  color: var(--primary);
  cursor: pointer;
}

.card__tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/Button.tsx src/components/Button.css src/components/Chip.tsx src/components/Chip.css src/components/StatCard.tsx src/components/StatCard.css src/components/Card.tsx src/components/Card.css
git commit -m "feat: add reusable UI components (Button, Chip, StatCard, Card)"
```

---

## Task 6: Form Components (InputField, TextArea, AccordionItem)

**Files:**
- Create: `src/components/InputField.tsx` + `src/components/InputField.css`
- Create: `src/components/TextArea.tsx` + `src/components/TextArea.css`
- Create: `src/components/AccordionItem.tsx` + `src/components/AccordionItem.css`

- [ ] **Step 1: Create InputField**

Create `src/components/InputField.tsx`:

```tsx
import './InputField.css'

interface InputFieldProps {
  label: string
  placeholder?: string
  type?: string
}

export default function InputField({ label, placeholder, type = 'text' }: InputFieldProps) {
  return (
    <div className="input-field">
      <label className="input-field__label label">{label}</label>
      <input
        className="input-field__input"
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}
```

Create `src/components/InputField.css`:

```css
.input-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input-field__label {
  font-size: var(--label-md);
}

.input-field__input {
  font-family: var(--font-body);
  font-size: var(--body-lg);
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--outline);
  background-color: var(--surface);
  color: var(--on-background);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field__input:focus {
  border-color: var(--primary);
  box-shadow: 4px 4px 0px var(--primary-container);
}

.input-field__input::placeholder {
  color: var(--outline);
}
```

- [ ] **Step 2: Create TextArea**

Create `src/components/TextArea.tsx`:

```tsx
import './TextArea.css'

interface TextAreaProps {
  label: string
  placeholder?: string
  rows?: number
}

export default function TextArea({ label, placeholder, rows = 5 }: TextAreaProps) {
  return (
    <div className="textarea-field">
      <label className="textarea-field__label label">{label}</label>
      <textarea
        className="textarea-field__input"
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  )
}
```

Create `src/components/TextArea.css`:

```css
.textarea-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.textarea-field__label {
  font-size: var(--label-md);
}

.textarea-field__input {
  font-family: var(--font-body);
  font-size: var(--body-lg);
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--outline);
  background-color: var(--surface);
  color: var(--on-background);
  outline: none;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.textarea-field__input:focus {
  border-color: var(--primary);
  box-shadow: 4px 4px 0px var(--primary-container);
}

.textarea-field__input::placeholder {
  color: var(--outline);
}
```

- [ ] **Step 3: Create AccordionItem**

Create `src/components/AccordionItem.tsx`:

```tsx
import { useState } from 'react'
import './AccordionItem.css'

interface AccordionItemProps {
  question: string
  answer: string
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`accordion ${isOpen ? 'accordion--open' : ''}`}>
      <button
        className="accordion__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion__question">{question}</span>
        <span className="accordion__icon">{isOpen ? '\u2212' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion__content">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}
```

Create `src/components/AccordionItem.css`:

```css
.accordion {
  border-bottom: 2px solid var(--outline);
}

.accordion__trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6) 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-headline);
  font-size: var(--headline-sm);
  font-weight: 600;
  color: var(--on-background);
  text-align: left;
}

.accordion__icon {
  font-size: 1.5rem;
  color: var(--primary);
  flex-shrink: 0;
  margin-left: var(--space-4);
}

.accordion__content {
  padding-bottom: var(--space-6);
  font-size: var(--body-lg);
  line-height: 1.6;
  opacity: 0.8;
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/InputField.tsx src/components/InputField.css src/components/TextArea.tsx src/components/TextArea.css src/components/AccordionItem.tsx src/components/AccordionItem.css
git commit -m "feat: add form components (InputField, TextArea, AccordionItem)"
```

---

## Task 7: TeamCard & SectionHeader Components

**Files:**
- Create: `src/components/TeamCard.tsx` + `src/components/TeamCard.css`
- Create: `src/components/SectionHeader.tsx` + `src/components/SectionHeader.css`

- [ ] **Step 1: Create TeamCard**

Create `src/components/TeamCard.tsx`:

```tsx
import Chip from './Chip'
import './TeamCard.css'

interface TeamCardProps {
  name: string
  role: string
  tag: string
  tagVariant?: 'dark' | 'accent'
}

export default function TeamCard({ name, role, tag, tagVariant = 'dark' }: TeamCardProps) {
  return (
    <div className="team-card">
      <div className="team-card__image">
        <div className="team-card__tag">
          <Chip label={tag} variant={tagVariant} />
        </div>
      </div>
      <p className="team-card__name">{name}</p>
      <p className="team-card__role label">{role}</p>
    </div>
  )
}
```

Create `src/components/TeamCard.css`:

```css
.team-card {
  border: 2px solid var(--on-primary-fixed);
}

.team-card__image {
  height: 220px;
  background: linear-gradient(135deg, #2d2d2d, #1a1a1a);
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: var(--space-3);
}

.team-card__tag {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
}

.team-card__name {
  font-family: var(--font-headline);
  font-size: var(--body-lg);
  font-weight: 600;
  padding: var(--space-3) var(--space-4) var(--space-1);
}

.team-card__role {
  font-size: var(--label-md);
  color: var(--primary);
  padding: 0 var(--space-4) var(--space-4);
}
```

- [ ] **Step 2: Create SectionHeader**

Create `src/components/SectionHeader.tsx`:

```tsx
import { Link } from 'react-router-dom'
import './SectionHeader.css'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  linkText?: string
  linkTo?: string
}

export default function SectionHeader({ title, subtitle, linkText, linkTo }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-header__title">{title}</h2>
        {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      </div>
      {linkText && linkTo && (
        <Link to={linkTo} className="section-header__link label">
          {linkText} &rarr;
        </Link>
      )}
    </div>
  )
}
```

Create `src/components/SectionHeader.css`:

```css
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-10);
}

.section-header__title {
  font-size: var(--headline-lg);
  font-weight: 800;
}

.section-header__subtitle {
  margin-top: var(--space-2);
  font-size: var(--body-md);
  opacity: 0.7;
  max-width: 400px;
}

.section-header__link {
  font-size: var(--label-lg);
  color: var(--primary);
  white-space: nowrap;
}

.section-header__link:hover {
  text-decoration: underline;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TeamCard.tsx src/components/TeamCard.css src/components/SectionHeader.tsx src/components/SectionHeader.css
git commit -m "feat: add TeamCard and SectionHeader components"
```

---

## Task 8: Data Files

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/team.ts`
- Create: `src/data/stats.ts`

- [ ] **Step 1: Create project data**

Create `src/data/projects.ts`:

```ts
export interface Project {
  id: string
  title: string
  description: string
  category: 'Sustainability' | 'Social Equity' | 'Education' | 'Public Health'
  status: 'Active' | 'Completed'
  tags: string[]
  icon: string
}

export const projects: Project[] = [
  {
    id: 'renewable-energy',
    title: 'Renewable Energy Mapping',
    description: 'Developing a geospatial dashboard to identify optimal locations for micro-grid solar installations across Virginia\'s rural counties.',
    category: 'Sustainability',
    status: 'Active',
    tags: ['Python', 'GIS', 'Tableau'],
    icon: '\u26a1',
  },
  {
    id: 'food-desert',
    title: 'Food Desert Analytics',
    description: 'Analyzing transit patterns and grocery store accessibility to propose mobile market routes for underserved Charlottesville neighborhoods.',
    category: 'Social Equity',
    status: 'Completed',
    tags: ['R', 'SQL', 'Leaflet'],
    icon: '\ud83c\udf7d\ufe0f',
  },
  {
    id: 'enrollment-ai',
    title: 'Predictive Enrollment AI',
    description: 'Using machine learning to predict dropout risks and resource needs for local K-12 public schools based on historical socio-economic data.',
    category: 'Education',
    status: 'Active',
    tags: ['Python', 'scikit-learn', 'Pandas'],
    icon: '\ud83c\udf93',
  },
  {
    id: 'water-quality',
    title: 'Water Quality Sensors',
    description: 'An automated pipeline for cleaning and visualizing real-time sensor data from local river basins to track pollutant spikes.',
    category: 'Public Health',
    status: 'Completed',
    tags: ['Python', 'PostgreSQL', 'D3.js'],
    icon: '\ud83d\udca7',
  },
  {
    id: 'equitable-zoning',
    title: 'Equitable Zoning Study',
    description: 'Modeling the impact of proposed zoning changes on housing affordability and demographic displacement in university towns.',
    category: 'Social Equity',
    status: 'Active',
    tags: ['R', 'Census API', 'ggplot2'],
    icon: '\ud83c\udfd7\ufe0f',
  },
]

export const featuredProjects = projects.slice(0, 3)

export const categories = ['All Projects', 'Sustainability', 'Social Equity', 'Education', 'Public Health'] as const
```

- [ ] **Step 2: Create team data**

Create `src/data/team.ts`:

```ts
export interface TeamMember {
  name: string
  role: string
  tag: string
  tagVariant: 'dark' | 'accent'
}

export const executiveBoard: TeamMember[] = [
  { name: 'Ethan Carter', role: 'Director of Technology', tag: 'Leadership', tagVariant: 'accent' },
  { name: 'Maya Rodriguez', role: 'Project Coordinator', tag: 'Operations', tagVariant: 'dark' },
  { name: 'Julian Smith', role: 'Head of Data Ethics', tag: 'Research', tagVariant: 'dark' },
  { name: 'Sarah Chen', role: 'Outreach Director', tag: 'Community', tagVariant: 'dark' },
]

export const corePillars = [
  {
    number: '01',
    title: 'Academic Excellence',
    description: 'We maintain high-level research standards and rigorous data validation across all projects to ensure credible, peer-reviewable insights.',
  },
  {
    number: '02',
    title: 'Sustainable Solutions',
    description: 'Focusing on long-term ecological and social outcomes, our data models prioritize the health of our planet and local communities.',
  },
  {
    number: '03',
    title: 'Collaborative Innovation',
    description: 'We believe that the best data science happens in teams. We break down silos between engineers, policy experts, and environmental scientists to build holistic tools.',
  },
]
```

- [ ] **Step 3: Create stats data**

Create `src/data/stats.ts`:

```ts
export const homeStats = [
  { icon: '\ud83d\ude80', value: '15+', label: 'Projects Completed' },
  { icon: '\ud83d\udc65', value: '50+', label: 'Active Members' },
  { icon: '\ud83c\udf10', value: '8', label: 'Global Partners' },
  { icon: '\ud83d\udcca', value: '10k+', label: 'Data Points Mapped' },
]

export const faqItems = [
  {
    question: 'Do I need prior experience?',
    answer: 'No! We welcome all skill levels. We have "Junior Researcher" roles for those looking to learn and "Lead" roles for experienced data scientists.',
  },
  {
    question: 'What is the time commitment?',
    answer: 'Most members spend 3-5 hours per week on projects. General body meetings are bi-weekly on Tuesday evenings.',
  },
  {
    question: 'Who can join?',
    answer: 'Any UVA student\u2014undergraduate or graduate\u2014from any major. Sustainability needs diverse perspectives!',
  },
]
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add project, team, and stats data"
```

---

## Task 9: Router Setup & Layout in App.tsx

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css`
- Create: `src/pages/Home.tsx` (stub)
- Create: `src/pages/Projects.tsx` (stub)
- Create: `src/pages/Team.tsx` (stub)
- Create: `src/pages/Join.tsx` (stub)

- [ ] **Step 1: Create page stubs**

Create all four page files as minimal stubs so the router compiles:

`src/pages/Home.tsx`:
```tsx
export default function Home() {
  return <div className="page-home"><h1>Home</h1></div>
}
```

`src/pages/Projects.tsx`:
```tsx
export default function Projects() {
  return <div className="page-projects"><h1>Projects</h1></div>
}
```

`src/pages/Team.tsx`:
```tsx
export default function Team() {
  return <div className="page-team"><h1>Team</h1></div>
}
```

`src/pages/Join.tsx`:
```tsx
export default function Join() {
  return <div className="page-join"><h1>Join</h1></div>
}
```

- [ ] **Step 2: Update App.tsx with router and layout**

Replace `src/App.tsx`:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Team from './pages/Team'
import Join from './pages/Join'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
```

- [ ] **Step 3: Update App.css**

Replace `src/App.css`:

```css
.app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}
```

- [ ] **Step 4: Verify dev server — navigate all 4 routes**

```bash
npm run dev
```

Visit `/`, `/projects`, `/team`, `/join` — each should render its stub heading with Navbar and Footer.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.css src/pages/
git commit -m "feat: add router, layout, and page stubs"
```

---

## Task 10: Home Page

**Files:**
- Modify: `src/pages/Home.tsx`
- Create: `src/pages/Home.css`

- [ ] **Step 1: Implement Home page**

Replace `src/pages/Home.tsx`:

```tsx
import Chip from '../components/Chip'
import Button from '../components/Button'
import StatCard from '../components/StatCard'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import { homeStats } from '../data/stats'
import { featuredProjects } from '../data/projects'
import './Home.css'

export default function Home() {
  return (
    <div className="page-home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__inner container">
          <Chip label="Est. at UVA" variant="accent" />
          <h1 className="hero__title">
            Data Science for<br />
            <span className="hero__accent">Social Impact.</span>
          </h1>
          <p className="hero__subtitle">
            We're a student-run club at UVA that uses data science to tackle
            real-world sustainability challenges. Our members collaborate on
            projects with local organizations, non-profits, and government
            agencies.
          </p>
          <div className="hero__actions">
            <Button to="/projects">Explore Our Projects</Button>
            <Button to="/join" variant="outline">Apply to Join</Button>
          </div>
          <div className="hero__partner">
            <span className="label">Partnered with</span>
            <span className="hero__partner-name">University of Virginia</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stats__inner container">
          <div className="stats__text">
            <h2 className="stats__heading">
              Driving change through<br />
              <span className="stats__heading-accent">quantifiable evidence.</span>
            </h2>
            <p className="stats__desc">
              Our members work with NGOs, government agencies, and local
              non-profits to turn raw data into actionable insights for
              sustainable growth and community development.
            </p>
          </div>
          <div className="stats__grid">
            {homeStats.map(stat => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Impact */}
      <section className="featured container">
        <SectionHeader
          title="Featured Impact"
          subtitle="Highlighting our most recent collaborations in sustainability and data ethics."
          linkText="View All Projects"
          linkTo="/projects"
        />
        <div className="featured__grid">
          {featuredProjects.map(project => (
            <Card key={project.id} {...project} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="home-cta__inner container">
          <h2 className="home-cta__title">Interested in Joining?</h2>
          <p className="home-cta__text">
            We are always looking for passionate data scientists, developers, and
            designers to join our club at UVA.
          </p>
          <Button to="/join" variant="secondary">Join the Team</Button>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create Home page styles**

Create `src/pages/Home.css`:

```css
/* Hero */
.hero {
  background-color: var(--inverse-surface);
  color: var(--surface);
  padding: var(--space-20) 0 var(--space-16);
}

.hero__title {
  font-size: var(--display-lg);
  font-weight: 800;
  margin-top: var(--space-6);
  margin-bottom: var(--space-6);
}

.hero__accent {
  color: var(--secondary-container);
  font-style: italic;
}

.hero__subtitle {
  max-width: 520px;
  font-size: var(--body-lg);
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.hero__partner {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 2px solid rgba(255, 245, 235, 0.15);
  font-size: var(--body-md);
  opacity: 0.6;
}

.hero__partner-name {
  font-family: var(--font-headline);
  font-weight: 600;
  opacity: 1;
}

/* Stats */
.stats {
  background-color: var(--surface-container-low);
  padding: var(--space-20) 0;
}

.stats__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
}

.stats__heading {
  font-size: var(--headline-lg);
  font-weight: 800;
  margin-bottom: var(--space-6);
}

.stats__heading-accent {
  color: var(--primary);
}

.stats__desc {
  font-size: var(--body-md);
  opacity: 0.7;
  line-height: 1.6;
  max-width: 400px;
}

.stats__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

/* Featured */
.featured {
  padding: var(--space-20) 0;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

/* CTA */
.home-cta {
  background-color: var(--inverse-surface);
  color: var(--surface);
  padding: var(--space-20) 0;
  text-align: center;
}

.home-cta__title {
  font-size: var(--display-sm);
  font-weight: 800;
  margin-bottom: var(--space-4);
}

.home-cta__text {
  font-size: var(--body-lg);
  opacity: 0.7;
  max-width: 480px;
  margin: 0 auto var(--space-8);
}
```

- [ ] **Step 3: Verify visually**

Open `http://localhost:5173/` and compare with the Home screenshot. Check hero, stats grid, featured cards, and CTA section.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.tsx src/pages/Home.css
git commit -m "feat: implement Home page"
```

---

## Task 11: Projects Page

**Files:**
- Modify: `src/pages/Projects.tsx`
- Create: `src/pages/Projects.css`

- [ ] **Step 1: Implement Projects page**

Replace `src/pages/Projects.tsx`:

```tsx
import { useState } from 'react'
import Chip from '../components/Chip'
import Button from '../components/Button'
import Card from '../components/Card'
import { projects, categories } from '../data/projects'
import './Projects.css'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All Projects')

  const filtered = activeFilter === 'All Projects'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="page-projects">
      {/* Hero */}
      <section className="projects-hero container">
        <Chip label="Portfolio" variant="accent" />
        <h1 className="projects-hero__title">Our Impactful Projects</h1>
        <p className="projects-hero__subtitle">
          Applying rigorous data science methodologies to solve pressing social
          and environmental challenges within the UVA community and beyond.
        </p>
      </section>

      {/* Filters */}
      <section className="projects-filters container">
        <span className="projects-filters__label label">Filter by Area:</span>
        <div className="projects-filters__list">
          {categories.map(cat => (
            <button
              key={cat}
              className={`projects-filters__btn label ${activeFilter === cat ? 'projects-filters__btn--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="projects-grid container">
        {filtered.map(project => (
          <Card key={project.id} {...project} />
        ))}
        {/* Propose card */}
        <div className="propose-card">
          <div className="propose-card__icon">+</div>
          <h3 className="propose-card__title">Your Project Here?</h3>
          <p className="propose-card__text">
            We are always looking for new partnerships with non-profits and
            community organizations.
          </p>
          <Button variant="secondary">Propose a Project</Button>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="projects-cta container">
        <div className="projects-cta__inner">
          <div>
            <h2 className="projects-cta__title">Have a project idea? Reach out!</h2>
            <p className="projects-cta__text">
              Whether you are a student looking to contribute or an organization
              with data that needs unlocking, we want to hear from you. Let's
              build something sustainable together.
            </p>
            <div className="projects-cta__actions">
              <Button>Submit Inquiry</Button>
              <Button to="/join" variant="outline">Join the Team</Button>
            </div>
          </div>
          <div className="projects-cta__stat">
            <p className="projects-cta__stat-value">12+</p>
            <p className="projects-cta__stat-label label">Active Partners</p>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create Projects page styles**

Create `src/pages/Projects.css`:

```css
.projects-hero {
  padding: var(--space-16) 0 var(--space-10);
}

.projects-hero__title {
  font-size: var(--display-md);
  font-weight: 800;
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
}

.projects-hero__subtitle {
  max-width: 500px;
  font-size: var(--body-lg);
  opacity: 0.7;
  line-height: 1.6;
}

/* Filters */
.projects-filters {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding-bottom: var(--space-10);
}

.projects-filters__label {
  font-size: var(--label-md);
  opacity: 0.6;
}

.projects-filters__list {
  display: flex;
  gap: var(--space-2);
}

.projects-filters__btn {
  font-family: var(--font-label);
  font-size: var(--label-md);
  padding: var(--space-2) var(--space-4);
  border: 2px solid var(--outline);
  background: transparent;
  cursor: pointer;
  color: var(--on-background);
  transition: background-color 0.15s, border-color 0.15s;
}

.projects-filters__btn--active {
  background-color: var(--inverse-surface);
  color: var(--surface);
  border-color: var(--inverse-surface);
}

.projects-filters__btn:hover:not(.projects-filters__btn--active) {
  border-color: var(--on-background);
}

/* Grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  padding-bottom: var(--space-20);
}

/* Propose card */
.propose-card {
  border: 2px solid var(--on-primary-fixed);
  background-color: var(--secondary-container);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--space-4);
}

.propose-card__icon {
  width: 48px;
  height: 48px;
  border: 2px solid var(--on-primary-fixed);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: var(--surface);
}

.propose-card__title {
  font-size: var(--headline-sm);
  font-weight: 700;
}

.propose-card__text {
  font-size: var(--body-md);
  opacity: 0.8;
}

/* Bottom CTA */
.projects-cta {
  padding: var(--space-20) 0;
  border-top: 2px solid var(--outline);
}

.projects-cta__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
}

.projects-cta__title {
  font-size: var(--headline-lg);
  font-weight: 800;
  margin-bottom: var(--space-4);
}

.projects-cta__text {
  font-size: var(--body-lg);
  opacity: 0.7;
  line-height: 1.6;
  margin-bottom: var(--space-8);
  max-width: 480px;
}

.projects-cta__actions {
  display: flex;
  gap: var(--space-4);
}

.projects-cta__stat {
  background-color: var(--secondary);
  border: 2px solid var(--on-primary-fixed);
  padding: var(--space-12);
  text-align: center;
}

.projects-cta__stat-value {
  font-family: var(--font-display);
  font-size: var(--display-lg);
  font-weight: 800;
  color: var(--primary);
}

.projects-cta__stat-label {
  font-size: var(--label-lg);
  margin-top: var(--space-2);
  opacity: 0.6;
}
```

- [ ] **Step 3: Verify visually**

Open `/projects`, test filter buttons, check card grid layout, propose card, and bottom CTA.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Projects.tsx src/pages/Projects.css
git commit -m "feat: implement Projects page with category filters"
```

---

## Task 12: Team Page

**Files:**
- Modify: `src/pages/Team.tsx`
- Create: `src/pages/Team.css`

- [ ] **Step 1: Implement Team page**

Replace `src/pages/Team.tsx`:

```tsx
import Chip from '../components/Chip'
import Button from '../components/Button'
import TeamCard from '../components/TeamCard'
import { executiveBoard, corePillars } from '../data/team'
import './Team.css'

export default function Team() {
  return (
    <div className="page-team">
      {/* Hero */}
      <section className="team-hero">
        <div className="team-hero__inner container">
          <div className="team-hero__text">
            <Chip label="Who We Are" variant="accent" />
            <h1 className="team-hero__title">
              The Team Behind<br />
              <span className="team-hero__accent">the Data</span>
            </h1>
            <p className="team-hero__subtitle">
              We are a multidisciplinary collective of UVA students dedicated to
              using data science as a tool for humanitarian impact and
              sustainable development.
            </p>
          </div>
          <div className="team-hero__image" />
        </div>
      </section>

      {/* Partnership Banner */}
      <section className="partnership">
        <div className="partnership__inner container">
          <div className="partnership__badge">
            <span>&#x1f393;</span>
            <span className="label">Official Partnership</span>
          </div>
          <p className="partnership__quote">
            "Bridging the gap between academic rigor and global sustainability in
            partnership with the <strong>UVA School of Data Science.</strong>"
          </p>
        </div>
      </section>

      {/* Executive Board */}
      <section className="board container">
        <div className="board__header">
          <h2 className="board__title">Executive Board</h2>
          <span className="board__year label">2023 - 2024</span>
        </div>
        <div className="board__grid">
          {executiveBoard.map(member => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </section>

      {/* Core Pillars */}
      <section className="pillars container">
        <div className="pillars__inner">
          <div className="pillars__intro">
            <h2 className="pillars__title">Our Core<br />Pillars</h2>
            <p className="pillars__desc">
              Guided by the principles of ethical data science and sustainable
              progress.
            </p>
            <div className="pillars__bar" />
          </div>
          <div className="pillars__grid">
            {corePillars.map(pillar => (
              <div key={pillar.number} className="pillar-card">
                <span className="pillar-card__number label">{pillar.number}.</span>
                <h3 className="pillar-card__title">{pillar.title}</h3>
                <p className="pillar-card__desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="team-cta container">
        <div className="team-cta__card">
          <h2 className="team-cta__title">Ready to make an impact?</h2>
          <p className="team-cta__text">
            We are always looking for passionate students to join our research
            pods and development cycles.
          </p>
          <div className="team-cta__actions">
            <Button to="/join">Apply to Join</Button>
            <Button to="/projects" variant="outline">View Open Projects</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create Team page styles**

Create `src/pages/Team.css`:

```css
/* Hero */
.team-hero {
  padding: var(--space-16) 0;
  border-bottom: 2px solid var(--outline);
}

.team-hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
}

.team-hero__title {
  font-size: var(--display-md);
  font-weight: 800;
  margin-top: var(--space-4);
  margin-bottom: var(--space-6);
}

.team-hero__accent {
  color: var(--primary);
}

.team-hero__subtitle {
  max-width: 400px;
  font-size: var(--body-lg);
  opacity: 0.7;
  line-height: 1.6;
}

.team-hero__image {
  height: 300px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid var(--on-primary-fixed);
}

/* Partnership */
.partnership {
  background-color: var(--inverse-surface);
  color: var(--surface);
  padding: var(--space-6) 0;
}

.partnership__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.partnership__badge {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--label-lg);
}

.partnership__quote {
  font-size: var(--body-md);
  font-style: italic;
  opacity: 0.8;
  max-width: 480px;
  text-align: right;
}

/* Board */
.board {
  padding: var(--space-20) 0;
}

.board__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-10);
  padding-bottom: var(--space-4);
  border-bottom: 2px solid var(--outline);
}

.board__title {
  font-size: var(--headline-lg);
  font-weight: 800;
}

.board__year {
  font-size: var(--label-lg);
  opacity: 0.5;
}

.board__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

/* Pillars */
.pillars {
  padding: var(--space-16) 0 var(--space-20);
}

.pillars__inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-12);
  align-items: start;
}

.pillars__title {
  font-size: var(--headline-lg);
  font-weight: 800;
  margin-bottom: var(--space-4);
}

.pillars__desc {
  font-size: var(--body-md);
  opacity: 0.7;
  line-height: 1.5;
}

.pillars__bar {
  width: 60px;
  height: 4px;
  background-color: var(--primary);
  margin-top: var(--space-6);
}

.pillars__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.pillar-card {
  border: 2px solid var(--on-primary-fixed);
  padding: var(--space-8);
}

.pillar-card__number {
  font-size: var(--label-lg);
  color: var(--primary);
  margin-bottom: var(--space-3);
  display: block;
}

.pillar-card__title {
  font-size: var(--headline-sm);
  font-weight: 700;
  margin-bottom: var(--space-3);
}

.pillar-card__desc {
  font-size: var(--body-md);
  opacity: 0.7;
  line-height: 1.5;
}

/* CTA */
.team-cta {
  padding: var(--space-16) 0 var(--space-20);
}

.team-cta__card {
  border: 2px solid var(--on-primary-fixed);
  padding: var(--space-12);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.team-cta__title {
  font-size: var(--headline-lg);
  font-weight: 800;
  margin-bottom: var(--space-4);
}

.team-cta__text {
  font-size: var(--body-lg);
  opacity: 0.7;
  margin-bottom: var(--space-8);
}

.team-cta__actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
}
```

- [ ] **Step 3: Verify visually**

Open `/team`, check hero layout, partnership banner, board grid, pillars, and CTA card.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Team.tsx src/pages/Team.css
git commit -m "feat: implement Team page"
```

---

## Task 13: Join Page

**Files:**
- Modify: `src/pages/Join.tsx`
- Create: `src/pages/Join.css`

- [ ] **Step 1: Implement Join page**

Replace `src/pages/Join.tsx`:

```tsx
import Chip from '../components/Chip'
import Button from '../components/Button'
import InputField from '../components/InputField'
import TextArea from '../components/TextArea'
import AccordionItem from '../components/AccordionItem'
import { faqItems } from '../data/stats'
import './Join.css'

export default function Join() {
  return (
    <div className="page-join">
      {/* Hero */}
      <section className="join-hero">
        <div className="join-hero__inner container">
          <Chip label="Applications Open: Spring 2024" variant="accent" />
          <h1 className="join-hero__title">
            Join the<br />
            <span className="join-hero__accent">Movement</span>
          </h1>
          <p className="join-hero__subtitle">
            DSSD at UVA empowers students to tackle real-world sustainability
            challenges through data-driven research. Apply to join our
            interdisciplinary teams and make a tangible impact.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="join-content container">
        <div className="join-form-wrapper">
          <div className="join-form">
            <h2 className="join-form__heading">
              <span>&#x270f;&#xfe0f;</span> Candidate Information
            </h2>
            <div className="join-form__row">
              <InputField label="Full Name" placeholder="Thomas Jefferson" />
              <InputField label="Computing ID" placeholder="abc1def" />
            </div>
            <InputField label="Major / Field of Study" placeholder="Data Science, Environmental Science, etc." />
            <TextArea
              label="Why do you want to join DSSD?"
              placeholder="Tell us about your interest in sustainable development and data..."
              rows={5}
            />
            <Button>Submit Application &nbsp;&#x27A4;</Button>
          </div>
        </div>

        <div className="join-sidebar">
          {/* Process */}
          <div className="join-process">
            <h3 className="join-process__title">Application Process</h3>
            <ol className="join-process__steps">
              <li className="join-process__step">
                <span className="join-process__num">1</span>
                <div>
                  <strong>Online Application</strong>
                  <p>Submit this form before the February 15th deadline.</p>
                </div>
              </li>
              <li className="join-process__step">
                <span className="join-process__num">2</span>
                <div>
                  <strong>Interview Phase</strong>
                  <p>Short 15-minute coffee chats with project leads.</p>
                </div>
              </li>
              <li className="join-process__step">
                <span className="join-process__num">3</span>
                <div>
                  <strong>Team Placement</strong>
                  <p>Matching your skills with active sustainability projects.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* FAQ */}
          <div className="join-faq">
            <h3 className="join-faq__title">
              <span>&#x1f4cb;</span> Common Questions
            </h3>
            {faqItems.map(item => (
              <AccordionItem key={item.question} {...item} />
            ))}
          </div>

          {/* Image */}
          <div className="join-image">
            <Chip label="Student Driven" variant="accent" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="newsletter__inner container">
          <h2 className="newsletter__title">
            <em>Not ready to apply yet?</em>
          </h2>
          <p className="newsletter__text">
            Stay informed about our public workshops and open data events.
          </p>
          <div className="newsletter__form">
            <input
              className="newsletter__input"
              type="email"
              placeholder="Email Address"
            />
            <button className="newsletter__btn label">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Create Join page styles**

Create `src/pages/Join.css`:

```css
/* Hero */
.join-hero {
  background-color: var(--inverse-surface);
  color: var(--surface);
  padding: var(--space-16) 0;
}

.join-hero__title {
  font-size: var(--display-md);
  font-weight: 800;
  margin-top: var(--space-4);
  margin-bottom: var(--space-6);
}

.join-hero__accent {
  color: var(--secondary-container);
  font-style: italic;
}

.join-hero__subtitle {
  max-width: 520px;
  font-size: var(--body-lg);
  opacity: 0.8;
  line-height: 1.6;
}

/* Content */
.join-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  padding: var(--space-16) 0;
  align-items: start;
}

/* Form */
.join-form {
  border: 2px solid var(--on-primary-fixed);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.join-form__heading {
  font-size: var(--headline-md);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.join-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

/* Sidebar */
.join-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* Process */
.join-process {
  background-color: var(--surface-container-low);
  border: 2px solid var(--on-primary-fixed);
  padding: var(--space-8);
}

.join-process__title {
  font-size: var(--headline-md);
  font-weight: 700;
  margin-bottom: var(--space-6);
}

.join-process__steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.join-process__step {
  display: flex;
  gap: var(--space-4);
}

.join-process__num {
  width: 32px;
  height: 32px;
  background-color: var(--primary);
  color: var(--on-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-label);
  font-weight: 700;
  font-size: var(--label-lg);
  flex-shrink: 0;
}

.join-process__step p {
  font-size: var(--body-md);
  opacity: 0.7;
  margin-top: var(--space-1);
}

/* FAQ */
.join-faq__title {
  font-size: var(--headline-md);
  font-weight: 700;
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Image */
.join-image {
  height: 250px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid var(--on-primary-fixed);
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: var(--space-4);
}

/* Newsletter */
.newsletter {
  background-color: var(--inverse-surface);
  color: var(--surface);
  padding: var(--space-16) 0;
  text-align: center;
}

.newsletter__title {
  font-size: var(--headline-lg);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.newsletter__text {
  font-size: var(--body-lg);
  opacity: 0.7;
  margin-bottom: var(--space-8);
}

.newsletter__form {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  max-width: 460px;
  margin: 0 auto;
}

.newsletter__input {
  flex: 1;
  font-family: var(--font-body);
  font-size: var(--body-lg);
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--outline);
  background-color: transparent;
  color: var(--surface);
  outline: none;
}

.newsletter__input:focus {
  border-color: var(--primary);
}

.newsletter__input::placeholder {
  color: var(--outline);
}

.newsletter__btn {
  padding: var(--space-3) var(--space-6);
  background-color: var(--primary);
  color: var(--on-primary);
  border: 2px solid var(--primary);
  font-family: var(--font-label);
  font-size: var(--label-lg);
  font-weight: 600;
  cursor: pointer;
}
```

- [ ] **Step 3: Verify visually**

Open `/join`, check form layout, process steps, FAQ accordion, newsletter section.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Join.tsx src/pages/Join.css
git commit -m "feat: implement Join page with form, FAQ, and newsletter"
```

---

## Task 14: Responsive Styles

**Files:**
- Create: `src/styles/responsive.css`
- Modify: `src/index.css` (import responsive.css)

- [ ] **Step 1: Create responsive breakpoints**

Create `src/styles/responsive.css`:

```css
/* Tablet: < 1024px */
@media (max-width: 1024px) {
  :root {
    --display-lg: 2.75rem;
    --display-md: 2.25rem;
  }

  .stats__inner {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .featured__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .board__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .team-hero__inner {
    grid-template-columns: 1fr;
  }

  .team-hero__image {
    height: 200px;
  }

  .pillars__inner {
    grid-template-columns: 1fr;
  }

  .join-content {
    grid-template-columns: 1fr;
  }

  .projects-cta__inner {
    grid-template-columns: 1fr;
  }

  .footer__inner {
    grid-template-columns: 1fr 1fr;
  }
}

/* Mobile: < 640px */
@media (max-width: 640px) {
  :root {
    --display-lg: 2rem;
    --display-md: 1.75rem;
    --headline-lg: 1.75rem;
    --headline-md: 1.5rem;
  }

  .navbar__links {
    gap: var(--space-4);
  }

  .hero__actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .featured__grid {
    grid-template-columns: 1fr;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .projects-filters {
    flex-wrap: wrap;
  }

  .projects-filters__list {
    flex-wrap: wrap;
  }

  .stats__grid {
    grid-template-columns: 1fr 1fr;
  }

  .board__grid {
    grid-template-columns: 1fr 1fr;
  }

  .pillars__grid {
    grid-template-columns: 1fr;
  }

  .join-form__row {
    grid-template-columns: 1fr;
  }

  .footer__inner {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .newsletter__form {
    flex-direction: column;
  }

  .team-cta__actions {
    flex-direction: column;
    align-items: center;
  }
}
```

- [ ] **Step 2: Import responsive.css in index.css**

Add to `src/index.css`:

```css
@import './styles/responsive.css';
```

- [ ] **Step 3: Verify at different viewport widths**

Resize browser to 1024px, 768px, and 375px. Check that grids collapse correctly, text scales down, and no horizontal overflow occurs.

- [ ] **Step 4: Commit**

```bash
git add src/styles/responsive.css src/index.css
git commit -m "feat: add responsive styles for tablet and mobile"
```

---

## Task 15: Final Polish & Build Verification

**Files:**
- Possibly tweak any styles that look off during visual review

- [ ] **Step 1: Full build check**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript or CSS errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No lint errors.

- [ ] **Step 3: Visual review all pages**

```bash
npm run dev
```

Navigate all 4 pages at desktop width. Compare against screenshots. Fix any spacing, color, or typography issues.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "chore: final polish and cleanup"
```
