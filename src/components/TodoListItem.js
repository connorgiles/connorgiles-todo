import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import styled from 'styled-components';
import moment from 'moment';

import Badge from './Badge';

const ClickableListItem = styled(ListGroupItem)`
  cursor: pointer;
`;

export default function TodoListItem({ todo, onRemove, onEdit }) {
  return (
    <ClickableListItem key={todo.id} onClick={onEdit}>
      {todo.title} <Badge status={todo.status} />{' '}
      {todo.dueDate && `due ${moment(todo.dueDate).fromNow()}`}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        close
      />
    </ClickableListItem>
  );
}
