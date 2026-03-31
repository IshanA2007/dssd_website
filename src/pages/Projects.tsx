import { useState } from 'react'
import Chip from '../components/Chip'
import Button from '../components/Button'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import { projects, categories } from '../data/projects'
import './Projects.css'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All Projects')

  const filtered = activeFilter === 'All Projects'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="page-projects">
      <section className="projects-hero page-hero--dots">
        <div className="container">
          <Reveal variant="slide-right" delayMs={40}>
            <Chip label="Portfolio" variant="accent" />
          </Reveal>
          <Reveal variant="rise-blur" slow delayMs={100}>
            <h1 className="projects-hero__title">Our Impactful Projects</h1>
          </Reveal>
          <Reveal variant="slide-left" delayMs={200}>
            <p className="projects-hero__subtitle">
              Applying rigorous data science methodologies to solve pressing social
              and environmental challenges within the UVA community and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="projects-filters container">
        <Reveal variant="fade-up">
          <div className="projects-filters__row">
            <span className="projects-filters__label label">Filter by Area:</span>
            <div className="projects-filters__list">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`projects-filters__btn label ${activeFilter === cat ? 'projects-filters__btn--active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="projects-grid container">
        {filtered.map((project, i) => (
          <Reveal
            key={project.id}
            variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}
            delayMs={40 + (i % 6) * 80}
          >
            <Card
              id={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              status={project.status}
              tags={project.tags}
              icon={project.icon}
            />
          </Reveal>
        ))}
        <Reveal variant="zoom-pop" delayMs={120}>
          <div className="propose-card">
            <div className="propose-card__icon">+</div>
            <h3 className="propose-card__title">Your Project Here?</h3>
            <p className="propose-card__text">
              We are always looking for new partnerships with non-profits and
              community organizations.
            </p>
            <Button variant="secondary">Propose a Project</Button>
          </div>
        </Reveal>
      </section>

      <section className="projects-cta container">
        <div className="projects-cta__inner">
          <Reveal variant="slide-left">
            <div className="projects-cta__copy">
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
          </Reveal>
          <Reveal variant="swing-in-right" delayMs={160}>
            <div className="projects-cta__stat">
              <p className="projects-cta__stat-value">12+</p>
              <p className="projects-cta__stat-label label">Active Partners</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
