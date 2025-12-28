import React from 'react'
import { Container } from 'react-bootstrap'
import { ListCheck } from 'react-bootstrap-icons'
import TodoApp from './components/TodoApp'

export default function App() {
  return (
    <div className="app-wrapper">
      <Container className="py-5">
        <div className="app-container">
          <h1 className="mb-4 text-center text-primary">
            <ListCheck className="me-2" style={{ fontSize: '2rem' }} />
            My Todo List
          </h1>
          <TodoApp />
        </div>
      </Container>
    </div>
  )
}
