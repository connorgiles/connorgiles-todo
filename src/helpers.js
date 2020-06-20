import { statuses } from './constants';

/**
 * Extracts used tags from todos and returns list of distinct tags
 * @param {Array} todos Todos to extract distinct tags from
 * @returns {Array} Selectable options for select fields
 */
export const distinctTags = (todos) => {
  const tags = new Set();
  todos.forEach((t) => {
    if (t && t.tags) {
      t.tags.forEach((tag) => tags.add(tag.value));
    }
  });
  return [...tags.values()].sort().map((value) => ({ value, label: value }));
};

/**
 * Helper function to normalize todo fields
 * @param {Array} todos Todos to normalize
 * @returns {Array} Todos with fields parsed
 */
export const normalizeTodos = (todos) =>
  todos.map((todo) => ({
    ...todo,
    dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
  }));

/**
 * Filters todos based on a filter object
 * @param {Array} todos Todos to filter
 * @param {Object} filters Filters to apply to todos
 */
export const filterTodos = (todos, filters = {}) => {
  const query = filters.query ? filters.query.toLowerCase() : null;
  return todos.filter((todo) => {
    // Must include search query if present
    if (query && !todo.title.toLowerCase().includes(query)) {
      return false;
    }
    // Must have the right status if filtering by status
    if (filters.status && filters.status !== todo.status) {
      return false;
    }
    // Must include the right tag if filtering by tag
    if (
      filters.tag &&
      !(todo.tags || []).find((t) => t.value === filters.tag)
    ) {
      return false;
    }
    // Otherwise include it
    return true;
  });
};

/**
 * Finds next status in status array
 * @param {String} currentStatus Current status
 * @returns {String} next status to set todo to
 */
export const nextStatus = (currentStatus) => {
  const currentStatusIndex = statuses.findIndex(
    (stat) => currentStatus === stat
  );
  return statuses[(currentStatusIndex + 1) % statuses.length];
};
