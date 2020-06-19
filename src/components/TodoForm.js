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

export default function TodoForm({ saveTodo }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    saveTodo({ title, status: 'Pending' });
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
            className="border-0"
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
