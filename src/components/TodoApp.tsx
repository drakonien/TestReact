import React, { useState, useCallback, useMemo } from 'react'
import { Form, Button, ListGroup, Alert } from 'react-bootstrap'
import { Lightbulb } from 'react-bootstrap-icons'
import { Todo } from '../types'
import TodoItem from './TodoItem'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function TodoApp() {
  const [items, setItems] = useState<Todo[]>([])
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleAdd = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed) return

    setItems(prev => {
      const exists = prev.some(i => i.text.toLowerCase() === trimmed.toLowerCase())
      if (exists) {
        setError('Duplicate item')
        return prev
      }
      const newItem: Todo = { id: uid(), text: trimmed, completed: false }
      setError(null)
      setText('')
      return [newItem, ...prev]
    })
  }, [text])

  const handleToggle = useCallback((id: string) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, completed: !i.completed } : i)))
  }, [])

  const handleDelete = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])
  const renderedItems = useMemo(
    () => items.map(item => (
      <TodoItem key={item.id} todo={item} onToggle={handleToggle} onDelete={handleDelete} />
    )),
    [items, handleToggle, handleDelete]
  )

  return (
    <div>
      <div className="input-row mb-4">
        <Form.Control
          aria-label="new-todo"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a new todo..."
          size="lg"
        />
        <Button variant="primary" onClick={handleAdd} size="lg">Add</Button>
      </div>
      {error && <Alert variant="danger" role="alert" className="mb-3">{error}</Alert>}
      {items.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p className="fs-5"><Lightbulb className="me-2" /> No items yet. Add one to get started!</p>
        </div>
      ) : (
        <ListGroup className="todo-list">
          {renderedItems}
        </ListGroup>
      )}
    </div>
  )
}
