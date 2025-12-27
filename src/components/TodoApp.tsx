import React, { useState } from 'react'
import { Todo } from '../types'
import TodoItem from './TodoItem'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function TodoApp() {
  const [items, setItems] = useState<Todo[]>([])
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleAdd() {
    const trimmed = text.trim()
    if (!trimmed) return
    const exists = items.some(i => i.text.toLowerCase() === trimmed.toLowerCase())
    if (exists) {
      setError('Duplicate item')
      return
    }
    const newItem: Todo = { id: uid(), text: trimmed, completed: false }
    setItems(prev => [newItem, ...prev])
    setText('')
    setError(null)
  }

  function handleToggle(id: string) {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, completed: !i.completed } : i)))
  }

  function handleDelete(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div>
      <div className="input-row">
        <input
          aria-label="new-todo"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a new todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      {error && <div role="alert" className="error">{error}</div>}
      <ul className="todo-list">
        {items.map(item => (
          <TodoItem key={item.id} todo={item} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </ul>
      {items.length === 0 && <div className="empty">No items yet</div>}
    </div>
  )
}
