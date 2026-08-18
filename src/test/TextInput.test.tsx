import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from '../components/TextInput';

describe('TextInput', () => {
  it('renders with label', () => {
    render(<TextInput value="" onChange={() => {}} label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const onChange = vi.fn();
    render(<TextInput value="" onChange={onChange} label="Name" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Alice' } });
    expect(onChange).toHaveBeenCalledWith('Alice');
  });

  it('shows error message', () => {
    render(<TextInput value="" onChange={() => {}} label="Email" error="Email is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
  });

  it('marks input as invalid when error is present', () => {
    render(<TextInput value="" onChange={() => {}} label="Email" error="Invalid" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows required indicator', () => {
    render(<TextInput value="" onChange={() => {}} label="Name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
