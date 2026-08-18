import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function SearchModal() {
  const { state, dispatch, getProjectById } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    const taskResults = state.tasks
      .filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower) ||
          t.tags.some((tag) => tag.toLowerCase().includes(lower))
      )
      .map((t) => ({
        id: t.id,
        title: t.title,
        subtitle: `${getProjectById(t.projectId)?.name ?? 'Unknown'} · ${t.status}`,
        type: 'task' as const,
        projectId: t.projectId,
      }));

    const projectResults = state.projects
      .filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower)
      )
      .map((p) => ({
        id: p.id,
        title: p.name,
        subtitle: p.description,
        type: 'project' as const,
        projectId: p.id,
      }));

    return [...taskResults, ...projectResults].slice(0, 10);
  }, [query, state.tasks, state.projects, getProjectById]);

  // BUG: selectedIndex is not reset when query changes
  // This causes keyboard navigation to start at the old index
  // when the results list is shorter than the previous selectedIndex

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (selectedIndex < results.length - 1) {
            setSelectedIndex((prev) => prev + 1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (selectedIndex > 0) {
            setSelectedIndex((prev) => prev - 1);
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            const result = results[selectedIndex];
            if (result.type === 'project') {
              dispatch({ type: 'SELECT_PROJECT', payload: result.projectId });
              navigate('/board');
            } else {
              dispatch({ type: 'SELECT_PROJECT', payload: result.projectId });
              navigate('/board');
            }
            dispatch({ type: 'TOGGLE_SEARCH' });
          }
          break;
        case 'Escape':
          dispatch({ type: 'TOGGLE_SEARCH' });
          break;
      }
    },
    [results, selectedIndex, dispatch, navigate]
  );

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current;
    if (list) {
      const item = list.children[selectedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <div
      className="search-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dispatch({ type: 'TOGGLE_SEARCH' });
        }
      }}
      role="dialog"
      aria-label="Search"
      aria-modal="true"
    >
      <div className="search-modal">
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search tasks and projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search tasks and projects"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant={
              results[selectedIndex] ? `search-result-${results[selectedIndex].id}` : undefined
            }
            role="combobox"
          />
          <kbd className="search-escape" aria-label="Press Escape to close">Esc</kbd>
        </div>
        {results.length > 0 && (
          <ul
            id="search-results"
            ref={listRef}
            className="search-results"
            role="listbox"
            aria-label="Search results"
          >
            {results.map((result, index) => (
              <li
                key={`${result.type}-${result.id}`}
                id={`search-result-${result.id}`}
                className={`search-result ${index === selectedIndex ? 'search-result--selected' : ''}`}
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => {
                  if (result.type === 'project') {
                    dispatch({ type: 'SELECT_PROJECT', payload: result.projectId });
                  }
                  navigate(result.type === 'project' ? '/board' : '/board');
                  dispatch({ type: 'TOGGLE_SEARCH' });
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="search-result-type" aria-hidden="true">
                  {result.type === 'task' ? '📋' : '📁'}
                </span>
                <div className="search-result-info">
                  <span className="search-result-title">{result.title}</span>
                  <span className="search-result-subtitle">{result.subtitle}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {query && results.length === 0 && (
          <div className="search-empty" role="status">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
