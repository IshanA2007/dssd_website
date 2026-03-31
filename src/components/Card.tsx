import Chip from './Chip'
import './Card.css'

interface CardProps {
  title: string
  description: string
  category: string
  status: 'Active' | 'Completed'
  tags: string[]
  icon?: string
}

export default function Card({ title, description, category, status, tags, icon }: CardProps) {
  return (
    <article className="card">
      <div className="card__image">
        <Chip
          label={status}
          variant={status === 'Active' ? 'accent' : 'dark'}
        />
      </div>
      <div className="card__body">
        <div className="card__title-row">
          <h3 className="card__title">{title}</h3>
          {icon && <span className="card__icon">{icon}</span>}
        </div>
        <p className="card__desc">{description}</p>
        <div className="card__footer">
          <span className="card__category label">{category}</span>
          <span className="card__link label">View Case Study &rarr;</span>
        </div>
        {tags.length > 0 && (
          <div className="card__tags">
            {tags.map(tag => <Chip key={tag} label={tag} variant="outline" />)}
          </div>
        )}
      </div>
    </article>
  )
}
