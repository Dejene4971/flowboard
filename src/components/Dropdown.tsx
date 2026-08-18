import { useState, useRef, useEffect } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

export function Dropdown({ options, value, onChange, placeholder, label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <label className="sr-only">{label}</label>
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
      >
        {selectedOption?.label || placeholder || 'Select...'}
        <span className="dropdown-arrow" aria-hidden="true">▼</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`dropdown-item ${option.value === value ? 'dropdown-item--selected' : ''}`}
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
