import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import DatePicker from 'react-datepicker';

export default function TodoEdit({ saveTodo, todo, toggle }) {
  const [state, setState] = useState();
  const [ready, setReady] = useState(false);

  const firstInput = useRef();

  useEffect(() => {
    // Set state from todo param
    if (todo) {
      setState({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      });
    }
    setReady(false);
  }, [todo]);

  useEffect(() => {
    // Focus on first input
    if (!ready && firstInput.current) {
      firstInput.current.focus();
      setReady(true);
    }
  }, [ready, state]);

  // Helper function to save changes
  const onSubmit = (e) => {
    e.preventDefault();
    saveTodo(state);
    setState({});
  };

  // Helper function to update state
  const updateTodo = (field, value) =>
    setState({
      ...state,
      [field]: value,
    });

  // Helper function to update state from input
  const handleInputChange = (e) => updateTodo(e.target.name, e.target.value);

  return (
    <div>
      <Modal isOpen={!!todo} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Todo</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="form-title">Title</Label>
              <Input
                id="form-title"
                name="title"
                autoFocus
                onChange={handleInputChange}
                value={state?.title}
                innerRef={firstInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="form-description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="form-description"
                onChange={handleInputChange}
                value={state?.description}
              />
            </FormGroup>
            <FormGroup>
              <Label for="form-status">Status</Label>
              <Input
                type="select"
                name="status"
                id="form-status"
                onChange={handleInputChange}
                value={state?.status}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="form-date" className="d-block">
                Due Date
              </Label>
              <DatePicker
                selected={state?.dueDate}
                onChange={(date) => updateTodo('dueDate', date)}
                minDate={new Date()}
                className="form-control"
              />
            </FormGroup>
            <Button color="primary">Save</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
