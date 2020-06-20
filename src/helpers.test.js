import { nextStatus, filterTodos } from './helpers';

describe('Helpers', () => {
  describe('nextStatus', () => {
    test('Pending -> In Progress', () => {
      expect(nextStatus('Pending')).toBe('In Progress');
    });

    test('In Progress -> Completed', () => {
      expect(nextStatus('In Progress')).toBe('Completed');
    });

    test('Completed -> Pending', () => {
      expect(nextStatus('In Progress')).toBe('Completed');
    });
  });
  describe('filterTodos', () => {
    const testTodos = [
      {
        title: 'test',
        status: 'In Progress',
      },
      {
        title: 'test 2',
        status: 'Completed',
      },
    ];
    test('filters based on status', () => {
      const filtered = filterTodos(testTodos, { status: 'In Progress' });
      expect(filtered[0]).toStrictEqual({
        ...testTodos[0],
        include: true,
      });
      expect(filtered[1]).toStrictEqual({
        ...testTodos[1],
        include: false,
      });
    });

    test('filters based on Not completed status', () => {
      const filtered = filterTodos(testTodos, { status: 'Not Completed' });
      expect(filtered[0]).toStrictEqual({
        ...testTodos[0],
        include: true,
      });
      expect(filtered[1]).toStrictEqual({
        ...testTodos[1],
        include: false,
      });
    });

    test('filters based on completed status', () => {
      const filtered = filterTodos(testTodos, { status: 'Completed' });
      expect(filtered[0]).toStrictEqual({
        ...testTodos[0],
        include: false,
      });
      expect(filtered[1]).toStrictEqual({
        ...testTodos[1],
        include: true,
      });
    });
  });
});
