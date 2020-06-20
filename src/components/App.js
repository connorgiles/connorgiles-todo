import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import useLocalStorage from '../hooks/useLocalStorage';

import {
  distinctTags,
  normalizeTodos,
  filterTodos,
  nextStatus,
} from '../helpers';

import TodoFilters from './TodoFilters';
import TodoEdit from './TodoEdit';
import TodoList from './TodoList';

const Wrapper = styled(Container)`
  max-width: 600px;
`;

function App() {
  // State values
  const [rawTodos, setTodos] = useLocalStorage('cg-todos', []);
  const [todoToEdit, setTodoToEdit] = useState();
  const [filters, setFilters] = useLocalStorage('cg-filtes', {});

  // Parse todos and tags from state
  const todos = normalizeTodos(rawTodos);
  const tags = distinctTags(todos);

  // Functions to remove and edit todos
  const onRemove = (indexToRemove) =>
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  const onStartEdit = (indexToEdit) => setTodoToEdit(todos[indexToEdit]);
  const onToggleStatus = (indexToToggle) => {
    const currentTodo = todos[indexToToggle];
    onSave(
      {
        ...currentTodo,
        status: nextStatus(currentTodo.status),
      },
      { dismiss: false }
    );
  };

  // Save new todo
  const onSave = (newTodo, { dismiss = true } = {}) => {
    if (newTodo && newTodo.id) {
      // Update existing value
      setTodos(todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo)));
      if (dismiss) {
        setTodoToEdit(undefined);
      }
    } else {
      // Add to the end of the array
      const todoToAdd = { id: uuidv4(), ...newTodo };
      setTodos([...todos, todoToAdd]);
      setTodoToEdit(todoToAdd);
    }
  };

  return (
    <Wrapper>
      <h1 className="text-center my-4">Todos</h1>
      <TodoFilters filters={filters} setFilters={setFilters} tags={tags} />
      <TodoList
        todos={filterTodos(todos, filters)}
        createTodo={onSave}
        removeTodo={onRemove}
        editTodo={onStartEdit}
        toggleStatus={onToggleStatus}
      />
      <TodoEdit
        saveTodo={onSave}
        todo={todoToEdit}
        toggle={() => setTodoToEdit(undefined)}
        tags={tags}
      />
    </Wrapper>
  );
}

export default App;
