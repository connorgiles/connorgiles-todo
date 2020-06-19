import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import useLocalStorage from '../hooks/useLocalStorage';

import TodoEdit from './TodoEdit';
import TodoList from './TodoList';

const Wrapper = styled(Container)`
  max-width: 600px;
`;

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoToEdit, setTodoToEdit] = useState();

  const onSave = (newTodo) => {
    if (newTodo && newTodo.id) {
      // Update existing value
      setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)));
      setTodoToEdit(undefined);
    } else {
      // Add to the end of the array
      const todoToAdd = { id: uuidv4(), ...newTodo };
      setTodos([...todos, todoToAdd]);
      setTodoToEdit(todoToAdd);
    }
  };

  const onRemove = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  const onStartEdit = (indexToEdit) => {
    setTodoToEdit(todos[indexToEdit]);
  };

  return (
    <Wrapper>
      <h1 className="text-center my-4">Todos</h1>
      <TodoList
        todos={todos}
        removeTodo={onRemove}
        editTodo={onStartEdit}
        saveTodo={onSave}
      />
      <TodoEdit
        saveTodo={onSave}
        todo={todoToEdit}
        toggle={() => setTodoToEdit(undefined)}
      />
    </Wrapper>
  );
}

export default App;
