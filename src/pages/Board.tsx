import React, { useState, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import type { Status, Task, Priority } from '../types';

const COLUMNS: { id: Status; title: string; color: string }[] = [
  { id: 'backlog', title: 'Backlog', color: '#6b7280' },
  { id: 'todo', title: 'To Do', color: '#3b82f6' },
  { id: 'in_progress', title: 'In Progress', color: '#f59e0b' },
  { id: 'review', title: 'Review', color: '#8b5cf6' },
  { id: 'done', title: 'Done', color: '#10b981' },
];

const priorityColors: Record<Priority, string> = {
  low: '#6b7280',
  medium: '#3b82f6',
  high: '#f59e0b',
  critical: '#ef4444',
};

export function Board() {
  const { state, dispatch, getFilteredTasks, getUserById } = useApp();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<Status | null>(null);
  const draggedElementRef = useRef<HTMLDivElement | null>(null);

  const filteredTasks = getFilteredTasks();

  const tasksByStatus = COLUMNS.reduce<Record<Status, Task[]>>((acc, col) => {
    acc[col.id] = filteredTasks.filter((t) => t.status === col.id);
    return acc;
  }, {} as Record<Status, Task[]>);

  const handleDragStart = useCallback((e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId);
    // Store reference for drag image
    draggedElementRef.current = e.currentTarget as HTMLDivElement;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, columnId: Status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, columnId: Status) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData('text/plain');
      if (taskId) {
        dispatch({ type: 'MOVE_TASK', payload: { taskId, newStatus: columnId } });
      }
      setDraggedTaskId(null);
      setDragOverColumn(null);
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
    draggedElementRef.current = null;
  }, []);

  return (
    <div className="board">
      <header className="page-header">
        <h2>Board</h2>
        <div className="board-filters">
          <select
            aria-label="Filter by assignee"
            value={state.filters.assigneeId ?? ''}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER',
                payload: { assigneeId: e.target.value || null },
              })
            }
          >
            <option value="">All members</option>
            {state.users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="board-columns" role="region" aria-label="Task board">
        {COLUMNS.map((column) => (
          <div
            key={column.id}
            className={`board-column ${dragOverColumn === column.id ? 'board-column--drag-over' : ''}`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
            role="list"
            aria-label={`${column.title} column, ${tasksByStatus[column.id].length} tasks`}
          >
            <div className="column-header">
              <span
                className="column-indicator"
                style={{ backgroundColor: column.color }}
                aria-hidden="true"
              />
              <h3 className="column-title">{column.title}</h3>
              <span className="column-count">{tasksByStatus[column.id].length}</span>
            </div>
            <div className="column-tasks">
              {tasksByStatus[column.id].map((task) => {
                const assignee = task.assigneeId ? getUserById(task.assigneeId) : null;
                const isOverdue =
                  task.dueDate &&
                  new Date(task.dueDate) < new Date() &&
                  task.status !== 'done';

                return (
                  <div
                    key={task.id}
                    className={`task-card ${draggedTaskId === task.id ? 'task-card--dragging' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                    role="listitem"
                    aria-label={`${task.title}, priority ${task.priority}, ${assignee?.name ?? 'unassigned'}`}
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
                      {assignee && (
                        <span
                          className="task-avatar"
                          title={assignee.name}
                          aria-label={`Assigned to ${assignee.name}`}
                        >
                          {assignee.avatar}
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
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
