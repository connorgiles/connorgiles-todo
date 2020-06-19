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
    createTodo({ title, status: 'Pending' });
    setTitle('');
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            id="form-title"
            name="title"
            className="no-border"
            onChange={handleInputChange}
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
