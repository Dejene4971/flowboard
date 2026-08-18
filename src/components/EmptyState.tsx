interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon = '📋', action }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status" aria-label={title}>
      <span className="empty-state-icon" aria-hidden="true">{icon}</span>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && (
        <button
          className="btn btn--primary empty-state-action"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
