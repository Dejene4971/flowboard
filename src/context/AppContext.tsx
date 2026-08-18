import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type { Task, Project, User, Activity, Comment, Status, Priority, FilterOptions, SortOptions } from '../types';
import { tasks as initialTasks, projects as initialProjects, users as initialUsers, activities as initialActivities, comments as initialComments } from '../data/mockData';

interface AppState {
  tasks: Task[];
  projects: Project[];
  users: User[];
  activities: Activity[];
  comments: Comment[];
  filters: FilterOptions;
  sort: SortOptions;
  selectedProjectId: string | null;
  searchOpen: boolean;
}

type Action =
  | { type: 'SET_FILTER'; payload: Partial<FilterOptions> }
  | { type: 'SET_SORT'; payload: SortOptions }
  | { type: 'MOVE_TASK'; payload: { taskId: string; newStatus: Status } }
  | { type: 'CREATE_TASK'; payload: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_TASK'; payload: { taskId: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SELECT_PROJECT'; payload: string | null }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'ADD_COMMENT'; payload: Omit<Comment, 'id' | 'createdAt'> };

const defaultFilters: FilterOptions = {
  search: '',
  status: [],
  priority: [],
  assigneeId: null,
  tags: [],
  dateRange: { start: null, end: null },
};

const initialState: AppState = {
  tasks: initialTasks,
  projects: initialProjects,
  users: initialUsers,
  activities: initialActivities,
  comments: initialComments,
  filters: defaultFilters,
  sort: { field: 'createdAt', direction: 'desc' },
  selectedProjectId: null,
  searchOpen: false,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'SET_SORT':
      return { ...state, sort: action.payload };

    case 'MOVE_TASK': {
      const now = new Date().toISOString();
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                status: action.payload.newStatus,
                updatedAt: now,
                completedAt: action.payload.newStatus === 'done' ? now : t.completedAt,
              }
            : t
        ),
      };
    }

    case 'CREATE_TASK': {
      const newTask: Task = {
        ...action.payload,
        id: `t${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { ...state, tasks: [...state.tasks, newTask] };
    }

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId
            ? { ...t, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : t
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case 'SELECT_PROJECT':
      return { ...state, selectedProjectId: action.payload };

    case 'TOGGLE_SEARCH':
      return { ...state, searchOpen: !state.searchOpen };

    case 'ADD_COMMENT': {
      const newComment: Comment = {
        ...action.payload,
        id: `c${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      return { ...state, comments: [...state.comments, newComment] };
    }

    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  getFilteredTasks: () => Task[];
  getTasksByProject: (projectId: string) => Task[];
  getTasksByStatus: (status: Status) => Task[];
  getUserById: (id: string) => User | undefined;
  getProjectById: (id: string) => Project | undefined;
  getTaskStats: (projectId?: string) => {
    total: number;
    done: number;
    inProgress: number;
    overdue: number;
  };
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getFilteredTasks = useCallback(() => {
    let filtered = [...state.tasks];

    // Filter by project
    if (state.selectedProjectId) {
      filtered = filtered.filter((t) => t.projectId === state.selectedProjectId);
    }

    // Filter by search
    if (state.filters.search) {
      const searchLower = state.filters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchLower) ||
          t.description.toLowerCase().includes(searchLower) ||
          t.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by status
    if (state.filters.status.length > 0) {
      filtered = filtered.filter((t) => state.filters.status.includes(t.status));
    }

    // Filter by priority
    if (state.filters.priority.length > 0) {
      filtered = filtered.filter((t) => state.filters.priority.includes(t.priority));
    }

    // Filter by assignee
    if (state.filters.assigneeId) {
      filtered = filtered.filter((t) => t.assigneeId === state.filters.assigneeId);
    }

    // Filter by tags
    if (state.filters.tags.length > 0) {
      filtered = filtered.filter((t) =>
        state.filters.tags.some((tag) => t.tags.includes(tag))
      );
    }

    // Sort
    const { field, direction } = state.sort;
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (field) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority': {
          const priorityOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        }
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'dueDate':
          comparison = (a.dueDate ? new Date(a.dueDate).getTime() : Infinity) -
            (b.dueDate ? new Date(b.dueDate).getTime() : Infinity);
          break;
        case 'status': {
          const statusOrder: Record<Status, number> = {
            backlog: 0, todo: 1, in_progress: 2, review: 3, done: 4,
          };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        }
      }
      return direction === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [state]);

  const getTasksByProject = useCallback(
    (projectId: string) => state.tasks.filter((t) => t.projectId === projectId),
    [state.tasks]
  );

  const getTasksByStatus = useCallback(
    (status: Status) => {
      let filtered = state.tasks.filter((t) => t.status === status);
      if (state.selectedProjectId) {
        filtered = filtered.filter((t) => t.projectId === state.selectedProjectId);
      }
      return filtered;
    },
    [state.tasks, state.selectedProjectId]
  );

  const getUserById = useCallback(
    (id: string) => state.users.find((u) => u.id === id),
    [state.users]
  );

  const getProjectById = useCallback(
    (id: string) => state.projects.find((p) => p.id === id),
    [state.projects]
  );

  const getTaskStats = useCallback(
    (projectId?: string) => {
      const tasks = projectId
        ? state.tasks.filter((t) => t.projectId === projectId)
        : state.tasks;
      const now = new Date();
      return {
        total: tasks.length,
        done: tasks.filter((t) => t.status === 'done').length,
        inProgress: tasks.filter((t) => t.status === 'in_progress').length,
        overdue: tasks.filter(
          (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== 'done'
        ).length,
      };
    },
    [state.tasks]
  );

  const value: AppContextValue = {
    state,
    dispatch,
    getFilteredTasks,
    getTasksByProject,
    getTasksByStatus,
    getUserById,
    getProjectById,
    getTaskStats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
