# Project Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/projects/:id` detail page with an editorial sidebar layout matching the "Academic Brutalist" design system.

**Architecture:** Extend the `Project` data model with optional detail fields, make `Card` components link to the detail route, create a `ProjectDetail` page that reads the project by ID from the URL param and renders a two-column layout (main content + sidebar).

**Tech Stack:** React 19, React Router v7, TypeScript, plain CSS with CSS custom properties (no Tailwind).

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/data/projects.ts` | Add `ProjectOutcome`, `ProjectMember` interfaces + optional detail fields to `Project`; populate data for 3 projects |
| Modify | `src/components/Card.tsx` | Accept `id` prop, wrap article in `Link` to `/projects/:id` |
| Modify | `src/App.tsx` | Add route `path="/projects/:id"` pointing to `ProjectDetail` |
| Create | `src/pages/ProjectDetail.tsx` | Full detail page component |
| Create | `src/pages/ProjectDetail.css` | All styles for the detail page |

---

## Task 1: Extend the Project data model

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Add the new interfaces and optional fields**

Replace the top of `src/data/projects.ts` with:

```ts
export interface ProjectOutcome {
  value: string
  label: string
}

export interface ProjectMember {
  name: string
  role: string
}

export interface Project {
  id: string
  title: string
  description: string
  category: 'Sustainability' | 'Social Equity' | 'Education' | 'Public Health'
  status: 'Active' | 'Completed'
  tags: string[]
  icon: string
  imageUrl?: string
  // detail-page fields (all optional)
  longDescription?: string
  methodology?: string[]
  outcomes?: ProjectOutcome[]
  team?: ProjectMember[]
  partner?: string
  timeline?: string
}
```

- [ ] **Step 2: Add detail data to 3 projects**

In `src/data/projects.ts`, update the `renewable-energy`, `food-desert`, and `enrollment-ai` entries to add detail data. Leave `water-quality` and `equitable-zoning` without detail data to verify graceful fallback. Add these fields to the relevant project objects:

For `renewable-energy`:
```ts
longDescription: "Developing a geospatial dashboard to identify optimal locations for micro-grid solar installations across Virginia's rural counties. This project partners with the Virginia Department of Energy to deliver actionable infrastructure recommendations to local planners and policymakers.",
methodology: [
  "We aggregated satellite imagery, county energy consumption records, and topographical data to build a composite suitability score for each census tract.",
  "A gradient boosting model (XGBoost) was trained on known solar farm locations to validate the scoring system. Visualizations were built in Tableau and embedded in a public-facing dashboard accessible to county planners.",
],
outcomes: [
  { value: '12', label: 'Counties Mapped' },
  { value: '340+', label: 'Optimal Sites Identified' },
],
team: [
  { name: 'Alex Chen', role: 'Project Lead' },
  { name: 'Maya Patel', role: 'GIS Analyst' },
  { name: 'Jordan Rivera', role: 'Data Engineer' },
],
partner: 'VA Dept of Energy',
timeline: 'Aug 2023 – Present',
```

For `food-desert`:
```ts
longDescription: "Analyzing transit patterns and grocery store accessibility to propose mobile market routes for underserved Charlottesville neighborhoods. Data was collected from city transit APIs and mapped against USDA food desert designations.",
methodology: [
  "We combined GTFS transit data with grocery store locations and demographic data from the American Community Survey to compute accessibility scores per census block.",
  "Route optimization was performed using the OR-Tools library to suggest three viable mobile market corridors minimizing total travel time.",
],
outcomes: [
  { value: '8', label: 'Neighborhoods Analyzed' },
  { value: '3', label: 'Routes Proposed' },
],
team: [
  { name: 'Priya Nair', role: 'Project Lead' },
  { name: 'Sam Torres', role: 'Geospatial Analyst' },
],
partner: 'City of Charlottesville',
timeline: 'Jan 2023 – Aug 2023',
```

For `enrollment-ai`:
```ts
longDescription: "Using machine learning to predict dropout risks and resource needs for local K-12 public schools based on historical socio-economic data. The model flags at-risk students early so interventions can be targeted before academic decline.",
methodology: [
  "Historical enrollment, attendance, and free-lunch eligibility records spanning 10 years were cleaned and merged into a unified dataset with 45 features per student-year record.",
  "A random forest classifier was trained with 5-fold cross-validation, achieving an F1 score of 0.81 on held-out test data. SHAP values were used to surface the top contributing factors to each prediction.",
],
outcomes: [
  { value: '81%', label: 'Model F1 Score' },
  { value: '4', label: 'School Districts Partnered' },
],
team: [
  { name: 'Dana Kim', role: 'ML Engineer' },
  { name: 'Eli Brooks', role: 'Data Analyst' },
  { name: 'Yara Ahmed', role: 'Domain Expert' },
],
partner: 'Albemarle County Schools',
timeline: 'Sep 2023 – Present',
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/ishanajwani/Documents/dssd_website && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: extend Project model with detail fields and populate 3 projects"
```

---

## Task 2: Make Card link to the detail page

**Files:**
- Modify: `src/components/Card.tsx`

- [ ] **Step 1: Add `id` prop and wrap in Link**

Replace `src/components/Card.tsx` entirely:

```tsx
import { Link } from 'react-router-dom'
import Chip from './Chip'
import './Card.css'

