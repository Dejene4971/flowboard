interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'search';
  error?: string;
  required?: boolean;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  error,
  required,
}: TextInputProps) {
  return (
    <div className={`text-input-wrapper ${error ? 'text-input-wrapper--error' : ''}`}>
      <label className="text-input-label">
        {label}
        {required && <span className="required" aria-hidden="true">*</span>}
      </label>
      <input
        type={type}
        className="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? 'input-error' : undefined}
      />
      {error && (
        <span id="input-error" className="input-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
