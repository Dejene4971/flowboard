import type { Task, Priority } from '../types';

const priorityColors: Record<Priority, string> = {
  low: '#6b7280',
  medium: '#3b82f6',
  high: '#f59e0b',
  critical: '#ef4444',
};

interface TaskCardProps {
  task: Task;
  assigneeName?: string;
  assigneeAvatar?: string;
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
}

export function TaskCard({
  task,
  assigneeName,
  assigneeAvatar,
  onDragStart,
  onDragEnd,
}: TaskCardProps) {
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'done';

  return (
    <div
      className="task-card"
      draggable
      onDragStart={() => onDragStart?.(task.id)}
      onDragEnd={onDragEnd}
      role="listitem"
      aria-label={`${task.title}, priority ${task.priority}, ${assigneeName ?? 'unassigned'}`}
      tabIndex={0}
    >
      <div className="task-card-header">
        <span
          className="priority-dot"
          style={{ backgroundColor: priorityColors[task.priority] }}
          title={`Priority: ${task.priority}`}
          aria-label={`Priority: ${task.priority}`}
        />
        <span className="task-id">{task.id.toUpperCase()}</span>
      </div>
      <h4 className="task-title">{task.title}</h4>
      <div className="task-card-footer">
        <div className="task-tags">
          {task.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="task-tag">
              {tag}
            </span>
          ))}
        </div>
        {assigneeAvatar && (
          <span
            className="task-avatar"
            title={assigneeName}
            aria-label={`Assigned to ${assigneeName}`}
          >
            {assigneeAvatar}
          </span>
        )}
      </div>
      {isOverdue && (
        <span className="overdue-badge" role="status">
          Overdue
        </span>
      )}
    </div>
  );
}
