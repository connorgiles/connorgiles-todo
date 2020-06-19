import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

const defineLocalStore = (value = null) =>
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => (value ? JSON.stringify(value) : null)),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

describe('useLocalStorage', () => {
  const testKey = 'testKey';

  beforeEach(() => {
    defineLocalStore();
  });

  test('should default to initial value', () => {
    const defaultValue = 'testing';
    const { result } = renderHook(() => useLocalStorage(testKey, defaultValue));
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(defaultValue);
  });

  test('should use local storage value if it exists', () => {
    const defaultValue = 'testing';
    defineLocalStore(defaultValue);
    const { result } = renderHook(() => useLocalStorage(testKey, 'other'));
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(testKey);
    expect(result.current[0]).toBe(defaultValue);
  });

  test('should not need default value', () => {
    const { result } = renderHook(() => useLocalStorage(testKey));
    expect(result.current[0]).toBe(undefined);
  });

  test('should update local storage and state on setValue', () => {
    const defaultValue = 'testing';

    const { result } = renderHook(() => useLocalStorage(testKey));

    act(() => {
      result.current[1](defaultValue);
    });

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      testKey,
      JSON.stringify(defaultValue)
    );

    expect(result.current[0]).toBe(defaultValue);
  });

  test('should set value with function value', () => {
    const defaultValue = 'testing';
    const expectedValue = defaultValue + defaultValue;

    const { result } = renderHook(() => useLocalStorage(testKey, defaultValue));

    act(() => {
      result.current[1]((v) => v + v);
    });

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      testKey,
      JSON.stringify(expectedValue)
    );

    expect(result.current[0]).toBe(expectedValue);
  });
});
