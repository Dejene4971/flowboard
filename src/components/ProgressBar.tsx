interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color = '#3b82f6',
  showLabel = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className="progress-bar-wrapper">
      {showLabel && (
        <span className="progress-label">{label || `${percentage}%`}</span>
      )}
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `${percentage}% complete`}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
