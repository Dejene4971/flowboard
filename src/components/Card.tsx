import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Card({ children, title, header, footer, onClick, className = '' }: CardProps) {
  return (
    <div
      className={`card ${onClick ? 'card--clickable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {(title || header) && (
        <div className="card-header">
          {header || <h3 className="card-title">{title}</h3>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
