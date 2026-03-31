import Chip from '../components/Chip'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import StatCard from '../components/StatCard'
import SectionHeader from '../components/SectionHeader'
import FeaturedCard from '../components/FeaturedCard'
import { homeStats } from '../data/stats'
import { featuredProjects } from '../data/projects'
import './Home.css'

export default function Home() {
  return (
    <div className="page-home">
      <section className="hero page-hero--dots">
        <div className="hero__inner container">
          <div className="hero__content">
            <Reveal variant="slide-right" delayMs={40}>
              <Chip label="Est. at UVA" variant="accent" elevated />
            </Reveal>
            <Reveal variant="rise-blur" slow delayMs={100}>
              <h1 className="hero__title">
                Data Science for<br />
                <span className="hero__accent">Sustainable Development.</span>
              </h1>
            </Reveal>
            <Reveal variant="slide-left" delayMs={200}>
              <p className="hero__subtitle">
                We're a student-run club at UVA that uses data science to tackle
                real-world sustainability challenges. Our members collaborate on
                projects with local organizations, non-profits, and government
                agencies.
              </p>
            </Reveal>
            <Reveal variant="zoom-pop" delayMs={320}>
              <div className="hero__actions">
                <Button to="/projects" size="large">
                  Explore Our Projects
                </Button>
                <Button to="/join" variant="surface" size="large">
                  Apply to Join
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal variant="fade-up" delayMs={400}>
            <div className="hero__partner">
              <span className="hero__partner-label label">Partnered with</span>
              <span className="hero__partner-rule" aria-hidden />
              <span className="hero__partner-name">University of Virginia</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="stats">
        <div className="stats__inner container">
          <Reveal variant="skew-up">
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
          </Reveal>
          <div className="stats__grid">
            {homeStats.map((stat, i) => (
              <Reveal
                key={stat.label}
                variant={i % 2 === 0 ? 'slide-left' : 'slide-right'}
                delayMs={80 + i * 130}
              >
                <StatCard {...stat} stagger={i === 1 || i === 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="featured__wrap container">
          <Reveal variant="fade-in">
            <SectionHeader
              title="Featured Impact"
              subtitle="Highlighting our most recent collaborations in sustainability and data ethics."
              linkText="View All Projects"
              linkTo="/projects"
            />
          </Reveal>
          <div className="featured__grid">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} variant="fade-up" delayMs={60 + i * 120}>
                <FeaturedCard project={project} stagger={i === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-cta__inner container">
          <Reveal variant="rise-blur" slow>
            <h2 className="home-cta__title">Interested in Joining?</h2>
          </Reveal>
          <Reveal variant="slide-right" delayMs={140}>
            <p className="home-cta__text">
              We are always looking for passionate data scientists, developers, and
              designers to join our club at UVA.
            </p>
          </Reveal>
          <Reveal variant="zoom-pop" delayMs={280}>
            <Button to="/join" variant="inverse" size="large">
              Join the Team
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
