import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { Board } from '../pages/Board';

function renderBoard() {
  return render(
    <AppProvider>
      <BrowserRouter>
        <Board />
      </BrowserRouter>
    </AppProvider>
  );
}

describe('Board', () => {
  it('renders all kanban columns', () => {
    renderBoard();
    expect(screen.getByText('Backlog')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('displays task cards in columns', () => {
    renderBoard();
    const taskCards = screen.getAllByRole('listitem');
    expect(taskCards.length).toBeGreaterThan(0);
  });

  it('shows column task counts', () => {
    renderBoard();
    const counts = screen.getAllByText(/^\d+$/);
    expect(counts.length).toBeGreaterThan(0);
  });

  it('has assignee filter dropdown', () => {
    renderBoard();
    expect(screen.getByLabelText('Filter by assignee')).toBeInTheDocument();
  });

  it('renders task cards with priority indicators', () => {
    renderBoard();
    const priorities = screen.getAllByLabelText(/Priority: /);
    expect(priorities.length).toBeGreaterThan(0);
  });

  it('marks overdue tasks', () => {
    renderBoard();
    const overdueBadges = screen.getAllByText('Overdue');
    expect(overdueBadges.length).toBeGreaterThan(0);
  });
});