interface CardProps {
  id: string
  title: string
  description: string
  category: string
  status: 'Active' | 'Completed'
  tags: string[]
  icon?: string
}

export default function Card({ id, title, description, category, status, tags, icon }: CardProps) {
  return (
    <Link to={`/projects/${id}`} className="card">
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
    </Link>
  )
}
```

- [ ] **Step 2: Update Card.css to handle the Link wrapper**

Add to the bottom of `src/components/Card.css`:

```css
/* Card is now rendered as a <Link> — reset anchor defaults */
a.card {
  display: block;
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 3: Verify Projects page still renders**

Run `npm run dev`, navigate to `/projects`. Cards should look identical to before and be clickable (they'll 404 until the route is added in Task 4).

- [ ] **Step 4: Commit**

```bash
git add src/components/Card.tsx src/components/Card.css
git commit -m "feat: make Card component link to /projects/:id"
```

---

## Task 3: Create ProjectDetail.css

**Files:**
- Create: `src/pages/ProjectDetail.css`

- [ ] **Step 1: Write all styles**

Create `src/pages/ProjectDetail.css`:

```css
/* ─── PAGE WRAPPER ─────────────────────────────────────────── */
.page-detail {
  background: var(--surface);
}

/* ─── HEADER ────────────────────────────────────────────────── */
.detail-header {
  padding: var(--space-10) 0 0;
}

.detail-header .container {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-label);
  font-size: var(--label-lg);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--primary);
  text-decoration: none;
  width: fit-content;
}

.detail-back .material-symbols-outlined {
  font-size: 1rem;
  transition: transform 0.15s;
}

.detail-back:hover .material-symbols-outlined {
  transform: translateX(-3px);
}

.detail-chips {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  align-items: center;
}

.detail-chip-category {
  background: var(--secondary-container);
  color: var(--on-secondary-container);
  font-family: var(--font-label);
  font-size: var(--label-md);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border: 2px solid var(--on-primary-fixed);
}

.detail-chip-status {
  background: var(--surface-container-high, #ece1d5);
  color: var(--on-background);
  font-family: var(--font-label);
  font-size: var(--label-md);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border: 2px solid var(--on-primary-fixed);
}

.detail-title-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.detail-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, var(--display-lg));
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--on-background);
}

.detail-title-icon {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: var(--secondary-container);
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  flex-shrink: 0;
}

.detail-tags {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  padding-bottom: var(--space-8);
}

.detail-tag {
  background: var(--inverse-surface);
  color: var(--surface);
  font-family: var(--font-label);
  font-size: var(--label-md);
  padding: var(--space-1) var(--space-3);
}

/* ─── CONTENT GRID ──────────────────────────────────────────── */
.detail-body {
  padding-bottom: var(--space-20);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-10);
  padding-top: var(--space-8);
}

@media (min-width: 900px) {
  .detail-grid {
    grid-template-columns: 2fr 1fr;
    gap: var(--space-12);
    align-items: start;
  }
}

/* ─── HERO IMAGE ────────────────────────────────────────────── */
.detail-hero-image {
  position: relative;
  aspect-ratio: 16 / 9;
  border: 4px solid var(--on-primary-fixed);
  box-shadow: var(--shadow-hard);
  overflow: hidden;
  margin-bottom: var(--space-10);
}

.detail-hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: multiply;
  opacity: 0.85;
}

.detail-hero-image__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top right, rgba(0, 163, 255, 0.35), transparent);
  pointer-events: none;
}

.detail-hero-image__caption {
  position: absolute;
  bottom: var(--space-4);
  left: var(--space-4);
  background: var(--surface);
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--on-primary-fixed);
  box-shadow: var(--shadow-hard);
  max-width: 260px;
}

.detail-hero-image__caption-label {
  font-family: var(--font-label);
  font-size: var(--label-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-1);
}

.detail-hero-image__caption-text {
  font-family: var(--font-body);
  font-size: var(--body-sm);
  line-height: 1.4;
  color: var(--on-background);
}

/* ─── MAIN CONTENT SECTIONS ─────────────────────────────────── */
.detail-section {
  margin-bottom: var(--space-10);
}

.detail-section__title {
  font-family: var(--font-display);
  font-size: var(--headline-md);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  display: inline-block;
  border-bottom: 4px solid var(--primary);
  margin-bottom: var(--space-6);
}

.detail-section__text {
  font-family: var(--font-body);
  font-size: var(--body-lg);
  line-height: 1.75;
  color: var(--on-background);
  opacity: 0.85;
}

/* methodology card */
.detail-methodology {
  background: var(--surface-container);
  border: 2px solid var(--on-primary-fixed);
  padding: var(--space-8);
  position: relative;
  margin-bottom: var(--space-10);
}

.detail-methodology__badge {
  position: absolute;
  top: calc(-1 * var(--space-4));
  right: calc(-1 * var(--space-4));
  background: var(--primary);
  color: var(--on-primary);
  padding: var(--space-2);
  border: 2px solid var(--on-primary-fixed);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.detail-methodology__badge .material-symbols-outlined {
  font-size: 1.1rem;
}

.detail-methodology__title {
  font-family: var(--font-display);
  font-size: var(--headline-sm);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-6);
}

.detail-methodology__text {
  font-family: var(--font-body);
  font-size: var(--body-lg);
  line-height: 1.75;
  color: var(--on-background);
  opacity: 0.85;
}

.detail-methodology__text + .detail-methodology__text {
  margin-top: var(--space-4);
}

/* outcomes grid */
.detail-outcomes__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 480px) {
  .detail-outcomes__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.detail-outcome-card {
  padding: var(--space-8);
  border: 4px solid var(--on-primary-fixed);
  box-shadow: var(--shadow-hard);
}

.detail-outcome-card--yellow {
  background: var(--secondary-container);
  color: var(--on-secondary-container);
}

.detail-outcome-card--blue {
  background: var(--primary);
  color: var(--on-primary);
}

.detail-outcome-card__value {
  font-family: var(--font-display);
  font-size: var(--display-sm);
  font-weight: 900;
  line-height: 1;
  margin-bottom: var(--space-2);
}

.detail-outcome-card__label {
  font-family: var(--font-label);
  font-size: var(--label-md);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ─── SIDEBAR ────────────────────────────────────────────────── */
.detail-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

@media (min-width: 900px) {
  .detail-sidebar {
    position: sticky;
    top: calc(var(--nav-height) + var(--space-6));
  }
}

.detail-sidebar-card {
  border: 2px solid var(--on-primary-fixed);
  padding: var(--space-6);
}

.detail-sidebar-card--dotted {
  background-image: radial-gradient(var(--outline) 1px, transparent 1px);
  background-size: 16px 16px;
}

.detail-sidebar-card--details {
  background: var(--surface-container-high, #ece1d5);
}

.detail-sidebar-card--cta {
  background: var(--inverse-surface);
  color: var(--surface);
  border: none;
  box-shadow: var(--shadow-hard);
  padding: var(--space-8);
}

.detail-sidebar__title {
  font-family: var(--font-display);
  font-size: var(--headline-sm);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-4);
}

/* team card title needs bg to sit on dotted pattern */
.detail-sidebar-card--dotted .detail-sidebar__title {
  background: var(--surface);
  display: inline-block;
  padding: 0 var(--space-2);
}

.detail-team-member {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: var(--surface);
  padding: var(--space-3);
  border: 2px solid var(--on-primary-fixed);
  margin-bottom: var(--space-3);
}

.detail-team-member:last-child {
  margin-bottom: 0;
}

.detail-team-avatar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border: 2px solid var(--on-primary-fixed);
}

.detail-team-avatar--0 { background: var(--primary); }
.detail-team-avatar--1 { background: var(--secondary-container); }
.detail-team-avatar--2 { background: var(--surface-container-highest); }
.detail-team-avatar--3 { background: var(--primary-container); }

.detail-team-name {
  font-family: var(--font-display);
  font-size: var(--body-md);
  font-weight: 700;
  color: var(--on-background);
}

.detail-team-role {
  font-family: var(--font-label);
  font-size: var(--label-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--outline);
  margin-top: 2px;
}

/* stack list */
.detail-stack-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.detail-stack-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-label);
  font-size: var(--label-lg);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.detail-stack-dot {
  width: 6px;
  height: 6px;
  background: var(--on-background);
  flex-shrink: 0;
}

/* project details rows */
.detail-details-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid var(--outline);
  padding-bottom: var(--space-2);
  margin-bottom: var(--space-4);
}

.detail-details-row:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.detail-details-label {
  font-family: var(--font-label);
  font-size: var(--label-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.5;
}

.detail-details-value {
  font-family: var(--font-display);
  font-size: var(--body-md);
  font-weight: 700;
}

/* cta card */
.detail-cta__title {
  font-family: var(--font-display);
  font-size: var(--headline-sm);
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  margin-bottom: var(--space-3);
  color: var(--surface);
}

.detail-cta__text {
  font-family: var(--font-body);
  font-size: var(--body-md);
  line-height: 1.5;
  opacity: 0.8;
  margin-bottom: var(--space-6);
  color: var(--surface);
}

.detail-cta__btn {
  width: 100%;
  padding: var(--space-4);
  background: var(--primary);
  color: var(--on-primary);
  font-family: var(--font-display);
  font-size: var(--label-lg);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s;
}

.detail-cta__btn:hover {
  background: var(--primary-container);
}

/* ─── FOOTER BACK BUTTON ─────────────────────────────────────── */
.detail-footer {
  display: flex;
  justify-content: center;
  padding: var(--space-16) 0 var(--space-20);
}

.detail-back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-4);
  background: var(--secondary-container);
  color: var(--on-secondary-container);
  border: 4px solid var(--on-primary-fixed);
  padding: var(--space-6) var(--space-10);
  font-family: var(--font-display);
  font-size: var(--headline-sm);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  box-shadow: var(--shadow-hard);
  text-decoration: none;
  transition: transform 0.1s, box-shadow 0.1s;
}

.detail-back-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--on-primary-fixed);
}

.detail-back-btn .material-symbols-outlined {
  font-size: 1.5rem;
  transition: transform 0.15s;
}

.detail-back-btn:hover .material-symbols-outlined {
  transform: translateX(3px);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/ProjectDetail.css
git commit -m "feat: add ProjectDetail page styles"
```

---

## Task 4: Create the ProjectDetail page component

**Files:**
- Create: `src/pages/ProjectDetail.tsx`

- [ ] **Step 1: Write the component**

Create `src/pages/ProjectDetail.tsx`:

```tsx
import { useParams, Link, Navigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  const overviewText = project.longDescription ?? project.description

  return (
    <div className="page-detail">

      {/* ── HEADER ── */}
      <section className="detail-header">
        <div className="container">
          <Reveal variant="fade-in" delayMs={0}>
            <Link to="/projects" className="detail-back">
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Projects
            </Link>
          </Reveal>

          <Reveal variant="slide-right" delayMs={40}>
            <div className="detail-chips">
              <span className="detail-chip-category">{project.category}</span>
              <span className="detail-chip-status">Status: {project.status}</span>
            </div>
          </Reveal>

          <Reveal variant="rise-blur" slow delayMs={80}>
            <div className="detail-title-row">
              <h1 className="detail-title">{project.title}</h1>
              <span className="material-symbols-outlined detail-title-icon">
                {iconForProject(project.icon)}
              </span>
            </div>
          </Reveal>

          <Reveal variant="slide-left" delayMs={160}>
            <div className="detail-tags">
              {project.tags.map(tag => (
                <span key={tag} className="detail-tag">{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BODY GRID ── */}
      <section className="detail-body">
        <div className="container">
          <div className="detail-grid">

            {/* ── MAIN COLUMN ── */}
            <div className="detail-main">

              {/* Hero image */}
              {project.imageUrl && (
                <Reveal variant="fade-up" delayMs={80}>
                  <div className="detail-hero-image">
                    <img src={project.imageUrl} alt={project.title} />
                    <div className="detail-hero-image__overlay" />
                    <div className="detail-hero-image__caption">
                      <div className="detail-hero-image__caption-label">Project Visual</div>
                      <div className="detail-hero-image__caption-text">{project.title} — {project.category}</div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Overview */}
              <Reveal variant="fade-up" delayMs={120}>
                <div className="detail-section">
                  <h2 className="detail-section__title">Overview</h2>
                  <p className="detail-section__text">{overviewText}</p>
                </div>
              </Reveal>

              {/* Methodology */}
              {project.methodology && project.methodology.length > 0 && (
                <Reveal variant="slide-left" delayMs={160}>
                  <div className="detail-methodology">
                    <div className="detail-methodology__badge">
                      <span className="material-symbols-outlined">analytics</span>
                    </div>
                    <h2 className="detail-methodology__title">Methodology</h2>
                    {project.methodology.map((para, i) => (
                      <p key={i} className="detail-methodology__text">{para}</p>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Outcomes */}
              {project.outcomes && project.outcomes.length > 0 && (
                <Reveal variant="fade-up" delayMs={200}>
                  <div className="detail-section">
                    <h2 className="detail-section__title">Outcomes &amp; Impact</h2>
                    <div className="detail-outcomes__grid">
                      {project.outcomes.map((outcome, i) => (
                        <div
                          key={i}
                          className={`detail-outcome-card ${i % 2 === 0 ? 'detail-outcome-card--yellow' : 'detail-outcome-card--blue'}`}
                        >
                          <div className="detail-outcome-card__value">{outcome.value}</div>
                          <div className="detail-outcome-card__label">{outcome.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <aside className="detail-sidebar">

              {/* Team */}
              {project.team && project.team.length > 0 && (
                <Reveal variant="slide-right" delayMs={80}>
                  <div className="detail-sidebar-card detail-sidebar-card--dotted">
                    <h3 className="detail-sidebar__title">Team</h3>
                    {project.team.map((member, i) => (
                      <div key={member.name} className="detail-team-member">
                        <div className={`detail-team-avatar detail-team-avatar--${i % 4}`} />
                        <div>
                          <div className="detail-team-name">{member.name}</div>
                          <div className="detail-team-role">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Tech Stack */}
              <Reveal variant="slide-right" delayMs={140}>
                <div className="detail-sidebar-card">
                  <h3 className="detail-sidebar__title">Tech Stack</h3>
                  <div className="detail-stack-list">
                    {project.tags.map(tag => (
                      <div key={tag} className="detail-stack-item">
                        <span className="detail-stack-dot" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Project Details */}
              <Reveal variant="slide-right" delayMs={200}>
                <div className="detail-sidebar-card detail-sidebar-card--details">
                  <h3 className="detail-sidebar__title">Project Details</h3>
                  <div className="detail-details-row">
                    <span className="detail-details-label">Category</span>
                    <span className="detail-details-value">{project.category}</span>
                  </div>
                  <div className="detail-details-row">
                    <span className="detail-details-label">Status</span>
                    <span className="detail-details-value">{project.status}</span>
                  </div>
                  {project.partner && (
                    <div className="detail-details-row">
                      <span className="detail-details-label">Partner</span>
                      <span className="detail-details-value">{project.partner}</span>
                    </div>
                  )}
                  {project.timeline && (
                    <div className="detail-details-row">
                      <span className="detail-details-label">Timeline</span>
                      <span className="detail-details-value">{project.timeline}</span>
                    </div>
                  )}
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal variant="zoom-pop" delayMs={260}>
                <div className="detail-sidebar-card detail-sidebar-card--cta">
                  <h4 className="detail-cta__title">Ready to contribute?</h4>
                  <p className="detail-cta__text">
                    Join our next sprint and help drive meaningful data science impact.
                  </p>
                  <Link to="/join">
                    <button className="detail-cta__btn">Apply to Team</button>
                  </Link>
                </div>
              </Reveal>

            </aside>
          </div>
        </div>
      </section>

      {/* ── BACK BUTTON FOOTER ── */}
      <Reveal variant="fade-up" delayMs={80}>
        <div className="detail-footer">
          <Link to="/projects" className="detail-back-btn">
            Back to All Projects
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </Reveal>

    </div>
  )
}

/**
 * Maps the emoji icon stored in project data to a Material Symbols icon name.
 * Falls back to "science" for unknown emojis.
 */
function iconForProject(emoji: string): string {
  const map: Record<string, string> = {
    '⚡': 'bolt',
    '🍽️': 'restaurant',
    '🎓': 'school',
    '💧': 'water_drop',
    '🏗️': 'construction',
  }
  return map[emoji] ?? 'science'
}
```

- [ ] **Step 2: Check TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ProjectDetail.tsx
git commit -m "feat: add ProjectDetail page component"
```

---

## Task 5: Register the route in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add import and route**

In `src/App.tsx`, add the import:

```tsx
import ProjectDetail from './pages/ProjectDetail'
```

Then add the route inside `<Routes>` after the `/projects` route:

```tsx
<Route path="/projects/:id" element={<ProjectDetail />} />
```

The full `AppRoutes` function becomes:

```tsx
function AppRoutes() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="page-transition">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </div>
  )
}
```

- [ ] **Step 2: Verify the full flow**

Start the dev server and manually test:

```bash
npm run dev
```

1. Navigate to `/projects` — cards should be clickable.
2. Click "Renewable Energy Mapping" — should land on `/projects/renewable-energy` with full detail content.
3. Click "Water Quality Sensors" — should land on `/projects/water-quality` showing overview from `description` (no methodology/outcomes/team since those fields are empty).
4. Click "Back to All Projects" — should return to `/projects`.
5. Navigate to `/projects/nonexistent` — should redirect to `/projects`.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add /projects/:id route for project detail page"
```

