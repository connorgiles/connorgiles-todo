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
import CreatableSelect from 'react-select/creatable';
import throttle from 'lodash.throttle';

import useLocalStorage from '../hooks/useLocalStorage';

import { statuses } from '../constants';

const MyLabel = ({ required = false, children, ...rest }) => (
  <Label {...rest}>
    {children}
    {required && <span className="text-danger ml-1">*</span>}
  </Label>
);

export default function TodoEdit({ saveTodo, todo, toggle, tags }) {
  const [autosave, setAutosave] = useLocalStorage('cg-autosave', true);
  const [state, setState] = useState();
  const [recordLoaded, setRecordLoaded] = useState(false);

  const titleInput = useRef();

  const autosaveDelay = 500; // Only allow saves every N ms
  const throttledSave = throttle(
    (newState) => saveTodo(newState, { dismiss: false }),
    autosaveDelay
  );

  useEffect(() => {
    // Set state from todo param
    if (todo) {
      setState(todo);
      setRecordLoaded(false);
    }
  }, [todo]);

  useEffect(() => {
    // Focus on first input the first time state changes
    if (!recordLoaded && titleInput.current) {
      titleInput.current.focus();
      setRecordLoaded(true);
    }
  }, [recordLoaded, state]);

  // Helper function to save changes
  const onSubmit = (e) => {
    e.preventDefault();
    saveTodo(state);
  };

  // Helper function to update state
  const updateTodo = (field, value) => {
    const newState = {
      ...state,
      [field]: value,
    };
    setState(newState);
    if (autosave) {
      throttledSave(newState);
    }
  };
  // Helper function to update state from input
  const handleInputChange = (e) => updateTodo(e.target.name, e.target.value);

  return (
    <Modal centered isOpen={!!todo} toggle={toggle}>
      <ModalHeader className="bg-primary text-white" toggle={toggle}>
        {state?.title || 'Edit Todo'}
      </ModalHeader>
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
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
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
          <FormGroup>
            <MyLabel for="form-tags" className="d-block">
              Tags
            </MyLabel>
            <CreatableSelect
              id="form-tags"
              isMulti
              onChange={(options) => updateTodo('tags', options)}
              value={state?.tags}
              options={tags}
            />
          </FormGroup>
          <Row>
            <Col>{!autosave && <Button color="primary">Save</Button>}</Col>
            <Col>
              <FormGroup check className="my-2 text-right">
                <Label check>
                  <Input
                    type="checkbox"
                    checked={autosave}
                    onChange={(e) => setAutosave(e.target.checked)}
                  />{' '}
                  Autosave changes?
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
}
