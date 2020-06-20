import React from 'react';
import { Badge as StrapBadge } from 'reactstrap';
import styled from 'styled-components';

const MyBadge = styled(StrapBadge)`
  cursor: ${(props) => (props.onClick ? 'pointer' : 'inherit')};
`;

const colors = {
  Pending: 'info',
  'In Progress': 'primary',
  Completed: 'success',
};

export default function Badge({ status, color, ...rest }) {
  return (
    <MyBadge color={color || colors[status]} {...rest}>
      {status}
    </MyBadge>
  );
}
