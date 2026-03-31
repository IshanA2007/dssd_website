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
