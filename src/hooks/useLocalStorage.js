import { useState } from 'react';

function useLocalStorage(key, defaultValue) {
  // State to store value
  const [state, setState] = useState(() => {
    try {
      // Get value from local storage
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  // Create setter function
  const setValue = (newValue) => {
    try {
      // Copy API from useState to allow function to set value
      const valueToUpdate =
        newValue instanceof Function ? newValue(state) : newValue;
      // Store in local state
      setState(valueToUpdate);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToUpdate));
    } catch (error) {
      console.error(error);
    }
  };

  return [state, setValue];
}

export default useLocalStorage;
