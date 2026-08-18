import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'badge--default',
    success: 'badge--success',
    warning: 'badge--warning',
    danger: 'badge--danger',
  };

  return (
    <span className={`badge ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
