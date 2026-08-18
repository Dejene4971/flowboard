import type { User, Project, Task, Activity, Comment } from '../types';

export const users: User[] = [
  { id: 'u1', name: 'Alice Chen', email: 'alice@flowboard.dev', avatar: 'AC' },
  { id: 'u2', name: 'Bob Williams', email: 'bob@flowboard.dev', avatar: 'BW' },
  { id: 'u3', name: 'Carol Martinez', email: 'carol@flowboard.dev', avatar: 'CM' },
  { id: 'u4', name: 'David Kim', email: 'david@flowboard.dev', avatar: 'DK' },
  { id: 'u5', name: 'Eva Johnson', email: 'eva@flowboard.dev', avatar: 'EJ' },
  { id: 'u6', name: 'Frank Lee', email: 'frank@flowboard.dev', avatar: 'FL' },
];

export const projects: Project[] = [
  {
    id: 'p1', name: 'FlowBoard Web', description: 'Main web application',
    status: 'active', ownerId: 'u1', members: ['u1', 'u2', 'u3'],
    color: '#3b82f6', createdAt: '2025-01-15T09:00:00Z', updatedAt: '2025-08-10T14:30:00Z',
  },
  {
    id: 'p2', name: 'Mobile App', description: 'React Native mobile application',
    status: 'active', ownerId: 'u2', members: ['u2', 'u4', 'u5'],
    color: '#10b981', createdAt: '2025-03-01T10:00:00Z', updatedAt: '2025-08-08T11:00:00Z',
  },
  {
    id: 'p3', name: 'API Gateway', description: 'Backend API services',
    status: 'active', ownerId: 'u3', members: ['u1', 'u3', 'u4'],
    color: '#f59e0b', createdAt: '2025-02-20T08:00:00Z', updatedAt: '2025-07-15T16:00:00Z',
  },
  {
    id: 'p4', name: 'Design System', description: 'Shared component library',
    status: 'paused', ownerId: 'u5', members: ['u1', 'u5'],
    color: '#8b5cf6', createdAt: '2025-04-10T12:00:00Z', updatedAt: '2025-06-20T09:00:00Z',
  },
  {
    id: 'p5', name: 'Analytics Dashboard', description: 'Internal analytics tool',
    status: 'archived', ownerId: 'u1', members: ['u1', 'u2', 'u3', 'u4'],
    color: '#ef4444', createdAt: '2024-11-01T08:00:00Z', updatedAt: '2025-05-30T17:00:00Z',
  },
];

