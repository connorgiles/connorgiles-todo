import React from 'react';
import { ListGroupItem, Badge, Button } from 'reactstrap';
import styled from 'styled-components';
import moment from 'moment';

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

export default function TodoListItem({ todo, onRemove, onEdit }) {
  return (
    <ClickableListItem key={todo.id} onClick={onEdit}>
      {todo.title} <StatusBadge status={todo.status} />{' '}
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
