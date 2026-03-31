import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'surface' | 'inverse'
  size?: 'default' | 'large'
  to?: string
  onClick?: () => void
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  to,
  onClick,
}: ButtonProps) {
  const className = `btn btn--${variant}${size === 'large' ? ' btn--lg' : ''}`

  if (to) {
    return <Link to={to} className={className}>{children}</Link>
  }

  return <button className={className} onClick={onClick}>{children}</button>
}
