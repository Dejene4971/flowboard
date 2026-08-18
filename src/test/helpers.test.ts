import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatRelativeTime,
  isOverdue,
  getPriorityWeight,
  getStatusColor,
} from '../utils/helpers';

describe('formatDate', () => {
  it('formats a valid date string', () => {
    const result = formatDate('2025-08-15T10:00:00Z');
    expect(result).toMatch(/Aug/);
    expect(result).toContain('2025');
  });
});

describe('isOverdue', () => {
  it('returns true for past due dates on non-done tasks', () => {
    expect(isOverdue('2020-01-01', 'todo')).toBe(true);
  });

  it('returns false for done tasks even with past due date', () => {
    expect(isOverdue('2020-01-01', 'done')).toBe(false);
  });

  it('returns false for null due date', () => {
    expect(isOverdue(null, 'todo')).toBe(false);
  });
});

describe('getPriorityWeight', () => {
  it('returns correct weights', () => {
    expect(getPriorityWeight('critical')).toBe(0);
    expect(getPriorityWeight('high')).toBe(1);
    expect(getPriorityWeight('medium')).toBe(2);
    expect(getPriorityWeight('low')).toBe(3);
  });
});

describe('getStatusColor', () => {
  it('returns correct colors for each status', () => {
    expect(getStatusColor('backlog')).toBe('#6b7280');
    expect(getStatusColor('todo')).toBe('#3b82f6');
    expect(getStatusColor('in_progress')).toBe('#f59e0b');
    expect(getStatusColor('review')).toBe('#8b5cf6');
    expect(getStatusColor('done')).toBe('#10b981');
  });
});
