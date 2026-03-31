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
