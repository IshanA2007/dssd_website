import { useState } from 'react'
import './AccordionItem.css'

interface AccordionItemProps {
  question: string
  answer: string
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`accordion ${isOpen ? 'accordion--open' : ''}`}>
      <button
        className="accordion__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion__question">{question}</span>
        <span className="accordion__icon">{isOpen ? '\u2212' : '+'}</span>
      </button>
      {isOpen && (
        <div className="accordion__content">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}
