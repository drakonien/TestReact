import React from 'react'
import { Todo } from '../types'

export default function TodoItem({
  todo,
  onToggle,
  onDelete
}: {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`toggle-${todo.id}`}
        />
        <span className="todo-text">{todo.text}</span>
      </label>
      <button className="delete" onClick={() => onDelete(todo.id)} aria-label={`delete-${todo.id}`}>
        Delete
      </button>
    </li>
  )
}
