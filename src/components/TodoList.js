import React from 'react';
import { ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';
import styled from 'styled-components';

import TodoForm from './TodoForm';

const ClickableListItem = styled(ListGroupItem)`
  cursor: pointer;
`;

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Pending':
      return <Badge color="secondary">{status}</Badge>;
    case 'In Progress':
      return <Badge color="info">{status}</Badge>;
    case 'Completed':
      return <Badge color="success">{status}</Badge>;
    default:
      return <></>;
  }
};

export default function TodoList({
  saveTodo,
  todos = [],
  removeTodo,
  editTodo,
}) {
  const onRemove = (e, index) => {
    e.stopPropagation();
    removeTodo(index);
  };

  const TodoListContent = () =>
    !todos || todos.length === 0 ? (
      <ListGroupItem className="text-muted py-3">
        Create your first todo below!
      </ListGroupItem>
    ) : (
      todos.map((todo, index) => (
        <ClickableListItem key={todo.id} onClick={() => editTodo(index)}>
          {todo.title} <StatusBadge status={todo.status} />
          <Button onClick={(e) => onRemove(e, index)} close />
        </ClickableListItem>
      ))
    );

  return (
    <ListGroup>
      <TodoListContent />
      <ListGroupItem>
        <TodoForm saveTodo={saveTodo} />
      </ListGroupItem>
    </ListGroup>
  );
}
