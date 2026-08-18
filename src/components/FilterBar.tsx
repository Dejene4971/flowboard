import { useApp } from '../context/AppContext';
import type { Status, Priority } from '../types';

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export function FilterBar() {
  const { state, dispatch } = useApp();

  const handleStatusChange = (status: Status) => {
    const current = state.filters.status;
    const updated = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    dispatch({ type: 'SET_FILTER', payload: { status: updated } });
  };

  const handlePriorityChange = (priority: Priority) => {
    const current = state.filters.priority;
    const updated = current.includes(priority)
      ? current.filter((p) => p !== priority)
      : [...current, priority];
    dispatch({ type: 'SET_FILTER', payload: { priority: updated } });
  };

  const clearFilters = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: { status: [], priority: [], assigneeId: null, tags: [] },
    });
  };

  const hasActiveFilters =
    state.filters.status.length > 0 ||
    state.filters.priority.length > 0 ||
    state.filters.assigneeId !== null;

  return (
    <div className="filter-bar" role="search" aria-label="Filter tasks">
      <div className="filter-group">
        <fieldset>
          <legend className="filter-label">Status</legend>
          <div className="filter-options">
            {STATUS_OPTIONS.map((opt) => (
              <label key={opt.value} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={state.filters.status.includes(opt.value)}
                  onChange={() => handleStatusChange(opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="filter-group">
        <fieldset>
          <legend className="filter-label">Priority</legend>
          <div className="filter-options">
            {PRIORITY_OPTIONS.map((opt) => (
              <label key={opt.value} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={state.filters.priority.includes(opt.value)}
                  onChange={() => handlePriorityChange(opt.value)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {hasActiveFilters && (
        <button
          className="clear-filters-btn"
          onClick={clearFilters}
          aria-label="Clear all filters"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
