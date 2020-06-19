import React from 'react';
import { Badge } from 'reactstrap';
import styled from 'styled-components';

const MyBadge = styled(Badge)`
  cursor: ${(props) => (props.onClick ? 'pointer' : 'inherit')};
`;

const colors = {
  Pending: 'info',
  'In Progress': 'primary',
  Completed: 'success',
};

export default function StatusBadge({ status, color, ...rest }) {
  return (
    <MyBadge color={color || colors[status]} {...rest}>
      {status}
    </MyBadge>
  );
}
