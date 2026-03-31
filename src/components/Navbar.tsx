import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

const navLinks = [
  { to: '/projects', label: 'Projects' },
  { to: '/team', label: 'Team' },
  { to: '/partner', label: 'Partner' },
  { to: '/join', label: 'Join' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__logo" aria-label="DSSD — Home" onClick={() => setMenuOpen(false)}>
          <img
            className="navbar__logo-img"
            src="/dssd-logo.png"
            alt=""
            width={120}
            height={120}
            decoding="async"
          />
        </NavLink>
        <ul className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `navbar__link label${isActive ? ' navbar__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navbar__right">
          <NavLink to="/join" className="navbar__cta label">
            Get Involved
          </NavLink>
          <button
            className={`navbar__burger${menuOpen ? ' navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="navbar__mobile-menu" onClick={() => setMenuOpen(false)}>
          <ul className="navbar__mobile-links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `navbar__mobile-link label${isActive ? ' navbar__mobile-link--active' : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
