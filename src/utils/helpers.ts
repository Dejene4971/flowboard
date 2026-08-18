import type { Priority, Status } from '../types';

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function isOverdue(dueDate: string | null, status: Status): boolean {
  if (!dueDate || status === 'done') return false;
  return new Date(dueDate) < new Date();
}

export function getPriorityWeight(priority: Priority): number {
  const weights: Record<Priority, number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };
  return weights[priority];
}

export function getStatusColor(status: Status): string {
  const colors: Record<Status, string> = {
    backlog: '#6b7280',
    todo: '#3b82f6',
    in_progress: '#f59e0b',
    review: '#8b5cf6',
    done: '#10b981',
  };
  return colors[status];
}
