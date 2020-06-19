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
  Row,
  Col,
} from 'reactstrap';
import DatePicker from 'react-datepicker';

const MyLabel = ({ required = false, children, ...rest }) => (
  <Label {...rest}>
    {children}
    {required && <span className="text-danger ml-1">*</span>}
  </Label>
);

export default function TodoEdit({ saveTodo, todo, toggle }) {
  const [state, setState] = useState();
  const [ready, setReady] = useState(false);

  const titleInput = useRef();

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
    if (!ready && titleInput.current) {
      titleInput.current.focus();
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
        <ModalHeader toggle={toggle}>{state?.title || 'Edit Todo'}</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <MyLabel required for="form-title">
                Title
              </MyLabel>
              <Input
                id="form-title"
                name="title"
                autoFocus
                onChange={handleInputChange}
                value={state?.title}
                innerRef={titleInput}
                required
              />
            </FormGroup>
            <FormGroup>
              <MyLabel for="form-description">Description</MyLabel>
              <Input
                type="textarea"
                name="description"
                id="form-description"
                onChange={handleInputChange}
                value={state?.description}
              />
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <MyLabel required for="form-status">
                    Status
                  </MyLabel>
                  <Input
                    id="form-status"
                    required
                    type="select"
                    name="status"
                    onChange={handleInputChange}
                    value={state?.status}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <MyLabel for="form-date" className="d-block">
                    Due Date
                  </MyLabel>
                  <DatePicker
                    selected={state?.dueDate}
                    onChange={(date) => updateTodo('dueDate', date)}
                    minDate={new Date()}
                    className="form-control"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary">Save</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
