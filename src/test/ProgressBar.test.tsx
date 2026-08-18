import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('renders with percentage label', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('has correct aria attributes', () => {
    render(<ProgressBar value={75} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders custom label', () => {
    render(<ProgressBar value={50} label="Uploading..." />);
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
  });

  it('caps at 100%', () => {
    render(<ProgressBar value={150} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
  });

  it('applies custom color', () => {
    render(<ProgressBar value={50} color="#10b981" />);
    const fill = document.querySelector('.progress-bar-fill') as HTMLElement;
    expect(fill.style.backgroundColor).toBe('rgb(16, 185, 129)');
  });
});
