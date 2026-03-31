import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <p className="footer__logo label">DSSD @ UVA</p>
          <p className="footer__tagline">
            The UVA chapter of Data Science for Sustainable Development.
            Engineering data for a better future.
          </p>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <Link to="/projects" className="footer__link label">
              Projects
            </Link>
            <Link to="/team" className="footer__link label">
              Team
            </Link>
            <Link to="/partner" className="footer__link label">
              Partner
            </Link>
            <Link to="/join" className="footer__link label">
              Join
            </Link>
          </div>
          <div className="footer__col">
            <span className="footer__link label">Contact</span>
            <span className="footer__link label">UVA Data Science</span>
            <span className="footer__link label">Privacy Policy</span>
          </div>
        </div>
        <div className="footer__aside">
          <div className="footer__social" aria-label="Social links">
            <span className="material-symbols-outlined footer__social-icon" aria-hidden>
              hub
            </span>
            <span className="material-symbols-outlined footer__social-icon" aria-hidden>
              terminal
            </span>
            <span className="material-symbols-outlined footer__social-icon" aria-hidden>
              public
            </span>
          </div>
          <p className="footer__copyright label">
            &copy; 2024 UVA Data Science for Sustainable Development. Built with Academic Brutalism.
          </p>
        </div>
      </div>
    </footer>
  )
}
