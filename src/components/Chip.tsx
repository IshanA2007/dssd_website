import './Chip.css'

interface ChipProps {
  label: string
  variant?: 'dark' | 'accent' | 'outline'
  elevated?: boolean
}

export default function Chip({ label, variant = 'dark', elevated }: ChipProps) {
  return (
    <span className={`chip chip--${variant} label${elevated ? ' chip--elevated' : ''}`}>
      {label}
    </span>
  )
}
