import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../components/Dropdown';

const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
];

describe('Dropdown', () => {
  it('renders with selected option', () => {
    render(
      <Dropdown
        options={options}
        value="opt1"
        onChange={() => {}}
        label="Test dropdown"
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(
      <Dropdown
        options={options}
        value=""
        onChange={() => {}}
        placeholder="Choose one"
        label="Test dropdown"
      />
    );
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('opens menu on click', () => {
    render(
      <Dropdown
        options={options}
        value=""
        onChange={() => {}}
        label="Test dropdown"
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const onChange = vi.fn();
    render(
      <Dropdown
        options={options}
        value=""
        onChange={onChange}
        label="Test dropdown"
      />
    );
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 2'));
    expect(onChange).toHaveBeenCalledWith('opt2');
  });
});
