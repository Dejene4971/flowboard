import { useMemo } from 'react';
import { useApp } from '../context/AppContext';

export function Dashboard() {
  const { state, getTaskStats, getUserById } = useApp();

  const stats = useMemo(() => getTaskStats(), [getTaskStats]);

  const recentActivity = useMemo(
    () =>
      [...state.activities]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5),
    [state.activities]
  );

  const overdueTasks = useMemo(
    () =>
      state.tasks.filter(
        (t) =>
          t.dueDate &&
          new Date(t.dueDate) < new Date() &&
          t.status !== 'done'
      ),
    [state.tasks]
  );

  const projectStats = useMemo(
    () =>
      state.projects
        .filter((p) => p.status === 'active')
        .map((p) => ({
          ...p,
          stats: getTaskStats(p.id),
        })),
    [state.projects, getTaskStats]
  );

  return (
    <div className="dashboard">
      <header className="page-header">
        <h2>Dashboard</h2>
        <p className="page-subtitle">Overview of your projects and tasks</p>
      </header>

      <section className="stats-grid" aria-label="Task statistics">
        <div className="stat-card" role="status">
          <div className="stat-icon stat-icon--total" aria-hidden="true">📋</div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>
        <div className="stat-card" role="status">
          <div className="stat-icon stat-icon--progress" aria-hidden="true">🔄</div>
          <div className="stat-info">
            <span className="stat-value">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
        </div>
        <div className="stat-card" role="status">
          <div className="stat-icon stat-icon--done" aria-hidden="true">✅</div>
          <div className="stat-info">
            <span className="stat-value">{stats.done}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="stat-card" role="status">
          <div className="stat-icon stat-icon--overdue" aria-hidden="true">⚠️</div>
          <div className="stat-info">
            <span className="stat-value">{stats.overdue}</span>
            <span className="stat-label">Overdue</span>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="dashboard-section" aria-label="Project overview">
          <h3>Active Projects</h3>
          <div className="project-cards">
            {projectStats.map((p) => (
              <div key={p.id} className="project-card">
                <div className="project-card-header">
                  <span
                    className="project-color"
                    style={{ backgroundColor: p.color }}
                    aria-hidden="true"
                  />
                  <span className="project-name">{p.name}</span>
                </div>
                <div className="project-stats">
                  <span>{p.stats.done}/{p.stats.total} tasks done</span>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={p.stats.total > 0 ? Math.round((p.stats.done / p.stats.total) * 100) : 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${p.name} progress`}
                  >
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${p.stats.total > 0 ? (p.stats.done / p.stats.total) * 100 : 0}%`,
                        backgroundColor: p.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section" aria-label="Recent activity">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            {recentActivity.map((activity) => {
              const user = getUserById(activity.userId);
              return (
                <li key={activity.id} className="activity-item">
                  <span className="activity-avatar" aria-hidden="true">
                    {user?.avatar ?? '??'}
                  </span>
                  <div className="activity-info">
                    <span className="activity-text">
                      <strong>{user?.name ?? 'Unknown'}</strong>{' '}
                      {activity.details}
                    </span>
                    <time className="activity-time" dateTime={activity.timestamp}>
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </time>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {overdueTasks.length > 0 && (
        <section className="dashboard-section overdue-section" aria-label="Overdue tasks">
          <h3>⚠️ Overdue Tasks</h3>
          <ul className="overdue-list">
            {overdueTasks.map((task) => (
              <li key={task.id} className="overdue-item">
                <span className="overdue-title">{task.title}</span>
                <span className="overdue-date">
                  Due {new Date(task.dueDate!).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
