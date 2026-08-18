import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Toast } from '../components/Toast';

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast message="Success!" onDismiss={() => {}} />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('shows correct icon for type', () => {
    render(<Toast message="Error occurred" type="error" onDismiss={() => {}} />);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('calls onDismiss when close button is clicked', () => {
    const onDismiss = vi.fn();
    render(<Toast message="Test" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByLabelText('Dismiss notification'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('auto-dismisses after duration', async () => {
    vi.useFakeTimers();
    const onDismiss = vi.fn();
    render(<Toast message="Auto dismiss" duration={3000} onDismiss={onDismiss} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onDismiss).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
