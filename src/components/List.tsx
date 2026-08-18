import type { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  ariaLabel: string;
}

interface ListItemProps {
  children: ReactNode;
  onClick?: () => void;
}

export function List({ children, ariaLabel }: ListProps) {
  return (
    <ul className="list" role="list" aria-label={ariaLabel}>
      {children}
    </ul>
  );
}

export function ListItem({ children, onClick }: ListItemProps) {
  return (
    <li
      className={`list-item ${onClick ? 'list-item--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </li>
  );
}
