import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tag } from '../components/Tag';

describe('Tag', () => {
  it('renders label', () => {
    render(<Tag label="react" />);
    expect(screen.getByText('react')).toBeInTheDocument();
  });

  it('shows remove button when removable', () => {
    render(<Tag label="tag" removable onRemove={() => {}} />);
    expect(screen.getByLabelText('Remove tag')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = vi.fn();
    render(<Tag label="tag" removable onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText('Remove tag'));
    expect(onRemove).toHaveBeenCalled();
  });

  it('does not show remove button when not removable', () => {
    render(<Tag label="tag" />);
    expect(screen.queryByLabelText(/Remove/)).not.toBeInTheDocument();
  });
});
