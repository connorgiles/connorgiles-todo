import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoCreate from './TodoCreate';

describe('TodoCreate', () => {
  test('creates todo', () => {
    const mockCreate = jest.fn();
    const testTask = 'test task';
    render(<TodoCreate createTodo={mockCreate} />);
    fireEvent.change(screen.getByTestId('create-title'), {
      target: { value: testTask },
    });
    fireEvent.click(screen.getByText(/add task/i));
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ title: testTask })
    );
  });

  test('requires title', () => {
    const mockCreate = jest.fn();
    render(<TodoCreate createTodo={mockCreate} />);
    fireEvent.click(screen.getByText(/add task/i));
    expect(mockCreate).toHaveBeenCalledTimes(0);
  });
});
