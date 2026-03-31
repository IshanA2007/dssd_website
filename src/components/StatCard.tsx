import './StatCard.css'

interface StatCardProps {
  icon: string
  value: string
  label: string
  stagger?: boolean
}

export default function StatCard({ icon, value, label, stagger }: StatCardProps) {
  return (
    <div className={`stat-card${stagger ? ' stat-card--stagger' : ''}`}>
      <span className="material-symbols-outlined stat-card__icon" aria-hidden>
        {icon}
      </span>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label label">{label}</p>
    </div>
  )
}