---

## Task 6: Add `surface-container-high` CSS variable

**Files:**
- Modify: `src/styles/variables.css`

The detail page uses `--surface-container-high` for the Project Details sidebar card background. This token is referenced in CLAUDE.md but may not be in `variables.css` yet.

- [ ] **Step 1: Check if the variable exists**

```bash
grep "surface-container-high" /Users/ishanajwani/Documents/dssd_website/src/styles/variables.css
```

If the output is empty, add the variable. If it already exists, skip to the commit.

- [ ] **Step 2: Add the variable (only if missing)**

In `src/styles/variables.css`, after the `--surface-container-highest` line, add:

```css
--surface-container-high: #ece1d5;
```

- [ ] **Step 3: Commit (only if changed)**

```bash
git add src/styles/variables.css
git commit -m "fix: add missing --surface-container-high CSS variable"
```

---

## Task 7: Final build check

- [ ] **Step 1: Run the production build**

```bash
npm run build
```

Expected: exits with code 0, no TypeScript or Vite errors.

- [ ] **Step 2: Verify responsiveness**

In the browser dev tools, check at 375px width (mobile). The sidebar should stack below the main content. The outcomes grid should be single column.

- [ ] **Step 3: Final commit if any cleanup was done**

If the build required any fixes:

```bash
git add -p
git commit -m "fix: resolve build issues for project detail page"
```
