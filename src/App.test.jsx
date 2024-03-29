import { render, screen, fireEvent } from '@testing-library/react';
import { expect } from 'vitest';

test('clears all todos when clear button is pressed', () => {
    render(<App />);

    const desc = screen.getByPlaceholderText('Description');
    fireEvent.change(desc, { target: { value: 'Go to coffee' } });
    const date = screen.getByPlaceholderText('Date');
    fireEvent.change(date, { target: { value: '29.12.2023' } });

    const addButton = screen.getByText('Add')
    fireEvent.click(addButton)

    const events = screen.getAllByText('Go to coffee')
    expect(events.length).toBe(1)

    var button = screen.getByText('Clear');
    fireEvent.click(button)

    events = screen.getAllByText('Go to coffee')
    expect(events.length).toBe(0)
  });