interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  maxLength?: number;
  rows?: number;
  error?: string;
}

export function TextArea({
  value,
  onChange,
  placeholder,
  label,
  maxLength = 500,
  rows = 4,
  error,
}: TextAreaProps) {
  return (
    <div className={`textarea-wrapper ${error ? 'textarea-wrapper--error' : ''}`}>
      <label className="textarea-label">{label}</label>
      <textarea
        className="textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}

        aria-invalid={!!error}
        aria-describedby={error ? 'textarea-error' : undefined}
      />
      <div className="textarea-footer">
        {error && (
          <span id="textarea-error" className="textarea-error" role="alert">
            {error}
          </span>
        )}
        <span className="textarea-count">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
