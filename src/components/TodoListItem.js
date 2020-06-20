import React, { memo } from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import styled from 'styled-components';
import moment from 'moment';

const checkmarkColors = {
  Pending: 'none',
  'In Progress': '#dae4ed',
  Completed: '#223344',
};

const Checkmark = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 15px;
  border: 2px solid #223344;
  vertical-align: middle;
  margin-right: 15px;
  text-align: center;
  color: white;
  background-color: ${(props) => checkmarkColors[props.status] || 'none'};
`;

const ClickableListItem = styled(ListGroupItem)`
  cursor: pointer;
`;

const TodoCheckmark = memo(({ status, toggle }) =>
  status === 'Completed' ? (
    <Checkmark status={status} onClick={toggle}>
      ✓
    </Checkmark>
  ) : (
    <Checkmark status={status} onClick={toggle} />
  )
);

export default memo(function TodoListItem({
  todo,
  onRemove,
  onEdit,
  toggleStatus,
}) {
  const removeTask = (e) => {
    e.stopPropagation();
    onRemove();
  };
  const toggleTaskStatus = (e) => {
    e.stopPropagation();
    toggleStatus();
  };
  return (
    <ClickableListItem
      onClick={onEdit}
      className={`todo-item ${todo?.include ? 'd-block' : 'd-none'}`}>
      <TodoCheckmark
        status={todo.status}
        toggle={toggleTaskStatus}
        className="noselect"
      />
      <span className="align-middle">
        {todo.title}{' '}
        <span className="text-muted">
          {todo.dueDate && `due ${moment(todo.dueDate).fromNow()}`}
        </span>
      </span>
      <Button onClick={removeTask} close />
    </ClickableListItem>
  );
});
