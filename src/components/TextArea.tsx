import './TextArea.css'

interface TextAreaProps {
  label: string
  placeholder?: string
  rows?: number
}

export default function TextArea({ label, placeholder, rows = 5 }: TextAreaProps) {
  return (
    <div className="textarea-field">
      <label className="textarea-field__label label">{label}</label>
      <textarea
        className="textarea-field__input"
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  )
}
