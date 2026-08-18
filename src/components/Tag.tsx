interface TagProps {
  label: string;
  color?: string;
  removable?: boolean;
  onRemove?: () => void;
}

export function Tag({ label, color = '#3b82f6', removable, onRemove }: TagProps) {
  return (
    <span
      className="tag"
      style={{ backgroundColor: color, color: 'white' }}
    >
      {label}
      {removable && (
        <button
          className="tag-remove"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
