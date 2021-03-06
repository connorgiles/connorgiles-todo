import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ReactDragListView from 'react-drag-listview';

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
  reorderTodo,
  removeTodo,
  editTodo,
  toggleStatus,
}) {
  const TodoListContent = () =>
    !todos || todos.filter((t) => t.include).length === 0 ? (
      <BlankState />
    ) : (
      todos.map((todo, index) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onEdit={() => editTodo(index)}
          onRemove={() => removeTodo(index)}
          toggleStatus={() => toggleStatus(index)}
        />
      ))
    );

  return (
    <ReactDragListView
      nodeSelector=".todo-item"
      handleSelector=".todo-item"
      onDragEnd={reorderTodo}>
      <ListGroup>
        <TodoListContent />
        <TodoCreate createTodo={createTodo} />
      </ListGroup>
    </ReactDragListView>
  );
}
