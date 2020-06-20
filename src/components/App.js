import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import useLocalStorage from '../hooks/useLocalStorage';

import TodoFilters from './TodoFilters';
import TodoEdit from './TodoEdit';
import TodoList from './TodoList';

const Wrapper = styled(Container)`
  max-width: 600px;
`;

const distinctTags = (todos) => {
  const tags = new Set();
  todos.forEach((t) => {
    if (t && t.tags) {
      t.tags.forEach((tag) => tags.add(tag.value));
    }
  });
  return [...tags.values()].map((value) => ({ value, label: value }));
};

const parseTodos = (todos) =>
  todos.map((todo) => ({
    ...todo,
    dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
  }));

const filterTodos = (todos, filters = {}) =>
  todos.filter((todo) => {
    if (filters.status && filters.status !== todo.status) return false;
    if (filters.tag && !(todo.tags || []).find((t) => t.value === filters.tag))
      return false;
    return true;
  });

function App() {
  // State values
  const [rawTodos, setTodos] = useLocalStorage('cg-todos', []);
  const [todoToEdit, setTodoToEdit] = useState();
  const [filters, setFilters] = useState({});

  // Parse todos and tags from state
  const todos = parseTodos(rawTodos);
  const tags = distinctTags(todos);

  // Functions to remove and edit todos
  const onRemove = (indexToRemove) =>
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  const onStartEdit = (indexToEdit) => setTodoToEdit(todos[indexToEdit]);

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
