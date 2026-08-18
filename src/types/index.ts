export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
export type ProjectStatus = 'active' | 'archived' | 'paused';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assigneeId: string | null;
  projectId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  estimatedHours: number | null;
  completedAt: string | null;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  ownerId: string;
  members: string[];
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: 'task_created' | 'task_moved' | 'task_completed' | 'comment_added' | 'project_created';
  userId: string;
  taskId?: string;
  projectId?: string;
  details: string;
  timestamp: string;
}

export interface FilterOptions {
  search: string;
  status: Status[];
  priority: Priority[];
  assigneeId: string | null;
  tags: string[];
  dateRange: { start: string | null; end: string | null };
}

export interface SortOptions {
  field: 'title' | 'priority' | 'createdAt' | 'dueDate' | 'status';
  direction: 'asc' | 'desc';
}

export interface BoardColumn {
  id: Status;
  title: string;
  taskIds: string[];
}

export interface BoardState {
  columns: BoardColumn[];
  tasks: Record<string, Task>;
}
