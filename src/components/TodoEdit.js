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

export default function TodoEdit({ saveTodo, todo, toggle }) {
  const [state, setState] = useState();
  const [ready, setReady] = useState(false);

  const firstInput = useRef();

  useEffect(() => {
    // Set state from todo param
    setState({ ...todo });
    setReady(false);
  }, [todo]);

  useEffect(() => {
    // Focus on first input
    if (!ready && firstInput.current) {
      firstInput.current.focus();
      setReady(true);
    }
  }, [ready, state]);

  const onSubmit = (e) => {
    e.preventDefault();
    saveTodo(state);
    setState({});
  };

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

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
            <Button color="primary">Save</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
