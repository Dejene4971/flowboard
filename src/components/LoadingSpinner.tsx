interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function LoadingSpinner({ size = 'md', label = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner" role="status" aria-label={label}>
      <div className={`spinner spinner--${size}`} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
