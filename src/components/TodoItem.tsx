import React from 'react'
import { ListGroup, Form, Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { Todo } from '../types'

function TodoItem({
  todo,
  onToggle,
  onDelete
}: {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <ListGroup.Item className={`d-flex align-items-center justify-content-between gap-3 ${todo.completed ? 'bg-light' : ''}`}>
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <Form.Check
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`toggle-${todo.id}`}
          className="m-0"
        />
        <span className={`todo-text flex-grow-1 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}>
          {todo.text}
        </span>
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(todo.id)}
        aria-label={`delete-${todo.id}`}
        title="Delete item"
      >
        <Trash />
      </Button>
    </ListGroup.Item>
  )
}

export default React.memo(TodoItem)