export const tasks: Task[] = [
  // FlowBoard Web tasks
  { id: 't1', title: 'Implement user authentication flow', description: 'Add login/register forms with validation', status: 'done', priority: 'high', assigneeId: 'u1', projectId: 'p1', tags: ['auth', 'frontend'], createdAt: '2025-07-01T09:00:00Z', updatedAt: '2025-07-15T14:00:00Z', dueDate: '2025-07-20', estimatedHours: 16, completedAt: '2025-07-15T14:00:00Z' },
  { id: 't2', title: 'Fix dashboard chart rendering', description: 'Charts not rendering on Safari', status: 'in_progress', priority: 'critical', assigneeId: 'u2', projectId: 'p1', tags: ['bug', 'dashboard'], createdAt: '2025-08-01T10:00:00Z', updatedAt: '2025-08-10T11:00:00Z', dueDate: '2025-08-12', estimatedHours: 8, completedAt: null },
  { id: 't3', title: 'Add dark mode toggle', description: 'Implement theme switching', status: 'todo', priority: 'medium', assigneeId: 'u3', projectId: 'p1', tags: ['ui', 'feature'], createdAt: '2025-08-05T09:00:00Z', updatedAt: '2025-08-05T09:00:00Z', dueDate: '2025-08-20', estimatedHours: 12, completedAt: null },
  { id: 't4', title: 'Optimize bundle size', description: 'Reduce initial load time', status: 'todo', priority: 'high', assigneeId: null, projectId: 'p1', tags: ['performance'], createdAt: '2025-08-07T08:00:00Z', updatedAt: '2025-08-07T08:00:00Z', dueDate: '2025-08-25', estimatedHours: 20, completedAt: null },
  { id: 't5', title: 'Write E2E tests for login', description: 'Cover login flow with Playwright', status: 'review', priority: 'medium', assigneeId: 'u1', projectId: 'p1', tags: ['testing'], createdAt: '2025-08-03T11:00:00Z', updatedAt: '2025-08-09T16:00:00Z', dueDate: '2025-08-15', estimatedHours: 8, completedAt: null },
  { id: 't6', title: 'Implement notification system', description: 'Real-time notifications via WebSocket', status: 'backlog', priority: 'low', assigneeId: 'u2', projectId: 'p1', tags: ['feature', 'backend'], createdAt: '2025-08-02T09:00:00Z', updatedAt: '2025-08-02T09:00:00Z', dueDate: null, estimatedHours: 30, completedAt: null },
  { id: 't7', title: 'Fix task drag-and-drop on mobile', description: 'Touch events not working on iOS', status: 'in_progress', priority: 'high', assigneeId: 'u3', projectId: 'p1', tags: ['bug', 'mobile'], createdAt: '2025-08-06T10:00:00Z', updatedAt: '2025-08-10T09:00:00Z', dueDate: '2025-08-14', estimatedHours: 10, completedAt: null },
  { id: 't8', title: 'Add keyboard shortcuts', description: 'Cmd+K search, navigation shortcuts', status: 'todo', priority: 'medium', assigneeId: null, projectId: 'p1', tags: ['ux', 'feature'], createdAt: '2025-08-08T09:00:00Z', updatedAt: '2025-08-08T09:00:00Z', dueDate: '2025-08-30', estimatedHours: 14, completedAt: null },
  // Mobile App tasks
  { id: 't9', title: 'Set up React Native project', description: 'Initialize project with Expo', status: 'done', priority: 'high', assigneeId: 'u4', projectId: 'p2', tags: ['setup'], createdAt: '2025-03-01T10:00:00Z', updatedAt: '2025-03-05T15:00:00Z', dueDate: '2025-03-10', estimatedHours: 8, completedAt: '2025-03-05T15:00:00Z' },
  { id: 't10', title: 'Implement push notifications', description: 'Firebase Cloud Messaging integration', status: 'todo', priority: 'medium', assigneeId: 'u5', projectId: 'p2', tags: ['feature', 'mobile'], createdAt: '2025-08-01T09:00:00Z', updatedAt: '2025-08-01T09:00:00Z', dueDate: '2025-08-20', estimatedHours: 16, completedAt: null },
  { id: 't11', title: 'Offline data sync', description: 'Local-first data with background sync', status: 'backlog', priority: 'high', assigneeId: 'u4', projectId: 'p2', tags: ['feature', 'offline'], createdAt: '2025-08-03T08:00:00Z', updatedAt: '2025-08-03T08:00:00Z', dueDate: null, estimatedHours: 40, completedAt: null },
  { id: 't12', title: 'Fix camera permissions on Android', description: 'App crashes when camera permission denied', status: 'in_progress', priority: 'critical', assigneeId: 'u5', projectId: 'p2', tags: ['bug', 'android'], createdAt: '2025-08-09T11:00:00Z', updatedAt: '2025-08-10T10:00:00Z', dueDate: '2025-08-11', estimatedHours: 4, completedAt: null },
  // API Gateway tasks
  { id: 't13', title: 'Rate limiting middleware', description: 'Implement token bucket rate limiting', status: 'done', priority: 'high', assigneeId: 'u3', projectId: 'p3', tags: ['security'], createdAt: '2025-07-10T09:00:00Z', updatedAt: '2025-07-20T16:00:00Z', dueDate: '2025-07-25', estimatedHours: 12, completedAt: '2025-07-20T16:00:00Z' },
  { id: 't14', title: 'GraphQL schema design', description: 'Define schema for project queries', status: 'review', priority: 'medium', assigneeId: 'u1', projectId: 'p3', tags: ['api', 'graphql'], createdAt: '2025-08-01T08:00:00Z', updatedAt: '2025-08-09T14:00:00Z', dueDate: '2025-08-15', estimatedHours: 16, completedAt: null },
  { id: 't15', title: 'Database migration scripts', description: 'PostgreSQL schema migrations', status: 'todo', priority: 'low', assigneeId: 'u4', projectId: 'p3', tags: ['database'], createdAt: '2025-08-05T10:00:00Z', updatedAt: '2025-08-05T10:00:00Z', dueDate: null, estimatedHours: 8, completedAt: null },
];

