import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import TodoListItem from './TodoListItem';
import TodoCreate from './TodoCreate';

const BlankState = () => (
  <ListGroupItem className="text-muted py-3">
    Create your first todo below!
  </ListGroupItem>
);

export default function TodoList({
  createTodo,
  todos = [],
  removeTodo,
  editTodo,
}) {
  const TodoListContent = () =>
    !todos || todos.length === 0 ? (
      <BlankState />
    ) : (
      todos.map((todo, index) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onEdit={() => editTodo(index)}
          onRemove={() => removeTodo(index)}
        />
      ))
    );

  return (
    <ListGroup>
      <TodoListContent />
      <TodoCreate createTodo={createTodo} />
    </ListGroup>
  );
}
