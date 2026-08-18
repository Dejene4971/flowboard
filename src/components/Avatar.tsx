interface AvatarProps {
  name: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function Avatar({ name, initials, size = 'md', color }: AvatarProps) {
  const sizeClasses = {
    sm: 'avatar--sm',
    md: 'avatar--md',
    lg: 'avatar--lg',
  };

  return (
    <span
      className={`avatar ${sizeClasses[size]}`}
      style={{ backgroundColor: color || '#3b82f6' }}
      title={name}
      aria-label={name}
    >
      {initials}
    </span>
  );
}