export const activities: Activity[] = [
  { id: 'a1', type: 'task_completed', userId: 'u1', taskId: 't1', projectId: 'p1', details: 'Completed "Implement user authentication flow"', timestamp: '2025-07-15T14:00:00Z' },
  { id: 'a2', type: 'task_moved', userId: 'u2', taskId: 't2', projectId: 'p1', details: 'Moved "Fix dashboard chart rendering" to In Progress', timestamp: '2025-08-10T11:00:00Z' },
  { id: 'a3', type: 'task_created', userId: 'u3', taskId: 't7', projectId: 'p1', details: 'Created "Fix task drag-and-drop on mobile"', timestamp: '2025-08-06T10:00:00Z' },
  { id: 'a4', type: 'task_moved', userId: 'u5', taskId: 't12', projectId: 'p2', details: 'Moved "Fix camera permissions on Android" to In Progress', timestamp: '2025-08-10T10:00:00Z' },
  { id: 'a5', type: 'project_created', userId: 'u1', projectId: 'p1', details: 'Created project "FlowBoard Web"', timestamp: '2025-01-15T09:00:00Z' },
  { id: 'a6', type: 'task_completed', userId: 'u4', taskId: 't9', projectId: 'p2', details: 'Completed "Set up React Native project"', timestamp: '2025-03-05T15:00:00Z' },
  { id: 'a7', type: 'task_completed', userId: 'u3', taskId: 't13', projectId: 'p3', details: 'Completed "Rate limiting middleware"', timestamp: '2025-07-20T16:00:00Z' },
  { id: 'a8', type: 'task_moved', userId: 'u1', taskId: 't5', projectId: 'p1', details: 'Moved "Write E2E tests for login" to Review', timestamp: '2025-08-09T16:00:00Z' },
  { id: 'a9', type: 'task_created', userId: 'u2', taskId: 't16', projectId: 'p1', details: 'Created "Add error boundary component"', timestamp: '2025-08-10T12:00:00Z' },
  { id: 'a10', type: 'task_completed', userId: 'u3', taskId: 't17', projectId: 'p2', details: 'Completed "Fix image upload on mobile"', timestamp: '2025-08-11T09:00:00Z' },
];

export const comments: Comment[] = [
  { id: 'c1', taskId: 't2', authorId: 'u1', content: 'This is a critical issue affecting production users. Let me know if you need help with the Safari-specific SVG rendering.', createdAt: '2025-08-05T10:00:00Z' },
  { id: 'c2', taskId: 't2', authorId: 'u2', content: 'Thanks Alice. I think the issue is with the SVG viewBox attribute. Testing a fix now.', createdAt: '2025-08-05T11:30:00Z' },
  { id: 'c3', taskId: 't7', authorId: 'u3', content: 'The touch event handling needs to use pointer events instead of mouse events for cross-platform support.', createdAt: '2025-08-07T09:00:00Z' },
  { id: 'c4', taskId: 't12', authorId: 'u5', content: 'Found the issue - the permission request callback is not properly handling the denial case.', createdAt: '2025-08-09T14:00:00Z' },
  { id: 'c5', taskId: 't14', authorId: 'u4', content: 'The GraphQL schema looks good. Consider adding pagination for the project queries.', createdAt: '2025-08-08T16:00:00Z' },
];
