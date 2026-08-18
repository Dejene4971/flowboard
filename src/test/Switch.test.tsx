import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../components/Switch';

describe('Switch', () => {
  it('renders with label', () => {
    render(
      <Switch checked={false} onChange={() => {}} label="Enable notifications" />
    );
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('shows checked state', () => {
    render(
      <Switch checked={true} onChange={() => {}} label="Toggle" />
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('shows unchecked state', () => {
    render(
      <Switch checked={false} onChange={() => {}} label="Toggle" />
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(
      <Switch checked={false} onChange={onChange} label="Toggle" />
    );
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Switch checked={false} onChange={() => {}} label="Toggle" disabled />
    );
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
