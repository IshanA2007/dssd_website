import './Chip.css'

interface ChipProps {
  label: string
  variant?: 'dark' | 'accent' | 'outline'
}

export default function Chip({ label, variant = 'dark' }: ChipProps) {
  return <span className={`chip chip--${variant} label`}>{label}</span>
}
