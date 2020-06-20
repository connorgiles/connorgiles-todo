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

import TodoSearch from './TodoSearch';
import TodoFilters from './TodoFilters';
import TodoEdit from './TodoEdit';
import TodoList from './TodoList';

const Wrapper = styled(Container)`
  max-width: 600px;
  margin-bottom: 200px;
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
  const onReorder = (fromIndex, toIndex) => {
    const data = [...todos];
    const item = data.splice(fromIndex, 1)[0];
    data.splice(toIndex, 0, item);
    setTodos(data);
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
      <h1 className="text-center my-4">My Tasks</h1>
      <TodoSearch filters={filters} setFilters={setFilters} />
      <TodoList
        todos={filterTodos(todos, filters)}
        reorderTodo={onReorder}
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
      <TodoFilters filters={filters} setFilters={setFilters} tags={tags} />
    </Wrapper>
  );
}

export default App;
