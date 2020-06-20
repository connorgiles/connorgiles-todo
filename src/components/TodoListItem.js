import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import styled from 'styled-components';
import moment from 'moment';

import Badge from './Badge';

const ClickableListItem = styled(ListGroupItem)`
  cursor: pointer;
`;

export default function TodoListItem({ todo, onRemove, onEdit }) {
  const removeTask = (e) => {
    e.stopPropagation();
    onRemove();
  };
  return (
    <ClickableListItem key={todo.id} onClick={onEdit}>
      {todo.title} <Badge status={todo.status} />{' '}
      {todo.dueDate && `due ${moment(todo.dueDate).fromNow()}`}
      <Button onClick={removeTask} close />
    </ClickableListItem>
  );
}
