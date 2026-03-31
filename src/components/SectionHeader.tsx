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
