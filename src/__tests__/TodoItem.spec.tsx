import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '../components/TodoItem'
import { Todo } from '../types'

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'Test item',
    completed: false
  }

  test('renders todo item with text', () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(
      <TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />
    )

    expect(screen.getByText('Test item')).toBeInTheDocument()
  })

  test('calls onToggle when checkbox is clicked', async () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(
      <TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />
    )

    const user = userEvent.setup()
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    await user.click(checkbox)

    expect(mockToggle).toHaveBeenCalledWith('1')
  })

  test('calls onDelete when delete button is clicked', async () => {
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    render(
      <TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />
    )

    const user = userEvent.setup()
    const deleteBtn = screen.getByText('Delete')
    await user.click(deleteBtn)

    expect(mockDelete).toHaveBeenCalledWith('1')
  })

  test('shows completed state with strikethrough', () => {
    const completedTodo: Todo = { ...mockTodo, completed: true }
    const mockToggle = vi.fn()
    const mockDelete = vi.fn()

    const { container } = render(
      <TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />
    )

    const listItem = container.querySelector('.todo-item.completed')
    expect(listItem).toBeInTheDocument()
  })
})
