import './StatCard.css'

interface StatCardProps {
  icon: string
  value: string
  label: string
}

export default function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-card__icon">{icon}</span>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label label">{label}</p>
    </div>
  )
}
