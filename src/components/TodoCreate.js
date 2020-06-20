import React, { useState } from 'react';
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Form,
  ListGroupItem,
} from 'reactstrap';
import styled from 'styled-components';

const FormWrapper = styled(ListGroupItem)`
  padding: 0.5rem;
`;

export default function TodoCreate({ createTodo }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && title !== '') {
      createTodo({ title, status: 'Pending' });
      setTitle('');
    }
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            id="form-title"
            data-testid="create-title"
            name="title"
            className="no-border"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="New task"
            required
          />
          <InputGroupAddon addonType="append">
            <Button color="link">+ Add Task</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </FormWrapper>
  );
}
