import Chip from '../components/Chip'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import InputField from '../components/InputField'
import TextArea from '../components/TextArea'
import AccordionItem from '../components/AccordionItem'
import { faqItems } from '../data/stats'
import appStatus from '../config/appStatus'
import './Join.css'

export default function Join() {
  return (
    <div className="page-join">
      <section className="join-hero page-hero--dots">
        <div className="join-hero__inner container">
          <Reveal variant="slide-right" delayMs={40}>
            <Chip
              label={appStatus.applicationsOpen ? `Applications Open: Spring 2024` : 'Applications Closed'}
              variant={appStatus.applicationsOpen ? 'accent' : 'dark'}
            />
          </Reveal>
          <Reveal variant="rise-blur" slow delayMs={100}>
            <h1 className="join-hero__title">
              Join the<br />
              <span className="join-hero__accent">Movement</span>
            </h1>
          </Reveal>
          <Reveal variant="slide-left" delayMs={200}>
            <p className="join-hero__subtitle">
              DSSD at UVA empowers students to tackle real-world sustainability
              challenges through data-driven research. Apply to join our
              interdisciplinary teams and make a tangible impact.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="join-content container">
        <Reveal variant="slide-left" className="join-form-reveal">
          <div className="join-form-wrapper">
            <div className="join-form">
              <h2 className="join-form__heading">
                <span className="material-symbols-outlined join-form__heading-icon" aria-hidden>
                  mail
                </span>
                Reach Out
              </h2>
              <p className="join-form__subheading">
                Have a question about joining DSSD or partnering with us? Send us a message and we'll get back to you within 2–3 business days.
              </p>
              <div className="join-form__row">
                <InputField label="Full Name" placeholder="Thomas Jefferson" />
                <InputField label="Email" placeholder="tj@virginia.edu" />
              </div>
              <InputField label="Subject" placeholder="Application question, partnership inquiry, etc." />
              <TextArea
                label="Message"
                placeholder="Ask us anything — about the application process, ongoing projects, partnership opportunities, or anything else..."
                rows={5}
              />
              <Button>Send Message &nbsp;&#x27A4;</Button>

              <div className="join-form__divider" aria-hidden />

              <div className="join-form__apply">
                <p className="join-form__apply-label label">Ready to apply?</p>
                {appStatus.applicationsOpen ? (
                  <a
                    href={appStatus.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                  >
                    Apply Now &nbsp;&#x27A4;
                  </a>
                ) : (
                  <div className="join-form__apply-closed">
                    <Button variant="outline">
                      <span className="material-symbols-outlined" aria-hidden style={{ fontSize: '1.1em' }}>lock</span>
                      Applications Closed
                    </Button>
                    <p className="join-form__apply-note label">
                      Applications reopen each semester. Check back soon or send us a message above.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="join-sidebar">
          <Reveal variant="slide-right" delayMs={100}>
            <div className="join-process">
              <h3 className="join-process__title">Application Process</h3>
              <ol className="join-process__steps">
                {[
                  {
                    n: '1',
                    title: 'Online Application',
                    body: 'Submit this form before the February 15th deadline.',
                  },
                  {
                    n: '2',
                    title: 'Interview Phase',
                    body: 'Short 15-minute coffee chats with project leads.',
                  },
                  {
                    n: '3',
                    title: 'Team Placement',
                    body: 'Matching your skills with active sustainability projects.',
                  },
                ].map((step, i) => (
                  <li key={step.n} className="join-process__step">
                    <Reveal variant="fade-up" delayMs={i * 100} className="join-process__step-reveal">
                      <span className="join-process__num">{step.n}</span>
                      <div>
                        <strong>{step.title}</strong>
                        <p>{step.body}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal variant="skew-up" delayMs={220}>
            <div className="join-faq">
              <h3 className="join-faq__title">
                <span>&#x1f4cb;</span> Common Questions
              </h3>
              {faqItems.map(item => (
                <AccordionItem key={item.question} {...item} />
              ))}
            </div>
          </Reveal>

          <Reveal variant="zoom-pop" delayMs={340}>
            <div className="join-image">
              <Chip label="Student Driven" variant="accent" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter__inner container">
          <Reveal variant="rise-blur" slow>
            <h2 className="newsletter__title">
              <em>Not ready to apply yet?</em>
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delayMs={120}>
            <p className="newsletter__text">
              Stay informed about our public workshops and open data events.
            </p>
          </Reveal>
          <Reveal variant="zoom-pop" delayMs={260}>
            <div className="newsletter__form">
              <input
                className="newsletter__input"
                type="email"
                placeholder="Email Address"
              />
              <button type="button" className="newsletter__btn label">Subscribe</button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
