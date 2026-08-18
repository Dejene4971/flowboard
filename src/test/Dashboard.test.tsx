import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { Dashboard } from '../pages/Dashboard';

function renderDashboard() {
  return render(
    <AppProvider>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </AppProvider>
  );
}

describe('Dashboard', () => {
  it('renders the dashboard heading', () => {
    renderDashboard();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('displays stat cards', () => {
    renderDashboard();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Overdue')).toBeInTheDocument();
  });

  it('shows active projects section', () => {
    renderDashboard();
    expect(screen.getByText('Active Projects')).toBeInTheDocument();
  });

  it('shows recent activity', () => {
    renderDashboard();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  it('displays progress bars with correct aria attributes', () => {
    renderDashboard();
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
    progressBars.forEach((bar) => {
      expect(bar).toHaveAttribute('aria-valuemin', '0');
      expect(bar).toHaveAttribute('aria-valuemax', '100');
    });
  });
});
