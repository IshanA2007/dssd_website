import './InputField.css'

interface InputFieldProps {
  label: string
  placeholder?: string
  type?: string
}

export default function InputField({ label, placeholder, type = 'text' }: InputFieldProps) {
  return (
    <div className="input-field">
      <label className="input-field__label label">{label}</label>
      <input
        className="input-field__input"
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}
