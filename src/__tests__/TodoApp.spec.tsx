import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoApp from '../components/TodoApp'

describe('TodoApp', () => {
  test('adds new item and prevents duplicates', async () => {
    render(<TodoApp />)
    const user = userEvent.setup()
    const input = screen.getByLabelText('new-todo') as HTMLInputElement
    const addBtn = screen.getByText('Add')

    await user.type(input, 'Task One')
    await user.click(addBtn)
    expect(screen.getByText('Task One')).toBeInTheDocument()

    // try duplicate
    await user.type(input, 'Task One')
    await user.click(addBtn)
    expect(screen.getAllByText('Task One').length).toBe(1)
    expect(screen.getByRole('alert')).toHaveTextContent('Duplicate')
  })

  test('toggles completed and deletes item', async () => {
    render(<TodoApp />)
    const user = userEvent.setup()
    const input = screen.getByLabelText('new-todo') as HTMLInputElement
    const addBtn = screen.getByText('Add')

    await user.type(input, 'Do stuff')
    await user.click(addBtn)

    const item = screen.getByText('Do stuff')
    expect(item).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    await user.click(checkbox)
    expect(checkbox.checked).toBe(true)

    const deleteBtn = screen.getByText('Delete')
    await user.click(deleteBtn)
    expect(screen.queryByText('Do stuff')).toBeNull()
  })
})
