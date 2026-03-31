import Chip from '../components/Chip'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import TeamCard from '../components/TeamCard'
import { executiveBoard, corePillars } from '../data/team'
import './Team.css'

export default function Team() {
  return (
    <div className="page-team">
      <section className="team-hero page-hero--dots">
        <div className="team-hero__inner container">
          <div className="team-hero__text">
            <Reveal variant="slide-right" delayMs={40}>
              <Chip label="Who We Are" variant="accent" />
            </Reveal>
            <Reveal variant="rise-blur" slow delayMs={100}>
              <h1 className="team-hero__title">
                The Team Behind<br />
                <span className="team-hero__accent">the Data</span>
              </h1>
            </Reveal>
            <Reveal variant="slide-left" delayMs={200}>
              <p className="team-hero__subtitle">
                We are a multidisciplinary collective of UVA students dedicated to
                using data science as a tool for humanitarian impact and
                sustainable development.
              </p>
            </Reveal>
          </div>
          <Reveal variant="swing-in-right" slow delayMs={160}>
            <div className="team-hero__image" />
          </Reveal>
        </div>
      </section>

      <section className="partnership">
        <div className="partnership__inner container">
          <Reveal variant="slide-left" delayMs={0}>
            <div className="partnership__badge">
              <span className="partnership__icon-box" aria-hidden>
                <svg
                  className="partnership__mark-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3.75 15.6 8.35 12 11.9 8.4 8.35 12 3.75z" />
                  <rect x="11.2" y="11.4" width="1.6" height="5.35" />
                  <path d="M11.2 16.75 4.25 20.35 5.85 22.25 12 18.45 11.2 16.75z" />
                  <path d="M12.8 16.75 19.75 20.35 18.15 22.25 12 18.45 12.8 16.75z" />
                </svg>
              </span>
              <span className="label">Official Partnership</span>
            </div>
          </Reveal>
          <Reveal variant="slide-right" delayMs={120}>
            <p className="partnership__quote">
              "Bridging the gap between academic rigor and global sustainability in
              partnership with the <strong>UVA School of Data Science.</strong>"
            </p>
          </Reveal>
        </div>
      </section>

      <section className="board container">
        <Reveal variant="skew-up">
          <div className="board__header">
            <h2 className="board__title">Executive Board</h2>
            <span className="board__year label">2023 - 2024</span>
          </div>
        </Reveal>
        <div className="board__grid">
          {executiveBoard.map((member, i) => (
            <Reveal key={member.name} variant="zoom-pop" delayMs={60 + i * 90}>
              <TeamCard {...member} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pillars container">
        <div className="pillars__inner">
          <Reveal variant="slide-right">
            <div className="pillars__intro">
              <h2 className="pillars__title">Our Core<br />Pillars</h2>
              <p className="pillars__desc">
                Guided by the principles of ethical data science and sustainable
                progress.
              </p>
              <div className="pillars__bar" />
            </div>
          </Reveal>
          <div className="pillars__grid">
            {corePillars.map((pillar, i) => (
              <Reveal
                key={pillar.number}
                variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}
                delayMs={80 + i * 140}
              >
                <div className="pillar-card">
                  <span className="pillar-card__number label">{pillar.number}.</span>
                  <h3 className="pillar-card__title">{pillar.title}</h3>
                  <p className="pillar-card__desc">{pillar.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="team-cta container">
        <Reveal variant="zoom-pop" slow>
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
        </Reveal>
      </section>
    </div>
  )
}
