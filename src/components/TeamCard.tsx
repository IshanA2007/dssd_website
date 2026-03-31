import Chip from './Chip'
import './TeamCard.css'

interface TeamCardProps {
  name: string
  role: string
  tag: string
  tagVariant?: 'dark' | 'accent'
}

export default function TeamCard({ name, role, tag, tagVariant = 'dark' }: TeamCardProps) {
  return (
    <div className="team-card">
      <div className="team-card__image">
        <div className="team-card__tag">
          <Chip label={tag} variant={tagVariant} />
        </div>
      </div>
      <p className="team-card__name">{name}</p>
      <p className="team-card__role label">{role}</p>
    </div>
  )
}
