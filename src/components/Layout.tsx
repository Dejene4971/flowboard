import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SearchModal } from './SearchModal';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/projects', label: 'Projects', icon: '📁' },
  { path: '/board', label: 'Board', icon: '📋' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

export function Layout() {
  const { state, dispatch } = useApp();

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        dispatch({ type: 'TOGGLE_SEARCH' });
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <div className="layout">
      <aside className="sidebar" role="navigation" aria-label="Main navigation">
        <div className="sidebar-header">
          <h1 className="logo">FlowBoard</h1>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item--active' : ''}`
              }
              end={item.path === '/'}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button
            className="search-trigger"
            onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}
            aria-label="Open search (Ctrl+K)"
          >
            <span aria-hidden="true">🔍</span>
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
      </aside>
      <main className="main-content" role="main">
        <Outlet />
      </main>
      {state.searchOpen && <SearchModal />}
    </div>
  );
}
