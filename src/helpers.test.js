import { nextStatus } from './helpers';

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
});
