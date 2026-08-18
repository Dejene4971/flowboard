import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import type { ProjectStatus } from '../types';

export function Projects() {
  const { state, dispatch, getTaskStats } = useApp();
  const [statusFilter, setStatusFilter] = React.useState<ProjectStatus | 'all'>('all');

  const filteredProjects = useMemo(() => {
    if (statusFilter === 'all') return state.projects;
    return state.projects.filter((p) => p.status === statusFilter);
  }, [state.projects, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: state.projects.length };
    state.projects.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    return counts;
  }, [state.projects]);

  return (
    <div className="projects-page">
      <header className="page-header">
        <h2>Projects</h2>
        <div className="filter-tabs" role="tablist" aria-label="Filter projects by status">
          {(['all', 'active', 'paused', 'archived'] as const).map((status) => (
            <button
              key={status}
              role="tab"
              aria-selected={statusFilter === status}
              className={`filter-tab ${statusFilter === status ? 'filter-tab--active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="filter-count">{statusCounts[status] ?? 0}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="projects-grid">
        {filteredProjects.map((project) => {
          const stats = getTaskStats(project.id);
          const members = project.members
            .map((id) => state.users.find((u) => u.id === id))
            .filter(Boolean);

          return (
            <article
              key={project.id}
              className="project-card-lg"
              onClick={() => {
                dispatch({ type: 'SELECT_PROJECT', payload: project.id });
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  dispatch({ type: 'SELECT_PROJECT', payload: project.id });
                }
              }}
              aria-label={`${project.name} project, ${project.status}`}
            >
              <div
                className="project-card-lg-header"
                style={{ borderLeftColor: project.color }}
              >
                <h3>{project.name}</h3>
                <span className={`project-status project-status--${project.status}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-card-lg-stats">
                <div className="project-stat">
                  <span className="project-stat-value">{stats.total}</span>
                  <span className="project-stat-label">Tasks</span>
                </div>
                <div className="project-stat">
                  <span className="project-stat-value">{stats.done}</span>
                  <span className="project-stat-label">Done</span>
                </div>
                <div className="project-stat">
                  <span className="project-stat-value">{stats.inProgress}</span>
                  <span className="project-stat-label">Active</span>
                </div>
              </div>
              <div className="progress-bar" role="progressbar"
                aria-valuenow={stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${project.name} completion progress`}
              >
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%`,
                    backgroundColor: project.color,
                  }}
                />
              </div>
              <div className="project-members">
                {members.map((user) => user && (
                  <span
                    key={user.id}
                    className="member-avatar"
                    title={user.name}
                    aria-label={user.name}
                  >
                    {user.avatar}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
