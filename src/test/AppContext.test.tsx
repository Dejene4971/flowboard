import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '../context/AppContext';
import React from 'react';

function wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('AppContext', () => {
  it('provides initial state with tasks and projects', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.state.tasks.length).toBeGreaterThan(0);
    expect(result.current.state.projects.length).toBeGreaterThan(0);
    expect(result.current.state.users.length).toBeGreaterThan(0);
  });

  it('filters tasks by search query', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'SET_FILTER',
        payload: { search: 'authentication' },
      });
    });

    const filtered = result.current.getFilteredTasks();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].title.toLowerCase()).toContain('authentication');
  });

  it('filters tasks by status', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'SET_FILTER',
        payload: { status: ['in_progress'] },
      });
    });

    const filtered = result.current.getFilteredTasks();
    filtered.forEach((task) => {
      expect(task.status).toBe('in_progress');
    });
  });

  it('moves a task to a new status', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const taskId = result.current.state.tasks[0].id;
    act(() => {
      result.current.dispatch({
        type: 'MOVE_TASK',
        payload: { taskId, newStatus: 'done' },
      });
    });

    const updatedTask = result.current.state.tasks.find((t) => t.id === taskId);
    expect(updatedTask?.status).toBe('done');
    expect(updatedTask?.completedAt).toBeTruthy();
  });

  it('creates a new task', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const initialCount = result.current.state.tasks.length;

    act(() => {
      result.current.dispatch({
        type: 'CREATE_TASK',
        payload: {
          title: 'New test task',
          description: 'Test description',
          status: 'todo',
          priority: 'medium',
          assigneeId: null,
          projectId: 'p1',
          tags: ['test'],
          dueDate: null,
          estimatedHours: null,
          completedAt: null,
        },
      });
    });

    expect(result.current.state.tasks.length).toBe(initialCount + 1);
    const newTask = result.current.state.tasks.find((t) => t.title === 'New test task');
    expect(newTask).toBeTruthy();
  });

  it('deletes a task', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const taskId = result.current.state.tasks[0].id;
    const initialCount = result.current.state.tasks.length;

    act(() => {
      result.current.dispatch({
        type: 'DELETE_TASK',
        payload: taskId,
      });
    });

    expect(result.current.state.tasks.length).toBe(initialCount - 1);
    expect(result.current.state.tasks.find((t) => t.id === taskId)).toBeUndefined();
  });

  it('returns correct task stats', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const stats = result.current.getTaskStats();
    expect(stats.total).toBeGreaterThan(0);
    expect(stats.done).toBeGreaterThanOrEqual(0);
    expect(stats.inProgress).toBeGreaterThanOrEqual(0);
  });

  it('gets user by id', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const user = result.current.getUserById('u1');
    expect(user).toBeTruthy();
    expect(user?.name).toBe('Alice Chen');
  });

  it('gets project by id', () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    const project = result.current.getProjectById('p1');
    expect(project).toBeTruthy();
    expect(project?.name).toBe('FlowBoard Web');
  });

  it('selects a project', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'SELECT_PROJECT',
        payload: 'p1',
      });
    });

    expect(result.current.state.selectedProjectId).toBe('p1');
  });

  it('sorts tasks by priority', () => {
    const { result } = renderHook(() => useApp(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: 'SET_SORT',
        payload: { field: 'priority', direction: 'asc' },
      });
    });

    const sorted = result.current.getFilteredTasks();
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    for (let i = 1; i < sorted.length; i++) {
      expect(priorityOrder[sorted[i].priority]).toBeGreaterThanOrEqual(
        priorityOrder[sorted[i - 1].priority]
      );
    }
  });
});
